// This is a generated file. Do not edit it directly.
// Make your changes to presets/sample.json then rebuild
// this file with `npm run build-presets -- sample`.
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
  const builder = PresetBuilder.fromJSON({"metadata":{"id":"sample","name":"Sample","description":"A sample preset for demonstrative purposes.","author":"3snow_p7im","weight":0},"comment":"Build off the Safe preset","inherits":"safe","alias":[{"comment":"Alias NO3 as Entrance","zone":"NO3","alias":"Entrance"},{"comment":"Alias TOP as Castle Keep","zone":"TOP","alias":"Castle Keep"},{"comment":"Alias Leap Stone as Double Jump","relic":"Leap Stone","alias":"Double Jump"},{"comment":"Alias Sprite Card as Duplicator","relic":"Sprite Card","alias":"Duplicator"},{"comment":"Alias Nosedevil Card as Heart Refresh","relic":"Nosedevil Card","alias":"Heart Refresh"}],"replaceRelic":[{"comment":"Replace Sprite Card with Duplicator","relic":"Sprite Card","item":"Duplicator"},{"comment":"Replace Nosedevil Card with Heart Refresh","relic":"Nosedevil Card","item":"Heart Refresh"}],"placeRelic":[{"comment":"Sprit Orb at Form of Mist location","relic":"Spirit Orb","location":"Form of Mist"},{"comment":"Soul of Wolf or Form of Mist at Leap Stone location","relic":["Soul of Wolf","Form of Mist"],"location":"Leap Stone"}],"lockLocation":[{"location":"Soul of Bat","comment":"Access to Soul of Bat location must also give Soul of Wolf or form of Mist + Power of Mist","locks":["Form of Mist + Gravity Boots + Double Jump","Form of Mist + Power of Mist"],"escapeRequirements":["Soul of Wolf","Form of Mist + Power of Mist"]},{"location":"Power of Wolf","comment":"Requires Bat or Double Jump + Gravity Boots","locks":["Soul of Bat","Double Jump + Gravity Boots"]},{"location":"Merman Statue","comment":"Never let Merman Statue location have Form of Mist or Soul of Bat","locks":["Duplicator + Heart Refresh"],"block":["Form of Mist","Soul of Bat","Tooth of Vlad","Rib of Vlad","Eye of Vlad","Ring of Vlad","Heart of Vlad"]}],"enemyDrops":[{"comment":"Make Warg drop $400 and Combat Knife","enemy":"Warg","items":["$400","Combat knife"]},{"comment":"Make Merman level 3 drop Duplicator and Manna Prism","enemy":"Merman","level":3,"items":["Duplicator","Manna prism"]}],"startingEquipment":[{"slot":"Right hand","item":"Crissaegrim"},{"slot":"Left hand","item":"Dark shield"},{"slot":"Head","item":"Beryl circlet"},{"slot":"Body","item":"Dracula tunic"},{"slot":"Cloak","item":"Reverse cloak"},{"slot":"Other","item":"Ankh of Life"},{"slot":"AxeArmor","item":"Gold plate"},{"slot":"Luck Mode","item":"Talisman"}],"itemLocations":[{"comment":"Place a Library Card in the Pot Roast wall of Entrance","zone":"Entrance","item":"Pot roast","replacement":"Library card"},{"comment":"Place an Orange in the second Turkey wall of Castle Keep","zone":"Castle Keep","item":"Turkey","index":2,"replacement":"Orange"}],"prologueRewards":[{"item":"Heart Refresh","replacement":"Banana"},{"item":"Neutron bomb","replacement":"Bat pentagram"},{"item":"Potion","replacement":"Elixir"}],"complexityGoal":{"min":2,"max":7,"comment":"Require Soul of Bat + Soul of Wolf or Gravity Boots + Form of Mist to complete game","goals":["Soul of Bat + Soul of Wolf","Gravity Boots + Form of Mist"]}})

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
