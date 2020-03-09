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
    addresses: [ 0x047a5b66, 0x047a6246 ],
    ability: RELIC.SOUL_OF_BAT,
  }, {
    name: 'Fire of Bat',
    id: 1,
    addresses: [ 0x0557535e, 0x05575e9a ],
    ability: RELIC.FIRE_OF_BAT,
  }, {
    name: 'Echo of Bat',
    id: 2,
    addresses: [ 0x04aa4156, 0x04aa49ae ],
    ability: RELIC.ECHO_OF_BAT,
  }, {
    name: 'Force of Echo',
    id: 3,
    addresses: [ 0x0526e6a8, 0x0526f876 ],
    ability: RELIC.FORCE_OF_ECHO,
  }, {
    name: 'Soul of Wolf',
    id: 4,
    addresses: [ 0x049d5d3e, 0x049d6596 ],
    ability: RELIC.SOUL_OF_WOLF,
  }, {
    name: 'Power of Wolf',
    id: 5,
    addresses: [ 0x04b6b152, 0x04b6b9b4, 0x053f8f1e, 0x053f971c ],
    ability: RELIC.POWER_OF_WOLF,
  }, {
    name: 'Skill of Wolf',
    id: 6,
    addresses: [ 0x054b1d5a ],
    ability: RELIC.SKILL_OF_WOLF,
  }, {
    name: 'Form of Mist',
    id: 7,
    addresses: [ 0x043c578a, 0x043c5e08 ],
    ability: RELIC.FORM_OF_MIST,
  }, {
    name: 'Power of Mist',
    id: 8,
    addresses: [ 0x05610db8, 0x0561142c ],
    ability: RELIC.POWER_OF_MIST,
  }, {
    name: 'Gas Cloud',
    id: 9,
    addresses: [ 0x04cfcb16, 0x04cfd89a ],
    ability: RELIC.GAS_CLOUD,
  }, {
    name: 'Cube of Zoe',
    id: 10,
    addresses: [ 0x04b6b08a, 0x04b6b946, 0x053f8e2e, 0x053f969a ],
    ability: RELIC.CUBE_OF_ZOE,
  }, {
    name: 'Spirit Orb',
    id: 11,
    addresses: [ 0x048fd1fe, 0x048fe280, 0x048fd1fe, 0x048fe280 ],
    ability: RELIC.SPIRIT_ORB,
  }, {
    name: 'Gravity Boots',
    id: 12,
    addresses: [ 0x048fc9ba, 0x048fd94c ],
    ability: RELIC.GRAVITY_BOOTS,
  }, {
    name: 'Leap Stone',
    id: 13,
    addresses: [ 0x05610dc2, 0x0561161a ],
    ability: RELIC.LEAP_STONE,
  }, {
    name: 'Holy Symbol',
    id: 14,
    addresses: [ 0x04c34ee6, 0x04c361d8 ],
    ability: RELIC.HOLY_SYMBOL,
  }, {
    name: 'Faerie Scroll',
    id: 15,
    addresses: [ 0x047a5720, 0x047a5dd2 ],
    ability: RELIC.FAERIE_SCROLL,
  }, {
    name: 'Jewel of Open',
    id: 16,
    addresses: [ 0x047a321c ],
    ability: RELIC.JEWEL_OF_OPEN,
  }, {
    name: 'Merman Statue',
    id: 17,
    addresses: [ 0x04c35174, 0x04c3647a ],
    ability: RELIC.MERMAN_STATUE,
  }, {
    name: 'Bat Card',
    id: 18,
    addresses: [ 0x054b1d58 ],
    ability: RELIC.BAT_CARD,
  }, {
    name: 'Ghost Card',
    id: 19,
    addresses: [ 0x0561127c, 0x05611958 ],
    ability: RELIC.GHOST_CARD,
  }, {
    name: 'Faerie Card',
    id: 20,
    addresses: [ 0x047a5784, 0x047a5f6c ],
    ability: RELIC.FAERIE_CARD,
  }, {
    name: 'Demon Card',
    id: 21,
    addresses: [ 0x045ea95e, 0x045eace2 ],
    ability: RELIC.DEMON_CARD,
  }, {
    name: 'Sword Card',
    id: 22,
    addresses: [ 0x04aa3f76, 0x04aa47ce ],
    ability: RELIC.SWORD_CARD,
  }, {
    name: 'Heart of Vlad',
    id: 25,
    addresses: [ 0x04e335b4, 0x04e34050, 0x067437d2 ],
    ability: RELIC.HEART_OF_VLAD,
  }, {
    name: 'Tooth of Vlad',
    id: 26,
    addresses: [ 0x05051d52, 0x0505256e, 0x067d1630 ],
    ability: RELIC.TOOTH_OF_VLAD,
  }, {
    name: 'Rib of Vlad',
    id: 27,
    addresses: [ 0x050fa914, 0x050fb228, 0x069d2b1e ],
    ability: RELIC.RIB_OF_VLAD,
  }, {
    name: 'Ring of Vlad',
    id: 28,
    addresses: [ 0x059e8074, 0x059ee2e4, 0x059bdb30 ],
    ability: RELIC.RING_OF_VLAD,
  }, {
    name: 'Eye of Vlad',
    id: 29,
    addresses: [ 0x04da65f2, 0x04da6a52, 0x0662263a ],
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
