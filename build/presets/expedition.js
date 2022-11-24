// This is a generated file. Do not edit it directly.
// Make your changes to presets/expedition.json then rebuild
// this file with `npm run build-presets -- expedition`.
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
  const builder = PresetBuilder.fromJSON({"metadata":{"id":"expedition","name":"Expedition","description":"Adventure locations with Nimble build.","author":"eldri7ch","weight":-100},"inherits":"nimble","relicLocationsExtension":"equipment","complexityGoal":{"min":8,"goals":["Holy glasses + Heart of Vlad + Tooth of Vlad + Rib of Vlad + Ring of Vlad + Eye of Vlad"]},"itemLocations":[{"comment":"Place Stopwatch in the Clock Room","zone":"NO0","item":"Big heart","index":16,"replacement":"Stopwatch"},{"comment":"Place Stopwatch in the Clock Room","zone":"NO0","item":"Big heart","index":17,"replacement":"Stopwatch"},{"comment":"Place Library Card in Reverce Entrance","zone":"RNO3","item":"Hammer","replacement":"Library card"}]})

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
