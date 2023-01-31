(function(self) {

  const devBaseUrl = 'https://dev.sotn.io/'
  const defaultOptions = 'p:safe'

  const optionsUrls = {
    'p:safe': 'https://sotn.io/',
    'p:adventure': 'https://a.sotn.io/',
    'p:casual': 'https://c.sotn.io/',
    'p:speedrun': 'https://s.sotn.io/',
    'p:glitch': 'https://g.sotn.io/',
    'p:scavenger': 'https://sc.sotn.io/',
    'p:empty-hand': 'https://eh.sotn.io/',
    'p:og': 'https://og.sotn.io/',
    'p:gem-farmer': 'https://gf.sotn.io/',

    // Tournament mode URLs
    'tp:safe': 'https://t.sotn.io/',
    'tp:adventure': 'https://a.t.sotn.io/',
    'tp:casual': 'https://c.t.sotn.io/',
    'tp:speedrun': 'https://s.t.sotn.io/',
    'tp:glitch': 'https://g.t.sotn.io/',
    'tp:scavenger': 'https://sc.t.sotn.io/',
    'tp:empty-hand': 'https://eh.t.sotn.io/',
    'tp:og': 'https://og.t.sotn.io/',
    'tp:gem-farmer': 'https://gf.t.sotn.io/',
  }

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
    DRE:  6,  // Nightmare
    LIB:  7,  // Long Library
    NO0:  8,  // Marble Gallery
    NO1:  9,  // Outer Wall
    NO2:  10, // Olrox's Quarters
    NO3:  11, // Castle Entrance
    NP3:  12, // Castle Entrance (after visiting Alchemy Laboratory)
    NO4:  13, // Underground Caverns
    NZ0:  14, // Alchemy Laboratory
    NZ1:  15, // Clock Tower
    TOP:  16, // Castle Keep
    WRP:  17, // Warp rooms
    RARE: 18, // Reverse Colosseum
    RCAT: 19, // Floating Catacombs
    RCEN: 20, // Reverse Center Cube
    RCHI: 21, // Cave
    RDAI: 22, // Anti-Chapel
    RLIB: 23, // Forbidden Library
    RNO0: 24, // Black Marble Gallery
    RNO1: 25, // Reverse Outer Wall
    RNO2: 26, // Death Wing's Lair
    RNO3: 27, // Reverse Entrance
    RNO4: 28, // Reverse Caverns
    RNZ0: 29, // Necromancy Laboratory
    RNZ1: 30, // Reverse Clock Tower
    RTOP: 31, // Reverse Castle Keep
    RWRP: 32, // Reverse Warp rooms
    BO0:  33, // Olrox
    BO1:  34, // Legion
    BO2:  35, // Werewolf & Minotaur
    BO3:  36, // Scylla
    BO4:  37, // Doppleganger10
    BO5:  38, // Hippogryph
    BO6:  39, // Richter
    BO7:  40, // Cerberus
    RBO0: 41, // Trio
    RBO1: 42, // Beezlebub
    RBO2: 43, // Death
    RBO3: 44, // Medusa
    RBO4: 45, // Creature
    RBO5: 46, // Doppleganger40
    RBO6: 47, // Shaft/Dracula
    RBO7: 48, // Akmodan II
    RBO8: 49, // Galamoth
  }

  // List of zone strings for logging.
  const zoneNames = [
    'ST0',
    'ARE',
    'CAT',
    'CEN',
    'CHI',
    'DAI',
    'DRE',
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
    'WRP',
    'RARE',
    'RCAT',
    'RCEN',
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
    'RWRP',
    'BO0',
    'BO1',
    'BO2',
    'BO3',
    'BO4',
    'BO5',
    'BO6',
    'BO7',
    'RBO0',
    'RBO1',
    'RBO2',
    'RBO3',
    'RBO4',
    'RBO5',
    'RBO6',
    'RBO7',
    'RBO8',
  ]

  // Offsets in the bin of each zone file.
  const zones = [{
    id: ZONE.ST0,
    pos: 0x0533efc8,
    len: 271812,
    items: 0x0a60,
  }, {
    id: ZONE.ARE,
    pos: 0x043c2018,
    len: 352636,
    items: 0x0fe8,
  }, {
    id: ZONE.CAT,
    pos: 0x0448f938,
    len: 361920,
    items: 0x174c,
  }, {
    id: ZONE.CEN,
    pos: 0x0455bff8,
    len: 119916,
  }, {
    id: ZONE.CHI,
    pos: 0x045e8ae8,
    len: 193576,
    items: 0x09e4,
  }, {
    id: ZONE.DAI,
    pos: 0x04675f08,
    len: 373764,
    items: 0x0ec0,
  }, {
    id: ZONE.DRE,
    pos: 0x05af2478,
    len: 147456,
  }, {
    id: ZONE.LIB,
    pos: 0x047a1ae8,
    len: 348876,
    items: 0x1a90,
  }, {
    id: ZONE.NO0,
    pos: 0x048f9a38,
    len: 390540,
    items: 0x1100,
  }, {
    id: ZONE.NO1,
    pos: 0x049d18b8,
    len: 356452,
    items: 0x1a2c,
  }, {
    id: ZONE.NO2,
    pos: 0x04aa0438,
    len: 327100,
    items: 0x0fec,
  }, {
    id: ZONE.NO3,
    pos: 0x04b665e8,
    len: 359960,
    items: 0x1c8c,
  }, {
    id: ZONE.NP3,
    pos: 0x053f4708,
    len: 341044,
    items: 0x1618,
  }, {
    id: ZONE.NO4,
    pos: 0x04c307e8,
    len: 391260,
    items: 0x1928,
  }, {
    id: ZONE.NZ0,
    pos: 0x054b0c88,
    len: 309120,
    items: 0x13b0,
  }, {
    id: ZONE.NZ1,
    pos: 0x055724b8,
    len: 271168,
    items: 0x111c,
  }, {
    id: ZONE.TOP,
    pos: 0x0560e7b8,
    len: 247132,
    items: 0x0d10,
  }, {
    id: ZONE.WRP,
    pos: 0x05883408,
    len: 83968,
  }, {
    id: ZONE.RARE,
    pos: 0x057509e8,
    len: 234384,
    items: 0x0a3c,
  }, {
    id: ZONE.RCAT,
    pos: 0x04cfa0b8,
    len: 278188,
    items: 0x13c8,
  }, {
    id: ZONE.RCEN,
    pos: 0x056bd9e8,
    len: 186368,
  }, {
    id: ZONE.RCHI,
    pos: 0x04da4968,
    len: 174880,
    items: 0x07cc,
  }, {
    id: ZONE.RDAI,
    pos: 0x04e31458,
    len: 295736,
    items: 0x0d2c,
  }, {
    id: ZONE.RLIB,
    pos: 0x04ee2218,
    len: 201776,
    items: 0x0bc8,
  }, {
    id: ZONE.RNO0,
    pos: 0x04f84a28,
    len: 347020,
    items: 0x0f8c,
  }, {
    id: ZONE.RNO1,
    pos: 0x0504f558,
    len: 357020,
    items: 0x0ae4,
  }, {
    id: ZONE.RNO2,
    pos: 0x050f7948,
    len: 313816,
    items: 0x0d40,
  }, {
    id: ZONE.RNO3,
    pos: 0x051ac758,
    len: 304428,
    items: 0x0f10,
  }, {
    id: ZONE.RNO4,
    pos: 0x0526a868,
    len: 384020,
    items: 0x1620,
  }, {
    id: ZONE.RNZ0,
    pos: 0x05902278,
    len: 281512,
    items: 0x0cc8,
  }, {
    id: ZONE.RNZ1,
    pos: 0x059bb0d8,
    len: 260960,
    items: 0x0ec8,
    rewards: 0x2570,
  }, {
    id: ZONE.RTOP,
    pos: 0x057df998,
    len: 200988,
    items: 0x07c8,
  }, {
    id: ZONE.RWRP,
    pos: 0x05a6e358,
    len: 92160,
  }, {
    id: ZONE.BO0,
    pos: 0x05fa9dc8,
    len: 320948,
    rewards: 0x24d4,
  }, {
    id: ZONE.BO1,
    pos: 0x0606dab8,
    len: 205756,
    rewards: 0x1b98,
  }, {
    id: ZONE.BO2,
    pos: 0x060fca68,
    len: 223540,
    rewards: 0x181c,
  }, {
    id: ZONE.BO3,
    pos: 0x061a60b8,
    len: 210224,
    rewards: 0x1c60,
    items: 0x108c,
  }, {
    id: ZONE.BO4,
    pos: 0x06246d38,
    len: 347704,
    rewards: 0x42b0,
  }, {
    id: ZONE.BO5,
    pos: 0x06304e48,
    len: 218672,
    rewards: 0x18b8,
  }, {
    id: ZONE.BO6,
    pos: 0x063aa448,
    len: 333544,
    rewards: 0x2f90,
  }, {
    id: ZONE.BO7,
    pos: 0x066b32f8,
    len: 144480,
    rewards: 0x1440,
  }, {
    id: ZONE.RBO0,
    pos: 0x064705f8,
    len: 160988,
    rewards: 0x1988,
  }, {
    id: ZONE.RBO1,
    pos: 0x06590a18,
    len: 139104,
    rewards: 0x1550,
  }, {
    id: ZONE.RBO2,
    pos: 0x06620c28,
    len: 190792,
    rewards: 0x1788,
  }, {
    id: ZONE.RBO3,
    pos: 0x067422a8,
    len: 132656,
    rewards: 0x12a8,
  }, {
    id: ZONE.RBO4,
    pos: 0x067cfff8,
    len: 154660,
    rewards: 0x13b4,
  }, {
    id: ZONE.RBO5,
    pos: 0x06861468,
    len: 345096,
    rewards: 0x4348,
  }, {
    id: ZONE.RBO6,
    pos: 0x0692b668,
    len: 213060,
  }, {
    id: ZONE.RBO7,
    pos: 0x069d1598,
    len: 142572,
    rewards: 0x1300,
  }, {
    id: ZONE.RBO8,
    pos: 0x06a5f2e8,
    len: 161212,
    rewards: 0x2334,
  }]

  const exe = { pos: 0x0abb28, len: 703272 }
  const enemyListOff = 0xe90
  const enemyListLen = 292
  const enemyDataOff = 0x8900
  const enemyDataLen = 0x28
  const handEquipmentListOff = 0x4b04
  const handEquipmentListLen = 169
  const armorListOff = 0x7718
  const armorListLen = 26
  const helmetListOff = 0x7a58
  const helmetListLen = 22
  const cloakListOff = 0x7d18
  const cloakListLen = 9
  const accessoryListOff = 0x7e38
  const accessoryListLen = 33

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
    SPRITE_CARD: 't',
    NOSEDEVIL_CARD: 'n',
    HEART_OF_VLAD: 'A',
    TOOTH_OF_VLAD: 'T',
    RIB_OF_VLAD: 'R',
    RING_OF_VLAD: 'N',
    EYE_OF_VLAD: 'I',
    GOLD_RING: 'G',
    SILVER_RING: 'S',
    SPIKE_BREAKER: 'K',
    HOLY_GLASSES: 'H',
    THRUST_SWORD: 'D',
  }

  const tileIdOffset = 0x80

  // This is applied to helmet, armor, cloak, and other ids that are sold in
  // the librarian's shop menu or are in an equipment slot.
  const equipIdOffset = -0xa9

  // This is applied to equipment ids to get the inventory slot it occupies.
  const equipmentInvIdOffset = 0x798a

  const SLOT = {
    RIGHT_HAND: 'r',
    LEFT_HAND: 'l',
    HEAD: 'h',
    BODY: 'b',
    CLOAK: 'c',
    OTHER: 'o',
    OTHER2: 'o2',
    AXEARMOR: 'a',
    LUCK_MODE: 'x',
  }

  const slots = {
    'r':  0x097c00,
    'l':  0x097c04,
    'h':  0x097c08,
    'b':  0x097c0c,
    'c':  0x097c10,
    'o':  0x097c14,
    'o2': 0x097c18,
  }

  const EXTENSION = {
    GUARDED:   'guarded',
    EQUIPMENT: 'equipment',
    SPREAD:    'spread',
  }

  const defaultExtension = EXTENSION.GUARDED

  const LOCATION = {
    CRYSTAL_CLOAK:               'Crystal cloak',
    MORMEGIL:                    'Mormegil',
    DARK_BLADE:                  'Dark Blade',
    RING_OF_ARCANA:              'Ring of Arcana',
    TRIO:                        'Trio',
    HOLY_MAIL:                   'Holy mail',
    JEWEL_SWORD:                 'Jewel sword',
    BASILARD:                    'Basilard',
    SUNGLASSES:                  'Sunglasses',
    CLOTH_CAPE:                  'Cloth cape',
    MYSTIC_PENDANT:              'Mystic pendant',
    ANKH_OF_LIFE:                'Ankh of Life',
    MORNING_STAR:                'Morningstar',
    GOGGLES:                     'Goggles',
    SILVER_PLATE:                'Silver plate',
    CUTLASS:                     'Cutlass',
    PLATINUM_MAIL:               'Platinum mail',
    FALCHION:                    'Falchion',
    GOLD_PLATE:                  'Gold plate',
    BEKATOWA:                    'Bekatowa',
    GLADIUS:                     'Gladius',
    JEWEL_KNUCKLES:              'Jewel knuckles',
    HOLY_ROD:                    'Holy rod',
    LIBRARY_ONYX:                'Library Onyx',
    BRONZE_CUIRASS:              'Bronze cuirass',
    ALUCART_SWORD:               'Alucart sword',
    BROADSWORD:                  'Broadsword',
    ESTOC:                       'Estoc',
    OLROX_GARNET:                'Olrox Garnet',
    BLOOD_CLOAK:                 'Blood cloak',
    SHIELD_ROD:                  'Shield rod',
    KNIGHT_SHIELD:               'Knight shield',
    HOLY_SWORD:                  'Holy sword',
    BANDANNA:                    'Bandanna',
    SECRET_BOOTS:                'Secret boots',
    NUNCHAKU:                    'Nunchaku',
    KNUCKLE_DUSTER:              'Knuckle duster',
    CAVERNS_ONYX:                'Caverns Onyx',
    COMBAT_KNIFE:                'Combat knife',
    RING_OF_ARES:                'Ring of Ares',
    BLOODSTONE:                  'Bloodstone',
    ICEBRAND:                    'Icebrand',
    WALK_ARMOR:                  'Walk armor',
    BERYL_CIRCLET:               'Beryl circlet',
    TALISMAN:                    'Talisman',
    KATANA:                      'Katana',
    GODDESS_SHIELD:              'Goddess shield',
    TWILIGHT_CLOAK:              'Twilight cloak',
    TALWAR:                      'Talwar',
    SWORD_OF_DAWN:               'Sword of Dawn',
    BASTARD_SWORD:               'Bastard sword',
    ROYAL_CLOAK:                 'Royal cloak',
    LIGHTNING_MAIL:              'Lightning mail',
    MOON_ROD:                    'Moon rod',
    SUNSTONE:                    'Sunstone',
    LUMINUS:                     'Luminus',
    DRAGON_HELM:                 'Dragon helm',
    SHOTEL:                      'Shotel',
    STAUROLITE:                  'Staurolite',
    BADELAIRE:                   'Badelaire',
    FORBIDDEN_LIBRARY_OPAL:      'Forbidden Library Opal',
    REVERSE_CAVERNS_DIAMOND:     'Reverse Caverns Diamond',
    REVERSE_CAVERNS_OPAL:        'Reverse Caverns Opal',
    REVERSE_CAVERNS_GARNET:      'Reverse Caverns Garnet',
    OSAFUNE_KATANA:              'Osafune katana',
    ALUCARD_SHIELD:              'Alucard shield',
    ALUCARD_SWORD:               'Alucard sword',
    NECKLACE_OF_J:               'Necklace of J',
    FLOATING_CATACOMBS_DIAMOND:  'Floating Catacombs Diamond',
    SWORD_OF_HADOR:              'Sword of Hador',
    ALUCARD_MAIL:                'Alucard mail',
    GRAM:                        'Gram',
    FURY_PLATE:                  'Fury plate',
  }

  const GLOBAL_DROP = 'Global'
  const globalDropsCount = 32

  const WORKER_ACTION = {
    STATS:     1,
    RELICS:    2,
    ITEMS:     3,
    FINALIZE:  4,
  }

  const MUSIC = {
    LOST_PAINTING: 0x01,          // Lost Painting
    CURSE_ZONE: 0x03,             // Curse Zone
    REQUIEM_FOR_THE_GODS: 0x05,   // Requiem for the Gods
    RAINBOW_CEMETARY: 0x07,       // Rainbow Cemetary
    WOOD_CARVING_PARTITA: 0x09,   // Wood Carving Partita
    CRYSTAL_TEARDROPS: 0x0b,      // Crystal Teardrops
    MARBLE_GALLERY: 0x0d,         // Marble Gallery
    DRACULAS_CASTLE: 0x0f,        // Dracula's Castle
    THE_TRAGIC_PRINCE: 0x11,      // The Tragic Prince
    TOWER_OF_MIST: 0x13,          // Tower of Mist
    DOOR_OF_HOLY_SPIRITS: 0x15,   // Door of Holy Spirits
    DANCE_OF_PALES: 0x17,         // Dance of Pales
    ABANDONED_PIT: 0x19,          // Abandoned Pit
    HEAVENLY_DOORWAY: 0x1b,       // Heavenly Doorway
    FESTIVAL_OF_SERVANTS: 0x1d,   // Festival of Servants
    WANDERING_GHOSTS: 0x23,       // Wandering Ghosts
    THE_DOOR_TO_THE_ABYSS: 0x25,  // The Door to the Abyss
    DANCE_OF_GOLD: 0x2e,          // Dance of Gold
    ENCHANTED_BANQUET: 0x30,      // Enchanted Banquet
    DEATH_BALLAD: 0x34,           // Death Ballad
    FINAL_TOCCATA: 0x38,          // Final Tocatta
    // DANCE_OF_ILLUSIONS: 0x1f,  // Dance of Illusions
    // PROLOGUE: 0x21,            // Prologue
    // METAMORPHOSIS: 0x27,       // Metamorphosis
    // METAMORPHOSIS_II: 0x28,    // Metamorphosis II
    // METAMORPHOSIS_III: 0x29,   // Metamorphosis III
    // HOWLING_WIND: 0x2a,        // Howling Wind
    // PRAYER: 0x32,              // Prayer
    // BLOOD_RELATIONS: 0x36,     // Blood Relations
    // BLACK_BANQUET: 0x3a,       // Black Banquet
    // I_AM_THE_WIND: 0x3c,       // I Am the Wind
    // SILENCE: 0x3d,             // Silence
    // LAND_OF_BENEDICTION: 0x3e, // Land of Benediction
    // NOCTURNE: 0x3f,            // Nocturne
    // MOONLIGHT_NOCTURNE: 0x40,  // Moonlight Nocturne
    // SPOKEN: 0x41,
    // SPOKEN: 0x42,
  }

  const HAND_TYPE = {
    SHORT_SWORD: 0x00,
    SWORD: 0x01,
    THROWING_SWORD: 0x02,
    FIST: 0x03,
    CLUB: 0x04,
    TWO_HANDED_SWORD: 0x05,
    FOOD: 0x06,
    DAMAGE_CONSUMABLE: 0x07,
    PROJECTILE_CONSUMABLE: 0x08,
    SHIELD: 0x09,
    OTHER: 0x0a,
  }

  const handTypeNames = [
    'SHORT_SWORD',
    'SWORD',
    'THROWING_SWORD',
    'FIST',
    'BLUNT_WEAPON',
    'TWO_HANDED_SWORD',
    'FOOD',
    'DAMAGE_CONSUMABLE',
    'PROJECTILE_CONSUMABLE',
    'SHIELD',
    'OTHER',
  ]

  const characterMap = {
    ',': [ 0x81, 0x43 ],
    '.': [ 0x81, 0x44 ],
    ':': [ 0x81, 0x46 ],
    ';': [ 0x81, 0x47 ],
    '?': [ 0x81, 0x48 ],
    '!': [ 0x81, 0x49 ],
    '`': [ 0x81, 0x4d ],
    '"': [ 0x81, 0x4e ],
    '^': [ 0x81, 0x4f ],
    '_': [ 0x81, 0x51 ],
    '~': [ 0x81, 0x60 ],
    '\'': [ 0x81, 0x66 ],
    '(': [ 0x81, 0x69 ],
    ')': [ 0x81, 0x6a ],
    '[': [ 0x81, 0x6d ],
    ']': [ 0x81, 0x6e ],
    '{': [ 0x81, 0x6f ],
    '}': [ 0x81, 0x70 ],
    '+': [ 0x81, 0x7b ],
    '-': [ 0x81, 0x7c ],
    '%': [ 0x81, 0x93 ],
    '0': [ 0x82, 0x4f ],
    '1': [ 0x82, 0x50 ],
    '2': [ 0x82, 0x51 ],
    '3': [ 0x82, 0x52 ],
    '4': [ 0x82, 0x53 ],
    '5': [ 0x82, 0x54 ],
    '6': [ 0x82, 0x55 ],
    '7': [ 0x82, 0x56 ],
    '8': [ 0x82, 0x57 ],
    '9': [ 0x82, 0x58 ],
  }

  const digest =
        'ce01203a9df93e001b88ef4c350889c19f11ffba89d20f214bdd8dec0b2d8d7c'

  const exports = {
    devBaseUrl: devBaseUrl,
    defaultOptions: defaultOptions,
    optionsUrls: optionsUrls,
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
    handEquipmentListOff: handEquipmentListOff,
    handEquipmentListLen: handEquipmentListLen,
    armorListOff: armorListOff,
    armorListLen: armorListLen,
    helmetListOff: helmetListOff,
    helmetListLen: helmetListLen,
    cloakListOff: cloakListOff,
    cloakListLen: cloakListLen,
    accessoryListOff: accessoryListOff,
    accessoryListLen: accessoryListLen,
    RELIC: RELIC,
    tileIdOffset: tileIdOffset,
    equipIdOffset: equipIdOffset,
    equipmentInvIdOffset: equipmentInvIdOffset,
    SLOT: SLOT,
    slots: slots,
    EXTENSION: EXTENSION,
    defaultExtension: defaultExtension,
    LOCATION: LOCATION,
    GLOBAL_DROP: GLOBAL_DROP,
    globalDropsCount: globalDropsCount,
    MUSIC: MUSIC,
    HAND_TYPE: HAND_TYPE,
    handTypeNames: handTypeNames,
    WORKER_ACTION: WORKER_ACTION,
    characterMap: characterMap,
    digest: digest,
  }
  if (self) {
    self.sotnRando = Object.assign(self.sotnRando || {}, {
      constants: exports,
    })
  } else {
    module.exports = exports
  }
})(typeof(self) !== 'undefined' ? self : null)
