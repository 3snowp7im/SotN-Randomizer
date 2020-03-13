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
  const LOCATION = constants.LOCATION
  const RELIC = constants.RELIC

  // Create preset builder.
  const builder = new PresetBuilder(metadata)

  // Power of Wolf at Spirit Orb.
  builder.placeRelic(RELIC.POWER_OF_WOLF, RELIC.SPIRIT_ORB)

  // Vanilla Jewel of Open.
  builder.placeRelic(RELIC.JEWEL_OF_OPEN, RELIC.JEWEL_OF_OPEN)

  // Form of Wolf at Merman Statue.
  builder.placeRelic(RELIC.SOUL_OF_WOLF, RELIC.MERMAN_STATUE)

  // Leap Stone at Granfalloon.
  builder.placeRelic(RELIC.LEAP_STONE, LOCATION.GRANFALLOON)

  // Form of Mist at Leap Stone.
  builder.placeRelic(RELIC.FORM_OF_MIST, RELIC.LEAP_STONE)

  // Power of Mist at Soul of Bat.
  builder.placeRelic(RELIC.POWER_OF_MIST, RELIC.SOUL_OF_BAT)

  // Soul of Bat at Power of Wolf.
  builder.placeRelic(RELIC.SOUL_OF_BAT, RELIC.POWER_OF_WOLF)

  // Echo of Bat at Power of Mist.
  builder.placeRelic(RELIC.ECHO_OF_BAT, RELIC.POWER_OF_MIST)

  // Gravity Boots at Eye of Vlad.
  builder.placeRelic(RELIC.GRAVITY_BOOTS, RELIC.EYE_OF_VLAD)

  // Merman Statue at Gas Cloud.
  builder.placeRelic(RELIC.MERMAN_STATUE, RELIC.GAS_CLOUD)

  // Cube of Zoe in 2nd castle.
  builder.placeRelic(RELIC.CUBE_OF_ZOE, RELIC.RING_OF_VLAD)

  // Any Vlad relic at Fire of Bat, Tooth of Vlad, Rib of Vlad, Force of Echo,
  // or Holy Sympbol.
  builder.placeRelic([
    RELIC.HEART_OF_VLAD,
    RELIC.TOOTH_OF_VLAD,
    RELIC.RIB_OF_VLAD,
    RELIC.RING_OF_VLAD,
    RELIC.EYE_OF_VLAD,
  ], [
    RELIC.FIRE_OF_BAT,
    RELIC.TOOTH_OF_VLAD,
    RELIC.RIB_OF_VLAD,
    RELIC.FORCE_OF_ECHO,
    RELIC.HOLY_SYMBOL,
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
