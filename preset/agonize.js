(function(self) {

  // Logic metadata.
  const metadata = {
    id: 'agonize',
    name: 'Agonize',
    description: 'Use safe logic, but maximize backtracking.',
    author: '3snow_p7im',
    weight: -1,
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

  // Custom logic...

  // Vanilla Jewel of Open.
  plan.place(RELIC.JEWEL_OF_OPEN, RELIC.JEWEL_OF_OPEN)

  // Leap Stone at Merman Statue.
  plan.place(RELIC.LEAP_STONE, RELIC.MERMAN_STATUE)

  // Vanilla Form of Mist.
  plan.place(RELIC.FORM_OF_MIST, RELIC.FORM_OF_MIST)

  // Power of Mist at Demon Card.
  plan.place(RELIC.POWER_OF_MIST, RELIC.DEMON_CARD)

  // Merman Statue at Gas Cloud.
  plan.place(RELIC.MERMAN_STATUE, RELIC.GAS_CLOUD)

  // Gravity Boots at Eye of Vlad.
  plan.place(RELIC.GRAVITY_BOOTS, RELIC.EYE_OF_VLAD)

  // Soul of Bat and Echo of Bat at Power of Mist or Power of Wolf.
  plan.place(
    RELIC.SOUL_OF_BAT
      + RELIC.ECHO_OF_BAT,
    RELIC.POWER_OF_MIST
      + RELIC.POWER_OF_WOLF,
  )

  // Soul of Wolf and Cube of Zoe at 2nd castle.
  plan.place(
    RELIC.SOUL_OF_WOLF
      + RELIC.CUBE_OF_ZOE,
    RELIC.HEART_OF_VLAD
      + RELIC.RING_OF_VLAD,
  )

  // Any Vlad relic at Soul of Bat, Tooth of Vlad, Rib of Vlad, Force of Echo,
  // or Holy Sympbol.
  plan.place(
    RELIC.HEART_OF_VLAD
      + RELIC.TOOTH_OF_VLAD
      + RELIC.RIB_OF_VLAD
      + RELIC.RING_OF_VLAD
      + RELIC.EYE_OF_VLAD,
    RELIC.SOUL_OF_BAT
      + RELIC.TOOTH_OF_VLAD
      + RELIC.RIB_OF_VLAD
      + RELIC.FORCE_OF_ECHO
      + RELIC.HOLY_SYMBOL,
  )

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
