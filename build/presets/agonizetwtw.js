// This is a generated file. Do not edit it directly.
// Make your changes to presets/agonizetwtw.json then rebuild
// this file with `npm run build-presets -- agonizetwtw`.
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
  const builder = PresetBuilder.fromJSON({"metadata":{"id":"agonizetwtw","name":"Agonize 2020","description":"Simulates Agonize Preset from 2020. No stat randomization. Fixed locations for various relics to 'Maximize backtracking'.","author":"3snow_p7im, eldri7ch, Crazy4blades","weight":-3800},"preventLeaks":false,"stats":false,"music":false,"colorrandoMode":true,"replaceRelic":[{"relic":"Sprite Card","item":"Turkey"},{"relic":"Nosedevil Card","item":"Harper"}],"lockLocation":[{"location":"Trio","locks":["Holy glasses"]}],"placeRelic":[{"location":"Silver ring","relic":"Silver ring"},{"location":"Gold ring","relic":"Gold ring"},{"location":"Holy glasses","relic":"Holy glasses"},{"location":"Spike Breaker","relic":"Spike Breaker"},{"location":"Spirit Orb","relic":"Power of Wolf"},{"location":"Jewel of Open","relic":"Jewel of Open"},{"location":"Merman Statue","relic":"Soul of Wolf"},{"location":"Mormegil","relic":"Leap Stone"},{"location":"Leap Stone","relic":"Form of Mist"},{"location":"Soul of Bat","relic":"Power of Mist"},{"location":"Power of Wolf","relic":"Soul of Bat"},{"location":"Power of Mist","relic":"Echo of Bat"},{"location":"Eye of Vlad","relic":"Gravity Boots"},{"location":"Gas Cloud","relic":"Merman Statue"},{"location":"Force of Echo","relic":"Cube of Zoe"},{"location":"Fire of Bat","relic":["Ring of Vlad","Rib of Vlad","Eye of Vlad","Tooth of Vlad","Heart of Vlad"]},{"location":"Tooth of Vlad","relic":["Ring of Vlad","Rib of Vlad","Eye of Vlad","Tooth of Vlad","Heart of Vlad"]},{"location":"Ring of Arcana","relic":["Ring of Vlad","Rib of Vlad","Eye of Vlad","Tooth of Vlad","Heart of Vlad"]},{"location":"Force of Echo","relic":["Ring of Vlad","Rib of Vlad","Eye of Vlad","Tooth of Vlad","Heart of Vlad"]},{"location":"Holy Symbol","relic":["Ring of Vlad","Rib of Vlad","Eye of Vlad","Tooth of Vlad","Heart of Vlad"]}]})

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
