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
 *
 * Conditions for flight are one of the following
 *   Soul of Bat (ez mode)
 *   Gravity Boots + Leap Stone (chaining gravity jumps)
 *   Form of Mist + Power of Mist (fly as mist)
 *
 * Requirements for accessing castle 2 are
 *   Flight
 *   Jewel of Open
 *   Mist
 *
 * Fun fact, due to Silver/Gold ring reqs, Gravity Boots + Leap Stone will never
 * be the only flight you can get before second castle.
 */

const shopRelicNameAddress = 0x47d5650
const shopRelicIdAddress = 0x47dbde0
const shopRelicIdOffset = 0x64

/**
 * List of every relic, described as follows:
 * relic.name - The name of the relic
 * relic.id - The ID of the relic. Writing the value to a location
 *   will place the relic in that location
 * relic.location - Randomizer-specific ID determining which
 *   logical location each relic is originally.
 * relic.addresses - List of the memory addresses corresponding to the location.
 *   Write IDs here to replace relics.
 * relic.ability - What ability this relic provides.
 *   Used to determine when progression is gained.
 */
const relics = [{
  name: 'Soul of Bat',
  id: 0x00,
  location: 0x00,
  addresses: [ 0x47a5b66 ],
  ability: 'B',
}, {
  name: 'Fire of Bat',
  id: 0x01,
  location: 0x01,
  addresses: [ 0x557535e ],
}, {
  name: 'Echo of Bat',
  id: 0x02,
  location: 0x02,
  addresses: [ 0x4aa4156 ],
  ability: 'E',
},  {
  name: 'Force of Echo',
  id: 0x03,
  location: 0x03,
  addresses: [ 0x526e6a8 ],
}, {
  name: 'Soul of Wolf',
  id: 0x04,
  location: 0x04,
  addresses: [ 0x49d6596, 0x49d5d3e ],
  ability: 'W',
}, {
  name: 'Power of Wolf',
  id: 0x05,
  location: 0x05,
  addresses: [ 0x4b6b9b4, 0x53f971c ],
}, {
  name: 'Skill of Wolf',
  id: 0x06,
  location: 0x06,
  addresses: [ 0x54b1d5a ],
}, {
  name: 'Form of Mist',
  id: 0x07,
  location: 0x07,
  addresses: [ 0x43c578a ],
  ability: 'M',
}, {
  name: 'Power of Mist',
  id: 0x08,
  location: 0x08,
  addresses: [ 0x5610db8, 0x561142c ],
  ability: 'P',
}, {
  name: 'Gas Cloud',
  id: 0x09,
  location: 0x09,
  addresses: [ 0x4cfcb16 ],
}, {
  name: 'Cube of Zoe',
  id: 0x0a,
  location: 0x0a,
  addresses: [ 0x4b6b946, 0x53f969a, 0x4b6b08a, 0x53f8e2e ],
}, {
  name: 'Spirit Orb',
  id: 0x0b,
  location: 0x0b,
  addresses: [ 0x48fd1fe, 0x48fe280 ],
}, {
  name: 'Gravity Boots',
  id: 0x0c,
  location: 0x0c,
  addresses: [ 0x48fc9ba ],
  ability: 'G',
}, {
  name: 'Leap Stone',
  id: 0x0d,
  location: 0x0d,
  addresses: [ 0x5610dc2, 0x561161a ],
  ability: 'L',
}, {
  name: 'Holy Symbol',
  id: 0x0e,
  location: 0x0e,
  addresses: [ 0x4c34ee6 ],
}, {
  name: 'Faerie Scroll',
  id: 0x0f,
  location: 0x0f,
  addresses: [ 0x47a5720, 0x47a5dd2 ],
}, {
  name: 'Jewel of Open',
  id: 0x10,
  location: 0x10,
  addresses: [ 0x47a321c ],
  ability: 'J',
}, {
  name: 'Merman Statue',
  id: 0x11,
  location: 0x11,
  addresses: [ 0x4c35174 ],
  ability: 'S',
}, {
  name: 'Bat Card',
  id: 0x12,
  location: 0x12,
  addresses: [ 0x54b1d58 ],
}, {
  name: 'Ghost Card',
  id: 0x13,
  location: 0x13,
  addresses: [ 0x5611958, 0x561127c ],
}, {
  name: 'Faerie Card',
  id: 0x14,
  location: 0x14,
  addresses: [ 0x47a5784 ],
}, {
  name: 'Demon Card',
  id: 0x15,
  location: 0x15,
  addresses: [ 0x45ea95e ],
}, {
  name: 'Sword Card',
  id: 0x16,
  location: 0x16,
  addresses: [ 0x4aa3f76 ],
}, {
  name: 'Heart of Vlad',
  id: 0x19,
  location: 0x17,
  addresses: [ 0x67437d2, 0x6306ab2, 0x4e335b4 ],
}, {
  name: 'Tooth of Vlad',
  id: 0x1a,
  location: 0x18,
  addresses: [ 0x5051d52, 0x67d1630 ],
}, {
  name: 'Rib of Vlad',
  id: 0x1b,
  location: 0x19,
  addresses: [ 0x69d2b1e, 0x50fa914 ],
}, {
  name: 'Ring of Vlad',
  id: 0x1c,
  location: 0x1a,
  addresses: [ 0x59bdb30, 0x59ee2e4 ],
}, {
  name: 'Eye of Vlad',
  id: 0x1d,
  location: 0x1b,
  addresses: [ 0x4da65f2, 0x662263a ],
}];

