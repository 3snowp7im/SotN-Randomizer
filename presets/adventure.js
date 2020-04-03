(function(self) {

  // Logic metadata.
  const metadata = {
    id: 'adventure',
    name: 'Adventure',
    description: 'Requires extensive map coverage.',
    author: '3snow_p7im',
    weight: -300,
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
  const EXTENSION = constants.EXTENSION

  // Create PresetBuilder.
  const builder = new PresetBuilder(metadata)

  // Inherit Safe preset.
  builder.inherits('safe')

  // Enable equipment relic location extension.
  builder.relicLocationsExtension(EXTENSION.EQUIPMENT)

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
