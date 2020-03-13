(function(self) {

  let constants
  if (self) {
    constants = self.sotnRando.constants
  } else {
    constants = require('./constants')
  }
  const ZONE = constants.ZONE
  const EXTENSION = constants.EXTENSION
  const LOCATION = constants.LOCATION
  const TYPE = constants.TYPE

  const locations = [{
    name: LOCATION.SCYLLA,
    extension: EXTENSION.GUARDED,
    item: {
      // Crystal Cloak
      type: TYPE.CLOAK,
      id: 221,
      tileIndexes: [ 0 ],
    },
    entities: [{
      zone: ZONE.NO4,
      addresses: [ 0x04c3425a, 0x04c35542 ],
      y: 0x00a0,
    }, {
      zone: ZONE.BO3,
      addresses: [ 0x061a828a, 0x061a857e ],
      y: 0x00a0,
    }],
  }, {
    name: LOCATION.GRANFALLOON,
    extension: EXTENSION.GUARDED,
    item: {
      // Mormegil
      type: TYPE.WEAPON1,
      id: 110,
      tileIndexes: [ 0 ],
    },
    entities: [{
      zone: ZONE.CAT,
      addresses: [ 0x04492b2a, 0x0449353a ],
      y: 0x0098,
    }],
  }, {
    name: LOCATION.DOPPLEGANGER40,
    extension: EXTENSION.GUARDED,
    item: {
      // Dark Blade
      type: TYPE.WEAPON1,
      id: 118,
      tileIndexes: [ 0 ],
    },
    entities: [{
      zone: ZONE.RNO4,
      addresses: [ 0x0526e024, 0x0526f0a4 ],
      y: 0x0080,
    }],
  }, {
    name: LOCATION.BEEZLEBUB,
    extension: EXTENSION.GUARDED,
    item: {
      // Ring of Arcana
      type: TYPE.ACCESSORY,
      id: 244,
      tileIndexes: [ 0 ],
    },
    entities: [{
      zone: ZONE.RNZ0,
      addresses: [ 0x05904aa0, 0x059054b0 ],
      x: 0x0082,
      y: 0x0080,
    }],
  }]

  const relics = [{
    // Soul of Bat
    id: 0,
    entities: [{
      zone: ZONE.LIB,
      itemIndex: 32,
      addresses: [ 0x047a5b5e, 0x047a623e ],
      entityId: 0x000c,
      y: 0x00a9,
    }],
  }, {
    // Fire of Bat
    id: 1,
    entities: [{
      zone: ZONE.NZ1,
      itemIndex: 12,
      addresses: [ 0x05575356, 0x05575e92 ],
      entityId: 0x000c,
      y: 0x00c9,
    }],
  }, {
    // Echo of Bat
    id: 2,
    entities: [{
      zone: ZONE.NO2,
      itemIndex: 12,
      addresses: [ 0x04aa414e, 0x04aa49a6 ],
      entityId: 0x000c,
      y: 0x009d,
    }],
  }, {
    // Force of Echo
    id: 3,
    entities: [{
      zone: ZONE.RNO4,
      itemIndex: 39,
      addresses: [ 0x0526e6a0, 0x0526f86e ],
      entityId: 0x000c,
      y: 0x00b9,
    }],
  }, {
    // Soul of Wolf
    id: 4,
    entities: [{
      zone: ZONE.NO1,
      itemIndex: 46,
      addresses: [ 0x049d5d36, 0x049d658e ],
      entityId: 0x000c,
      y: 0x0331,
    }],
  }, {
    // Power of Wolf
    id: 5,
    entities: [{
      zone: ZONE.NO3,
      itemIndex: 48,
      addresses: [ 0x04b6b14a, 0x04b6b9ac ],
      entityId: 0x000c,
      y: 0x00c8,
    }, {
      zone: ZONE.NP3,
      itemIndex: 48,
      addresses: [ 0x053f8f16, 0x053f9714 ],
      entityId: 0x000c,
      y: 0x00c8,
    }],
  }, {
    // Skill of Wolf
    id: 6,
    entities: [{
      zone: ZONE.NZ0,
      itemIndex: 13,
      addresses: [ 0x054b43fc, 0x054b4e70 ],
      entityId: 0x000c,
      x: 0x007e,
      y: 0x00b9,
    }],
  }, {
    // Form of Mist
    id: 7,
    entities: [{
      zone: ZONE.ARE,
      itemIndex: 11,
      addresses: [ 0x043c5782, 0x043c5e00 ],
      entityId: 0x000c,
      y: 0x0099,
    }],
  }, {
    // Power of Mist
    id: 8,
    entities: [{
      zone: ZONE.TOP,
      itemIndex: 21,
      addresses: [ 0x05610db0, 0x05611424 ],
      entityId: 0x000c,
      y: 0x04c8,
    }],
  }, {
    // Gas Cloud
    id: 9,
    entities: [{
      zone: ZONE.RCAT,
      itemIndex: 39,
      addresses: [ 0x04cfcb0e, 0x04cfd892 ],
      entityId: 0x000c,
      x: 0x0016,
      y: 0x00b1,
    }],
  }, {
    // Cube of Zoe
    id: 10,
    entities: [{
      zone: ZONE.NO3,
      itemIndex: 49,
      addresses: [ 0x04b6b082, 0x04b6b93e ],
      entityId: 0x000c,
      y: 0x007b,
    }, {
      zone: ZONE.NP3,
      itemIndex: 49,
      addresses: [ 0x053f8e26, 0x053f9692 ],
      entityId: 0x000c,
      y: 0x007b,
    }],
  }, {
    // Spirit Orb
    id: 11,
    entities: [{
      zone: ZONE.NO0,
      itemIndex: 14,
      addresses: [ 0x048fd1f6, 0x048fe278 ],
      entityId: 0x000c,
      x: 0x0043,
    }],
  }, {
    // Gravity Boots
    id: 12,
    entities: [{
      zone: ZONE.NO0,
      itemIndex: 41,
      addresses: [ 0x048fc9b2, 0x048fd944 ],
      entityId: 0x000c,
      y: 0x00b9,
    }],
  }, {
    // Leap Stone
    id: 13,
    entities: [{
      zone: ZONE.TOP,
      itemIndex: 22,
      addresses: [ 0x05610dba, 0x05611612 ],
      entityId: 0x000c,
      y: 0x0729,
    }],
  }, {
    // Holy Symbol
    id: 14,
    entities: [{
      zone: ZONE.NO4,
      itemIndex: 42,
      addresses: [ 0x04c34ede, 0x04c361d0 ],
      entityId: 0x000c,
      y: 0x00b9,
    }],
  }, {
    // Faerie Scroll
    id: 15,
    entities: [{
      zone: ZONE.LIB,
      itemIndex: 33,
      addresses: [ 0x047a5718, 0x047a5dca ],
      entityId: 0x000c,
      y: 0x00b9,
    }],
  }, {
    // Jewel of Open
    id: 16,
    instructions: [{
      addresses: [ 0x047dbdf8 ],
      instruction: 0x0806cadc,
    }],
  }, {
    // Merman Statue
    id: 17,
    entities: [{
      zone: ZONE.NO4,
      itemIndex: 43,
      addresses: [ 0x04c3516c, 0x04c36472 ],
      entityId: 0x000c,
      y: 0x00b9,
    }],
  }, {
    // Bat Card
    id: 18,
    entities: [{
      zone: ZONE.NZ0,
      itemIndex: 14,
      addresses: [ 0x054b3d04, 0x054b4778 ],
      entityId: 0x000c,
      x: 0x007e,
      y: 0x00b9,
    }],
  }, {
    // Ghost Card
    id: 19,
    entities: [{
      zone: ZONE.TOP,
      itemIndex: 22,
      addresses: [ 0x05611274, 0x05611950 ],
      entityId: 0x000c,
      y: 0x02a8,
    }],
  }, {
    // Faerie Card
    id: 20,
    entities: [{
      zone: ZONE.LIB,
      itemIndex: 34,
      addresses: [ 0x047a577c, 0x047a5f64 ],
      entityId: 0x000c,
      y: 0x00b9,
    }],
  }, {
    // Demon Card
    id: 21,
    entities: [{
      zone: ZONE.CHI,
      itemIndex: 13,
      addresses: [ 0x045ea956, 0x045eacda ],
      entityId: 0x000c,
      y: 0x00b8,
    }],
  }, {
    // Sword Card
    id: 22,
    entities: [{
      zone: ZONE.NO2,
      itemIndex: 13,
      addresses: [ 0x04aa3f6e, 0x04aa47c6 ],
      entityId: 0x000c,
      y: 0x009c,
    }],
  }, {
    // Heart of Vlad
    id: 25,
    entities: [{
      zone: ZONE.RDAI,
      addresses: [ 0x04e335ac, 0x04e34048 ],
      erase: true,
    }],
    instructions: [{
      addresses: [ 0x06757b54 ],
      instruction: 0x34020000,
    }],
  }, {
    // Tooth of Vlad
    id: 26,
    entities: [{
      zone: ZONE.RNO1,
      addresses: [ 0x05051d4a, 0x05052566 ],
      erase: true,
    }],
    instructions: [{
      addresses: [ 0x067ec398 ],
      instruction: 0x34020000,
    }],
  }, {
    // Rib of Vlad
    id: 27,
    entities: [{
      zone: ZONE.RNO2,
      addresses: [ 0x050fa90c, 0x050fb220 ],
      erase: true,
    }],
    instructions: [{
      addresses: [ 0x069e8524 ],
      instruction: 0x34020000,
    }],
  }, {
    // Ring of Vlad
    id: 28,
    instructions: [{
      addresses: [ 0x059ee594 ],
      instruction: 0x34020000,
    }, {
      addresses: [ 0x059ee2f0 ],
      instruction: 0x00000000,
    }],
  }, {
    // Eye of Vlad
    id: 29,
    entities: [{
      zone: ZONE.RCHI,
      addresses: [ 0x04da65ea, 0x04da6a4a ],
      erase: true,
    }],
    instructions: [{
      addresses: [ 0x06644cf0 ],
      instruction: 0x34020000,
    }],
  }]

  const exports = {
    locations: locations,
    relics: relics,
  }
  if (self) {
    self.sotnRando = Object.assign(self.sotnRando || {}, {
      extension: exports,
    })
  } else {
    module.exports = exports
  }
})(typeof(self) !== 'undefined' ? self : null)
