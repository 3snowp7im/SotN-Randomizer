// This is a generated file. Do not edit it directly.
// Make your changes to presets/april-fools.json then rebuild
// this file with `npm run build-presets -- april-fools`.
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
  const builder = PresetBuilder.fromJSON({"metadata":{"id":"april-fools","name":"Alphabet Soup","description":"April Fools Preset Released on April 1st, 2025.","author":["eldri7ch","MottZilla"],"weight":9000,"knowledgeCheck":"April Fools","metaExtension":"Classic","metaComplexity":"9","itemStats":"Normal","timeFrame":"Normal","moddedLevel":"None","castleType":"Normal","transformEarly":"No","transformFocus":"None","winCondition":"April Fools"},"preventLeaks":false,"stats":false,"colorrandoMode":false,"turkeyMode":false,"music":false,"relicLocationsExtension":false,"itemLocations":false,"prologueRewards":false,"startingEquipment":false,"enemyDrops":false,"placeRelic":[{"location":"Soul of Bat","relic":"Soul of Bat"},{"location":"Echo of Bat","relic":"Echo of Bat"},{"location":"Force of Echo","relic":"Force of Echo"},{"location":"Fire of Bat","relic":"Fire of Bat"},{"location":"Soul of Wolf","relic":"Soul of Wolf"},{"location":"Power of Wolf","relic":"Power of Wolf"},{"location":"Skill of Wolf","relic":"Skill of Wolf"},{"location":"Form of Mist","relic":"Form of Mist"},{"location":"Power of Mist","relic":"Power of Mist"},{"location":"Gas Cloud","relic":"Gas Cloud"},{"location":"Cube of Zoe","relic":"Cube of Zoe"},{"location":"Spirit Orb","relic":"Spirit Orb"},{"location":"Faerie Scroll","relic":"Faerie Scroll"},{"location":"Holy Symbol","relic":"Holy Symbol"},{"location":"Gravity Boots","relic":"Gravity Boots"},{"location":"Leap Stone","relic":"Leap Stone"},{"location":"Jewel of Open","relic":"Jewel of Open"},{"location":"Merman Statue","relic":"Merman Statue"},{"location":"Ghost Card","relic":"Ghost Card"},{"location":"Bat Card","relic":"Bat Card"},{"location":"Faerie Card","relic":"Faerie Card"},{"location":"Demon Card","relic":"Demon Card"},{"location":"Sword Card","relic":"Sword Card"},{"location":"Silver ring","relic":"Silver ring"},{"location":"Gold ring","relic":"Gold ring"},{"location":"Holy glasses","relic":"Holy glasses"},{"location":"Spike Breaker","relic":"Spike Breaker"},{"location":"Tooth of Vlad","relic":"Tooth of Vlad"},{"location":"Eye of Vlad","relic":"Eye of Vlad"},{"location":"Ring of Vlad","relic":"Ring of Vlad"},{"location":"Heart of Vlad","relic":"Heart of Vlad"},{"location":"Rib of Vlad","relic":"Rib of Vlad"}],"writes":[{"comment":"ABRSR","type":"word","address":"0x4FE4F68","value":"0x3C108003"},{"type":"word","value":"0x3610CA2C"},{"type":"word","value":"0x3C118003"},{"type":"word","value":"0x3631CA80"},{"type":"word","value":"0x8E120000"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x12400019"},{"type":"word","value":"0x26100004"},{"type":"word","value":"0x1611FFFB"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x3C108009"},{"type":"word","value":"0x36107964"},{"type":"word","value":"0x3C118009"},{"type":"word","value":"0x3631797B"},{"type":"word","value":"0x92120000"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x1240000F"},{"type":"word","value":"0x26100001"},{"type":"word","value":"0x1611FFFB"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x3C108009"},{"type":"word","value":"0x3610797D"},{"type":"word","value":"0x3C118009"},{"type":"word","value":"0x36317981"},{"type":"word","value":"0x92120000"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x12400005"},{"type":"word","value":"0x26100001"},{"type":"word","value":"0x1611FFFB"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x080704E4"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x080705E4"},{"type":"word","value":"0x00000000"},{"comment":"ABRSR Hook","type":"word","address":"0x4FCF814","value":"0x08074FBC"},{"comment":"Elevator Action Hook","address":"0x4FC3904","type":"word","value":"0x080681A8"},{"type":"word","value":"0x00000000"},{"comment":"Elevator Action","address":"0x4FA9CC8","type":"word","value":"0x27BDFFE8"},{"type":"word","value":"0xAFB00010"},{"type":"word","value":"0xAFA40008"},{"type":"word","value":"0xAFA5000C"},{"type":"word","value":"0x3C048008"},{"type":"word","value":"0x9484CB26"},{"type":"word","value":"0x34050047"},{"type":"word","value":"0x1485000B"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x3C048004"},{"type":"word","value":"0x9085BED0"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x30A50001"},{"type":"word","value":"0x14A00005"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x3C048007"},{"type":"word","value":"0x34050010"},{"type":"word","value":"0xA4853404"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x8FA40008"},{"type":"word","value":"0x8FA5000C"},{"type":"word","value":"0x0806DB5D"},{"type":"word","value":"0x00000000"}]})

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
