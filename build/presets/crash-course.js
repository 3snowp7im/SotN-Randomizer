// This is a generated file. Do not edit it directly.
// Make your changes to presets/crash-course.json then rebuild
// this file with `npm run build-presets -- crash-course`.
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
  const builder = PresetBuilder.fromJSON({"metadata":{"id":"crash-course","name":"Crash Course","description":"Start with Soul of Bat, Leap Stone, Gravity Boots, Duplicator, Manna prism, and Buffalo star. 'Tourist' relic extension.","author":"eldri7ch & Mottzilla","weight":-1750},"inherits":"nimble","relicLocationsExtension":"tourist","stats":false,"music":false,"colorrandoMode":true,"complexityGoal":{"min":7,"goals":["Holy glasses + Heart of Vlad + Tooth of Vlad + Rib of Vlad + Ring of Vlad + Eye of Vlad"]},"itemLocations":[{"comment":"Place Stopwatch in the Clock Room","zone":"NO0","item":"Big heart","index":16,"replacement":"Stopwatch"},{"comment":"Place Stopwatch in the Clock Room","zone":"NO0","item":"Big heart","index":17,"replacement":"Stopwatch"},{"comment":"Place Library Card in Reverce Entrance","zone":"RNO3","item":"Hammer","replacement":"Library card"}],"writes":[{"type":"word","address":"0x158C30","value":"0x3C028004","comment":"RLBC"},{"type":"word","value":"0x9045925D"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x38A500FF"},{"type":"word","value":"0x30A50040"},{"type":"word","value":"0x10A00008"},{"type":"word","value":"0x3C028007"},{"type":"word","value":"0x9042BBFB"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x10400004"},{"type":"word","value":"0x34180022"},{"type":"word","value":"0x341988BE"},{"type":"word","value":"0x18000003"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x34180002"},{"type":"word","value":"0x34197C0E"},{"type":"word","value":"0x3C02800F"},{"type":"word","value":"0xA0581724"},{"type":"word","value":"0x3B180020"},{"type":"word","value":"0xA05832A4"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x3C02800A"},{"type":"word","value":"0xA4593C98"},{"type":"word","value":"0x34040000"},{"type":"word","value":"0x0804390B"},{"type":"word","value":"0x00000000","comment":"Block A End"},{"type":"word","address":"0x12B534","value":"0x0C04DAE6","comment":"Reverse Library Card"},{"comment":"Never get Clock Blocked","type":"word","address":"0x4951D4C","value":"0x3C020002"},{"type":"word","address":"0x4FCF264","value":"0x3C020002"},{"comment":"Open means Free Relics","type":"word","address":"0x47A3098","value":"0x00000000"}]})

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
