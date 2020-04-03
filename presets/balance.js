(function(self) {

  // Logic metadata.
  const metadata = {
    id: 'balance',
    name: 'Balance',
    description: [
      'No equipment or items challenge mode.',
      'Released on April 1st, 2020.',
    ].join(' '),
    author: '3snow_p7im',
    weight: 100,
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
  const ZONE = constants.ZONE
  const SLOT = constants.SLOT
  const RELIC = constants.RELIC
  const LOCATION = constants.LOCATION

  // Create PresetBuilder.
  const builder = new PresetBuilder(metadata)

  // Disable items.
  builder.itemLocations('*', '*', 'Heart')

  // Restore subweapons and big hearts in prologue.
  builder.itemLocations(ZONE.ST0, 'Cross', 'Cross')
  builder.itemLocations(ZONE.ST0, 'Holy Water', 'Holy Water')
  builder.itemLocations(ZONE.ST0, 'Big heart', 1, 'Big heart')
  builder.itemLocations(ZONE.ST0, 'Big heart', 2, 'Big heart')
  builder.itemLocations(ZONE.ST0, 'Big heart', 3, 'Big heart')

  // Disable drops.
  builder.enemyDrops('*', undefined, undefined)

  // Disable prologue rewards.
  builder.prologueRewards('Heart Refresh', undefined)
  builder.prologueRewards('Neutron Bomb', undefined)
  builder.prologueRewards('Potion', undefined)

  // Start with Empty hand.
  builder.startingEquipment(SLOT.RIGHT_HAND, undefined)

  // Enable Guarded relic location extension.
  builder.relicLocationsExtension('guarded')

  // Lock everything except Gas Cloud with Spirit Orb.
  builder.lockLocation(RELIC.CUBE_OF_ZOE, [
    RELIC.SPIRIT_ORB,
  ])
  builder.lockLocation(RELIC.SPIRIT_ORB, [
    RELIC.SPIRIT_ORB,
  ])
  builder.lockLocation(RELIC.SOUL_OF_WOLF, [
    RELIC.SPIRIT_ORB,
  ])
  builder.lockLocation(RELIC.FAERIE_SCROLL, [
    RELIC.SPIRIT_ORB,
  ])
  builder.lockLocation(RELIC.JEWEL_OF_OPEN, [
    RELIC.SPIRIT_ORB,
  ])

  // Soul of Bat requires Mist + at least Leap Stone.
  builder.lockLocation(RELIC.SOUL_OF_BAT, [
    RELIC.SPIRIT_ORB + RELIC.FORM_OF_MIST + RELIC.LEAP_STONE,
    RELIC.SPIRIT_ORB + RELIC.FORM_OF_MIST + RELIC.GRAVITY_BOOTS,
    RELIC.SPIRIT_ORB + RELIC.FORM_OF_MIST + RELIC.SOUL_OF_BAT,
    RELIC.SPIRIT_ORB + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Fire of Bat requires flight.
  builder.lockLocation(RELIC.FIRE_OF_BAT, [
    RELIC.SPIRIT_ORB + RELIC.SOUL_OF_BAT,
    RELIC.SPIRIT_ORB + RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.SPIRIT_ORB + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Echo of Bat requires flight + a transformation.
  builder.lockLocation(RELIC.ECHO_OF_BAT, [
    RELIC.SPIRIT_ORB + RELIC.SOUL_OF_BAT,
    RELIC.SPIRIT_ORB + RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS
      + RELIC.FORM_OF_MIST,
    RELIC.SPIRIT_ORB + RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS
      + RELIC.SOUL_OF_WOLF,
    RELIC.SPIRIT_ORB + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Force of Echo in second castle.
  builder.lockLocation(RELIC.FORCE_OF_ECHO, [
    RELIC.SPIRIT_ORB + RELIC.HOLY_GLASSES + RELIC.SOUL_OF_BAT,
    RELIC.SPIRIT_ORB + RELIC.HOLY_GLASSES + RELIC.LEAP_STONE
      + RELIC.GRAVITY_BOOTS,
    RELIC.SPIRIT_ORB + RELIC.HOLY_GLASSES + RELIC.FORM_OF_MIST
      + RELIC.POWER_OF_MIST,
  ])

  // Power of Wolf requires flight.
  builder.lockLocation(RELIC.POWER_OF_WOLF, [
    RELIC.SPIRIT_ORB + RELIC.SOUL_OF_BAT,
    RELIC.SPIRIT_ORB + RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.SPIRIT_ORB + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Skill of Wolf requires at least Gravity Boots.
  builder.lockLocation(RELIC.SKILL_OF_WOLF, [
    RELIC.SPIRIT_ORB + RELIC.GRAVITY_BOOTS,
    RELIC.SPIRIT_ORB + RELIC.SOUL_OF_BAT,
    RELIC.SPIRIT_ORB + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Form of Mist requires at least Leap Stone.
  builder.lockLocation(RELIC.FORM_OF_MIST, [
    RELIC.SPIRIT_ORB + RELIC.LEAP_STONE,
    RELIC.SPIRIT_ORB + RELIC.GRAVITY_BOOTS,
    RELIC.SPIRIT_ORB + RELIC.SOUL_OF_BAT,
    RELIC.SPIRIT_ORB + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Power of Mist requires flight.
  builder.lockLocation(RELIC.POWER_OF_MIST, [
    RELIC.SPIRIT_ORB + RELIC.SOUL_OF_BAT,
    RELIC.SPIRIT_ORB + RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.SPIRIT_ORB + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Gravity Boots requires flight.
  builder.lockLocation(RELIC.GRAVITY_BOOTS, [
    RELIC.SPIRIT_ORB + RELIC.SOUL_OF_BAT,
    RELIC.SPIRIT_ORB + RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.SPIRIT_ORB + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Leap Stone requires Jewel of Open or at least Leap Stone.
  builder.lockLocation(RELIC.LEAP_STONE, [
    RELIC.SPIRIT_ORB + RELIC.JEWEL_OF_OPEN,
    RELIC.SPIRIT_ORB + RELIC.LEAP_STONE,
    RELIC.SPIRIT_ORB + RELIC.GRAVITY_BOOTS,
    RELIC.SPIRIT_ORB + RELIC.SOUL_OF_BAT,
    RELIC.SPIRIT_ORB + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Holy Symbol requires Jewel of Open and Merman Statue.
  builder.lockLocation(RELIC.HOLY_SYMBOL, [
    RELIC.SPIRIT_ORB + RELIC.JEWEL_OF_OPEN + RELIC.MERMAN_STATUE,
  ])

  // Merman Statue requires Jewel of Open.
  builder.lockLocation(RELIC.MERMAN_STATUE, [
    RELIC.SPIRIT_ORB + RELIC.JEWEL_OF_OPEN,
  ])

  // Bat Card requires at least Gravity Boots.
  builder.lockLocation(RELIC.BAT_CARD, [
    RELIC.SPIRIT_ORB + RELIC.GRAVITY_BOOTS,
    RELIC.SPIRIT_ORB + RELIC.SOUL_OF_BAT,
    RELIC.SPIRIT_ORB + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Ghost Card requires flight.
  builder.lockLocation(RELIC.GHOST_CARD, [
    RELIC.SPIRIT_ORB + RELIC.SOUL_OF_BAT,
    RELIC.SPIRIT_ORB + RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.SPIRIT_ORB + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Faerie Card requires at least Gravity Boots.
  builder.lockLocation(RELIC.FAERIE_CARD, [
    RELIC.SPIRIT_ORB + RELIC.GRAVITY_BOOTS,
    RELIC.SPIRIT_ORB + RELIC.SOUL_OF_BAT,
    RELIC.SPIRIT_ORB + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Demon Card requires Jewel of Open + at least Leap Stone.
  builder.lockLocation(RELIC.DEMON_CARD, [
    RELIC.SPIRIT_ORB + RELIC.JEWEL_OF_OPEN + RELIC.LEAP_STONE,
    RELIC.SPIRIT_ORB + RELIC.JEWEL_OF_OPEN + RELIC.SOUL_OF_BAT,
    RELIC.SPIRIT_ORB + RELIC.JEWEL_OF_OPEN + RELIC.FORM_OF_MIST
      + RELIC.POWER_OF_MIST,
  ])

  // Sword Card requires flight.
  builder.lockLocation(RELIC.SWORD_CARD, [
    RELIC.SPIRIT_ORB + RELIC.SOUL_OF_BAT,
    RELIC.SPIRIT_ORB + RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.SPIRIT_ORB + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Heart of Vlad in second castle.
  builder.lockLocation(RELIC.HEART_OF_VLAD, [
    RELIC.SPIRIT_ORB + RELIC.HOLY_GLASSES + RELIC.SOUL_OF_BAT,
    RELIC.SPIRIT_ORB + RELIC.HOLY_GLASSES + RELIC.LEAP_STONE
      + RELIC.GRAVITY_BOOTS,
    RELIC.SPIRIT_ORB + RELIC.HOLY_GLASSES + RELIC.FORM_OF_MIST
      + RELIC.POWER_OF_MIST,
  ])

  // Tooth of Vlad in second castle.
  builder.lockLocation(RELIC.TOOTH_OF_VLAD, [
    RELIC.SPIRIT_ORB + RELIC.HOLY_GLASSES + RELIC.SOUL_OF_BAT,
    RELIC.SPIRIT_ORB + RELIC.HOLY_GLASSES + RELIC.LEAP_STONE
      + RELIC.GRAVITY_BOOTS,
    RELIC.SPIRIT_ORB + RELIC.HOLY_GLASSES + RELIC.FORM_OF_MIST
      + RELIC.POWER_OF_MIST,
  ])

  // Rib of Vlad in second castle.
  builder.lockLocation(RELIC.RIB_OF_VLAD, [
    RELIC.SPIRIT_ORB + RELIC.HOLY_GLASSES + RELIC.SOUL_OF_BAT,
    RELIC.SPIRIT_ORB + RELIC.HOLY_GLASSES + RELIC.LEAP_STONE
      + RELIC.GRAVITY_BOOTS,
    RELIC.SPIRIT_ORB + RELIC.HOLY_GLASSES + RELIC.FORM_OF_MIST
      + RELIC.POWER_OF_MIST,
  ])

  // Ring of Vlad in second castle.
  builder.lockLocation(RELIC.RING_OF_VLAD, [
    RELIC.SPIRIT_ORB + RELIC.HOLY_GLASSES + RELIC.SOUL_OF_BAT,
    RELIC.SPIRIT_ORB + RELIC.HOLY_GLASSES + RELIC.LEAP_STONE
      + RELIC.GRAVITY_BOOTS,
    RELIC.SPIRIT_ORB + RELIC.HOLY_GLASSES + RELIC.FORM_OF_MIST
      + RELIC.POWER_OF_MIST,
  ])

  // Eye of Vlad in second castle.
  builder.lockLocation(RELIC.EYE_OF_VLAD, [
    RELIC.SPIRIT_ORB + RELIC.HOLY_GLASSES + RELIC.SOUL_OF_BAT,
    RELIC.SPIRIT_ORB + RELIC.HOLY_GLASSES + RELIC.LEAP_STONE
      + RELIC.GRAVITY_BOOTS,
    RELIC.SPIRIT_ORB + RELIC.HOLY_GLASSES + RELIC.FORM_OF_MIST
      + RELIC.POWER_OF_MIST,
  ])

  // Spike Breaker requires Jewel of Open + Soul of Bat + Echo of Bat.
  builder.lockLocation(RELIC.SPIKE_BREAKER, [
    RELIC.SPIRIT_ORB + RELIC.JEWEL_OF_OPEN + RELIC.SOUL_OF_BAT
      + RELIC.ECHO_OF_BAT,
  ])

  // Gold Ring requires Jewel of Open + flight.
  builder.lockLocation(RELIC.GOLD_RING, [
    RELIC.SPIRIT_ORB + RELIC.JEWEL_OF_OPEN + RELIC.SOUL_OF_BAT,
    RELIC.SPIRIT_ORB + RELIC.JEWEL_OF_OPEN + RELIC.LEAP_STONE
      + RELIC.GRAVITY_BOOTS,
    RELIC.SPIRIT_ORB + RELIC.JEWEL_OF_OPEN + RELIC.FORM_OF_MIST
      + RELIC.POWER_OF_MIST,
  ])

  // Silver Ring requires Jewel of Open + Spike Breaker + Form of Mist.
  builder.lockLocation(RELIC.SILVER_RING, [
    RELIC.SPIRIT_ORB + RELIC.JEWEL_OF_OPEN + RELIC.SPIKE_BREAKER
      + RELIC.FORM_OF_MIST,
  ])

  // Holy Glasses requires Rings + flight.
  builder.lockLocation(RELIC.HOLY_GLASSES, [
    RELIC.SPIRIT_ORB + RELIC.SILVER_RING + RELIC.GOLD_RING + RELIC.SOUL_OF_BAT,
    RELIC.SPIRIT_ORB + RELIC.SILVER_RING + RELIC.GOLD_RING
      + RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.SPIRIT_ORB + RELIC.SILVER_RING + RELIC.GOLD_RING
      + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Crystal Cloak location requires Jewel of Open.
  builder.lockLocation(LOCATION.CRYSTAL_CLOAK, [
    RELIC.SPIRIT_ORB + RELIC.JEWEL_OF_OPEN,
  ])

  // Mormegil requires Jewel of Open + at least Leap Stone.
  builder.lockLocation(LOCATION.MORMEGIL, [
    RELIC.SPIRIT_ORB + RELIC.JEWEL_OF_OPEN + RELIC.LEAP_STONE,
    RELIC.SPIRIT_ORB + RELIC.JEWEL_OF_OPEN + RELIC.SOUL_OF_BAT,
    RELIC.SPIRIT_ORB + RELIC.JEWEL_OF_OPEN + RELIC.FORM_OF_MIST
      + RELIC.POWER_OF_MIST,
    RELIC.SPIRIT_ORB + RELIC.JEWEL_OF_OPEN + RELIC.SOUL_OF_WOLF
      + RELIC.POWER_OF_WOLF + RELIC.GRAVITY_BOOTS,
  ])

  // Dark Blade in second castle.
  builder.lockLocation(LOCATION.DARK_BLADE, [
    RELIC.SPIRIT_ORB + RELIC.HOLY_GLASSES + RELIC.SOUL_OF_BAT,
    RELIC.SPIRIT_ORB + RELIC.HOLY_GLASSES + RELIC.LEAP_STONE
      + RELIC.GRAVITY_BOOTS,
    RELIC.SPIRIT_ORB + RELIC.HOLY_GLASSES + RELIC.FORM_OF_MIST
      + RELIC.POWER_OF_MIST,
  ])

  // Ring of Arcana in second castle.
  builder.lockLocation(LOCATION.RING_OF_ARCANA, [
    RELIC.SPIRIT_ORB + RELIC.HOLY_GLASSES + RELIC.SOUL_OF_BAT,
    RELIC.SPIRIT_ORB + RELIC.HOLY_GLASSES + RELIC.LEAP_STONE
      + RELIC.GRAVITY_BOOTS,
    RELIC.SPIRIT_ORB + RELIC.HOLY_GLASSES + RELIC.FORM_OF_MIST
      + RELIC.POWER_OF_MIST,
  ])

  // Game completion requires Holy Glasses + Vlad Relics.
  builder.complexityGoal(5, [
    RELIC.HOLY_GLASSES
      + RELIC.HEART_OF_VLAD
      + RELIC.TOOTH_OF_VLAD
      + RELIC.RIB_OF_VLAD
      + RELIC.RING_OF_VLAD
      + RELIC.EYE_OF_VLAD,
  ])

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