/**
 * List of every relic location, described as follows:
 * location.vanilla - The original relic located at this location.
 *   Unused, but valuable for documentation purposes.
 * location.location - The ID of the location to align with the relics list.
 * location.locks - List of ability combinations this location is locked by.
 *   Each entry in this list is a combination of abilities and having all the
 *   abilities in any entry is enough to make the location available.
 *   A lock of '' means the location is initially available.
 */
const locations = [
  {
    vanilla: 'Soul of Bat',
    location: 0x00,
    // Mist + at least Leap Stone
    locks: ['MB', 'MG', 'ML', 'MP']
  },
  {
    vanilla: 'Fire of Bat',
    location: 0x01,
    // Flight
    locks: ['B', 'LG', 'MP']
  },
  {
    vanilla: 'Echo of Bat',
    location: 0x02,
    // Flight + Form Change
    locks: ['B', 'LGM', 'LGW', 'MP']
  }, 
  {
    vanilla: 'Force of Echo',
    location: 0x03,
    // Second Castle
    locks: ['JMP', 'JMBE']
  },
  {
    vanilla: 'Soul of Wolf',
    location: 0x04,
    // No locks
    locks: ['']
  },
  {
    vanilla: 'Power of Wolf',
    location: 0x05,
    // Flight
    locks: ['B', 'LG', 'MP']
  },
  {
    vanilla: 'Skill of Wolf',
    location: 0x06,
    // Gravity Boots or better
    locks: ['G', 'B', 'MP']
  },
  {
    vanilla: 'Form of Mist',
    location: 0x07,
    // At least Leap Stone
    locks: ['B', 'G', 'L', 'MP']
  },
  {
    vanilla: 'Power of Mist',
    location: 0x08,
    // Flight
    locks: ['B', 'LG', 'MP']
  },
  {
    vanilla: 'Gas Cloud',
    location: 0x09,
    // Second Castle
    locks: ['JMP', 'JMBE']
  },
  {
    vanilla: 'Cube of Zoe',
    location: 0x0a,
    // No locks
    locks: ['']
  },
  {
    vanilla: 'Spirit Orb',
    location: 0x0b,
    // No locks
    locks: ['']
  },
  {
    vanilla: 'Gravity Boots',
    location: 0x0c,
    // Flight
    locks: ['B', 'LG', 'MP']
  },
  {
    vanilla: 'Leap Stone',
    location: 0x0d,
    // Jewel of Open or at least Leap Stone
    locks: ['J', 'B', 'G', 'L', 'MP']
  },
  {
    vanilla: 'Holy Symbol',
    location: 0x0e,
    // Jewel of Open + Merman Statue
    locks: ['JS']
  },
  {
    vanilla: 'Faerie Scroll',
    location: 0x0f,
    // No locks
    locks: ['']
  },
  {
    vanilla: 'Jewel of Open',
    location: 0x10,
    // No locks
    locks: ['']
  },
  {
    vanilla: 'Merman Statue',
    location: 0x11,
    // Just Jewel
    locks: ['J']
  },
  {
    vanilla: 'Bat Card',
    location: 0x12,
    // Gravity Boots or better
    locks: ['G', 'B', 'MP']
  },
  {
    vanilla: 'Ghost Card',
    location: 0x13,
    // Flight
    locks: ['B', 'LG', 'MP']
  },
  {
    vanilla: 'Faerie Card',
    location: 0x14,
    // Gravity Boots or better
    locks: ['G', 'B', 'MP']
  },
  {
    vanilla: 'Demon Card',
    location: 0x15,
    // Jewel of Open and at least Leap Stone
    locks: ['JL', 'JG', 'JB', 'JMP']
  },
  {
    vanilla: 'Sword Card',
    location: 0x16,
    // Flight
    locks: ['B', 'LG', 'MP']
  },
  {
    vanilla: 'Heart of Vlad',
    location: 0x17,
    // Second Castle
    locks: ['JMP', 'JMBE']
  },
  {
    vanilla: 'Tooth of Vlad',
    location: 0x18,
    // Second Castle
    locks: ['JMP', 'JMBE']
  },
  {
    vanilla: 'Rib of Vlad',
    location: 0x19,
    // Second Castle
    locks: ['JMP', 'JMBE']
  },
  {
    vanilla: 'Ring of Vlad',
    location: 0x1a,
    // Second Castle
    locks: ['JMP', 'JMBE']
  },
  {
    vanilla: 'Eye of Vlad',
    location: 0x1b,
    // Second Castle
    locks: ['JMP', 'JMBE']
  }
];

