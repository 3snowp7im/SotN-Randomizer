#!/usr/bin/env node
(function(self) {

  // Logic metadata.
  const metadata = {
    id: 'optimize',
    name: 'Optimize',
    description: 'Relic placement designed to be as fast as possible.',
    author: '3snow_p7im and romscout',
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

  // Place relics.
  plan.place(RELIC.SOUL_OF_BAT, RELIC.CUBE_OF_ZOE)
  plan.place(RELIC.ECHO_OF_BAT, RELIC.SKILL_OF_WOLF)
  plan.place(RELIC.GRAVITY_BOOTS, RELIC.SPIRIT_ORB)
  plan.place(RELIC.FORM_OF_MIST, RELIC.GRAVITY_BOOTS)
  plan.place(RELIC.JEWEL_OF_OPEN, RELIC.FORM_OF_MIST)
  plan.place(RELIC.LEAP_STONE, RELIC.DEMON_CARD)
  plan.place(RELIC.RIB_OF_VLAD, RELIC.LEAP_STONE)
  plan.place(RELIC.TOOTH_OF_VLAD, RELIC.GHOST_CARD)
  plan.place(RELIC.EYE_OF_VLAD, RELIC.POWER_OF_MIST)
  plan.place(RELIC.RING_OF_VLAD, RELIC.RING_OF_VLAD)
  plan.place(RELIC.HEART_OF_VLAD, RELIC.HEART_OF_VLAD)

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
