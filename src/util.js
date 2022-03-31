(function(self) {

  let constants
  let enemies
  let errors
  let extension
  let items
  let relics
  let fs
  let crypto

  if (self) {
    constants = self.sotnRando.constants
    enemies = self.sotnRando.enemies
    errors = self.sotnRando.errors
    extension = self.sotnRando.extension
    items = self.sotnRando.items
    relics = self.sotnRando.relics
    crypto = self.crypto
  } else {
    constants = require('./constants')
    enemies = require('./enemies')
    errors = require('./errors')
    extension = require('./extension')
    items = require('./items')
    relics = require('./relics')
    crypto = require('crypto').webcrypto
    fs = require('fs')
  }

  function sha256(input) {
    return crypto.subtle.digest('SHA-256', input).then(function(buf) {
      return bufToHex(new Uint8Array(buf))
    })
  }

  function assert(value, message) {
    if (!value) {
      message = message || 'Assertion failed: ' + value
      throw new errors.AssertionError(message)
    }
  }

  assert.equal = function equal(actual, expected, message) {
    if (actual !== expected) {
      message = message || 'Assertion failed: ' + actual + ' === ' + expected
      throw new errors.AssertionError(message)
    }
  }

  assert.notEqual = function equal(actual, expected, message) {
    if (actual === expected) {
      message = message || 'Assertion failed: ' + actual + ' !== ' + expected
      throw new errors.AssertionError(message)
    }
  }

  assert.oneOf = function equal(actual, expected, message) {
    if (expected.indexOf(actual) === -1) {
      message = message || 'Assertion failed: ' + actual + ' one of '
        + expected.join(', ')
      throw new errors.AssertionError(message)
    }
  }

  function roomCount(zone) {
    let layout = zone.readUInt32LE(0x10) - 0x80180000
    let rooms = 0
    while (zone[layout] !== 0x40) {
      rooms++
      layout += 8
    }
    return rooms
  }

  function shopItemType(item) {
    switch (item.type) {
    case constants.TYPE.HELMET:
      return 0x01
    case constants.TYPE.ARMOR:
      return 0x02
    case constants.TYPE.CLOAK:
      return 0x03
    case constants.TYPE.ACCESSORY:
      return 0x04
    }
    return 0x00
  }

  function shopTileFilter(tile) {
    return tile.shop
  }

  function dropTileFilter(tile) {
    return 'enemy' in tile || tile.librarian
  }

  function rewardTileFilter(tile) {
    return tile.reward
  }

  function candleTileFilter(tile) {
    return 'candle' in tile
  }

  function tankTileFilter(tile) {
    return tile.tank
  }

  function mapTileFilter(tile) {
    return !shopTileFilter(tile)
      && !tankTileFilter(tile)
      && !rewardTileFilter(tile)
      && !candleTileFilter(tile)
      && !dropTileFilter(tile)
  }

  function nonProgressionFilter(item) {
    return !item.progression
  }

  function tilesFilter(item) {
    return Array.isArray(item.tiles)
  }

  function itemTileFilter(tileFilter) {
    return function(item) {
      return item.tiles && item.tiles.some(tileFilter)
    }
  }

  function tileIdOffsetFilter(item) {
    return [
      constants.TYPE.WEAPON1,
      constants.TYPE.WEAPON2,
      constants.TYPE.SHIELD,
      constants.TYPE.HELMET,
      constants.TYPE.ARMOR,
      constants.TYPE.CLOAK,
      constants.TYPE.ACCESSORY,
      constants.TYPE.USABLE,
    ].indexOf(item.type) !== -1
  }

  function itemFromName(name, from) {
    from = from || items
    return from.filter(function(item) {
      return item.name === name
    })[0]
  }

  function itemFromTileId(items, id) {
    return items.filter(function(item) {
      if (id > constants.tileIdOffset) {
        return item.id === (id - constants.tileIdOffset)
          && tileIdOffsetFilter(item)
      }
      return item.id === id
    })[0]
  }

  function itemSlots(item) {
    switch (item.type) {
    case constants.TYPE.WEAPON1:
    case constants.TYPE.WEAPON2:
    case constants.TYPE.SHIELD:
    case constants.TYPE.USABLE:
      return [
        constants.slots[constants.SLOT.LEFT_HAND],
        constants.slots[constants.SLOT.RIGHT_HAND],
      ]
    case constants.TYPE.HELMET:
      return [ constants.slots[constants.SLOT.HEAD] ]
    case constants.TYPE.ARMOR:
      return [ constants.slots[constants.SLOT.BODY] ]
    case constants.TYPE.CLOAK:
      return [ constants.slots[constants.SLOT.CLOAK] ]
    case constants.TYPE.ACCESSORY:
      return [
        constants.slots[constants.SLOT.OTHER],
        constants.slots[constants.SLOT.OTHER2],
      ]
      break
    }
  }

  function tileValue(item, tile) {
    if (!tile) {
      tile = {}
    }
    if (tile.noOffset) {
      return item.id
    }
    let id = ((tile.candle || 0x00) << 8) | item.id
    if (tile.shop) {
      // Apply offset for some item types in the shop menu.
      switch (item.type) {
      case constants.TYPE.HELMET:
      case constants.TYPE.ARMOR:
      case constants.TYPE.CLOAK:
      case constants.TYPE.ACCESSORY:
        id += constants.equipIdOffset
        break
      }
    } else if (tile.candle && item.id >= constants.tileIdOffset) {
      id += constants.tileIdOffset
    } else {
      // Apply tile offset for some tile items.
      switch (item.type) {
      case constants.TYPE.POWERUP:
      case constants.TYPE.HEART:
      case constants.TYPE.GOLD:
      case constants.TYPE.SUBWEAPON:
        break
      default:
        id += constants.tileIdOffset
        break
      }
    }
    return id
  }

  function replaceBossRelicWithItem(opts) {
    const boss = constants.zones[opts.boss]
    return function(data, relic, item, index) {
      let offset
      const id = item.id
      const zone = constants.zones[relic.entity.zones[0]]
      const slots = itemSlots(item)
      // Patch item table.
      offset = romOffset(zone, zone.items + 0x02 * index)
      data.writeShort(offset, id + constants.tileIdOffset)
      // Patch entities table.
      relic.entity.entities.forEach(function(addr) {
        if ('asItem' in relic) {
          if ('x' in relic.asItem) {
            offset = romOffset(zone, addr + 0x00)
            data.writeShort(offset, relic.asItem.x)
          }
          if ('y' in relic.asItem) {
            offset = romOffset(zone, addr + 0x02)
            data.writeShort(offset, relic.asItem.y)
          }
        }
        offset = romOffset(zone, addr + 0x04)
        data.writeShort(offset, 0x000c)
        offset = romOffset(zone, addr + 0x08)
        data.writeShort(offset, index)
      })
      // Patch instructions that load a relic.
      data.writeWord(
        relic.erase.instructions[0].addresses[0],
        relic.erase.instructions[0].instruction,
      )
      // Patch boss reward.
      data.writeShort(
        romOffset(boss, boss.rewards),
        id + constants.tileIdOffset,
      )
      // Entry point.
      offset = romOffset(zone, opts.entry)
      //                                          // j inj
      offset = data.writeWord(offset, 0x08060000 + (opts.inj >> 2))
      offset = data.writeWord(offset, 0x00041400) // sll v0, a0, 10
      // Zero tile function if item is equipped.
      offset = romOffset(zone, opts.inj)
      //                                          // ori t1, r0, id
      offset = data.writeWord(
        offset,
        0x34090000 + id + constants.equipIdOffset
      )
      slots.forEach(function(slot, index) {
        //                                          // lui t0, 0x8009
        offset = data.writeWord(offset, 0x3c080000 + (slot >>> 16))
        //                                          // lbu t0, slot (t0)
        offset = data.writeWord(offset, 0x91080000 + (slot & 0xffff))
        offset = data.writeWord(offset, 0x00000000) // nop
        const next = 5 + 5 * (slots.length - index - 1)
        //                                          // beq t0, t1, pc + next
        offset = data.writeWord(offset, 0x11090000 + next)
        offset = data.writeWord(offset, 0x00000000) // nop
      })
      // Inventory check.
      offset = data.writeWord(offset, 0x3c088009) // lui t0, 0x8009
      //                                          // lbu t0, 0x798a + id (v0)
      offset = data.writeWord(
        offset,
        0x91080000 + id + constants.equipmentInvIdOffset,
      )
      offset = data.writeWord(offset, 0x00000000) // nop
      offset = data.writeWord(offset, 0x11000004) // beq t0, r0, pc + 0x14
      offset = data.writeWord(offset, 0x3409000f) // ori t1, r0, 0x000f
      offset = data.writeWord(offset, 0x3c088018) // lui t0, 0x8018
      relic.entity.entities.forEach(function(addr) {
        //                                        // sh t1, entity + 4 (t0)
        offset = data.writeWord(offset, 0xa5090000 + addr + 0x04)
      })
      // Return.
      offset = data.writeWord(offset, 0x03e00008) // jr ra
      offset = data.writeWord(offset, 0x00000000) // nop
    }
  }

  function getRooms(zone) {
    // Get room count.
    const rooms = roomCount(zone)
    const layouts = zone.readUInt32LE(0x20) - 0x80180000
    const room = zone.readUInt32LE(0x10) - 0x80180000
    const ids = []
    for (let i = 0; i < rooms; i++) {
      const gfxId = zone[room + 0x8 * i + 0x5]
      if (gfxId == 0xff) {
        // Parsing the tiles layout data doesn't work for loading zone like
        // the other rooms, so they must be skipped.
        ids.push(undefined)
        continue
      }
      ids.push(zone[room + 0x8 * i + 0x4])
    }
    return ids.map(function(id) {
      if (id !== undefined) {
        // Get pointer to layout data.
        const offset = zone.readUInt32LE(layouts + 0x8 * id) - 0x80180000
        // Parse the layout data.
        const tiles  = zone.readUInt32LE(offset) - 0x80180000
        const defs   = zone.readUInt32LE(offset + 0x4) - 0x80180000
        const dims   = zone.readUInt32LE(offset + 0x8) & 0xffffff
        const endy   = dims >> 18
        const endx   = (dims >> 12) & 0x3f
        const starty = (dims >> 6) & 0x3f
        const startx = dims & 0x3f
        const width  = endx - startx + 1
        const height = endy - starty + 1
        const roomFlags = zone[offset + 0xa]
        const drawFlags = zone.readUInt16LE(offset + 0xd)
        return {
          offset: offset,
          id: id,
          tiles: tiles,
          defs: defs,
          x: startx,
          y: starty,
          width: width,
          height: height,
          roomFlags: roomFlags,
          drawFlags: drawFlags,
        }
      }
    })
  }

  function tileData(zone) {
    return getRooms(zone).map(function(room) {
      if (room !== undefined) {
        const map = Array(16 * room.height)
        for (let y = 0; y < 16 * room.height; y++) {
          map[y] = Array(16 * room.width)
          for (let x = 0; x < 16 * room.width; x++) {
            const index = zone.readUInt16LE(
              room.tiles + 0x2 * (16 * room.width * y + x)
            )
            if (index) {
              map[y][x] = zone.readUInt32LE(room.defs + 0x20 * index)
            } else {
              map[y][x] = 0
            }
          }
        }
        return map
      }
    })
  }

  function entityData(zone) {
    // Get rooms.
    const rooms = getRooms(zone)
    // Get entity layout IDs.
    const room = zone.readUInt32LE(0x10) - 0x80180000
    const ids = []
    for (let i = 0; i < rooms.length; i++) {
      ids.push(zone[room + 0x4 + 0x8 * i + 0x3])
    }
    // Get pointers to sorted tile layout structures.
    const enter = zone.readUInt32LE(0x0c) - 0x80180000
    const offsets = [
      zone.readUInt16LE(enter + 0x1c),
      zone.readUInt16LE(enter + 0x28),
    ]
    // Get sorted lists.
    const entities = Array(rooms.length).fill(null).map(function() {
      return {}
    })
    offsets.forEach(function(offset) {
      for (let i = 0; i < rooms.length; i++) {
        const room = rooms[i]
        if (!room) {
          continue
        }
        const ptr = zone.readUInt32LE(offset + 4 * ids[i]) - 0x80180000
        let entitiy
        let count = 0
        while (true) {
          const p = ptr + 10 * count++
          entity = zone.slice(p, p + 10)
          const key = bufToHex(entity)
          const header = entity.readUInt32LE()
          if (header == 0xffffffff) {
            break
          } else if (header == 0xfffefffe) {
            continue
          }
          entities[i][key] = entities[i][key] || []
          entities[i][key].push(p)
        }
      }
    })
    return entities.map(function(room) {
      return Object.getOwnPropertyNames(room).map(function(key) {
        const bytes = key.match(/[0-9a-f]{2}/g).map(function(byte) {
          return parseInt(byte, 16)
        })
        return {
          data: Buffer.from(bytes),
          addresses: room[key],
        }
      })
    })
  }

  function romOffset(zone, address) {
    return zone.pos + address + Math.floor(address / 0x800) * 0x130
  }

  function bufToHex(buf) {
    return Array.from(buf).map(function(byte) {
      const hex = byte.toString(16)
      return ('0'.slice(0, hex.length % 2) + hex)
    }).join('')
  }

  function numToHex(num, width) {
    let sign = 1
    if (num < 0) {
      sign = -1
      num *= -1
    }
    if (width === undefined) {
      width = 2 * Math.ceil(num.toString(16).length / 2)
    }
    const zeros = Array(width).fill('0').join('')
    const hex = (zeros + num.toString(16)).slice(-width)
    return (sign < 0 ? '-' : '') + '0x' + hex
  }

  function checked(file, writes) {
    if (file) {
      this.file = file
    }
    this.writes = writes || {}
  }

  function checkAddressRange(address) {
    if (address < 0xffff || address > 0xffffffff || Number.isNaN(address)) {
      throw Error('bad address: ' + numToHex(address))
    }
  }

  checked.prototype.writeChar = function writeChar(address, val) {
    checkAddressRange(address)
    if (this.file) {
      if (typeof(this.file) === 'object') {
        this.file[address] = val & 0xff
      } else {
        const buf = Buffer.from([val & 0xff])
        fs.writeSync(this.file, buf, 0, 1, address)
      }
    }
    this.writes[address] = {
      len: 1,
      val: val & 0xff,
    }
    return address + 1
  }

  checked.prototype.writeShort = function writeShort(address, val) {
    checkAddressRange(address)
    const bytes = [
      val & 0xff,
      (val >>> 8) & 0xff,
    ]
    if (this.file) {
      if (typeof(this.file) === 'object') {
        for (let i = 0; i < 2; i++) {
          this.file[address + i] = bytes[i]
        }
      } else {
        const buf = Buffer.from(bytes)
        fs.writeSync(this.file, buf, 0, 2, address)
      }
    }
    for (let i = address; i < address + 2; i++) {
      delete this.writes[i]
    }
    this.writes[address] = {
      len: 2,
      val: val & 0xffff,
    }
    return address + 2
  }

  checked.prototype.writeWord = function writeShort(address, val) {
    checkAddressRange(address)
    const bytes = [
      val & 0xff,
      (val >>> 8) & 0xff,
      (val >>> 16) & 0xff,
      (val >>> 24) & 0xff,
    ]
    if (this.file) {
      if (typeof(this.file) === 'object') {
        for (let i = 0; i < 4; i++) {
          this.file[address + i] = bytes[i]
        }
      } else {
        const buf = Buffer.from(bytes)
        fs.writeSync(this.file, buf, 0, 4, address)
      }
    }
    for (let i = address; i < address + 4; i++) {
      delete this.writes[i]
    }
    this.writes[address] = {
      len: 4,
      val: val & 0xffffffff,
    }
    return address + 4
  }

  checked.prototype.writeLong = function writeLong(address, val) {
    checkAddressRange(address)
    const bytes = [
      val & 0xff,
      (val >>> 8) & 0xff,
      (val >>> 16) & 0xff,
      (val >>> 24) & 0xff,
      (val >>> 32) & 0xff,
      (val >>> 40) & 0xff,
      (val >>> 48) & 0xff,
      (val >>> 56) & 0xff,
    ]
    if (this.file) {
      if (typeof(this.file) === 'object') {
        for (let i = 0; i < 8; i++) {
          this.file[address + i] = bytes[i]
        }
      } else {
        const buf = Buffer.from(bytes)
        fs.writeSync(this.file, buf, 0, 8, address)
      }
    }
    for (let i = address; i < address + 8; i++) {
      delete this.writes[i]
    }
    this.writes[address] = {
      len: 8,
      val: val,
    }
    return address + 8
  }

  checked.prototype.writeString = function writeString(address, val) {
    checkAddressRange(address)
    if (this.file) {
      if (typeof(this.file) === 'object') {
        for (let i = 0; i < val.length; i++) {
          this.file[address + i] = val[i]
        }
      } else {
        const buf = Buffer.from(val)
        fs.writeSync(this.file, buf, 0, buf.length, address)
      }
    }
    for (let i = address; i < address + val.length; i++) {
      delete this.writes[i]
    }
    this.writes[address] = {
      len: val.length,
      val: val,
    }
    return address + val.length
  }

  checked.prototype.apply = function apply(checked) {
    const self = this
    Object.getOwnPropertyNames(checked.writes).forEach(function(address) {
      if (Array.isArray(checked.writes[address].val)) {
        self.writeString(parseInt(address), checked.writes[address].val)
      } else {
        switch (checked.writes[address].len) {
        case 1:
          self.writeChar(parseInt(address), checked.writes[address].val)
          break
        case 2:
          self.writeShort(parseInt(address), checked.writes[address].val)
          break
        case 4:
          self.writeWord(parseInt(address), checked.writes[address].val)
          break
        case 8:
          self.writeLong(parseInt(address), checked.writes[address].val)
          break
        }
      }
    })
  }

  checked.prototype.toPatch = function toPatch(seed, preset, tournament) {
    const writes = this.writes
    let size = 60 // Header
    const addresses = Object.getOwnPropertyNames(writes)
    addresses.forEach(function(address) {
      size += 9 + writes[address].len
    })
    const patch = new Uint8Array(size)
    const magic = "PPF30"
    let c = 0
    for (let i = 0; i < magic.length; i++) {
      patch[c++] = magic.charCodeAt(i)
    }
    patch[c++] = 0x02
    let description = ['SotN randomized: ', seed]
    if (preset || tournament) {
      const info = []
      if (preset) {
        info.push(preset)
      }
      if (tournament) {
        info.push('tournament')
      }
      description.push(' (', info.join(' '), ')')
    }
    description = description.join('').slice(0, 50)
    description += Array(50 - description.length).fill(' ').join('')
    for (let i = 0; i < description.length; i++) {
      patch[c++] = description.charCodeAt(i)
    }
    patch[c++] = 0x00
    patch[c++] = 0x00
    patch[c++] = 0x00
    patch[c++] = 0x00
    addresses.forEach(function(key) {
      address = parseInt(key)
      for (let i = 0; i < 8; i++) {
        patch[c++] = address & 0xff
        address >>>= 8
      }
      patch[c++] = writes[key].len
      let val = writes[key].val
      for (let i = 0; i < writes[key].len; i++) {
        if (Array.isArray(val)) {
          patch[c++] = val[i] & 0xff
        } else {
          patch[c++] = val & 0xff
          val >>>= 8
        }
      }
    })
    return patch
  }

  checked.prototype.sum = function sum() {
    const state = JSON.stringify(this.writes).split('').map(function(b) {
      return b.charCodeAt()
    })
    return sha256(new Uint8Array(state)).then(function(hex) {
      let zeros = 0
      while (hex.length > 3 && hex[zeros] === '0') {
        zeros++
      }
      return parseInt(hex.slice(zeros, zeros + 3), 16)
    })
  }

  function optionsFromString(randomize) {
    const options = {}
    let i = 0
    while (i < randomize.length) {
      let c = randomize[i++]
      let negate = false
      if (c === '~') {
        if (randomize.length === i) {
          throw new Error('Expected randomization argument to negate')
        }
        negate = true
        c = randomize[i++]
      }
      switch (c) {
      case 'p': {
        // Check for an argument.
        if (negate) {
          throw new Error('Cannot negate preset option')
        }
        if (randomize[i] !== ':') {
          throw new Error('Expected argument')
        }
        let arg
        let start
        // Parse the arg name.
        start = ++i
        while (i < randomize.length && randomize[i] !== ',') {
          i++
        }
        arg = randomize.slice(start, i)
        if (!arg.length) {
          throw new Error('Expected argument')
        }
        options.preset = arg
        if (randomize[i] === ',') {
          i++
        }
        break
      }
      case 'd': {
        if (negate) {
          options.enemyDrops = false
          break
        }
        let enemyDrops = options.enemyDrops || true
        // Check for an argument.
        if (randomize[i] === ':') {
          i++
          let args = 0
          while (i < randomize.length && randomize[i] !== ',') {
            let arg
            let start
            // Parse the arg name.
            start = i
            while (i < randomize.length
                   && [',', ':'].indexOf(randomize[i]) === -1) {
              i++
            }
            arg = randomize.slice(start, i)
            const block = arg[0] === '-'
            if (block) {
              arg = arg.slice(1)
            }
            if (!arg.length) {
              throw new Error('Expected argument')
            }
            const dashIndex = arg.lastIndexOf('-')
            let level
            if (dashIndex !== -1) {
              level = parseInt(arg.slice(dashIndex + 1))
              arg = arg.slice(0, dashIndex)
            }
            let enemyName
            if (arg === '*' || arg === constants.GLOBAL_DROP) {
              enemyName = arg
            } else {
              let enemy
              let matches
              if (arg.toLowerCase() === 'librarian') {
                enemy = {name: 'Librarian'}
                matches = []
              } else {
                matches = enemies.filter(function(enemy) {
                  let name = enemy.name.replace(/[^a-zA-Z0-9]/g, '')
                  name = name.toLowerCase()
                  return name === arg.toLowerCase()
                })
                if (matches.length > 1 && typeof(level) !== 'undefined') {
                  enemy = matches.filter(function(enemy) {
                    return enemy.level === level
                  })[0]
                } else {
                  enemy = matches[0]
                }
              }
              if (!enemy) {
                throw new Error('Unknown enemy: ' + arg)
              }
              enemyName = enemy.name.replace(/[^a-zA-Z0-9]/g, '')
              if (matches.length > 1 && matches[0] !== enemy) {
                enemyName += '-' + enemy.level
              }
            }
            if (typeof(enemyDrops) !== 'object') {
              enemyDrops = {}
            }
            if (randomize[i] === ':') {
              start = ++i
              while (i < randomize.length
                     && [',', ':'].indexOf(randomize[i]) === -1) {
                i++
              }
              arg = randomize.slice(start, i)
              if (block) {
                enemyDrops.blocked = enemyDrops.blocked || {}
                enemyDrops.blocked[enemyName] = arg.split('-').map(
                  function(arg)  {
                    const item = items.filter(function(item) {
                      let name = item.name.replace(/[^a-zA-Z0-9]/g, '')
                      name = name.toLowerCase()
                      return name === arg.toLowerCase()
                    })[0]
                    if (!item) {
                      throw new Error('Unknown item: ' + arg)
                    }
                    return item.name
                  }
                )
              } else {
                enemyDrops[enemyName] = []
                arg.split('-').forEach(function(arg, index)  {
                  if (enemyName !== constants.GLOBAL_DROP && index > 1) {
                    throw new Error('Too many drops for enemy: ' + enemy.name)
                  }
                  if (arg) {
                    const item = items.filter(function(item) {
                      let name = item.name.replace(/[^a-zA-Z0-9]/g, '')
                      name = name.toLowerCase()
                      return name === arg.toLowerCase()
                    })[0]
                    if (!item) {
                      throw new Error('Unknown item: ' + arg)
                    }
                    const itemName = item.name
                    enemyDrops[enemyName].push(itemName)
                  } else {
                    enemyDrops[enemyName].push('')
                  }
                })
              }
            }
            if (randomize[i] === ':') {
              i++
            }
            args++
          }
          if (randomize[i] === ',') {
            i++
          }
          if (!args) {
            throw new Error('Expected arguments')
          }
        } else if (typeof(enemyDrops) === 'undefined') {
          // Otherwise it's just turning on drop randomization.
          enemyDrops = true
        }
        if (typeof(enemyDrops) === 'object'
            && Object.getOwnPropertyNames(enemyDrops).length === 0) {
          enemyDrops = true
        }
        options.enemyDrops = enemyDrops
        break
      }
      case 'e': {
        if (negate) {
          options.startingEquipment = false
          break
        }
        let startingEquipment = options.startingEquipment || true
        // Check for an argument.
        if (randomize[i] === ':') {
          i++
          let args = 0
          while (i < randomize.length && randomize[i] !== ',') {
            let arg
            let start
            // Parse the arg name.
            start = i
            while (i < randomize.length
                   && [',', ':'].indexOf(randomize[i]) === -1) {
              i++
            }
            arg = randomize.slice(start, i)
            const block = arg[0] === '-'
            if (block) {
              arg = arg.slice(1)
            }
            if (!arg.length) {
              throw new Error('Expected argument')
            }
            if (['r', 'l', 'h', 'b', 'c', 'o', 'a', 'x'].indexOf(arg) === -1) {
              throw new Error('Unknown equipment slot: ' + arg)
            }
            const slot = arg
            if (randomize[i] !== ':') {
              throw new Error('Expected argument')
            }
            start = ++i
            while (i < randomize.length
                   && [',', ':'].indexOf(randomize[i]) === -1) {
              i++
            }
            arg = randomize.slice(start, i)
            const itemNames = arg.split('-').map(function(name) {
              const item = items.filter(function(item) {
                let name = item.name.replace(/[^a-zA-Z0-9]/g, '')
                name = name.toLowerCase()
                return name === arg.toLowerCase()
              })[0]
              if (!item) {
                throw new Error('Unknown item: ' + arg)
              }
              let types
              switch (slot) {
              case 'r':
                types = [
                  constants.TYPE.WEAPON1,
                  constants.TYPE.WEAPON2,
                  constants.TYPE.SHIELD,
                  constants.TYPE.USABLE,
                ]
                if (types.indexOf(item.type) === -1) {
                  throw new Error('Cannot equip ' + item.name
                                  + ' in right hand')
                }
                if (startingEquipment.l
                    && item.type === constants.TYPE.WEAPON2) {
                  throw new Error('Cannot equip ' + item.name
                                  + ' and a two handed weapon')
                }
                break
              case 'l':
                types = [
                  constants.TYPE.WEAPON1,
                  constants.TYPE.SHIELD,
                  constants.TYPE.USABLE,
                ]
                if (types.indexOf(item.type) === -1) {
                  throw new Error('Cannot equip ' + item.name
                                  + ' in left hand')
                }
                if (startingEquipment.r
                    && startingEquipment.r.type === constants.TYPE.WEAPON2) {
                  throw new Error('Cannot equip ' + item.name
                                  + ' and a two handed weapon')
                }
                break
              case 'h':
                if (item.type !== constants.TYPE.HELMET) {
                  throw new Error('Cannot equip ' + item.name + ' on head')
                }
                break
              case 'b':
                if (item.type !== constants.TYPE.ARMOR) {
                  throw new Error('Cannot equip ' + item.name + ' on body')
                }
                break
              case 'c':
                if (item.type !== constants.TYPE.CLOAK) {
                  throw new Error('Cannot equip ' + item.name + ' as cloak')
                }
                break
              case 'o':
                if (item.type !== constants.TYPE.ACCESSORY) {
                  throw new Error('Cannot equip ' + item.name + ' as other')
                }
                break
              case 'a':
                if (item.type !== constants.TYPE.ARMOR) {
                  throw new Error('Cannot give ' + item.name + ' as armor')
                }
                break
              case 'x':
                if (item.type !== constants.TYPE.ACCESSORY) {
                  throw new Error('Cannot equip ' + item.name + ' as other')
                }
                break
              }
              return item.name
            })
            if (typeof(startingEquipment) !== 'object') {
              startingEquipment = {}
            }
            if (block) {
              startingEquipment.blocked = startingEquipment.blocked || {}
              startingEquipment.blocked[slot] = itemNames
            } else {
              startingEquipment[slot] = itemNames
            }
            if (randomize[i] === ':') {
              i++
            }
            args++
          }
          if (randomize[i] === ',') {
            i++
          }
          if (!args) {
            throw new Error('Expected argument')
          }
        } else if (typeof(startingEquipment) === 'undefined') {
          // Otherwise it's just turning on equipment randomization.
          startingEquipment = true
        }
        if (typeof(startingEquipment) === 'object'
            && Object.getOwnPropertyNames(startingEquipment).length === 0) {
          startingEquipment = true
        }
        options.startingEquipment = startingEquipment
        break
      }
      case 'i': {
        if (negate) {
          options.itemLocations = false
          break
        }
        let itemLocations = options.itemLocations || true
        // Check for an argument.
        if (randomize[i] === ':') {
          i++
          let args = 0
          while (i < randomize.length && randomize[i] !== ',') {
            let arg
            let start
            // Parse the arg name.
            start = i
            while (i < randomize.length
                   && [',', ':'].indexOf(randomize[i]) === -1) {
              i++
            }
            arg = randomize.slice(start, i)
            const block = arg[0] === '-'
            if (block) {
              arg = arg.slice(1)
            }
            if (!arg.length) {
              throw new Error('Expected argument')
            }
            if (typeof(itemLocations) !== 'object') {
              itemLocations = {}
            }
            if (arg !== '*' && !(arg in constants.ZONE)) {
              throw new Error('Unknown zone: ' + arg)
            }
            const zone = arg
            if (randomize[i] !== ':') {
              throw new Error('Expected argument')
            }
            start = ++i
            while (i < randomize.length
                   && [',', ':'].indexOf(randomize[i]) === -1) {
              i++
            }
            arg = randomize.slice(start, i)
            if (!arg.length) {
              throw new Error('Expected argument')
            }
            let itemName
            let index
            if (arg === '*') {
              itemName = arg
              index = 0
            } else {
              const dashIndex = arg.lastIndexOf('-')
              if (dashIndex === -1) {
                index = 0
              } else {
                index = parseInt(arg.slice(dashIndex + 1)) - 1
                if (index < 0) {
                  throw new Error('Unknown item number: '
                                  + arg.slice(dashIndex + 1))
                }
                arg = arg.slice(0, dashIndex)
              }
              const item = items.filter(function(item) {
                let name = item.name.replace(/[^a-zA-Z0-9]/g, '')
                name = name.toLowerCase()
                return name === arg.toLowerCase()
              })[0]
              if (!item) {
                throw new Error('Unknown item: ' + arg)
              }
              itemName = item.name
              const tile = item.tiles && item.tiles.filter(function(tile) {
                if (typeof(tile.zones) !== 'undefined') {
                  return tile.zones.indexOf(constants.ZONE[zone]) !== -1
                }
              })[index]
              if (!tile) {
                throw new Error('Item not found in zone: ' + arg)
              }
            }
            if (randomize[i] !== ':') {
              throw new Error('Expected argument')
            }
            start = ++i
            while (i < randomize.length
                   && [',', ':'].indexOf(randomize[i]) === -1) {
              i++
            }
            arg = randomize.slice(start, i)
            if (!arg.length) {
              throw new Error('Expected argument')
            }
            const replace = arg.split('-').map(function(arg) {
              const item = items.filter(function(item) {
                let name = item.name.replace(/[^a-zA-Z0-9]/g, '')
                name = name.toLowerCase()
                return name === arg.toLowerCase()
              })[0]
              if (!item) {
                throw new Error('Unknown item: ' + arg)
              }
              return item
            })
            let locations = itemLocations
            if (block) {
              itemLocations.blocked = itemLocations.blocked || {}
              locations = itemLocations.blocked
            }
            locations[zone] = locations[zone] || {}
            const map = locations[zone][itemName] || {}
            map[index] = replace.map(function(item) {
              return item.name
            })
            locations[zone][itemName] = map
            if (randomize[i] === ':') {
              i++
            }
          }
          args++
          if (randomize[i] === ',') {
            i++
          }
          if (!args) {
            throw new Error('Expected argument')
          }
        } else if (typeof(itemLocations) === 'undefined') {
          // Otherwise it's just turning on item randomization.
          itemLocations = true
        }
        if (typeof(itemLocations) === 'object'
            && Object.getOwnPropertyNames(itemLocations).length === 0) {
          itemLocations = true
        }
        options.itemLocations = itemLocations
        break
      }
      case 'b': {
        if (negate) {
          options.prologueRewards = false
          break
        }
        let prologueRewards = options.prologueRewards || true
        // Check for an argument
        if (randomize[i] === ':') {
          i++
          let args = 0
          while (i < randomize.length && randomize[i] !== ',') {
            let arg
            let start
            // Parse the arg name.
            start = i
            while (i < randomize.length
                   && [',', ':'].indexOf(randomize[i]) === -1) {
              i++
            }
            arg = randomize.slice(start, i)
            const block = arg[0] === '-'
            if (block) {
              arg = arg.slice(1)
            }
            if (!arg.length) {
              throw new Error('Expected argument')
            }
            const item = arg
            if (['h', 'n', 'p'].indexOf(item) === -1) {
              throw new Error('Unknown reward: ' + arg)
            }
            if (randomize[i] !== ':') {
              throw new Error('Expected argument')
            }
            start = ++i
            while (i < randomize.length
                   && [',', ':'].indexOf(randomize[i]) === -1) {
              i++
            }
            arg = randomize.slice(start, i)
            const replaceNames = arg.split('-').map(function(arg) {
              const replace = items.filter(function(item) {
                let name = item.name.replace(/[^a-zA-Z0-9]/g, '')
                name = name.toLowerCase()
                return name === arg.toLowerCase()
              })[0]
              if (!replace) {
                throw new Error('Unknown item: ' + arg)
              }
              return replace.name
            })
            if (typeof(prologueRewards) !== 'object') {
              prologueRewards = {}
            }
            if (block) {
              prologueRewards.blocked = prologueRewards.block || {}
              prologueRewards.blocked[item] = replaceNames
            } else {
              prologueRewards[item] = replaceNames
            }
            if (randomize[i] === ':') {
              i++
            }
            args++
          }
          if (randomize[i] === ',') {
            i++
          }
          if (!args) {
            throw new Error('Expected argument')
          }
        } else if (typeof(prologueRewards) === 'undefined') {
          // Otherwise it's just turning on reward randomization.
          prologueRewards = true
        }
        if (typeof(prologueRewards) === 'object'
            && Object.getOwnPropertyNames(prologueRewards).length === 0) {
          prologueRewards = true
        }
        options.prologueRewards = prologueRewards
        break
      }
      case 'r': {
        if (negate) {
          options.relicLocations = false
          break
        }
        let relicLocations = options.relicLocations || true
        // Check for an argument.
        if (randomize[i] === ':') {
          i++
          let args = 0
          while (i < randomize.length && randomize[i] !== ',') {
            // If there's an argument it's either a location lock, a location
            // extension, or a complexity target.
            const relicNames = Object.getOwnPropertyNames(constants.RELIC)
            let arg
            let start
            // Parse the arg name.
            start = i
            while (i < randomize.length
                   && [',', ':'].indexOf(randomize[i]) === -1) {
              i++
            }
            arg = randomize.slice(start, i)
            if (!arg.length) {
              throw new Error('Expected argument')
            }
            const locations = relics.map(function(relic) {
              return relic.ability
            }).concat(extension.map(function(location) {
              return location.name
            }))
            let ext
            let leakPrevention
            let thrustSwordAbility
            let location
            let placing
            let replacing
            let blocking
            if (/^[0-9]+(-[0-9]+)?$/.test(arg)) {
              location = arg
            } else if (arg === 'x') {
              ext = true
            } else if (arg === 'r') {
              leakPrevention = true
            } else if (arg === '~r') {
              leakPrevention = false
            } else if (arg === constants.RELIC.THRUST_SWORD) {
              thrustSwordAbility = true
            } else if (arg === '~' + constants.RELIC.THRUST_SWORD) {
              thrustSwordAbility = false
            } else {
              if (arg.startsWith('@')) {
                placing = true
                arg = arg.slice(1)
              } else if (arg.startsWith('=')) {
                replacing = true
                arg = arg.slice(1)
              } else if (arg.startsWith('-')) {
                blocking = true
                arg = arg.slice(1)
              }
              location = locations.filter(function(name) {
                if (name.length > 1) {
                  const loc = name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
                  return loc === arg.toLowerCase()
                }
                return name === arg
              }).pop()
              if (!location) {
                throw new Error('Invalid relic location: ' + arg)
              }
            }
            if (typeof(relicLocations) !== 'object') {
              relicLocations = {}
            }
            if (typeof(thrustSwordAbility) !== 'undefined') {
              relicLocations.thrustSwordAbility = thrustSwordAbility
            } else if (typeof(leakPrevention) !== 'undefined') {
              relicLocations.leakPrevention = leakPrevention
            } else if (randomize[i] === ':') {
              start = ++i
              while (i < randomize.length
                     && [',', ':'].indexOf(randomize[i]) === -1) {
                i++
              }
              arg = randomize.slice(start, i)
              if (ext) {
                const keys = Object.getOwnPropertyNames(constants.EXTENSION)
                const extensions = keys.map(function(key) {
                  return constants.EXTENSION[key]
                })
                if (extensions.indexOf(arg) === -1) {
                  throw new Error('Invalid relic locations extension: ' + arg)
                }
                relicLocations.extension = arg
              } else if (placing) {
                const relics = arg.split('')
                const invalid = relics.filter(function(c) {
                  if (c === '0') {
                    return false
                  }
                  return !relicNames.some(function(relic) {
                    return constants.RELIC[relic] === c
                  })
                })
                if (invalid.length) {
                  throw new Error('Invalid relic: ' + invalid[0])
                }
                relicLocations.placed = relicLocations.placed || {}
                relicLocations.placed[location] = relics.map(function(c) {
                  if (c === '0') {
                    return null
                  }
                  return c
                })
              } else if (replacing) {
                const relic = location
                const item = items.filter(function(item) {
                  let name = item.name.replace(/[^a-zA-Z0-9]/g, '')
                  name = name.toLowerCase()
                  return name === arg.toLowerCase()
                })[0]
                if (!item) {
                  throw new Error('Unknown item: ' + arg)
                }
                relicLocations.replaced = relicLocations.replaced || {}
                relicLocations.replaced[relic] = item.name
              } else if (blocking) {
                const relics = arg.split('')
                const invalid = relics.filter(function(c) {
                  if (c === '0') {
                    return false
                  }
                  return !relicNames.some(function(relic) {
                    return constants.RELIC[relic] === c
                  })
                })
                if (invalid.length) {
                  throw new Error('Invalid relic: ' + invalid[0])
                }
                relicLocations.blocked = relicLocations.blocked || {}
                relicLocations.blocked[location] = relics.map(function(c) {
                  if (c === '0') {
                    return null
                  }
                  return c
                })
              } else {
                const invalid = arg.split('').filter(function(c) {
                  if (c === '-' || c === '+') {
                    return false
                  }
                  return !relicNames.some(function(relic) {
                    return constants.RELIC[relic] === c
                  })
                })
                if (invalid.length) {
                  throw new Error('Invalid relic: ' + invalid[0])
                }
                const parts = arg.split('+')
                if (parts.length > 2) {
                  throw new Error('Invalid lock: ' + location + ':' + arg)
                }
                parts.forEach(function(part, index) {
                  let locks = part.split('-')
                  if (placing && locks.length > 1) {
                    throw new Error('Invalid placement: @' + location + ':'
                                    + arg)
                  }
                  const emptyLocks = locks.filter(function(lock) {
                    return lock.length === 0
                  })
                  locks = locks.filter(function(lock) {
                    return lock.length > 0
                  })
                  if (emptyLocks.length > 1) {
                    throw new Error('Invalid lock: ' + location + ':' + arg)
                  }
                  if (index > 0) {
                    locks = locks.map(function(lock) { return '+' + lock })
                  }
                  relicLocations[location] = relicLocations[location] || []
                  Array.prototype.push.apply(relicLocations[location], locks)
                })
              }
            } else {
              throw new Error('Expected argument')
            }
            if (randomize[i] === ':') {
              i++
            }
            args++
          }
          if (randomize[i] === ',') {
            i++
          }
          if (!args) {
            throw new Error('Expected argument')
          }
        } else if (typeof(relicLocations) === 'undefined') {
          // Otherwise it's just turning on relic randomization.
          relicLocations = true
        }
        if (typeof(relicLocations) === 'object'
            && Object.getOwnPropertyNames(relicLocations).length === 0) {
          relicLocations = true
        }
        options.relicLocations = relicLocations
        break
      }
      case 's': {
        if (negate) {
          options.stats = false
          break
        }
        options.stats = true
        break;
      }
      case 'm': {
        if (negate) {
          options.music = false
          break
        }
        options.music = true
        break
      }
      case 'k': {
        if (negate) {
          options.turkeyMode = false
          break
        }
        options.turkeyMode = true
        break
      }
      case 'w': {
        if (negate) {
          break
        }
        let writes = []
        if (randomize[i] !== ':') {
          throw new Error('Expected argument')
        }
        i++
        let args = 0
        while (i < randomize.length && randomize[i] !== ',') {
          let address
          let value
          let start
          // Parse the address.
          start = i
          while (i < randomize.length
                 && [',', ':'].indexOf(randomize[i]) === -1) {
            i++
          }
          address = randomize.slice(start, i)
          if (!address.length) {
            throw new Error('Expected address')
          }
          address = parseInt(address)
          if (checkAddressRange(address)) {
            throw new Error('Invalid address: ' + address)
          }
          if (randomize[i] !== ':') {
            throw new Error('Expected value')
          }
          start = ++i
          while (i < randomize.length
                 && [',', ':'].indexOf(randomize[i]) === -1) {
            i++
          }
          value = randomize.slice(start, i)
          if (!value.length) {
            throw new Error('Expected value')
          }
          let isRandom = value.startsWith('n')
          let isInt = value.startsWith('0x')
          let hex
          if (isInt) {
            if (value.length <= 2) {
              throw new Error('Invalid value: ' + value)
            }
            hex = value.slice(2)
          } else {
            hex = value
          }
          if (!isRandom && (hex.length % 2 || !hex.match(/^[a-fA-F0-9]+$/))) {
            throw new Error('Invalid value: ' + value)
          }
          let type
          if (isInt || isRandom) {
            let length
            if (isRandom) {
              switch (value) {
              case 'rc': length = 1
              case 'rs': length = 2
              case 'rw': length = 4
              case 'rl': length = 8
              default:
                throw new Error('Invalid value: ' + value)
              }
            } else {
              value = parseInt(value)
              length = hex.length
            }
            switch (length) {
            case 2:
              writes.push({
                type: 'char',
                address: address,
                value: value,
              })
              break
            case 4:
              writes.push({
                type: 'short',
                address: address,
                value: value,
              })
              break
            case 8:
              writes.push({
                type: 'word',
                address: address,
                value: value,
              })
              break
            case 16:
              writes.push({
                type: 'long',
                address: address,
                value: value,
              })
              break
            default:
              throw new Error('Invalid value: ' + value)
            }
          } else {
            const hexBytes = value.split(/([a-fA-F0-9]{2})/g)
            value = hexBytes.reduce(function(bytes, byteValue) {
              if (byteValue.length) {
                bytes.push(parseInt(byteValue, 16))
              }
              return bytes
            }, [])
            writes.push({
              type: 'string',
              address: address,
              value: value,
            })
          }
          if (randomize[i] === ':') {
            i++
          }
          args++
        }
        if (randomize[i] === ',') {
          i++
        }
        if (!args) {
          throw new Error('Expected argument')
        }
        options.writes = writes
        break
      }
      case 't': {
        if (negate) {
          options.tournamentMode = false
          break
        }
        options.tournamentMode = true
        break
      }
      default:
        throw new Error('Invalid randomization: ' + c)
      }
    }
    if (!Object.getOwnPropertyNames(options).length) {
      throw new Error('No randomizations')
    }
    return options
  }

  function presets() {
    try {
      if (self) {
        return self.sotnRando.presets
      } else {
        return require('../build/presets')
      }
    } catch (err) {
      return []
    }
  }

  function presetFromName(name) {
    const all = presets()
    return all.filter(function(preset) {
      return 'id' in preset && preset.id === name
    }).pop()
  }

  function optionsToString(options, disableRecurse) {
    options = Object.assign({}, options)
    delete options.checkVanilla
    delete options.verbose
    Object.getOwnPropertyNames(options).forEach(function(opt) {
      if (options[opt] === false) {
        delete options[opt]
      }
    })
    const safe = presetFromName('safe')
    // Handle the edge case where there is a preset, but the remaining
    // options are the same as the preset options.
    if ('preset' in options
        && Object.getOwnPropertyNames(options).length > 1) {
      // If relicLocations is strictly true, replace it with the safe preset
      // location locks.
      const copy = Object.assign({}, options)
      delete copy.preset
      if (copy.relicLocations === true) {
        copy.relicLocations = clone(safe.options().relicLocations)
      }
      // Now compare the remaining options to the preset options.
      const preset = presetFromName(options.preset)
      if (optionsToString(copy) === optionsToString(preset.options())) {
        // If they match, the options become the preset by itself.
        options = {preset: preset.id}
      }
    }
    let randomize = []
    while (Object.getOwnPropertyNames(options).length) {
      if ('tournamentMode' in options) {
        if (options.tournamentMode) {
          randomize.push('t')
        }
        delete options.tournamentMode
      } else if ('preset' in options) {
        randomize.push('p:' + options.preset)
        delete options.preset
      } else if ('enemyDrops' in options) {
        if (options.enemyDrops) {
          let opt = 'd'
          if (typeof(options.enemyDrops) === 'object') {
            const drops = options.enemyDrops
            if (drops.blocked) {
              Object.getOwnPropertyNames(drops.blocked).forEach(
                function(enemyName) {
                  if (enemyName === '*') {
                    opt += ':-*'
                  } else {
                    opt += ':-' + enemyName.replace(/[^a-zA-Z0-9\-]/g, '')
                  }
                  opt += ':'
                  opt += drops.blocked[enemyName].map(function(name) {
                    return name.replace(/[^a-zA-Z0-9]/g, '')
                  }).join('-')
                }
              )
            }
            Object.getOwnPropertyNames(drops).filter(function(enemyName) {
              return enemyName !== 'blocked'
            }).forEach(function(enemyName) {
              if (enemyName === '*') {
                opt += ':*'
              } else {
                opt += ':' + enemyName.replace(/[^a-zA-Z0-9\-]/g, '')
              }
              if (drops[enemyName].length) {
                opt += ':'
                opt += drops[enemyName].map(function(dropName) {
                  if (dropName) {
                    return dropName.replace(/[^a-zA-Z0-9]/g, '')
                  }
                }).join('-')
              }
            })
          }
          randomize.push(opt)
        }
        delete options.enemyDrops
      } else if ('startingEquipment' in options) {
        if (options.startingEquipment) {
          let opt = 'e'
          const eq = options.startingEquipment
          if (typeof(eq) === 'object') {
            if (eq.blocked) {
              if ('r' in eq.blocked) {
                opt += ':-r:'
                if (eq.blocked.r) {
                  opt += eq.blocked.r.map(function(name) {
                    return name.replace(/[^a-zA-Z0-9]/g, '')
                  }).join('-')
                }
              }
              if ('l' in eq.blocked) {
                opt += ':-l:'
                if (eq.blocked.l) {
                  opt += eq.blocked.l.map(function(name) {
                    return name.replace(/[^a-zA-Z0-9]/g, '')
                  }).join('-')
                }
              }
              if ('h' in eq.blocked) {
                opt += ':-h:'
                if (eq.blocked.h) {
                  opt += eq.blocked.h.map(function(name) {
                    return name.replace(/[^a-zA-Z0-9]/g, '')
                  }).join('-')
                }
              }
              if ('b' in eq.blocked) {
                opt += ':-b:'
                if (eq.blocked.b) {
                  opt += eq.blocked.b.map(function(name) {
                    return name.replace(/[^a-zA-Z0-9]/g, '')
                  }).join('-')
                }
              }
              if ('c' in eq.blocked) {
                opt += ':-c:'
                if (eq.blocked.c) {
                  opt += eq.blocked.c.map(function(name) {
                    return name.replace(/[^a-zA-Z0-9]/g, '')
                  }).join('-')
                }
              }
              if ('o' in eq.blocked) {
                opt += ':-o:'
                if (eq.blocked.o) {
                  opt += eq.blocked.o.map(function(name) {
                    return name.replace(/[^a-zA-Z0-9]/g, '')
                  }).join('-')
                }
              }
              if ('a' in eq.blocked) {
                opt += ':-a:'
                if (eq.blocked.a) {
                  opt += eq.blocked.a.map(function(name) {
                    return name.replace(/[^a-zA-Z0-9]/g, '')
                  }).join('-')
                }
              }
              if ('x' in eq.blocked) {
                opt += ':-x:'
                if (eq.blocked.x) {
                  opt += eq.blocked.x.map(function(name) {
                    return name.replace(/[^a-zA-Z0-9]/g, '')
                  }).join('-')
                }
              }
            }
            if ('r' in eq) {
              opt += ':r:'
              opt += eq.r.map(function(name) {
                if (name) {
                  return name.replace(/[^a-zA-Z0-9]/g, '')
                }
                return ''
              }).join('-')
            }
            if ('l' in eq) {
              opt += ':l:'
              opt += eq.l.map(function(name) {
                if (name) {
                  return name.replace(/[^a-zA-Z0-9]/g, '')
                }
                return ''
              }).join('-')
            }
            if ('h' in eq) {
              opt += ':h:'
              opt += eq.h.map(function(name) {
                if (name) {
                  return name.replace(/[^a-zA-Z0-9]/g, '')
                }
                return ''
              }).join('-')
            }
            if ('b' in eq) {
              opt += ':b:'
              opt += eq.b.map(function(name) {
                if (name) {
                  return name.replace(/[^a-zA-Z0-9]/g, '')
                }
                return ''
              }).join('-')
            }
            if ('c' in eq) {
              opt += ':c:'
              opt += eq.c.map(function(name) {
                if (name) {
                  return name.replace(/[^a-zA-Z0-9]/g, '')
                }
                return ''
              }).join('-')
            }
            if ('o' in eq) {
              opt += ':o:'
              opt += eq.o.map(function(name) {
                if (name) {
                  return name.replace(/[^a-zA-Z0-9]/g, '')
                }
                return ''
              }).join('-')
            }
            if ('a' in eq) {
              opt += ':a:'
              opt += eq.a.map(function(name) {
                if (name) {
                  return name.replace(/[^a-zA-Z0-9]/g, '')
                }
                return ''
              }).join('-')
            }
            if ('x' in eq) {
              opt += ':x:'
              opt += eq.x.map(function(name) {
                if (name) {
                  return name.replace(/[^a-zA-Z0-9]/g, '')
                }
                return ''
              }).join('-')
            }
          }
          randomize.push(opt)
        }
        delete options.startingEquipment
      } else if ('itemLocations' in options) {
        if (options.itemLocations) {
          let opt = 'i'
          if (typeof(options.itemLocations) === 'object') {
            if (options.itemLocations.blocked) {
              const zoneNames = Object.getOwnPropertyNames(constants.ZONE)
              const zones = ['*'].concat(zoneNames)
              zones.forEach(function(zone) {
                if (zone in options.itemLocations.blocked) {
                  const items = options.itemLocations.blocked[zone]
                  Object.getOwnPropertyNames(items).forEach(
                    function(itemName) {
                      const map = items[itemName]
                      if (itemName !== '*') {
                        itemName = itemName.replace(/[^a-zA-Z0-9]/g, '')
                      }
                      const indexes = Object.getOwnPropertyNames(map)
                      indexes.forEach(function(index) {
                        index = parseInt(index)
                        const replaceNames = map[index]
                        opt += ':-' + zone
                          + ':' + itemName
                          + (index > 0 ? '-' + (index + 1) : '')
                          + ':' + replaceNames.map(function(name) {
                            return name.replace(/[^a-zA-Z0-9]/g, '')
                          }).join('-')
                      })
                    }
                  )
                }
              })
            }
            const zoneNames = Object.getOwnPropertyNames(constants.ZONE)
            const zones = ['*'].concat(zoneNames)
            zones.forEach(function(zone) {
              if (zone in options.itemLocations) {
                const items = options.itemLocations[zone]
                Object.getOwnPropertyNames(items).forEach(function(itemName) {
                  const map = items[itemName]
                  if (itemName !== '*') {
                    itemName = itemName.replace(/[^a-zA-Z0-9]/g, '')
                  }
                  const indexes = Object.getOwnPropertyNames(map)
                  indexes.forEach(function(index) {
                    index = parseInt(index)
                    const replaceNames = map[index]
                    opt += ':' + zone
                      + ':' + itemName
                      + (index > 0 ? '-' + (index + 1) : '')
                      + ':' + replaceNames.map(function(name) {
                        return name.replace(/[^a-zA-Z0-9]/g, '')
                      }).join('-')
                  })
                })
              }
            })
          }
          randomize.push(opt)
        }
        delete options.itemLocations
      } else if ('prologueRewards' in options) {
        if (options.prologueRewards) {
          let opt = 'b'
          if (typeof(options.prologueRewards) === 'object') {
            const rewards = ['h', 'n', 'p']
            if (options.prologueRewards.blocked) {
              rewards.forEach(function(reward) {
                if (reward in options.prologueRewards.blocked) {
                  opt += ':-' + reward
                  options.prologueRewards.blocked[reward].forEach(
                    function(itemName) {
                      opt += ':'
                      if (itemName) {
                        opt += itemName.replace(/[^a-zA-Z0-9]/g, '')
                      }
                    }
                  )
                }
              })
            }
            rewards.forEach(function(reward) {
              if (reward in options.prologueRewards) {
                opt += ':' + reward
                options.prologueRewards[reward].forEach(function(itemName) {
                  opt += ':'
                  if (itemName) {
                    opt += itemName.replace(/[^a-zA-Z0-9]/g, '')
                  }
                })
              }
            })
          }
          randomize.push(opt)
        }
        delete options.prologueRewards
      } else if ('relicLocations' in options) {
        if (options.relicLocations) {
          let opt = 'r'
          if (typeof(options.relicLocations) === 'object') {
            const locks = []
            const keys = Object.getOwnPropertyNames(options.relicLocations)
            for (let i = 0; i < keys.length; i++) {
              if (/^[0-9]+(-[0-9]+)?$/.test(keys[i])) {
                let lock = keys[i]
                lock += ':' + options.relicLocations[keys[i]].join('-')
                locks.push(lock)
                break
              }
            }
            if (options.relicLocations.extension) {
              locks.push('x:' + options.relicLocations.extension)
            }
            if ('leakPrevention' in options.relicLocations
                && !options.relicLocations.leakPrevention) {
              locks.push('~r')
            }
            if (options.relicLocations.thrustSwordAbility) {
              locks.push(constants.RELIC.THRUST_SWORD)
            }
            const locations = relics.concat(extension)
            const self = this
            locations.filter(function(location) {
              const extensions = []
              switch (options.relicLocations.extension) {
              case constants.EXTENSION.EQUIPMENT:
                extensions.push(constants.EXTENSION.EQUIPMENT)
	      case constants.EXTENSION.SPREAD:
                extensions.push(constants.EXTENSION.SPREAD)
              case constants.EXTENSION.GUARDED:
                extensions.push(constants.EXTENSION.GUARDED)
                break
              default:
                return !('extension' in location)
              }
              return !('extension' in location)
                || extensions.indexOf(location.extension) !== -1
            }).map(function(location) {
              if (typeof(location.ability) === 'string') {
                return location.ability
              }
              return location.name
            }).forEach(function(location) {
              if (options.relicLocations[location]) {
                let lock = location.replace(/[^a-zA-Z0-9]/g, '')
                lock += ':' + options.relicLocations[location].filter(
                  function(lock) {
                    return lock[0] !== '+'
                  }
                ).join('-')
                const escapes = options.relicLocations[location].filter(
                  function(lock) {
                    return lock[0] === '+'
                  }
                ).map(function(lock) {
                  return lock.slice(1)
                })
                if (escapes.length) {
                  lock += '+' + escapes.join('-')
                }
                locks.push(lock)
              }
            })
            if (options.relicLocations.placed) {
              const placed = options.relicLocations.placed
              Object.getOwnPropertyNames(placed).forEach(function(location) {
                const relics = placed[location].map(function(relic) {
                  if (relic === null) {
                    return '0'
                  }
                  return relic
                })
                locks.push('@' + location + ':' + relics.join(''))
              })
            }
            if (options.relicLocations.replaced) {
              const replaced = options.relicLocations.replaced
              Object.getOwnPropertyNames(replaced).forEach(function(relic) {
                locks.push('=' + relic + ':' + replaced[relic])
              })
            }
            if (options.relicLocations.blocked) {
              const blocked = options.relicLocations.blocked
              Object.getOwnPropertyNames(blocked).forEach(function(location) {
                const relics = blocked[location].map(function(relic) {
                  if (relic === null) {
                    return '0'
                  }
                  return relic
                })
                locks.push('-' + location + ':' + relics.join(''))
              })
            }
            if (locks.length) {
              opt += ':' + locks.join(':')
            }
          }
          randomize.push(opt)
        }
        delete options.relicLocations
      } else if ('stats' in options) {
        if (options.stats) {
          randomize.push('s')
        }
        delete options.stats
      } else if ('music' in options) {
        if (options.music) {
          randomize.push('m')
        }
        delete options.music
      } else if ('turkeyMode' in options) {
        if (options.turkeyMode) {
          randomize.push('k')
        }
        delete options.turkeyMode
      } else if ('writes' in options) {
        if (options.writes) {
          let opt = 'w'
          options.writes.forEach(function(write) {
            opt += ':' + numToHex(write.address) + ':'
            let value
            switch (write.type) {
            case 'char':
              if (write.value === 'random') {
                opt += 'rc'
              } else {
                opt += numToHex(write.value, 2)
              }
              break
            case 'short':
              if (write.value === 'random') {
                opt += 'rs'
              } else {
                opt += numToHex(write.value, 4)
              }
              break
            case 'word':
              if (write.value === 'random') {
                opt += 'rw'
              } else {
                opt += numToHex(write.value, 8)
              }
              break
            case 'long':
              if (write.value === 'random') {
                opt += 'rl'
              } else {
                opt += numToHex(write.value, 16)
              }
              break
            case 'string':
              opt += bufToHex(write.value)
              break
            }
          })
          randomize.push(opt)
        }
        delete options.writes
      } else {
        const unknown = Object.getOwnPropertyNames(options).pop()
        throw new Error('Unknown options: ' + unknown)
      }
    }
    if (!randomize.length) {
      throw new Error('No randomizations')
    }
    randomize = randomize.reduce(function(str, opt, index) {
      if (opt.length > 1 && index < randomize.length - 1) {
        opt += ','
      }
      return str + opt
    }, '')
    // Handle the edge case where the options are the same as a preset.
    if (!disableRecurse) {
      const preset = presets().filter(function(preset) {
        if (preset instanceof Preset) {
          const options = preset.options()
          if (preset === safe) {
            options.relicLocations = true
          }
          return optionsToString(options, true) === randomize
        }
      }).pop()
      if (preset) {
        randomize = 'p:' + preset.id
      }
    }
    return randomize
  }

  function optionsToUrl(version, options, checksum, seed, baseUrl) {
    options = optionsToString(options)
    const args = []
    const releaseBaseUrl = constants.optionsUrls[constants.defaultOptions]
    if (version.match(/-/)) {
      baseUrl = constants.devBaseUrl
      if (options !== constants.defaultOptions) {
        args.push(options)
      }
    } else if (!baseUrl || baseUrl === releaseBaseUrl) {
      if (options in constants.optionsUrls) {
        baseUrl = constants.optionsUrls[options]
      } else {
        baseUrl = releaseBaseUrl
        args.push(options)
      }
    } else {
      args.push(options)
    }
    if (typeof(checksum) === 'number') {
      args.push(checksum.toString(16))
    } else if (checksum !== undefined) {
      args.push(checksum)
    }
    if (seed !== undefined) {
      args.push(encodeURIComponent(seed))
    }
    let url = baseUrl
    if (args.reduce(function(prev, next) {
      if (next !== '') {
        return true
      }
      return prev
    }, false)) {
      url += '?' + args.join(',')
    }
    return url
  }

  function optionsFromUrl(url) {
    url = new URL(url)
    const args = url.search.slice(1).split(',')
    const baseUrl = url.origin + url.pathname
    const presets = Object.getOwnPropertyNames(constants.optionsUrls)
    if (args.length < 4) {
      for (let i = 0; i < presets.length; i++) {
        if (constants.optionsUrls[presets[i]] === baseUrl) {
          if (args.length === 1) {
            args.unshift(undefined)
          }
          args.unshift(presets[i])
          break
        }
      }
    }
    let options
    let checksum
    let seed
    if (args.length > 2) {
      options = optionsFromString(args.slice(0, args.length - 2).join(','))
    } else {
      options = optionsFromString(constants.defaultOptions)
    }
    seed = decodeURIComponent(args.pop())
    checksum = parseInt(args.pop(), 16)
    return {
      options: options,
      checksum: checksum,
      seed: seed,
    }
  }

  function toGameString(text) {
    const string = []
    for (let i = 0; i < text.length; i++) {
      if (text[i] in constants.characterMap) {
        const bytes = constants.characterMap[text[i]]
        string.push(bytes[0], bytes[1])
      } else if (text[i].match(/[a-zA-Z ]/)) {
        string.push(text.charCodeAt(i))
      } 
    }
    return string
  }

  function writeMenuText(data, text, range) {
    const string = toGameString(text)
    let length = Math.min(string.length, range.length)
    if (string[length - 1] & 0x80) {
      length--
    }
    data.writeString(range.start, string.slice(0, length).concat([0x00]))
  }

  function setSeedText(data, seed, version, preset, tournament) {
    const seedRange = {
      start: 0x04389c6c,
      length: 30,
    }
    const presetRange = {
      start: 0x04389c8c,
      length: 30,
    }
    data.writeShort(0x043930c4, 0x78b4)
    data.writeShort(0x043930d4, 0x78d4)
    data.writeShort(0x0439312c, 0x78b4)
    data.writeShort(0x0439313c, 0x78d4)
    data.writeShort(0x04393484, 0x78b4)
    data.writeShort(0x04393494, 0x78d4)
    writeMenuText(data, seed, seedRange)
    writeMenuText(
      data,
      version + ' ' + (preset || '') + (tournament ? ' tournament' : ''),
      presetRange
    )
  }

  function saltSeed(version, options, seed, nonce) {
    nonce = nonce || 0
    return JSON.stringify({
      version: version,
      options: optionsToString(options),
      seed: seed,
      nonce: nonce,
    })
  }

  function restoreFile(data, file) {
    const dataLength = file.len + Math.floor(file.len / 0x800) * 0x130
    data = data.slice(file.pos, file.pos + dataLength)
    file = Buffer.alloc(file.len)
    let curr = file
    while (data.length) {
      curr.set(data.slice(0, 0x800))
      curr = curr.slice(0x800)
      data = data.slice(0x800 + 0x130)
    }
    return file
  }

  function formatObject(obj, indent, hex) {
    indent = indent || 0
    if (Array.isArray(obj)) {
      let padFirst
      let padLast
      if (obj.length > 0) {
        padFirst = typeof(obj[0]) !== 'object'
        padLast = typeof(obj[obj.length - 1]) !== 'object'
      }
      return '[' + (padFirst ? ' ' : '') + obj.map(function(el) {
        return formatObject(el, indent, hex)
      }).join(', ') + (padLast ? ' ' : '') + ']'
    }
    switch (typeof(obj)) {
    case 'string':
      return '\'' + entry[1].replace(/'/g, '\\\'') + '\''
    case 'number':
      if (hex) {
        return numToHex(obj)
      }
      return obj.toString(10)
    case 'object':
      const outer = Array(indent).fill(' ').join('')
      const inner = Array(indent + 2).fill(' ').join('')
      const lines = []
      for (entry of Object.entries(obj)) {
        let name = inner + entry[0] + ': '
        let value
        switch (entry[0]) {
        case 'ability':
          const names = Object.getOwnPropertyNames(constants.RELIC)
          value = 'RELIC.' + names.filter(function(name) {
            return constants.RELIC[name] === entry[1]
          })[0]
          break
        case 'enemy':
          if (entry[1] === constants.GLOBAL_DROP) {
            value = 'GLOBAL_DROP'
          } else {
            value = entry[1]
          }
          break
        case 'type':
          value = 'TYPE.' + constants.typeNames[entry[1]]
          break
        case 'zones':
          value = '[ ' + entry[1].map(function(zoneId) {
            return 'ZONE.' + constants.zoneNames[zoneId]
          }).join(', ') + ' ]'
          break
        case 'candle':
        case 'sprite':
        case 'special':
        case 'extra':
        case 'flags':
          value = numToHex(entry[1], 2)
          break
        case 'offset':
        case 'icon':
        case 'palette':
        case 'spell':
        case 'drawFlags':
          value = numToHex(entry[1], 4)
          break
        case 'elements':
          value = '0x' + bufToHex(entry[1])
          break
        case 'nameAddress':
        case 'descriptionAddress':
        case 'tiles':
        case 'defs':
          value = numToHex(entry[1], 8)
          break
        case 'hasSpell':
          value = entry[1].toString()
          break
        case 'handType':
          value = 'HAND_TYPE.' + constants.handTypeNames[entry[1]]
          break
        default:
          let hex
          const hexTypes = [
            'addresses',
            'blacklist',
            'entities',
            'dropAddresses',
          ]
          if (hexTypes.indexOf(entry[0]) !== -1) {
            hex = true
          }
          value = formatObject(entry[1], indent + 2, hex)
          break
        }
        lines.push(name + value + ',')
      }
      return '{\n' + lines.join('\n') + '\n' + outer + '}'
    }
    return obj.toString()
  }

  function formatInfo(info, verbosity) {
    if (!info) {
      return ''
    }
    const props = []
    for (let level = 0; level <= verbosity; level++) {
      Object.getOwnPropertyNames(info[level]).forEach(function(prop) {
        if (props.indexOf(prop) === -1) {
          props.push(prop)
        }
      })
    }
    const lines = []
    props.forEach(function(prop) {
      for (let level = 0; level <= verbosity; level++) {
        if (info[level][prop]) {
          let text = prop + ':'
          if (Array.isArray(info[level][prop])) {
            text += '\n' + info[level][prop].map(function(item) {
              return '  ' + item
            }).join('\n')
          } else {
            text += ' ' + info[level][prop]
          }
          lines.push(text)
        }
      }
    })
    return lines.join('\n')
  }

  function newInfo() {
    const MAX_VERBOSITY = 5
    return Array(MAX_VERBOSITY + 1).fill(null).map(function() {
      return {}
    })
  }

  function mergeInfo(info, newInfo) {
    if (newInfo) {
      info.forEach(function(level, index) {
        merge.call(level, newInfo[index])
      })
    }
  }

  function sanitizeResult(result) {
    if (result.mapping) {
      Object.getOwnPropertyNames(result.mapping).forEach(function(location) {
        const relic = result.mapping[location]
        result.mapping[location] = Object.assign({}, relic, {
          replaceWithItem: undefined,
          replaceWithRelic: undefined,
        })
      })
    }
    if (result.relics) {
      result.relics = result.relics.map(function(relic) {
        return Object.assign({}, relic, {
          replaceWithItem: undefined,
          replaceWithRelic: undefined,
        })
      })
    }
    if (result.locations) {
      result.locations = result.locations.map(function(location) {
        return Object.assign({}, location, {
          replaceWithItem: undefined,
          replaceWithRelic: undefined,
        })
      })
    }
  }

  function shuffled(rng, array) {
    const copy = array.slice()
    const shuffled = []
    while (copy.length) {
      const rand = Math.floor(rng() * copy.length)
      shuffled.push(copy.splice(rand, 1)[0])
    }
    return shuffled
  }

  function isRelic(entity) {
    return entity.data.readUInt16LE(4) === 0x000b
  }

  function isItem(entity) {
    return entity.data.readUInt16LE(4) === 0x000c
  }

  function isCandle(zone, entity) {
    const states = []
    switch (zone.id) {
    case constants.ZONE.ST0:
      states.push(0x20, 0x30, 0x80, 0x90)
      break
    case constants.ZONE.ARE:
      states.push(0x10)
      break
    case constants.ZONE.CAT:
      states.push(0x00, 0x10, 0x20)
      break
    case constants.ZONE.CHI:
      states.push(0x00, 0x10)
      break
    case constants.ZONE.DAI:
      states.push(0x00, 0x10)
      break
    case constants.ZONE.LIB:
      states.push(0x00)
      break
    case constants.ZONE.NO0:
      states.push(0x00, 0x10, 0x20, 0x80)
      break
    case constants.ZONE.NO1:
      states.push(0x50, 0x60)
      break
    case constants.ZONE.NO2:
      states.push(0x00, 0x10, 0x20, 0x30, 0x40, 0x60)
      break
    case constants.ZONE.NO3:
    case constants.ZONE.NP3:
      states.push(0x00)
      break
    case constants.ZONE.NO4:
      states.push(0x00, 0x50, 0x60)
      break
    case constants.ZONE.NZ0:
      states.push(0x00, 0x10, 0x20)
      break
    case constants.ZONE.NZ1:
      states.push(0x00, 0x10, 0x40, 0x50, 0x60)
      break
    case constants.ZONE.TOP:
      states.push(0x20, 0x30, 0x60)
      break
    case constants.ZONE.RARE:
      states.push(0x10)
      break
    case constants.ZONE.RCAT:
      states.push(0x00, 0x10, 0x20)
      break
    case constants.ZONE.RCHI:
      states.push(0x00, 0x10)
      break
    case constants.ZONE.RDAI:
      states.push(0x00, 0x10)
      break
    case constants.ZONE.RLIB:
      states.push(0x00)
      break
    case constants.ZONE.RNO0:
      states.push(0x00, 0x10, 0x20, 0x80)
      break
    case constants.ZONE.RNO1:
      states.push(0x50, 0x60)
      break
    case constants.ZONE.RNO2:
      states.push(0x00, 0x10, 0x20, 0x30, 0x40, 0x60)
      break
    case constants.ZONE.RNO3:
      states.push(0x00)
      break
    case constants.ZONE.RNO4:
      states.push(0x00, 0x50, 0x60)
      break
    case constants.ZONE.RNZ0:
      states.push(0x00, 0x10, 0x20)
      break
    case constants.ZONE.RNZ1:
      states.push(0x10, 0x40, 0x50, 0x60)
      break
    case constants.ZONE.RTOP:
      states.push(0x20, 0x30, 0x60)
      break
    }
    const id = entity.data.readUInt16LE(4)
    return id === 0xa001 && states.indexOf(entity.data[9] & 0xf0) !== -1
  }

  function isContainer(zone, entity) {
    const id = entity.data.readUInt16LE(4)
    const ids = []
    switch (zone.id) {
    case constants.ZONE.CAT:
      if (id == 0x002c) {
        return entity.data[8] > 0
      }
      ids.push({
        id: 0x0025,
      })
      ids.push({
        id: 0xa001,
        states: [ 0x70 ],
      })
      break
    case constants.ZONE.CHI:
      ids.push({
        id: 0x0018,
      })
      break
    case constants.ZONE.RCHI:
      ids.push({
        id: 0x0020,
      })
      break
    case constants.ZONE.DAI:
    case constants.ZONE.RDAI:
    case constants.ZONE.RNO4:
      ids.push({
        id: 0xa001,
        states: [ 0x70, 0x80 ],
      })
      break
    case constants.ZONE.RLIB:
      ids.push({
        id: 0x0029,
      })
      ids.push({
        id: 0xa001,
        states: [ 0x70, 0x90 ],
      })
      break
    case constants.ZONE.LIB:
      if (id == 0x003d) {
        return entity.data[9] === 0
      }
      ids.push({
        id: 0xa001,
        states: [ 0x70, 0x90 ],
      })
      break
    case constants.ZONE.NO1:
      ids.push({
        id: 0xa001,
        states: [ 0x70, 0x80 ],
      })
      break
    case constants.ZONE.RNO1:
      ids.push({
        id: 0xa001,
        states: [ 0x70, 0x80 ],
      })
      break
    case constants.ZONE.NO2:
    case constants.ZONE.RNO2:
      ids.push({
        id: 0xa001,
        states: [ 0x70 ],
      })
      break
    case constants.ZONE.NO4:
    case constants.ZONE.BO3:
      ids.push({
        id: 0xa001,
        states: [ 0x70 ],
      })
      break
    case constants.ZONE.NZ0:
      ids.push({
        id: 0x0034,
      }, {
        id: 0x0035,
      }, {
        id: 0x0036,
      }, {
        id: 0x0037,
      })
      break
    case constants.ZONE.TOP:
    case constants.ZONE.RTOP:
      ids.push({
        id: 0xa001,
        states: [ 0x70, 0x80, 0x90 ],
      })
      ids.push({
        id: 0x001b,
      })
      break
    case constants.ZONE.RCAT:
      ids.push({
        id: 0xa001,
        states: [ 0x70 ],
      })
      ids.push({
        id: 0x002e,
      })
      break
    case constants.ZONE.RNO3:
      ids.push({
        id: 0x0045,
      })
      break
    case constants.ZONE.RNZ0:
      ids.push({
        id: 0x0027,
      })
      ids.push({
        id: 0x0028,
      })
      ids.push({
        id: 0x0029,
      })
      ids.push({
        id: 0x002a,
      })
      ids.push({
        id: 0x002b,
      })
      break
    }
    for (let i = 0; i < ids.length; i++) {
      if (ids[i].id === id) {
        if ('states' in ids[i]
            && ids[i].states.indexOf(entity.data[9]) === -1) {
          return false
        }
        return true
      }
    }
  }

  function containedItem(data, zone, entity) {
    let index
    const entId = entity.data.readUInt16LE(4)
    const state = entity.data.readUInt16LE(8)
    switch (zone.id) {
    case constants.ZONE.RCHI:
    case constants.ZONE.CHI: {
      index = state + 3
      break
    }
    case constants.ZONE.NZ0: {
      switch (entId) {
      case 0x0034:
        switch (state) {
        case 0x0003:
          index = 6
          break
        case 0x0004:
          index = 10
          break
        default:
          index = state
          break
        }
        break
      case 0x0035:
        index = state + 3
        break
      case 0x0036:
        index = state + 7
        break
      case 0x0037:
        switch (state) {
        case 0x002:
          return {
            index: state,
            item: relicFromName('Bat Card')
          }
        case 0x0003:
          return {
            index: state,
            item: relicFromName('Skill of Wolf')
          }
        }
      }
      break
    }
    case constants.ZONE.TOP:
      if (entId === 0x001b) {
        index = 2 - state
        break
      }
    case constants.ZONE.LIB:
      if (entId === 0x003d) {
        index = state + 1
        break
      }
    case constants.ZONE.RLIB:
      if (entId === 0x0029) {
        index = state + 6
        break
      }
    case constants.ZONE.CAT: {
      if (entId === 0x0025) {
        index = 4 * state 
        break
      }
    }
    case constants.ZONE.RCAT: {
      if (entId === 0x002e) {
        index = 7 * state + 1
        break
      }
    }
    case constants.ZONE.NO1:
      if ((state >> 8) === 0x80) {
        index = 3 + (state & 0xff)
        break
      }
    case constants.ZONE.DAI:
    case constants.ZONE.LIB:
    case constants.ZONE.NO2:
    case constants.ZONE.NO4:
    case constants.ZONE.BO3:
    case constants.ZONE.RDAI:
    case constants.ZONE.RNO1:
    case constants.ZONE.RNO2:
    case constants.ZONE.RNO4:
    case constants.ZONE.RTOP:
      index = entity.data[8]
      break
    default:
      index = entity.data.readUInt16LE(8)
      break
    }
    const id = data.readUInt16LE(zone.items + 0x2 * index)
    const item = itemFromTileId(items, id)
    return {
      index: index,
      item: item,
    }
  }

  function relicFromAbility(ability) {
    return relics.filter(function(relic) {
      return relic.ability === ability
    }).pop()
  }

  function relicFromName(name) {
    return relics.filter(function(relic) {
      return relic.name === name
    }).pop()
  }

  function enemyFromIdString(idString) {
    const dashIndex = idString.lastIndexOf('-')
    let enemyName = idString.toLowerCase()
    let level
    if (dashIndex !== -1) {
      level = parseInt(enemyName.slice(dashIndex + 1))
      enemyName = idString.slice(0, dashIndex).toLowerCase()
    }
    return enemies.filter(function(enemy) {
      const name = enemy.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')
      if (name === enemyName) {
        if (typeof(level) !== 'undefined') {
          return enemy.level === level
        }
        return true
      }
    }).pop()
  }

  function Preset(
    id,
    name,
    description,
    author,
    weight,
    hidden,
    override,
    enemyDrops,
    startingEquipment,
    itemLocations,
    prologueRewards,
    relicLocations,
    stats,
    music,
    turkeyMode,
    writes,
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.author = author
    this.weight = weight
    this.hidden = hidden
    this.override = override
    this.enemyDrops = enemyDrops
    this.startingEquipment = startingEquipment
    this.itemLocations = itemLocations
    this.prologueRewards = prologueRewards
    this.relicLocations = relicLocations
    this.stats = stats
    this.music = music
    this.turkeyMode = turkeyMode
    if (writes) {
      this.writes = writes
    }
  }

  function clone(obj) {
    if (obj === null) {
      return null
    }
    if (obj === undefined) {
      return null
    }
    if (Array.isArray(obj)) {
      return obj.slice().map(clone)
    } else if (typeof(obj) === 'object' && obj) {
      return Object.getOwnPropertyNames(obj).reduce(function(copy, prop) {
        copy[prop] = clone(obj[prop])
        return copy
      }, {})
    }
    return obj
  }

  function merge(obj, verbose) {
    const self = this
    Object.getOwnPropertyNames(obj).forEach(function(prop) {
      if (Array.isArray(obj[prop])) {
        self[prop] = clone(obj[prop])
      } else if (typeof(obj[prop]) === 'object') {
        if (Array.isArray(self[prop])) {
          self[prop] = clone(obj[prop])
        } else if (typeof(self[prop]) === 'object') {
          merge.call(self[prop], obj[prop])
        } else {
          self[prop] = clone(obj[prop])
        }
      } else {
        self[prop] = clone(obj[prop])
      }
    })
  }

  Preset.options = function options(options) {
    options = clone(options)
    if (options.preset) {
      let preset = presets().filter(function(preset) {
        return preset.id === options.preset
      }).pop()
      if (!preset && !self) {
        try {
          preset = require('../build/presets/' + options.preset)
        } catch (err) {
          if (err.code !== 'MODULE_NOT_FOUND') {
            console.error(err.stack)
            throw new Error('Error loading preset: ' + options.preset)
          }
        }
      }
      if (!preset) {
        throw new Error('Unknown preset: ' + options.preset)
      }
      delete options.preset
      const presetOptions = preset.options()
      merge.call(presetOptions, options)
      return presetOptions
    }
    return options
  }

  Preset.prototype.toString = function toString() {
    return optionsToString.bind(this, this.options())()
  }

  Preset.prototype.options = function options() {
    const options = Object.assign({}, this)
    delete options.id
    delete options.name
    delete options.description
    delete options.author
    delete options.weight
    delete options.hidden
    delete options.override
    return clone(options)
  }

  // Helper class to create relic location locks.
  function PresetBuilder(metadata) {
    this.metadata = metadata
    // Aliases.
    this.zoneAliases = {}
    this.enemyAliases = {}
    this.relicAliases = {}
    this.locationAliases = {}
    this.itemAliases = {}
    // The collection of enemy drops.
    this.drops = true
    // The collection of starting equipment.
    this.equipment = true
    // The collection of item locations.
    this.items = true
    // The collection of prologue rewards.
    this.rewards = true
    // The collection of location locks.
    this.locations = true
    // The collection of escape requirements.
    this.escapes = {}
    // The relic locations extension.
    this.extension = constants.EXTENSION.GUARDED
    // Leak prevention.
    this.leakPrevention = true
    // Thrust sword ability.
    this.thrustSword = false
    // The complexity goal.
    this.target = undefined
    this.goal = undefined
    // Item stats randomization.
    this.stats = true
    // Music randomization.
    this.music = true
    // Turkey mode.
    this.turkey = true
    // Arbitrary writes.
    this.writes = undefined
  }

  function getZoneAlias(alias) {
    if (alias in this.zoneAliases) {
      return this.zoneAliases[alias]
    }
    return alias
  }

  function getEnemyAlias(alias) {
    if (alias in this.enemyAliases) {
      return this.enemyAliases[alias]
    }
    return alias
  }

  function getRelicAlias(alias) {
    if (alias in this.relicAliases) {
      return this.relicAliases[alias]
    }
    return alias
  }

  function getLocationAlias(alias) {
    if (alias in this.locationAliases) {
      return this.locationAliases[alias]
    }
    return alias
  }

  function getItemAlias(alias) {
    if (alias in this.itemAliases) {
      return this.itemAliases[alias]
    }
    return alias
  }

  function locationFromName(name) {
    const relic = relicFromName(name)
    if (relic) {
      return relic.ability
    }
    return name
  }

  function locksFromArray(locks) {
    const self = this
    return locks.map(function(lock) {
      return lock.split(/\s*\+\s*/).map(function(name) {
        return relicFromName(getRelicAlias.call(self, name)).ability
      }).join('')
    })
  }

  PresetBuilder.fromJSON = function fromJSON(json) {
    const builder = new PresetBuilder(json.metadata)
    if ('alias' in json) {
      json.alias.forEach(function(alias) {
        if ('zone' in alias) {
          builder.zoneAlias(alias.zone, alias.alias)
        }
        if ('enemy' in alias) {
          builder.enemyAlias(alias.enemy, alias.alias)
        }
        if ('relic' in alias) {
          builder.relicAlias(alias.relic, alias.alias)
        }
        if ('location' in alias) {
          builder.locationAlias(alias.relic, alias.alias)
        }
        if ('item' in alias) {
          builder.temAlias(alias.item, alias.alias)
        }
      })
    }
    if ('inherits' in json) {
      builder.inherits(json.inherits)
    }
    if ('itemLocations' in json) {
      if (typeof(json.itemLocations) === 'boolean') {
        builder.itemLocations(json.itemLocations)
      } else if (Array.isArray(json.itemLocations)) {
        json.itemLocations.forEach(function(itemLocation) {
          let zone = getZoneAlias.call(builder, itemLocation.zone)
          if (zone !== '*') {
            zone = constants.ZONE[zone]
          }
          const args = [zone, itemLocation.item]
          if ('index' in itemLocation) {
            args.push(itemLocation.index)
          }
          args.push(itemLocation.replacement)
          builder.itemLocations.apply(builder, args)
        })
      } else {
        throw new Error('unsupported itemLocations type')
      }
    }
    if ('blockItems' in json) {
      json.blockItems.forEach(function(itemLocation) {
        let zone = getZoneAlias.call(builder, itemLocation.zone)
        if (zone !== '*') {
          zone = constants.ZONE[zone]
        }
        const args = [zone, itemLocation.item]
        if ('index' in itemLocation) {
          args.push(itemLocation.index)
        }
        args.push(itemLocation.replacement)
        builder.blockItem.apply(builder, args)
      })
    }
    if ('enemyDrops' in json) {
      if (typeof(json.enemyDrops) === 'boolean') {
        builder.enemyDrops(json.enemyDrops)
      } else if (Array.isArray(json.enemyDrops)) {
        json.enemyDrops.forEach(function(enemyDrop) {
          const args = [enemyDrop.enemy]
          if ('level' in enemyDrop) {
            args.push(enemyDrop.level)
          }
          Array.prototype.push.apply(args, enemyDrop.items)
          builder.enemyDrops.apply(builder, args)
        })
      } else {
        throw new Error('unsupported enemyDrops type')
      }
    }
    if ('blockDrops' in json) {
      json.blockDrops.forEach(function(enemyDrop) {
        const args = [enemyDrop.enemy]
        if ('level' in enemyDrop) {
          args.push(enemyDrop.level)
        }
        args.push(enemyDrop.items)
        builder.blockDrops.apply(builder, args)
      })
    }
    if ('prologueRewards' in json) {
      if (typeof(json.prologueRewards) === 'boolean') {
        builder.prologueRewards(json.prologueRewards)
      } else if (Array.isArray(json.prologueRewards)) {
        json.prologueRewards.forEach(function(prologueReward) {
          builder.prologueRewards(
            prologueReward.item,
            prologueReward.replacement,
          )
        })
      } else {
        throw new Error('unsupported prologueRewards type')
      }
    }
    if ('blockRewards' in json) {
      json.blockRewards.forEach(function(blockedReward) {
        builder.blockReward(
          blockedReward.item,
          blockedReward.replacement,
        )
      })
    }
    if ('startingEquipment' in json) {
      if (typeof(json.startingEquipment) === 'boolean') {
        builder.startingEquipment(json.startingEquipment)
      } else if (Array.isArray(json.startingEquipment)) {
        json.startingEquipment.forEach(function(startingEquipment) {
          const key = startingEquipment.slot.toUpperCase().replace(' ', '_')
          builder.startingEquipment(
            constants.SLOT[key],
            startingEquipment.item,
          )
        })
      } else {
        throw new Error('unsupported startingEquipment type')
      }
    }
    if ('blockEquipment' in json) {
      json.blockEquipment.forEach(function(blockedEquipment) {
        const key = blockedEquipment.slot.toUpperCase().replace(' ', '_')
        builder.blockEquipment(
          constants.SLOT[key],
          blockedEquipment.item,
        )
      })
    }
    if ('relicLocations' in json) {
      builder.relicLocations(json.relicLocations)
    }
    if ('preventLeaks' in json) {
      builder.preventLeaks(json.preventLeaks)
    }
    if ('thrustSwordAbility' in json) {
      builder.thrustSwordAbility(json.thrustSwordAbility)
    }
    if ('relicLocationsExtension' in json) {
      builder.relicLocationsExtension(json.relicLocationsExtension)
    }
    if ('lockLocation' in json) {
      json.lockLocation.forEach(function(lockLocation) {
        const locationName = getLocationAlias.call(
          builder,
          lockLocation.location,
        )
        const location = locationFromName(locationName)
        if ('locks' in lockLocation) {
          const locks = locksFromArray.call(builder, lockLocation.locks)
          builder.lockLocation(location, locks)
        }
        if ('block' in lockLocation) {
          let relic
          if (Array.isArray(lockLocation.block)) {
            relic = lockLocation.block.map(function(relic) {
              return relicFromName(getRelicAlias.call(builder, relic)).ability
            })
          } else {
            relic = getRelicAlias.call(builder, lockLocation.block)
            relic = relicFromName(relic).ability
          }
          builder.blockRelic(location, relic)
        }
        if ('escapeRequires' in lockLocation) {
          const escapes = locksFromArray.call(
            builder,
            lockLocation.escapeRequires,
          )
          builder.escapeRequires(location, escapes)
        }
      })
    }
    if ('placeRelic' in json) {
      json.placeRelic.forEach(function(placeRelic) {
        let relic = null
        if (Array.isArray(placeRelic.relic)) {
          relic = placeRelic.relic.map(function(relic) {
            if (relic) {
              return relicFromName(getRelicAlias.call(builder, relic)).ability
            }
            return null
          })
        } else if (placeRelic.relic) {
          relic = getRelicAlias.call(builder, placeRelic.relic)
          relic = relicFromName(relic).ability
        }
        const location = getLocationAlias.call(builder, placeRelic.location)
        builder.placeRelic(locationFromName(location), relic)
      })
    }
    if ('replaceRelic' in json) {
      json.replaceRelic.forEach(function(replaceRelic) {
        const relic = getRelicAlias.call(builder, replaceRelic.relic)
        builder.replaceRelic(
          relicFromName(relic).ability,
          replaceRelic.item,
        )
      })
    }
    if ('complexityGoal' in json) {
      if (json.complexityGoal) {
        const args = [json.complexityGoal.min]
        if ('max' in json.complexityGoal) {
          args.push(json.complexityGoal.max)
        }
        args.push(locksFromArray.call(builder, json.complexityGoal.goals))
        builder.complexityGoal.apply(builder, args)
      } else {
        builder.complexityGoal(false)
      }
    }
    if ('stats' in json) {
      builder.randomizeStats(json.stats)
    }
    if ('music' in json) {
      builder.randomizeMusic(json.music)
    }
    if ('turkeyMode' in json) {
      builder.turkeyMode(json.turkeyMode)
    }
    if ('writes' in json) {
      let lastAddress = 0
      json.writes.forEach(function(write) {
        let address = lastAddress
        if ('address' in write) {
          address = parseInt(write.address)
        }
        if (!('enabled' in write) || write.enabled) {
          switch (write.type) {
          case 'char':
            lastAddress = builder.writeChar(address, write.value)
            break
          case 'short':
            lastAddress = builder.writeShort(address, write.value)
            break
          case 'word':
            lastAddress = builder.writeWord(address, write.value)
            break
          case 'long':
            lastAddress = builder.writeLong(address, write.value)
            break
          case 'string':
            lastAddress = builder.writeString(address, write.value)
            break
          }
        } else {
          lastAddress = address
        }
      })
    }
    return builder
  }

  PresetBuilder.prototype.zoneAlias = function zoneAlias(what, alias) {
    assert.equal(typeof(what), 'string')
    assert.equal(typeof(alias), 'string')
    this.zoneAliases[alias] = what
  }

  PresetBuilder.prototype.enemyAlias = function enemyAlias(what, alias) {
    assert.equal(typeof(what), 'string')
    assert.equal(typeof(alias), 'string')
    this.enemyAliases[alias] = what
  }

  PresetBuilder.prototype.relicAlias = function relicAlias(what, alias) {
    assert.equal(typeof(what), 'string')
    assert.equal(typeof(alias), 'string')
    this.relicAliases[alias] = what
  }

  PresetBuilder.prototype.locationAlias = function locationAlias(what, alias) {
    assert.equal(typeof(what), 'string')
    assert.equal(typeof(alias), 'string')
    this.locationAliases[alias] = what
  }

  PresetBuilder.prototype.itemAlias = function itemAlias(what, alias) {
    assert.equal(typeof(what), 'string')
    assert.equal(typeof(alias), 'string')
    this.itemAliases[alias] = what
  }

  PresetBuilder.prototype.inherits = function inherits(id) {
    let preset
    if (self) {
      const presets = self.sotnRando.presets
      preset = presets.filter(function(preset) {
        return preset.id === id
      }).pop()
    } else {
      preset = require('../build/presets/' + id)
    }
    if ('enemyDrops' in preset) {
      if (typeof(preset.enemyDrops) === 'object') {
        const self = this
        self.drops = new Map()
        if ('blocked' in preset.enemyDrops) {
          self.drops.blocked = new Map()
          const ids = Object.getOwnPropertyNames(preset.enemyDrops.blocked)
          ids.forEach(function(id) {
            let enemy
            if (id === '*') {
              enemy = '*'
            } else if (id === constants.GLOBAL_DROP) {
              enemy = id
            } else {
              enemy = enemyFromIdString(id)
            }
            const dropNames = preset.enemyDrops.blocked[id]
            const drops = dropNames.map(function(name) {
              return items.filter(function(item) {
                return item.name === name
              }).pop()
            })
            self.drops.blocked.set(enemy, drops)
          })
        }
        const ids = Object.getOwnPropertyNames(preset.enemyDrops)
        ids.filter(function(id) {
          return id !== 'blocked'
        }).forEach(function(id) {
          let enemy
          if (id === '*') {
            enemy = '*'
          } else if (id === constants.GLOBAL_DROP) {
            enemy = id
          } else {
            enemy = enemyFromIdString(id)
          }
          const dropNames = preset.enemyDrops[id]
          const drops = dropNames.map(function(name) {
            return items.filter(function(item) {
              return item.name === name
            }).pop()
          })
          self.drops.set(enemy, drops)
        })
      } else {
        this.drops = preset.enemyDrops
      }
    }
    if ('startingEquipment' in preset) {
      if (typeof(preset.startingEquipment) === 'object') {
        const self = this
        self.equipment = {}
        if (preset.startingEquipment.blocked) {
          self.equipment.blocked = {}
          const slots = Object.getOwnPropertyNames(
            preset.startingEquipment.blocked
          )
          slots.forEach(function(slot) {
            self.equipment.blocked[slot] = items.filter(function(item) {
              return item.name === preset.startingEquipment.blocked[slot]
            }).pop()
          })
        }
        const slots = Object.getOwnPropertyNames(preset.startingEquipment)
        slots.filter(function(slot) {
          return slot !== 'blocked'
        }).forEach(function(slot) {
          self.equipment[slot] = items.filter(function(item) {
            return item.name === preset.startingEquipment[slot]
          }).pop()
        })
      } else {
        this.equipment = preset.startingEquipment
      }
    }
    if ('prologueRewards' in preset) {
      if (typeof(preset.prologueRewards) === 'object') {
        const self = this
        self.rewards = {}
        if (preset.prologueRewards.blocked) {
          self.rewards.blocked = {}
          const rewards = Object.getOwnPropertyNames(
            preset.prologueRewards.blocked
          )
          rewards.forEach(function(reward) {
            self.rewards.blocked[reward] = items.filter(function(item) {
              return item.name === preset.prologueRewards.blocked[reward]
            }).pop()
          })
        }
        const rewards = Object.getOwnPropertyNames(preset.prologueRewards)
        rewards.filter(function(reward) {
          return reward !== 'blocked'
        }).forEach(function(reward) {
          self.rewards[reward] = items.filter(function(item) {
            return item.name === preset.prologueRewards[reward]
          }).pop()
        })
      } else {
        this.rewards = preset.prologueRewards
      }
    }
    if ('itemLocations' in preset) {
      if (typeof(preset.itemLocations) === 'object') {
        const self = this
        self.items = {}
        const zoneNames = Object.getOwnPropertyNames(preset.itemLocations)
        zoneNames.forEach(function(zoneName) {
          self.items[zoneName] = self.items[zoneName] || new Map()
          const zoneItems = preset.itemLocations[zoneName]
          const itemNames = Object.getOwnPropertyNames(zoneItems)
          itemNames.forEach(function(itemName) {
            let item
            if (itemName === '*') {
              item = '*'
            } else {
              item = items.filter(function(item) {
                return item.name === itemName
              }).pop()
            }
            const indexes = Object.getOwnPropertyNames(zoneItems[itemName])
            indexes.forEach(function(index) {
              const replace = items.filter(function(item) {
                return item.name === zoneItems[itemName][index]
              }).pop()
              const map = self.items[zoneName].get(item) || {}
              map[index] = replace
              self.items[zoneName].set(item, map)
            })
          })
        })
      } else {
        this.items = preset.itemLocations
      }
    }
    if ('relicLocations' in preset) {
      if (typeof(preset.relicLocations) === 'object') {
        const self = this
        self.locations = {}
        if ('extension' in preset.relicLocations) {
          self.extension = preset.relicLocations.extension
        } else {
          delete self.extension
        }
        if ('leakPrevention' in preset.relicLocations) {
          self.leakPrevention = preset.relicLocations.leakPrevention
        }
        if ('thrustSwordAbility' in preset.relicLocations) {
          self.thrustSword = preset.relicLocations.thrustSwordAbility
        }
        if ('placed' in preset.relicLocations) {
          self.locations.placed = clone(preset.relicLocations.placed)
        }
        if ('replaced' in preset.relicLocations) {
          self.locations.replaced = clone(preset.relicLocations.replaced)
        }
        if ('blocked' in preset.relicLocations) {
          self.locations.blocked = clone(preset.relicLocations.blocked)
        }
        const locations = Object.getOwnPropertyNames(preset.relicLocations)
        locations.filter(function(location) {
          return [
            'extension',
            'leakPrevention',
            'thrustSwordAbility',
            'placed',
            'replaced',
            'blocked',
          ].indexOf(location) === -1
        }).forEach(function(location) {
          if ((/^[0-9]+(-[0-9]+)?$/).test(location)) {
            self.goal = preset.relicLocations[location].map(function(lock) {
              return new Set(lock)
            })
            const parts = location.split('-')
            self.target = {
              min: parseInt(parts[0]),
            }
            if (parts.length === 2) {
              self.target.max = parseInt(parts[1])
            }
          } else {
            // Break the lock into access locks and escape requirements.
            const locks = self.locations[location] || []
            const escape = self.escapes[location] || []
            preset.relicLocations[location].forEach(function(lock) {
              if (lock[0] === '+') {
                escape.push(new Set(lock.slice(1)))
              } else {
                locks.push(new Set(lock))
              }
            })
            self.locations[location] = locks
            self.escapes[location] = escape
          }
        })
      } else {
        this.locations = preset.relicLocations
      }
    }
    if ('stats' in preset) {
      this.stats = preset.stats
    }
    if ('music' in preset) {
      this.music = preset.music
    }
    if ('turkeyMode' in preset) {
      this.turkey = preset.turkeyMode
    }
    if ('writes' in preset) {
      this.writes = preset.writes
    }
  }

  PresetBuilder.prototype.enemyDrops =
    function enemyDrops(enemyName, level, commonDropName, rareDropName) {
      if (typeof(enemy) === 'boolean') {
        this.drops = enemy
      } else {
        enemyName = getEnemyAlias.call(this, enemyName)
        commonDropName = getItemAlias.call(this, commonDropName)
        rareDropName = getItemAlias.call(this, rareDropName)
        const args = Array.prototype.slice.call(arguments)
        if (typeof(this.drops) !== 'object') {
          this.drops = new Map()
        }
        let enemy
        if (enemyName === constants.GLOBAL_DROP) {
          enemy = enemyName
        } else if (enemyName === 'Librarian') {
          enemy = 'Librarian'
        } else {
          if (typeof(level) !== 'number') {
            rareDropName = commonDropName
            commonDropName = level
            level = undefined
          } else {
            args.splice(1, 1)
          }
          if (enemyName === '*') {
            enemy = '*'
          } else {
            enemy = enemies.filter(function(enemy) {
              if (enemy.name === enemyName) {
                if (typeof(level) !== 'undefined') {
                  return enemy.level === level
                }
                return true
              }
            }).pop()
            assert(enemy, 'Unknown enemy: ' + enemyName)
          }
        }
        const dropNames = args.slice(1)
        const drops = dropNames.map(function(dropName) {
          if (dropName) {
            const item = items.filter(function(item) {
              return item.name === dropName
            }).pop()
            assert(item, 'Unknown item: ' + dropName)
            return item
          }
        })
        this.drops.set(enemy, drops)
      }
    }

  PresetBuilder.prototype.blockDrops =
    function blockDrops(enemyName, level, drops) {
      enemyName = getEnemyAlias.call(this, enemyName)
      let enemy
      if (enemyName === constants.GLOBAL_DROP) {
        enemy = enemyName
      } else if (enemyName === 'Librarian') {
        enemy = 'Librarian'
      } else {
        if (typeof(level) !== 'number') {
          drops = level
          level = undefined
        }
        if (enemyName === '*') {
          enemy = '*'
        } else {
          enemy = enemies.filter(function(enemy) {
            if (enemy.name === enemyName) {
              if (typeof(level) !== 'undefined') {
                return enemy.level === level
              }
              return true
            }
          }).pop()
          assert(enemy, 'Unknown enemy: ' + enemyName)
        }
      }
      if (!Array.isArray(drops)) {
        drops = [drops]
      }
      const self = this
      drops = drops.map(function(drop) {
        return getItemAlias.call(self, drop)
      })
      drops = drops.map(function(dropName) {
        if (dropName) {
          const item = items.filter(function(item) {
            return item.name === dropName
          }).pop()
          assert(item, 'Unknown item: ' + dropName)
          return item
        }
      })
      if (typeof(this.drops) !== 'object') {
        this.drops = new Map()
      }
      this.drops.blocked = this.drops.blocked || new Map()
      this.drops.blocked.set(enemy, drops)
    }

  PresetBuilder.prototype.startingEquipment =
    function startingEquipment(slot, itemNames) {
      assert.oneOf(slot, [
        true,
        false,
        constants.SLOT.RIGHT_HAND,
        constants.SLOT.LEFT_HAND,
        constants.SLOT.HEAD,
        constants.SLOT.BODY,
        constants.SLOT.CLOAK,
        constants.SLOT.OTHER,
        constants.SLOT.AXEARMOR,
        constants.SLOT.LUCK_MODE,
      ])
      if (typeof(slot) === 'boolean') {
        this.equipment = slot
      } else {
        if (!Array.isArray(itemNames)) {
          itemNames = [itemNames]
        }
        const self = this
        itemNames = itemNames.map(function(name) {
          return getItemAlias.call(self, name)
        })
        if (typeof(this.equipment) !== 'object') {
          this.equipment = {}
        }
        this.equipment[slot] = this.equipment[slot] || []
        itemNames.forEach(function(itemName) {
          let item
          if (itemName) {
            item = items.filter(function(item) {
              return item.name === itemName
            }).pop()
            assert(item, 'Unknown item: ' + itemName)
            switch (slot) {
            case constants.SLOT.RIGHT_HAND:
              assert.oneOf(item.type, [
                constants.TYPE.WEAPON1,
                constants.TYPE.WEAPON2,
                constants.TYPE.SHIELD,
                constants.TYPE.USABLE,
              ])
              if (self.equipment[constants.SLOT.LEFT_HAND]) {
                self.equipment[constants.SLOT.LEFT_HAND].forEach(
                  function(eq) {
                    assert.notEqual(
                      eq.type,
                      constants.TYPE.WEAPON2,
                      'Cannot equipment ' + eq.name + ' and ' + item.name
                    )
                  }
                )
              }
              break
            case constants.SLOT.LEFT_HAND:
              assert.oneOf(item.type, [
                constants.TYPE.WEAPON1,
                constants.TYPE.SHIELD,
                constants.TYPE.USABLE,
              ])
              if (self.equipment[constants.SLOT.RIGHT_HAND]) {
                self.equipment[constants.SLOT.RIGHT_HAND].forEach(
                  function(eq) {
                    assert.notEqual(
                      eq.type,
                      constants.TYPE.WEAPON2,
                      'Cannot equipment ' + eq.name + ' and ' + item.name
                    )
                  }
                )
              }
              break
            case constants.SLOT.HEAD:
              assert.equal(item.type, constants.TYPE.HELMET,
                           'Cannot equip ' + item.name + ' on head')
              break
            case constants.SLOT.BODY:
              assert.equal(item.type, constants.TYPE.ARMOR,
                           'Cannot equip ' + item.name + ' on body')
              break
            case constants.SLOT.CLOAK:
              assert.equal(item.type, constants.TYPE.CLOAK,
                           'Cannot equip ' + item.name + ' as cloak')
              break
            case constants.SLOT.OTHER:
              assert.equal(item.type, constants.TYPE.ACCESSORY,
                           'Cannot equip ' + item.name + ' as other')
              break
            case constants.SLOT.AXEARMOR:
              assert.equal(item.type, constants.TYPE.ARMOR,
                           'Cannot equip ' + item.name + ' as armor')
              break
            case constants.SLOT.LUCK_MODE:
              assert.equal(item.type, constants.TYPE.ACCESSORY,
                           'Cannot equip ' + item.name + ' as other')
              break
            }
          }
          self.equipment[slot].push(item)
        })
      }
    }

  PresetBuilder.prototype.blockEquipment =
    function blockEquipment(slot, itemNames) {
      assert.oneOf(slot, [
        true,
        false,
        constants.SLOT.RIGHT_HAND,
        constants.SLOT.LEFT_HAND,
        constants.SLOT.HEAD,
        constants.SLOT.BODY,
        constants.SLOT.CLOAK,
        constants.SLOT.OTHER,
        constants.SLOT.AXEARMOR,
        constants.SLOT.LUCK_MODE,
      ])
      if (!Array.isArray(itemNames)) {
        itemNames = [itemNames]
      }
      const self = this
      itemNames = itemNames.map(function(name) {
        return getItemAlias.call(self, name)
      })
      if (typeof(this.equipment) !== 'object') {
        this.equipment = {}
      }
      this.equipment.blocked = this.equipment.blocked || {}
      this.equipment.blocked[slot] = this.equipment.blocked[slot] || []
      itemNames.forEach(function(itemName) {
        let item
        if (itemName) {
          item = items.filter(function(item) {
            return item.name === itemName
          }).pop()
          assert(item, 'Unknown item: ' + itemName)
          switch (slot) {
          case constants.SLOT.RIGHT_HAND:
            assert.oneOf(item.type, [
              constants.TYPE.WEAPON1,
              constants.TYPE.WEAPON2,
              constants.TYPE.SHIELD,
              constants.TYPE.USABLE,
            ])
            if (self.equipment[constants.SLOT.LEFT_HAND]) {
              self.equipment[constants.SLOT.LEFT_HAND].forEach(
                function(eq) {
                  assert.notEqual(
                    eq.type,
                    constants.TYPE.WEAPON2,
                    'Cannot equipment ' + eq.name + ' and ' + item.name
                  )
                }
              )
            }
            break
          case constants.SLOT.LEFT_HAND:
            assert.oneOf(item.type, [
              constants.TYPE.WEAPON1,
              constants.TYPE.SHIELD,
              constants.TYPE.USABLE,
            ])
            if (self.equipment[constants.SLOT.RIGHT_HAND]) {
              self.equipment[constants.SLOT.RIGHT_HAND].forEach(
                function(eq) {
                  assert.notEqual(
                    eq.type,
                    constants.TYPE.WEAPON2,
                    'Cannot equipment ' + eq.name + ' and ' + item.name
                  )
                }
              )
            }
            break
          case constants.SLOT.HEAD:
            assert.equal(item.type, constants.TYPE.HELMET,
                         'Cannot equip ' + item.name + ' on head')
            break
          case constants.SLOT.BODY:
            assert.equal(item.type, constants.TYPE.ARMOR,
                         'Cannot equip ' + item.name + ' on body')
            break
          case constants.SLOT.CLOAK:
            assert.equal(item.type, constants.TYPE.CLOAK,
                         'Cannot equip ' + item.name + ' as cloak')
            break
          case constants.SLOT.OTHER:
            assert.equal(item.type, constants.TYPE.ACCESSORY,
                         'Cannot equip ' + item.name + ' as other')
            break
          case constants.SLOT.AXEARMOR:
            assert.equal(item.type, constants.TYPE.ARMOR,
                         'Cannot equip ' + item.name + ' as armor')
            break
          case constants.SLOT.LUCK_MODE:
            assert.equal(item.type, constants.TYPE.ACCESSORY,
                         'Cannot equip ' + item.name + ' as other')
            break
          }
        }
        self.equipment.blocked[slot].push(item)
      })
    }

  PresetBuilder.prototype.itemLocations =
    function itemLocations(zoneId, itemName, number, replaceNames) {
      if (typeof(zoneId) === 'boolean') {
        this.items = zoneId
      } else {
        if (typeof(number) === 'string') {
          replaceNames = number
          number = 1
        }
        if (typeof(replaceNames) === 'string') {
          replaceNames = [replaceNames]
        }
        itemName = getItemAlias.call(this, itemName)
        const self = this
        replaceNames = replaceNames.map(function(name) {
          return getItemAlias.call(self, name)
        })
        assert(typeof(number) === 'number', 'Unknown item number: ' + number)
        const index = number - 1
        const zones = ['*'].concat(constants.zoneNames.map(function(zoneName) {
          return constants.ZONE[zoneName]
        }))
        assert.oneOf(zoneId, zones, 'Unknown zone: ' + zoneId)
        let zoneName
        if (zoneId === '*') {
          zoneName = '*'
        } else {
          zoneName = constants.zoneNames[zoneId]
        }
        let item
        if (itemName === '*') {
          item = '*'
        } else {
          item = items.filter(function(item) {
            return item.name === itemName
          })[0]
          assert(item, 'Unknown item: ' + itemName)
          const tiles = (item.tiles || []).filter(function(tile) {
            return 'zones' in tile && tile.zones.indexOf(zoneId) !== -1
          })
          assert(tiles[index], 'Unknown item tile: ' + itemName + ' ' + number)
        }
        if (typeof(this.items) !== 'object') {
          this.items = {}
        }
        this.items[zoneName] = this.items[zoneName] || new Map()
        const map = this.items[zoneName].get(item) || {}
        map[number - 1] = map[number - 1] || []
        replaceNames.forEach(function(replaceName) {
          const replace = items.filter(function(item) {
            return item.name === replaceName
          })[0]
          assert(replace, 'Unknown item: ' + replaceName)
          map[number - 1].push(replace)
        })
        this.items[zoneName].set(item, map)
      }
    }

  // Block an item from a tile.
  PresetBuilder.prototype.blockItem =
    function blockItem(zoneId, itemName, number, replaceNames) {
      if (typeof(number) !== 'number') {
        replaceNames = number
        number = 1
      }
      if (!Array.isArray(replaceNames)) {
        replaceNames = [replaceNames]
      }
      itemName = getItemAlias.call(this, itemName)
      const self = this
      replaceNames = replaceNames.map(function(name) {
        return getItemAlias.call(self, name)
      })
      assert(typeof(number) === 'number', 'Unknown item number: ' + number)
      const index = number - 1
      const zones = ['*'].concat(constants.zoneNames.map(function(zoneName) {
        return constants.ZONE[zoneName]
      }))
      assert.oneOf(zoneId, zones, 'Unknown zone: ' + zoneId)
      let zoneName
      if (zoneId === '*') {
        zoneName = '*'
      } else {
        zoneName = constants.zoneNames[zoneId]
      }
      let item
      if (itemName === '*') {
        item = '*'
      } else {
        item = items.filter(function(item) {
          return item.name === itemName
        })[0]
        assert(item, 'Unknown item: ' + itemName)
        const tiles = (item.tiles || []).filter(function(tile) {
          return 'zones' in tile && tile.zones.indexOf(zoneId) !== -1
        })
        assert(tiles[index], 'Unknown item tile: ' + itemName + ' ' + number)
      }
      if (typeof(this.items) !== 'object') {
        this.items = {}
      }
      this.items.blocked = this.items.blocked || {}
      this.items.blocked[zoneName] = this.items.blocked[zoneName] || new Map()
      const map = this.items.blocked[zoneName].get(item) || {}
      map[number - 1] = map[number - 1] || []
      replaceNames.forEach(function(replaceName) {
        const replace = items.filter(function(item) {
          return item.name === replaceName
        })[0]
        assert(replace, 'Unknown item: ' + replaceName)
        map[number - 1].push(replace)
      })
      this.items.blocked[zoneName].set(item, map)
    }

  const rewardsMap = {
    'Heart Refresh': 'h',
    'Neutron bomb': 'n',
    'Potion': 'p',
  }

  PresetBuilder.prototype.prologueRewards =
    function prologueRewards(itemName, replaceNames) {
      if (typeof(itemName) === 'boolean') {
        this.rewards = itemName
      } else {
        itemName = getItemAlias.call(this, itemName)
        if (!Array.isArray(replaceNames)) {
          replaceNames = [replaceNames]
        }
        const self = this
        replaceNames = replaceNames.map(function(name) {
          return getItemAlias.call(self, name)
        })
        assert.oneOf(itemName, Object.getOwnPropertyNames(rewardsMap),
                     'Unknown reward item: ' + itemName)
        if (typeof(this.rewards) !== 'object') {
          this.rewards = {}
        }
        this.rewards[rewardsMap[itemName]] =
          this.rewards[rewardsMap[itemName]] || []
        replaceNames.forEach(function(replaceName) {
          const replace = items.filter(function(item) {
            return item.name === replaceName
          })[0]
          self.rewards[rewardsMap[itemName]].push(replace)
        })
      }
    }

  // Block an item from being a reward.
  PresetBuilder.prototype.blockReward =
    function blockReward(itemName, blocked) {
      assert.equal(typeof(itemName), 'string')
      if (Array.isArray(blocked)) {
        blocked.forEach(function(itemName) {
          if (itemName) {
            assert.equal(typeof(itemName), 'string')
          }
        })
      } else if (blocked) {
        assert.equal(typeof(blocked), 'string')
      }
      if (!Array.isArray(blocked)) {
        blocked = [blocked]
      }
      const self = this
      blocked = blocked.map(function(name) {
        return getItemAlias.call(self, name)
      })
      assert.oneOf(itemName, Object.getOwnPropertyNames(rewardsMap),
                   'Unknown reward item: ' + itemName)
      if (typeof(this.rewards) !== 'object') {
        this.rewards = {}
      }
      this.rewards.blocked = this.rewards.blocked || {}
      this.rewards.blocked[rewardsMap[itemName]] =
        this.rewards.blocked[rewardsMap[itemName]] || []
      blocked.forEach(function(replaceName) {
        const replace = items.filter(function(item) {
          return item.name === replaceName
        })[0]
        self.rewards.blocked[rewardsMap[itemName]].push(replace)
      })
    }

  // Lock relic location behind abilities.
  PresetBuilder.prototype.lockLocation = function lockLocation(where, what) {
    if (typeof(this.locations) !== 'object') {
      this.locations = {}
    }
    this.locations[where] = what.map(function(lock) {
      return new Set(lock)
    })
  }

  // Block a relic from appearing at a location.
  PresetBuilder.prototype.blockRelic = function blockRelic(where, what) {
    assert.equal(typeof(where), 'string')
    if (Array.isArray(what)) {
      what.forEach(function(relic) {
        if (relic) {
          assert.equal(typeof(relic), 'string')
        }
      })
    } else if (what) {
      assert.equal(typeof(what), 'string')
    }
    if (!Array.isArray(what)) {
      what = [what]
    }
    if (typeof(this.locations) !== 'object') {
      this.locations = {}
    }
    this.locations.blocked = this.locations.blocked || {}
    this.locations.blocked[where] = what
  }

  // Ensure that a location grants abilities, or that access to that location
  // is only granted by obtaining abilities.
  PresetBuilder.prototype.escapeRequires =
    function escapeRequires(where, what) {
      if (typeof(this.locations) !== 'object') {
        this.locations = {}
      }
      this.escapes[where] = what.map(function(lock) {
        return new Set(lock)
      })
    }

  // Place a relic at a location.
  PresetBuilder.prototype.placeRelic = function placeRelic(where, what) {
    assert.equal(typeof(where), 'string')
    if (Array.isArray(what)) {
      what.forEach(function(relic) {
        if (relic) {
          assert.equal(typeof(relic), 'string')
        }
      })
    } else if (what) {
      assert.equal(typeof(what), 'string')
    }
    if (!Array.isArray(what)) {
      what = [what]
    }
    if (typeof(this.locations) !== 'object') {
      this.locations = {}
    }
    this.locations.placed = this.locations.placed || {}
    this.locations.placed[where] = what
  }

  // Replace a relic with an item.
  PresetBuilder.prototype.replaceRelic = function replaceRelic(relic, item) {
    assert.equal(typeof(relic), 'string')
    assert.equal(typeof(item), 'string')
    this.locations.replaced = this.locations.replaced || {}
    this.locations.replaced[relic] = getItemAlias.call(this, item)
  }

  // Enable/disable relic location randomization.
  PresetBuilder.prototype.relicLocations = function relicLocations(enabled) {
    assert.equal(typeof(enabled), 'boolean')
    this.locations = enabled
  }

  // Enable/disable progression item leak prevention.
  PresetBuilder.prototype.preventLeaks =
    function preventLeaks(enabled) {
      assert.equal(typeof(enabled), 'boolean')
      this.leakPrevention = enabled
    }

  // Enable/disable thrust sword ability.
  PresetBuilder.prototype.thrustSwordAbility =
    function thrustSwordAbility(enabled) {
      assert.equal(typeof(enabled), 'boolean')
      this.thrustSword = enabled
    }

  // Set complexity target.
  PresetBuilder.prototype.complexityGoal =
    function goal(complexityMin, complexityMax, goal) {
      if (arguments.length === 1 && typeof(complexityMin) !== 'number') {
        delete this.goal
        delete this.target
      } else {
        assert(
          typeof(complexityMin) === 'number',
          'expected complexityMin to be a number'
        )
        if (Array.isArray(complexityMax)) {
          goal = complexityMax
          complexityMax = undefined
        } else {
          assert(
            typeof(complexityMax) === 'number',
            'expected complexityMax to be a number'
          )
        }
        assert(goal.every(function(lock) {
          return typeof(lock) === 'string'
        }), 'expected goal to be an array of strings')
        assert(Array.isArray(goal), 'expected goal to be an array of strings')
        this.goal = goal.map(function(lock) {
          return new Set(lock)
        })
        this.target = {
          min: complexityMin,
        }
        if (typeof(complexityMax) !== 'undefined') {
          this.target.max = complexityMax
        }
      }
    }

  // Enable guarded relic locations.
  PresetBuilder.prototype.relicLocationsExtension =
    function relicLocationsExtension(extension) {
      assert.oneOf(typeof(extension), ['boolean', 'string'])
      this.extension = extension
    }

  // Enable stat randomization.
  PresetBuilder.prototype.randomizeStats = function randomizeStats(enabled) {
    this.stats = enabled
  }

  // Enable music randomization.
  PresetBuilder.prototype.randomizeMusic = function randomizeMusic(enabled) {
    this.music = enabled
  }

  // Enable turkey mode.
  PresetBuilder.prototype.turkeyMode = function turkeyMode(enabled) {
    this.turkey = enabled
  }

  // Write a character.
  PresetBuilder.prototype.writeChar = function writeChar(address, value) {
    if (value !== 'random') {
      value = parseInt(value)
    }
    this.writes = this.writes || []
    this.writes.push({
      type: 'char',
      address: address,
      value: value,
    })
    return address + 1
  }

  // Write a short.
  PresetBuilder.prototype.writeShort = function writeShort(address, value) {
    if (value !== 'random') {
      value = parseInt(value)
    }
    this.writes = this.writes || []
    this.writes.push({
      type: 'short',
      address: address,
      value: value,
    })
    return address + 2
  }

  // Write a word.
  PresetBuilder.prototype.writeWord = function writeWord(address, value) {
    if (value !== 'random') {
      value = parseInt(value)
    }
    this.writes = this.writes || []
    this.writes.push({
      type: 'word',
      address: address,
      value: value,
    })
    return address + 4
  }

  // Write a long.
  PresetBuilder.prototype.writeLong = function writeLong(address, value) {
    this.writes = this.writes || []
    this.writes.push({
      type: 'long',
      address: address,
      value: value,
    })
    return address + 8
  }

  // Write a string.
  PresetBuilder.prototype.writeString = function writeString(address, value) {
    if (typeof(value) === 'string') {
      const hexBytes = value.split(/([a-fA-F0-9]{2})/g)
      value = hexBytes.reduce(function(bytes, byteValue) {
        if (byteValue.length) {
          bytes.push(parseInt(byteValue, 16))
        }
        return bytes
      }, [])
    }
    this.writes = this.writes || []
    this.writes.push({
      type: 'string',
      address: address,
      value: value,
    })
    return address + value.length
  }

  // Create a preset from the current configuration.
  PresetBuilder.prototype.build = function build() {
    const self = this
    let drops = self.drops
    if (typeof(drops) === 'object') {
      drops = {}
      if (self.drops.blocked) {
        drops.blocked = {}
        Array.from(self.drops.blocked.keys()).forEach(function(enemy) {
          let enemyName
          if (enemy === '*') {
            enemyName = '*'
          } else if (enemy === constants.GLOBAL_DROP) {
            enemyName = enemy
          } else if (enemy === 'Librarian') {
            enemyname = enemy
          } else {
            enemyName = enemy.name
            const amb = enemies.filter(function(enemy) {
              return enemy.name === enemyName
            })
            enemyName = enemyName.replace(/\s+/g, '')
            if (amb.length > 1 && enemy !== amb[0]) {
              enemyName += '-' + enemy.level
            }
          }
          drops.blocked[enemyName] =
            self.drops.blocked.get(enemy).slice().map(function(item) {
              return item ? item.name : undefined
            })
        })
      }
      Array.from(self.drops.keys()).forEach(function(enemy) {
        let enemyName
        if (enemy === '*') {
          enemyName = '*'
        } else if (enemy === constants.GLOBAL_DROP) {
          enemyName = enemy
        } else {
          enemyName = enemy.name
          const amb = enemies.filter(function(enemy) {
            return enemy.name === enemyName
          })
          enemyName = enemyName.replace(/\s+/g, '')
          if (amb.length > 1 && enemy !== amb[0]) {
            enemyName += '-' + enemy.level
          }
        }
        drops[enemyName] = self.drops.get(enemy).slice().map(function(item) {
          return item ? item.name : undefined
        })
      })
    }
    let equipment = self.equipment
    if (typeof(equipment) === 'object') {
      equipment = {}
      if (self.equipment.blocked) {
        equipment.blocked = {}
        Object.getOwnPropertyNames(self.equipment.blocked).forEach(
          function(slot) {
            equipment.blocked[slot] = self.equipment.blocked[slot].map(
              function(item) {
                return item.name
              }
            )
          }
        )
      }
      Object.getOwnPropertyNames(self.equipment).filter(function(slot) {
        return slot !== 'blocked'
      }).forEach(function(slot) {
        equipment[slot] = self.equipment[slot].map(function(item) {
          if (item) {
            return item.name
          }
        })
      })
    }
    let rewards = self.rewards
    if (typeof(rewards) === 'object') {
      rewards = {}
      if (self.rewards.blocked) {
        rewards.blocked = {}
        Object.getOwnPropertyNames(self.rewards.blocked).forEach(
          function(reward) {
            rewards.blocked[reward] = self.rewards.blocked[reward].map(
              function(item) {
                return item.name
              }
            )
          }
        )
      }
      Object.getOwnPropertyNames(self.rewards).filter(function(reward) {
        return reward !== 'blocked'
      }).forEach(function(reward) {
        rewards[reward] = self.rewards[reward].map(function(item) {
          if (item) {
            return item.name
          }
        })
      })
    }
    let items = self.items
    if (typeof(items) === 'object') {
      items = {}
      if (self.items.blocked) {
        items.blocked = {}
        Object.getOwnPropertyNames(self.items.blocked).forEach(function(zone) {
          items.blocked[zone] = {}
          Array.from(self.items.blocked[zone].keys()).forEach(function(item) {
            const indexes = self.items.blocked[zone].get(item)
            let itemName
            if (item === '*') {
              itemName = '*'
            } else {
              itemName = item.name
            }
            items.blocked[zone][itemName] = {}
            Object.getOwnPropertyNames(indexes).forEach(function(index) {
              const replace = self.items.blocked[zone].get(item)[index]
              items.blocked[zone][itemName][index] = replace.map(
                function(item) {
                  return item.name
                }
              )
            })
          })
        })
      }
      Object.getOwnPropertyNames(self.items).filter(function(zone) {
        return zone !== 'blocked'
      }).forEach(function(zone) {
        items[zone] = {}
        Array.from(self.items[zone].keys()).forEach(function(item) {
          const indexes = self.items[zone].get(item)
          let itemName
          if (item === '*') {
            itemName = '*'
          } else {
            itemName = item.name
          }
          items[zone][itemName] = {}
          Object.getOwnPropertyNames(indexes).forEach(function(index) {
            const replace = self.items[zone].get(item)[index]
            items[zone][itemName][index] = replace.map(function(item) {
              return item.name
            })
          })
        })
      })
    }
    let relicLocations = self.locations
    if (typeof(relics) === 'object') {
      relicLocations = {}
      relics.concat(extension).map(function(location) {
        if (typeof(location.ability) === 'string') {
          return location.ability
        }
        return location.name
      }).forEach(function(location) {
        if (self.locations[location]) {
          const locks = self.locations[location].map(function(lock) {
            return Array.from(lock).join('')
          })
          relicLocations[location] = relicLocations[location] || []
          Array.prototype.push.apply(relicLocations[location], locks)
        }
        if (self.escapes[location]) {
          const locks = self.escapes[location].map(function(lock) {
            return '+' + Array.from(lock).join('')
          })
          relicLocations[location] = relicLocations[location] || []
          Array.prototype.push.apply(relicLocations[location], locks)
        }
      })
      if (self.locations.placed) {
        relicLocations.placed = self.locations.placed
      }
      if (self.locations.replaced) {
        relicLocations.replaced = self.locations.replaced
      }
      if (self.locations.blocked) {
        relicLocations.blocked = self.locations.blocked
      }
      if (self.goal) {
        let target = self.target.min.toString()
        if ('max' in self.target) {
          target += '-' + self.target.max.toString()
        }
        relicLocations[target] = self.goal.map(function(lock) {
          return Array.from(lock).join('')
        })
      }
      if (self.extension) {
        relicLocations.extension = self.extension
      }
      if (!self.leakPrevention) {
        relicLocations.leakPrevention = false
      }
      if (self.thrustSword) {
        relicLocations.thrustSwordAbility = true
      }
    }
    const stats = self.stats
    const music = self.music
    const turkey = self.turkey
    const writes = self.writes
    return new Preset(
      self.metadata.id,
      self.metadata.name,
      self.metadata.description,
      self.metadata.author,
      self.metadata.weight || 0,
      self.metadata.hidden,
      self.metadata.override,
      drops,
      equipment,
      items,
      rewards,
      relicLocations,
      stats,
      music,
      turkey,
      writes,
    )
  }

  function addEventListener(event, listener) {
    if ('addEventListener' in this) {
      this.addEventListener(event, listener)
    } else {
      this.on(event, listener)
    }
  }

  function loadWorker(worker, url) {
    worker.postMessage({
      url: url,
    })
  }

  function randomizeRelics(
    version,
    applied,
    options,
    seed,
    newNames,
    workers,
    nonce,
    url,
  ) {
    const promises = Array(workers.length)
    const running = Array(workers.length).fill(true)
    let done
    for (let i = 0; i < workers.length; i++) {
      const thread = i
      const worker = workers[i]
      loadWorker(worker, url)
      const workerId = i
      function postMessage(bootstrap) {
        const message = {
          action: constants.WORKER_ACTION.RELICS,
          nonce: nonce++,
        }
        if (bootstrap) {
          Object.assign(message, {
            bootstrap: true,
            applied: applied,
            options: options,
            version: version,
            seed: seed,
            newNames: newNames,
          })
        }
        worker.postMessage(JSON.stringify(message))
      }
      promises[i] = new Promise(function(resolve, reject) {
        addEventListener.call(worker, 'message', function(result) {
          if (self) {
            result = result.data
          }
          result = JSON.parse(result)
          if (result.error && typeof(result.error) !== 'boolean') {
            const error = new Error(result.error.message)
            error.name = result.error.name
            error.stack = result.error.stack
            throw error
          } else if (done || result.done) {
            done = true
            resolve(result)
            running[thread] = false
            worker.postMessage(JSON.stringify({
              action: constants.WORKER_ACTION.RELICS,
              cancel: true,
            }))
          } else {
            postMessage()
          }
        })
        postMessage(true)
      })
    }
    return Promise.all(promises).then(function(results) {
      const result = results.reduce(function(candidate, result, index) {
        if (!candidate || 'error' in candidate) {
          return result
        }
        if ('error' in result || candidate.nonce < result.nonce) {
          return candidate
        }
        return result
      })
      if (result.error) {
        throw result.error
      }
      return result
    })
  }

  function randomizeItems(
    version,
    applied,
    options,
    seed,
    worker,
    nonce,
    items,
    newNames,
    url,
  ) {
    loadWorker(worker, url)
    return new Promise(function(resolve, reject) {
      addEventListener.call(worker, 'message', function(result) {
        if (self) {
          result = result.data
        }
        if (result.error) {
          reject(result.error)
        } else {
          resolve(result)
        }
      })
      worker.postMessage({
        action: constants.WORKER_ACTION.ITEMS,
        applied: applied,
        options: options,
        version: version,
        seed: seed,
        nonce: nonce,
        items: items,
        newNames: newNames,
        url: url,
      })
    })
  }

  function applyWrites(rng, options) {
    const data = new checked()
    if (options.writes) {
      options.writes.forEach(function(write) {
        let value
        switch (write.type) {
        case 'char':
          value = write.value
          if (value === 'random') {
            value = Math.floor(rng() * 0x100)
          }
          data.writeChar(write.address, value)
          break
        case 'short':
          value = write.value
          if (value === 'random') {
            value = Math.floor(rng() * 0x10000)
          }
          data.writeShort(write.address, value)
          break
        case 'word':
          value = write.value
          if (value === 'random') {
            value = Math.floor(rng() * 0x100000000)
          }
          data.writeWord(write.address, value)
          break
        case 'long':
          value = write.value
          if (value === 'random') {
            value = Math.floor(rng() * 0x10000000000000000)
          }
          data.writeLong(write.address, value)
          break
        case 'string':
          data.writeString(write.address, write.value)
          break
        }
      })
    }
    return data
  }

  function finalizeData(
    seed,
    version,
    preset,
    tournament,
    file,
    data,
    checksum,
    worker,
    url,
  ) {
    loadWorker(worker, url)
    let objects
    if (file) {
      objects = [file]
    }
    return new Promise(function(resolve, reject) {
      addEventListener.call(worker, 'message', function(result) {
        if (self) {
          result = result.data
        }
        if (result.error) {
          reject(result.error)
        } else {
          resolve(result)
        }
      })
      worker.postMessage({
        action: constants.WORKER_ACTION.FINALIZE,
        seed: seed,
        version: version,
        preset: preset,
        tournament: tournament,
        file: file,
        data: data,
        checksum: checksum,
        url: url,
      }, objects)
    })
  }

  function workerCountFromCores(cores) {
    return Math.max(Math.floor(3 * cores / 4), 1)
  }

  function indent(level) {
    return Array(level).fill(' ').join('')
  }

  function hasNonCircularPath(node, visited) {
    if (!node.locks) {
      return true
    }
    return node.locks.some(function(lock) {
      if (lock.some(function(node) { return visited.has(node) })) {
        return false
      }
      return lock.every(function(node) {
        visited.add(node)
        const res = hasNonCircularPath(node, visited)
        visited.delete(node)
        return res
      })
    })
  }

  function minifySolution(visited) {
    return function(min, lock, index) {
      const requirements = lock.map(function(node) {
        if (node.locks) {
          visited.add(node)
          const solution = node.locks.filter(function(lock) {
            if (lock.some(function(node) { return visited.has(node) })) {
              return false
            }
            return lock.every(function(node) {
              visited.add(node)
              const res = hasNonCircularPath(node, visited)
              visited.delete(node)
              return res
            })
          }).reduce(minifySolution(visited), {
            depth: 0,
            weight: 0,
          })
          visited.delete(node)
          return {
            item: node.item,
            depth: 1 + solution.depth,
            solution: solution,
          }
        }
        return {
          item: node.item,
          depth: 1,
        }
      })
      const depth = requirements.slice().sort(function(a, b) {
        return a.depth - b.depth
      }).pop().depth
      const weight = requirements.reduce(function(weight, requirement) {
        return weight + requirement.depth
      }, 0)
      const avg = weight / requirements.length
      const solution = {
        depth: depth,
        weight: weight,
        avg: avg,
        requirements: requirements,
      }
      if (min.depth === 0
          || solution.depth < min.depth
          || (solution.depth === min.depth
              && solution.weight < min.weight)
          || (solution.depth === min.depth
              && solution.weight === min.weight
              && solution.avg < min.avg)) {
        return solution
      }
      return min
    }
  }

  function simplifySolution(node) {
    if (node.solution && node.solution.requirements) {
      return {
        item: node.item,
        solution: node.solution.requirements.map(simplifySolution)
      }
    }
    return {
      item: node.item,
    }
  }

  function collectAbilities(node, map) {
    if (map.has(node.item)) {
      return map.get(node.item)
    }
    const abilities = new Set([node.item])
    if (node.solution && node.solution.requirements) {
      node.solution.requirements.forEach(function(node) {
        abilities.add(node.item)
        Array.from(collectAbilities(node, map)).forEach(function(ability) {
          abilities.add(ability)
        })
      })
    }
    map.set(node.item, abilities)
    return abilities
  }

  function pruneSubsets(node, map) {
    map = map || new Map()
    if (node.solution && node.solution.requirements) {
      const nodes = node.solution.requirements
      nodes.sort(function(a, b) {
        return b.depth - a.depth
      })
      const abilities = new Set()
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        pruneSubsets(node, map)
        Array.from(collectAbilities(node, map)).forEach(function(ability) {
          abilities.add(ability)
        })
        for (let j = i + 1; j < nodes.length; j++) {
          const curr = nodes[j]
          const requirements = Array.from(collectAbilities(curr, map))
          if (requirements.every(function(ability) {
            return abilities.has(ability)
          })) {
            nodes.splice(j--, 1)
          }
        }
      }
    }
  }

  function collapseSolution(node) {
    const items = []
    let curr = node
    while (curr.solution && curr.solution.length === 1) {
      items.push(curr.item)
      curr = curr.solution[0]
    }
    items.push(curr.item)
    if (curr.solution) {
      return {
        items: items,
        solution: curr.solution.map(collapseSolution)
      }
    }
    return {
      items: items,
    }
  }

  function renderNode(indentLevel, sub, relics, newNames, thrustSword, node) {
    const lines = []
    const names = node.items.map(function(ability) {
      const relic = relics.filter(function(relic) {
        return relic.ability === ability
      })[0]
      let relicName = relic.name
      let itemId
      if (relic.itemId) {
        itemId = relic.itemId
      } else if (ability === constants.RELIC.THRUST_SWORD) {
        itemId = thrustSword.id
      }
      if (itemId) {
        let item
        item = newNames.filter(function(item) {
          return item.id === itemId
        }).pop() || itemFromTileId(items, itemId + constants.tileIdOffset)
        if (item) {
          relicName = item.name
        }
      }
      return relicName
    })
    lines.push(
      indent(indentLevel)
        + (sub ? '^ ' : '')
        + names.join(' < ')
    )
    if (node.solution) {
      if (sub) {
        indentLevel += 2
      }
      indentLevel += names.slice(0, -1).concat(['']).join('   ').length
      const nodes = node.solution.map(renderNode.bind(
        null,
        indentLevel,
        true,
        relics,
        newNames,
        thrustSword,
      ))
      Array.prototype.push.apply(lines, nodes.reduce(function(lines, node) {
        Array.prototype.push.apply(lines, node)
        return lines
      }, []))
    }
    return lines
  }

  function renderSolutions(solutions, relics, newNames, thrustSword) {
    const minified = solutions.reduce(minifySolution(new WeakSet()), {
      depth: 0,
      weight: 0,
    })
    minified.requirements.forEach(function(node) {
      pruneSubsets(node)
    })
    const simplified = minified.requirements.map(simplifySolution)
    const collapsed = simplified.map(collapseSolution)
    const render = renderNode.bind(
      null,
      0,
      false,
      relics,
      newNames,
      thrustSword,
    )
    return collapsed.map(render).reduce(function(lines, node) {
      Array.prototype.push.apply(lines, node)
      return lines
    }, [])
  }

  const exports = {
    sha256: sha256,
    assert: assert,
    shopItemType: shopItemType,
    shopTileFilter: shopTileFilter,
    dropTileFilter: dropTileFilter,
    rewardTileFilter: rewardTileFilter,
    candleTileFilter: candleTileFilter,
    tankTileFilter: tankTileFilter,
    mapTileFilter: mapTileFilter,
    nonProgressionFilter: nonProgressionFilter,
    tilesFilter: tilesFilter,
    itemTileFilter: itemTileFilter,
    tileIdOffsetFilter: tileIdOffsetFilter,
    itemFromName: itemFromName,
    itemFromTileId: itemFromTileId,
    itemSlots: itemSlots,
    tileValue: tileValue,
    getRooms: getRooms,
    tileData: tileData,
    replaceBossRelicWithItem: replaceBossRelicWithItem,
    entityData: entityData,
    romOffset: romOffset,
    bufToHex: bufToHex,
    numToHex: numToHex,
    checked: checked,
    presetFromName: presetFromName,
    optionsFromString: optionsFromString,
    optionsToString: optionsToString,
    optionsFromUrl: optionsFromUrl,
    optionsToUrl: optionsToUrl,
    toGameString: toGameString,
    setSeedText: setSeedText,
    saltSeed: saltSeed,
    restoreFile: restoreFile,
    formatObject: formatObject,
    formatInfo: formatInfo,
    newInfo: newInfo,
    mergeInfo: mergeInfo,
    sanitizeResult: sanitizeResult,
    shuffled: shuffled,
    isItem: isItem,
    isRelic: isRelic,
    isCandle: isCandle,
    isContainer: isContainer,
    containedItem: containedItem,
    relicFromName: relicFromName,
    relicFromAbility: relicFromAbility,
    enemyFromIdString: enemyFromIdString,
    Preset: Preset,
    PresetBuilder: PresetBuilder,
    randomizeRelics: randomizeRelics,
    randomizeItems: randomizeItems,
    applyWrites: applyWrites,
    finalizeData: finalizeData,
    hasNonCircularPath: hasNonCircularPath,
    renderSolutions: renderSolutions,
    workerCountFromCores: workerCountFromCores,
  }
  if (self) {
    self.sotnRando = Object.assign(self.sotnRando || {}, {
      util: exports,
    })
  } else {
    module.exports = exports
  }
})(typeof(self) !== 'undefined' ? self : null)
