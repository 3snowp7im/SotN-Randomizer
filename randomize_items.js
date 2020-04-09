(function(self) {

  let constants
  let enemies
  let util

  if (self) {
    constants = self.sotnRando.constants
    enemies = self.sotnRando.enemies
    util = self.sotnRando.util
  } else {
    constants = require('./constants')
    enemies = require('./enemies')
    util = require('./util')
  }

  const MAX_RETRIES = 64

  const TYPE = constants.TYPE
  const typeNames = constants.typeNames
  const ZONE = constants.ZONE
  const zones = constants.zones
  const zoneNames = constants.zoneNames
  const tileIdOffset = constants.tileIdOffset
  const equipIdOffset = constants.equipIdOffset
  const equipmentInvIdOffset = constants.equipmentInvIdOffset
  const GLOBAL_DROP = constants.GLOBAL_DROP
  const globalDropsCount = constants.globalDropsCount

  const shuffled = util.shuffled

  // The base address of Alucard's equipped item list.
  const equipBaseAddress = 0x11a0d0

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
          if ('index' in tile) {
            for (let j = 0; j < tile.zones.length; j++) {
              const zone = zones[tile.zones[j]]
              const offset = zone.items + 0x2 * tile.index
              const address = util.romOffset(zone, offset)
              if (item.blacklist[i] === address) {
                return false
              }
            }
          }
          if ('address' in tile) {
            if (tile.addresses.indexOf(item.blacklist[i]) !== -1) {
              return false
            }
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

  function randItem(rng, array) {
    return array[Math.floor(rng() * array.length)]
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
        util.assert(tile, 'invalid tile')
        const value = util.tileValue(item, tile)
        if ('index' in tile) {
          tile.zones.forEach(function(zoneId) {
            const zone = zones[zoneId]
            const offset = zone.items + 0x02 * tile.index
            const address = util.romOffset(zone, offset)
            data.writeShort(address, value)
          })
        }
        if ('candle' in tile) {
          tile.entities.forEach(function(entity, index) {
            const zone = zones[tile.zones[index >>> 1]]
            const address = util.romOffset(zone, entity + 0x08)
            data.writeShort(address, value)
          })
        }
        if ('addresses' in tile) {
          tile.addresses.forEach(function(address) {
            data.writeShort(address, value)
          })
        }
      })
    }
  }

  function randomizeStartingEquipment(data, rng, items, info, planned) {
    const pool = items.filter(util.nonProgressionFilter)
    // Select starting equipment.
    planned = planned || {}
    let weapon, shield, helmet, armor, cloak, other
    if ('r' in planned) {
      weapon = util.itemFromName(planned.r)
    } else {
      weapon = randItem(rng, pool.filter(typeFilter([TYPE.WEAPON1])))
    }
    if ('l' in planned) {
      shield = util.itemFromName(planned.l)
    } else if (!planned.r || planned.r.type !== TYPE.WEAPON2) {
      shield = randItem(rng, pool.filter(shieldFilter))
    }
    if ('b' in planned) {
      armor = util.itemFromName(planned.b)
    } else {
      armor = randItem(rng, pool.filter(armorFilter))
    }
    if ('h' in planned) {
      helmet = util.itemFromName(planned.h)
    } else {
      helmet = randItem(rng, pool.filter(helmetFilter))
    }
    if ('c' in planned) {
      cloak = util.itemFromName(planned.c)
    } else {
      cloak = randItem(rng, pool.filter(cloakFilter))
    }
    if ('o' in planned) {
      other = util.itemFromName(planned.o)
    } else {
      other = randItem(rng, pool.filter(accessoryFilter))
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
    // Death cutscene draws these items.
    data.writeShort(0x04b6844c, weapon ? weapon.id : 0)
    data.writeShort(0x04b6844e, shield ? shield.id : 0)
    data.writeShort(0x04b68452, helmet ? helmet.id : 0)
    data.writeShort(0x04b68450, armor ? armor.id : 0)
    data.writeShort(0x04b68454, cloak ? cloak.id : 0)
    data.writeShort(0x04b68456, other ? other.id : 0)
    // Replace Axe Lord Armor.
    let axeLordArmor
    if ('a' in planned) {
      axeLordArmor = util.itemFromName(planned.a)
    } else {
      axeLordArmor = randItem(rng, pool.filter(armorFilter))
    }
    const axeLordEquipVal = axeLordArmor ? axeLordArmor.id + equipIdOffset : 0
    data.writeChar(0x11a230, axeLordEquipVal)
    // Replace Lapis Lazuli.
    let luckItem
    if ('x' in planned) {
      luckItem = util.itemFromName(planned.x)
    } else {
      luckItem = randItem(rng, pool.filter(accessoryFilter)).id
    }
    if (luckItem) {
      const luckItemEquipVal = luckItem ? luckItem.id : 0
      data.writeChar(0x11a198, luckItemEquipVal + equipIdOffset)
    } else {
      data.writeWord(0x11a1d8, 0)
    }
    // Update info.
    info[2]['Starting equipment'] = [
      weapon ? weapon.name : 'Empty hand',
      shield ? shield.name : 'Empty hand',
      helmet ? helmet.name : '----',
      armor ? armor.name : '----',
      cloak ? cloak.name : '----',
      other ? other.name : '----',
    ]
  }

  function randomizeCandles(rng, items, pool) {
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
            return util.candleTileFilter(tile)
              && zones[name].indexOf(tile.zones[0]) !== -1
          })
      })
      const ids = specialZones[name].map(function(item) {
        return item.id
      })
      Array.prototype.push.apply(specialItems, ids)
    })
    // Randomize these special cases by replacing them with the same item type.
    const itemTypes = shuffled(rng, pool).reduce(typeReduce, [])
    Object.getOwnPropertyNames(zones).forEach(function(name) {
      specialZones[name].forEach(function(item) {
        let replacement
        do replacement = itemTypes[item.type].pop()
        while (foodFilter(replacement))
        const tiles = collectTiles([item], util.candleTileFilter)
        pushTile.apply(replacement, tiles)
      })
    })
    // Randomize the rest of the candles, except for Final Stage, which
    // doesn't have map tiles for all subweapons, so it must be ignored.
    const tileFilter = function(tile) {
      return util.candleTileFilter(tile) && tile.zones[0] !== ZONE.ST0
    }
    const candleItems = items.filter(function(item) {
      return (specialItems.indexOf(item.id) === -1
              || typeFilter([TYPE.HEART, TYPE.GOLD, TYPE.SUBWEAPON])(item))
        && (item.tiles || []).some(tileFilter)
    })
    const candleTileCounts = candleItems.map(function(items) {
      return items.tiles.filter(tileFilter).length
    })
    const candleTiles = shuffled(rng, collectTiles(candleItems, tileFilter))
    candleItems.forEach(function(item, index) {
      item = itemFromId(item.id, typeFilter([item.type]), pool)
      let count = candleTileCounts[index]
      while (count--) {
        pushTile.call(item, candleTiles.pop())
      }
    })
  }

  function randomizePrologueRewards(rng, items, pool, addon, planned) {
    const rewardItemFilter = util.itemTileFilter(util.rewardTileFilter)
    const rewardItems = items.filter(rewardItemFilter)
    rewardItems.sort(function(a, b) {
      if (a < b) {
        return -1
      } else if (a > b) {
        return 1
      }
      return 0
    })
    const rewardTiles = collectTiles(items, util.rewardTileFilter)
    const usableItems = shuffled(rng, pool.filter(usableFilter))
    pool = ['h', 'n', 'p'].map(function(item) {
      if (planned && item in planned) {
        if (planned[item]) {
          const plannedItem = util.itemFromName(planned[item])
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
        const poolItem = { id: 0 }
        addon.push(poolItem)
        return poolItem
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

  function randomizeSubweaponTanks(rng, items, pool) {
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
      tankZones[tile.zones[0]] = tankZones[tile.zones[0]] || []
      tankZones[tile.zones[0]].push(tile)
    })
    // Randomize tank items.
    Object.getOwnPropertyNames(tankZones).forEach(function(zone) {
      const subweapons = shuffled(rng, pool.filter(subweaponFilter))
      while (tankZones[zone].length) {
        pushTile.call(subweapons.pop(), tankZones[zone].pop())
      }
    })
  }

  function turkeyMode(items, pool) {
    pool.push({
      name: 'Turkey',
      type: TYPE.SUBWEAPON,
      id: 13,
      tiles: collectTiles(items, function(tile) {
        return tile.tank
      }),
    })
  }

  function randomizeShopItems(rng, items, pool) {
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
    const shuffledTypes = shuffled(rng, pool.filter(function(item) {
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

  function randomizeMapItems(rng, items, pool, planned, addon) {
    // Shuffle items.
    const shuffledItems = shuffled(rng, pool)
    // Get all map tiles.
    const mapItems = items.filter(function(item) {
      return util.nonProgressionFilter(item)
        && util.itemTileFilter(util.mapTileFilter)(item)
    })
    const tileItems = mapItems.map(cloneTilesMap(util.mapTileFilter))
    // Shuffle all map tiles.
    const shuffledTiles = shuffled(rng, collectTiles(tileItems))
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
      const item = randItem(rng, items)
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
        const item = randItem(rng, items)
        pushTile.call(item, takeTile(shuffledTiles, blacklist(item)))
      })
    })
    util.assert.equal(shuffledTiles.length, 0)
    // Handle planned placements.
    if (typeof(planned) === 'object') {
      Object.getOwnPropertyNames(planned).forEach(function(zone) {
        const zoneItems = planned[zone]
        Object.getOwnPropertyNames(zoneItems).forEach(function(itemName) {
          const itemZoneNames = []
          if (zone === '*') {
            Array.prototype.push.apply(itemZoneNames, zoneNames)
          } else {
            itemZoneNames.push(zone)
          }
          const itemZones = itemZoneNames.map(function(zoneName) {
            return constants.ZONE[zoneName]
          })
          // Collect tiles for the item.
          const targets = items.filter(function(item) {
            return (itemName === '*' || item.name === itemName)
              && util.nonProgressionFilter(item)
              && util.tilesFilter(item)
          })
          // Replace tiles.
          let poolItem = util.itemFromName(zoneItems[itemName]['0'], pool)
          if (!poolItem) {
            const item = util.itemFromName(zoneItems[itemName]['0'])
            poolItem = Object.assign({}, item)
            delete poolItem.tiles
            addon.push(poolItem)
          }
          poolItem.tiles = poolItem.tiles || []
          targets.forEach(function(target) {
            const tiles = collectTiles([target], function(tile) {
              return 'zones' in tile
                && itemZones.indexOf(tile.zones[0]) !== -1
                && !util.rewardTileFilter(tile)
                && !util.dropTileFilter(tile)
            })
            tiles.forEach(function(tile) {
              pool.forEach(function(item) {
                if (item !== poolItem && item.tiles) {
                  const index = item.tiles.indexOf(tile)
                  if (index !== -1) {
                    item.tiles.splice(index, 1)
                  }
                }
              })
            })
            pushTile.apply(poolItem, tiles)
          })
        })
      })
    }
  }

  function randomizeEnemyDrops(rng, items, pool, addon, planned) {
    // Replace the axe subweapon drop with a random subweapon.
    const subweapon = shuffled(rng, pool.filter(subweaponFilter)).pop()
    const subweaponTiles = collectTiles(items.filter(function(item) {
      return util.itemTileFilter(util.dropTileFilter)(item)
        && subweaponFilter(item)
    }), util.dropTileFilter)
    while (subweaponTiles.length) {
      pushTile.call(subweapon, takeTile(subweaponTiles))
    }
    // Collect counts of equipment types dropped by more than one enemy.
    const dupTypes = {}
    items.forEach(function(item) {
      if (equipmentFilter(item) && !salableFilter(item) && item.tiles) {
        const enemies = item.tiles.filter(function(tile) {
          return 'enemy' in tile && tile.enemy !== GLOBAL_DROP
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
    types[TYPE.ACCESSORY] = types[TYPE.ACCESSORY] || []
    types[TYPE.ACCESSORY] = types[TYPE.ACCESSORY].filter(nonsalableFilter)
    Object.getOwnPropertyNames(dupTypes).forEach(function(type) {
      type = parseInt(type)
      types[type] = types[type] || []
      const items = shuffled(rng, types[type])
      dupTypes[type].forEach(function(count) {
        const item = items.shift()
        dupped.push(item)
        Array.prototype.push.apply(pool, Array(count).fill(item))
      })
    })
    // Shuffle items.
    const shuffledItems = shuffled(rng, pool)
    // Get all drop items.
    const dropItems = items.filter(function(item) {
      return util.itemTileFilter(util.dropTileFilter)(item)
        && !subweaponFilter(item)
        && util.itemTileFilter(function(tile) {
          return !tile.librarian && tile.enemy !== GLOBAL_DROP
        })(item)
    })
    const tileItems = dropItems.map(cloneTilesMap(function(tile) {
      return util.dropTileFilter(tile)
        && !tile.librarian
        && tile.enemy !== GLOBAL_DROP
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
    const shuffledTiles = shuffled(rng, collectTiles(tileItems))
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
        const item = randItem(rng, items)
        pushTile.call(item, takeTile(shuffledTiles, uniqueDrops(item)))
      })
    })
    util.assert.equal(shuffledTiles.length, 0)
    // Replace the librarian's drops.
    const libTiles = collectTiles(items, function(tile) {
      return tile.librarian
    })
    const shuffledEquip = shuffled(rng, pool.filter(equipmentFilter))
    const libItems = shuffledEquip.slice(0, libTiles.length)
    libItems.forEach(function(item) {
      pushTile.call(item, takeTile(libTiles, blacklist(item)))
    })
    // Place planned drops.
    if (planned) {
      Object.getOwnPropertyNames(planned).forEach(function(key) {
        // Get enemies being targeted.
        let targets
        if (key === '*') {
          targets = enemies.concat([{librarian: true}])
        } else if (key === GLOBAL_DROP) {
          targets = [{id: GLOBAL_DROP}]
        } else if (key.toLowerCase() === 'librarian') {
          targets = [{librarian: true}]
        } else {
          targets = [util.enemyFromIdString(key)]
        }
        targets.forEach(function(target) {
          const matches = items.filter(util.itemTileFilter(function(tile) {
            if (target.librarian) {
              return tile.librarian
            }
            return target.id === tile.enemy
          }))
          // Get drop tiles for targeted enemies.
          let tiles
          if (matches.length > 0) {
            tiles = matches.reduce(function(tiles, item) {
              const enemyTiles = item.tiles.filter(function(tile) {
                if (target.librarian) {
                  return tile.librarian
                }
                return !tile.noOffset && target.id === tile.enemy
              })
              Array.prototype.push.apply(tiles, enemyTiles)
              return tiles
            }, []).sort(function(a, b) {
              if ('addresses' in a) {
                a = a.addresses[0]
              } else if ('index' in a) {
                const zone = zones[a.zones[0]]
                const offset = zone.items + 0x02 * a.index
                a = util.romOffset(zone, offset)
              }
              if ('addresses' in b) {
                b = b.addresses[0]
              } else if ('index' in b) {
                const zone = zones[b.zones[0]]
                const offset = zone.items + 0x02 * b.index
                b = util.romOffset(zone, offset)
              }
              return a - b
            })
          } else {
            // If the targeted enemy doesn't have drops, create tiles for them.
            tiles = target.dropAddresses.map(function(address) {
              return {
                addresses: [address],
                enemy: target.id,
              }
            })
          }
          // Remove collected tiles from the pool.
          tiles.forEach(function(tile) {
            pool.forEach(function(item) {
              if (item.tiles) {
                const index = item.tiles.indexOf(tile)
                if (index !== -1) {
                  item.tiles.splice(index, 1)
                }
              }
            })
          })
          // Replace tiles with items.
          let drops = planned[key]
          let count
          if (key === GLOBAL_DROP) {
            count = globalDropsCount
          } else if (target.librarian) {
            count = 3
          } else {
            count = target.dropAddresses.length
          }
          if (drops) {
            drops = drops.slice(0, count)
          } else {
            drops = Array(count).fill(null)
          }
          drops.forEach(function(itemName, index) {
            if (itemName) {
              const item = util.itemFromName(itemName)
              let target = pool.filter(function(drop) {
                return drop.id === item.id && drop.type === item.type
              })[0]
              if (!target) {
                target = Object.assign({}, util.itemFromName(item))
                delete target.tiles
                addon.push(target)
              }
              pushTile.call(target, tiles[index])
            } else {
              const item = {id: 0}
              addon.push(item)
              pushTile.call(item, tiles[index])
            }
          })
        })
      })
    }
    // The required Short Sword and Red Rust drops were ignored.
    // Push those tiles onto whatever item they ended up being replaced with.
    const pushReplacement = function(name) {
      const tiles = util.itemFromName(name).tiles
      const noOffsetTile = tiles.filter(function(tile) {
        return tile.noOffset
      })[0]
      const offsetTile = tiles.filter(function(tile) {
        return !tile.noOffset
      })[0]
      const replacement = (addon || []).concat(pool).filter(function(item) {
        return item.tiles && item.tiles.some(function(tile) {
          return tile.addresses
            && tile.addresses[0] === offsetTile.addresses[0]
        })
      })[0]
      pool.forEach(function(item) {
        if (item.tiles) {
          let index = -1
          item.tiles.forEach(function(tile, tileIndex) {
            if (tile.addresses
                && tile.addresses[0] === noOffsetTile.addresses[0]) {
              index = tileIndex
            }
          })
          if (index !== -1) {
            item.tiles.splice(index, 1)
          }
        }
      })
      if (replacement) {
        pushTile.call(replacement, noOffsetTile)
      }
    }
    pushReplacement('Short Sword')
    pushReplacement('Red Rust')
    // Remove duplicated items.
    dupped.forEach(function(dupped) {
      let count
      do {
        count = pool.filter(function(item) { return item === dupped }).length
        const index = pool.indexOf(dupped)
        if (index !== -1) {
          pool.splice(index, 1)
        }
      } while (--count > 1)
    })
  }

  // function darken(color) {
  //   const r = Math.floor(((color >>> 10) & 0x1f) * .75)
  //   const g = Math.floor(((color >>> 5) & 0x1f) * .75)
  //   const b = Math.floor((color & 0x1f) * .75)
  //   return 0x80000000 | (r << 10) | (g << 10) | b
  // }

  function randomColor(rng) {
    return 0x8000 | Math.floor(rng() * 0x10000)
  }

  function capeColor(
    data,
    liningAddress,
    outerAddress,
    opts,
  ) {
    let liningColor1
    let liningColor2
    let outerColor1
    let outerColor2
    if ('liningColor1' in opts) {
      liningColor1 = opts.liningColor1
    } else {
      liningColor1 = randomColor(opts.rng)
    }
    if ('liningColor2' in opts) {
      liningColor2 = opts.liningColor2
    } else {
      liningColor2 = randomColor(opts.rng)
    }
    if ('outerColor1' in opts) {
      outerColor1 = opts.outerColor1
    } else {
      outerColor1 = randomColor(opts.rng)
    }
    data.writeShort(liningAddress + 0x00, liningColor1)
    data.writeShort(liningAddress + 0x02, liningColor2)
    data.writeShort(outerAddress + 0x00, outerColor1)
    data.writeShort(outerAddress + 0x02, outerColor2)
  }

  function randomizeJosephsCloak(data, rng) {
    const colors = [
      Math.floor(rng() * 32),
      Math.floor(rng() * 32),
      Math.floor(rng() * 32),
      Math.floor(rng() * 32),
      Math.floor(rng() * 32),
      Math.floor(rng() * 32),
    ]
    // Write the jump to injected code.
    const romAddress = 0x158c98
    const ramAddress = 0x136c00
    data.writeWord(0x0fa97c, 0x0c000000 + (ramAddress >> 2))
    // Write the color setting instructions.
    let address = romAddress
    for (let i = 0; i < colors.length; i++) {
      address = data.writeWord(address, 0x3c020003)
      address = data.writeWord(address, 0x3442caa8 + 4 * i)
      address = data.writeWord(address, 0x24030000 + colors[i])
      address = data.writeWord(address, 0xa0430000)
    }
    // Write the jump from injected code.
    data.writeWord(address, 0x0803924f)
  }

  function randomizeCapeColors(data, rng) {
    // Cloth Cape.
    capeColor(data, 0x0afb84, 0x0afb88, {rng: rng})
    // Reverse Cloak & Inverted Cloak.
    {
      const lining1 = randomColor(rng)
      const lining2 = randomColor(rng)
      const outer1 = randomColor(rng)
      const outer2 = randomColor(rng)
      capeColor(data, 0x0afb7c, 0x0afb80, {
        liningColor1: lining1,
        liningColor2: lining2,
        outerColor1: outer1,
        outerColor2: outer2,
      })
      capeColor(data, 0x0afbb8, 0x0afbbc, {
        liningColor1: outer1,
        liningColor2: outer2,
        outerColor1: lining1,
        outerColor2: lining2,
      })
    }
    // Elven Cloak.
    capeColor(data, 0x0afb94, 0x0afb98, {rng: rng})
    // Crystal Cloak.
    capeColor(data, 0x0afba4, 0x0afba8, {
      rng: rng,
      outerColor1: 0x0000,
    })
    // Royal Cloak.
    capeColor(data, 0x0afb8c, 0x0afb90, {rng: rng})
    // Blood Cloak.
    capeColor(data, 0x0afb9c, 0x0afba0, {rng: rng})
    // Joseph's Cloak.
    randomizeJosephsCloak(data, rng)
    // Twilight Cloak.
    capeColor(data, 0x0afa44, 0x0afbac, {rng: rng})
  }

  function randomizeItems(rng, items, options) {
    const data = new util.checked()
    const info = util.newInfo()
    const addon = []
    let pool
    if (options.startingEquipment) {
      // Randomize starting equipment.
      let planned
      if (typeof(options.startingEquipment) === 'object') {
        planned = options.startingEquipment
      }
      randomizeStartingEquipment(data, rng, items, info, planned)
    }
    let retries = 0
    while (true) {
      try {
        // Get pool of randomizable items.
        pool = items.filter(function(item) {
          if (!util.nonProgressionFilter(item)) {
            return false
          }
          if (foodFilter(item)) {
            return true
          }
          if (options.itemLocations
              && (util.itemTileFilter(util.mapTileFilter)(item)
                  || util.itemTileFilter(util.shopTileFilter)(item)
                  || util.itemTileFilter(util.candleTileFilter)(item)
                  || util.itemTileFilter(util.tankTileFilter)(item))) {
            return true
          }
          if (options.enemyDrops
              && util.itemTileFilter(util.dropTileFilter)(item)
              && util.itemTileFilter(function(tile) {
                return tile.enemy !== GLOBAL_DROP
              })) {
            return true
          }
          if (options.startingEquipment
              && equipmentFilter(item)) {
            return true
          }
          if (options.prologueRewards
              && util.itemTileFilter(util.rewardTileFilter)(item)) {
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
          randomizeCandles(rng, items, pool)
          // Randomize tank items.
          if (!options.turkeyMode) {
            randomizeSubweaponTanks(rng, items, pool)
          }
          // Randomize shop items.
          randomizeShopItems(rng, items, pool)
          // Randomize map items.
          randomizeMapItems(rng, items, pool, options.itemLocations, addon)
        }
        if (options.enemyDrops) {
          // Randomize enemy drops.
          let planned
          if (typeof(options.enemyDrops) === 'object') {
            planned = options.enemyDrops
          }
          randomizeEnemyDrops(rng, items, pool, addon, planned)
        }
        if (options.prologueRewards) {
          // Randomize prologue rewards.
          let planned
          if (typeof(options.prologueRewards) === 'object') {
            planned = options.prologueRewards
          }
          randomizePrologueRewards(rng, items, pool, addon, planned)
        }
        // Turkey mode.
        if (options.turkeyMode) {
          turkeyMode(items, pool)
          randomizeCapeColors(data, rng)
        }
        // Write items to ROM.
        if (options.itemLocations
            || options.enemyDrops
            || options.prologueRewards) {
          const itemsToWrite = (addon.concat(pool)).filter(util.tilesFilter)
          itemsToWrite.forEach(writeTiles(data))
        }
      } catch (err) {
        if (err.name === 'AssertionError' && retries++ < MAX_RETRIES) {
          continue
        }
        throw err
      }
      break
    }
    return {
      data: data,
      info: info,
    }
  }

  function placePlannedItems(options) {
    const removed = []
    if (typeof(options.itemLocations) === 'object') {
      const planned = options.itemLocations
      Object.getOwnPropertyNames(planned).forEach(function(zone) {
        const zoneItems = planned[zone]
        Object.getOwnPropertyNames(zoneItems).forEach(function(itemName) {
          if (itemName === '*') {
            return
          }
          const item = util.itemFromName(itemName)
          if (util.nonProgressionFilter(item)) {
            return
          }
          if (removed.indexOf(item) === -1) {
            removed.push(item)
          }
          const itemZoneNames = []
          if (zone === '*') {
            Array.prototype.push.apply(itemZoneNames, zoneNames)
          } else {
            itemZoneNames.push(zone)
          }
          const itemZones = itemZoneNames.map(function(zoneName) {
            return constants.ZONE[zoneName]
          })
          // Collect tiles for the item.
          const tiles = collectTiles([item], function(tile) {
            return 'zones' in tile
              && itemZones.indexOf(tile.zones[0]) !== -1
              && !util.rewardTileFilter(tile)
              && !util.dropTileFilter(tile)
          }).reverse()
          // Replace tiles.
          const map = zoneItems[itemName]
          Object.getOwnPropertyNames(map).forEach(function(index) {
            index = parseInt(index)
            const tileIndex = item.tiles.indexOf(tiles[index])
            const target = Object.assign({}, util.itemFromName(map[index]), {
              tiles: item.tiles.splice(tileIndex, 1)
            })
          })
        })
      })
    }
    return removed
  }

  const exports = {
    randomizeItems: randomizeItems,
    placePlannedItems: placePlannedItems,
  }
  if (self) {
    self.sotnRando = Object.assign(self.sotnRando || {}, {
      randomizeItems: exports,
    })
  } else {
    module.exports = exports
  }
})(typeof(self) !== 'undefined' ? self : null)
