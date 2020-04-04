(function(self) {

  let constants
  let errors
  let extension
  let items
  let presets
  let relics
  let util
  if (self) {
    constants = self.sotnRando.constants
    errors = self.sotnRando.errors
    extension = self.sotnRando.extension
    items = self.sotnRando.items
    presets = self.sotnRando.presets
    relics = self.sotnRando.relics
    util = self.sotnRando.util
  } else {
    constants = require('./constants')
    errors = require('./errors')
    extension = require('./extension')
    items = require('./items')
    presets = require('./presets')
    relics = require('./relics')
    util = require('./util')
  }

  const MAX_ATTEMPTS = 262144

  function getRandomZoneItem(zones, pool) {
    // Collect ids of items that can be replaced for location extension.
    const extensionIds = pool.filter(function(location) {
      return 'extension' in location
    }).map(function(location) {
      return location.itemId
    })
    // Collect item tiles in the zones.
    const zoneTiles = zones.reduce(function(all, zone) {
      const tiles = items.reduce(function(all, item) {
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
    return zoneTiles[randIdx(zoneTiles)]
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

  function writeMapping(data, mapping, pool) {
    // Erase any vanilla location that did not receive a relic.
    const locations = Object.getOwnPropertyNames(mapping).map(function(key) {
      return mapping[key].ability
    })
    const zoneRemovedItems = {}
    relics.forEach(function(location) {
      if (locations.indexOf(location.ability) === -1) {
        // Erase entities.
        if ('entity' in location) {
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
        item = util.itemFromTileId(items, tileId)
      }
      // Get the location to place the relic in.
      const location = mapping[key]
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
          const tileItem = getRandomZoneItem(zones, pool)
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
        const rand = Math.floor(Math.random() * 4)
        const removed = zoneRemovedItems[zone.id] || 0
        for (let i = 0; i < rand - removed; i++) {
          const tileItem = getRandomZoneItem(zones, pool)
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

  function randIdx(array) {
    return Math.floor(Math.random() * array.length)
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

  function pickRelicLocations(pool, mapping) {
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
        const location = locationsAvailable[randIdx(locationsAvailable)]
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
        return pickRelicLocations({
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

  function checkForSoftLock(mapping, locations) {
    let locs = locations.filter(function(location) {
      return location.locks.length == 1
        && location.locks[0].size == 0
    }).map(function(location) {
      return location.id
    })
    const visited = new Set()
    locs.forEach(function(l) {
      return visited[l] = true
    })
    const abilities = new Set()
    const keys = Object.getOwnPropertyNames(mapping)
    while (locs.length) {
      const loc = locs.shift()
      visited.add(loc)
      const ability = keys.filter(function(ability) {
        return mapping[ability].id === loc
      }).pop()
      if (!ability) {
        continue
      }
      if (ability) {
        abilities.add(ability)
      }
      locs = locs.concat(locations.filter(function(location) {
        if (visited.has(location.id)) {
          return false
        }
        if (locs.indexOf(location.id) !== -1) {
          return false
        }
        return location.locks.some(function(lock) {
          return Array.from(lock).every(function(requirement) {
            return abilities.has(requirement)
          })
        })
      }).map(function(location) {
        return location.id
      }))
    }
    if (visited.size < relics.length) {
      throw new errors.SoftlockError()
    }
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

  function getMapping(options, removed) {
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
    // Create location collection.
    let locations = relics
    const extensions = []
    switch (options.relicLocationsExtension) {
    case constants.EXTENSION.EQUIPMENT:
      extensions.push(constants.EXTENSION.EQUIPMENT)
    case constants.EXTENSION.GUARDED:
      extensions.push(constants.EXTENSION.GUARDED)
    }
    const extendedLocations = extension.locations.filter(function(location) {
      return extensions.indexOf(location.extension) !== -1
    })
    locations = locations.concat(extendedLocations)
    locations.forEach(function(location) {
      let id
      if ('ability' in location) {
        id = location.ability
      } else if ('name' in location) {
        id = location.name
      }
      if (locksMap[id]) {
        location.locks = locksMap[id].map(function(lock) {
          return new Set(lock)
        })
      } 
      if (!location.locks || !location.locks.length) {
        location.locks = [new Set()]
      }
      if ('itemId' in location) {
        const itemId = location.itemId + constants.tileIdOffset
        const item = util.itemFromTileId(items, itemId)
        location.item = item
        if ('tileIndex' in location) {
          location.tile = item.tiles[location.tileIndex]
        }
      }
    })
    // Filter out any progression items that have been placed by a preset.
    const removedIds = removed.map(function(item) {
      return item.id
    })
    locations = locations.filter(function(location) {
      return removedIds.indexOf(location.itemId) === -1
    })
    relics = relics.filter(function(relic) {
      return removedIds.indexOf(relic.itemId) === -1
    })
    // Consolidate location types into a standard format.
    locations = locations.map(function(location) {
      let id
      if ('ability' in location) {
        id = location.ability
      } else if ('name' in location) {
        id = location.name
      }
      return Object.assign({
        id: id,
        locks: location.locks.map(function(lock) {
          return new Set(lock)
        }),
      }, location)
    })
    // Create a context that holds the current relic and location pools.
    const pool = {
      relics: util.shuffled(relics),
    }
    // Attempt to place all relics.
    let attempts = 0
    let result
    let lowDepth
    let highDepth
    while (attempts++ < MAX_ATTEMPTS) {
      // Get new locations pool.
      pool.locations = util.shuffled(locations)
      while (pool.locations.length > pool.relics.length) {
        pool.locations.pop()
      }
      // Place relics.
      result = pickRelicLocations(pool)
      if (result.error) {
        if (result.error instanceof errors.SoftlockError) {
          // If a softlock was generated, move the unplaced relics to the
          // beginning of the relics pool list and try again.
          result.relics.forEach(function(relic) {
            pool.relics.splice(pool.relics.indexOf(relic), 1)
          })
          pool.relics = result.relics.concat(pool.relics)
          continue
        } else {
          throw result.error
        }
      }
      // Get progression complexity.
      if (typeof(target) !== 'undefined') {
        const depth = complexity(result, goal)
        if (lowDepth === undefined || depth < lowDepth) {
          lowDepth = depth
        }
        if (highDepth === undefined || depth > highDepth) {
          highDepth = depth
        }
        // If the complexity target is not met, reshuffle the relics.
        if ((!Number.isNaN(target.min) && depth < target.min)
            || ('max' in target && depth > target.max)) {
          pool.relics = util.shuffled(relics)
          result.error = new errors.ComplexityError(lowDepth, highDepth)
          continue
        }
      }
      break
    }
    // If the final attempt resulted in an error, throw it.
    if (result.error) {
      throw result.error
    }
    locations = locations.filter(function(location) {
      const locationId = location.ability || location.name
      const locations = Object.getOwnPropertyNames(pool.locations)
      return locations.indexOf(locationId) === -1
    })
    return {
      mapping: result,
      locations: locations,
    }
  }

  function randomizeRelics(data, options, removed, info) {
    if (options.relicLocations) {
      // Get random relic placements.
      const result = getMapping(options, removed)
      // Write data to ROM.
      writeMapping(data, result.mapping, result.locations)
      // Write spoilers.
      const spoilers = []
      relics.forEach(function(relic) {
        const location = result.mapping[relic.ability]
        spoilers.push(relic.name + ' at ' + location.name)
      })
      if (info) {
        info[3]['Relic locations'] = spoilers
      }
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
  }

  const exports = {
    randomizeRelics: randomizeRelics,
    getMapping: getMapping,
  }
  if (self) {
    self.sotnRando = Object.assign(self.sotnRando || {}, {
      randomizeRelics: exports,
    })
  } else {
    module.exports = exports
  }
})(typeof(self) !== 'undefined' ? self : null)
