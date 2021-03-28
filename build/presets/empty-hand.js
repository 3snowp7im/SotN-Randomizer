// This is a generated file. Do not edit it directly.
// Make your changes to presets/empty-hand.json then rebuild
// this file with `npm run build-presets -- empty-hand`.
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
  const builder = PresetBuilder.fromJSON({"metadata":{"id":"empty-hand","name":"Empty hand","description":"No equipment or items challenge mode. Released on April 1st, 2020.","author":"3snow_p7im","weight":200},"inherits":"safe","stats":false,"itemLocations":[{"zone":"*","item":"*","replacement":"Heart"},{"zone":"ST0","item":"Heart","index":1,"replacement":"Heart"},{"zone":"ST0","item":"Heart","index":2,"replacement":"Heart"},{"zone":"ST0","item":"Heart","index":3,"replacement":"Heart"},{"zone":"ST0","item":"Heart","index":4,"replacement":"Heart"},{"zone":"ST0","item":"Heart","index":5,"replacement":"Heart"},{"zone":"ST0","item":"Big heart","index":1,"replacement":"Big heart"},{"zone":"ST0","item":"Big heart","index":2,"replacement":"Big heart"},{"zone":"ST0","item":"Big heart","index":3,"replacement":"Big heart"},{"zone":"ST0","item":"Cross","replacement":"Cross"},{"zone":"ST0","item":"Holy Water","replacement":"Holy Water"},{"zone":"ST0","item":"Shield rod","replacement":"Shield rod"},{"zone":"ST0","item":"Dark shield","replacement":"Dark shield"},{"zone":"ST0","item":"Power of Sire","replacement":"Power of Sire"},{"zone":"ST0","item":"Firebrand","replacement":"Firebrand"},{"zone":"ST0","item":"Badelaire","replacement":"Badelaire"},{"zone":"ST0","item":"Moon rod","replacement":"Moon rod"},{"zone":"ST0","item":"Heart Refresh","replacement":"Heart Refresh"},{"zone":"ST0","item":"Sunglasses","replacement":"Sunglasses"}],"enemyDrops":[{"enemy":"*","items":[null,null]},{"enemy":"Global","items":["$25","Heart","$1","$25","$25","$25","$25","$25","$25","$50","$50","$50","$50","$100","$100","Heart","Heart","Heart","Heart","Heart","Heart","Heart","Heart","Heart","Heart","Heart","Big heart","Big heart","$1","$250","$400","Heart"]}],"prologueRewards":[{"item":"Heart Refresh","replacement":null},{"item":"Neutron bomb","replacement":null},{"item":"Potion","replacement":null}],"startingEquipment":[{"slot":"Right hand","item":null}],"placeRelic":[{"location":"Gas Cloud","relic":["Fire of Bat","Force of Echo","Power of Wolf","Skill of Wolf","Gas Cloud","Cube of Zoe","Spirit Orb","Holy Symbol","Faerie Scroll","Bat Card","Ghost Card","Faerie Card","Demon Card","Sword Card","Sprite Card","Nosedevil Card",null]}]})

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
