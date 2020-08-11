// This is a generated file. Do not edit it directly.
// Make your changes to presets/scavenger.json then rebuild
// this file with `npm run build-presets -- scavenger`.
(function(self) {

  // Boilerplate.
  let util
  if (self) {
    util = self.sotnRando.util
  } else {
    util = require('../../util')
  }
  const PresetBuilder = util.PresetBuilder

  // Create PresetBuilder.
  const builder = PresetBuilder.fromJSON({"metadata":{"id":"scavenger","name":"Scavenger","description":"No enemy drops challenge mode.","author":"3snow_p7im","weight":100},"inherits":"safe","enemyDrops":[{"enemy":"*","items":[null,null]},{"enemy":"Global","items":["Heart","Heart","Heart","Heart","Heart","Heart","Heart","Heart","Heart","Heart","Heart","Heart","Heart","Heart","Heart","Heart","Heart","Heart","Heart","Heart","Heart","Heart","Heart","Heart","Heart","Heart","Heart","Heart","Heart","Heart","Heart","Heart"]}],"placeRelic":[{"location":"Jewel of Open","relic":"Spirit Orb"}]})

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
