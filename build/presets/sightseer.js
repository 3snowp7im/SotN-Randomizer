// This is a generated file. Do not edit it directly.
// Make your changes to presets/sightseer.json then rebuild
// this file with `npm run build-presets -- sightseer`.
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
  const builder = PresetBuilder.fromJSON({"metadata":{"id":"sightseer","name":"Sight-Seer","description":"A base preset for the Randomizer. Requires no speedrun or glitch knowledge for completion. Wanderer extension.","author":"3snow_p7im, eldri7ch","weight":-5007},"inherits":"casual","colorrandoMode":true,"stats":false,"relicLocationsExtension":"wanderer","complexityGoal":{"min":9,"goals":["Holy glasses + Heart of Vlad + Tooth of Vlad + Rib of Vlad + Ring of Vlad + Eye of Vlad"]}})

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
