(function(self) {

  let constants
  let enemies
  let items
  let relics
  let sha256

  if (self) {
    constants = self.sotnRando.constants
    enemies = self.sotnRando.enemies
    items = self.sotnRando.items
    relics = self.sotnRando.relics
    sha256 = function(input) {
      return self.sjcl.codec.hex.fromBits(self.sjcl.hash.sha256.hash(input))
    }
  } else {
    constants = require('./constants')
    enemies = require('./enemies')
    items = require('./items')
    relics = require('./relics')
    const crypto = require('crypto')
    sha256 = function(input) {
      return crypto.createHash('sha256').update(input).digest().toString('hex')
    }
  }

  function AssertionError(message) {
    this.name = 'AssertionError'
    this.message = message
    this.stack = new Error(message).stack
  }

  const _error = function() {}
  _error.prototype = Error.prototype
  AssertionError.prototype = new _error()

  function assert(value, message) {
    if (!value) {
      message = message || 'Assertion failed: ' + value
      throw new AssertionError(message)
    }
  }

  assert.equal = function equal(actual, expected, message) {
    if (actual !== expected) {
      message = message || 'Assertion failed: ' + actual + ' === ' + expected
      throw new AssertionError(message)
    }
  }

  assert.notEqual = function equal(actual, expected, message) {
    if (actual === expected) {
      message = message || 'Assertion failed: ' + actual + ' !== ' + expected
      throw new AssertionError(message)
    }
  }

  assert.oneOf = function equal(actual, expected, message) {
    if (expected.indexOf(actual) === -1) {
      message = message || 'Assertion failed: ' + actual + ' one of '
        + expected.join(', ')
      throw new AssertionError(message)
    }
  }

  function roomCount(zone) {
    let layout = zone.readUInt32LE(0x10) - 0x80180000
    let rooms = 0
    while (zone[layout] != 0x40) {
      rooms++
      layout += 8
    }
    return rooms
  }

  function itemFromTileId(items, id) {
    return items.filter(function(item) {
      if (id > constants.tileIdOffset) {
        return item.id === (id - constants.tileIdOffset) && [
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
      return item.id === id
    })[0]
  }

  function tileData(zone) {
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
        // Parse the tile map
        const map = Array(16 * height)
        for (let y = 0; y < 16 * height; y++) {
          map[y] = Array(16 * width)
          for (let x = 0; x < 16 * width; x++) {
            const index = zone.readUInt16LE(tiles + 0x2 * (16 * width * y + x))
            if (index) {
              map[y][x] = zone.readUInt32LE(defs + 0x20 * index)
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
    // Get room count.
    const rooms = roomCount(zone)
    // Get entity layout IDs.
    const room = zone.readUInt32LE(0x10) - 0x80180000
    const ids = []
    for (let i = 0; i < rooms; i++) {
      ids.push(zone[room + 0x8 * i + 0x4])
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
        offset += 4
      }
    })
    const data = entities.map(function(room) {
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
    return ids.map(function(id) {
      return data[id] || []
    })
  }

  function romOffset(zone, address) {
    return zone.pos + address + Math.floor(address / 0x800) * 0x130
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
    return address + 1
  }

  checked.prototype.writeShort = function writeShort(address, val) {
    this.writeByte(address + 0, val & 0xff)
    this.writeByte(address + 1, val >>> 8)
    return address + 2
  }

  checked.prototype.writeWord = function writeShort(address, val) {
    this.writeShort(address + 0, val & 0xffff)
    this.writeShort(address + 2, val >>> 16)
    return address + 4
  }

  checked.prototype.sum = function sum() {
    const state = JSON.stringify(this.writes)
    let hex = sha256(state)
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
      case 'P':
        // Check for an argument.
        if (randomize[i] !== ':') {
          throw new Error('Expected argument')
        }
        let arg
        let start
        // Parse the arg name.
        start = ++i
        while (i < randomize.length
               && [',', ':'].indexOf(randomize[i]) === -1) {
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
      case 'd':
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
            if (!arg.length) {
              throw new Error('Expected argument')
            }
            const dashIndex = arg.lastIndexOf('-')
            let level
            if (dashIndex !== -1) {
              level = parseInt(arg.slice(dashIndex + 1))
              arg = arg.slice(0, dashIndex)
            }
            const matches = enemies.filter(function(enemy) {
              let name = enemy.name.replace(/[^a-zA-Z0-9]/g, '')
              name = name.toLowerCase()
              return name === arg.toLowerCase()
            })
            let enemy
            if (matches.length > 1 && typeof(level) !== 'undefined') {
              enemy = matches.filter(function(enemy) {
                return enemy.level === level
              })[0]
            } else {
              enemy = matches[0]
            }
            if (!enemy) {
              throw new Error('Unknown enemy: ' + arg)
            }
            let enemyName = enemy.name.replace(/[^a-zA-Z0-9]/g, '')
            if (matches.length > 1 && matches[0] !== enemy) {
              enemyName += '-' + enemy.level
            }
            if (typeof(enemyDrops) !== 'object') {
              enemyDrops = {}
            }
            enemyDrops[enemyName] = []
            if (randomize[i] === ':') {
              start = ++i
              while (i < randomize.length
                     && [',', ':'].indexOf(randomize[i]) === -1) {
                i++
              }
              arg = randomize.slice(start, i)
              arg.split('-').forEach(function(arg, index)  {
                if (index > 1) {
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
      case 'e':
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
            let itemName = ''
            if (arg.length) {
              const item = items.filter(function(item) {
                let name = item.name.replace(/[^a-zA-Z0-9]/g, '')
                name = name.toLowerCase()
                return name === arg.toLowerCase()
              })[0]
              if (!item) {
                throw new Error('Unknown item: ' + arg)
              }
              itemName = item.name
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
            }
            if (typeof(startingEquipment) !== 'object') {
              startingEquipment = {}
            }
            startingEquipment[slot] = itemName
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
      case 'i':
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
            if (!arg.length) {
              throw new Error('Expected argument')
            }
            if (!(arg in constants.ZONE)) {
              throw new Error('Unknown zone: ' + arg)
            }
            const zone = arg
            if (typeof(itemLocations) !== 'object') {
              itemLocations = {}
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
            const dashIndex = arg.lastIndexOf('-')
            let index
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
            const itemName = item.name
            const tile = item.tiles && item.tiles.filter(function(tile) {
              if (typeof(tile.zone) !== 'undefined') {
                return tile.zone === constants.ZONE[zone]
              }
            })[index]
            if (!tile) {
              throw new Error('Item not found in zone: ' + arg)
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
            const replace = items.filter(function(item) {
              let name = item.name.replace(/[^a-zA-Z0-9]/g, '')
              name = name.toLowerCase()
              return name === arg.toLowerCase()
            })[0]
            if (!replace) {
              throw new Error('Unknown item: ' + arg)
            }
            const replaceName = replace.name
            itemLocations[zone] = itemLocations[zone] || {}
            let map = itemLocations[zone][itemName] || {}
            map[index] = replaceName
            itemLocations[zone][itemName] = map
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
      case 'p':
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
            let replaceName = ''
            if (arg.length) {
              const replace = items.filter(function(item) {
                let name = item.name.replace(/[^a-zA-Z0-9]/g, '')
                name = name.toLowerCase()
                return name === arg.toLowerCase()
              })[0]
              if (!replace) {
                throw new Error('Unknown item: ' + arg)
              }
              replaceName = replace.name
            }
            if (typeof(prologueRewards) !== 'object') {
              prologueRewards = {}
            }
            prologueRewards[item] = replaceName
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
      case 'r':
        let relicLocations = options.relicLocations || true
        // Check for an argument.
        if (randomize[i] === ':') {
          i++
          let args = 0
          while (i < randomize.length && randomize[i] !== ',') {
            // If there's an argument it's either a relic preset scheme name 
            // or a location lock.
            const relics = Object.getOwnPropertyNames(constants.RELIC)
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
            const location = constants.RELIC[relics.filter(function(relic) {
              return constants.RELIC[relic] === arg
            }).pop()]
            if (!location) {
              throw new Error('Invalid relic location: ' + arg)
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
            } else {
              relicLocations[location] = []
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
      case 't':
        options.turkeyMode = true
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

  function optionsToString(options, disableRecurse) {
    options = Object.assign({}, options)
    delete options.checkVanilla
    delete options.verbose
    Object.getOwnPropertyNames(options).forEach(function(opt) {
      if (options[opt] === false) {
        delete options[opt]
      }
    })
    let presets
    if (self) {
      presets = self.sotnRando.presets
    } else {
      presets = require('./presets')
    }
    const safe = presets.filter(function(preset) {
      return preset.id === 'safe'
    }).pop()
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
      const preset = presets.filter(function(preset) {
        return preset.id === options.preset
      }).pop()
      if (optionsToString(copy) === optionsToString(preset.options())) {
        // If they match, the options become the preset by itself.
        options = {preset: preset.id}
      }
    }
    let randomize = ''
    while (Object.getOwnPropertyNames(options).length) {
      if ('preset' in options) {
        randomize += 'P:' + options.preset
        if (Object.getOwnPropertyNames(options).length > 1) {
          randomize += ','
        }
        delete options.preset
      } else if ('enemyDrops' in options) {
        if (options.enemyDrops) {
          randomize += 'd'
          if (typeof(options.enemyDrops) === 'object') {
            const drops = options.enemyDrops
            Object.getOwnPropertyNames(drops).forEach(function(enemyName) {
              randomize += ':' + enemyName.replace(/[^a-zA-Z0-9\-]/g, '')
              if (drops[enemyName].length) {
                randomize += ':'
                randomize += drops[enemyName].map(function(dropName) {
                  if (dropName) {
                    return dropName.replace(/[^a-zA-Z0-9]/g, '')
                  }
                }).join('-')
              }
            })
            if (Object.getOwnPropertyNames(options).length > 1) {
              randomize += ','
            }
          }
        }
        delete options.enemyDrops
      } else if ('startingEquipment' in options) {
        if (options.startingEquipment) {
          randomize += 'e'
          const eq = options.startingEquipment
          if (typeof(eq) === 'object') {
            if ('r' in eq) {
              randomize += ':r:'
              if (eq.r) {
                randomize += eq.r.replace(/[^a-zA-Z0-9]/g, '')
              }
            }
            if ('l' in eq) {
              randomize += ':l:'
              if (eq.r) {
                randomize += eq.l.replace(/[^a-zA-Z0-9]/g, '')
              }
            }
            if ('h' in eq) {
              randomize += ':h:'
              if (eq.h) {
                randomize += eq.h.replace(/[^a-zA-Z0-9]/g, '')
              }
            }
            if ('b' in eq) {
              randomize += ':b:'
              if (eq.b) {
                randomize += eq.b.replace(/[^a-zA-Z0-9]/g, '')
              }
            }
            if ('c' in eq) {
              randomize += ':c:'
              if (eq.c) {
                randomize += eq.c.replace(/[^a-zA-Z0-9]/g, '')
              }
            }
            if ('o' in eq) {
              randomize += ':o:'
              if (eq.o) {
                randomize += eq.o.replace(/[^a-zA-Z0-9]/g, '')
              }
            }
            if ('a' in eq) {
              randomize += ':a:'
              if (eq.a) {
                randomize += eq.a.replace(/[^a-zA-Z0-9]/g, '')
              }
            }
            if ('x' in eq) {
              randomize += ':x:'
              if (eq.x) {
                randomize += eq.x.replace(/[^a-zA-Z0-9]/g, '')
              }
            }
            if (Object.getOwnPropertyNames(options).length > 1) {
              randomize += ','
            }
          }
        }
        delete options.startingEquipment
      } else if ('itemLocations' in options) {
        if (options.itemLocations) {
          randomize += 'i'
          if (typeof(options.itemLocations) === 'object') {
            Object.getOwnPropertyNames(constants.ZONE).forEach(function(zone) {
              if (zone in options.itemLocations) {
                const items = options.itemLocations[zone]
                Object.getOwnPropertyNames(items).forEach(function(itemName) {
                  const map = items[itemName]
                  const indexes = Object.getOwnPropertyNames(map)
                  indexes.forEach(function(index) {
                    index = parseInt(index)
                    const replaceName = map[index]
                    randomize += ':' + zone
                      + ':' + itemName.replace(/[^a-zA-Z0-9]/g, '')
                      + (index > 0 ? '-' + (index + 1) : '')
                      + ':' + replaceName.replace(/[^a-zA-Z0-9]/g, '')
                  })
                })
              }
            })
            if (Object.getOwnPropertyNames(options).length > 1) {
              randomize += ','
            }
          }
        }
        delete options.itemLocations
      } else if ('prologueRewards' in options) {
        if (options.prologueRewards) {
          randomize += 'p'
          if (typeof(options.prologueRewards) === 'object') {
            const rewards = ['h', 'n', 'p']
            rewards.forEach(function(reward) {
              if (reward in options.prologueRewards) {
                randomize += ':' + reward
                if (options.prologueRewards[reward]) {
                  const itemName = options.prologueRewards[reward]
                  randomize += ':' + itemName.replace(/[^a-zA-Z0-9]/g, '')
                }
              }
            })
            if (Object.getOwnPropertyNames(options).length > 1) {
              randomize += ','
            }
          }
        }
        delete options.prologueRewards
      } else if ('relicLocations' in options) {
        if (options.relicLocations) {
          randomize += 'r'
          if (typeof(options.relicLocations) === 'object') {
            const locks = []
            const relics = Object.getOwnPropertyNames(constants.RELIC)
            relics.forEach(function(relic) {
              relic = constants.RELIC[relic]
              if (options.relicLocations[relic]) {
                let lock = relic
                lock += ':' + options.relicLocations[relic].join('-')
                locks.push(lock)
              }
            })
            if (locks.length) {
              randomize += ':' + locks.join(':')
            }
            if (Object.getOwnPropertyNames(options).length > 1) {
              randomize += ','
            }
          }
        }
        delete options.relicLocations
      } else if ('turkeyMode' in options) {
        if (options.turkeyMode) {
          randomize += 't'
        }
        delete options.turkeyMode
      } else {
        const unknown = Object.getOwnPropertyNames(options).pop()
        throw new Error('Unknown options: ' + unknown)
      }
    }
    if (!randomize.length) {
      throw new Error('No randomizations')
    }
    // Handle the edge case where the options are the same as a preset.
    if (!disableRecurse) {
      const preset = presets.filter(function(preset) {
        if (preset instanceof Preset) {
          const options = preset.options()
          if (preset === safe) {
            options.relicLocations = true
          }
          return optionsToString(options, true) === randomize
        }
      }).pop()
      if (preset) {
        randomize = 'P:' + preset.id
      }
    }
    return randomize
  }

  function optionsToUrl(version, options, checksum, seed, baseUrl) {
    options = optionsToString(options)
    const args = []
    if (options !== constants.defaultOptions) {
      args.push(options)
    }
    args.push(checksum.toString(16))
    args.push(encodeURIComponent(seed))
    let versionBaseUrl
    if (version.match(/-/)) {
      versionBaseUrl = constants.devBaseUrl
    } else {
      versionBaseUrl = constants.releaseBaseUrl
    }
    return (baseUrl || versionBaseUrl) + '?' + args.join(',')
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
    const hex = sha256(str)
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
        case 'ability':
          const names = Object.getOwnPropertyNames(constants.RELIC)
          value = 'RELIC.' + names.filter(function(name) {
            return constants.RELIC[name] === entry[1]
          })[0]
          break
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
          const hexTypes = ['addresses', 'blacklist', 'dropAddresses']
          if (hexTypes.indexOf(entry[0]) !== -1) {
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

  function shuffled(array) {
    const copy = array.slice()
    const shuffled = []
    while (copy.length) {
      const rand = Math.floor(Math.random() * copy.length)
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

  function isCandle(zoneId, entity) {
    const states = []
    switch (zoneId) {
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

  function Preset(
    id,
    name,
    description,
    author,
    weight,
    enemyDrops,
    startingEquipment,
    itemLocations,
    prologueRewards,
    relicLocations,
    turkeyMode,
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.author = author
    this.weight = weight
    this.enemyDrops = enemyDrops
    this.startingEquipment = startingEquipment
    this.itemLocations = itemLocations
    this.prologueRewards = prologueRewards
    this.relicLocations = relicLocations
    this.turkeyMode = turkeyMode
  }

  function clone(obj) {
    if (Array.isArray(obj)) {
      return obj.slice().map(clone)
    } else if (typeof(obj) === 'object') {
      return Object.getOwnPropertyNames(obj).reduce(function(copy, prop) {
        copy[prop] = clone(obj[prop])
        return copy
      }, {})
    }
    return obj
  }

  function merge(obj) {
    const self = this
    Object.getOwnPropertyNames(obj).forEach(function(prop) {
      if (Array.isArray(obj[prop])) {
        self[prop] = clone(obj[prop])
      } else if (typeof(obj[prop]) === 'object') {
        if (Array.isArray(self[prop])) {
          self[prop] = clone(obj[prop])
        } else if (typeof(self[prop]) === 'object') {
          merge(self[prop], obj[prop])
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
      let presets
      if (self) {
        presets = self.sotnRando.presets
      } else {
        presets = require('./presets')
      }
      let preset = presets.filter(function(preset) {
        return preset.id === options.preset
      }).pop()
      if (!preset && !self) {
        try {
          preset = require('./presets/' + options.preset)
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
    return optionsToString(this.options())
  }

  Preset.prototype.options = function options() {
    const options = Object.assign({}, this)
    delete options.id
    delete options.name
    delete options.description
    delete options.author
    delete options.weight
    return clone(options)
  }

  // Helper class to create relic location locks.
  function PresetBuilder(metadata) {
    this.metadata = metadata
    // The collection of enemy drops.
    this.drops = true
    // The collection of starting equipment.
    this.equipment = true
    // The collection of item locations.
    this.items = true
    // The collection of prologue rewards.
    this.rewards = true
    // The collection of location locks.
    this.relics = true
    // Turkey mode.
    this.turkey = true
    // Unplaced relics collection.
    const relicNames = Object.getOwnPropertyNames(constants.RELIC)
    this.unplaced = new Set(relicNames.reduce(function(lock, relic) {
      return lock + constants.RELIC[relic]
    }, ''))
  }

  PresetBuilder.prototype.enemyDrops =
    function enemyDrops(enemyName, level, commonDropName, rareDropName) {
      if (typeof(enemy) === 'boolean') {
        this.drops = enemy
      } else {
        if (typeof(this.drops) !== 'object') {
          this.drops = new Map()
        }
        if (typeof(level) === 'string') {
          rareDropName = commonDropName
          commonDropName = level
          level = undefined
        }
        const enemy = enemies.filter(function(enemy) {
          if (enemy.name === enemyName) {
            if (typeof(level) !== 'undefined') {
              return enemy.level === level
            }
            return true
          }
        }).pop()
        assert(enemy, 'Unknown enemy: ' + enemyName)
        const dropNames = [ commonDropName, rareDropName ]
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

  PresetBuilder.prototype.startingEquipment =
    function startingEquipment(slot, itemName) {
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
        if (typeof(this.equipment) !== 'object') {
          this.equipment = {}
        }
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
            if (this.equipment[constants.SLOT.LEFT_HAND]) {
              throw new Error(
                'Cannot equipment '
                  + this.equipment[constants.SLOT.LEFT_HAND].name
                  + ' and ' + item.name
              )
            }
            break
          case constants.SLOT.LEFT_HAND:
            assert.oneOf(item.type, [
              constants.TYPE.WEAPON1,
              constants.TYPE.SHIELD,
              constants.TYPE.USABLE,
            ])
            if (this.equipment[constants.SLOT.RIGHT_HAND]) {
              assert.notEqual(
                this.equipment[constants.SLOT.RIGHT_HAND].type,
                constants.TYPE.WEAPON2,
                'Cannot equipment '
                  + this.equipment[constants.SLOT.RIGHT_HAND].name
                  + ' and ' + item.name
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
        this.equipment[slot] = item
      }
    }

  PresetBuilder.prototype.itemLocations =
    function itemLocations(zoneId, itemName, number, replaceName) {
      if (typeof(zoneId) === 'boolean') {
        this.items = zoneId
      } else {
        if (typeof(number) === 'string') {
          replaceName = number
          number = 1
        }
        assert(typeof(number) === 'number', 'Unknown item number: ' + number)
        const index = number - 1
        assert.oneOf(zoneId, constants.zoneNames.map(function(zoneName) {
          return constants.ZONE[zoneName]
        }), 'Unknown zone: ' + zoneId)
        const item = items.filter(function(item) {
          return item.name === itemName
        })[0]
        assert(item, 'Unknown item: ' + itemName)
        const tiles = (item.tiles || []).filter(function(tile) {
          return tile.zone === zoneId
        })
        assert(tiles[index], 'Unknown item tile: ' + itemName + ' ' + number)
        const replace = items.filter(function(item) {
          return item.name === replaceName
        })[0]
        assert(replace, 'Unknown item: ' + replaceName)
        if (typeof(this.items) !== 'object') {
          this.items = {}
        }
        const zoneName = constants.zoneNames[zoneId]
        this.items[zoneName] = this.items[zoneName] || new Map()
        const map = this.items[zoneName].get(item) || {}
        map[number - 1] = replace
        this.items[zoneName].set(item, map)
      }
    }

  PresetBuilder.prototype.prologueRewards =
    function prologueRewards(itemName, replaceName) {
      if (typeof(itemName) === 'boolean') {
        this.rewards = itemName
      } else {
        const map = {
          'Heart Refresh': 'h',
          'Neutron Bomb': 'n',
          'Potion': 'p',
        }
        assert.oneOf(itemName, Object.getOwnPropertyNames(map),
                    'Unknown reward item: ' + itemName)
        const replace = items.filter(function(item) {
          return item.name === replaceName
        })[0]
        if (typeof(this.rewards) !== 'object') {
          this.rewards = {}
        }
        this.rewards[map[itemName]] = replace
      }
    }

  // Lock relic location behind abilities.
  PresetBuilder.prototype.lockLocation = function lockLocation(where, what) {
    if (typeof(this.relics) !== 'object') {
      this.relics = new Set()
    }
    this.relics[where] = this.relics[where] || []
    Array.prototype.push.apply(this.relics[where], what.map(function(lock) {
      return new Set(lock)
    }))
  }

  // Add relics to locations. The what and where arguments must contain the
  // same number of relics.
  PresetBuilder.prototype.placeRelic = function placeRelic(what, where) {
    assert.equal(what.length, where.length)
    if (typeof(this.relics) !== 'object') {
      this.relics = {}
    }
    const unplaced = this.unplaced
    what.split('').forEach(function(relic) {
      unplaced.delete(relic)
    })
    const relics = this.relics
    where.split('').forEach(function(location) {
      relics[location] = relics[location] || []
      relics[location].push(new Set(unplaced))
    })
  }

  // Enable/disable relic location randomization.
  PresetBuilder.prototype.relicLocations = function relicLocations(enabled) {
    assert.equal(typeof(enabled), 'boolean')
    this.relics = enabled
  }

  function relicAbilities() {
    return relics.map(function(relic) {
      return relic.ability
    })
  }

  // Convert lock sets into strings.
  PresetBuilder.prototype.build = function build() {
    const self = this
    let drops = self.drops
    if (typeof(drops) === 'object') {
      drops = {}
      Array.from(self.drops.keys()).forEach(function(enemy) {
        let enemyName = enemy.name
        const amb = enemies.filter(function(enemy) {
          return enemy.name === enemyName
        })
        if (amb.length > 1 && enemy !== amb[0]) {
          enemyName += '-' + enemy.level
        }
        drops[enemyName] = self.drops.get(enemy).slice().map(function(item) {
          return item.name
        })
      })
    }
    let equipment = self.equipment
    if (typeof(equipment) === 'object') {
      equipment = {}
      Object.getOwnPropertyNames(self.equipment).forEach(function(slot) {
        const item = self.equipment[slot]
        if (item) {
          const itemName = item.name
          equipment[slot] = itemName
        } else {
          equipment[slot] = ''
        }
      })
    }
    let items = self.items
    if (typeof(items) === 'object') {
      items = {}
      Object.getOwnPropertyNames(self.items).forEach(function(zone) {
        items[zone] = {}
        Array.from(self.items[zone].keys()).forEach(function(item) {
          const indexes = self.items[zone].get(item)
          const itemName = item.name
          items[zone][itemName] = {}
          Object.getOwnPropertyNames(indexes).forEach(function(index) {
            const replace = self.items[zone].get(item)[index]
            const replaceName = replace.name
            items[zone][itemName][index] = replaceName
          })
        })
      })
    }
    let rewards = self.rewards
    if (typeof(rewards) === 'object') {
      rewards = {}
      Object.getOwnPropertyNames(self.rewards).forEach(function(reward) {
        const item = self.rewards[reward]
        const itemName = item.name
        rewards[reward] = itemName
      })
    }
    let relics = self.relics
    if (typeof(relics) === 'object') {
      relics = {}
      relicAbilities().forEach(function(ability) {
        if (self.relics[ability]) {
          relics[ability] = self.relics[ability].map(function(lock) {
            return Array.from(lock).join('')
          })
        }
      })
    }
    const turkey = self.turkey
    return new Preset(
      self.metadata.id,
      self.metadata.name,
      self.metadata.description,
      self.metadata.author,
      self.metadata.weight || 0,
      drops,
      equipment,
      items,
      rewards,
      relics,
      turkey,
    )
  }

  const exports = {
    assert: assert,
    itemFromTileId: itemFromTileId,
    tileData: tileData,
    entityData: entityData,
    romOffset: romOffset,
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
    formatInfo: formatInfo,
    newInfo: newInfo,
    shuffled: shuffled,
    isItem: isItem,
    isRelic: isRelic,
    isCandle: isCandle,
    Preset: Preset,
    PresetBuilder: PresetBuilder,
  }
  if (self) {
    self.sotnRando = Object.assign(self.sotnRando || {}, {
      util: exports,
    })
  } else {
    module.exports = exports
  }
})(typeof(self) !== 'undefined' ? self : null)
