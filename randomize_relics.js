(function(self) {

  let constants
  let errors
  let extension
  let presets
  let relics
  let util
  let cores
  if (self) {
    constants = self.sotnRando.constants
    errors = self.sotnRando.errors
    extension = self.sotnRando.extension
    presets = self.sotnRando.presets
    relics = self.sotnRando.relics
    util = self.sotnRando.util
  } else {
    constants = require('./constants')
    errors = require('./errors')
    extension = require('./extension')
    presets = require('./presets')
    relics = require('./relics')
    util = require('./util')
  }

  function items() {
    if (self) {
      return self.sotnRando.items
    }
    return require('./items')
  }

  const MAX_ROUNDS = Math.pow(2, 20)

  function getRandomZoneItem(rng, zones, pool) {
    // Collect ids of items that can be replaced for location extension.
    const extensionIds = pool.filter(function(location) {
      return 'extension' in location
    }).map(function(location) {
      return location.itemId
    })
    // Collect item tiles in the zones.
    const zoneTiles = zones.reduce(function(all, zone) {
      const tiles = items().reduce(function(all, item) {
        if (util.nonProgressionFilter(item)
            && extensionIds.indexOf(item.id) === -1) {
          const tiles = (item.tiles || []).filter(function(tile) {
            return util.mapTileFilter(tile)
              && tile.zones.indexOf(zone) !== -1
              && 'index' in tile // Should always be the case
          })
          Array.prototype.push.apply(all, tiles.map(function(tile) {
            return {
              item: item,
              tile: tile,
            }
          }))
        }
        return all
      }, [])
      Array.prototype.push.apply(all, tiles)
      return all
    }, [])
    // Pick a random item to replace.
    return zoneTiles[randIdx(rng, zoneTiles)]
  }

  function writeEntity(data, entity, opts) {
    entity.entities.forEach(function(addr, index) {
      const zone = constants.zones[entity.zones[index >>> 1]]
      if ('x' in opts) {
        data.writeShort(util.romOffset(zone, addr + 0x00), opts.x)
      }
      if ('y' in opts) {
        data.writeShort(util.romOffset(zone, addr + 0x02), opts.y)
      }
      if ('id' in opts) {
        data.writeShort(util.romOffset(zone, addr + 0x04), opts.id)
      }
      if ('state' in opts) {
        data.writeShort(util.romOffset(zone, addr + 0x08), opts.state)
      }
    })
  }

  function writeTileId(data, zones, index, itemId) {
    zones.forEach(function(zone) {
      zone = constants.zones[zone]
      const addr = util.romOffset(zone, zone.items + 0x02 * index)
      data.writeShort(addr, itemId + constants.tileIdOffset)
    })
  }

  function writeIds(data, ids, itemId) {
    ids.forEach(function(id) {
      let value = itemId
      if (itemId && id.tileId) {
        value += constants.tileIdOffset
      }
      id.addresses.forEach(function(address) {
        data.writeShort(address, value)
      })
    })
  }

  function writeInstructions(data, instructions) {
    instructions.forEach(function(instruction) {
      instruction.addresses.forEach(function(address) {
        data.writeWord(address, instruction.instruction)
      })
    })
  }

  function writeMapping(data, rng, mapping) {
    // Erase any vanilla location that did not receive a relic.
    const placed = Object.getOwnPropertyNames(mapping).map(function(key) {
      return mapping[key].ability
    })
    const zoneRemovedItems = {}
    const abilities = relics.map(function(relic) {
      return relic.ability
    })
    const locations = getLocations()
    locations.filter(function(location) {
      return abilities.indexOf(location.ability) !== -1
    }).forEach(function(location) {
      if (placed.indexOf(location.ability) === -1) {
        // Erase entities.
        if ('entity' in location
            && (!('erase' in location.entity) || location.entity.erase)) {
          writeEntity(data, location.entity, {id: 0x000f})
        }
        // Erase tile.
        if ('tile' in location) {
          writeEntity(data, location.tile, Object.assign({id: 0x000f}))
        }
        // Erase instructions.
        if ('erase' in location) {
          // Write erase instructions.
          if ('instructions' in location.erase) {
            writeInstructions(data, location.erase.instructions)
          }
        }
      }
    })
    // Write new relic locations.
    Object.getOwnPropertyNames(mapping).forEach(function(key) {
      // Get the relic being placed.
      const relic = util.relicFromAbility(key)
      // The item data if this relic is actually a progression item.
      let item
      if ('itemId' in relic) {
        const tileId = relic.itemId + constants.tileIdOffset
        item = util.itemFromTileId(items(), tileId)
      }
      // Get the location to place the relic in.
      const location = locations.filter(function(location) {
        return location.id === mapping[key].id
      })[0]
      if ('itemId' in location) {
        if (item) {
          // Replacing item location with item.
          if ('replaceWithItem' in location) {
            location.replaceWithItem(data, location, item)
          } else {
            if ('tile' in location) {
              const tile = location.tile
              writeTileId(data, tile.zones, tile.index, relic.itemId)
              const tileIndex = location.item.tiles.indexOf(tile)
              if (tileIndex !== -1) {
                location.item.tiles.splice(tileIndex, 1)
              }
            }
            if ('ids' in location) {
              writeIds(data, location.ids, item.id)
            }
          }
        } else {
          // Replacing item location with relic.
          if ('replaceWithRelic' in location) {
            location.replaceWithRelic(data, location, relic)
          } else {
            // Get item entity.
            const asRelic = location.asRelic || {}
            writeEntity(data, location.tile, Object.assign({
              id: 0x000b,
              state: relic.relicId,
            }, asRelic))
          }
          // Remove replaced item's tile from randomization pool.
          if ('tileIndex' in location) {
            const tile = location.tile
            const tileIndex = location.item.tiles.indexOf(tile)
            if (tileIndex !== -1) {
              location.item.tiles.splice(tileIndex, 1)
            }
          }
        }
      } else if (item) {
        // Replacing relic location with item.
        let index
        if (!('consumesItem' in location) || location.consumesItem) {
          // There are a limited number of item tiles. Replacing a relic
          // with an item can only consume an existing item in its zone.
          let zones
          if ('entity' in location) {
            zones = location.entity.zones
          } else if ('ids' in location) {
            zones = location.ids.map(function(id) {
              return id.zone
            })
          }
          const tileItem = getRandomZoneItem(rng, zones, locations)
          index = tileItem.tile.index
          // Remove the tile from the replaced item's tile collection.
          const tileIndex = tileItem.item.tiles.indexOf(tileItem.tile)
          if (tileIndex !== -1) {
            tileItem.item.tiles.splice(tileIndex, 1)
          }
          // Erase the replaced item's entity.
          writeEntity(data, tileItem.tile, Object.assign({id: 0x000f}))
          // Write id in item table.
          writeTileId(data, zones, index, item.id)
          tileItem.tile.zones.forEach(function(zone) {
            zoneRemovedItems[zone] = zoneRemovedItems[zone] || 0
            zoneRemovedItems[zone]++
          })
        }
        if ('replaceWithItem' in location) {
          location.replaceWithItem(data, location, item, index)
        } else {
          if ('entity' in location) {
            writeTileId(data, location.entity.zones, index, item.id)
            const asItem = location.asItem || {}
            writeEntity(data, location.entity, Object.assign({
              id: 0x000c,
              state: index,
            }, asItem))
          }
        }
      } else {
        // Replacing relic location with relic.
        if ('replaceWithRelic' in location) {
          location.replaceWithRelic(data, location, relic)
        } else {
          if ('entity' in location
              && (!('replaceWithRelic' in location.entity)
                  || location.entity.replaceWithRelic)) {
            writeEntity(data, location.entity, {state: relic.relicId})
          }
          if ('reward' in location) {
            const zone = constants.zones[location.reward.zone]
            const index = location.reward.index
            const addr = util.romOffset(zone, zone.rewards + 0x02 * index)
            data.writeShort(addr, relic.relicId)
          }
          if ('ids' in location) {
            writeIds(data, location.ids, relic.relicId)
          }
        }
      }
    })
    // If a zone has an item removed, it leaks information that a progression
    // item has been randomized to relic location in that zone. To prevent this
    // leak, remove at most 3 items from every zone.
    constants.zones.filter(function(zone) {
      return [
        constants.ZONE.ST0,
        constants.ZONE.NP3,
        constants.ZONE.BO3,
      ].indexOf(zone.id) === -1
    }).forEach(function(zone) {
      const zones = [zone.id]
      switch (zones[0]) {
      case constants.ZONE.NO3:
        zones.push(constants.ZONE.NP3)
        break
      case constants.ZONE.NO4:
        zones.push(constants.ZONE.BO3)
        break
      }
      if ('items' in zone) {
        const rand = Math.floor(rng() * 4)
        const removed = zoneRemovedItems[zone.id] || 0
        for (let i = 0; i < rand - removed; i++) {
          const tileItem = getRandomZoneItem(rng, zones, locations)
          const index = tileItem.tile.index
          // Remove the tile from the item's tile collection.
          const tileIndex = tileItem.item.tiles.indexOf(tileItem.tile)
          util.assert(tileIndex !== -1)
          tileItem.item.tiles.splice(tileIndex, 1)
          // Erase the item's entity.
          writeEntity(data, tileItem.tile, Object.assign({id: 0x000f}))
        }
      }
    })
  }

  function randIdx(rng, array) {
    return Math.floor(rng() * array.length)
  }

  function pushAvailableLocation(ctx, locationsAvailable, locationIdx) {
    if (!ctx.locations[locationIdx]) {
      locationsAvailable.push(locationIdx)
    }
  }

  /** Helper function to see if a set is strictly a subset of another. */
  function isSubset(firstSet, secondSet) {
    return Array.from(firstSet).reduce(function(allPresent, element) {
      return allPresent && secondSet.has(element)
    }, true)
  }

  /**
   * Helper function to take a list of locks and replace all instances
   * of a single ability with new locks
   *
   * @param {Array} locks - A list of locks to update
   * @param {String} abilityToReplace - The ability to replace requirements of
   * @param {Array} locksToAdd - A list of lock sets to replace the original
   *   ability requirement with
   */
  function replaceLocks(locks, abilityToReplace, locksToAdd) {
    const newLocks = []
    locks.forEach(function(lock) {
      if (!lock.has(abilityToReplace)) {
        // Any locks that didn't require the relic can stay the same
        newLocks.push(lock)
      } else {
        // Otherwise, remove the old relic as a requirement and instead
        // add all the locks to that relic
        locksToAdd.forEach(function(transferLock) {
          let newLock = new Set(lock)
          newLock.delete(abilityToReplace)
          transferLock.forEach(function(requirement) {
            newLock.add(requirement)
          })
          newLocks.push(newLock)
        })
      }
    })
    return newLocks
  }

  function pickRelicLocations(rng, pool, mapping) {
    if (!pool.relics.length) {
      return mapping
    }
    mapping = mapping || {}
    for (let i = 0; i < pool.relics.length; i++) {
      const remainingRelics = pool.relics.slice()
      const relic = remainingRelics.splice(i, 1)[0]
      // Find a location not locked by the current relic.
      const locationsAvailable = pool.locations.filter(function(location) {
        return location.locks.some(function(lock) {
          return !lock.has(relic.ability)
        })
      })
      if (locationsAvailable.length) {
        const location = locationsAvailable[randIdx(rng, locationsAvailable)]
        // After placing the relic in this location, anything previously
        // locked by the relic is now locked by the requirements of the new
        // location.
        const newLocations = pool.locations.filter(function(newLocation) {
          return newLocation !== location
        }).map(function(newLocation) {
          newLocation = Object.assign({}, newLocation)
          const newLocks = replaceLocks(
            newLocation.locks,
            relic.ability,
            location.locks,
          ).filter(function(lock) {
            return !lock.has(relic.ability)
          })
          // Filter out locks that are supersets of other locks.
          newLocks.sort(function(a, b) { return a.size - b.size })
          for (let i = 0; i < newLocks.length - 1; i++) {
            const lock = newLocks[i]
            let j = i + 1
            while (j < newLocks.length) {
              // If lock i is a subset of lock j, remove j from the list.
              if (isSubset(lock, newLocks[j])) {
                newLocks.splice(j, 1)
              } else {
                j++
              }
            }
          }
          newLocation.locks = newLocks
          return newLocation
        })
        // Add selection to mapping.
        const newMapping = Object.assign({}, mapping)
        newMapping[relic.ability] = location
        // Pick from remaining pool.
        return pickRelicLocations(rng, {
          locations: newLocations,
          relics: remainingRelics,
        }, newMapping)
      }
    }
    return {
      error: new errors.SoftlockError(),
      relics: pool.relics,
    }
  }

  function patchAlchemyLabCutscene(data) {
    // Entering the room between jewel door and red door in alchemy lab
    // triggers a cutscene with Maria. The game will softlock if the player
    // enters alchemy lab through the red door in chapel before fighting
    // hippogryph. This can only happen if the player has access to olrox
    // quarters without soul of bat, which isn't possible in the vanilla
    // game without a speedrun trick. In a randomized relic run, however,
    // it is possible to have early movement options that trigger this
    // softlock for unwitting players. To be safe, disable the cutscene
    // from ever taking place.
    // The flag that gets set after the maria cutscene is @ 0x03be71.
    // The instruction that checks that flag is:
    // 0x54f0f44:    bne r2, r0, 0x1b8a58    144002da
    // Change the instruction so it always branches:
    // 0x54f0f44:    beq r0, r0, 0x1b8a58    100002da
    data.writeShort(0x054f0f44 + 2, 0x1000)
  }

  function patchClockRoomCutscene(data) {
    // Entering the clock room for the first time triggers a cutscene with
    // Maria. The cutscene takes place in a separately loaded room that
    // does not connect to the rest of the castle through the statue doors
    // or the vertical climb to gravity boots. If the player has early
    // movement options, they may attempt to leave the room through one of
    // these top exits but find themselves blocked, with the only option
    // being to reload the room through the left or right exit first. To
    // make it more convenient and less confusing, disable the cutscene
    // from ever taking place.
    // The specific room has a time attack entry that needs to be zeroed
    // out.
    data.writeChar(0x0aeaa0, 0x00)
    // The time attack check occurs in Richter mode too, but the game gets
    // around this by writing the seconds elapsed between pressing Start on
    // the main screen and on the name entry screen to the time attack
    // table for events that aren't in Richter mode.
    // Zero out the time attack entry for the clock room, or Richter will
    // load the cutscene version every time he enters.
    data.writeChar(0x119af4, 0x00)
  }

  function patchRelicsMenu(data) {
    // If relic locations are extended, the relic pool is padded out with the
    // familiars disabled in the NTSC-U release. To make them usable, they will
    // override their remaining counterparts in the menu if they have been
    // collected.
    // First, the menu code must be patched to reveal the state of the new
    // familiars.
    const romAddress = 0x158d18
    const ramAddress = 0x136c80
    const size = 4 * 0x20
    let offset
    // Patch menu code that draws the relic label.
    data.writeWord(0x10e5b0, 0x08000000 + ((ramAddress + 0 * size) >> 2))
    offset = romAddress + 0 * size
    offset = data.writeWord(offset, 0x24090014) // addiu t1, r0, 0x0014
    offset = data.writeWord(offset, 0x12290004) // beq s1, t1, pc + 0x14
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x24090015) // addiu t1, r0, 0x0015
    offset = data.writeWord(offset, 0x16290015) // bne s1, t1, pc + 0x58
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x92830003) // lbu v1, 0x0003 (s4)
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x30690001) // andi t1, v1, 0x0001
    offset = data.writeWord(offset, 0x29290001) // slti t1, t1, 0x0001
    offset = data.writeWord(offset, 0x1520000f) // bne t1, r0, pc + 0x40
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x28690003) // slti t1, v1, 0x0003
    offset = data.writeWord(offset, 0x15200003) // bne t1, r0, pc + 0x10
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x0803d7e0) // j 0x800f5f80
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x92830000) // lbu v1, 0x0000 (s4)
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x30690001) // andi t1, v1, 0x0001
    offset = data.writeWord(offset, 0x29290001) // slti t1, t1, 0x0001
    offset = data.writeWord(offset, 0x11200002) // beq t1, r0, pc + 0x0c
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x24030001) // addiu v1, r0, 0x0001
    offset = data.writeWord(offset, 0x0803d7e0) // j 0x800f5f80
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x92830000) // lbu v1, 0x0000 (s4)
    offset = data.writeWord(offset, 0x0803d7e0) // j 0x800f5f80
    offset = data.writeWord(offset, 0x00000000) // nop
    // Patch the menu code that toggles the on/off state of the familiar.
    data.writeWord(0x10e7d8, 0x08000000 + ((ramAddress + 1 * size) >> 2))
    offset = romAddress + 1 * size
    offset = data.writeWord(offset, 0x24090014) // addiu t1, r0, 0x0014
    offset = data.writeWord(offset, 0x12290004) // beq s1, t1, pc + 0x14
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x24090015) // addiu t1, r0, 0x0015
    offset = data.writeWord(offset, 0x16290015) // bne s1, t1, pc + 0x58
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x92820003) // lbu v0, 0x0003 (s4)
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x30490001) // andi t1, v0, 0x0001
    offset = data.writeWord(offset, 0x29290001) // slti t1, t1, 0x0001
    offset = data.writeWord(offset, 0x1520000f) // bne t1, r0, pc + 0x40
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x2c490003) // slti t1, v0, 0x0003
    offset = data.writeWord(offset, 0x15200003) // bne t1, r0, pc + 0x10
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x0803d81e) // j 0x800f6078
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x92820000) // lbu v0, 0x0000 (s4)
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x30490001) // andi t1, v0, 0x0001
    offset = data.writeWord(offset, 0x29290001) // slti t1, t1, 0x0001
    offset = data.writeWord(offset, 0x11200002) // beq t1, r0, pc + 0x0c
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x24020001) // addiu v0, r0, 0x0001
    offset = data.writeWord(offset, 0x0803d81e) // j 0x800f6078
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x92820000) // lbu v0, 0x0000 (s4)
    offset = data.writeWord(offset, 0x0803d81e) // j 0x800f6078
    offset = data.writeWord(offset, 0x00000000) // nop
    // Patch the menu code that draws the relic icon.
    data.writeWord(0x11625c, 0x08000000 + ((ramAddress + 2 * size) >> 2))
    offset = romAddress + 2 * size
    offset = data.writeWord(offset, 0x24090014) // addiu t1, r0, 0x0014
    offset = data.writeWord(offset, 0x12290004) // beq s1, t1, pc + 0x14
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x24090015) // addiu t1, r0, 0x0015
    offset = data.writeWord(offset, 0x16290015) // bne s1, t1, pc + 0x58
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x90227967) // lbu v0, 0x7967 (at)
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x30490001) // andi t1, v0, 0x0001
    offset = data.writeWord(offset, 0x29290001) // slti t1, t1, 0x0001
    offset = data.writeWord(offset, 0x1520000f) // bne t1, r0, pc + 0x40
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x2c490003) // slti t1, v0, 0x0003
    offset = data.writeWord(offset, 0x15200003) // bne t1, r0, pc + 0x10
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x0803f2e3) // j 0x800fcb8c
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x90227964) // lbu v0, 0x7964 (at)
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x30490001) // andi t1, v0, 0x0001
    offset = data.writeWord(offset, 0x29290001) // slti t1, t1, 0x0001
    offset = data.writeWord(offset, 0x11200002) // beq t1, r0, pc + 0x0c
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x24020001) // addiu v0, r0, 0x0001
    offset = data.writeWord(offset, 0x0803f2e3) // j 0x800fcb8c
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x90227964) // lbu v0, 0x7964 (at)
    offset = data.writeWord(offset, 0x0803f2e3) // j 0x800fcb8c
    offset = data.writeWord(offset, 0x00000000) // nop
    // Patch the code that loads relic description when loading the menu.
    data.writeWord(0x115fe8, 0x08000000 + ((ramAddress + 3 * size) >> 2))
    offset = romAddress + 3 * size
    offset = data.writeWord(offset, 0x24090014) // addiu t1, r0, 0x0014
    offset = data.writeWord(offset, 0x12090004) // beq s0, t1, pc + 0x14
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x24090015) // addiu t1, r0, 0x0015
    offset = data.writeWord(offset, 0x16090016) // bne s0, t1, pc + 0x58
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x90227967) // lbu v0, 0x7967 (at)
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x30490001) // andi t1, v0, 0x0001
    offset = data.writeWord(offset, 0x29290001) // slti t1, t1, 0x0001
    offset = data.writeWord(offset, 0x15200010) // bne t1, r0, pc + 0x44
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x26100003) // addiu s0, s0, 0x0003
    offset = data.writeWord(offset, 0x2c490003) // slti t1, v0, 0x0003
    offset = data.writeWord(offset, 0x15200003) // bne t1, r0, pc + 0x10
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x0803f246) // j 0x800fc918
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x90227964) // lbu v0, 0x7964 (at)
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x30490001) // andi t1, v0, 0x0001
    offset = data.writeWord(offset, 0x29290001) // slti t1, t1, 0x0001
    offset = data.writeWord(offset, 0x11200002) // beq t1, r0, pc + 0x0c
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x24020001) // addiu v0, r0, 0x0001
    offset = data.writeWord(offset, 0x0803f246) // j 0x800fc918
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x90227964) // lbu v0, 0x7964 (at)
    offset = data.writeWord(offset, 0x0803f246) // j 0x800fc918
    offset = data.writeWord(offset, 0x00000000) // nop
    // Patch the code that loads relic description when changing selection.
    data.writeWord(0x116220, 0x08000000 + ((ramAddress + 4 * size) >> 2))
    offset = romAddress + 4 * size
    offset = data.writeWord(offset, 0x24090014) // addiu t1, r0, 0x0014
    offset = data.writeWord(offset, 0x12090004) // beq s1, t1, pc + 0x14
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x24090015) // addiu t1, r0, 0x0015
    offset = data.writeWord(offset, 0x16090016) // bne s1, t1, pc + 0x58
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x90227967) // lbu v0, 0x7967 (at)
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x30490001) // andi t1, v0, 0x0001
    offset = data.writeWord(offset, 0x29290001) // slti t1, t1, 0x0001
    offset = data.writeWord(offset, 0x15200010) // bne t1, r0, pc + 0x44
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x26100003) // addiu s0, s0, 0x0003
    offset = data.writeWord(offset, 0x2c490003) // slti t1, v0, 0x0003
    offset = data.writeWord(offset, 0x15200003) // bne t1, r0, pc + 0x10
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x0803f2d4) // j 0x800fcb48
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x90227964) // lbu v0, 0x7964 (at)
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x30490001) // andi t1, v0, 0x0001
    offset = data.writeWord(offset, 0x29290001) // slti t1, t1, 0x0001
    offset = data.writeWord(offset, 0x11200002) // beq t1, r0, pc + 0x0c
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x24020001) // addiu v0, r0, 0x0001
    offset = data.writeWord(offset, 0x0803f2d4) // j 0x800fcb48
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x90227964) // lbu v0, 0x7964 (at)
    offset = data.writeWord(offset, 0x0803f2d4) // j 0x800fcb48
    offset = data.writeWord(offset, 0x00000000) // nop
    // Patch the code that enables/disables a familiar.
    data.writeWord(0x1160cc, 0x08000000 + ((ramAddress + 5 * size) >> 2))
    offset = romAddress + 5 * size
    offset = data.writeWord(offset, 0x90227964) // lbu v0, 0x7964 (at)
    offset = data.writeWord(offset, 0x24090014) // addiu t1, r0, 0x0014
    offset = data.writeWord(offset, 0x12090004) // beq s0, t1, pc + 0x14
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x24090015) // addiu t1, r0, 0x0015
    offset = data.writeWord(offset, 0x1609000c) // bne s0, t1, pc + 0x34
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x28490003) // slti t1, v0, 0x0003
    offset = data.writeWord(offset, 0x11200009) // beq t1, r0, pc + 0x28
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x902a7967) // lbu t2, 0x7967 (at)
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x31490001) // andi t1, t2, 0x0001
    offset = data.writeWord(offset, 0x2d290001) // slti t1, t1, 0x0001
    offset = data.writeWord(offset, 0x15200003) // bne t1, r0, pc + 0x10
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x25420000) // addiu v0, t2, 0x0000
    offset = data.writeWord(offset, 0x26100003) // addiu s0, s0, 0x0003
    offset = data.writeWord(offset, 0x0803f27f) // j 0x800fc9fc
    offset = data.writeWord(offset, 0x00000000) // nop
  }

  function depth(item, visited) {
    visited = visited || new Set()
    if (visited.has(item)) {
      return visited.size
    }
    visited.add(item)
    return (item.locks || []).map(function(lock) {
      const newVisited = new Set(visited)
      return Array.from(lock).reduce(function(sum, item) {
        return depth(item, newVisited)
      }, 0)
    }).reduce(function(max, depth) {
      if (depth > max) {
        return depth
      }
      return max
    }, 0)
  }

  function removeCircular(item, visited) {
    visited = visited || new Set()
    visited.add(item.item)
    return item.locks.reduce(function(locks, lock) {
      const newVisited = new Set(visited)
      const items = Array.from(lock).sort(function(a, b) {
        return depth(b) - depth(a)
      })
      let erase
      for (let i = 0; i < items.length; i++) {
        const lockItem = Object.assign({}, items[i])
        items[i] = lockItem
        if (newVisited.has(lockItem.item)) {
          erase = true
          break
        }
        if (lockItem.locks && lockItem.locks.length) {
          lockItem.locks = removeCircular(lockItem, newVisited)
          if (lockItem.locks.length === 0) {
            erase = true
            break
          }
        }
      }
      if (!erase) {
        locks.push(new Set(items))
      }
      return locks
    }, [])
  }

  function isDuplicated(a, b) {
    if (a.item === b.item) {
      return true
    }
    return b.locks && b.locks.some(function(lock) {
      return Array.from(lock).some(function(item) {
        return isDuplicated(a, item)
      })
    })
  }

  function removeSubsets(item) {
    return item.locks.reduce(function(locks, lock) {
      const items = Array.from(lock)
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        let erase
        for (let j = 0; j < items.length; j++) {
          if (i !== j) {
            if (isDuplicated(items[i], items[j])) {
              erase = true
              break
            }
          }
        }
        if (erase) {
          items.splice(i--, 1)
        }
        if (item.locks && item.locks.length) {
          item.locks = removeSubsets(item)
        }
      }
      locks.push(new Set(items))
      return locks
    }, [])
  }

  function clean(item) {
    if (item.locks) {
      if (!item.locks.length) {
        delete item.locks
      } else {
        item.locks.forEach(function(lock) {
          Array.from(lock).forEach(function(item) {
            clean(item)
          })
        })
      }
    }
  }

  function lockDepth(min, locks) {
    const curr = Array.from(locks).reduce(function(max, item) {
      let curr = 1
      if (item.locks) {
        curr += item.locks.reduce(lockDepth, 0)
      }
      if (curr > max) {
        return curr
      }
      return max
    }, 0)
    if (min === 0 || curr < min) {
      return curr
    }
    return min
  }

  function complexity(mapping, requirements) {
    const graph = Object.getOwnPropertyNames(mapping).map(function(key) {
      let locks = mapping[key].locks || []
      if (locks.length === 1 && locks[0].size === 0) {
        locks = []
      }
      return {
        item: key,
        locks: locks,
      }
    })
    // Build lock graph.
    graph.forEach(function(node) {
      node.locks = node.locks.map(function(lock) {
        return new Set(Array.from(lock).map(function(item) {
          return graph.filter(function(node) {
            return node.item === item
          }).pop()
        }))
      })
    })
    // Solve for each requirement.
    const abilities = {}
    const solutions = requirements.map(function(requirement) {
      return new Set(requirement.split('').map(function(ability)  {
        if (abilities[ability]) {
          return abilities[ability]
        }
        const root = graph.filter(function(location) {
          return location.item === ability
        }).pop()
        // Remove circular locks.
        root.locks = removeCircular(root)
        // Remove locks that are fulfilled by other locks.
        root.locks = removeSubsets(root)
        // Clean up tree.
        clean(root)
        abilities[ability] = root
        return root
      }))
    })
    // Calculate deepest minimum depth.
    return solutions.reduce(lockDepth, 0)
  }

  function round(
    rng,
    pool,
    relics,
    locations,
    target,
    goal,
    callback,
    ctx,
    result,
  ) {
    return new Promise (function(resolve, reject) {
      setTimeout(function() {
        result = result || {}
        if (++ctx.rounds >= MAX_ROUNDS && MAX_ROUNDS !== 0) {
          resolve(result)
        }
        // Get new locations pool.
        pool.locations = util.shuffled(rng, locations)
        while (pool.locations.length > pool.relics.length) {
          pool.locations.pop()
        }
        // Place relics.
        result = pickRelicLocations(rng, pool)
        if (result.error) {
          if (result.error instanceof errors.SoftlockError) {
            if (callback(ctx.rounds)) {
              // If a softlock was generated, move the unplaced relics to the
              // beginning of the relics pool list and try again.
              result.relics.forEach(function(relic) {
                pool.relics.splice(pool.relics.indexOf(relic), 1)
              })
              pool.relics = result.relics.concat(pool.relics)
              return resolve(round(
                rng,
                pool,
                relics,
                locations,
                target,
                goal,
                callback,
                ctx,
                result,
              ))
            } else {
              return resolve(result)
            }
          } else {
            return reject(result.error)
          }
        }
        // Get progression complexity.
        if (target !== undefined) {
          const depth = complexity(result, goal)
          if (ctx.lowDepth === undefined || depth < ctx.lowDepth) {
            ctx.lowDepth = depth
          }
          if (ctx.highDepth === undefined || depth > ctx.highDepth) {
            ctx.highDepth = depth
          }
          // If the complexity target is not met, reshuffle the relics.
          if ((!Number.isNaN(target.min) && depth < target.min)
              || ('max' in target && depth > target.max)) {
            result.error = new errors.ComplexityError(
              ctx.lowDepth,
              ctx.highDepth,
            )
            if (callback(ctx.rounds)) {
              pool.relics = util.shuffled(rng, relics)
              return resolve(round(
                rng,
                pool,
                relics,
                locations,
                target,
                goal,
                callback,
                ctx,
                result,
              ))
            }
          }
        }
        return resolve(result)
      })
    })
  }

  function getLocations() {
    const locations = relics.filter(function(location) {
      return !location.extension
    }).concat(extension.locations)
    return locations.map(function(location) {
      let id
      if ('ability' in location) {
        id = location.ability
      } else if ('name' in location) {
        id = location.name
      }
      if ('itemId' in location) {
        const itemId = location.itemId + constants.tileIdOffset
        const item = util.itemFromTileId(items(), itemId)
        location.item = item
        if ('tileIndex' in location) {
          location.tile = item.tiles[location.tileIndex]
        }
      }
      return Object.assign({id: id}, location)
    })
  }

  function randomizeRelics(rng, options, removed, callback) {
    removed = removed || []
    callback = callback || function() {
      return true
    }
    // Initialize location locks.
    const locksMap = {}
    if (typeof(options.relicLocations) === 'object') {
      Object.assign(locksMap, options.relicLocations)
    } else {
      const safe = presets.filter(function(preset) {
        return preset.id === 'safe'
      }).pop()
      Object.assign(locksMap, safe.options().relicLocations)
    }
    if (typeof(options.relicLocations) === 'object') {
      Object.assign(locksMap, options.relicLocations)
    }
    // Get the goal and complexity target.
    let target
    let goal
    Object.getOwnPropertyNames(locksMap).forEach(function(name) {
      if (!(/^[0-9]+(-[0-9]+)?$/).test(name)) {
        return true
      }
      const parts = name.split('-')
      target = {
        min: parseInt(parts[0]),
      }
      if (parts.length === 2) {
        target.max = parseInt(parts[1])
      }
      goal = locksMap[name]
    })
    // Create relics and locations collections.
    let locations = getLocations()
    const extensions = []
    switch (options.relicLocationsExtension) {
    case constants.EXTENSION.EQUIPMENT:
      extensions.push(constants.EXTENSION.EQUIPMENT)
    case constants.EXTENSION.GUARDED:
      extensions.push(constants.EXTENSION.GUARDED)
    }
    locations = locations.filter(function(location) {
      return !location.extension
        || extensions.indexOf(location.extension) !== -1
    })
    let enabledRelics = relics.filter(function(relic) {
      return !relic.extension
        || extensions.indexOf(relic.extension) !== -1
    })
    // Filter out any progression items that have been placed by a preset.
    const removedIds = removed.map(function(item) {
      return item.id
    })
    locations = locations.filter(function(location) {
      return removedIds.indexOf(location.itemId) === -1
    })
    enabledRelics = enabledRelics.filter(function(relic) {
      return removedIds.indexOf(relic.itemId) === -1
    })
    // Initialize location locks.
    locations.forEach(function(location) {
      const id = location.id
      if (locksMap[id]) {
        location.locks = locksMap[id].map(function(lock) {
          return new Set(lock)
        })
      } 
      if (!location.locks || !location.locks.length) {
        location.locks = [new Set()]
      }
    })
    // Create a context that holds the current relic and location pools.
    const pool = {
      relics: util.shuffled(rng, enabledRelics),
    }
    // Attempt to place all relics.
    const ctx = {rounds: 0}
    return round(
      rng,
      pool,
      enabledRelics,
      locations,
      target,
      goal,
      callback,
      ctx,
    ).then(function(result) {
      // If the final attempt resulted in an error, throw it.
      if (result.error) {
        throw result.error
      }
      locations = locations.filter(function(location) {
        const locationId = location.ability || location.name
        const locations = Object.getOwnPropertyNames(pool.locations)
        return locations.indexOf(locationId) === -1
      })
      // Write spoilers.
      const spoilers = []
      enabledRelics.forEach(function(relic) {
        const location = result[relic.ability]
        spoilers.push(relic.name + ' at ' + location.name)
      })
      const info = util.newInfo()
      info[3]['Relic locations'] = spoilers
      return {
        mapping: result,
        locations: locations,
        relics: enabledRelics,
        rounds: ctx.rounds,
        info: info,
      }
    })
  }

  function writeRelics(rng, options, result) {
    const data = new util.checked()
    if (options.relicLocations) {
      // Write data to ROM.
      writeMapping(data, rng, result.mapping)
      // Patch out cutscenes.
      patchAlchemyLabCutscene(data)
      patchClockRoomCutscene(data)
      // Patch relics menu.
      switch (options.relicLocationsExtension) {
      case constants.EXTENSION.EQUIPMENT:
      case constants.EXTENSION.GUARDED:
        patchRelicsMenu(data)
      }
    }
    return {
      data: data,
      items: items(),
    }
  }

  const exports = {
    randomizeRelics: randomizeRelics,
    writeRelics: writeRelics,
  }
  if (self) {
    self.sotnRando = Object.assign(self.sotnRando || {}, {
      randomizeRelics: exports,
    })
  } else {
    module.exports = exports
  }
})(typeof(self) !== 'undefined' ? self : null)
