(function(self) {

  let constants
  if (self) {
    constants = self.sotnRando.constants
  } else {
    constants = require('./constants')
  }
  const RELIC = constants.RELIC

  const relics = [{
    name: 'Soul of Bat',
    id: 0,
    location: 0,
    addresses: [ 0x047a5b66, 0x047a6246 ],
    ability: RELIC.SOUL_OF_BAT,
  }, {
    name: 'Fire of Bat',
    id: 1,
    location: 1,
    addresses: [ 0x0557535e, 0x05575e9a ],
    ability: RELIC.FIRE_OF_BAT,
  }, {
    name: 'Echo of Bat',
    id: 2,
    location: 2,
    addresses: [ 0x04aa4156, 0x04aa49ae ],
    ability: RELIC.ECHO_OF_BAT,
  }, {
    name: 'Force of Echo',
    id: 3,
    location: 3,
    addresses: [ 0x0526e6a8, 0x0526f876 ],
    ability: RELIC.FORCE_OF_ECHO,
  }, {
    name: 'Soul of Wolf',
    id: 4,
    location: 4,
    addresses: [ 0x049d5d3e, 0x049d6596 ],
    ability: RELIC.SOUL_OF_WOLF,
  }, {
    name: 'Power of Wolf',
    id: 5,
    location: 5,
    addresses: [ 0x04b6b152, 0x04b6b9b4, 0x053f8f1e, 0x053f971c ],
    ability: RELIC.POWER_OF_WOLF,
  }, {
    name: 'Skill of Wolf',
    id: 6,
    location: 6,
    addresses: [ 0x054b1d5a ],
    ability: RELIC.SKILL_OF_WOLF,
  }, {
    name: 'Form of Mist',
    id: 7,
    location: 7,
    addresses: [ 0x043c578a, 0x043c5e08 ],
    ability: RELIC.FORM_OF_MIST,
  }, {
    name: 'Power of Mist',
    id: 8,
    location: 8,
    addresses: [ 0x05610db8, 0x0561142c ],
    ability: RELIC.POWER_OF_MIST,
  }, {
    name: 'Gas Cloud',
    id: 9,
    location: 9,
    addresses: [ 0x04cfcb16, 0x04cfd89a ],
    ability: RELIC.GAS_CLOUD,
  }, {
    name: 'Cube of Zoe',
    id: 10,
    location: 10,
    addresses: [ 0x04b6b08a, 0x04b6b946, 0x053f8e2e, 0x053f969a ],
    ability: RELIC.CUBE_OF_ZOE,
  }, {
    name: 'Spirit Orb',
    id: 11,
    location: 11,
    addresses: [ 0x048fd1fe, 0x048fe280 ],
    ability: RELIC.SPIRIT_ORB,
  }, {
    name: 'Gravity Boots',
    id: 12,
    location: 12,
    addresses: [ 0x048fc9ba, 0x048fd94c ],
    ability: RELIC.GRAVITY_BOOTS,
  }, {
    name: 'Leap Stone',
    id: 13,
    location: 13,
    addresses: [ 0x05610dc2, 0x0561161a ],
    ability: RELIC.LEAP_STONE,
  }, {
    name: 'Holy Symbol',
    id: 14,
    location: 14,
    addresses: [ 0x04c34ee6, 0x04c361d8 ],
    ability: RELIC.HOLY_SYMBOL,
  }, {
    name: 'Faerie Scroll',
    id: 15,
    location: 15,
    addresses: [ 0x047a5720, 0x047a5dd2 ],
    ability: RELIC.FAERIE_SCROLL,
  }, {
    name: 'Jewel of Open',
    id: 16,
    location: 16,
    addresses: [ 0x047a321c ],
    ability: RELIC.JEWEL_OF_OPEN,
  }, {
    name: 'Merman Statue',
    id: 17,
    location: 17,
    addresses: [ 0x04c35174, 0x04c3647a ],
    ability: RELIC.MERMAN_STATUE,
  }, {
    name: 'Bat Card',
    id: 18,
    location: 18,
    addresses: [ 0x054b1d58 ],
    ability: RELIC.BAT_CARD,
  }, {
    name: 'Ghost Card',
    id: 19,
    location: 19,
    addresses: [ 0x0561127c, 0x05611958 ],
    ability: RELIC.GHOST_CARD,
  }, {
    name: 'Faerie Card',
    id: 20,
    location: 20,
    addresses: [ 0x047a5784, 0x047a5f6c ],
    ability: RELIC.FAERIE_CARD,
  }, {
    name: 'Demon Card',
    id: 21,
    location: 21,
    addresses: [ 0x045ea95e, 0x045eace2 ],
    ability: RELIC.DEMON_CARD,
  }, {
    name: 'Sword Card',
    id: 22,
    location: 22,
    addresses: [ 0x04aa3f76, 0x04aa47ce ],
    ability: RELIC.SWORD_CARD,
  }, {
    name: 'Heart of Vlad',
    id: 25,
    location: 23,
    addresses: [ 0x04e335b4, 0x04e34050, 0x047a53e6, 0x04aa26d2, 0x054b3aea, 0x05574d82, 0x059bdb2a, 0x05fac77e, 0x0606fa02, 0x060fe636, 0x061a80ca, 0x0624b98a, 0x06306ab2, 0x063ad9ea, 0x06472332, 0x06509e52, 0x065921ea, 0x06622632, 0x066b49ba, 0x067437d2, 0x067d162e, 0x06866152, 0x069d2b1a, 0x06a61afe ],
    ability: RELIC.HEART_OF_VLAD,
  }, {
    name: 'Tooth of Vlad',
    id: 26,
    location: 24,
    addresses: [ 0x05051d52, 0x0505256e, 0x047a53e8, 0x04aa26d4, 0x054b3aec, 0x05574d84, 0x059bdb2c, 0x05fac780, 0x0606fa04, 0x060fe638, 0x061a80cc, 0x0624b98c, 0x06306ab4, 0x063ad9ec, 0x06472334, 0x06509e54, 0x065921ec, 0x06622634, 0x066b49bc, 0x067437d4, 0x067d1630, 0x06866154, 0x069d2b1c, 0x06a61b00 ],
    ability: RELIC.TOOTH_OF_VLAD,
  }, {
    name: 'Rib of Vlad',
    id: 27,
    location: 25,
    addresses: [ 0x050fa914, 0x050fb228, 0x047a53ea, 0x04aa26d6, 0x054b3aee, 0x05574d86, 0x059bdb2e, 0x05fac782, 0x0606fa06, 0x060fe63a, 0x061a80ce, 0x0624b98e, 0x06306ab6, 0x063ad9ee, 0x06472336, 0x06509e56, 0x065921ee, 0x06622636, 0x066b49be, 0x067437d6, 0x067d1632, 0x06866156, 0x069d2b1e, 0x06a61b02 ],
    ability: RELIC.RIB_OF_VLAD,
  }, {
    name: 'Ring of Vlad',
    id: 28,
    location: 26,
    addresses: [ 0x059e8074, 0x059ee2e4, 0x047a53ec, 0x04aa26d8, 0x054b3af0, 0x05574d88, 0x059bdb30, 0x05fac784, 0x0606fa08, 0x060fe63c, 0x061a80d0, 0x0624b990, 0x06306ab8, 0x063ad9f0, 0x06472338, 0x06509e58, 0x065921f0, 0x06622638, 0x066b49c0, 0x067437d8, 0x067d1634, 0x06866158, 0x069d2b20, 0x06a61b04 ],
    ability: RELIC.RING_OF_VLAD,
  }, {
    name: 'Eye of Vlad',
    id: 29,
    location: 27,
    addresses: [ 0x04da65f2, 0x04da6a52, 0x047a53ee, 0x04aa26da, 0x054b3af2, 0x05574d8a, 0x059bdb32, 0x05fac786, 0x0606fa0a, 0x060fe63e, 0x061a80d2, 0x0624b992, 0x06306aba, 0x063ad9f2, 0x0647233a, 0x06509e5a, 0x065921f2, 0x0662263a, 0x066b49c2, 0x067437da, 0x067d1636, 0x0686615a, 0x069d2b22, 0x06a61b06 ],
    ability: RELIC.EYE_OF_VLAD,
  }]

  const exports = relics
  if (self) {
    self.sotnRando = Object.assign(self.sotnRando || {}, {
      relics: exports,
    })
  } else {
    module.exports = exports
  }
})(typeof(self) !== 'undefined' ? self : null)
