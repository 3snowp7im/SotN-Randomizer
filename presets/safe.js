(function(self) {

  // Logic metadata.
  const metadata = {
    id: 'safe',
    name: 'Safe',
    description: 'Requires no speedrun or glitch knowledge for completion.',
    author: '3snow_p7im, setz, and soba',
    weight: -200,
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
  const LOCATION = constants.LOCATION

  // Create PresetBuilder.
  const builder = new PresetBuilder(metadata)

  // Inherit Casual preset.
  builder.inherits('casual')

  // Enable Guarded relic location extension.
  builder.relicLocationsExtension('guarded')

  // Scylla location requires Jewel of Open.
  builder.lockLocation(LOCATION.SCYLLA, [
    RELIC.JEWEL_OF_OPEN,
  ])

  // Granfalloon requires Jewel of Open + at least Leap Stone.
  builder.lockLocation(LOCATION.GRANFALLOON, [
    RELIC.JEWEL_OF_OPEN + RELIC.LEAP_STONE,
    RELIC.JEWEL_OF_OPEN + RELIC.SOUL_OF_BAT,
    RELIC.JEWEL_OF_OPEN + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
    RELIC.JEWEL_OF_OPEN + RELIC.SOUL_OF_WOLF + RELIC.POWER_OF_WOLF
      + RELIC.GRAVITY_BOOTS,
  ])

  // Doppleganger40 in second castle.
  builder.lockLocation(LOCATION.DOPPLEGANGER40, [
    RELIC.HOLY_GLASSES + RELIC.SOUL_OF_BAT,
    RELIC.HOLY_GLASSES + RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.HOLY_GLASSES + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Beezlebub in second castle.
  builder.lockLocation(LOCATION.BEEZLEBUB, [
    RELIC.HOLY_GLASSES + RELIC.SOUL_OF_BAT,
    RELIC.HOLY_GLASSES + RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.HOLY_GLASSES + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
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
