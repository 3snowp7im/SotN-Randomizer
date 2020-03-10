(function(self) {

  let constants
  let enemies
  let items
  let util

  if (self) {
    constants = self.sotnRando.constants
    enemies = self.sotnRando.enemies
    items = self.sotnRando.items
    util = self.sotnRando.util
  } else {
    constants = require('./constants')
    enemies = require('./enemies')
    items = require('./items')
    util = require('./util')
  }

  const MAX_RETRIES = 64

  const TYPE = constants.TYPE
  const typeNames = constants.typeNames
  const ZONE = constants.ZONE
  const zoneNames = constants.zoneNames
  const tileIdOffset = constants.tileIdOffset
  const equipIdOffset = constants.equipIdOffset

  const shuffled = util.shuffled

  // The base address of Alucard's equipped item list.
  const equipBaseAddress = 0x11a0d0

  // This is applied to equipment ids to get the inventory slot it occupies.
  const equipmentInvIdOffset = 0x798a

  function itemFromName(name) {
    return items.filter(function(item) {
      return item.name === name
    })[0]
  }

  function itemFromId(id, filter, list) {
    return (list || items).filter(function(item) {
      return item.id === id && (!filter || filter(item))
    })[0]
  }

  function typeFilter(types) {
    return function(item) {
      return types.indexOf(item.type) !== -1
    }
  }

  const heartFilter = typeFilter([TYPE.HEART])
  const goldFilter = typeFilter([TYPE.GOLD])
  const subweaponFilter = typeFilter([TYPE.SUBWEAPON])
  const powerupFilter = typeFilter([TYPE.POWERUP])
  const weaponFilter = typeFilter([TYPE.WEAPON1, TYPE.WEAPON2])
  const shieldFilter = typeFilter([TYPE.SHIELD])
  const helmetFilter = typeFilter([TYPE.HELMET])
  const armorFilter = typeFilter([TYPE.ARMOR])
  const cloakFilter = typeFilter([TYPE.CLOAK])
  const accessoryFilter = typeFilter([TYPE.ACCESSORY])
  const equipmentFilter = typeFilter([
    TYPE.WEAPON1,
    TYPE.WEAPON2,
    TYPE.SHIELD,
    TYPE.HELMET,
    TYPE.ARMOR,
    TYPE.CLOAK,
    TYPE.ACCESSORY,
  ])

  function foodFilter(item) {
    return item.food
  }

  function usableFilter(item) {
    return typeFilter([TYPE.USABLE])(item) && !foodFilter(item)
  }

  function salableFilter(item) {
    return item.salable
  }

  function nonsalableFilter(item) {
    return accessoryFilter(item) && !salableFilter(item)
  }

  function nonprogressionFilter(item) {
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

  function mapTileFilter(tile) {
    return !shopTileFilter(tile)
      && !tankTileFilter(tile)
      && !rewardTileFilter(tile)
      && !candleTileFilter(tile)
      && !dropTileFilter(tile)
      && !librarianDropTileFilter(tile)
  }

  function shopTileFilter(tile) {
    return tile.shop
  }

  function librarianDropTileFilter(tile) {
    return tile.librarian
  }

  function dropTileFilter(tile) {
    return typeof(tile.enemy) !== 'undefined'
  }

  function rewardTileFilter(tile) {
    return tile.reward
  }

  function candleTileFilter(tile) {
    return typeof(tile.candle) !== 'undefined'
  }

  function tankTileFilter(tile) {
    return tile.tank
  }

  function typeReduce(types, item) {
    if (!types[item.type]) {
      types[item.type] = []
    }
    types[item.type].push(item)
    return types
  }

  function blacklist(item) {
    return function(tile) {
      if (item.blacklist) {
        for (let i = 0; i < item.blacklist.length; i++) {
          if (tile.addresses.indexOf(item.blacklist[i]) !== -1) {
            return false
          }
        }
      }
      return true
    }
  }

  function takeTile(list, filter) {
    for (let i = 0; i < list.length; i++) {
      const item = list[i]
      if (filter && !filter(item)) {
        continue
      }
      list.splice(i, 1)
      return item
    }
  }

  function takePermaTile(tiles, filter) {
    return takeTile(tiles, function(tile) {
      return filter(tile) && !tile.despawn
    })
  }

  function pushTile() {
    const tiles = Array.prototype.slice.call(arguments)
    this.tiles = this.tiles || []
    Array.prototype.push.apply(this.tiles, tiles)
  }

  function tileCountReduce(count, item) {
    if (item.tiles) {
      return count + item.tiles.length
    }
    return count
  }

  function eachTileItem(all, pool, filter, each) {
    let count = all.filter(filter).reduce(tileCountReduce, 0)
    pool = pool.filter(filter)
    while (count--) {
      each(pool)
    }
  }

  function cloneTilesMap(tileFilter) {
    return function(item) {
      return Object.assign({}, item, {
        tiles: (item.tiles || []).filter(tileFilter)
      })
    }
  }

  function randItem(array) {
    return array[Math.floor(Math.random() * array.length)]
  }

  function flattened() {
    const flattened = []
    for (let i = 0; i < arguments.length; i++) {
      const nonNull = arguments[i].filter(function(types) {
        return !!types
      })
      const flatTypes = Array.prototype.concat.apply([], nonNull)
      Array.prototype.push.apply(flattened, flatTypes)
    }
    return flattened
  }

  function collectTiles(items, filter) {
    return flattened(items.map(function(item) {
      return item.tiles || []
    })).filter(function(tile) {
      if (filter) {
        return filter(tile)
      }
      return true
    })
  }

  function writeTiles(data) {
    return function(item) {
      item.tiles.forEach(function(tile) {
        util.assert(tile)
        const value = util.tileValue(item, tile)
        tile.addresses.forEach(function(address) {
          data.writeShort(address, value)
        })
      })
    }
  }

  function randomizeStartingEquipment(data, info, planned) {
    const pool = items.filter(nonprogressionFilter)
    // Select starting equipment.
    planned = planned || {}
    let weapon, shield, helmet, armor, cloak, other
    if ('r' in planned) {
      weapon = itemFromName(planned.r)
    } else {
      weapon = randItem(pool.filter(typeFilter([TYPE.WEAPON1])))
    }
    if ('l' in planned) {
      shield = itemFromName(planned.l)
    } else if (!planned.r || planned.r.type !== TYPE.WEAPON2) {
      shield = randItem(pool.filter(shieldFilter))
    }
    if ('b' in planned) {
      armor = itemFromName(planned.b)
    } else {
      armor = randItem(pool.filter(armorFilter))
    }
    if ('h' in planned) {
      helmet = itemFromName(planned.h)
    } else {
      helmet = randItem(pool.filter(helmetFilter))
    }
    if ('c' in planned) {
      cloak = itemFromName(planned.c)
    } else {
      cloak = randItem(pool.filter(cloakFilter))
    }
    if ('o' in planned) {
      other = itemFromName(planned.o)
    } else {
      other = randItem(pool.filter(accessoryFilter))
    }
    // Their values when equipped.
    const weaponEquipVal = weapon ? weapon.id : 0
    const shieldEquipVal = shield ? shield.id : 0
    const helmetEquipVal = helmet ? helmet.id + equipIdOffset : 0
    const armorEquipVal = armor ? armor.id + equipIdOffset : 0
    const cloakEquipVal = cloak ? cloak.id + equipIdOffset : 0
    const otherEquipVal = other ? other.id  + equipIdOffset : 0
    // Their inventory locations.
    const weaponInvOffset = weapon ? weapon.id + equipmentInvIdOffset : 0
    const shieldInvOffset = shield ? shield.id + equipmentInvIdOffset : 0
    const helmetInvOffset = helmet ? helmet.id + equipmentInvIdOffset : 0
    const armorInvOffset = armor ? armor.id + equipmentInvIdOffset : 0
    const cloakInvOffset = cloak ? cloak.id + equipmentInvIdOffset : 0
    const otherInvOffset = other ? other.id + equipmentInvIdOffset : 0
    // Equip the items.
    data.writeShort(equipBaseAddress +  0, weaponEquipVal)
    data.writeShort(equipBaseAddress + 12, shieldEquipVal)
    if (helmet) {
      data.writeShort(equipBaseAddress + 24, helmetEquipVal)
    } else {
      data.writeWord(equipBaseAddress + 32, 0)
    }
    data.writeShort(equipBaseAddress + 36, armorEquipVal)
    if (cloak) {
      data.writeShort(equipBaseAddress + 48, cloakEquipVal)
    } else {
      data.writeWord(equipBaseAddress + 56, 0)
    }
    if (other) {
      data.writeShort(equipBaseAddress + 60, otherEquipVal)
    } else {
      data.writeWord(equipBaseAddress + 68, 0)
    }
    // Death removes these values if equipped.
    data.writeShort(0x1195f8, weaponEquipVal)
    data.writeShort(0x119658, shieldEquipVal)
    data.writeShort(0x1196b8, helmetEquipVal)
    data.writeShort(0x1196f4, armorEquipVal)
    data.writeShort(0x119730, cloakEquipVal)
    data.writeShort(0x119774, otherEquipVal)
    // Death decrements these inventory values if not equiped.
    data.writeShort(0x119634, weaponInvOffset)
    data.writeShort(0x119648, weaponInvOffset)
    data.writeShort(0x119694, shieldInvOffset)
    data.writeShort(0x1196a8, shieldInvOffset)
    data.writeShort(0x1196d0, helmetInvOffset)
    data.writeShort(0x1196e4, helmetInvOffset)
    data.writeShort(0x11970c, armorInvOffset)
    data.writeShort(0x119720, armorInvOffset)
    data.writeShort(0x119750, cloakInvOffset)
    data.writeShort(0x119764, cloakInvOffset)
    data.writeShort(0x1197b0, otherInvOffset)
    data.writeShort(0x1197c4, otherInvOffset)
    // Replace Axe Lord Armor.
    let axeLordArmor
    if ('a' in planned) {
      axeLordArmor = itemFromName(planned.a)
    } else {
      axeLordArmor = randItem(pool.filter(armorFilter))
    }
    const axeLordEquipVal = axeLordArmor ? axeLordArmor.id + equipIdOffset : 0
    data.writeByte(0x11a230, axeLordEquipVal)
    // Replace Lapis Lazuli.
    let luckItem
    if ('x' in planned) {
      luckItem = itemFromName(planned.x)
    } else {
      luckItem = randItem(pool.filter(accessoryFilter)).id
    }
    if (luckItem) {
      const luckItemEquipVal = luckItem ? luckItem.id : 0
      data.writeByte(0x11a198, luckItemEquipVal + equipIdOffset)
    } else {
      data.writeWord(0x11a1d8, 0)
    }
    // Update info.
    info[2]['Starting equipment'] = [
      weapon ? weapon.name : 'none',
      shield ? shield.name : 'none',
      helmet ? helmet.name : 'none',
      armor ? armor.name : 'none',
      cloak ? cloak.name : 'none',
      other ? other.name : 'none',
    ]
  }

  function randomizeCandles(pool) {
    // There are statues and pots in the hidden room of Final Stage stage that
    // drop equipment and usable items. Note that these are unique in the game
    // in that they are handled by the candle code, but their sprites are
    // permanent tile containers, not candles.
    // Additionally, there are 4 candles (2 in each library) that drop Uncurse.
    const zones = {
      st0: [ZONE.ST0],
      lib: [ZONE.LIB, ZONE.RLIB],
    }
    const specialZones = {}
    const specialItems = []
    Object.getOwnPropertyNames(zones).forEach(function(name) {
      specialZones[name] = items.filter(function(item) {
        return !typeFilter([TYPE.HEART, TYPE.GOLD, TYPE.SUBWEAPON])(item)
          && item.tiles && item.tiles.some(function(tile) {
            return candleTileFilter(tile)
              && zones[name].indexOf(tile.zone) !== -1
          })
      })
      const ids = specialZones[name].map(function(item) {
        return item.id
      })
      Array.prototype.push.apply(specialItems, ids)
    })
    // Randomize these special cases by replacing them with the same item type.
    const itemTypes = shuffled(pool).reduce(typeReduce, [])
    Object.getOwnPropertyNames(zones).forEach(function(name) {
      specialZones[name].forEach(function(item) {
        let replacement
        do replacement = itemTypes[item.type].pop()
        while (foodFilter(replacement))
        const tiles = collectTiles([item], candleTileFilter)
        pushTile.apply(replacement, tiles)
      })
    })
    // Randomize the rest of the candles, except for Final Stage, which
    // doesn't have map tiles for all subweapons, so it must be ignored.
    const tileFilter = function(tile) {
      return candleTileFilter(tile) && tile.zone !== ZONE.ST0
    }
    const candleItems = items.filter(function(item) {
      return (specialItems.indexOf(item.id) === -1
              || typeFilter([TYPE.HEART, TYPE.GOLD, TYPE.SUBWEAPON])(item))
        && (item.tiles || []).some(tileFilter)
    })
    const candleTileCounts = candleItems.map(function(items) {
      return items.tiles.filter(tileFilter).length
    })
    const candleTiles = shuffled(collectTiles(candleItems, tileFilter))
    candleItems.forEach(function(item, index) {
      item = itemFromId(item.id, typeFilter([item.type]), pool)
      let count = candleTileCounts[index]
      while (count--) {
        pushTile.call(item, candleTiles.pop())
      }
    })
  }

  function randomizePrologueRewards(pool, addon, planned) {
    const rewardItems = items.filter(itemTileFilter(rewardTileFilter))
    rewardItems.sort(function(a, b) {
      if (a < b) {
        return -1
      } else if (a > b) {
        return 1
      }
      return 0
    })
    const rewardTiles = collectTiles(items, rewardTileFilter)
    const usableItems = shuffled(pool.filter(usableFilter))
    pool = ['h', 'n', 'p'].map(function(item) {
      if (planned && item in planned) {
        if (planned[item]) {
          const plannedItem = itemFromName(planned[item])
          let poolItem = (addon || []).concat(pool).filter(function(poolItem) {
            if (poolItem.id === plannedItem.id
                && poolItem.type == plannedItem.type) {
              return poolItem
            }
          })[0]
          if (!poolItem) {
            poolItem = Object.assign({}, plannedItem)
            delete poolItem.tiles
            addon.push(poolItem)
          }
          return poolItem
        }
        return { id: 0 }
      }
      return usableItems.pop()
    })
    while (rewardTiles.length) {
      const item = pool.shift()
      switch (item.type) {
      case TYPE.HELMET:
      case TYPE.ARMOR:
      case TYPE.CLOAK:
      case TYPE.ACCESSORY:
        if (item.id >= tileIdOffset) {
          throw new Error('Cannot reward ' + item.name)
        }
        break
      }
      pushTile.call(item, rewardTiles.shift())
    }
  }

  function randomizeSubweaponTanks(pool) {
    // Get subweapon tank tiles.
    const tankTiles = flattened(items.filter(function(item) {
      return item.tiles && item.tiles.some(function(tile) {
        return tile.tank
      })
    }).map(function(item) {
      return item.tiles.filter(function(tile) {
        return tile.tank
      })
    }))
    // Separate tank tiles by zone.
    const tankZones = {}
    tankTiles.forEach(function(tile) {
      tankZones[tile.zone] = tankZones[tile.zone] || []
      tankZones[tile.zone].push(tile)
    })
    // Randomize tank items.
    Object.getOwnPropertyNames(tankZones).forEach(function(zone) {
      const subweapons = shuffled(pool.filter(subweaponFilter))
      while (tankZones[zone].length) {
        pushTile.call(subweapons.pop(), tankZones[zone].pop())
      }
    })
  }

  function turkeyMode(pool) {
    pool.push({
      name: 'Turkey',
      type: TYPE.SUBWEAPON,
      id: 13,
      tiles: collectTiles(items, function(tile) {
        return tile.tank
      }),
    })
  }

  function randomizeShopItems(pool) {
    // Get shop items by type.
    const shopTypes = items.filter(function(item) {
      return item.tiles && item.tiles.some(function(tile) {
        return tile.shop
      })
    }).map(function(item) {
      return {
        type: item.type,
        tiles: item.tiles.filter(function(tile) {
          return tile.shop
        })
      }
    }).reduce(typeReduce, [])
    // Assign random shop addresses.
    const shuffledTypes = shuffled(pool.filter(function(item) {
      return !foodFilter(item) && !salableFilter(item)
    })).reduce(typeReduce, [])
    shopTypes.forEach(function(items, type) {
      (items || []).map(function(item) {
        return item.tiles
      }).forEach(function(tiles) {
        pushTile.apply(shuffledTypes[type].pop(), tiles)
      })
    })
  }

  function randomizeMapItems(pool, addon, planned) {
    // Shuffle items.
    const shuffledItems = shuffled(pool)
    // Get all map tiles.
    const mapItems = items.filter(function(item) {
      return nonprogressionFilter(item) && itemTileFilter(mapTileFilter)(item)
    })
    const tileItems = mapItems.map(cloneTilesMap(mapTileFilter))
    // Shuffle all map tiles.
    const shuffledTiles = shuffled(collectTiles(tileItems))
    // Equipment is unique and placed in non-despawn tiles.
    const equipment = [
      weaponFilter,
      shieldFilter,
      helmetFilter,
      armorFilter,
      cloakFilter,
      nonsalableFilter,
    ]
    equipment.forEach(function(filter) {
      eachTileItem(tileItems, shuffledItems, filter, function(items) {
        const item = items.pop()
        pushTile.call(item, takePermaTile(shuffledTiles, blacklist(item)))
      })
    })
    // Powerups are in multiple non-despawn tiles.
    eachTileItem(tileItems, shuffledItems, powerupFilter, function(items) {
      const item = randItem(items)
      pushTile.call(item, takePermaTile(shuffledTiles, blacklist(item)))
    })
    // Distribute jewels with same id frequency as vanilla.
    const salableItems = mapItems.filter(salableFilter)
    salableItems.forEach(function(salableItem) {
      eachTileItem(tileItems, shuffledItems, function(item) {
        return item.id === salableItem.id
      }, function(items) {
        const item = items[0]
        pushTile.call(item, takePermaTile(shuffledTiles, blacklist(item)))
      })
    })
    // Usable items can occupy multiple (possibly despawn) tiles.
    const usable = [ usableFilter, foodFilter ]
    usable.forEach(function(filter) {
      eachTileItem(tileItems, shuffledItems, filter, function(items) {
        const item = randItem(items)
        pushTile.call(item, takeTile(shuffledTiles, blacklist(item)))
      })
    })
    util.assert.equal(shuffledTiles.length, 0)
    // Place planned item locations.
    if (planned) {
      Object.getOwnPropertyNames(planned).forEach(function(zone) {
        const items = planned[zone]
        Object.getOwnPropertyNames(items).forEach(function(itemName) {
          const item = itemFromName(itemName)
          // Collect tiles for the item.
          const tiles = item.tiles.reduce(function(tiles, tile) {
            if (tile.zone === constants.ZONE[zone] && !tile.reward) {
              tiles.push(tile)
            }
            return tiles
          }, []).reverse()
          // Replaced tiles in item pool.
          const map = items[itemName]
          Object.getOwnPropertyNames(map).forEach(function(index) {
            index = parseInt(index)
            pool.forEach(function(item) {
              if (item.tiles) {
                for (let i = 0; i < item.tiles.length; i++) {
                  if (item.tiles[i] === tiles[index]) {
                    item.tiles.splice(i, 1)
                  }
                }
              }
            })
            // Get target replacement in pool or add it.
            let target = pool.filter(function(ref) {
              return ref.id === map[index].id && ref.type === map[index].type
            })[0]
            if (!target) {
              target = Object.assign({}, itemFromName(map[index]))
              addon.push(target)
            }
            switch (target.type) {
            case TYPE.HELMET:
            case TYPE.ARMOR:
            case TYPE.CLOAK:
            case TYPE.ACCESSORY:
              if (tiles[index].byte && target.id >= tileIdOffset) {
                throw new Error('Cannot place item: ' + target.name)
              }
              break
            }
            pushTile.call(target, tiles[index])
          })
        })
      })
    }
  }

  function randomizeEnemyDrops(pool, addon, planned) {
    // Replace the axe subweapon drop with a random subweapon.
    const subweapon = shuffled(pool.filter(subweaponFilter)).pop()
    const subweaponTiles = collectTiles(items.filter(function(item) {
      return itemTileFilter(dropTileFilter)(item) && subweaponFilter(item)
    }), dropTileFilter)
    while (subweaponTiles.length) {
      pushTile.call(subweapon, takeTile(subweaponTiles))
    }
    // Collect counts of equipment types dropped by more than one enemy.
    const dupTypes = {}
    items.forEach(function(item) {
      if (equipmentFilter(item) && !salableFilter(item) && item.tiles) {
        const enemies = item.tiles.filter(function(tile) {
          return 'enemy' in tile
        }).map(function(tile) {
          return tile.enemy
        })
        if (enemies.length > 1) {
          dupTypes[item.type] = dupTypes[item.type] || []
          dupTypes[item.type].push(enemies.length - 1)
        }
      }
    })
    // Duplicate equipment as necessary.
    const dupped = []
    const types = pool.reduce(typeReduce, [])
    types[TYPE.ACCESSORY] = types[TYPE.ACCESSORY].filter(nonsalableFilter)
    Object.getOwnPropertyNames(dupTypes).forEach(function(type) {
      type = parseInt(type)
      const items = shuffled(types[type])
      dupTypes[type].forEach(function(count) {
        const item = items.shift()
        dupped.push(item)
        Array.prototype.push.apply(pool, Array(count).fill(item))
      })
    })
    // Shuffle items.
    const shuffledItems = shuffled(pool)
    // Get all drop items.
    const dropItems = items.filter(function(item) {
      return itemTileFilter(dropTileFilter)(item) && !subweaponFilter(item)
    })
    const tileItems = dropItems.map(cloneTilesMap(function(tile) {
      return dropTileFilter(tile) && !tile.byte
    }))
    // Create filter that ensures enemies don't drop the same item twice.
    const drops = {}
    const uniqueDrops = function(item) {
      return function(tile) {
        if (blacklist(item)(tile)
            && (!tile.enemy in drops || drops[tile.enemy] !== item.id)) {
          drops[tile.enemy] = item.id
          return true
        }
      }
    }
    // Shuffle all drop tiles.
    const shuffledTiles = shuffled(collectTiles(tileItems))
    // Distribute gold with same id frequency as vanilla.
    const goldItems = dropItems.filter(goldFilter)
    goldItems.forEach(function(goldItem) {
      eachTileItem(tileItems, shuffledItems, function(item) {
        return goldFilter(item) && item.id === goldItem.id
      }, function(items) {
        const item = items[0]
        pushTile.call(item, takeTile(shuffledTiles, uniqueDrops(item)))
      })
    })
    // Distribute jewels with same id frequency as vanilla.
    const salableItems = dropItems.filter(salableFilter)
    salableItems.forEach(function(salableItem) {
      eachTileItem(tileItems, shuffledItems, function(item) {
        return item.id === salableItem.id
      }, function(items) {
        const item = items[0]
        pushTile.call(item, takeTile(shuffledTiles, uniqueDrops(item)))
      })
    })
    // Distribute equipment with same type frequency as vanilla.
    const equipment = [
      weaponFilter,
      shieldFilter,
      helmetFilter,
      armorFilter,
      cloakFilter,
      nonsalableFilter,
    ]
    equipment.forEach(function(filter) {
      eachTileItem(tileItems, shuffledItems, filter, function(items) {
        const item = items.pop()
        pushTile.call(item, takeTile(shuffledTiles, uniqueDrops(item)))
      })
    })
    // Distribute usable items randomly.
    const usable = [ usableFilter, foodFilter ]
    usable.forEach(function(filter) {
      eachTileItem(tileItems, shuffledItems, filter, function(items) {
        const item = randItem(items)
        pushTile.call(item, takeTile(shuffledTiles, uniqueDrops(item)))
      })
    })
    util.assert.equal(shuffledTiles.length, 0)
    // Replace the librarian's drops.
    const libTiles = collectTiles(items, function(tile) {
      return tile.librarian
    })
    const shuffledEquip = shuffled(pool.filter(equipmentFilter))
    const libItems = shuffledEquip.slice(0, libTiles.length)
    libItems.forEach(function(item) {
      pushTile.call(item, takeTile(libTiles, blacklist(item)))
    })
    // Place planned drops.
    if (planned) {
      Object.getOwnPropertyNames(planned).forEach(function(key) {
        const dashIndex = key.lastIndexOf('-')
        let enemyName = key.toLowerCase()
        let level
        if (dashIndex !== -1) {
          level = parseInt(enemyName.slice(dashIndex + 1))
          enemyName = key.slice(0, dashIndex).toLowerCase()
        }
        const enemy = enemies.filter(function(enemy) {
          const name = enemy.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')
          if (name === enemyName) {
            if (typeof(level) !== 'undefined') {
              return enemy.level === level
            }
            return true
          }
        }).pop()
        const matches = items.filter(itemTileFilter(function(tile) {
          return tile.enemy === enemy.id
        }))
        let tiles
        if (matches.length > 0) {
          tiles = matches.reduce(function(tiles, item) {
            const indexes = item.tiles.reduce(function(indexes, tile, index) {
              if (tile.enemy === enemy.id) {
                indexes.push(index)
              }
              return indexes
            }, []).reverse()
            indexes.forEach(function(index) {
              Array.prototype.push.apply(tiles, item.tiles.splice(index, 1))
            })
            return tiles
          }, []).sort(function(a, b) {
            return a.addresses[0] - b.addresses[0]
          })
        } else {
          tiles = enemy.dropAddresses.map(function(address) {
            return {
              addresses: [address],
              enemy: enemy.id,
            }
          })
        }
        if (planned[key].length) {
          planned[key].forEach(function(itemName) {
            const item = itemFromName(itemName)
            const tile = tiles.shift()
            if (item) {
              let target = pool.filter(function(drop) {
                return drop.id === item.id && drop.type === item.type
              })[0]
              if (!target) {
                target = Object.assign({}, itemFromName(item))
                addon.push(target)
              }
              pushTile.call(target, tile)
            }
          })
        } else {
          tiles.forEach(function(tile) {
            const target = {
              name: 'nothing',
              id: 0,
            }
            addon.push(target)
            pushTile.call(target, tile)
          })
        }
      })
    }
    // The required Short Sword and Red Rust drops were ignored.
    // Push those tiles onto whatever item they ended up being replaced with.
    const pushReplacement = function(name) {
      const tiles = itemFromName(name).tiles
      const byteTile = tiles.filter(function(tile) {
        return tile.byte
      })[0]
      const shortTile = tiles.filter(function(tile) {
        return !tile.byte
      })[0]
      const replacement = (addon || []).concat(pool).filter(function(item) {
        return item.tiles && item.tiles.indexOf(shortTile) !== -1
      })[0]
      if (replacement) {
        if (replacement.id === 0) {
          throw new Error('Cannot drop item: ' + replacement.name)
        }
        switch (replacement.type) {
        case TYPE.HELMET:
        case TYPE.ARMOR:
        case TYPE.CLOAK:
        case TYPE.ACCESSORY:
          if (replacement.id >= tileIdOffset) {
            throw new Error('Cannot drop item: ' + replacement.name)
          }
          break
        }
        replacement.tiles.push(byteTile)
      }
    }
    pushReplacement('Short Sword')
    pushReplacement('Red Rust')
    // Remove duplicated items.
    dupped.forEach(function(dupped) {
      let count
      do {
        count = pool.filter(function(item) { return item === dupped }).length
        pool.splice(pool.indexOf(dupped), 1)
      } while (--count > 1)
    })
  }

  function randomizeCapeColors(data) {
    const colors = [
      Math.floor(Math.random() * 32),
      Math.floor(Math.random() * 32),
      Math.floor(Math.random() * 32),
      Math.floor(Math.random() * 32),
      Math.floor(Math.random() * 32),
      Math.floor(Math.random() * 32),
    ]
    // Write the jump to injected code.
    // Note: Use 0x0fe030 -> 0x08039eea for code to be run on every frame.
    data.writeWord(0x0fa97c, 0x0c04eabc)
    // Write the color setting instructions.
    let address = 0x15D508
    for (let i = 0; i < colors.length; i++) {
      address = data.writeWord(address, 0x3c020003)
      address = data.writeWord(address, 0x3442caa8 + 4 * i)
      address = data.writeWord(address, 0x24030000 + colors[i])
      address = data.writeWord(address, 0xa0430000)
    }
    // Write the jump from injected code.
    data.writeWord(address, 0x0803924f)
  }

  function randomizeItems(data, options, info) {
    let addon
    let pool
    if (options.startingEquipment) {
      // Randomize starting equipment.
      let planned
      if (typeof(options.startingEquipment) === 'object') {
        planned = options.startingEquipment
      }
      randomizeStartingEquipment(data, info, planned)
    }
    let retries = 0
    while (true) {
      try {
        // Get pool of randomizable items.
        addon = []
        pool = items.filter(function(item) {
          if (foodFilter(item)) {
            return true
          }
          if (options.enemyDrops
              && itemTileFilter(dropTileFilter)(item)) {
            return true
          }
          if (options.itemLocations
              && nonprogressionFilter(item)
              && (itemTileFilter(mapTileFilter)(item)
                  || itemTileFilter(shopTileFilter)(item)
                  || itemTileFilter(candleTileFilter)(item)
                  || itemTileFilter(librarianDropTileFilter)(item)
                  || itemTileFilter(tankTileFilter)(item))) {
            return true
          }
          if (options.prologueRewards
              && itemTileFilter(rewardTileFilter)(item)) {
            return true
          } 
        }).map(function(item) {
          item = Object.assign({}, item)
          delete item.tiles
          return item
        })
        // Randomizations.
        if (options.itemLocations) {
          // Randomize candles.
          randomizeCandles(pool)
          // Randomize tank items.
          if (!options.turkeyMode) {
            randomizeSubweaponTanks(pool)
          }
          // Randomize shop items.
          randomizeShopItems(pool)
          // Randomize map items.
          let planned
          if (typeof(options.itemLocations) === 'object') {
            planned = options.itemLocations
          }
          randomizeMapItems(pool, addon, planned)
        }
        if (options.enemyDrops) {
          // Randomize enemy drops.
          let planned
          if (typeof(options.enemyDrops) === 'object') {
            planned = options.enemyDrops
          }
          randomizeEnemyDrops(pool, addon, planned)
        }
        if (options.prologueRewards) {
          // Randomize prologue rewards.
          let planned
          if (typeof(options.prologueRewards) === 'object') {
            planned = options.prologueRewards
          }
          randomizePrologueRewards(pool, addon, planned)
        }
        // Turkey mode.
        if (options.turkeyMode) {
          turkeyMode(pool)
          randomizeCapeColors(data)
        }
        // Write items to ROM.
        if (!options.checkVanilla) {
          (addon.concat(pool)).filter(tilesFilter).forEach(writeTiles(data))
        }
      } catch (err) {
        if (err.name === 'AssertionError' && retries++ < MAX_RETRIES) {
          continue
        }
        throw err
      }
      break
    }
    return true
  }

  const exports = randomizeItems
  if (self) {
    self.sotnRando = Object.assign(self.sotnRando || {}, {
      randomizeItems: exports,
    })
  } else {
    module.exports = exports
  }
})(typeof(self) !== 'undefined' ? self : null)
