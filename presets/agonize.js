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
  const RELIC = constants.RELIC

  // Create preset builder.
  const builder = new PresetBuilder(metadata)

  // Custom logic...

  // Vanilla Jewel of Open.
  builder.placeRelic(RELIC.JEWEL_OF_OPEN, RELIC.JEWEL_OF_OPEN)

  // Leap Stone at Merman Statue.
  builder.placeRelic(RELIC.LEAP_STONE, RELIC.MERMAN_STATUE)

  // Vanilla Form of Mist.
  builder.placeRelic(RELIC.FORM_OF_MIST, RELIC.FORM_OF_MIST)

  // Power of Mist at Demon Card.
  builder.placeRelic(RELIC.POWER_OF_MIST, RELIC.DEMON_CARD)

  // Merman Statue at Gas Cloud.
  builder.placeRelic(RELIC.MERMAN_STATUE, RELIC.GAS_CLOUD)

  // Gravity Boots at Eye of Vlad.
  builder.placeRelic(RELIC.GRAVITY_BOOTS, RELIC.EYE_OF_VLAD)

  // Soul of Bat and Echo of Bat at Power of Mist or Power of Wolf.
  builder.placeRelic(
    RELIC.SOUL_OF_BAT
      + RELIC.ECHO_OF_BAT,
    RELIC.POWER_OF_MIST
      + RELIC.POWER_OF_WOLF,
  )

  // Soul of Wolf and Cube of Zoe at 2nd castle.
  builder.placeRelic(
    RELIC.SOUL_OF_WOLF
      + RELIC.CUBE_OF_ZOE,
    RELIC.HEART_OF_VLAD
      + RELIC.RING_OF_VLAD,
  )

  // Any Vlad relic at Soul of Bat, Tooth of Vlad, Rib of Vlad, Force of Echo,
  // or Holy Sympbol.
  builder.placeRelic(
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
