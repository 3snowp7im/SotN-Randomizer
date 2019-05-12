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
  let plandomizer
  let RELIC
  if (self) {
    plandomizer = self.sotnRando.util.plandomizer
    RELIC = self.sotnRando.constants.RELIC
  } else {
    plandomizer = require('../util').plandomizer
    RELIC = require('../constants').RELIC
  }

  // Create plandomizer.
  const plan = new plandomizer(metadata)

  // Soul of Bat requires Mist + at least Leap Stone.
  plan.lock(RELIC.SOUL_OF_BAT, [
    RELIC.FORM_OF_MIST + RELIC.LEAP_STONE,
    RELIC.FORM_OF_MIST + RELIC.GRAVITY_BOOTS,
    RELIC.FORM_OF_MIST + RELIC.SOUL_OF_BAT,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Fire of Bat requires flight.
  plan.lock(RELIC.FIRE_OF_BAT, [
    RELIC.SOUL_OF_BAT,
    RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Echo of Bat requires flight + a transformation.
  plan.lock(RELIC.ECHO_OF_BAT, [
    RELIC.SOUL_OF_BAT,
    RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS + RELIC.FORM_OF_MIST,
    RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS + RELIC.SOUL_OF_WOLF,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Force of Echo in second castle.
  plan.lock(RELIC.FORCE_OF_ECHO, [
    RELIC.JEWEL_OF_OPEN + RELIC.FORM_OF_MIST
      + RELIC.SOUL_OF_BAT + RELIC.ECHO_OF_BAT,
  ])

  // Power of Wolf requires flight.
  plan.lock(RELIC.POWER_OF_WOLF, [
    RELIC.SOUL_OF_BAT,
    RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Skill of Wolf requires at least Gravity Boots.
  plan.lock(RELIC.SKILL_OF_WOLD, [
    RELIC.GRAVITY_BOOTS,
    RELIC.SOUL_OF_BAT,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Form of Mist requires at least Leap Stone.
  plan.lock(RELIC.FORM_OF_MIST, [
    RELIC.LEAP_STONE,
    RELIC.GRAVITY_BOOTS,
    RELIC.SOUL_OF_BAT,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Power of Mist requires flight.
  plan.lock(RELIC.POWER_OF_MIST, [
    RELIC.SOUL_OF_BAT,
    RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Gas Cloud in second castle.
  plan.lock(RELIC.GAS_CLOUD, [
    RELIC.JEWEL_OF_OPEN + RELIC.FORM_OF_MIST
      + RELIC.SOUL_OF_BAT + RELIC.ECHO_OF_BAT,
  ])

  // Gravity Boots requires flight.
  plan.lock(RELIC.GRAVITY_BOOTS, [
    RELIC.SOUL_OF_BAT,
    RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Leap Stone requires Jewel of Open or at least Leap Stone.
  plan.lock(RELIC.LEAP_STONE, [
    RELIC.JEWEL_OF_OPEN,
    RELIC.LEAP_STONE,
    RELIC.GRAVITY_BOOTS,
    RELIC.SOUL_OF_BAT,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Holy Symbol requires Jewel of Open and Merman Statue.
  plan.lock(RELIC.HOLY_SYMBOL, [
    RELIC.JEWEL_OF_OPEN + RELIC.MERMAN_STATUE,
  ])

  // Merman Statue requires Jewel of Open.
  plan.lock(RELIC.MERMAN_STATUE, [
    RELIC.JEWEL_OF_OPEN,
  ])

  // Bat Card requires at least Gravity Boots.
  plan.lock(RELIC.BAT_CARD, [
    RELIC.GRAVITY_BOOTS,
    RELIC.SOUL_OF_BAT,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Ghost Card requires flight.
  plan.lock(RELIC.GHOST_CARD, [
    RELIC.SOUL_OF_BAT,
    RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Faerie Card requires at least Gravity Boots.
  plan.lock(RELIC.FAERIE_CARD, [
    RELIC.GRAVITY_BOOTS,
    RELIC.SOUL_OF_BAT,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Demon Card requires Jewel of Open + at least Leap Stone.
  plan.lock(RELIC.DEMON_CARD, [
    RELIC.JEWEL_OF_OPEN + RELIC.LEAP_STONE,
    RELIC.JEWEL_OF_OPEN + RELIC.SOUL_OF_BAT,
    RELIC.JEWEL_OF_OPEN + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Sword Card requires flight.
  plan.lock(RELIC.SWORD_CARD, [
    RELIC.SOUL_OF_BAT,
    RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Heart of Vlad in second castle.
  plan.lock(RELIC.HEART_OF_VLAD, [
    RELIC.JEWEL_OF_OPEN + RELIC.FORM_OF_MIST
      + RELIC.SOUL_OF_BAT + RELIC.ECHO_OF_BAT,
  ])

  // Tooth of Vlad in second castle.
  plan.lock(RELIC.TOOTH_OF_VLAD, [
    RELIC.JEWEL_OF_OPEN + RELIC.FORM_OF_MIST
      + RELIC.SOUL_OF_BAT + RELIC.ECHO_OF_BAT,
  ])

  // Rib of Vlad in second castle.
  plan.lock(RELIC.RIB_OF_VLAD, [
    RELIC.JEWEL_OF_OPEN + RELIC.FORM_OF_MIST
      + RELIC.SOUL_OF_BAT + RELIC.ECHO_OF_BAT,
  ])

  // Ring of Vlad in second castle.
  plan.lock(RELIC.RING_OF_VLAD, [
    RELIC.JEWEL_OF_OPEN + RELIC.FORM_OF_MIST
      + RELIC.SOUL_OF_BAT + RELIC.ECHO_OF_BAT,
  ])

  // Eye of Vlad in second castle.
  plan.lock(RELIC.EYE_OF_VLAD, [
    RELIC.JEWEL_OF_OPEN + RELIC.FORM_OF_MIST
      + RELIC.SOUL_OF_BAT + RELIC.ECHO_OF_BAT,
  ])

  // Export.
  if (self) {
    const logic = (self.sotnRando || {}).logic || []
    logic.push(plan.logic())
    self.sotnRando = Object.assign(self.sotnRando || {}, {
      logic: logic,
    })
  } else if (!module.parent) {
    console.log(plan.toString())
  } else {
    module.exports = plan.logic()
  }
})(typeof(self) !== 'undefined' ? self : null)
