(function(self) {

  let constants
  let items
  let util

  if (self) {
    constants = self.sotnRando.constants
    items = self.sotnRando.items
    util = self.sotnRando.util
  } else {
    constants = require('./constants')
    items = require('./items')
    util = require('./util')
  }

  const TYPE = constants.TYPE
  const typeNames = constants.typeNames
  const ZONE = constants.ZONE
  const zoneNames = constants.zoneNames
  const tileIdOffset = constants.tileIdOffset

  const shuffled = util.shuffled

  // The base address of Alucard's equipped item list.
  const equipBaseAddress = 0x11a0d0

  // This is applied to helmet, armor, cloak, and other ids that are sold in
  // the librarian's shop menu or are in an equipment slot.
  const equipIdOffset = -0xa9

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

  function tilesFilter(item) {
    return Array.isArray(item.tiles)
  }

  function itemTileFilter(tileFilter) {
    return function(item) {
      return item.tiles && item.tiles.some(tileFilter)
    }
  }

  function mapTileFilter(tile) {
    return !tile.shop && !tile.tank && !tile.reward
      && !candleTileFilter(tile) && !dropTileFilter(tile)
      && !tile.librarian
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
    const tiles = Array.prototype.slice.call(arguments, 0)
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

  function tileValue(item, tile) {
    if (tile.byte) {
      return item.id
    }
    let id = ((tile.candle || 0x00) << 8) | item.id
    if (tile && tile.shop) {
      // Apply offset for some item types in the shop menu.
      switch (item.type) {
      case TYPE.HELMET:
      case TYPE.ARMOR:
      case TYPE.CLOAK:
      case TYPE.ACCESSORY:
        id += equipIdOffset
        break
      }
    } else if (candleTileFilter(tile) && item.id > tileIdOffset) {
      id += tileIdOffset
    } else {
      // Apply tile offset for some tile items.
      switch (item.type) {
      case TYPE.POWERUP:
      case TYPE.HEART:
      case TYPE.GOLD:
      case TYPE.SUBWEAPON:
        break
      default:
        id += tileIdOffset
        break
      }
    }
    return id
  }

  function writeTiles(data) {
    return function(item) {
      item.tiles.forEach(function(tile) {
        const value = tileValue(item, tile)
        tile.addresses.forEach(function(address) {
          data.writeShort(address, value)
        })
      })
    }
  }

  function randomizeStartingEquipment(data, info) {
    // Select random starting equipment.
    const weapon = randItem(items.filter(typeFilter([TYPE.WEAPON1])))
    const shield = randItem(items.filter(shieldFilter))
    const helmet = randItem(items.filter(helmetFilter))
    const armor = randItem(items.filter(armorFilter))
    const cloak = randItem(items.filter(cloakFilter))
    const accessory = randItem(items.filter(accessoryFilter))
    // Their values when equipped.
    const weaponEquipVal = weapon.id
    const shieldEquipVal = shield.id
    const helmetEquipVal = helmet.id + equipIdOffset
    const armorEquipVal = armor.id + equipIdOffset
    const cloakEquipVal = cloak.id + equipIdOffset
    const accessoryEquipVal = accessory.id + equipIdOffset
    // Their inventory locations.
    const weaponInvOffset = weapon.id + equipmentInvIdOffset
    const shieldInvOffset = shield.id + equipmentInvIdOffset
    const helmetInvOffset = helmet.id + equipmentInvIdOffset
    const armorInvOffset = armor.id + equipmentInvIdOffset
    const cloakInvOffset = cloak.id + equipmentInvIdOffset
    const accessoryInvOffset = accessory.id + equipmentInvIdOffset
    // Equip the items.
    data.writeShort(equipBaseAddress +  0, weaponEquipVal)
    data.writeShort(equipBaseAddress + 12, shieldEquipVal)
    data.writeShort(equipBaseAddress + 24, helmetEquipVal)
    data.writeShort(equipBaseAddress + 36, armorEquipVal)
    data.writeShort(equipBaseAddress + 48, cloakEquipVal)
    data.writeShort(equipBaseAddress + 60, accessoryEquipVal)
    // Death removes these values if equipped.
    data.writeByte(0x1195f8, weaponEquipVal)
    data.writeByte(0x119658, shieldEquipVal)
    data.writeByte(0x1196b8, helmetEquipVal)
    data.writeByte(0x1196f4, armorEquipVal)
    data.writeByte(0x119730, cloakEquipVal)
    data.writeByte(0x119774, accessoryEquipVal)
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
    data.writeShort(0x1197b0, accessoryInvOffset)
    data.writeShort(0x1197c4, accessoryInvOffset)
    // Replace Axe Lord Armor with a random armor.
    const axeLordArmor = randItem(items.filter(armorFilter)).id
    data.writeByte(0x11a230, axeLordArmor + equipIdOffset)
    // Replace Lapis Lazuli with a random accessory.
    const luckModeAccessory = randItem(items.filter(accessoryFilter)).id
    data.writeByte(0x11a198, luckModeAccessory + equipIdOffset)
    // Update info.
    info[2]['Starting equipment'] = [
      weapon.name,
      shield.name,
      helmet.name,
      armor.name,
      cloak.name,
      accessory.name,
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
    const specials = {}
    const specialIds = []
    Object.getOwnPropertyNames(zones).forEach(function(name) {
      specials[name] = items.filter(function(item) {
        return !typeFilter([TYPE.HEART, TYPE.GOLD, TYPE.SUBWEAPON])(item)
          && item.tiles && item.tiles.some(function(tile) {
            return candleTileFilter(tile)
              && zones[name].indexOf(tile.zone) !== -1
          })
      })
      const ids = specials[name].map(function(item) {
        return item.id
      })
      Array.prototype.push.apply(specialIds, ids)
    })
    // Randomize these special cases by replacing them with the same item type.
    const itemTypes = shuffled(pool).reduce(typeReduce, [])
    Object.getOwnPropertyNames(zones).forEach(function(name) {
      specials[name].forEach(function(item) {
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
      return specialIds.indexOf(item.id) === -1
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

  function randomizePrologueRewards(pool) {
    const rewardTiles = collectTiles(items, function(tile) {
      return tile.reward
    })
    const usableItems = shuffled(pool.filter(usableFilter))
    while (rewardTiles.length) {
      pushTile.call(usableItems.pop(), rewardTiles.pop())
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

  function randomizeMapItems(pool) {
    // Shuffle items.
    const shuffledItems = shuffled(pool)
    // Get all map tiles.
    const mapItems = items.filter(itemTileFilter(mapTileFilter))
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
  }

  function randomizeEnemyDrops(pool) {
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
    const types = pool.reduce(typeReduce, [])
    types[TYPE.ACCESSORY] = types[TYPE.ACCESSORY].filter(nonsalableFilter)
    Object.getOwnPropertyNames(dupTypes).forEach(function(type) {
      type = parseInt(type)
      const items = shuffled(types[type])
      for (let i = 0; i < dupTypes[type].length; i++) {
        for (let j = 0; j < dupTypes[type][i]; j++) {
          pool.push(Object.assign({}, items[i]))
        }
      }
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
    // The required Short Sword and Red Rust drops were ignored.
    // Push those tiles onto whatever item they ended up being replaced with.
    const pushReplacement = function(name) {
      const tiles = itemFromName(name).tiles
      const shortTile = tiles.filter(function(tile) {
        return !tile.byte
      })[0]
      const byteTile = tiles.filter(function(tile) {
        return tile.byte
      })[0]
      const replacement = pool.filter(function(item) {
        return item.tiles && item.tiles.indexOf(shortTile) !== -1
      })[0]
      replacement.tiles.push(byteTile)
    }
    pushReplacement('Short Sword')
    pushReplacement('Red Rust')
    // Replace the librarian's drops.
    const libTiles = collectTiles(items, function(tile) {
      return tile.librarian
    })
    const shuffledEquip = shuffled(pool.filter(equipmentFilter))
    const libItems = shuffledEquip.slice(0, libTiles.length)
    libItems.forEach(function(item) {
      pushTile.call(item, takeTile(libTiles, blacklist(item)))
    })
  }

  function checkItemAddresses(data) {
    const addresses = {}
    const tiles = flattened(items.map(function(item) {
      return (item.tiles || []).map(function(tile) {
        return {
          name: item.name,
          tile: Object.assign({}, tile, {
            zone: zoneNames[tile.zone],
            addresses: tile.addresses,
          }),
        }
      })
    }))
    tiles.forEach(function(item) {
      item.tile.addresses.forEach(function(address) {
        address = util.numToHex(address, 8)
        addresses[address] = addresses[address] || []
        const dup = Object.assign({}, item, {
          tile: Object.assign({}, item.tile),
        })
        const tile = dup.tile
        delete tile.addresses
        addresses[address].push(dup)
      })
    })
    const dups = []
    Object.getOwnPropertyNames(addresses).forEach(function(address) {
      if (addresses[address].length > 1) {
        dups.push({
          address: address,
          items: addresses[address],
        })
      }
    })
    if (dups.length) {
      const console = require('console')
      stderr = new console.Console(process.stderr, process.stderr)
      stderr.error('duped addresses:')
      dups.forEach(function(dup) {
        stderr.dir(dup, {depth: null})
      })
      return false
    }
    return true
  }

  function checkStartingEquipment(data, verbose) {
    const equipment = [
      itemFromName('Alucard Sword'),
      itemFromName('Alucard Shield'),
      itemFromName('Dragon Helm'),
      itemFromName('Alucard Mail'),
      itemFromName('Twilight Cloak'),
      itemFromName('Necklace of J'),
    ]
    const mismatches = []
    for (let i = 0; i < 6; i++) {
      let expected = equipment[i].id
      let actual = data.readByte(equipBaseAddress + i * 12)
      if (i > 1) {
        actual -= equipIdOffset
      }
      if (actual !== expected) {
        const item = itemFromId(actual, typeFilter([equipment[i].type]))
        if (item) {
          mismatches.push(item.name)
        } else {
          mismatches.push('Unknown')
        }
      }
    }
    if (mismatches.length) {
      if (verbose) {
        console.error('starting equipment mismatches:')
        mismatches.forEach(function(item) {
          console.error(item)
        })
        console.error('starting equipment is NOT vanilla:')
      }
      return false
    } else if (verbose) {
      console.log('starting equipment is vanilla')
    }
    return true
  }

  function checkAddresses(data, tileFilter) {
    if (!tileFilter) {
      tileFilter = function() {
        return true
      }
    }
    return function(mismatches, item) {
      if (item.tiles) {
        item.tiles.filter(tileFilter).forEach(function(tile) {
          tile.addresses.forEach(function(address) {
            let found
            const value = tileValue(item, tile)
            const m = {
              name: item.name,
            }
            if (typeof(tile.zone) !== 'undefined') {
              m.zone = zoneNames[tile.zone]
            }
            m.address = util.numToHex(address, 8)
            if (tile.byte) {
              const actual = data.readByte(address)
              found = (actual === value)
              m.expected = util.numToHex(value, 2)
              m.actual = util.numToHex(actual, 2)
            } else {
              const actual = data.readShort(address)
              found = (actual === value)
              m.expected = util.numToHex(value, 4)
              m.actual = util.numToHex(actual, 4)
            }
            if (!found) {
              mismatches.push(m)
            }
          })
        })
      }
      return mismatches
    }
  }

  function checkItemLocations(data, verbose) {
    const mismatches = items.reduce(checkAddresses(data, function(tile) {
      return !tile.reward && !tile.librarian
    }), [])
    if (mismatches.length) {
      if (verbose) {
        console.error('item location mismatches:')
        mismatches.forEach(function(item) {
          console.error(item)
        })
        console.error('item locations are NOT vanilla')
      }
      return false
    } else if (verbose) {
      console.log('item locations are vanilla')
    }
    return true
  }

  function checkPrologueRewards(data, verbose) {
    const mismatches = items.reduce(checkAddresses(data, function(tile) {
      return tile.reward
    }), [])
    if (mismatches.length) {
      if (verbose) {
        console.error('prologue reward mismatches:')
        mismatches.forEach(function(item) {
          console.error(item)
        })
        console.error('prologue rewards are NOT vanilla')
      }
      return false
    } else if (verbose) {
      console.log('prologue rewards are vanilla')
    }
    return true
  }

  function checkEnemyDrops(data, verbose) {
    const mismatches = items.reduce(checkAddresses(data, function(tile) {
      return typeof(tile.enemy) !== 'undefined' || tile.librarian
    }), [])
    if (mismatches.length) {
      if (verbose) {
        console.error('enemy drop mismatches:')
        mismatches.forEach(function(item) {
          console.error(item)
        })
        console.error('enemy drops are NOT vanilla')
      }
      return false
    } else if (verbose) {
      console.log('enemy drops are vanilla')
    }
    return true
  }

  function randomizeItems(data, options, info) {
    // Check for duped addresses.
    if (!checkItemAddresses(data)) {
      return false
    }
    let returnVal = true
    if (options.startingEquipment) {
      if (options.checkVanilla) {
        // Check for vanilla starting equipment.
        returnVal = checkStartingEquipment(data, options.verbose) && returnVal
      } else {
        // Randomize starting equipment.
        randomizeStartingEquipment(data, info)
      }
    }
    // Get pool of randomizable items.
    const pool = items.filter(function(item) {
      if (foodFilter(item)) {
        return true
      }
      if (options.enemyDrops) {
        if (itemTileFilter(dropTileFilter)(item)) {
          return true
        }
      }
      if (options.itemLocations) {
        if (itemTileFilter(mapTileFilter)(item)
            || itemTileFilter(shopTileFilter)(item)
            || itemTileFilter(librarianDropTileFilter)(item)
            || heartFilter(item)
            || goldFilter(item)
            || subweaponFilter(item)) {
          return true
        }
      }
      if (options.prologueRewards) {
        if (itemTileFilter(rewardTileFilter)(item)) {
          return true
        }
      } 
    }).map(function(item) {
      item = Object.assign({}, item)
      delete item.tiles
      return item
    })
    // Randomizations.
    if (options.itemLocations) {
      if (options.checkVanilla) {
        // Check for item locations.
        returnVal = checkItemLocations(data, options.verbose) && returnVal
      } else {
        // Randomize candles.
        randomizeCandles(pool)
        // Randomize tank items.
        if (!options.turkeyMode) {
          randomizeSubweaponTanks(pool)
        }
        // Randomize shop items.
        randomizeShopItems(pool)
        // Randomize map items.
        randomizeMapItems(pool)
      }
    }
    if (options.enemyDrops) {
      if (options.checkVanilla) {
        // Check for vanilla enemy drops.
        returnVal = checkEnemyDrops(data, options.verbose) && returnVal
      } else {
        // Randomize enemy drops.
        randomizeEnemyDrops(pool)
      }
    }
    if (options.prologueRewards) {
      if (options.checkVanilla) {
        // Check for vanilla rewards.
        returnVal = checkPrologueRewards(data, options.verbose) && returnVal
      } else {
        // Randomize prologue rewards.
        randomizePrologueRewards(pool)
      }
    }
    // Turkey mode.
    if (options.turkeyMode) {
      turkeyMode(pool)
    }
    // Write items to ROM.
    if (!options.checkVanilla) {
      pool.filter(tilesFilter).forEach(writeTiles(data))
    }
    return returnVal
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
