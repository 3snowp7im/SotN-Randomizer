(function(self) {

  // Logic metadata.
  const metadata = {
    id: 'josephscloak',
    name: 'Joseph\'s Cloak',
    description: 'Start with Joseph\'s Cloak',
    author: '3snow_p7im',
    weight: -1000,
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
  const SLOT = constants.SLOT

  // Create PresetBuilder.
  const builder = new PresetBuilder(metadata)

  // STARTING EQUIPMENT //
  builder.startingEquipment(SLOT.RIGHT_HAND, 'Library Card')
  builder.startingEquipment(SLOT.CLOAK, 'Joseph\'s Cloak')
  builder.startingEquipment(SLOT.OTHER, 'Diamond')

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
