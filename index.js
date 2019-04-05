/**
 * Let's Randomize Relics
 * Made by setz
 * All comments by setz unless otherwise noted
 *
 * @splixel on twitter
 * twitch.tv/skiffain
 *
 * too lazy for licenses, pretend I attached WTFPL
 * (do what the fuck you want with this)
 *
 * Javascript port by Wild Mouse
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

// Known Bugs
// need to trace relics from left/right as well as up/down because of how sotn
// loads entities
//   List of known delinquents
//     Cube Of Zoe
//     Spirit Orb
//     Farie Scroll
//     Leap Stone

// Some relics have doubles, so..
// Relic ID/Name | RelicLocation ID | Cant Be Behind | RL ID No-Gos
// ----------------------------------------------------------------
// 00 Soul of Bat | 00
// 01 Fire of Bat | 01
// 02 Echo of Bat | 02
// 03 Force of Echo | 03
// 04 Soul of Wolf | 04
// 05 Power of Wolf | 05
// 06 Skill of Wolf | 06
// 07 Form of Mist | 07 | Castle 2, Mist Gates | 17 18 19 1a 1b 00
// 08 Power of Mist | 08
// 09 Gas Cloud | 09
// 0A Cube of Zoe | 0a
// 0B Spirit Orb | 0b
// 0C Gravity Boots | 0c
// 0D Leap Stone | 0d
// 0E Holy Symbol | 0e
// 0F Faerie Scroll | 0f
// 10 Jewel | 10 | Castle 2, Jewel Doors | 17 18 19 1a 1b 0d 0e 11 15
// 11 Merman Statue | 11 | Holy Snorkel Location | 0e
// 12 Bat Card | 12
// 13 Ghost Card | 13
// 14 Faerie Card | 14
// 15 Card | 15
// 16 Sword Card | 16
// 17 Sprite Card | --
// 18 Nosedevil Card | --
// 19 Heart of Vlad | 17
// 1A Tooth of Vlad | 18
// 1B Rib of Vlad | 19
// 1C Ring of Vlad | 1a
// 1D Eye of Vlad | 1b

const shopAddress = 0x47dbde0
const shopOffset = 0x64

const relicAddresses = [
  [ 0x47a5b66 ],
  [ 0x557535e ],
  [ 0x4aa4156 ],
  [ 0x526e6a8 ],
  [ 0x49d6596, 0x49d5d3e ],
  [ 0x4b6b9b4, 0x53f971c ],
  [ 0x54b1d5a ],
  [ 0x43c578a ],
  [ 0x5610db8, 0x561142c ],
  [ 0x4cfcb16 ],
  [ 0x4b6b946, 0x53f969a, 0x4b6b08a, 0x53f8e2e ],
  [ 0x48fd1fe, 0x48fe280 ],
  [ 0x48fc9ba ],
  [ 0x5610dc2, 0x561161a ],
  [ 0x4c34ee6 ],
  [ 0x47a5720, 0x47a5dd2 ],
  [ 0x47a321c ],
  [ 0x4c35174 ],
  [ 0x54b1d58 ],
  [ 0x5611958, 0x561127c ],
  [ 0x47a5784 ],
  [ 0x45ea95e ],
  [ 0x4aa3f76 ],
  [ 0x6306ab2, 0x4e335b4 ],
  [ 0x5051d52, 0x67d1630 ],
  [ 0x69d2b1e, 0x50fa914 ],
  [ 0x59bdb30, 0x59ee2e4 ],
  [ 0x4da65f2, 0x662263a ],
]

const relicIds = [
  0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
  0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f,
  0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x19,
  0x1a, 0x1b, 0x1c, 0x1d
]

const startingAreas = [ 0x04, 0x0a, 0x0b, 0x0f, 0x10 ]

function placeItem(ctx, item, data) {
  relicAddresses[item.locationIdx].forEach(function(address) {
    data[address] = relicIds[item.relicIdx]
  })
  // Fix shop menu
  if (item.locationIdx === 0x10) {
    data[shopAddress] = item.relicIdx + shopOffset
  }
  // Check abilities if possible
  if (relicIds[item.relicIdx] === 0x10) {
    ctx.abilities.jewelOfOpen = true
  } else if (relicIds[item.relicIdx] === 0xd) {
    ctx.abilities.leapStone = true
  } else if (relicIds[item.relicIdx] === 0x7) {
    ctx.abilities.mist = true
  } else if (relicIds[item.relicIdx] === 0x8) {
    ctx.abilities.powerOfMist = true
  } else if (relicIds[item.relicIdx] === 0xc) {
    ctx.abilities.gravityBoots = true
  } else if (relicIds[item.relicIdx] === 0x4) {
    ctx.abilities.wolf = true
  } else if (relicIds[item.relicIdx] === 0x0) {
    ctx.abilities.bat = true
  } else if (relicIds[item.relicIdx] === 0x2) {
    ctx.abilities.sonar = true
  } else if (relicIds[item.relicIdx] === 0x11) {
    ctx.abilities.mermanStatue = true
  }
  // Mark as used
  ctx.relics[item.relicIdx] = true
  ctx.locations[item.locationIdx] = true
}

function randIdx(array) {
  return Math.floor(Math.random() * array.length)
}

function pushAvailableLocation(ctx, locationsAvailable, locationIdx) {
  if (!ctx.locations[locationIdx]) {
    locationsAvailable.push(locationIdx)
  }
}

function softUnlock(ctx) {
  if (ctx.stackDepth++ === 64) {
    throw new Error('soft lock generated')
  }
  // List of available locations
  const gravityBootsChain = ctx.abilities.gravityBoots && ctx.abilities.leapStone
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
  let relicIdx
  // Get unplaced relic
  do relicIdx = randIdx(relicIds)
  while (ctx.relics[relicIdx])
  if (locationsAvailable.length === 0) {
    throw new Error('out of available locations')
  }
  if (locationsAvailable.length === 1) {
    // Only one location left?
    // Check to see if its the last item in the game
    // If not, give an item that will unlock more items
    // I need to actually think this through and place the correct items,
    // but this will do for now
    if (!ctx.abilities.jewelOfOpen) {
      relicIdx = 0x10
    } else if (!ctx.abilities.leapStone) {
      relicIdx = 0x0d
    } else if (!ctx.abilities.gravityBoots) {
      relicIdx = 0x0c
    } else if (!ctx.abilities.bat) {
      relicIdx = 0x00
    } else if (!ctx.abilities.mist) {
      relicIdx = 0x07
    } else if (!ctx.abilities.mermanStatue) {
      relicIdx = 0x11
    }
  }
  // Get free location
  let locationIdx
  do locationIdx = locationsAvailable[randIdx(locationsAvailable)]
  while (ctx.locations[locationIdx])
  // Items are never allowed in these locations
  switch (relicIds[relicIdx]) {
  case 0x07:
    if ([ 0x17, 0x18, 0x19, 0x1a, 0x1b, 0x00 ].indexOf(locationIdx) !== -1) {
      return softUnlock(ctx)
    }
    break
  case 0x10:
    if ([ 0x17, 0x18, 0x19, 0x1a, 0x1b,
          0x0d, 0x0e, 0x11, 0x15 ].indexOf(locationIdx) !== -1) {
      return softUnlock(ctx)
    }
    break
  case 0x11:
    if ([ 0x0e ].indexOf(locationIdx) !== -1) {
      return softUnlock(ctx)
    }
    break
  }
  return {relicIdx, locationIdx}
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
      relics: new Array(relicIds.length),
      locations: new Array(relicIds.length),
    }
    // Do some shuffling things, make sure things arent impossible to access
    // Make things always possible later
    // Place the rest of the items
    try {
      for (let i = 0; i < relicIds.length; i++) {
        const item = softUnlock(ctx)
        placeItem(ctx, item, data)
      }
      break
    } catch (e) {
      if (e.message !== 'soft lock generated'
          && e.message !== 'out of available locations') {
        console.error(e)
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
