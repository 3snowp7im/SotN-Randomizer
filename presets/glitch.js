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
  let PresetBuilder
  let RELIC
  if (self) {
    PresetBuilder = self.sotnRando.util.PresetBuilder
    RELIC = self.sotnRando.constants.RELIC
  } else {
    PresetBuilder = require('../util').PresetBuilder
    RELIC = require('../constants').RELIC
  }

  // Create PresetBuilder.
  const preset = new PresetBuilder(metadata)

  // Custom logic...

  // Soul of Wolf or Leap Stone will be early.
  preset.placeRelic(
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
  preset.placeRelic(
    RELIC.FORM_OF_MIST
      + RELIC.SPIRIT_ORB
      + RELIC.FAERIE_SCROLL,
    RELIC.FAERIE_CARD
      + RELIC.BAT_CARD
      + RELIC.FORM_OF_MIST,
  )

  // Export.
  if (self) {
    const presets = (self.sotnRando || {}).presets || []
    presets.push(preset.build())
    self.sotnRando = Object.assign(self.sotnRando || {}, {
      presets: presets,
    })
  } else if (!module.parent) {
    console.log(preset.toString())
  } else {
    module.exports = preset.build()
  }
})(typeof(self) !== 'undefined' ? self : null)
