/**
 * Let's Randomize Relics
 *
 * Originally by setz
 * @splixel on twitter
 * twitch.tv/skiffain
 *
 * Javascript port and improvements by Wild Mouse
 * @3snow_p7im on twitter
 * twitch.tv/3snow_p7im
 */
(function(self) {

  let constants
  let extension
  let items
  let presets
  let relics
  let util
  if (self) {
    constants = self.sotnRando.constants
    extension = self.sotnRando.extension
    items = self.sotnRando.items
    presets = self.sotnRando.presets
    relics = self.sotnRando.relics
    util = self.sotnRando.util
  } else {
    constants = require('./constants')
    extension = require('./extension')
    items = require('./items')
    presets = require('./presets')
    relics = require('./relics')
    util = require('./util')
  }

  const ERROR = {
    SOFTLOCK: 'softlock generated',
  }

  const shopRelicNameAddress = 0x47d5650
  const shopRelicIdAddress = 0x47dbde0
  const shopRelicIdOffset = 0x64

  function relicFromId(id) {
    return relics.filter(function(relic) {
      return relic.id === id
    }).pop()
  }

  function relicFromName(name) {
    return relics.filter(function(relic) {
      return relic.name === name
    }).pop()
  }

  function writeMapping(mapping, locations, data) {
    // Collect any vanilla locations that did not receive a relic.
    const vanilla = extension.relics.reduce(function(vanilla, relic, index) {
      if (!(index in mapping)) {
        vanilla.push(relic)
      }
      return vanilla
    }, [])
    // Write new relic locations.
    Object.getOwnPropertyNames(mapping).forEach(function(location) {
      location = locations[parseInt(location)]
      const relic = mapping[location.location]
      // Check if placing in the shop.
      const jewelOfOpen = relicFromId(0x10)
      if (location.location === 0x10) {
        // Fix shop menu check.
        data.writeByte(shopRelicIdAddress, relic.id + shopRelicIdOffset)
        // Change shop menu name.
        for (let i = 0; i < jewelOfOpen.name.length; i++) {
          let value
          if (i >= relic.name.length
              || relic.name.charCodeAt(i) === ' '.charCodeAt()) {
            value = ' '
          } else {
            value = relic.name.charCodeAt(i) - 0x20
          }
          data.writeByte(shopRelicNameAddress + i, value)
        }
      }
      // Check for extended location.
      if ('extension' in location) {
        // Replace or erase item displaced by randomized extension location.
        let replacementItem
        const replaceLocation = vanilla.shift()
        if (!replaceLocation.erase) {
          // Get item being displaced.
          const item = items.filter(function(item) {
            return item.type === location.item.type
              && item.id === location.item.id
          }).pop()
          // Get a tile being replaced.
          const tile = item.tiles[location.item.tileIndex]
          const address = tile.addresses[0]
          try {
            // This will fail if doing a dry run without item randomization.
            const id = data.readShort(address, true)
            replacementItem = util.itemFromTileId(items, id)
          } catch (err) {
            // Use vanilla item.
            replacementItem = item
          }
        }
        if (replaceLocation.entities) {
          replaceLocation.entities.forEach(function(entity) {
            const zone = constants.zones[entity.zone]
            entity.addresses.forEach(function(address) {
              if (entity.erase) {
                // Erase the entity.
                data.writeWord(address + 0, 0xfffefffe)
                data.writeShort(address + 4, 0)
                data.writeShort(address + 6, 0)
                data.writeShort(address + 8, 0)
              } else {
                // Update the entity as a tile item.
                if ('x' in entity) {
                  data.writeShort(address + 0, entity.x)
                }
                if ('y' in entity) {
                  data.writeShort(address + 2, entity.y)
                }
                data.writeShort(address + 4, entity.entityId)
                data.writeShort(address + 8, entity.itemIndex)
                // Update the item table.
                data.writeShort(
                  util.romOffset(zone, zone.items + 2 * entity.itemIndex),
                  util.tileValue(replacementItem),
                )
              }
            })
          })
        }
        if (replaceLocation.instructions) {
          replaceLocation.instructions.forEach(function(instruction) {
            instruction.addresses.forEach(function(address) {
              data.writeWord(address, instruction.instruction)
            })
          })
        }
      }
      if ('extension' in location) {
        location.entities.forEach(function(entity) {
          entity.addresses.forEach(function(address) {
            // For extension locations, an optional position can be updated.
            if ('x' in entity) {
              data.writeShort(address + 0, entity.x)
            }
            if ('y' in entity) {
              data.writeShort(address + 2, entity.y)
            }
            // Change entity type.
            data.writeShort(address + 4, 0xb)
            // Write relic ID.
            data.writeShort(address + 8, relic.id)
          })
        })
      } else {
        // For vanilla locations, just write the relic ID.
        location.addresses.forEach(function(address) {
          data.writeByte(address, relic.id)
        })
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
      // Find a location not locked by this current relic.
      const locationsAvailable = pool.locations.filter(function(location) {
        if (mapping[location.location]) {
          return false
        }
        // Find a location with a lock set that doesn't contain this relic.
        return location.locks.some(function(lock) {
          return !lock.has(relic.ability)
        })
      })
      if (locationsAvailable.length) {
        const location = locationsAvailable[randIdx(locationsAvailable)]
        // After placing the relic in this location, anything previously
        // locked by the relic is now locked by the requirements of the new
        // location.
        const newLocations = pool.locations.map(function(newLocation) {
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
        newMapping[location.location] = relic
        // Pick from remaining pool.
        return pickRelicLocations({
          locations: newLocations,
          relics: remainingRelics,
        }, newMapping)
      }
    }
    return {
      error: new Error(ERROR.SOFTLOCK),
      relics: pool.relics,
    }
  }

  function checkForSoftLock(mapping, locations) {
    let locs = locations.filter(function(location) {
      return location.locks.length == 1
        && location.locks[0].size == 0
    }).map(function(location) {
      return location.location
    })
    const visited = new Set()
    locs.forEach(function(l) {
      return visited[l] = true
    })
    const abilities = new Set()
    while (locs.length) {
      const loc = locs.shift()
      visited.add(loc)
      const relic = mapping[loc]
      if (!relic) {
        continue
      }
      if (relic.ability) {
        abilities.add(relic.ability)
      }
      locs = locs.concat(locations.filter(function(location) {
        if (visited.has(location.location)) {
          return false
        }
        if (locs.indexOf(location.location) !== -1) {
          return false
        }
        return location.locks.some(function(lock) {
          return Array.from(lock).every(function(requirement) {
            return abilities.has(requirement)
          })
        })
      }).map(function(location) {
        return location.location
      }))
    }
    if (visited.size < relics.length) {
      throw new Error('soft lock generated')
    }
  }

  function randomizeRelics(data, options, info) {
    let returnVal = true
    if (options.relicLocations) {
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
      let locations = relics
      switch (options.relicLocationsExtension) {
      case constants.EXTENSION.GUARDED:
        const guarded = extension.locations.filter(function(location) {
          return location.extension === constants.EXTENSION.GUARDED
        })
        locations = locations.concat(guarded)
        break
      }
      locations.forEach(function(location) {
        let key
        if (typeof(location.ability) === 'string') {
          key = location.ability
        } else {
          key = location.name
        }
        if (locksMap[key]) {
          location.locks = locksMap[key].map(function(lock) {
            return new Set(lock)
          })
        } 
        if (!location.locks || !location.locks.length) {
          location.locks = [new Set()]
        }
      })
      // Create a context that holds the current relic and location pools.
      const pool = {
        relics: util.shuffled(relics),
        locations: locations.map(function(location, index) {
          return Object.assign({
            location: index,
            locks: location.locks.map(function(lock) {
              return new Set(lock)
            }),
          }, location)
        }),
      }
      // Attempt to place all relics.
      let attempts = 0
      let result
      while (attempts++ < 1024) {
        result = pickRelicLocations(pool)
        if (result.error) {
          switch (result.error.message) {
          case ERROR.SOFTLOCK:
            // If a softlock was generated, move the unplaced relics to the
            // beginning of the relics pool list and try again.
            result.relics.forEach(function(relic) {
              pool.relics.splice(pool.relics.indexOf(relic), 1)
            })
            pool.relics = result.relics.concat(pool.relics)
            continue
          default:
            throw result.error
          }
        }
        break
      }
      // If the final attempt resulted in an error, throw it.
      if (result.error) {
        throw result.error
      }
      // Safety check against softlocks.
      checkForSoftLock(result, pool.locations)
      // Write data to ROM.
      writeMapping(result, pool.locations, data)
      // Write spoilers.
      const spoilers = []
      relics.forEach(function(relic) {
        const id = relic.id
        const name = relic.name
        const locationIds = Object.getOwnPropertyNames(result)
        const locationId = parseInt(locationIds.filter(function(locationId) {
          return result[locationId] === relic
        })[0])
        const location = pool.locations[locationId]
        spoilers.push(name + ' at ' + location.name)
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
      data.writeByte(0x0aeaa0, 0x00)
      // The time attack check occurs in Richter mode too, but the game gets
      // around this by writing the seconds elapsed between pressing Start on
      // the main screen and on the name entry screen to the time attack
      // table for events that aren't in Richter mode.
      // Zero out the time attack entry for the clock room, or Richter will
      // load the cutscene version every time he enters.
      data.writeByte(0x119af4, 0x00)
    }
    return returnVal
  }

  const exports = randomizeRelics
  if (self) {
    self.sotnRando = Object.assign(self.sotnRando || {}, {
      randomizeRelics: exports,
    })
  } else {
    module.exports = exports
  }
})(typeof(self) !== 'undefined' ? self : null)
