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
            if (matches.length > 1) {
              enemy = matches.filter(function(enemy) {
                return enemy.level === level
              }).[0]
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
            let index
            if (dashIndex === -1) {
              index = 0
            } else {
              index = parseInt(arg.slice(dashIndex + 1)) - 1
              if (index < 0) {
                throw new Error('Unknown index: ' + arg.slice(dashIndex + 1))
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
        if (options.enemyDrops) {
          if (typeof(options.enemyDrops) === 'object') {
            const drops = options.enemyDrops
            Object.getOwnPropertyNames(drops).forEach(function(enemyName) {
              const firstEnemy = enemies.filter(function(ref) {
                return ref.name === enenyName
              }).shift()
              let disambig = firstEnemy !== enemy
              randomize += ':' + enemyName.replace(/[^a-zA-Z0-9]/g, '')
                + (disambig ? '-' + enemy.level : '')
              if (drops.length) {
                randomize += ':'
                randomize += drops.map(function(dropName) {
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
              randomize += ':'
              if (eq.r) {
                randomize += eq.r.replace(/[^a-zA-Z0-9]/g, '')
              }
            }
            if ('l' in eq) {
              randomize += ':'
              if (eq.r) {
                randomize += eq.l.replace(/[^a-zA-Z0-9]/g, '')
              }
            }
            if ('h' in eq) {
              randomize += ':'
              if (eq.h) {
                randomize += eq.h.replace(/[^a-zA-Z0-9]/g, '')
              }
            }
            if ('b' in eq) {
              randomize += ':'
              if (eq.b) {
                randomize += eq.b.replace(/[^a-zA-Z0-9]/g, '')
              }
            }
            if ('c' in eq) {
              randomize += ':'
              if (eq.c) {
                randomize += eq.c.replace(/[^a-zA-Z0-9]/g, '')
              }
            }
            if ('o' in eq) {
              randomize += ':'
              if (eq.o) {
                randomize += eq.o.replace(/[^a-zA-Z0-9]/g, '')
              }
            }
            if ('a' in eq) {
              randomize += ':'
              if (eq.a) {
                randomize += eq.a.replace(/[^a-zA-Z0-9]/g, '')
              }
            }
            if ('x' in eq) {
              randomize += ':'
              if (eq.x) {
                randomize += eq.x.replace(/[^a-zA-Z0-9]/g, '')
              }
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
                  const map = items.get(itemName)
                  const indexes = Object.getOwnPropertyNames(map)
                  indexes.forEach(function(index) {
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

  function Preset(
    metadata,
    enemyDrops,
    startingEquipment,
    itemLocations,
    prologueReward,
    relicLocations,
    turkeyMode,
  ) {
    this.metadata = metadata
    this.enemyDrops = enemyDrops
    this.startingEquipment = startingEquipment
    this.itemLocations = itemLocations
    this.prologueRewards = prologueRewards
    this.relicLocations = relicLocations
    this.turkeyMode = turkeyMode
  }

  Preset.prototype.toString = function toString() {
    return optionsToString(this.options())
  }

  Preset.prototype.options = function options() {
    const options = Object.assign({}, this)
    delete options.metadata
    return Object.assign({}, options)
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

  // Lock relic location behind abilities.
  PresetBuilder.prototype.lockLocation = function lockLocation(where, what) {
    this.relics[where] = this.relics[where] || []
    Array.prototype.push.apply(this.relics[where], what.map(function(lock) {
      return new Set(lock)
    }))
  }

  // Add relics to locations. The what and where arguments must contain the
  // same number of relics.
  PresetBuilder.prototype.placeRelic = function placeRelic(what, where) {
    assert.equal(what.length, where.length)
    const unplaced = this.unplaced
    const relics = this.relics
    what.split('').forEach(function(relic) {
      relics.delete(relic)
    })
    where.split('').forEach(function(location) {
      relics[location] = relics[location] || []
      relics[location].push(new Set(unplaced))
    })
  }

  function relicAbilities() {
    return relics.map(function(relic) {
      return relic.ability
    })
  }

  // Convert lock sets into strings.
  PresetBuilder.prototype.build = function build() {
    let drops = this.drops
    if (typeof(drops) === 'object') {
      drops = {}
      Array.from(this.drops.keys()).forEach(function(enemy) {
        let enemyName = enemy.name.replace(/[^a-zA-Z0-9]/g, '')
        const amb = enemies.filter(function(enemy) {
          return enemy.name === enemyName
        })
        if (amb.length > 1 && enemy !== amb[0]) {
          enemyName += '-' + enemy.level
        }
        drops[enemyName] = drops.get(enemy).slice()
      })
    }
    let equipment = this.equipment
    if (typeof(equipment) === 'object') {
      equipment = {}
      Object.getOwnPropertyNames(this.equipment).forEach(function(slot) {
        const item = this.equipment[slot]
        const itemName = item.name.replace(/[^a-zA-Z0-9]/g, '')
        equipment[slot] = itemName
      })
    }
    let items = this.items
    if (typeof(items) === 'object') {
      items = {}
      Object.getOwnPropertyNames(this.items).forEach(function(zone) {
        items[zone] = {}
        Array.from(items[zone].keys()).forEach(function(item) {
          const indexes = this.items[zone].get(item)
          const itemName = item.name.replace(/[^a-zA-Z0-9]/g, '')
          items[zone][itemName] = {}
          Object.getOwnPropertyNames(indexes).forEach(function(index) {
            const item = this.items[zone].get(item)[index]
            const itemName = item.name.replace(/[^a-zA-Z0-9]/g, '')
            items[zone][itemName][index] = itemName
          })
        })
      })
    }
    let rewards = this.rewards
    if (typeof(rewards) === 'object') {
      rewards = {}
      Object.getOwnPropertyNames(this.rewards).forEach(function(reward) {
        const item = this.rewards[reward]
        const itemName = item.name.replace(/[^a-zA-Z0-9]/g, '')
        rewards[reward] = itemName
      })
    }
    const relics = Object.assign({}, this.relics)
    relicAbilities().forEach(function(ability) {
      if (relics[ability]) {
        relics[ability] = relics[ability].map(function(lock) {
          return Array.from(lock).join('')
        })
      } else {
        relics[ability] = ['']
      }
    })
    const turkey = this.turkey
    return new Preset(
      this.metadata,
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
