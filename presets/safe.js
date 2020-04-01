(function(self) {

  // Logic metadata.
  const metadata = {
    id: 'safe',
    name: 'Safe',
    description: 'Requires no speedrun or glitch knowledge for completion.',
    author: '3snow_p7im, setz, and soba',
    weight: -300,
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
  const EXTENSION = constants.EXTENSION
  const LOCATION = constants.LOCATION

  // Create PresetBuilder.
  const builder = new PresetBuilder(metadata)

  // Inherit Casual preset.
  builder.inherits('casual')

  // Enable guarded relic location extension.
  builder.relicLocationsExtension(EXTENSION.GUARDED)

  // Scylla location requires Jewel of Open.
  builder.lockLocation(LOCATION.CRYSTAL_CLOAK, [
    RELIC.JEWEL_OF_OPEN,
  ])

  // Granfalloon requires Jewel of Open + at least Leap Stone.
  builder.lockLocation(LOCATION.MORMEGIL, [
    RELIC.JEWEL_OF_OPEN + RELIC.LEAP_STONE,
    RELIC.JEWEL_OF_OPEN + RELIC.SOUL_OF_BAT,
    RELIC.JEWEL_OF_OPEN + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
    RELIC.JEWEL_OF_OPEN + RELIC.SOUL_OF_WOLF + RELIC.POWER_OF_WOLF
      + RELIC.GRAVITY_BOOTS,
  ])

  // Doppleganger 40 in second castle.
  builder.lockLocation(LOCATION.DARK_BLADE, [
    RELIC.HOLY_GLASSES + RELIC.SOUL_OF_BAT,
    RELIC.HOLY_GLASSES + RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.HOLY_GLASSES + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Beezlebub in second castle.
  builder.lockLocation(LOCATION.RING_OF_ARCANA, [
    RELIC.HOLY_GLASSES + RELIC.SOUL_OF_BAT,
    RELIC.HOLY_GLASSES + RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.HOLY_GLASSES + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Holy Mail requires flight.
  builder.lockLocation(LOCATION.HOLY_MAIL, [
    RELIC.SOUL_OF_BAT,
    RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Jewel Sword requires Wolf + Bat.
  builder.lockLocation(LOCATION.JEWEL_SWORD, [
    RELIC.SOUL_OF_WOLF + RELIC.SOUL_OF_BAT,
  ])

  // Mystic Pendant requires at least Leap Stone.
  builder.lockLocation(LOCATION.MYSTIC_PENDANT, [
    RELIC.SOUL_OF_BAT,
    RELIC.LEAP_STONE,
    RELIC.GRAVITY_BOOTS,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Ankh of Life requires at least Leap Stone.
  builder.lockLocation(LOCATION.ANKH_OF_LIFE, [
    RELIC.SOUL_OF_BAT,
    RELIC.LEAP_STONE,
    RELIC.GRAVITY_BOOTS,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Morning Star requires at least Leap Stone.
  builder.lockLocation(LOCATION.MORNING_STAR, [
    RELIC.SOUL_OF_BAT,
    RELIC.LEAP_STONE,
    RELIC.GRAVITY_BOOTS,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Goggles requires Jewel of Open or at least Leap Stone.
  builder.lockLocation(LOCATION.MORNING_STAR, [
    RELIC.JEWEL_OF_OPEN,
    RELIC.SOUL_OF_BAT,
    RELIC.LEAP_STONE,
    RELIC.GRAVITY_BOOTS,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Silver Plate requires Jewel of Open or at least Leap Stone.
  builder.lockLocation(LOCATION.SILVER_PLATE, [
    RELIC.JEWEL_OF_OPEN,
    RELIC.SOUL_OF_BAT,
    RELIC.LEAP_STONE,
    RELIC.GRAVITY_BOOTS,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Cutlass requires Jewel of Open or at least Leap Stone.
  builder.lockLocation(LOCATION.CUTLASS, [
    RELIC.JEWEL_OF_OPEN,
    RELIC.SOUL_OF_BAT,
    RELIC.LEAP_STONE,
    RELIC.GRAVITY_BOOTS,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Platinum Mail requires at least Gravity Boots.
  builder.lockLocation(LOCATION.PLATINUM_MAIL, [
    RELIC.SOUL_OF_BAT,
    RELIC.GRAVITY_BOOTS,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Falchion requires at least Leap Stone
  builder.lockLocation(LOCATION.FALCHION, [
    RELIC.SOUL_OF_BAT,
    RELIC.LEAP_STONE,
    RELIC.GRAVITY_BOOTS,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Gold Plate requires at least Leap Stone.
  builder.lockLocation(LOCATION.GOLD_PLATE, [
    RELIC.SOUL_OF_BAT,
    RELIC.LEAP_STONE,
    RELIC.GRAVITY_BOOTS,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Bekatowa requires at least Gravity Boots.
  builder.lockLocation(LOCATION.BEKATOWA, [
    RELIC.SOUL_OF_BAT,
    RELIC.GRAVITY_BOOTS,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Holy Rod requires at least Gravity Boots.
  builder.lockLocation(LOCATION.HOLY_ROD, [
    RELIC.SOUL_OF_BAT,
    RELIC.GRAVITY_BOOTS,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Alucart Sword requires at least Cube of Zoe + at least Leap Stone.
  builder.lockLocation(LOCATION.ALUCART_SWORD, [
    RELIC.CUBE_OF_ZOE + RELIC.SOUL_OF_BAT,
    RELIC.CUBE_OF_ZOE + RELIC.LEAP_STONE,
    RELIC.CUBE_OF_ZOE + RELIC.GRAVITY_BOOTS,
    RELIC.CUBE_OF_ZOE + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Broadsword requires at least Leap Stone.
  builder.lockLocation(LOCATION.BROADSWORD, [
    RELIC.SOUL_OF_BAT,
    RELIC.LEAP_STONE,
    RELIC.GRAVITY_BOOTS,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Estoc requires flight.
  builder.lockLocation(LOCATION.ESTOC, [
    RELIC.SOUL_OF_BAT,
    RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Olrox Garnet requires flight.
  builder.lockLocation(LOCATION.OLROX_GARNET, [
    RELIC.SOUL_OF_BAT,
    RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Blood Cloak requires at least Leap Stone.
  builder.lockLocation(LOCATION.BLOOD_CLOAK, [
    RELIC.SOUL_OF_BAT,
    RELIC.LEAP_STONE,
    RELIC.GRAVITY_BOOTS,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Shield Rod requires at least Leap Stone.
  builder.lockLocation(LOCATION.SHIELD_ROD, [
    RELIC.SOUL_OF_BAT,
    RELIC.LEAP_STONE,
    RELIC.GRAVITY_BOOTS,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Knight Shield requires at least Leap Stone.
  builder.lockLocation(LOCATION.KNIGHT_SHIELD, [
    RELIC.SOUL_OF_BAT,
    RELIC.LEAP_STONE,
    RELIC.GRAVITY_BOOTS,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Holy Sword requires at least Gravity Boots.
  builder.lockLocation(LOCATION.HOLY_SWORD, [
    RELIC.SOUL_OF_BAT,
    RELIC.GRAVITY_BOOTS,
    RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Bandana requires Jewel of Open.
  builder.lockLocation(LOCATION.BANDANA, [
    RELIC.JEWEL_OF_OPEN
  ])

  // Secret Boots requires Jewel of Open + flight.
  builder.lockLocation(LOCATION.SECRET_BOOTS, [
    RELIC.JEWEL_OF_OPEN + RELIC.SOUL_OF_BAT,
    RELIC.JEWEL_OF_OPEN + RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.JEWEL_OF_OPEN + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Nunchaku requires Jewel of Open + Holy Symbol.
  builder.lockLocation(LOCATION.NUNCHAKU, [
    RELIC.JEWEL_OF_OPEN + RELIC.HOLY_SYMBOL,
  ])

  // Knuckle Duster requires Jewel of Open.
  builder.lockLocation(LOCATION.KNUCKLE_DUSTER, [
    RELIC.JEWEL_OF_OPEN,
  ])

  // Caverns Onyx requires Jewel of Open + at least Leap Stone.
  builder.lockLocation(LOCATION.CAVERNS_ONYX, [
    RELIC.JEWEL_OF_OPEN + RELIC.SOUL_OF_BAT,
    RELIC.JEWEL_OF_OPEN + RELIC.HOLY_SYMBOL + RELIC.LEAP_STONE,
    RELIC.JEWEL_OF_OPEN + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Combat Knife requires Jewel of Open + at least Leap Stone.
  builder.lockLocation(LOCATION.COMBAT_KNIFE, [
    RELIC.JEWEL_OF_OPEN + RELIC.SOUL_OF_BAT,
    RELIC.JEWEL_OF_OPEN + RELIC.LEAP_STONE,
    RELIC.JEWEL_OF_OPEN + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Ring of Ares requires Jewel of Open + Demon Card + at least Leap Stone.
  builder.lockLocation(LOCATION.RING_OF_ARES, [
    RELIC.JEWEL_OF_OPEN + RELIC.DEMON_CARD + RELIC.SOUL_OF_BAT,
    RELIC.JEWEL_OF_OPEN + RELIC.DEMON_CARD + RELIC.LEAP_STONE,
    RELIC.JEWEL_OF_OPEN + RELIC.DEMON_CARD +
      RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Bloodstone requires Jewel of Open + at least Leap Stone.
  builder.lockLocation(LOCATION.BLOODSTONE, [
    RELIC.JEWEL_OF_OPEN + RELIC.DEMON_CARD + RELIC.SOUL_OF_BAT,
    RELIC.JEWEL_OF_OPEN + RELIC.DEMON_CARD + RELIC.LEAP_STONE,
    RELIC.JEWEL_OF_OPEN + RELIC.DEMON_CARD +
      RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Icebrand requires Jewel of Open + at least Leap Stone.
  builder.lockLocation(LOCATION.ICEBRAND, [
    RELIC.JEWEL_OF_OPEN + RELIC.SOUL_OF_BAT,
    RELIC.JEWEL_OF_OPEN + RELIC.LEAP_STONE,
    RELIC.JEWEL_OF_OPEN + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Walk Armor requires Jewel of Open + at least Leap Stone.
  builder.lockLocation(LOCATION.WALK_ARMOR, [
    RELIC.JEWEL_OF_OPEN + RELIC.SOUL_OF_BAT,
    RELIC.JEWEL_OF_OPEN + RELIC.LEAP_STONE,
    RELIC.JEWEL_OF_OPEN + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Beryl Circlet requires Holy Glasses + Bat + Wolf.
  builder.lockLocation(LOCATION.BERYL_CIRCLET, [
    RELIC.HOLY_GLASSES + RELIC.SOUL_OF_BAT + RELIC.SOUL_OF_WOLF,
  ])

  // Talisman requires Holy Glasses + flight.
  builder.lockLocation(LOCATION.TALISMAN, [
    RELIC.HOLY_GLASSES + RELIC.SOUL_OF_BAT,
    RELIC.HOLY_GLASSES + RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.HOLY_GLASSES + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Katana requires Holy Glasses + flight.
  builder.lockLocation(LOCATION.KATANA, [
    RELIC.HOLY_GLASSES + RELIC.SOUL_OF_BAT,
    RELIC.HOLY_GLASSES + RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.HOLY_GLASSES + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Goddess Shield requires Holy Glasses + flight.
  builder.lockLocation(LOCATION.GODDESS_SHIELD, [
    RELIC.HOLY_GLASSES + RELIC.SOUL_OF_BAT,
    RELIC.HOLY_GLASSES + RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.HOLY_GLASSES + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Twilight Cloak requires Mist + Holy Glasses + flight.
  builder.lockLocation(LOCATION.TWILIGHT_CLOAK, [
    RELIC.HOLY_GLASSES + RELIC.SOUL_OF_BAT + RELIC.FORM_OF_MIST,
    RELIC.HOLY_GLASSES + RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS
      + RELIC.FORM_OF_MIST,
    RELIC.HOLY_GLASSES + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST
      + RELIC.FORM_OF_MIST,
  ])

  // Talwar requires Holy Glasses + flight.
  builder.lockLocation(LOCATION.TALWAR, [
    RELIC.HOLY_GLASSES + RELIC.SOUL_OF_BAT,
    RELIC.HOLY_GLASSES + RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.HOLY_GLASSES + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Sword of Dawn requires Holy Glasses + flight.
  builder.lockLocation(LOCATION.SWORD_OF_DAWN, [
    RELIC.HOLY_GLASSES + RELIC.SOUL_OF_BAT,
    RELIC.HOLY_GLASSES + RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.HOLY_GLASSES + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Bastard Sword requires Holy Glasses + flight.
  builder.lockLocation(LOCATION.BASTARD_SWORD, [
    RELIC.HOLY_GLASSES + RELIC.SOUL_OF_BAT,
    RELIC.HOLY_GLASSES + RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.HOLY_GLASSES + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Royal Cloak requires Holy Glasses + flight.
  builder.lockLocation(LOCATION.ROYAL_CLOAK, [
    RELIC.HOLY_GLASSES + RELIC.SOUL_OF_BAT,
    RELIC.HOLY_GLASSES + RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.HOLY_GLASSES + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Lightning Mail requires Holy Glasses + flight.
  builder.lockLocation(LOCATION.LIGHTNING_MAIL, [
    RELIC.HOLY_GLASSES + RELIC.SOUL_OF_BAT,
    RELIC.HOLY_GLASSES + RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.HOLY_GLASSES + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Moon Rod requires Holy Glasses + flight.
  builder.lockLocation(LOCATION.MOON_ROD, [
    RELIC.HOLY_GLASSES + RELIC.SOUL_OF_BAT,
    RELIC.HOLY_GLASSES + RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.HOLY_GLASSES + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Sunstone requires Holy Glasses + flight.
  builder.lockLocation(LOCATION.SUNSTONE, [
    RELIC.HOLY_GLASSES + RELIC.SOUL_OF_BAT,
    RELIC.HOLY_GLASSES + RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.HOLY_GLASSES + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Dragon Helm requires Holy Glasses + flight.
  builder.lockLocation(LOCATION.DRAGON_HELM, [
    RELIC.HOLY_GLASSES + RELIC.SOUL_OF_BAT,
    RELIC.HOLY_GLASSES + RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.HOLY_GLASSES + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Shotel requires Holy Glasses + flight.
  builder.lockLocation(LOCATION.SHOTEL, [
    RELIC.HOLY_GLASSES + RELIC.SOUL_OF_BAT,
    RELIC.HOLY_GLASSES + RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.HOLY_GLASSES + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Staurolite requires Holy Glasses + flight.
  builder.lockLocation(LOCATION.STAUROLITE, [
    RELIC.HOLY_GLASSES + RELIC.SOUL_OF_BAT,
    RELIC.HOLY_GLASSES + RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.HOLY_GLASSES + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Badelaire requires Holy Glasses + flight.
  builder.lockLocation(LOCATION.BADELAIRE, [
    RELIC.HOLY_GLASSES + RELIC.SOUL_OF_BAT,
    RELIC.HOLY_GLASSES + RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.HOLY_GLASSES + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Reverse Caverns Diamond requires Holy Glasses + flight.
  builder.lockLocation(LOCATION.REVERSE_CAVERNS_DIAMOND, [
    RELIC.HOLY_GLASSES + RELIC.SOUL_OF_BAT,
    RELIC.HOLY_GLASSES + RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.HOLY_GLASSES + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Reverse Caverns Opal requires Holy Glasses + flight.
  builder.lockLocation(LOCATION.REVERSE_CAVERNS_OPAL, [
    RELIC.HOLY_GLASSES + RELIC.SOUL_OF_BAT,
    RELIC.HOLY_GLASSES + RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.HOLY_GLASSES + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Reverse Caverns Garnet requires Holy Glasses + flight.
  builder.lockLocation(LOCATION.REVERSE_CAVERNS_GARNET, [
    RELIC.HOLY_GLASSES + RELIC.SOUL_OF_BAT,
    RELIC.HOLY_GLASSES + RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.HOLY_GLASSES + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Osafune Katana requires Holy Glasses + flight.
  builder.lockLocation(LOCATION.OSAFUNE_KATANA, [
    RELIC.HOLY_GLASSES + RELIC.SOUL_OF_BAT,
    RELIC.HOLY_GLASSES + RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.HOLY_GLASSES + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Alucard Shield requires Holy Glasses + flight.
  builder.lockLocation(LOCATION.ALUCARD_SHIELD, [
    RELIC.HOLY_GLASSES + RELIC.SOUL_OF_BAT,
    RELIC.HOLY_GLASSES + RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.HOLY_GLASSES + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Alucard Sword requires Holy Glasses + flight.
  builder.lockLocation(LOCATION.ALUCARD_SWORD, [
    RELIC.HOLY_GLASSES + RELIC.SOUL_OF_BAT,
    RELIC.HOLY_GLASSES + RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.HOLY_GLASSES + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Necklace of J requires Holy Glasses + flight.
  builder.lockLocation(LOCATION.NECKLACE_OF_J, [
    RELIC.HOLY_GLASSES + RELIC.SOUL_OF_BAT,
    RELIC.HOLY_GLASSES + RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.HOLY_GLASSES + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Floating Catacombs Diamond requires Holy Glasses + flight.
  builder.lockLocation(LOCATION.FLOATING_CATACOMBS_DIAMOND, [
    RELIC.HOLY_GLASSES + RELIC.SOUL_OF_BAT,
    RELIC.HOLY_GLASSES + RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.HOLY_GLASSES + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Sword of Hador requires Holy Glasses + flight.
  builder.lockLocation(LOCATION.SWORD_OF_HADOR, [
    RELIC.HOLY_GLASSES + RELIC.SOUL_OF_BAT,
    RELIC.HOLY_GLASSES + RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.HOLY_GLASSES + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Alucard Mail requires Holy Glasses + flight.
  builder.lockLocation(LOCATION.ALUCARD_MAIL, [
    RELIC.HOLY_GLASSES + RELIC.SOUL_OF_BAT,
    RELIC.HOLY_GLASSES + RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.HOLY_GLASSES + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Gram requires Holy Glasses + flight.
  builder.lockLocation(LOCATION.GRAM, [
    RELIC.HOLY_GLASSES + RELIC.SOUL_OF_BAT,
    RELIC.HOLY_GLASSES + RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.HOLY_GLASSES + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
  ])

  // Fury Plate requires Holy Glasses + flight.
  builder.lockLocation(LOCATION.FURY_PLATE, [
    RELIC.HOLY_GLASSES + RELIC.SOUL_OF_BAT,
    RELIC.HOLY_GLASSES + RELIC.LEAP_STONE + RELIC.GRAVITY_BOOTS,
    RELIC.HOLY_GLASSES + RELIC.FORM_OF_MIST + RELIC.POWER_OF_MIST,
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
