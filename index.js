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
// need to trace relics from left/right as well as up/down because of how sotn loads entities
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
// 02 Echo of Bat | 02 | Castle 2 | 18 19 1a 1b 1c
// 03 Force of Echo | 03
// 04 Soul of Wolf | 04
// 05 Power of Wolf | 05
// 06 Skill of Wolf | 06
// 07 Form of Mist | 07 | Castle 2, Mist Gates | 18 19 1a 1b 1c 00
// 08 Power of Mist | 08
// 09 Gas Cloud | 09
// 0A Cube of Zoe | 0a
// 0B Spirit Orb | 0b
// 0C Gravity Boots | 0c
// 0D Leap Stone | 0d
// 0E Holy Symbol | 0e
// 0F Faerie Scroll | 0f
// 10 Jewel of Open | 10 | Castle 2, Jewel Doors | 18 19 1a 1b 1c 0d 0e 11 15
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

const relicAddresses = [
  [ 0x047a5b66 ],
  [ 0x0557535e ],
  [ 0x04aa4156 ],
  [ 0x0526e6a8 ],
  [ 0x049d6596 ],
  [ 0x04b6b9b4, 0x053f971c ],
  [ 0x054b1d5a ],
  [ 0x043c578a ],
  [ 0x05610db8, 0x0561142c ],
  [ 0x04cfcb16 ],
  [ 0x04b6b946, 0x053f969a, 0x04b6b08a, 0x053f8e2e ],
  [ 0x048fd1fe, 0x048fe280 ],
  [ 0x048fc9ba ],
  [ 0x05610dc2 ],
  [ 0x04c34ee6 ],
  [ 0x047a5720 ],
  [ 0x047a321c ],
  [ 0x04c35174 ],
  [ 0x054b1d58 ],
  [ 0x05611958, 0x0561127c ],
  [ 0x047a5784 ],
  [ 0x045ea95e ],
  [ 0x04aa3f76 ],
  [ 0x06306ab2, 0x04e335b4 ],
  [ 0x05051d52, 0x067d1630 ],
  [ 0x069d2b1e, 0x050fa914 ],
  [ 0x059bdb30, 0x059ee2e4 ],
  [ 0x04da65f2, 0x0662263a ],
]

const locationIds = [
  0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
  0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f,
  0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x19,
  0x1a, 0x1b, 0x1c, 0x1d
]

const startingAreas = [ 0x04, 0x0a, 0x0b, 0x0f, 0x10 ]

function placeItem(ctx, item, data) {
  relicAddresses[item.locationIdx].forEach(function(address) {
    data[address] = locationIds[item.relicIdx]
  })
  // Check abilities if possible
  if (locationIds[item.relicIdx] == 0x10) {
    ctx.abilities.jewelOfOpen = true
  } else if (locationIds[item.relicIdx] == 0xd) {
    ctx.abilities.leapStone = true
  } else if (locationIds[item.relicIdx] == 0x7) {
    ctx.abilities.mist = true
  } else if (locationIds[item.relicIdx] == 0x8) {
    ctx.abilities.powerOfMist = true
  } else if (locationIds[item.relicIdx] == 0xc) {
    ctx.abilities.gravityBoots = true
  } else if (locationIds[item.relicIdx] == 0x4) {
    ctx.abilities.wolf = true
  } else if (locationIds[item.relicIdx] == 0x0) {
    ctx.abilities.bat = true
  } else if (locationIds[item.relicIdx] == 0x2) {
    ctx.abilities.sonar = true
  } else if (locationIds[item.relicIdx] == 0x11) {
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
  if (ctx.stackDepth++ == 64) {
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
  if (ctx.abilities.mist && (ctx.abilities.leapStone || ctx.abilities.gravityBoots || ctx.abilities.bat)) {
    // Soul of Bat Vanilla
    [ 0x00 ].forEach(push)
  }
  if (ctx.abilities.bat || gravityBootsChain || mistFlight) {
    // Flight only
    [ 0x01, 0x05, 0x08, 0x0c, 0x13, 0x16 ].forEach(push)
  }
  if ((ctx.abilities.bat || mistFlight || gravityBootsChain)
      && (ctx.abilities.mist || ctx.abilities.wolf || ctx.abilities.bat)) {
    // Olrox's Prize
    [ 0x02 ].forEach(push)
  }
  if (ctx.abilities.gravityBoots || ctx.abilities.bat || mistFlight) {
    // Gravity Boots or better
    [ 0x06, 0x12, 0x14 ].forEach(push)
  }
  if (ctx.abilities.leapStone || ctx.abilities.gravityBoots || ctx.abilities.bat || mistFlight) {
    // Leapstone or better
    // Colosseum - only required if leap stone?
    [ 0x07, 0x0d ].forEach(push)
  }
  if (ctx.abilities.jewelOfOpen) {
    // Bottom of the castle
    [ 0x11 ].forEach(push)
  }
  if ((ctx.abilities.jewelOfOpen && ctx.abilities.leapStone) || ctx.abilities.bat || mistFlight) {
    // Demon card a bitch (setz' words, not mine -mouse)
    [ 0x15 ].forEach(push)
  }
  if (ctx.abilities.mermanStatue && ctx.abilities.jewelOfOpen) {
    // Holy snorkel vanilla
    [ 0x0e ].forEach(push)
  }
  if (ctx.abilities.jewelOfOpen && ctx.abilities.mist
      && (ctx.abilities.bat || ctx.abilities.powerOfMist || gravityBootsChain)
      && (ctx.abilities.powerOfMist || ctx.abilities.sonar)) {
    // Castle 2 - Flight, Mist, Jewel of Open, and sonar or power of mist
    [ 0x03, 0x09, 0x17, 0x18, 0x19, 0x1a, 0x1b ].forEach(push)
  }
  let relicIdx
  // Get unplaced relic
  do relicIdx = randIdx(locationIds)
  while (ctx.relics[relicIdx])
  if (locationsAvailable.length == 0) {
    throw new Error('out of available locations')
  }
  if (locationsAvailable.length == 1) {
    // Only one location left?
    // Check to see if its the last item in the game
    // If not, give an item that will unlock more items
    // I need to actually think this through and place the correct items, but this will do for now
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
  switch (locationIds[relicIdx]) {
  case 0x02:
    if ([ 0x18, 0x19, 0x1a, 0x1b, 0x1c ].indexOf(locationIdx) !== -1) {
      return softUnlock(ctx)
    }
    break
  case 0x07:
    if ([ 0x18, 0x19, 0x1a, 0x1b, 0x1c, 0x00 ].indexOf(locationIdx) !== -1) {
      return softUnlock(ctx)
    }
    break
  case 0x10:
    if ([ 0x18, 0x19, 0x1a, 0x1b, 0x1c, 0x0d, 0x0e, 0x11, 0x15 ].indexOf(locationIdx) !== -1) {
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
      relics: new Array(locationIds.length),
      locations: new Array(locationIds.length),
    }
    // Do some shuffling things, make sure things arent impossible to access
    // Make things always possible later
    // Place the rest of the items
    try {
      for (let i = 0; i < locationIds.length; i++) {
        const item = softUnlock(ctx)
        placeItem(ctx, item, data)
      }
      break
    } catch (e) {
      console.warn(e)
    }
  }
}
