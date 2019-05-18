(function(self) {

  // Logic metadata.
  const metadata = {
    id: 'glitch',
    name: 'Glitch',
    description: 'May require extensive glitch knowledge for completion. '
      + 'Any% completion is assumed, but all Vlad relics are accessibly.',
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

  // Soul of Wolf or Leap Stone will be early.
  plan.place(
    RELIC.SOUL_OF_WOLF
      + RELIC.LEAP_STONE
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

  // Mist will be accessible with Wolf and Leap Stone.
  plan.place(
    RELIC.FORM_OF_MIST
      + RELIC.SPIRIT_ORB
      + RELIC.FAERIE_SCROLL,
    RELIC.FAERIE_CARD
      + RELIC.BAT_CARD
      + RELIC.FORM_OF_MIST,
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
