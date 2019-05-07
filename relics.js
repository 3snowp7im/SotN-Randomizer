(function(self) {

  let constants
  if (self) {
    constants = self.sotnRando.constants
  } else {
    constants = require('./constants')
  }
  const RELIC = constants.RELIC

  /**
   * List of every relic, described as follows:
   * relic.name - The name of the relic
   * relic.id - The ID of the relic. Writing the value to a location
   *   will place the relic in that location
   * relic.addresses - List of the memory addresses corresponding to the
   *   location. Write IDs here to replace relics.
   * relic.ability - What ability this relic provides.
   *   Used to determine when progression is gained.
   * relic.locks - Pipe-separated list of ability locks.
   *   Used to determine when location is open to player based on abilities.
   */
  const relics = [{
    name: 'Soul of Bat',
    id: 0x00,
    location: 0x00,
    addresses: [ 0x047a5b66 ],
    ability: RELIC.SOUL_OF_BAT,
    locks: [
      RELIC.FORM_OF_MIST + RELIC.GRAVITY_BOOTS,
      RELIC.FORM_OF_MIST + RELIC.LEAP_STONE,
      RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
    ],
  }, {
    name: 'Fire of Bat',
    id: 0x01,
    location: 0x01,
    addresses: [ 0x0557535e ],
    ability: 'f',
    locks: [
      RELIC.SOUL_OF_BAT,
      RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
      RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
    ],
  }, {
    name: 'Echo of Bat',
    id: 0x02,
    location: 0x02,
    addresses: [ 0x04aa4156 ],
    ability: 'E',
    locks: [
      RELIC.SOUL_OF_BAT,
      RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS + RELIC.FORM_OF_MIST,
      RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS + RELIC.SOUL_OF_WOLF,
      RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
    ],
  },  {
    name: 'Force of Echo',
    id: 0x03,
    location: 0x03,
    addresses: [ 0x0526e6a8 ],
    ability: RELIC.FORCE_OF_ECHO,
    locks: [
      RELIC.JEWEL_OF_OPEN + RELIC.FORM_OF_MIST
        + RELIC.SOUL_OF_BAT + RELIC.ECHO_OF_BAT,
    ],
  }, {
    name: 'Soul of Wolf',
    id: 0x04,
    location: 0x04,
    addresses: [ 0x049d6596, 0x049d5d3e ],
    ability: RELIC.SOUL_OF_WOLF,
  }, {
    name: 'Power of Wolf',
    id: 0x05,
    location: 0x05,
    addresses: [ 0x04b6b9b4, 0x053f971c ],
    ability: RELIC.POWER_OF_WOLF,
    locks: [
      RELIC.SOUL_OF_BAT,
      RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
      RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
    ],
  }, {
    name: 'Skill of Wolf',
    id: 0x06,
    location: 0x06,
    addresses: [ 0x054b1d5a ],
    ability: RELIC.SKILL_OF_WOLF,
    locks: [
      RELIC.GRAVITY_BOOTS,
      RELIC.SOUL_OF_BAT,
      RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
    ],
  }, {
    name: 'Form of Mist',
    id: 0x07,
    location: 0x07,
    addresses: [ 0x043c578a ],
    ability: RELIC.FORM_OF_MIST,
    locks: [
      RELIC.SOUL_OF_BAT,
      RELIC.GRAVITY_BOOTS,
      RELIC.LEAP_STONE,
      RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
    ],
  }, {
    name: 'Power of Mist',
    id: 0x08,
    location: 0x08,
    addresses: [ 0x05610db8, 0x0561142c ],
    ability: RELIC.POWER_OF_MIST,
    locks: [
      RELIC.SOUL_OF_BAT,
      RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
      RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
    ],
  }, {
    name: 'Gas Cloud',
    id: 0x09,
    location: 0x09,
    addresses: [ 0x04cfcb16 ],
    ability: RELIC.GAS_CLOUD,
    locks: [
      RELIC.JEWEL_OF_OPEN + RELIC.FORM_OF_MIST
        + RELIC.SOUL_OF_BAT + RELIC.ECHO_OF_BAT,
    ],
  }, {
    name: 'Cube of Zoe',
    id: 0x0a,
    location: 0x0a,
    addresses: [ 0x04b6b946, 0x053f969a, 0x04b6b08a, 0x053f8e2e ],
    ability: RELIC.CUBE_OF_ZOE,
  }, {
    name: 'Spirit Orb',
    id: 0x0b,
    location: 0x0b,
    addresses: [ 0x048fd1fe, 0x048fe280 ],
    ability: RELIC.SPIRIT_ORB,
  }, {
    name: 'Gravity Boots',
    id: 0x0c,
    location: 0x0c,
    addresses: [ 0x048fc9ba ],
    ability: RELIC.GRAVITY_BOOTS,
    locks: [
      RELIC.SOUL_OF_BAT,
      RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
      RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
    ],
  }, {
    name: 'Leap Stone',
    id: 0x0d,
    location: 0x0d,
    addresses: [ 0x05610dc2, 0x0561161a ],
    ability: RELIC.LEAP_STONE,
    locks: [
      RELIC.JEWEL_OF_OPEN,
      RELIC.SOUL_OF_BAT,
      RELIC.GRAVITY_BOOTS,
      RELIC.LEAP_STONE,
      RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
    ],
  }, {
    name: 'Holy Symbol',
    id: 0x0e,
    location: 0x0e,
    addresses: [ 0x04c34ee6 ],
    ability: RELIC.HOLY_SYMBOL,
    locks: [
      RELIC.JEWEL_OF_OPEN + RELIC.MERMAN_STATUE,
    ],
  }, {
    name: 'Faerie Scroll',
    id: 0x0f,
    location: 0x0f,
    addresses: [ 0x047a5720, 0x047a5dd2 ],
    ability: RELIC.FAERIE_SCROLL,
  }, {
    name: 'Jewel of Open',
    id: 0x10,
    location: 0x10,
    addresses: [ 0x047a321c ],
    ability: RELIC.JEWEL_OF_OPEN,
  }, {
    name: 'Merman Statue',
    id: 0x11,
    location: 0x11,
    addresses: [ 0x04c35174 ],
    ability: RELIC.MERMAN_STATUE,
    locks: [
      RELIC.JEWEL_OF_OPEN,
    ],
  }, {
    name: 'Bat Card',
    id: 0x12,
    location: 0x12,
    addresses: [ 0x054b1d58 ],
    ability: RELIC.BAT_CARD,
    locks: [
      RELIC.GRAVITY_BOOTS,
      RELIC.SOUL_OF_BAT,
      RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
    ],
  }, {
    name: 'Ghost Card',
    id: 0x13,
    location: 0x13,
    addresses: [ 0x05611958, 0x0561127c ],
    ability: RELIC.GHOST_CARD,
    locks: [
      RELIC.SOUL_OF_BAT,
      RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
      RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
    ],
  }, {
    name: 'Faerie Card',
    id: 0x14,
    location: 0x14,
    addresses: [ 0x047a5784 ],
    ability: RELIC.FAERIE_CARD,
    locks: [
      RELIC.GRAVITY_BOOTS,
      RELIC.SOUL_OF_BAT,
      RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
    ],
  }, {
    name: 'Demon Card',
    id: 0x15,
    location: 0x15,
    addresses: [ 0x045ea95e ],
    ability: RELIC.DEMON_CARD,
    locks: [
      RELIC.JEWEL_OF_OPEN + RELIC.LEAP_STONE,
      RELIC.JEWEL_OF_OPEN + RELIC.SOUL_OF_BAT,
      RELIC.JEWEL_OF_OPEN + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
    ],
  }, {
    name: 'Sword Card',
    id: 0x16,
    location: 0x16,
    addresses: [ 0x04aa3f76 ],
    ability: RELIC.SWORD_CARD,
    locks: [
      RELIC.SOUL_OF_BAT,
      RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
      RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
    ],
  }, {
    name: 'Heart of Vlad',
    id: 0x19,
    location: 0x17,
    addresses: [ 0x067437d2, 0x06306ab2, 0x04e335b4 ],
    ability: RELIC.HEART_OF_VLAD,
    locks: [
      RELIC.JEWEL_OF_OPEN + RELIC.FORM_OF_MIST
        + RELIC.SOUL_OF_BAT + RELIC.ECHO_OF_BAT,
    ],
  }, {
    name: 'Tooth of Vlad',
    id: 0x1a,
    location: 0x18,
    addresses: [ 0x05051d52, 0x067d1630 ],
    ability: RELIC.TOOTH_OF_VLAD,
    locks: [
      RELIC.JEWEL_OF_OPEN + RELIC.FORM_OF_MIST
        + RELIC.SOUL_OF_BAT + RELIC.ECHO_OF_BAT,
    ],
  }, {
    name: 'Rib of Vlad',
    id: 0x1b,
    location: 0x19,
    addresses: [ 0x069d2b1e, 0x050fa914 ],
    ability: RELIC.RIB_OF_VLAD,
    locks: [
      RELIC.JEWEL_OF_OPEN + RELIC.FORM_OF_MIST
        + RELIC.SOUL_OF_BAT + RELIC.ECHO_OF_BAT,
    ],
  }, {
    name: 'Ring of Vlad',
    id: 0x1c,
    location: 0x1a,
    addresses: [ 0x059bdb30, 0x059ee2e4 ],
    ability: RELIC.RING_OF_VLAD,
    locks: [
      RELIC.JEWEL_OF_OPEN + RELIC.FORM_OF_MIST
        + RELIC.SOUL_OF_BAT + RELIC.ECHO_OF_BAT,
    ],
  }, {
    name: 'Eye of Vlad',
    id: 0x1d,
    location: 0x1b,
    addresses: [ 0x04da65f2, 0x0662263a ],
    ability: RELIC.EYE_OF_VLAD,
    locks: [
      RELIC.JEWEL_OF_OPEN + RELIC.FORM_OF_MIST
        + RELIC.SOUL_OF_BAT + RELIC.ECHO_OF_BAT,
    ],
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
