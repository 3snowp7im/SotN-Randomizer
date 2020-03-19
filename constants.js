(function(self) {

  const releaseBaseUrl = 'https://sotn.io/'
  const devBaseUrl = 'https://dev.sotn.io/'
  const defaultOptions = 'P:safe'

  const TYPE = {
    HEART: 0,
    GOLD: 1,
    SUBWEAPON: 2,
    POWERUP: 3,
    WEAPON1: 4,
    WEAPON2: 5,
    SHIELD: 6,
    HELMET: 7,
    ARMOR: 8,
    CLOAK: 9,
    ACCESSORY: 10,
    USABLE: 11,
  }

  // List of type names for logging.
  const typeNames = [
    'HEART',
    'GOLD',
    'SUBWEAPON',
    'POWERUP',
    'WEAPON1',
    'WEAPON2',
    'SHIELD',
    'HELMET',
    'ARMOR',
    'CLOAK',
    'ACCESSORY',
    'USABLE',
  ]

  const ZONE = {
    ST0:  0,  // Final Stage: Bloodlines
    ARE:  1,  // Colosseum
    CAT:  2,  // Catacombs
    CEN:  3,  // Center Cube
    CHI:  4,  // Abandoned Mine
    DAI:  5,  // Royal Chapel
    LIB:  6,  // Long Library
    NO0:  7,  // Marble Gallery
    NO1:  8,  // Outer Wall
    NO2:  9,  // Olrox's Quarters
    NO3:  10, // Castle Entrance
    NP3:  11, // Castle Entrance (after visiting Alchemy Laboratory)
    NO4:  12, // Underground Caverns
    NZ0:  13, // Alchemy Laboratory
    NZ1:  14, // Clock Tower
    TOP:  15, // Castle Keep
    RARE: 16, // Reverse Colosseum
    RCAT: 17, // Floating Catacombs
    RCHI: 18, // Cave
    RDAI: 19, // Anti-Chapel
    RLIB: 20, // Forbidden Library
    RNO0: 21, // Black Marble Gallery
    RNO1: 22, // Reverse Outer Wall
    RNO2: 23, // Death Wing's Lair
    RNO3: 24, // Reverse Entrance
    RNO4: 25, // Reverse Caverns
    RNZ0: 26, // Necromancy Laboratory
    RNZ1: 27, // Reverse Clock Tower
    RTOP: 28, // Reverse Castle Keep
  }

  // List of zone strings for logging.
  const zoneNames = [
    'ST0',
    'ARE',
    'CAT',
    'CEN',
    'CHI',
    'DAI',
    'LIB',
    'NO0',
    'NO1',
    'NO2',
    'NO3',
    'NP3',
    'NO4',
    'NZ0',
    'NZ1',
    'TOP',
    'RARE',
    'RCAT',
    'RCHI',
    'RDAI',
    'RLIB',
    'RNO0',
    'RNO1',
    'RNO2',
    'RNO3',
    'RNO4',
    'RNZ0',
    'RNZ1',
    'RTOP',
  ]

  // Offsets in the bin of each zone file.
  const zones = [{
    // ZONE.ST0
    pos: 0x0533efc8, len: 271812, items: 0x0a60,
  }, {
    // ZONE.ARE
    pos: 0x043c2018, len: 352636, items: 0x0fe8,
  }, {
    // ZONE.CAT
    pos: 0x0448f938, len: 361920, items: 0x174c,
  }, {
    // ZONE.CEN
    pos: 0x0455bff8, len: 119916,
  }, {
    // ZONE.CHI
    pos: 0x045e8ae8, len: 193576, items: 0x09e4,
  }, {
    // ZONE.DAI
    pos: 0x04675f08, len: 373764, items: 0x0ec0,
  }, {
    // ZONE.LIB
    pos: 0x047a1ae8, len: 348876, items: 0x1a90,
  }, {
    // ZONE.NO0
    pos: 0x048f9a38, len: 390540, items: 0x1100,
  }, {
    // ZONE.NO1
    pos: 0x049d18b8, len: 356452, items: 0x1a2c,
  }, {
    // ZONE.NO2
    pos: 0x04aa0438, len: 327100, items: 0x0fec,
  }, {
    // ZONE.NO3
    pos: 0x04b665e8, len: 359960, items: 0x1c8c,
  }, {
    // ZONE.NP3
    pos: 0x053f4708, len: 341044, items: 0x1618,
  }, {
    // ZONE.NO4
    pos: 0x04c307e8, len: 391260, items: 0x1928,
  }, {
    // ZONE.NZ0
    pos: 0x054b0c88, len: 309120, items: 0x13b0,
  }, {
    // ZONE.NZ1
    pos: 0x055724b8, len: 271168, items: 0x111c,
  }, {
    // ZONE.TOP
    pos: 0x0560e7b8, len: 247132, items: 0x0d10,
  }, {
    // ZONE.RARE
    pos: 0x057509e8, len: 234384, items: 0x0a3c,
  }, {
    // ZONE.RCAT
    pos: 0x04cfa0b8, len: 278188, items: 0x13c8,
  }, {
    // ZONE.RCHI
    pos: 0x04da4968, len: 174880, items: 0x07cc,
  }, {
    // ZONE.RDAI
    pos: 0x04e31458, len: 295736, items: 0x0d2c,
  }, {
    // ZONE.RLIB
    pos: 0x04ee2218, len: 201776, items: 0x0bc8,
  }, {
    // ZONE.RNO0
    pos: 0x04f84a28, len: 347020, items: 0x0f8c,
  }, {
    // ZONE.RNO1
    pos: 0x0504f558, len: 357020, items: 0x0ae4,
  }, {
    // ZONE.RNO2
    pos: 0x050f7948, len: 313816, items: 0x0d40,
  }, {
    // ZONE.RNO3
    pos: 0x051ac758, len: 304428, items: 0x0f10,
  }, {
    // ZONE.RNO4
    pos: 0x0526a868, len: 384020, items: 0x1620,
  }, {
    // ZONE.RNZ0
    pos: 0x05902278, len: 281512, items: 0x0cc8,
  }, {
    // ZONE.RNZ1
    pos: 0x059bb0d8, len: 260960, items: 0x0ec8, rewards: 0x2570,
  }, {
    // ZONE.RTOP
    pos: 0x057df998, len: 200988, items: 0x07c8,
  }]

  const exe = { pos: 0x0abb28, len: 703272 }
  const enemyListOff = 0xe90
  const enemyListLen = 292
  const enemyDataOff = 0x8900
  const enemyDataLen = 0x28

  const RELIC = {
    SOUL_OF_BAT: 'B',
    FIRE_OF_BAT: 'f',
    ECHO_OF_BAT: 'E',
    FORCE_OF_ECHO: 'e',
    SOUL_OF_WOLF: 'W',
    POWER_OF_WOLF: 'p',
    SKILL_OF_WOLF: 's',
    FORM_OF_MIST: 'M',
    POWER_OF_MIST: 'P',
    GAS_CLOUD: 'c',
    CUBE_OF_ZOE: 'z',
    SPIRIT_ORB: 'o',
    GRAVITY_BOOTS: 'V',
    LEAP_STONE: 'L',
    HOLY_SYMBOL: 'y',
    FAERIE_SCROLL: 'l',
    JEWEL_OF_OPEN: 'J',
    MERMAN_STATUE: 'U',
    BAT_CARD: 'b',
    GHOST_CARD: 'g',
    FAERIE_CARD: 'a',
    DEMON_CARD: 'd',
    SWORD_CARD: 'w',
    HEART_OF_VLAD: 'h',
    TOOTH_OF_VLAD: 't',
    RIB_OF_VLAD: 'r',
    RING_OF_VLAD: 'n',
    EYE_OF_VLAD: 'i',
    GOLD_RING: 'G',
    SILVER_RING: 'S',
    SPIKE_BREAKER: 'K',
    HOLY_GLASSES: 'H',
  }

  const tileIdOffset = 0x80

  // This is applied to helmet, armor, cloak, and other ids that are sold in
  // the librarian's shop menu or are in an equipment slot.
  const equipIdOffset = -0xa9

  const SLOT = {
    RIGHT_HAND: 'r',
    LEFT_HAND: 'l',
    HEAD: 'h',
    BODY: 'b',
    CLOAK: 'c',
    OTHER: 'o',
    AXEARMOR: 'a',
    LUCK_MODE: 'x',
  }

  const BOSS = {
    BO0: 0,   // Olrox
    BO1: 1,   // Legion
    BO2: 2,   // Werewolf & Minotaur
    BO3: 3,   // Scylla
    BO4: 4,   // Doppleganger10
    BO5: 5,   // Hippogryph
    BO6: 6,   // Richter
    BO7: 7,   // Cerberus
    RBO0: 8,  // Trio
    RBO1: 9,  // Beezlebub
    RBO2: 10, // Death
    RBO3: 11, // Medusa
    RBO4: 12, // Creature
    RBO5: 13, // Doppleganger40
    RBO6: 14, // Shaft/Dracula
    RBO7: 15, // Akmodan
    RBO8: 16, // Galamoth
  }

  const bosses = [{
    // BO0
    pos: 0x05fa9dc8, len: 320948, rewards: 0x24d4,
  }, {
    // BO1
    pos: 0x0606dab8, len: 205756, rewards: 0x1b98,
  }, {
    // BO2
    pos: 0x060fca68, len: 223540, rewards: 0x181c,
  }, {
    // BO3
    pos: 0x061a60b8, len: 210224, rewards: 0x1c60, items: 0x108c,
  }, {
    // BO4
    pos: 0x06246d38, len: 347704, rewards: 0x42b0,
  }, {
    // BO5
    pos: 0x06304e48, len: 218672, rewards: 0x18b8,
  }, {
    // BO6
    pos: 0x063aa448, len: 333544, rewards: 0x2f90,
  }, {
    // BO7
    pos: 0x066b32f8, len: 144480, rewards: 0x1440,
  }, {
    // RBO0
    pos: 0x064705f8, len: 160988, rewards: 0x1988,
  }, {
    // RBO1
    pos: 0x06590a18, len: 139104, rewards: 0x1550,
  }, {
    // RBO2
    pos: 0x06620c28, len: 190792, rewards: 0x1788,
  }, {
    // RBO3
    pos: 0x067422a8, len: 132656, rewards: 0x12a8,
  }, {
    // RBO4
    pos: 0x067cfff8, len: 154660, rewards: 0x13b4,
  }, {
    // RBO5
    pos: 0x06861468, len: 345096, rewards: 0x4348,
  }, {
    // RBO6
    pos: 0x0692b668, len: 213060,
  }, {
    // RBO7
    pos: 0x069d1598, len: 142572, rewards: 0x1300,
  }, {
    // RBO8
    pos: 0x06a5f2e8, len: 161212, rewards: 0x2334,
  }]

  const EXTENSION = {
    GUARDED: 'guarded',
  }

  const defaultExtension = EXTENSION.GUARDED

  const LOCATION = {
    SCYLLA:          'Scylla',
    GRANFALLOON:     'Granfalloon',
    DOPPLEGANGER40:  'Doppleganger 40',
    BEEZLEBUB:       'Beezlebub',
  }

  const exports = {
    releaseBaseUrl: releaseBaseUrl,
    devBaseUrl: devBaseUrl,
    defaultOptions: defaultOptions,
    TYPE: TYPE,
    typeNames: typeNames,
    ZONE: ZONE,
    zoneNames: zoneNames,
    zones: zones,
    exe: exe,
    enemyListOff: enemyListOff,
    enemyListLen: enemyListLen,
    enemyDataOff: enemyDataOff,
    enemyDataLen: enemyDataLen,
    RELIC: RELIC,
    tileIdOffset: tileIdOffset,
    equipIdOffset: equipIdOffset,
    SLOT: SLOT,
    BOSS: BOSS,
    bosses: bosses,
    EXTENSION: EXTENSION,
    defaultExtension: defaultExtension,
    LOCATION: LOCATION,
  }
  if (self) {
    self.sotnRando = Object.assign(self.sotnRando || {}, {
      constants: exports,
    })
  } else {
    module.exports = exports
  }
})(typeof(self) !== 'undefined' ? self : null)
