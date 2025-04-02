// This is a generated file. Do not edit it directly.
// Make your changes to presets/vanilla.json then rebuild
// this file with `npm run build-presets -- vanilla`.
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
  const builder = PresetBuilder.fromJSON({"metadata":{"id":"vanilla","name":"Vanilla","description":"April Fools Preset Released on April 1st, 2025. The vanilla game.","author":["eldri7ch"],"weight":-5001,"knowledgeCheck":"April Fools","metaExtension":"Classic","metaComplexity":"9","itemStats":"Normal","timeFrame":"Normal","moddedLevel":"None","castleType":"Normal","transformEarly":"No","transformFocus":"None","winCondition":"Normal"},"preventLeaks":false,"stats":false,"colorrandoMode":false,"turkeyMode":false,"music":false,"relicLocationsExtension":false,"itemLocations":false,"prologueRewards":false,"startingEquipment":false,"enemyDrops":false,"placeRelic":[{"location":"Soul of Bat","relic":"Soul of Bat"},{"location":"Echo of Bat","relic":"Echo of Bat"},{"location":"Force of Echo","relic":"Force of Echo"},{"location":"Fire of Bat","relic":"Fire of Bat"},{"location":"Soul of Wolf","relic":"Soul of Wolf"},{"location":"Power of Wolf","relic":"Power of Wolf"},{"location":"Skill of Wolf","relic":"Skill of Wolf"},{"location":"Form of Mist","relic":"Form of Mist"},{"location":"Power of Mist","relic":"Power of Mist"},{"location":"Gas Cloud","relic":"Gas Cloud"},{"location":"Cube of Zoe","relic":"Cube of Zoe"},{"location":"Spirit Orb","relic":"Spirit Orb"},{"location":"Faerie Scroll","relic":"Faerie Scroll"},{"location":"Holy Symbol","relic":"Holy Symbol"},{"location":"Gravity Boots","relic":"Gravity Boots"},{"location":"Leap Stone","relic":"Leap Stone"},{"location":"Jewel of Open","relic":"Jewel of Open"},{"location":"Merman Statue","relic":"Merman Statue"},{"location":"Ghost Card","relic":"Ghost Card"},{"location":"Bat Card","relic":"Bat Card"},{"location":"Faerie Card","relic":"Faerie Card"},{"location":"Demon Card","relic":"Demon Card"},{"location":"Sword Card","relic":"Sword Card"},{"location":"Silver ring","relic":"Silver ring"},{"location":"Gold ring","relic":"Gold ring"},{"location":"Holy glasses","relic":"Holy glasses"},{"location":"Spike Breaker","relic":"Spike Breaker"},{"location":"Tooth of Vlad","relic":"Tooth of Vlad"},{"location":"Eye of Vlad","relic":"Eye of Vlad"},{"location":"Ring of Vlad","relic":"Ring of Vlad"},{"location":"Heart of Vlad","relic":"Heart of Vlad"},{"location":"Rib of Vlad","relic":"Rib of Vlad"}]})

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
