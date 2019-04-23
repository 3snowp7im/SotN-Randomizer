(function() {
  let isNode
  try {
    isNode = !!module
  } catch (e) {}

  let data

  if (isNode) {
    data = require('./data')
  } else {
    data = window.sotnRandoItems.data
  }

  const TYPE = data.TYPE
  const ZONE = data.ZONE
  const typeNames = data.typeNames
  const zoneNames = data.zoneNames
  const items = data.items

  // The base address of Alucard's equipped item list.
  const equipBaseAddress = 0x11a0d0

  // This is applied to item ids that are found in zone data.
  const tileIdOffset = 0x80

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

  const powerupFilter = typeFilter([TYPE.POWERUP])
  const weaponFilter = typeFilter([TYPE.WEAPON1, TYPE.WEAPON2])
  const shieldFilter = typeFilter([TYPE.SHIELD])
  const helmetFilter = typeFilter([TYPE.HELMET])
  const armorFilter = typeFilter([TYPE.ARMOR])
  const cloakFilter = typeFilter([TYPE.CLOAK])
  const accessoryFilter = typeFilter([TYPE.ACCESSORY])
  const subweaponFilter = typeFilter([TYPE.SUBWEAPON])

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

  function candleTileFilter(tile) {
    return typeof(tile.candle) !== 'undefined'
  }

  function zoneTileFilter(zone) {
    return function(tile) {
      return tile.zone === zone
    }
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

  function randItem(array) {
    return array[Math.floor(Math.random() * array.length)]
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

  function writeShort(data, address, value) {
    data[address + 0] = value & 0xff
    data[address + 1] = value >>> 8
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
    } else if (typeof(tile.candle) !== 'undefined' && item.id > tileIdOffset) {
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
          writeShort(data, address, value)
        })
      })
    }
  }

  function numToHex(num, width) {
    width = width || 0
    const zeros = Array(width).fill('0').join('')
    const hex = (zeros + num.toString(16)).slice(-width)
    return '0x' + hex
  }

  function bufToHex(buf) {
    return Array.from(buf).map(function(byte) {
      return ('00' + byte.toString(16)).slice(-2)
    }).join('')
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
    writeShort(data, equipBaseAddress +  0, weaponEquipVal)
    writeShort(data, equipBaseAddress + 12, shieldEquipVal)
    writeShort(data, equipBaseAddress + 24, helmetEquipVal)
    writeShort(data, equipBaseAddress + 36, armorEquipVal)
    writeShort(data, equipBaseAddress + 48, cloakEquipVal)
    writeShort(data, equipBaseAddress + 60, accessoryEquipVal)
    // Death removes these values if equipped.
    data[0x1195f8] = weaponEquipVal
    data[0x119658] = shieldEquipVal
    data[0x1196b8] = helmetEquipVal
    data[0x1196f4] = armorEquipVal
    data[0x119730] = cloakEquipVal
    data[0x119774] = accessoryEquipVal
    // Death decrements these inventory values if not equiped.
    writeShort(data, 0x119634, weaponInvOffset)
    writeShort(data, 0x119648, weaponInvOffset)
    writeShort(data, 0x119694, shieldInvOffset)
    writeShort(data, 0x1196a8, shieldInvOffset)
    writeShort(data, 0x1196d0, helmetInvOffset)
    writeShort(data, 0x1196e4, helmetInvOffset)
    writeShort(data, 0x11970c, armorInvOffset)
    writeShort(data, 0x119720, armorInvOffset)
    writeShort(data, 0x119750, cloakInvOffset)
    writeShort(data, 0x119764, cloakInvOffset)
    writeShort(data, 0x1197b0, accessoryInvOffset)
    writeShort(data, 0x1197c4, accessoryInvOffset)
    // Replace Axe Lord Armor with a random armor.
    data[0x11a230] = randItem(items.filter(armorFilter)).id + equipIdOffset
    // Replace Lapis Lazuli with a random accessory.
    data[0x11a198] = randItem(items.filter(accessoryFilter)).id + equipIdOffset
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

  function randomizeCandles(itemDescriptions) {
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
    const itemTypes = shuffled(itemDescriptions).reduce(typeReduce, [])
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
      item = itemFromId(item.id, typeFilter([item.type]), itemDescriptions)
      let count = candleTileCounts[index]
      while (count--) {
        pushTile.call(item, candleTiles.pop())
      }
    })
  }

  function randomizePrologueRewards(itemDescriptions) {
    const rewardTiles = collectTiles(items, function(tile) {
      return tile.reward
    })
    const usableItems = shuffled(itemDescriptions.filter(usableFilter))
    while (rewardTiles.length) {
      pushTile.call(usableItems.pop(), rewardTiles.pop())
    }
  }

  function randomizeSubweaponTanks(itemDescriptions) {
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
      const subweapons = shuffled(itemDescriptions.filter(subweaponFilter))
      while (tankZones[zone].length) {
        pushTile.call(subweapons.pop(), tankZones[zone].pop())
      }
    })
  }

  function turkeyMode(itemDescriptions) {
    itemDescriptions.push({
      name: 'Turkey',
      type: TYPE.SUBWEAPON,
      id: 13,
      tiles: collectTiles(items, function(tile) {
        return tile.tank
      }),
    })
  }

  function randomizeShopItems(itemDescriptions) {
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
    const shuffledTypes = shuffled(itemDescriptions.filter(function(item) {
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

  function randomizeMapItems(itemDescriptions) {
    // Shuffle items.
    const shuffledItems = shuffled(itemDescriptions)
    // Get all map tiles.
    const tileItems = items.map(function(item) {
      return Object.assign({}, item, {
        tiles: (item.tiles || []).filter(function(tile) {
          return !tile.shop && !tile.tank && !tile.reward
            && typeof(tile.candle) === 'undefined'
        })
      })
    })
    // Shuffle all map tiles.
    const shuffledTiles = shuffled(collectTiles(tileItems))
    // Place tiles with the same type frequency as vanilla.
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
    // Distribute jewels with same frequency as vanilla.
    const salableItems = items.filter(salableFilter)
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
        address = numToHex(address, 8)
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
      let actual = data[equipBaseAddress + i * 12]
      if (i > 1) {
        actual -= equipIdOffset
      }
      if (actual !== expected) {
        const item = itemFromId(actual, typeFilter([equipment[i].type]))
        mismatches.push(item.name)
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
              zone: zoneNames[tile.zone],
              address: numToHex(address, 8),
            }
            if (tile.byte) {
              found = (data[address] === value)
              m.expected = numToHex(value, 2)
              m.actual = numToHex(data[address], 2)
            } else {
              found = (data[address] === (value & 0xff))
                && (data[address + 1] === (value >>> 8))
              m.expected = numToHex(value, 4)
              const actual = (data[address] << 8) + data[address + 1]
              m.actual = numToHex(actual, 4)
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
      return !tile.reward
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

  function randomizeItems(data, options, info) {
    // Check for duped addresses.
    if (!checkItemAddresses(data)) {
      return false
    }
    let returnVal = true
    // Randomize starting equipment.
    if (options.startingEquipment) {
      // Run a sanity check.
      if (options.checkVanilla) {
        returnVal = checkStartingEquipment(data, options.verbose) && returnVal
      } else {
        // Randomize starting equipment.
        randomizeStartingEquipment(data, info)
      }
    }
    // Get item descriptions.
    const itemDescriptions = items.map(function(item) {
      item = Object.assign({}, item)
      delete item.tiles
      return item
    })
    // Randomize item locations.
    if (options.itemLocations) {
      // Run a sanity check.
      if (options.checkVanilla) {
        // Check for item locations.
        returnVal = checkItemLocations(data, options.verbose) && returnVal
      } else {
        // Randomize candles.
        randomizeCandles(itemDescriptions)
        // Randomize tank items.
        if (!options.turkeyMode) {
          randomizeSubweaponTanks(itemDescriptions)
        }
        // Randomize shop items.
        randomizeShopItems(itemDescriptions)
        // Randomize map items.
        randomizeMapItems(itemDescriptions)
      }
    }
    // Randomize prologue rewards.
    if (options.prologueRewards) {
      // Run a sanity check.
      if (options.checkVanilla) {
        // Check for item locations.
        returnVal = checkPrologueRewards(data, options.verbose) && returnVal
      } else {
        // Randomize reward items.
        randomizePrologueRewards(itemDescriptions)
      }
    }
    // Turkey mode.
    if (options.turkeyMode) {
      turkeyMode(itemDescriptions)
    }
    // Write items to ROM.
    if (!options.checkVanilla) {
      itemDescriptions.filter(tilesFilter).forEach(writeTiles(data))
    }
    return returnVal
  }
  if (isNode) {
    module.exports = randomizeItems
  } else {
    window.sotnRandoItems = Object.assign(window.sotnRandoItems || {}, {
      randomizeItems: randomizeItems,
    })
  }
})()
