(function(self) {

  let fs
  if (!self) {
    fs = require('fs')
  }

  function read(fd, address, length, buf, offset) {
    if (self) {
      if (buf) {
        offset = offset || 0
        for (let i = 0; i < length; i++) {
          buf[offset + i] = fd[address + i]
        }
      }
      return fd.subarray(address, address + length)
    }
    if (!buf) {
      buf = new Uint8Array(length)
    }
    fs.readSync(fd, buf, offset || 0, length, address)
    return buf
  }

  function write(fd, address, data) {
    if (self) {
      fd.subarray(address).set(data)
    } else {
      fs.writeSync(fd, data, 0, data.length, address)
    }
  }

  // LUTs for computing ECC/EDC
  const eccFLut = new Uint8Array(256)
  const eccBLut = new Uint8Array(256)
  const edcLut = new Uint32Array(256)

  function eccEdcInit() {
    for (let i = 0; i < 256; i++) {
      let j = (i << 1) ^ (i & 0x80 ? 0x11d : 0)
      eccFLut[i] = j & 0xff
      eccBLut[i^j] = i & 0xff
      let edc = i
      for (j = 0; j < 8; j++) {
        edc = (edc >>> 1) ^ (edc & 1 ? 0xd8018001 : 0)
      }
      edcLut[i] = edc
    }
  }

  function set32lsb(p, value) {
    p[0] = value >>> 0
    p[1] = value >>> 8
    p[2] = value >>> 16
    p[3] = value >>> 24
  }

  // Compute EDC for a block
  function edcComputeblock(src, dest) {
    let edc = 0
    let i = 0
    let size = src.length
    while (size--) {
      edc = (edc >>> 8) ^ edcLut[(edc ^ src[i++]) & 0xff]
    }
    set32lsb(dest, edc)
  }

  // Compute ECC for a block (can do either P or Q)
  function eccComputeblock(src, majorCount, minorCount, majorMult, minorInc, dest) {
    const size = majorCount * minorCount
    for (let major = 0; major < majorCount; major++) {
      let index = (major >>> 1) * majorMult + (major & 1)
      let eccA = 0
      let eccB = 0
      for (let minor = 0; minor < minorCount; minor++) {
        let temp = src[index]
        index += minorInc
        if (index >= size) {
          index -= size
        }
        eccA ^= temp
        eccB ^= temp
        eccA = eccFLut[eccA]
      }
      eccA = eccBLut[eccFLut[eccA] ^ eccB]
      dest[major] = eccA
      dest[major + majorCount] = eccA ^ eccB
    }
  }

  // Generate ECC P and Q codes for a block
  function eccGenerate(fd, offset, zeroaddress) {
    const savedAddress = new Uint8Array(4)
    // Save the address and zero it out, if necessary
    if (zeroaddress) {
      // memmove(saved_address, sector + 12, 4);
      savedAddress.set(read(fd, offset + 12, 4))
      // memset(sector + 12, 0, 4);
      const zeros = new Uint8Array(4)
      write(fd, offset + 12, zeros)
    }
    // Compute ECC P code
    const sector = read(fd, offset + 0xc, 0x8bc)
    const ecc = new Uint8Array(2 * 86)
    eccComputeblock(sector, 86, 24, 2, 86, ecc)
    write(fd, offset + 0x81c, ecc.subarray(0, 2 * 86))
    sector.set(ecc.subarray(0, 2 * 86), 0x810)
    // Compute ECC Q code
    eccComputeblock(sector, 52, 43, 86, 88, ecc)
    write(fd, offset + 0x8c8, ecc.subarray(0, 2 * 52))
    // Restore the address, if necessary
    if (zeroaddress) {
      // memmove(sector + 12, saved_address, 4);
      write(fd, offset + 12, savedAddress)
    }
  }

  // CD sync header
  const syncHeader = new Uint8Array([ 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x00 ])

  // Generate ECC/EDC information for a sector (must be 2352 = 0x930 bytes)
  function eccEdcGenerate(fd, offset) {
    // Generate sync
    // memmove(sector, syncHeader, sizeof(syncHeader));
    write(fd, offset, syncHeader)
    const edc = new Uint8Array(4)
    switch (read(fd, offset + 0x0f, 1)[0]) {
    case 0x00: {
      // Mode 0: no data; generate zeroes
      // memset(sector + 0x10, 0, 0x920);
      const zeros = new Uint8Array(0x920)
      write(fd, offset + 0x10, zeros)
      break
    }
    case 0x01: {
      // Mode 1: Compute EDC
      const sector = read(fd, offset, 0x810)
      edcComputeblock(sector, edc)
      write(fd, offset + 0x810, edc)
      // Zero out reserved area
      // memset(sector + 0x814, 0, 8);
      const zeros = new Uint8Array(8)
      write(fd, offset + 0x814, zeros)
      // Generate ECC P/Q codes
      eccGenerate(fd, offset)
      break
    }
    case 0x02: {
      // Mode 2: Make sure XA flags match
      // memmove(sector + 0x14, sector + 0x10, 4);
      const flags = read(fd, offset + 0x10, 4)
      write(fd, offset + 0x14, flags)
      if (!(read(fd, offset + 0x12, 1)[0] & 0x20)) {
        // Form 1: Compute EDC
        const sector = read(fd, offset + 0x10, 0x808)
        edcComputeblock(sector, edc)
        write(fd, offset + 0x818, edc)
        // Generate ECC P/Q codes
        eccGenerate(fd, offset, true)
      } else {
        // Form 2: Compute EDC
        const sector = read(fd, offset + 0x10, 0x91c)
        edcComputeblock(sector, edc)
        write(fd, offset + 0x92c, edc)
      }
      break
    }}
  }

  // Returns nonzero if any bytes in the array are nonzero
  function anyNonZero(data, len) {
    let i = 0
    for(; len; len--) {
      if (data[i++]) {
        return 1
      }
    }
    return 0
  }

  function memcmp(a, b, len) {
    for (let i = 0; i < len; i++) {
      if (a[i] !== b[i]) {
        return 1
      }
    }
    return 0
  }

  // Verify EDC for a sector (must be 2352 = 0x930 bytes)
  // Returns 0 on success
  function edcVerify(fd) {
    const myedc = new Uint8Array(4)
    // Verify sync
    const header = read(fd, 0, syncHeader.length)
    if (memcmp(header, syncHeader, syncHeader.length)) {
      return 1
    }
    switch(read(fd, 0x0f, 1)[0]) {
    case 0x00: {
      // Mode 0: no data; everything had better be zero
      return anyNonZero(read(fd, 0x10, 0x920), 0x920)
    }
    case 0x01: {
      // Mode 1
      const sector = read(fd, 0, 0x810 + 4)
      edcComputeblock(sector.subarray(0, 0x810), myedc)
      return memcmp(myedc, sector.subarray(0x810), 4)
    }
    case 0x02: {
      // Mode 2: Verify that the XA type is correctly copied twice
      const type = read(fd, 0x10, 8)
      if (memcmp(type, type.subarray(4), 4)) {
        return 1
      }
      if (!(type[2] & 0x20)) {
        // Form 1
        const sector = read(fd, 0x10, 0x808 + 4)
        edcComputeblock(sector.subarray(0, 0x808), myedc)
        return memcmp(myedc, sector.subarray(0x808), 4)
      } else {
        // Form 2
        const sector = read(fd, 0x10, 0x91c + 4)
        edcComputeblock(sector.subarray(0, 0x91c), myedc)
        return memcmp(myedc, sector.subarray(0x91c), 4)
      }
    }}
    // Invalid mode
    return 1
  }

  // 1: looks like audio 0: normal
  function audioGuess(sector) {
    if (!memcmp(sector, syncHeader, syncHeader.length)
        && sector[0xd] < 0x60
        && sector[0xe] < 0x75
        && sector[0xf] < 3) {
      return 0
    }
    return 1
  }

  function eccEdcCalc(fd, size) {
    eccEdcInit()
    if (edcVerify(fd) !== 0) {
      throw new Error('error: sector 0 not a valid 2352 sector')
    }
    const buf = new Uint8Array(16)
    for (let sector = 16; sector < (size / 2352); sector++) {
      read(fd, sector * 2352, buf.length, buf)
      if (audioGuess(buf)) {
        console.warn("warning: sector " + sector + " looks like an audio sector, will recalculate earlier sectors only")
        break
      }
      eccEdcGenerate(fd, sector * 2352)
    }
  }

  if (self) {
    self.eccEdcCalc = eccEdcCalc
  } else {
    module.exports = eccEdcCalc
  }
})(typeof(self) !== 'undefined' ? self : null)
