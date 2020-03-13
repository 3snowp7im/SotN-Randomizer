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

  // Place relics.
  builder.placeRelic(RELIC.SOUL_OF_BAT, RELIC.CUBE_OF_ZOE)
  builder.placeRelic(RELIC.ECHO_OF_BAT, RELIC.SKILL_OF_WOLF)
  builder.placeRelic(RELIC.POWER_OF_MIST, RELIC.BAT_CARD)
  builder.placeRelic(RELIC.GRAVITY_BOOTS, RELIC.SPIRIT_ORB)
  builder.placeRelic(RELIC.FORM_OF_MIST, RELIC.GRAVITY_BOOTS)
  builder.placeRelic(RELIC.JEWEL_OF_OPEN, RELIC.FORM_OF_MIST)
  builder.placeRelic(RELIC.LEAP_STONE, RELIC.DEMON_CARD)
  builder.placeRelic(RELIC.RIB_OF_VLAD, RELIC.LEAP_STONE)
  builder.placeRelic(RELIC.TOOTH_OF_VLAD, RELIC.GHOST_CARD)
  builder.placeRelic(RELIC.EYE_OF_VLAD, RELIC.POWER_OF_MIST)
  builder.placeRelic(RELIC.RING_OF_VLAD, RELIC.RING_OF_VLAD)
  builder.placeRelic(RELIC.HEART_OF_VLAD, RELIC.HEART_OF_VLAD)

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
