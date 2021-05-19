// This is a generated file. Do not edit it directly.
// Make your changes to presets/og.json then rebuild
// this file with `npm run build-presets -- og`.
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
  const builder = PresetBuilder.fromJSON({"metadata":{"id":"og","name":"O.G.","description":"Simulates randomizer season 1. No stat randomization. Gold ring, Silver ring, Holy glasses and Spike Breaker are in vanilla locations.","author":"3snow_p7im","weight":-200},"inherits":"casual","relicLocationsExtension":false,"preventLeaks":false,"stats":false,"music":false,"placeRelic":[{"location":"Silver ring","relic":"Silver ring"},{"location":"Gold ring","relic":"Gold ring"},{"location":"Holy glasses","relic":"Holy glasses"},{"location":"Spike Breaker","relic":"Spike Breaker"}]})

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
