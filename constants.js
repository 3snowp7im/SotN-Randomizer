(function(self) {

  const defaultOptions = 'eiptdr'

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
    CHI:  3,  // Abandoned Mine
    DAI:  4,  // Royal Chapel
    LIB:  5,  // Long Library
    NO0:  6,  // Marble Gallery
    NO1:  7,  // Outer Wall
    NO2:  8,  // Olrox's Quarters
    NO3:  9,  // Castle Entrance
    NP3:  10, // Castle Entrance (after visiting Alchemy Laboratory)
    NO4:  11, // Underground Caverns
    NZ0:  12, // Alchemy Laboratory
    NZ1:  13, // Clock Tower
    TOP:  14, // Castle Keep
    RARE: 15, // Reverse Colosseum
    RCAT: 16, // Floating Catacombs
    RCHI: 17, // Cave
    RDAI: 18, // Anti-Chapel
    RLIB: 19, // Forbidden Library
    RNO0: 20, // Black Marble Gallery
    RNO1: 21, // Reverse Outer Wall
    RNO2: 22, // Death Wing's Lair
    RNO3: 23, // Reverse Entrance
    RNO4: 24, // Reverse Caverns
    RNZ0: 25, // Necromancy Laboratory
    RNZ1: 26, // Reverse Clock Tower
    RTOP: 27, // Reverse Castle Keep
  }

  // List of zone strings for logging.
  const zoneNames = [
    'ST0',
    'ARE',
    'CAT',
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
    pos: 0x0533efc8, len: 271812,
  }, {
    // ZONE.ARE
    pos: 0x043c2018, len: 352636,
  }, {
    // ZONE.CAT
    pos: 0x0448f938, len: 361920,
  }, {
    // ZONE.CHI
    pos: 0x045e8ae8, len: 193576,
  }, {
    // ZONE.DAI
    pos: 0x04675f08, len: 373764,
  }, {
    // ZONE.LIB
    pos: 0x047a1ae8, len: 348876,
  }, {
    // ZONE.NO0
    pos: 0x048f9a38, len: 390540,
  }, {
    // ZONE.NO1
    pos: 0x049d18b8, len: 356452,
  }, {
    // ZONE.NO2
    pos: 0x04aa0438, len: 327100,
  }, {
    // ZONE.NO3
    pos: 0x04b665e8, len: 359960,
  }, {
    // ZONE.NP3
    pos: 0x053f4708, len: 341044,
  }, {
    // ZONE.NO4
    pos: 0x04c307e8, len: 391260,
  }, {
    // ZONE.NZ0
    pos: 0x054b0c88, len: 309120,
  }, {
    // ZONE.NZ1
    pos: 0x055724b8, len: 271168,
  }, {
    // ZONE.TOP
    pos: 0x0560e7b8, len: 247132,
  }, {
    // ZONE.RARE
    pos: 0x057509e8, len: 234384,
  }, {
    // ZONE.RCAT
    pos: 0x04cfa0b8, len: 278188,
  }, {
    // ZONE.RCHI
    pos: 0x04da4968, len: 174880,
  }, {
    // ZONE.RDAI
    pos: 0x04e31458, len: 295736,
  }, {
    // ZONE.RLIB
    pos: 0x04ee2218, len: 201776,
  }, {
    // ZONE.RNO0
    pos: 0x04f84a28, len: 347020,
  }, {
    // ZONE.RNO1
    pos: 0x0504f558, len: 357020,
  }, {
    // ZONE.RNO2
    pos: 0x050f7948, len: 313816,
  }, {
    // ZONE.RNO3
    pos: 0x051ac758, len: 304428,
  }, {
    // ZONE.RNO4
    pos: 0x0526a868, len: 384020,
  }, {
    // ZONE.RNZ0
    pos: 0x05902278, len: 281512,
  }, {
    // ZONE.RNZ1
    pos: 0x059bb0d8, len: 260960,
  }, {
    // ZONE.RTOP
    pos: 0x057df998, len: 200988,
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
    GRAVITY_BOOTS: 'G',
    LEAP_STONE: 'L',
    HOLY_SYMBOL: 'y',
    FAERIE_SCROLL: 'l',
    JEWEL_OF_OPEN: 'J',
    MERMAN_STATUE: 'S',
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
  }

  const tileIdOffset = 0x80

  const exports = {
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
    tileIdOffset: 0x80,
  }
  if (self) {
    self.sotnRando = Object.assign(self.sotnRando || {}, {
      constants: exports,
    })
  } else {
    module.exports = exports
  }
})(typeof(self) !== 'undefined' ? self : null)
