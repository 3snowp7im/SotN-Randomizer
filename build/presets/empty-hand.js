// This is a generated file. Do not edit it directly.
// Make your changes to presets/empty-hand.json then rebuild
// this file with `npm run build-presets -- empty-hand`.
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
  const builder = PresetBuilder.fromJSON({"metadata":{"id":"empty-hand","name":"Empty hand","description":"No equipment or items challenge mode. Released on April 1st, 2020.","author":"3snow_p7im","weight":200},"inherits":"safe","itemLocations":[{"zone":"*","item":"*","replacement":"Heart"},{"zone":"ST0","item":"Cross","replacement":"Cross"},{"zone":"ST0","item":"Holy Water","replacement":"Holy Water"},{"zone":"ST0","item":"Big heart","index":1,"replacement":"Big heart"},{"zone":"ST0","item":"Big heart","index":2,"replacement":"Big heart"},{"zone":"ST0","item":"Big heart","index":3,"replacement":"Big heart"}],"enemyDrops":[{"enemy":"*","items":[null,null]},{"enemy":"Global","items":["$25","Heart","$1","$25","$25","$25","$25","$25","$25","$50","$50","$50","$50","$100","$100","Heart","Heart","Heart","Heart","Heart","Heart","Heart","Heart","Heart","Heart","Heart","Big heart","Big heart","$1","$250","$400","Heart","$1","$25","$25","$25","$25","$25","$25","$25","$50","$50","$50","$50","$50","$100","$100","$100","Heart","Heart","Heart","Heart","Heart","Heart","Heart","Heart","Heart","Heart","Heart","Heart","Big heart","Big heart","Big heart","Big heart"]}],"prologueRewards":[{"item":"Heart Refresh","replacement":null},{"item":"Neutron Bomb","replacement":null},{"item":"Potion","replacement":null}],"startingEquipment":[{"slot":"Right hand","item":null}],"placeRelic":[{"location":"Gas Cloud","relic":"Spirit Orb"}]})

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
