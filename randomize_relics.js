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
  
  let relics
  let util
  if (self) {
    relics = sotnRando.relics
    util = sotnRando.util
  } else {
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

  function writeMapping(mapping, data) {
    Object.getOwnPropertyNames(mapping).forEach(function(location) {
      const relic = mapping[location]
      relics[location].addresses.forEach(function(address) {
        data.writeByte(address, relic.id)
      })
      // Check if placing in the shop.
      const jewelOfOpen = relicFromId(0x10)
      if (location === jewelOfOpen.location) {
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

  function checkForSoftLock(mapping) {
    let locs = [ 0x04, 0x0a, 0x0b, 0x0f, 0x10 ]
    const visited = {}
    locs.forEach(function(l) {
      return visited[l] = true
    })
    const abilities = {}
    while (locs.length) {
      const loc = locs.shift()
      visited[loc] = true
      const relic = mapping[loc]
      if (relic.ability) {
        abilities[relic.ability] = true
      }
      locs = locs.concat(relics.filter(function(relic) {
        if (visited[relic.location]) {
          return false
        }
        if (locs.indexOf(relic.location) !== -1) {
          return false
        }
        return relic.locks.some(function(lock) {
          return Array.from(lock).every(function(requirement) {
            return abilities[requirement]
          })
        })
      }).map(function(relic) {
        return relic.location
      }))
    }
    if (Object.keys(visited).length !== relics.length) {
      throw new Error('soft lock generated')
    }
  }

  function randomizeRelics(data, options, info) {
    let returnVal = true
    if (options.relicLocations) {
      // Run a sanity check.
      if (options.checkVanilla) {
        const mismatches = []
        relics.forEach(function(relic) {
          const location = relic.location
          relic = relics.filter(function(relic) {
            return relic.location === location
          }).pop()
          const address = relic.addresses[0]
          if (data.readByte(address) !== relic.id) {
            const actual = relics.filter(function(relic) {
              return relic.id === data.readByte(address)
            }).pop()
            let name
            if (actual) {
              name = actual.name
            } else {
              name = 'Unknown'
            }
            mismatches.push({
              relic: name,
              location: location.vanilla,
            })
          }
        })
        if (mismatches.length) {
          if (options.verbose) {
            console.error('relic mismatches:')
            mismatches.sort(function(a, b) {
              a = relicFromName(a.relic) || { id: 0 }
              b = relicFromName(b.relic) || { id: 0 }
              return a.id - b.id
            }).forEach(function(relic) {
              console.error(relic)
            })
            console.error('relic data is NOT vanilla')
          }
          returnVal = false
        } else if (options.verbose) {
          console.log('relic locations are vanilla')
        }
      } else {
        // Initialize location locks.
        const locks = relics.reduce(function(locks, relic) {
          locks[relic.ability] = relic.locks || []
          return locks
        }, {})
        Object.assign(locks, options.relicLocks || {})
        relics.forEach(function(relic) {
          relic.locks = locks[relic.ability].map(function(lock) {
            return new Set(lock)
          })
          if (!relic.locks.length) {
            relic.locks = [new Set()]
          }
        })
        // Separate location locks into their own collection.
        const locations = relics.map(function(relic) {
          return {
            location: relic.location,
            locks: relic.locks.map(function(lock) {
              return new Set(lock)
            }),
          }
        })
        // Create a context that holds the current relic and location pools.
        const pool = {
          locations: locations,
          relics: util.shuffled(relics),
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
        checkForSoftLock(result)
        // Write data to ROM.
        writeMapping(result, data)
        // Write spoilers.
        const spoilers = []
        relics.forEach(function(relic) {
          const id = relic.id
          const name = relic.name
          const location = relics.filter(function(relic) {
            return result[relic.location].id === id
          }).pop()
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
        // The flag that gets set after the maria cutscene is @ 0x3be71.
        // The instruction that checks that flag is:
        // 0x54f0f44:    bne r2, r0, 0x1b8a58    144002da
        // Change the instruction so it always branches:
        // 0x54f0f44:    beq r0, r0, 0x1b8a58    100002da
        data.writeByte(0x054f0f44 + 2, 0x00)
        data.writeByte(0x054f0f44 + 3, 0x10)
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
