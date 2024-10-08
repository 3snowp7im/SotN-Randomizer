// This is a generated file. Do not edit it directly.
// Make your changes to presets/first-castle.json then rebuild
// this file with `npm run build-presets -- first-castle`.
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
  const builder = PresetBuilder.fromJSON({"metadata":{"id":"first-castle","name":"First Castle","description":"All relics are available in the first castle. No need to stop anywhere in second castle!","author":"SacredLucy & Mottzilla","weight":-5005},"inherits":"open","stats":false,"unlockedMode":true,"prologueRewards":[{"comment":"No hearts left","item":"Heart Refresh","replacement":"Library card"},{"comment":"More than 41 hearts in cutscene","item":"Neutron bomb","replacement":"Library card"}],"placeRelic":[{"location":"Trio","relic":"Cube of Zoe"},{"location":"Force of Echo","relic":"Faerie Scroll"},{"location":"Gas Cloud","relic":"Spirit Orb"},{"location":"Heart of Vlad","relic":"Holy Symbol"},{"location":"Tooth of Vlad","relic":"Sword Card"},{"location":"Rib of Vlad","relic":"Gas Cloud"},{"location":"Ring of Vlad","relic":"Bat Card"},{"location":"Eye of Vlad","relic":"Fire of Bat"},{"location":"Dark Blade","relic":"Ghost Card"},{"location":"Ring of Arcana","relic":"Force of Echo"}],"complexityGoal":{"min":5,"goals":["Holy glasses + Heart of Vlad + Tooth of Vlad + Rib of Vlad + Ring of Vlad + Eye of Vlad"]},"writes":[{"comment":"Writes By MottZilla: Keep Teleporter Requires All Vlads","address":"0x125B8C","type":"word","value":"0x3C038007"},{"type":"word","value":"0x8C633404"},{"type":"word","value":"0x3C020001"},{"type":"word","value":"0x14620030"},{"type":"word","value":"0x34020000"},{"type":"word","value":"0x3C038009"},{"type":"word","value":"0x8C6374A0"},{"type":"word","value":"0x3402000B"},{"type":"word","value":"0x1462002B"},{"type":"word","value":"0x34020000"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x3C028007"},{"type":"word","value":"0x8C4230B0"},{"type":"word","value":"0x3C038009"},{"type":"word","value":"0x8C6373F0"},{"type":"word","value":"0x00021200"},{"type":"word","value":"0x00431021"},{"type":"word","value":"0x2442E0C0"},{"type":"word","value":"0x04410002"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x00021023"},{"type":"word","value":"0x28420004"},{"type":"word","value":"0x1040001D"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x3C028007"},{"type":"word","value":"0x8C4230B4"},{"type":"word","value":"0x3C038009"},{"type":"word","value":"0x8C6373F4"},{"type":"word","value":"0x00021200"},{"type":"word","value":"0x00431021"},{"type":"word","value":"0x2442F7B1"},{"type":"word","value":"0x04410002"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x00021023"},{"type":"word","value":"0x28420004"},{"type":"word","value":"0x10400010"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x3C048009"},{"type":"word","value":"0x3484797D"},{"type":"word","value":"0x34050000"},{"type":"word","value":"0x34060005"},{"type":"word","value":"0x90870000"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x00A72821"},{"type":"word","value":"0x24840001"},{"type":"word","value":"0x24C6FFFF"},{"type":"word","value":"0x14C0FFFA"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x3406000F"},{"type":"word","value":"0x14A60002"},{"type":"word","value":"0x00000000"},{"type":"word","value":"0x34020002"},{"type":"word","value":"0x03E00008"},{"comment":"End of Keep Teleporter Block","type":"word","value":"0x00000000"},{"comment":"Change Tileset LBA","address":"0xB084C","type":"short","value":"0x89C4"},{"comment":"Change Stage Number","address":"0x109294","type":"char","value":"0x20"},{"comment":"Change Teleport Coords","address":"0xAE5B6","type":"short","value":"0x0080"},{"type":"short","value":"0x0080"},{"type":"short","value":"0x00A8"},{"comment":"Keep Softlock Prevention","address":"0x5642528","type":"word","value":"0x00000000"}]})

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
