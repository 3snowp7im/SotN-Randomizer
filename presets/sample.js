(function(self) {

  // Logic metadata.
  const metadata = {
    id: 'sample',
    name: 'Sample',
    description: 'A sample preset for demonstrative purposes.',
    author: '3snow_p7im',
    weight: 0,
  }

  // Boilerplate.
  let constants
  let util
  if (self) {
    constants = self.sotnRando.constants
    util = self.sotnRando.util
  } else {
    constants = require('../constants')
    util = require('../util')
  }
  const PresetBuilder = util.PresetBuilder
  const RELIC = constants.RELIC
  const SLOT = constants.SLOT
  const ZONE = constants.ZONE

  // Create PresetBuilder.
  const builder = new PresetBuilder(metadata)

  // ENEMY DROPS //
  // Make Warg drop $400 and Combat Knife.
  builder.enemyDrops('Warg', '$400', 'Combat Knife')
  // Make Meran level 3 drop Duplicator and Manna Prism.
  builder.enemyDrops('Merman', 3, 'Duplicator', 'Manna Prism')
  // To disable randomization:
  //   builder.enemyDrops(false)

  // STARTING EQUIPMENT //
  // Set specific starting equipment.
  builder.startingEquipment(SLOT.RIGHT_HAND, 'Crissaegrim')
  builder.startingEquipment(SLOT.LEFT_HAND, 'Dark Shield')
  builder.startingEquipment(SLOT.HEAD, 'Beryl Circlet')
  builder.startingEquipment(SLOT.BODY, 'Dracula Tunic')
  builder.startingEquipment(SLOT.CLOAK, 'Reverse Cloak')
  builder.startingEquipment(SLOT.OTHER, 'Ankh of Life')
  builder.startingEquipment(SLOT.AXEARMOR, 'Gold Plate')
  builder.startingEquipment(SLOT.LUCK_MODE, 'Talisman')
  // To disable randomization:
  //   builder.startingEquipment(false)

  // ITEM LOCATIONS //
  // Place a Library Card in the Pot Roast wall of Entrance.
  builder.itemLocations(ZONE.NO3, 'Pot Roast', 'Library Card')
  // Place an Orange in the second Turkey wall of Castle Keep.
  builder.itemLocations(ZONE.TOP, 'Turkey', 2, 'Orange')
  // To disable randomization:
  //   builder.itemLocations(false)

  // PROLOGUE REWARDS //
  // Set specific rewards.
  builder.prologueRewards('Heart Refresh', 'Banana')
  builder.prologueRewards('Neutron Bomb', 'Bat Pentagram')
  builder.prologueRewards('Potion', 'Elixir')
  // To disable randomization:
  //   builder.prologueRewards(false)

  // RELICS //
  // Sprit Orb at Form of Mist location.
  builder.placeRelic(RELIC.SPIRIT_ORB, RELIC.FORM_OF_MIST)
  // Soul of Bat location requires Gravity Boots + Leapstone.
  builder.lockLocation(RELIC.SOUL_OF_BAT, [
    RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
  ])
  // To disable randomization:
  //   builder.relicLocations(false)

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
