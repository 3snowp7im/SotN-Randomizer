// This is a generated file. Do not edit it directly.
// Make your changes to presets/race-lycan.json then rebuild
// this file with `npm run build-presets -- race-lycan`.
(function(self) {

  // Boilerplate.
  let util
  if (self) {
    util = self.sotnRando.util
  } else {
    util = require('../../src/util')
  }
  const PresetBuilder = util.PresetBuilder

  // Create PresetBuilder.
  const builder = PresetBuilder.fromJSON({"metadata":{"id":"race-lycan","name":"Race lycan","description":"Start with all wolf relics. Mana consumption is greatly reduced when in wolf form.","author":"TalicZealot","weight":-300},"inherits":"lycanthrope","writes":[{"comment":"Patch shop relic cost","address":"0x047a3098","type":"word","value":"0x00000000"},{"comment":"lui v0, 0x02","address":"0x04951d4c","type":"word","value":"0x3c020002"},{"comment":"lui v0, 0x02","address":"0x04fcf264","type":"word","value":"0x3C020002"}]})

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
