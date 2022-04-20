// This is a generated file. Do not edit it directly.
// Make your changes to presets/nimble.json then rebuild
// this file with `npm run build-presets -- nimble`.
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
  const builder = PresetBuilder.fromJSON({"metadata":{"id":"nimble","name":"Nimble","description":"Start with Soul of Bat, Leap Stone, Gravity Boots, Duplicator, Manna prism, and Buffalo star.","author":"3snow_p7im","weight":-100},"stats":false,"items":false,"prologueRewards":false,"startingEquipment":[{"slot":"Right hand","item":"Manna prism"},{"slot":"Left hand","item":"Buffalo star"},{"slot":"Head","item":"Dragon helm"},{"slot":"Body","item":"Alucard mail"},{"slot":"Cloak","item":"Twilight cloak"},{"slot":"Other","item":"Duplicator"}],"lockLocation":[{"location":"Soul of Bat","comment":"Requires Mist","locks":["Form of Mist"]},{"location":"Force of Echo","comment":"In second castle","locks":["Holy glasses"]},{"location":"Gas Cloud","comment":"In second castle","locks":["Holy glasses"]},{"location":"Holy Symbol","locks":["Jewel of Open + Merman Statue"]},{"location":"Merman Statue","locks":["Jewel of Open"]},{"location":"Demon Card","locks":["Jewel of Open"]},{"location":"Heart of Vlad","comment":"In second castle","locks":["Holy glasses"]},{"location":"Tooth of Vlad","comment":"In second castle","locks":["Holy glasses"]},{"location":"Rib of Vlad","comment":"In second castle","locks":["Holy glasses"]},{"location":"Ring of Vlad","comment":"In second castle","locks":["Holy glasses"]},{"location":"Eye of Vlad","comment":"In second castle","locks":["Holy glasses"]},{"location":"Spike Breaker","locks":["Jewel of Open + Echo of Bat"]},{"location":"Gold ring","locks":["Jewel of Open"]},{"location":"Silver ring","locks":["Jewel of Open + Spike Breaker + Form of Mist"]},{"location":"Holy glasses","locks":["Silver ring + Gold ring"]},{"location":"Crystal cloak","locks":["Jewel of Open"]},{"location":"Mormegil","locks":["Jewel of Open"]},{"location":"Dark Blade","comment":"In second castle","locks":["Holy glasses"]},{"location":"Ring of Arcana","comment":"In second castle","locks":["Holy glasses"]},{"location":"Trio","comment":"In second castle","locks":["Holy glasses"]}],"complexityGoal":{"min":6,"goals":["Holy glasses + Heart of Vlad + Tooth of Vlad + Rib of Vlad + Ring of Vlad + Eye of Vlad"]},"writes":[{"comment":"Jump to injected code","address":"0x000fa97c","type":"word","value":"0x0c04db00"},{"address":"0x00158c98","type":"word","value":"0x34020003","comment":"ori v0, 0x0003"},{"type":"word","value":"0x3c038009","comment":"lui v1, 0x8009"},{"comment":"sb v0, 0x7964 (v1)","type":"word","value":"0xa0627964"},{"comment":"sb v0, 0x7970 (v1)","type":"word","value":"0xa0627970"},{"comment":"sb v0, 0x7971 (v1)","type":"word","value":"0xa0627971"},{"comment":"j 0x800e493c","type":"word","value":"0x0803924f"}]})

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