function relicFromId(id) {
  return relics.filter(function(relic) {
    return relic.id === id
  }).pop()
}

function addressesFromLocation(location) {
  return relics.filter(function(relic) {
    return relic.location === location
  }).pop().addresses
}

function placeRelic(ctx, relic, location, data) {
  addressesFromLocation(location).forEach(function(address) {
    data[address] = relic.id
  })
  // Check if placing in the shop
  const jewelOfOpen = relicFromId(0x10)
  if (location === jewelOfOpen.location) {
    // Fix shop menu check
    data[shopRelicIdAddress] = relic.id + shopRelicIdOffset
    // Change shop menu name
    for (let i = 0; i < jewelOfOpen.name.length; i++) {
      let value
      if (i >= relic.name.length
         || relic.name.charCodeAt(i) == ' '.charCodeAt()) {
        value = ' '
      } else {
        value = relic.name.charCodeAt(i) - 0x20
      }
      data[shopRelicNameAddress + i] = value
    }
  }
  // Check what abilities are gained
  relics.forEach(function(r) {
    if (r.ability && r.id === relic.id) {
      ctx.abilities[r.ability] = true;
    }
  });
  
  // Mark as used
  ctx.relics[relic.id] = true
  ctx.locations[location] = true
}

function randIdx(array) {
  return Math.floor(Math.random() * array.length)
}

function pushAvailableLocation(ctx, locationsAvailable, locationIdx) {
  if (!ctx.locations[locationIdx]) {
    locationsAvailable.push(locationIdx)
  }
}

function pickRelicLocation(ctx, locs) {
  if (ctx.stackDepth++ === 64) {
    throw new Error('soft lock generated')
  }
  // List of available locations
  let locationsAvailable = locs
    .filter(function(loc) { return !ctx.locations[loc.location]; });
  if (locationsAvailable.length === 0) {
    throw new Error('out of available locations')
  }
  
  // Get unplaced relic
  // Start with the progression relics to make softlocks much less likely when distributing
  
  // Minor hack:
  // Bat unlocks almost everything so we'll place it first, because otherwise it's too easy
  // to hide progression behind bat and give early bat.
  let keyRelics = ctx.relics[0x00] ? null : [relics[0]];
  
  // If we've placed bat already, start picking other progression items
  if (!keyRelics) {
    keyRelics = relics.filter(function(relic) { return relic.ability && !ctx.relics[relic.id]; });
  }

  // Out of progression. Throw everything else in
  if (keyRelics.length === 0) {
    keyRelics = relics.filter(function(relic) { return !ctx.relics[relic.id]; });
  }
  const relic = keyRelics[randIdx(keyRelics)];
  
  // Find a location not locked by this current relic
  locationsAvailable = locationsAvailable.filter(function(loc) {
    return loc.locks.some(function(lock) { return lock.indexOf(relic.ability) == -1; });
  });
  
  if (locationsAvailable.length === 0) {
    throw new Error('out of available locations')
  }
  
  const location = locationsAvailable[randIdx(locationsAvailable)];
  
  // We're going to put this relic in this location, so anything previously
  // locked by the relic is now locked by the requirements of the new location
  // TODO: This logic is a bit messy, and can probably be cleaned up a bit
  const newLocs = locs.map(function(loc) {
    const newLoc = Object.assign({}, loc);
    let newLocks = [];
    
    // Replace all instances of the old relic with new locks based on the new
    // location's requirements
    loc.locks.forEach(function(lock) {
      // Any locks that didn't require the relic can stay the same
      if (lock.indexOf(relic.ability) === -1) {
        newLocks.push(lock);
      }
      
      // Any locks that *did* require the relic must be updated.
      // Create a new lock for each unique lock for this location.
      else {
        location.locks.forEach(function(transferLock) {
          let newLock = lock.replace(relic.ability, transferLock);
          
          // Duplicate removal
          newLock = [...new Set(newLock)].sort().join('');
          newLocks.push(newLock);
        });
      }
    });
    
    // Filter out locks that use this ability
    newLocks = newLocks.filter(function(lock) { return lock.indexOf(relic.ability) === -1; });
    
    // Filter out locks that are supersets of other locks
    newLocks = [...new Set(newLocks)].sort(function(a, b) { return a.length - b.length; });
    for (let i = 0; i < newLocks.length - 1; i++) {
      const lock = newLocks[i];
      for (let j = i + 1; j < newLocks.length; j++) {
        if (lock.split('').every(function(l) { return newLocks[j].indexOf(l) !== -1; })) {
          newLocks.splice(j, 1);
          j--;
        }
      }
    }
    newLoc.locks = newLocks;
    return newLoc;
  });
  
  return {
    relic: relic,
    location: location.location,
    newLocs: newLocs
  }
}

