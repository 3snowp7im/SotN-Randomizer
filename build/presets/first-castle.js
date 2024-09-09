// This is a generated file. Do not edit it directly.
// Make your changes to presets/first-castle.json then rebuild
// this file with `npm run build-presets -- first-castle`.
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
  const builder = PresetBuilder.fromJSON({"metadata":{"id":"first-castle","name":"First Castle","description":"All relics are available in the first castle. No need to stop anywhere in second castle!","author":"SacredLucy","weight":-5005},"inherits":"open","stats":false,"unlockedMode":true,"prologueRewards":[{"comment":"No hearts left","item":"Heart Refresh","replacement":"Library card"},{"comment":"More than 41 hearts in cutscene","item":"Neutron bomb","replacement":"Library card"}],"placeRelic":[{"location":"Trio","relic":"Cube of Zoe"},{"location":"Force of Echo","relic":"Faerie Scroll"},{"location":"Gas Cloud","relic":"Spirit Orb"},{"location":"Heart of Vlad","relic":"Holy Symbol"},{"location":"Tooth of Vlad","relic":"Sword Card"},{"location":"Rib of Vlad","relic":"Gas Cloud"},{"location":"Ring of Vlad","relic":"Bat Card"},{"location":"Eye of Vlad","relic":"Fire of Bat"},{"location":"Dark Blade","relic":"Ghost Card"},{"location":"Ring of Arcana","relic":"Force of Echo"}],"complexityGoal":{"min":5,"goals":["Holy glasses + Heart of Vlad + Tooth of Vlad + Rib of Vlad + Ring of Vlad + Eye of Vlad"]}})

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
