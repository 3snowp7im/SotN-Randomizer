(function(self) {

  let constants
  let enemies
  let items
  let relics
  let sjcl

  if (self) {
    constants = self.sotnRando.constants
    enemies = self.sotnRando.enemies
    items = self.sotnRando.items
    relics = self.sotnRando.relics
    sjcl = self.sjcl
  } else {
    constants = require('./constants')
    enemies = require('./enemies')
    items = require('./items')
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

  checked.prototype.writeWord = function writeShort(address, val) {
    this.writeShort(address + 0, val & 0xffff)
    this.writeShort(address + 2, val >>> 16)
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
        let enemyDrops = options.enemyDrops || true
        // Check for an argument.
        if (randomize[i] === ':') {
          i++
          let args = 0
          while (i < randomize.length && randomize[i] !== ',') {
            let enemy
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
            enemy = enemies.filter(function(enemy) {
              let name = enemy.name.replace(/[^a-zA-Z0-9]/g, '')
              name = name.toLowerCase()
              return (name + '-' + enemy.level === arg.toLowerCase())
                || name === arg.toLowerCase()
            })[0]
            if (!enemy) {
              throw new Error('Unknown enemy: ' + arg)
            }
            if (typeof(enemyDrops) !== 'object') {
              enemyDrops = new Map()
            }
            enemyDrops.set(enemy, [])
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
                  enemyDrops.get(enemy).push(item)
                } else {
                  enemyDrops.get(enemy).push(undefined)
                }
              })
            } else {
              enemyDrops.set(enemy, null)
            }
            if (randomize[i] === ':') {
              i++
            }
            args++
          }
          if (!args) {
            throw new Error('Expected argument')
          }
        } else if (typeof(enemyDrops) === 'undefined') {
          // Otherwise it's just turning on drop randomization.
          enemyDrops = true
        }
        if (randomize[i] === ',') {
          i++
        }
        if (typeof(enemyDrops) === 'object'
            && enemyDrops.entries().length === 0) {
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
            let item
            if (arg.length) {
              const itemName = arg
              item = items.filter(function(item) {
                let name = item.name.replace(/[^a-zA-Z0-9]/g, '')
                name = name.toLowerCase()
                return name === itemName.toLowerCase()
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
            }
            if (typeof(startingEquipment) !== 'object') {
              startingEquipment = {}
            }
            startingEquipment[slot] = item
            if (randomize[i] === ':') {
              i++
            }
            args++
          }
          if (!args) {
            throw new Error('Expected argument')
          }
        } else if (typeof(startingEquipment) === 'undefined') {
          // Otherwise it's just turning on equipment randomization.
          startingEquipment = true
        }
        if (randomize[i] === ',') {
          i++
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
            let itemName
            let index
            if (dashIndex === -1) {
              itemName = arg
              index = 0
            } else {
              itemName = arg.slice(0, dashIndex)
              index = parseInt(arg.slice(dashIndex + 1)) - 1
              if (index < 0) {
                throw new Error('Unknown index: ' + arg.slice(dashIndex + 1))
              }
            }
            const item = items.filter(function(item) {
              let name = item.name.replace(/[^a-zA-Z0-9]/g, '')
              name = name.toLowerCase()
              return name === itemName.toLowerCase()
            })[0]
            if (!item) {
              throw new Error('Unknown item: ' + arg)
            }
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
            const replacement = items.filter(function(item) {
              let name = item.name.replace(/[^a-zA-Z0-9]/g, '')
              name = name.toLowerCase()
              return name === arg.toLowerCase()
            })[0]
            if (!replacement) {
              throw new Error('Unknown item: ' + arg)
            }
            itemLocations[zone] = itemLocations[zone] || new Map()
            let map = itemLocations[zone].get(item) || {}
            map[index] = replacement
            itemLocations[zone].set(item, map)
            if (randomize[i] === ':') {
              i++
            }
            args++
          }
          if (!args) {
            throw new Error('Expected argument')
          }
        } else if (typeof(itemLocations) === 'undefined') {
          // Otherwise it's just turning on item randomization.
          itemLocations = true
        }
        if (randomize[i] === ',') {
          i++
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
            let replacement
            if (arg.length) {
              const replacementName = arg
              replacement = items.filter(function(item) {
                let name = item.name.replace(/[^a-zA-Z0-9]/g, '')
                name = name.toLowerCase()
                return name === replacementName.toLowerCase()
              })[0]
              if (!replacement) {
                throw new Error('Unknown item: ' + arg)
              }
            }
            if (typeof(prologueRewards) !== 'object') {
              prologueRewards = {}
            }
            prologueRewards[item] = replacement
            if (randomize[i] === ':') {
              i++
            }
            args++
          }
          if (!args) {
            throw new Error('Expected argument')
          }
        } else if (typeof(prologueRewards) === 'undefined') {
          // Otherwise it's just turning on reward randomization.
          prologueRewards = true
        }
        if (randomize[i] === ',') {
          i++
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
          while (i < randomize.length && randomize[i] !== ',') {
            // If there's an argument it's either a relic preset scheme name 
            // or a location lock.
            let preset
            let location
            let relics
            let arg
            let start
            // Parse the arg name.
            start = i
            while (i < randomize.length
                   && [',', ':'].indexOf(randomize[i]) === -1) {
              i++
            }
            arg = randomize.slice(start, i)
            if (arg === 'preset') {
              if (typeof(relicLocations) === 'object'
                  && 'preset' in relicLocations) {
                throw new Error('Can\'t specify more than one relic preset')
              }
              preset = true
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
              if (preset) {
                if (!arg.length) {
                  throw new Error('Relic preset name required')
                }
                if (arg !== 'safe') {
                  relicLocations.preset = arg
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
            } else if (preset) {
              throw new Error('Relic preset name required')
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
        if (typeof(options.enemyDrops) === 'object') {
          Array.from(options.enemyDrops.keys()).forEach(function(enemy) {
            const drops = options.enemyDrops.get(enemy)
            const firstEnemy = enemies.filter(function(ref) {
              return ref.name === enemy.name
            }).shift()
            let disambig = firstEnemy !== enemy
            randomize += ':' + enemy.name.replace(/[^a-zA-Z0-9]/g, '')
              + (disambig ? '-' + enemy.level : '')
            if (drops) {
              randomize += ':'
              randomize += drops.map(function(drop) {
                if (drop) {
                  return drop.name.replace(/[^a-zA-Z0-9]/g, '')
                }
              }).join('-')
            }
          })
          if (Object.getOwnPropertyNames(options).length > 1) {
            randomize += ','
          }
        }
        delete options.enemyDrops
      } else if ('startingEquipment' in options) {
        randomize += 'e'
        const eq = options.startingEquipment
        if (typeof(eq) === 'object') {
          if ('r' in eq) {
            randomize += ':'
            if (eq.r) {
              randomize += eq.r.name.replace(/[^a-zA-Z0-9]/g, '')
            }
          }
          if ('l' in eq) {
            randomize += ':'
            if (eq.r) {
              randomize += eq.l.name.replace(/[^a-zA-Z0-9]/g, '')
            }
          }
          if ('h' in eq) {
            randomize += ':'
            if (eq.h) {
              randomize += eq.h.name.replace(/[^a-zA-Z0-9]/g, '')
            }
          }
          if ('b' in eq) {
            randomize += ':'
            if (eq.b) {
              randomize += eq.b.name.replace(/[^a-zA-Z0-9]/g, '')
            }
          }
          if ('c' in eq) {
            randomize += ':'
            if (eq.c) {
              randomize += eq.c.name.replace(/[^a-zA-Z0-9]/g, '')
            }
          }
          if ('o' in eq) {
            randomize += ':'
            if (eq.o) {
              randomize += eq.o.name.replace(/[^a-zA-Z0-9]/g, '')
            }
          }
          if ('a' in eq) {
            randomize += ':'
            if (eq.a) {
              randomize += eq.a.name.replace(/[^a-zA-Z0-9]/g, '')
            }
          }
          if ('x' in eq) {
            randomize += ':'
            if (eq.x) {
              randomize += eq.x.name.replace(/[^a-zA-Z0-9]/g, '')
            }
          }
        }
        delete options.startingEquipment
      } else if ('itemLocations' in options) {
        randomize += 'i'
        if (typeof(options.itemLocations) === 'object') {
          Object.getOwnPropertyNames(constants.ZONE).forEach(function(zone) {
            if (zone in options.itemLocations) {
              const items = options.itemLocations[zone]
              Array.from(items.keys()).forEach(function(item) {
                const map = items.get(item)
                const indexes = Object.getOwnPropertyNames(map)
                indexes.forEach(function(index) {
                  const replacement = map[index]
                  randomize += ':' + zone
                    + ':' + item.name.replace(/[^a-zA-Z0-9]/g, '')
                    + (index > 0 ? '-' + (index + 1) : '')
                    + ':' + replacement.name.replace(/[^a-zA-Z0-9]/g, '')
                })
              })
            }
          })
          if (Object.getOwnPropertyNames(options).length > 1) {
            randomize += ','
          }
        }
        delete options.itemLocations
      } else if ('prologueRewards' in options) {
        randomize += 'p'
        if (typeof(options.prologueRewards) === 'object') {
          const rewards = ['h', 'n', 'p']
          rewards.forEach(function(reward) {
            if (reward in options.prologueRewards) {
              randomize += ':' + reward
              if (options.prologueRewards[reward]) {
                const item = options.prologueRewards[reward]
                randomize += ':' + item.name.replace(/[^a-zA-Z0-9]/g, '')
              }
            }
          })
          if (Object.getOwnPropertyNames(options).length > 1) {
            randomize += ','
          }
        }
        delete options.prologueRewards
      } else if ('relicLocations' in options) {
        randomize += 'r'
        if (typeof(options.relicLocations) === 'object') {
          const locks = []
          if ('preset' in options.relicLocations
              && options.relicLocations.preset !== 'safe') {
            locks.push('preset:' + options.relicLocations.preset)
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
          if (Object.getOwnPropertyNames(options).length > 1) {
            randomize += ','
          }
        }
        delete options.relicLocations
      } else if ('turkeyMode' in options) {
        randomize += 't'
        delete options.turkeyMode
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
  plandomizer.prototype.preset = function preset() {
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
    return optionsToString({relicLocations: this.preset().locks})
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