function checkForSoftLock(mapping) {
  let locs = [ 0x04, 0x0a, 0x0b, 0x0f, 0x10 ];
  const visited = {};
  locs.forEach(function(l) { return visited[l] = true; });
  const abilities = {};
  while (locs.length) {
    const loc = locs.shift();
    visited[loc] = true;
    const relic = mapping[loc];
    if (relic.relic.ability) {
      abilities[relic.relic.ability] = true;;
    }
    locs = locs.concat(locations.filter(function(l) {
      if (visited[l.location]) {
        return false;
      }
      if (locs.indexOf(l.location) !== -1) {
        return false;
      }
      return l.locks.some(function(ll) {
        return ll.split('').every(function(lll) { return abilities[lll]; });
      });
    })
    .map(function(l){  return l.location; }));
  }
  if (Object.keys(visited).length !== locations.length) {
    throw new Error('soft lock generated')
  }
}

function randomizeRelics(data) {
  // Doesn't seem like the logic behind selecting relics has been thought
  // out by the original author, so many times this script will result in
  // an infinite loop or soft-lock state. To remedy this, just loop the
  // selection process until it finishes successfully. -mouse
  while (true) {
    const ctx = {
      stackDepth: 0,
      abilities: {},
      relics: [],
      locations: [],
    }
    // Do some shuffling things, make sure things arent impossible to access
    // Make things always possible later
    // Place the rest of the items
    try {
      let locs = locations.map(function(loc) { return Object.assign({}, loc); });
      const mapping = {};
      for (let i = 0; i < relics.length; i++) {
        const relicLocation = pickRelicLocation(ctx, locs)
        placeRelic(ctx, relicLocation.relic, relicLocation.location, data)
        mapping[relicLocation.location] = relicLocation;
        locs = relicLocation.newLocs;
      }
      checkForSoftLock(mapping);
      break
    } catch (e) {
      if (e.message !== 'soft lock generated'
          && e.message !== 'out of available locations') {
        throw e
      }
    }
  }
  // Entering the room between jewel door and red door in alchemy lab triggers
  // a cutscene with Maria. The game will softlock if the player enters alchemy
  // lab through the red door in chapel before fighting hippogryph. This can
  // only happen if the player has access to olrox quarters without soul of
  // bat, which isn't possible in the vanilla game without a speedrun trick.
  // In a randomized relic run, however, it is possible to have early movement
  // options that trigger this softlock for unwitting players. To be safe,
  // disable the cutscene from ever taking place.
  // The flag that gets set after the maria cutscene is @ 0x3be71.
  // The instruction that checks that flag is:
  // 0x54f0f44:    bne r2, r0, 0x1b8a58    144002da
  // Change the instruction so it always branches:
  // 0x54f0f44:    beq r0, r0, 0x1b8a58    100002da
  data[0x54f0f44 + 2] = 0x00
  data[0x54f0f44 + 3] = 0x10
}

try {
  module.exports = randomizeRelics
} catch (e) {}
