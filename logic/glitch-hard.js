#!/usr/bin/env node
(function(self) {

  // Logic metadata.
  const metadata = {
    id: 'glitch-hard',
    name: 'Glitch (Hard)',
    description: 'Glitch logic, hard mode.',
    author: 'romscout',
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

  // Form of Mist will be early
  plan.place(
    RELIC.FORM_OF_MIST
      + RELIC.DEMON_CARD
      + RELIC.SWORD_CARD
      + RELIC.GHOST_CARD
      + RELIC.FAERIE_CARD
      + RELIC.BAT_CARD,
    RELIC.CUBE_OF_ZOE
      + RELIC.SPIRIT_ORB
      + RELIC.SOUL_OF_WOLF
      + RELIC.JEWEL_OF_OPEN
      + RELIC.FAERIE_SCROLL
      + RELIC.LEAP_STONE,
  )

  // Wolf will be accessible with Form of Mist
  plan.place(
    RELIC.SOUL_OF_WOLF
      + RELIC.SPIRIT_ORB
      + RELIC.FAERIE_SCROLL,
    RELIC.FAERIE_CARD
      + RELIC.FORM_OF_MIST
      + RELIC.SOUL_OF_BAT,
  )

  // Soul of Bat, Power of Mist, Gravity Boots
  // will always be in 2nd Castle
  plan.place(
    RELIC.SOUL_OF_BAT 
      + RELIC.POWER_OF_MIST 
      + RELIC.GRAVITY_BOOTS
      + RELIC.CUBE_OF_ZOE,
    RELIC.RING_OF_VLAD
      + RELIC.HEART_OF_VLAD
      + RELIC.TOOTH_OF_VLAD
      + RELIC.RIB_OF_VLAD,
  )

  // Tooth of Vlad will always be at the end of 2nd Castle
  plan.place(
    RELIC.HEART_OF_VLAD
      + RELIC.EYE_OF_VLAD,
    RELIC.EYE_OF_VLAD
      + RELIC.FORCE_OF_ECHO,
  )

  // Jewel of Open will always be behind Merman Statue or Galamoth
  plan.place(
    RELIC.JEWEL_OF_OPEN
      + RELIC.TOOTH_OF_VLAD,
    RELIC.HOLY_SYMBOL
      + RELIC.GAS_CLOUD,
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
