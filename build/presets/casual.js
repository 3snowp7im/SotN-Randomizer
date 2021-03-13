// This is a generated file. Do not edit it directly.
// Make your changes to presets/casual.json then rebuild
// this file with `npm run build-presets -- casual`.
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
  const builder = PresetBuilder.fromJSON({"metadata":{"id":"casual","name":"Casual","description":"Use safe logic, but randomize relics among vanilla locations only.","author":"3snow_p7im, setz, and soba","weight":-300},"relicLocationsExtension":false,"lockLocation":[{"location":"Soul of Bat","comment":"Requires Mist + at least Leap Stone","locks":["Form of Mist + Leap Stone","Form of Mist + Gravity Boots","Form of Mist + Soul of Bat","Form of Mist + Power of Mist"]},{"location":"Fire of Bat","comment":"Requires flight","locks":["Soul of Bat","Gravity Boots + Leap Stone","Form of Mist + Power of Mist"]},{"location":"Echo of Bat","comment":"Requires flight + a transformation","locks":["Soul of Bat","Gravity Boots + Leap Stone + Form of Mist","Gravity Boots + Leap Stone + Soul of Wolf","Form of Mist + Power of Mist"]},{"location":"Force of Echo","comment":"In second castle","locks":["Holy glasses + Soul of Bat","Holy glasses + Gravity Boots + Leap Stone","Holy glasses + Form of Mist + Power of Mist"]},{"location":"Power of Wolf","comment":"Requires flight","locks":["Soul of Bat","Gravity Boots + Leap Stone","Form of Mist + Power of Mist"]},{"location":"Skill of Wolf","comment":"Requires at least Gravity Boots","locks":["Gravity Boots","Soul of Bat","Form of Mist + Power of Mist"]},{"location":"Form of Mist","comment":"Requires at least Leap Stone","locks":["Leap Stone","Gravity Boots","Soul of Bat","Form of Mist + Power of Mist"]},{"location":"Power of Mist","comment":"Requires flight","locks":["Soul of Bat","Gravity Boots + Leap Stone","Form of Mist + Power of Mist"]},{"location":"Gas Cloud","comment":"In second castle","locks":["Holy glasses + Soul of Bat","Holy glasses + Gravity Boots + Leap Stone","Holy glasses + Form of Mist + Power of Mist"]},{"location":"Gravity Boots","comment":"Requires flight","locks":["Soul of Bat","Gravity Boots + Leap Stone","Form of Mist + Power of Mist"]},{"location":"Leap Stone","comment":"Requires Jewel of Open or at least Leap Stone","locks":["Jewel of Open","Leap Stone","Gravity Boots","Soul of Bat","Form of Mist + Power of Mist"]},{"location":"Holy Symbol","comment":"Requires Jewel of Open and Merman Statue","locks":["Jewel of Open + Merman Statue"]},{"location":"Merman Statue","comment":"Requires Jewel of Open","locks":["Jewel of Open"]},{"location":"Bat Card","comment":"Requires at least Gravity Boots","locks":["Gravity Boots","Soul of Bat","Form of Mist + Power of Mist"]},{"location":"Ghost Card","comment":"Requires flight","locks":["Soul of Bat","Gravity Boots + Leap Stone","Form of Mist + Power of Mist"]},{"location":"Faerie Card","comment":"Requires at least Gravity Boots","locks":["Gravity Boots","Soul of Bat","Form of Mist + Power of Mist"]},{"location":"Demon Card","comment":"Access must also give at least Leap Stone","locks":["Jewel of Open + Leap Stone","Jewel of Open + Soul of Bat","Jewel of Open + Form of Mist + Power of Mist","Jewel of Open + Soul of Wolf + Power of Wolf"],"escapeRequires":["Soul of Bat","Leap Stone","Gravity Boots","Form of Mist + Power of Mist"]},{"location":"Sword Card","comment":"Requires flight","locks":["Soul of Bat","Gravity Boots + Leap Stone","Form of Mist + Power of Mist"]},{"location":"Heart of Vlad","comment":"In second castle","locks":["Holy glasses + Soul of Bat","Holy glasses + Gravity Boots + Leap Stone","Holy glasses + Form of Mist + Power of Mist"]},{"location":"Tooth of Vlad","comment":"In second castle","locks":["Holy glasses + Soul of Bat","Holy glasses + Gravity Boots + Leap Stone","Holy glasses + Form of Mist + Power of Mist"]},{"location":"Rib of Vlad","comment":"In second castle","locks":["Holy glasses + Soul of Bat","Holy glasses + Gravity Boots + Leap Stone + Form of Mist","Holy glasses + Gravity Boots + Leap Stone + Soul of Wolf","Holy glasses + Form of Mist + Power of Mist"]},{"location":"Ring of Vlad","comment":"In second castle","locks":["Holy glasses + Soul of Bat","Holy glasses + Gravity Boots + Leap Stone","Holy glasses + Form of Mist + Power of Mist"]},{"location":"Eye of Vlad","comment":"In second castle","locks":["Holy glasses + Soul of Bat","Holy glasses + Gravity Boots + Leap Stone","Holy glasses + Form of Mist + Power of Mist"]},{"location":"Spike Breaker","locks":["Jewel of Open + Soul of Bat + Echo of Bat"]},{"location":"Gold ring","comment":"Requires Jewel of Open + flight","locks":["Jewel of Open + Soul of Bat","Jewel of Open + Gravity Boots + Leap Stone","Jewel of Open + Form of Mist + Power of Mist"]},{"location":"Silver ring","locks":["Jewel of Open + Spike Breaker + Form of Mist"]},{"location":"Holy glasses","locks":["Silver ring + Gold ring"],"comment":"Access must also give flight","escapeRequires":["Soul of Bat","Gravity Boots + Leap Stone","Form of Mist + Power of Mist"]}]})

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
