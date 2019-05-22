(function(self) {

  // Logic metadata.
  const metadata = {
    id: 'safe',
    name: 'Safe',
    description: 'Requires no speedrun or glitch knowledge for completion.',
    author: '3snow_p7im, setz, and soba',
    weight: -100,
  }

  // Boilerplate.
  let constants
  let util
  if (self) {
    constants = self.sotnRando.constants
    util = self.sotnRando.util
  } else {
    constants = require('../constants')
    util = require('../util')
  }
  const PresetBuilder = util.PresetBuilder
  const RELIC = constants.RELIC

  // Create PresetBuilder.
  const builder = new PresetBuilder(metadata)

  // Soul of Bat requires Mist + at least Leap Stone.
  builder.lockLocation(RELIC.SOUL_OF_BAT, [
    RELIC.FORM_OF_MIST + RELIC.LEAP_STONE,
    RELIC.FORM_OF_MIST + RELIC.GRAVITY_BOOTS,
    RELIC.FORM_OF_MIST + RELIC.SOUL_OF_BAT,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Fire of Bat requires flight.
  builder.lockLocation(RELIC.FIRE_OF_BAT, [
    RELIC.SOUL_OF_BAT,
    RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Echo of Bat requires flight + a transformation.
  builder.lockLocation(RELIC.ECHO_OF_BAT, [
    RELIC.SOUL_OF_BAT,
    RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS + RELIC.FORM_OF_MIST,
    RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS + RELIC.SOUL_OF_WOLF,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Force of Echo in second castle.
  builder.lockLocation(RELIC.FORCE_OF_ECHO, [
    RELIC.JEWEL_OF_OPEN + RELIC.FORM_OF_MIST
      + RELIC.SOUL_OF_BAT + RELIC.ECHO_OF_BAT,
  ])

  // Power of Wolf requires flight.
  builder.lockLocation(RELIC.POWER_OF_WOLF, [
    RELIC.SOUL_OF_BAT,
    RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Skill of Wolf requires at least Gravity Boots.
  builder.lockLocation(RELIC.SKILL_OF_WOLF, [
    RELIC.GRAVITY_BOOTS,
    RELIC.SOUL_OF_BAT,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Form of Mist requires at least Leap Stone.
  builder.lockLocation(RELIC.FORM_OF_MIST, [
    RELIC.LEAP_STONE,
    RELIC.GRAVITY_BOOTS,
    RELIC.SOUL_OF_BAT,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Power of Mist requires flight.
  builder.lockLocation(RELIC.POWER_OF_MIST, [
    RELIC.SOUL_OF_BAT,
    RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Gas Cloud in second castle.
  builder.lockLocation(RELIC.GAS_CLOUD, [
    RELIC.JEWEL_OF_OPEN + RELIC.FORM_OF_MIST
      + RELIC.SOUL_OF_BAT + RELIC.ECHO_OF_BAT,
  ])

  // Gravity Boots requires flight.
  builder.lockLocation(RELIC.GRAVITY_BOOTS, [
    RELIC.SOUL_OF_BAT,
    RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Leap Stone requires Jewel of Open or at least Leap Stone.
  builder.lockLocation(RELIC.LEAP_STONE, [
    RELIC.JEWEL_OF_OPEN,
    RELIC.LEAP_STONE,
    RELIC.GRAVITY_BOOTS,
    RELIC.SOUL_OF_BAT,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Holy Symbol requires Jewel of Open and Merman Statue.
  builder.lockLocation(RELIC.HOLY_SYMBOL, [
    RELIC.JEWEL_OF_OPEN + RELIC.MERMAN_STATUE,
  ])

  // Merman Statue requires Jewel of Open.
  builder.lockLocation(RELIC.MERMAN_STATUE, [
    RELIC.JEWEL_OF_OPEN,
  ])

  // Bat Card requires at least Gravity Boots.
  builder.lockLocation(RELIC.BAT_CARD, [
    RELIC.GRAVITY_BOOTS,
    RELIC.SOUL_OF_BAT,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Ghost Card requires flight.
  builder.lockLocation(RELIC.GHOST_CARD, [
    RELIC.SOUL_OF_BAT,
    RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Faerie Card requires at least Gravity Boots.
  builder.lockLocation(RELIC.FAERIE_CARD, [
    RELIC.GRAVITY_BOOTS,
    RELIC.SOUL_OF_BAT,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Demon Card requires Jewel of Open + at least Leap Stone.
  builder.lockLocation(RELIC.DEMON_CARD, [
    RELIC.JEWEL_OF_OPEN + RELIC.LEAP_STONE,
    RELIC.JEWEL_OF_OPEN + RELIC.SOUL_OF_BAT,
    RELIC.JEWEL_OF_OPEN + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Sword Card requires flight.
  builder.lockLocation(RELIC.SWORD_CARD, [
    RELIC.SOUL_OF_BAT,
    RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Heart of Vlad in second castle.
  builder.lockLocation(RELIC.HEART_OF_VLAD, [
    RELIC.JEWEL_OF_OPEN + RELIC.FORM_OF_MIST
      + RELIC.SOUL_OF_BAT + RELIC.ECHO_OF_BAT,
  ])

  // Tooth of Vlad in second castle.
  builder.lockLocation(RELIC.TOOTH_OF_VLAD, [
    RELIC.JEWEL_OF_OPEN + RELIC.FORM_OF_MIST
      + RELIC.SOUL_OF_BAT + RELIC.ECHO_OF_BAT,
  ])

  // Rib of Vlad in second castle.
  builder.lockLocation(RELIC.RIB_OF_VLAD, [
    RELIC.JEWEL_OF_OPEN + RELIC.FORM_OF_MIST
      + RELIC.SOUL_OF_BAT + RELIC.ECHO_OF_BAT,
  ])

  // Ring of Vlad in second castle.
  builder.lockLocation(RELIC.RING_OF_VLAD, [
    RELIC.JEWEL_OF_OPEN + RELIC.FORM_OF_MIST
      + RELIC.SOUL_OF_BAT + RELIC.ECHO_OF_BAT,
  ])

  // Eye of Vlad in second castle.
  builder.lockLocation(RELIC.EYE_OF_VLAD, [
    RELIC.JEWEL_OF_OPEN + RELIC.FORM_OF_MIST
      + RELIC.SOUL_OF_BAT + RELIC.ECHO_OF_BAT,
  ])

  // Export.
  const preset = builder.build()
  if (self) {
    const presets = (self.sotnRando || {}).presets || []
    presets.push(preset)
    self.sotnRando = Object.assign(self.sotnRando || {}, {
      presets: presets,
    })
  } else if (!module.parent) {
    console.log(preset.toString())
  } else {
    module.exports = preset
  }
})(typeof(self) !== 'undefined' ? self : null)
