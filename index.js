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
 */

const shopRelicNameAddress = 0x47d5650
const shopRelicIdAddress = 0x47dbde0
const shopRelicIdOffset = 0x64

const relics = [{
  name: 'Soul of Bat',
  id: 0x00,
  location: 0x00,
  addresses: [ 0x47a5b66 ],
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
  // Mist Gates, Castle 2
  locationBlacklist: [ 0x00, 0x17, 0x18, 0x19, 0x1a, 0x1b ]
}, {
  name: 'Power of Mist',
  id: 0x08,
  location: 0x08,
  addresses: [ 0x5610db8, 0x561142c ],
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
}, {
  name: 'Leap Stone',
  id: 0x0d,
  location: 0x0d,
  addresses: [ 0x5610dc2, 0x561161a ],
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
  // Jewel Doors, Castle 2
  locationBlacklist: [ 0x11, 0x15, 0x17, 0x18, 0x19, 0x1a, 0x1b, 0x0d, 0x0e ],
}, {
  name: 'Merman Statue',
  id: 0x11,
  location: 0x11,
  addresses: [ 0x4c35174 ],
  // Holy Snorkel Location
  locationBlacklist: [ 0x0e ],
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
}]

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

const startingAreas = [ 0x04, 0x0a, 0x0b, 0x0f, 0x10 ]

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
  // Check abilities if possible
  switch (relic.id) {
  case 0x10:
    ctx.abilities.jewelOfOpen = true
    break
  case 0x0d:
    ctx.abilities.leapStone = true
    break
  case 0x07:
    ctx.abilities.mist = true
    break
  case 0x08:
    ctx.abilities.powerOfMist = true
    break
  case 0x0c:
    ctx.abilities.gravityBoots = true
    break
  case 0x04:
    ctx.abilities.wolf = true
    break
  case 0x00:
    ctx.abilities.bat = true
    break
  case 0x02:
    ctx.abilities.sonar = true
    break
  case 0x11:
    ctx.abilities.mermanStatue = true
    break
  }
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

function pickRelicLocation(ctx) {
  if (ctx.stackDepth++ === 64) {
    throw new Error('soft lock generated')
  }
  // List of available locations
  const gravityBootsChain = ctx.abilities.gravityBoots
        && ctx.abilities.leapStone
  const mistFlight = ctx.abilities.mist && ctx.abilities.powerOfMist
  const locationsAvailable = []
  const push = pushAvailableLocation.bind(null, ctx, locationsAvailable)
  // Starting Areas
  startingAreas.forEach(push)
  // Restricted Areas
  if (ctx.abilities.mist
      && (ctx.abilities.leapStone
          || ctx.abilities.gravityBoots
          || ctx.abilities.bat)) {
    // Soul of Bat Vanilla
    [ 0x00 ].forEach(push)
  }
  if (ctx.abilities.bat
      || gravityBootsChain
      || mistFlight) {
    // Flight only
    [ 0x01, 0x05, 0x08, 0x0c, 0x13, 0x16 ].forEach(push)
  }
  if ((ctx.abilities.bat
       || mistFlight
       || gravityBootsChain)
      && (ctx.abilities.mist
          || ctx.abilities.wolf
          || ctx.abilities.bat)) {
    // Olrox's Prize
    [ 0x02 ].forEach(push)
  }
  if (ctx.abilities.gravityBoots
      || ctx.abilities.bat
      || mistFlight) {
    // Gravity Boots or better
    [ 0x06, 0x12, 0x14 ].forEach(push)
  }
  if (ctx.abilities.leapStone
      || ctx.abilities.gravityBoots
      || ctx.abilities.bat || mistFlight) {
    // Leapstone or better
    // Colosseum - only required if leap stone?
    [ 0x07, 0x0d ].forEach(push)
  }
  if (ctx.abilities.jewelOfOpen) {
    // Bottom of the castle
    [ 0x11 ].forEach(push)
  }
  if ((ctx.abilities.jewelOfOpen && ctx.abilities.leapStone)
      || ctx.abilities.bat
      || mistFlight) {
    // Demon card a bitch (setz' words, not mine -mouse)
    [ 0x15 ].forEach(push)
  }
  if (ctx.abilities.mermanStatue
      && ctx.abilities.jewelOfOpen) {
    // Holy snorkel vanilla
    [ 0x0e ].forEach(push)
  }
  if (ctx.abilities.jewelOfOpen
      && ctx.abilities.mist
      && (ctx.abilities.bat
          || ctx.abilities.powerOfMist
          || gravityBootsChain)
      && (ctx.abilities.powerOfMist
          || (ctx.abilities.bat
              && ctx.abilities.sonar))) {
    // Castle 2 - Flight, Mist, Jewel of Open, and sonar or power of mist
    [ 0x03, 0x09, 0x17, 0x18, 0x19, 0x1a, 0x1b ].forEach(push)
  }
  if (locationsAvailable.length === 0) {
    throw new Error('out of available locations')
  }
  let relic
  // Get unplaced relic
  do relic = relics[randIdx(relics)]
  while (ctx.relics[relic.id])
  if (locationsAvailable.length === 1) {
    // Only one location left?
    // Check to see if its the last item in the game
    // If not, give an item that will unlock more items
    // I need to actually think this through and place the correct items,
    // but this will do for now
    if (!ctx.abilities.jewelOfOpen) {
      relic = relicFromId(0x10)
    } else if (!ctx.abilities.leapStone) {
      relic = relicFromId(0x0d)
    } else if (!ctx.abilities.gravityBoots) {
      relic = relicFromId(0x0c)
    } else if (!ctx.abilities.bat) {
      relic = relicFromId(0x00)
    } else if (!ctx.abilities.mist) {
      relic = relicFromId(0x07)
    } else if (!ctx.abilities.mermanStatue) {
      relic = relicFromId(0x11)
    }
  }
  // Get free location
  let location
  do location = locationsAvailable[randIdx(locationsAvailable)]
  while (ctx.locations[location])
  // Items are never allowed in these locations
  if ((relic.locationBlacklist || []).indexOf(location) !== -1) {
    return pickRelicLocation(ctx)
  }
  return {
    relic: relic,
    location: location,
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
      for (let i = 0; i < relics.length; i++) {
        const relicLocation = pickRelicLocation(ctx)
        placeRelic(ctx, relicLocation.relic, relicLocation.location, data)
      }
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
