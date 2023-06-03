// This is a generated file. Do not edit it directly.
// Make your changes to presets/hunter.json then rebuild
// this file with `npm run build-presets -- hunter`.
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
  const builder = PresetBuilder.fromJSON({"metadata":{"id":"hunter","name":"Hunter","description":"Depend on drops instead of items on the ground, eliminates item checks","author":"eldri7ch and MottZilla0","weight":-100},"inherits":"casual","stats":false,"startingEquipment":[{"slot":"Right hand","item":"Alucart sword"},{"slot":"Left hand","item":"Alucart shield"},{"slot":"Head","item":"Dragon helm"},{"slot":"Body","item":"Alucart mail"},{"slot":"Cloak","item":"Twilight cloak"},{"slot":"Other","item":"Ring of Arcana"}],"prologueRewards":[{"item":"Neutron bomb","replacement":"Library card"}],"itemLocations":[{"zone":"*","item":"*","replacement":"Heart"},{"zone":"ST0","item":"Heart","index":1,"replacement":"Heart"},{"zone":"ST0","item":"Heart","index":2,"replacement":"Heart"},{"zone":"ST0","item":"Heart","index":3,"replacement":"Heart"},{"zone":"ST0","item":"Heart","index":4,"replacement":"Heart"},{"zone":"ST0","item":"Heart","index":5,"replacement":"Heart"},{"zone":"ST0","item":"Big heart","index":1,"replacement":"Big heart"},{"zone":"ST0","item":"Big heart","index":2,"replacement":"Big heart"},{"zone":"ST0","item":"Big heart","index":3,"replacement":"Big heart"},{"zone":"ST0","item":"Cross","replacement":"Cross"},{"zone":"ST0","item":"Holy Water","replacement":"Holy Water"},{"zone":"ST0","item":"Shield rod","replacement":"Shield rod"},{"zone":"ST0","item":"Dark shield","replacement":"Dark shield"},{"zone":"ST0","item":"Power of Sire","replacement":"Power of Sire"},{"zone":"ST0","item":"Firebrand","replacement":"Firebrand"},{"zone":"ST0","item":"Badelaire","replacement":"Badelaire"},{"zone":"ST0","item":"Moon rod","replacement":"Moon rod"},{"zone":"ST0","item":"Heart Refresh","replacement":"Heart Refresh"},{"zone":"ST0","item":"Sunglasses","replacement":"Sunglasses"}],"blockDrops":[{"enemy":"*","items":["Zircon","Aquamarine","Turquoise","Onyx","Garnet","Opal","Diamond"]}],"writes":[{"comment":"Jump to injected code","address":"0x000fa97c","type":"word","value":"0x0c04db00"},{"address":"0x00158c98","type":"word","value":"0x3c038009","comment":"lui v1, 0x8009"},{"type":"word","value":"0x34020003","comment":"ori v0, 0x0003"},{"type":"word","value":"0x34020063","comment":"ori v0, 0x0063"},{"comment":"sb v0, 0x7bc4 (v1)","type":"word","value":"0xa0627bc4"},{"comment":"j 0x800e493c","type":"word","value":"0x0803924f"},{"type":"word","value":"0x00000000","comment":"nop"},{"comment":"Death goes home.","address":"0x4BAEA08","type":"word","value":"0x18000006"}],"complexityGoal":{"min":5,"goals":["Holy glasses + Heart of Vlad + Tooth of Vlad + Rib of Vlad + Ring of Vlad + Eye of Vlad"]}})

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
