(function(self) {

  let constants
  let relics
  let sjcl

  if (self) {
    constants = self.sotnRando.constants
    relics = self.sotnRando.relics
    sjcl = self.sjcl
  } else {
    constants = require('./constants')
    relics = require('./relics')
    sjcl = require('sjcl')
  }

  function assert(value, message) {
    if (!value) {
      message = message || 'Assertion failed: ' + value
      throw new Error(message)
    }
  }

  assert.equal = function equal(actual, expected, message) {
    if (actual !== expected) {
      message = message || 'Assertion failed: ' + actual + ' !== ' + expected
      throw new Error(message)
    }
  }

  function entityOffsets(zone) {
    // Get room count.
    let layout = zone.readUInt32LE(0x10) - 0x80180000
    let rooms = 0
    while (zone[layout] != 0x40) {
      rooms++
      layout += 8
    }
    // Get pointers to sorted tile layout structures.
    const enter = zone.readUInt32LE(0x0c) - 0x80180000
    const offsets = [
      zone.readUInt16LE(enter + 0x1c),
      zone.readUInt16LE(enter + 0x28),
    ]
    // Get sorted lists.
    const entities = Array(rooms).fill(null).map(function() {
      return {}
    })
    offsets.forEach(function(offset) {
      for (let i = 0; i < rooms; i++) {
        const ptr = zone.readUInt32LE(offset) - 0x80180000
        let entitiy
        let count = 0
        do {
          const p = ptr + 10 * count++
          entity = zone.slice(p, p + 10)
          const key = bufToHex(entity)
          entities[i][key] = entities[i][key] || []
          entities[i][key].push(p)
        } while (entity.readUInt32LE() != 0xffffffff)
        offset += 4
      }
    })
    return entities.map(function(room) {
      return Object.getOwnPropertyNames(room).map(function(key) {
        const bytes = key.match(/[0-9a-f]{2}/g).map(function(byte) {
          return parseInt(byte, 16)
        })
        return {
          entity: Buffer.from(bytes),
          addresses: room[key],
        }
      })
    }).reduce(function(flat, array) {
      return flat.concat(array)
    }, [])
  }

  function bufToHex(buf) {
    return Array.from(buf).map(function(byte) {
      return ('00' + byte.toString(16)).slice(-2)
    }).join('')
  }

  function numToHex(num, width) {
    const zeros = Array(width).fill('0').join('')
    const hex = (zeros + num.toString(16)).slice(-width)
    return '0x' + hex
  }

  function checked(data) {
    if (data) {
      this.data = data
    }
    this.writes = {}
  }

  checked.prototype.readByte = function readByte(address) {
    return this.data[address]
  }

  checked.prototype.readShort = function readShort(address) {
    return (this.readByte(address + 1) << 8) + (this.readByte(address + 0))
  }

  checked.prototype.writeByte = function writeByte(address, val) {
    if (this.data) {
      this.data[address] = val
    }
    this.writes[address] = val
  }

  checked.prototype.writeShort = function writeShort(address, val) {
    this.writeByte(address + 0, val & 0xff)
    this.writeByte(address + 1, val >>> 8)
  }

  checked.prototype.sum = function sum() {
    const state = JSON.stringify(this.writes)
    let hex = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(state))
    let zeros = 0
    while (hex.length > 3 && hex[zeros] === '0') {
      zeros++
    }
    return parseInt(hex.slice(zeros, zeros + 3), 16)
  }

  function optionsFromString(randomize) {
    const options = {}
    let i = 0
    while (i < randomize.length) {
      let c = randomize[i++]
      switch (c) {
      case 'd':
        options.enemyDrops = true
        break
      case 'e':
        options.startingEquipment = true
        break
      case 'i':
        options.itemLocations = true
        break
      case 'p':
        options.prologueRewards = true
        break;
      case 't':
        options.turkeyMode = true
        break
      case 'r':
        let relicLocations = options.relicLocations || true
        // Check for an argument.
        if (randomize[i] === ':') {
          i++
          while (i < randomize.length && randomize[i] !== ',') {
            // If there's an argument it's either a relic logic scheme name 
            // or a location lock.
            let arg
            let logic
            let location
            let relics
            let start
            // Parse the arg name.
            start = i
            while (i < randomize.length
                   && [',', ':'].indexOf(randomize[i]) === -1) {
              i++
            }
            arg = randomize.slice(start, i)
            if (arg === 'logic') {
              if (typeof(relicLocations) === 'object'
                  && 'logic' in relicLocations) {
                throw new Error('Can\'t specify more than one relic logic')
              }
              logic = true
            } else if (arg.length) {
              relics = Object.getOwnPropertyNames(constants.RELIC)
              location = constants.RELIC[relics.filter(function(relic) {
                return constants.RELIC[relic] === arg
              }).pop()]
              if (!location) {
                throw new Error('Invalid relic location: ' + arg)
              }
            } else {
              throw new Error('Expected argument')
            }
            if (typeof(relicLocations) !== 'object') {
              relicLocations = {}
            }
            if (randomize[i] === ':') {
              start = ++i
              while (i < randomize.length
                     && [',', ':'].indexOf(randomize[i]) === -1) {
                i++
              }
              arg = randomize.slice(start, i)
              if (logic) {
                if (!arg.length) {
                  throw new Error('Relic logic name required')
                }
                if (arg !== 'safe') {
                  relicLocations.logic = arg
                }
              } else {
                const invalid = arg.split('').filter(function(c) {
                  if (c === '-') {
                    return false
                  }
                  return !relics.some(function(relic) {
                    return constants.RELIC[relic] === c
                  })
                })
                if (invalid.length) {
                  throw new Error('Invalid relic: ' + invalid[0])
                }
                let locks = arg.split('-')
                const emptyLocks = locks.filter(function(lock) {
                  return lock.length === 0
                })
                locks = locks.filter(function(lock) {
                  return lock.length > 0
                })
                if (emptyLocks.length > 1
                    || (locks.length && emptyLocks.length)) {
                  throw new Error('Invald lock: ' + location + lock)
                }
                relicLocations[location] = locks
              }
            } else if (logic) {
              throw new Error('Relic logic name required')
            } else {
              relicLocations[location] = []
            }
            if (randomize[i] === ':') {
              i++
            }
          }
        } else if (typeof(relicLocations) === 'undefined') {
          // Otherwise it's just turning on relic randomization.
          relicLocations = true
        }
        if (randomize[i] === ',') {
          i++
        }
        if (typeof(relicLocations) === 'object'
            && Object.getOwnPropertyNames(relicLocations).length === 0) {
          relicLocations = true
        }
        options.relicLocations = relicLocations
        break
      default:
        throw new Error('Invalid randomization: ' + c)
      }
    }
    if (!Object.getOwnPropertyNames(options).length) {
      throw new Error('No randomizations')
    }
    return options
  }

  function optionsToString(options) {
    options = Object.assign({}, options)
    delete options.checkVanilla
    delete options.verbose
    Object.getOwnPropertyNames(options).forEach(function(opt) {
      if (options[opt] === false) {
        delete options[opt]
      }
    })
    let randomize = ''
    while (Object.getOwnPropertyNames(options).length) {
      if ('enemyDrops' in options) {
        randomize += 'd'
        delete options.enemyDrops
      } else if ('startingEquipment' in options) {
        randomize += 'e'
        delete options.startingEquipment
      } else if ('itemLocations' in options) {
        randomize += 'i'
        delete options.itemLocations
      } else if ('prologueRewards' in options) {
        randomize += 'p'
        delete options.prologueRewards
      } else if ('turkeyMode' in options) {
        randomize += 't'
        delete options.turkeyMode
      } else if ('relicLocations' in options) {
        randomize += 'r'
        if (typeof(options.relicLocations) === 'object') {
          const locks = []
          if ('logic' in options.relicLocations
              && options.relicLocations.logic !== 'safe') {
            locks.push('logic:' + options.relicLocations.logic)
          }
          Object.getOwnPropertyNames(constants.RELIC).forEach(function(relic) {
            relic = constants.RELIC[relic]
            if (options.relicLocations[relic]) {
              locks.push(relic + ':' + options.relicLocations[relic].join('-'))
            }
          })
          if (locks.length) {
            randomize += ':' + locks.join(':')
          }
        }
        delete options.relicLocations
        if (Object.getOwnPropertyNames(options).length) {
          randomize += ','
        }
      } else {
        const unknown = Object.getOwnPropertyNames(options).pop()
        throw new Error('Unknown options: ' + unknown)
      }
    }
    if (!randomize.length) {
      throw new Error('No randomizations')
    }
    return randomize
  }

  function optionsFromUrl(url) {
    url = new URL(url)
    const args = url.search.slice(1).split(',')
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

  function optionsToUrl(options, checksum, seed, baseUrl) {
    options = optionsToString(options)
    if (baseUrl[baseUrl.length - 1] === '/') {
      baseUrl = baseUrl.slice(0, baseUrl.length - 1)
    }
    const args = []
    if (options !== constants.defaultOptions) {
      args.push(options)
    }
    args.push(checksum.toString(16))
    args.push(encodeURIComponent(seed))
    return baseUrl + '?' + args.join(',')
  }

  const map = {
    ',': 0x8143,
    '.': 0x8144,
    ':': 0x8146,
    ';': 0x8147,
    '?': 0x8148,
    '!': 0x8149,
    '`': 0x814d,
    '"': 0x814e,
    '^': 0x814f,
    '_': 0x8151,
    '~': 0x8160,
    '\'': 0x8166,
    '(': 0x8169,
    ')': 0x816a,
    '[': 0x816d,
    ']': 0x816e,
    '{': 0x816f,
    '}': 0x8170,
    '+': 0x817b,
    '-': 0x817c,
    '0': 0x824f,
    '1': 0x8250,
    '2': 0x8251,
    '3': 0x8252,
    '4': 0x8253,
    '5': 0x8254,
    '6': 0x8255,
    '7': 0x8256,
    '8': 0x8257,
    '9': 0x8258,
  }

  function setSeedText(data, seed) {
    const addresses = [{
      start: 0x04389bf8,
      length: 31,
    }, {
      start: 0x04389c18,
      length: 39,
    }, {
      start: 0x04389c6c,
      length: 55,
    }]
    const maxSeedLength = 28
    addresses.forEach(function(address) {
      let a = 0
      let s = 0
      while (a < maxSeedLength && s < seed.length) {
        if (seed[s] in map) {
          if ((a + 1) < maxSeedLength) {
            const val = map[seed[s++]]
            data.writeByte(address.start + a++, val >>> 8)
            data.writeByte(address.start + a++, val & 0xff)
          } else {
            break
          }
        } else if (seed[s].match(/[a-zA-Z ]/)) {
          data.writeByte(address.start + a++, seed.charCodeAt(s++))
        } else {
          s++
        }
      }
      while (a < address.length) {
        data.writeByte(address.start + a++, 0)
      }
    })
  }

  function saltSeed(version, options, seed) {
    const str = JSON.stringify({
      version: version,
      options: optionsToString(options),
      seed: seed,
    })
    const hex = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(str))
    return hex.match(/[0-9a-f]{2}/g).map(function(byte) {
      return String.fromCharCode(byte)
    }).join('')
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

  function formatObject(obj, indent, hexWidth) {
    indent = indent || 0
    if (Array.isArray(obj)) {
      let padFirst
      let padLast
      if (obj.length > 0) {
        padFirst = typeof(obj[0]) !== 'object'
        padLast = typeof(obj[obj.length - 1]) !== 'object'
      }
      return '[' + (padFirst ? ' ' : '') + obj.map(function(el) {
        return formatObject(el, indent, hexWidth)
      }).join(', ') + (padLast ? ' ' : '') + ']'
    }
    switch (typeof(obj)) {
    case 'string':
      return '\'' + entry[1].replace(/'/, '\\\'') + '\''
    case 'number':
      if (typeof(hexWidth) === 'number') {
        return numToHex(obj, hexWidth)
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
        case 'type':
          value = 'TYPE.' + constants.typeNames[entry[1]]
          break
        case 'zone':
          value = 'ZONE.' + constants.zoneNames[entry[1]]
          break
        case 'candle':
          value = numToHex(entry[1], 2)
          break
        default:
          let hexWidth
          if (['addresses', 'blacklist'].indexOf(entry[0]) !== -1) {
            hexWidth = 8
          }
          value = formatObject(entry[1], indent + 2, hexWidth)
          break
        }
        lines.push(name + value + ',')
      }
      return '{\n' + lines.join('\n') + '\n' + outer + '}'
    }
    return obj.toString()
  }

  function shuffled(array) {
    const copy = array.slice()
    const shuffled = []
    while (copy.length) {
      const rand = Math.floor(Math.random() * copy.length)
      shuffled.push(copy.splice(rand, 1)[0])
    }
    return shuffled
  }

  // Helper class to create relic location locks.
  function plandomizer(metadata) {
    this.metadata = metadata
    const relicNames = Object.getOwnPropertyNames(constants.RELIC)
    // A set of unplaced locations.
    this.unplaced = new Set(relicNames.reduce(function(lock, relic) {
      return lock + constants.RELIC[relic]
    }, ''))
    // The collection of location locks.
    this.locations = {}
  }

  // Lock relic location behind abilities.
  plandomizer.prototype.lock = function lock(where, what) {
    this.locations[where] = this.locations[where] || []
    Array.prototype.push.apply(this.locations[where], what.map(function(lock) {
      return new Set(lock)
    }))
  }

  // Add relics to locations. The what and where arguments must contain the
  // same number of relics.
  plandomizer.prototype.place = function place(what, where) {
    assert.equal(what.length, where.length)
    const unplaced = this.unplaced
    const locations = this.locations
    what.split('').forEach(function(relic) {
      unplaced.delete(relic)
    })
    where.split('').forEach(function(location) {
      locations[location] = locations[location] || []
      locations[location].push(new Set(unplaced))
    })
  }

  // Convert lock sets into strings.
  plandomizer.prototype.logic = function logic() {
    const locks = Object.assign({}, this.locations)
    relics.forEach(function(relic) {
      if (locks[relic.ability]) {
        locks[relic.ability] = locks[relic.ability].map(function(lock) {
          return Array.from(lock).join('')
        })
      } else {
        locks[relic.ability] = ['']
      }
    })
    return Object.assign({}, this.metadata, {
      locks: locks,
    })
  }

  // Output as lock string.
  plandomizer.prototype.toString = function toString() {
    return optionsToString({relicLocations: this.logic().locks})
  }

  const exports = {
    assert: assert,
    entityOffsets: entityOffsets,
    bufToHex: bufToHex,
    numToHex: numToHex,
    checked: checked,
    optionsFromString: optionsFromString,
    optionsToString: optionsToString,
    optionsFromUrl: optionsFromUrl,
    optionsToUrl: optionsToUrl,
    setSeedText: setSeedText,
    saltSeed: saltSeed,
    restoreFile: restoreFile,
    formatObject: formatObject,
    shuffled: shuffled,
    plandomizer: plandomizer,
  }
  if (self) {
    self.sotnRando = Object.assign(self.sotnRando || {}, {
      util: exports,
    })
  } else {
    module.exports = exports
  }
})(typeof(self) !== 'undefined' ? self : null)
