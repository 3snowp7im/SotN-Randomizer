(function(self) {

  let constants
  if (self) {
    constants = self.sotnRando.constants
  } else {
    constants = require('./constants')
  }
  const ZONE = constants.ZONE
  const EXTENSION = constants.EXTENSION
  const LOCATION = constants.LOCATION

  function util() {
    let util
    if (self) {
      util = self.sotnRando.util
    } else {
      util = require('./util')
    }
    return util
  }

  function replaceTrioWithRelic(data, trio, relic) {
    let offset
    // Boss zone patches.
    const boss = constants.zones[constants.ZONE.RBO0]
    // Patch rewards.
    offset = util().romOffset(
      boss,
      boss.rewards + 0x02 * trio.reward.index,
    )
    data.writeShort(offset, relic.relicId)
    // Remove the condition for writing an item tile.
    offset = util().romOffset(boss, 0x026088)
    offset = data.writeWord(offset, 0x34020000) // ori v0, r0, 0x0000
    // Regular zone patches.
    const zone = constants.zones[constants.ZONE.RARE]
    // Replace entities.
    trio.entity.entities.forEach(function(entity) {
      let addr = util().romOffset(zone, entity + 0x04)
      addr = data.writeShort(addr, 0x000b)
      addr = data.writeShort(addr, 0x0010)
      addr = data.writeShort(addr, relic.relicId)
    })
  }

  function replaceTrioRelicWithItem(opts) {
    return function(data, trio, item, index) {
      util().replaceBossRelicWithItem(opts)(
        data,
        trio,
        item,
        index
      )
      const zone = constants.zones[constants.ZONE.RARE]
      trio.entity.entities.forEach(function(entity) {
        let addr = util().romOffset(zone, entity + 0x06)
        addr = data.writeShort(addr, 0x0010)
      })
    }
  }

  function replaceConfessionalWithRelic(data, confessional, relic) {
    // Regular zone patches.
    const zone = constants.zones[constants.ZONE.DAI]
    // Change Entity Position.
    data.writeWord(0x4678bba, 0x00500070)
    // Replace entities.
    confessional.entity.entities.forEach(function(entity) {
      let addr = util().romOffset(zone, entity + 0x04)
      addr = data.writeShort(addr, 0x000b)
      addr = data.writeShort(addr, 0x0010)
      addr = data.writeShort(addr, relic.relicId)
    })
  }

  function replaceConfessionalWithItem(data, confessional, item, index) {
    // Regular zone patches.
    const zone = constants.zones[constants.ZONE.DAI]
    // Change Entity Position.
    data.writeWord(0x4678bba, 0x00500070)
    // Replace entities.
    confessional.entity.entities.forEach(function(entity) {
      let addr = util().romOffset(zone, entity + 0x04)
      addr = data.writeShort(addr, 0x000c)
      addr = data.writeShort(addr, 0x0010)
      addr = data.writeShort(addr, item.relicId)
    })
    // Change Entity to Refer to Table.
    data.writeShort(0x4678bc2, index)
  }

  function replaceTelescopeWithRelic(data, telescope, relic) {
    // Regular zone patches.
    const zone = constants.zones[constants.ZONE.NO1]
    // Change Entity Position.
    data.writeWord(0x49d5a0c, 0x00A00160)
    // Replace entities.
    telescope.entity.entities.forEach(function(entity) {
      let addr = util().romOffset(zone, entity + 0x04)
      addr = data.writeShort(addr, 0x000b)
      addr = data.writeShort(addr, 0x0010)
      addr = data.writeShort(addr, relic.relicId)
    })
  }

  function replaceTelescopeWithItem(data, telescope, item, index) {
    // Regular zone patches.
    const zone = constants.zones[constants.ZONE.NO1]
    // Change Entity Position.
    data.writeWord(0x49d5a0c, 0x00A00160)
    // Replace entities.
    telescope.entity.entities.forEach(function(entity) {
      let addr = util().romOffset(zone, entity + 0x04)
      addr = data.writeShort(addr, 0x000c)
      addr = data.writeShort(addr, 0x0010)
      addr = data.writeShort(addr, item.relicId)
    })
    // Change Entity to Refer to Table.
    data.writeShort(0x49d5a14, index)
  }

  function replaceCloakedKnightWithRelic(data, cloakedKnight, relic) {
    // Regular zone patches.
    const zone = constants.zones[constants.ZONE.NZ1]
    // Replace entities.
    cloakedKnight.entity.entities.forEach(function(entity) {
      let addr = util().romOffset(zone, entity + 0x04)
      addr = data.writeShort(addr, 0x000b)
      addr = data.writeShort(addr, 0x0010)
      addr = data.writeShort(addr, relic.relicId)
    })
  }

  function replaceCloakedKnightWithItem(data, cloakedKnight, item, index) {
    let offset
    // Regular zone patches.
    const id = item.id
    const zone = constants.zones[constants.ZONE.NZ1]
    // Change Entity Position.
    data.writeWord(0x5574dbc, 0x01150280)
    data.writeWord(0x5575902, 0x01150280)
    // Replace entities.
    cloakedKnight.entity.entities.forEach(function(entity) {
      let addr = util().romOffset(zone, entity + 0x04)
      addr = data.writeShort(addr, 0x000c)
      addr = data.writeShort(addr, 0x0010)
      addr = data.writeShort(addr, item.itemId)
    })
    // Change Entity to Refer to Table.
    data.writeShort(0x5574dc4, index)
    data.writeShort(0x5575900, index)
  }

  function replaceWaterfallVesselWithRelic(data, waterfallVessel, relic) {
    // Regular zone patches.
    const zone = constants.zones[constants.ZONE.NO4]
    // Change Entity Position.
    data.writeWord(0x4c34fa6, 0x00a300a0)
    // Replace entities.
    waterfallVessel.entity.entities.forEach(function(entity) {
      let addr = util().romOffset(zone, entity + 0x04)
      addr = data.writeShort(addr, 0x000b)
      addr = data.writeShort(addr, 0x0010)
      addr = data.writeShort(addr, relic.relicId)
    })
  }

  function replaceWaterfallVesselWithItem(data, waterfallVessel, item, index) {
    // Regular zone patches.
    const zone = constants.zones[constants.ZONE.NO4]
    // Change Entity Position.
    data.writeWord(0x4c34fa6, 0x00a300a0)
    // Replace entities.
    waterfallVessel.entity.entities.forEach(function(entity) {
      let addr = util().romOffset(zone, entity + 0x04)
      addr = data.writeShort(addr, 0x000c)
      addr = data.writeShort(addr, 0x0010)
      addr = data.writeShort(addr, item.relicId)
    })
    // Change Entity to Refer to Table.
    data.writeShort(0x4c34fae, index)
  }

  function replaceReverseAlucartSwordWithRelic(data, blackMarbleVat, relic) {
    // Regular zone patches.
    const zone = constants.zones[constants.ZONE.RNO0]
    // Change Entity Position.
    // data.writeWord(0x4f8987a, 0x00a300a0)
    // data.writeWord(0x4f8ab3a, 0x00a300a0)
    // Replace entities.
    blackMarbleVat.entity.entities.forEach(function(entity) {
      let addr = util().romOffset(zone, entity + 0x04)
      addr = data.writeShort(addr, 0x000b)
      addr = data.writeShort(addr, 0x0010)
      addr = data.writeShort(addr, relic.relicId)
    })
  }

  function replaceReverseAlucartSwordWithItem(data, blackMarbleVat, item, index) {
    // Regular zone patches.
    const zone = constants.zones[constants.ZONE.RNO0]
    // Change Entity Position.
    // data.writeWord(0x4f8987a, 0x00a300a0)
    // data.writeWord(0x4f8ab3a, 0x00a300a0)
    // Replace entities.
    blackMarbleVat.entity.entities.forEach(function(entity) {
      let addr = util().romOffset(zone, entity + 0x04)
      addr = data.writeShort(addr, 0x000c)
      addr = data.writeShort(addr, 0x0010)
      addr = data.writeShort(addr, item.relicId)
    })
    // Change Entity to Refer to Table.
    data.writeShort(0x4f89883, index)
    data.writeShort(0x4f8ab43, index)
  }
  
  const locations = [{
    name: LOCATION.CRYSTAL_CLOAK,
    extension: EXTENSION.GUARDED,
    itemId: 221,
    tileIndex: 0,
    asRelic: {
      y: 0x00a0,
    },
  }, {
    name: LOCATION.MORMEGIL,
    extension: EXTENSION.GUARDED,
    itemId: 110,
    tileIndex: 0,
    asRelic: {
      y: 0x0098,
    },
  }, {
    name: LOCATION.DARK_BLADE,
    extension: EXTENSION.GUARDED,
    itemId: 118,
    tileIndex: 0,
    asRelic: {
      y: 0x0080,
    },
  }, {
    name: LOCATION.RING_OF_ARCANA,
    extension: EXTENSION.GUARDED,
    itemId: 244,
    tileIndex: 0,
    asRelic: {
      x: 0x0082,
      y: 0x0080,
    },
  }, {
    name: LOCATION.HOLY_MAIL,
    extension: EXTENSION.EQUIPMENT,
    itemId: 187,
    tileIndex: 0,
    asRelic: {
      y: 0x0050,
    },
  }, {
    name: LOCATION.TRIO,
    extension: EXTENSION.GUARDED,
    entity: {
      zones: [ ZONE.RARE ],
      entities: [ 0x23ba, 0x293c ],
    },
    reward: {
      zone: ZONE.RBO0,
      index: 0x02,
    },
    erase: {
      instructions: [{
        addresses: [ 0x06487bd4 ],
        instruction: 0x34020000,
      }],
    },
    replaceWithRelic: replaceTrioWithRelic,
    replaceWithItem: replaceTrioRelicWithItem({
      boss: ZONE.RBO0,
      entry: 0x026e64,
      inj: 0x038a00,
    }),
    asItem: {
      y: 0x00d9,
    },
  }, {
    name: LOCATION.JEWEL_SWORD,
    extension: EXTENSION.EQUIPMENT,
    itemId: 146, // Actually life apple because it's on the pedestal.
    tileIndex: 0,
    asRelic: {
      y: 0x0090,
    },
  }, {
    name: LOCATION.BASILARD,
    extension: EXTENSION.EQUIPMENT,
    itemId: 18,
    tileIndex: 0,
    asRelic: {
      y: 0x0090,
    },
  }, {
    name: LOCATION.SUNGLASSES,
    extension: EXTENSION.EQUIPMENT,
    itemId: 196,
    tileIndex: 0,
    asRelic: {
      y: 0x0080,
    },
  }, {
    name: LOCATION.CLOTH_CAPE,
    extension: EXTENSION.EQUIPMENT,
    itemId: 218,
    tileIndex: 0,
    asRelic: {
      y: 0x0080,
    },
  }, {
    name: LOCATION.MYSTIC_PENDANT,
    extension: EXTENSION.EQUIPMENT,
    itemId: 245,
    tileIndex: 0,
  }, {
    name: LOCATION.ANKH_OF_LIFE,
    extension: EXTENSION.EQUIPMENT,
    itemId: 249,
    tileIndex: 0,
  }, {
    name: LOCATION.MORNING_STAR,
    extension: EXTENSION.EQUIPMENT,
    itemId: 129,
    tileIndex: 0,
  }, {
    name: LOCATION.GOGGLES,
    extension: EXTENSION.EQUIPMENT,
    itemId: 201,
    tileIndex: 0,
    asRelic: {
      y: 0x0120,
    },
  }, {
    name: LOCATION.SILVER_PLATE,
    extension: EXTENSION.EQUIPMENT,
    itemId: 175,
    tileIndex: 0,
    asRelic: {
      y: 0x00f0,
    },
  }, {
    name: LOCATION.CUTLASS,
    extension: EXTENSION.EQUIPMENT,
    itemId: 88,
    tileIndex: 0,
    asRelic: {
      y: 0x00ef,
    },
  }, {
    name: LOCATION.PLATINUM_MAIL,
    extension: EXTENSION.EQUIPMENT,
    itemId: 177,
    tileIndex: 0,
    asRelic: {
      y: 0x00be,
    },
  }, {
    name: LOCATION.FALCHION,
    extension: EXTENSION.EQUIPMENT,
    itemId: 90,
    tileIndex: 0,
    asRelic: {
      y: 0x0090,
    },
  }, {
    name: LOCATION.GOLD_PLATE,
    extension: EXTENSION.EQUIPMENT,
    itemId: 176,
    tileIndex: 0,
    asRelic: {
      y: 0x0090,
    },
  }, {
    name: LOCATION.BEKATOWA,
    extension: EXTENSION.EQUIPMENT,
    itemId: 92,
    tileIndex: 0,
    asRelic: {
      y: 0x0280,
    },
  }, {
    name: LOCATION.GLADIUS,
    extension: EXTENSION.EQUIPMENT,
    itemId: 86,
    tileIndex: 0,
    asRelic: {
      y: 0x00b0,
    },
  }, {
    name: LOCATION.JEWEL_KNUCKLES,
    extension: EXTENSION.EQUIPMENT,
    itemId: 97,
    tileIndex: 0,
    asRelic: {
      y: 0x0090,
    },
  }, {
    name: LOCATION.HOLY_ROD,
    extension: EXTENSION.EQUIPMENT,
    itemId: 130,
    tileIndex: 0,
    asRelic: {
      y: 0x00b0,
    },
  }, {
    name: LOCATION.LIBRARY_ONYX,
    extension: EXTENSION.EQUIPMENT,
    itemId: 235,
    tileIndex: 0,
  }, {
    name: LOCATION.BRONZE_CUIRASS,
    extension: EXTENSION.EQUIPMENT,
    itemId: 172,
    tileIndex: 0,
    asRelic: {
      y: 0x01b0,
    },
  }, {
    name: LOCATION.ALUCART_SWORD,
    extension: EXTENSION.EQUIPMENT,
    itemId: 168,
    tileIndex: 0,
    asRelic: {
      y: 0x00b0,
    },
  }, {
    name: LOCATION.BROADSWORD,
    extension: EXTENSION.EQUIPMENT,
    itemId: 91,
    tileIndex: 0,
  }, {
    name: LOCATION.ESTOC,
    extension: EXTENSION.EQUIPMENT,
    itemId: 95,
    tileIndex: 0,
  }, {
    name: LOCATION.OLROX_GARNET,
    extension: EXTENSION.EQUIPMENT,
    itemId: 236,
    tileIndex: 1,
    asRelic: {
      y: 0x0090,
    },
  }, {
    name: LOCATION.BLOOD_CLOAK,
    extension: EXTENSION.EQUIPMENT,
    itemId: 223,
    tileIndex: 0,
    asRelic: {
      y: 0x00b0,
    },
  }, {
    name: LOCATION.SHIELD_ROD,
    extension: EXTENSION.EQUIPMENT,
    itemId: 4,
    tileIndex: 0,
    asRelic: {
      y: 0x0078,
    },
  }, {
    name: LOCATION.KNIGHT_SHIELD,
    extension: EXTENSION.EQUIPMENT,
    itemId: 6,
    tileIndex: 0,
    asRelic: {
      y: 0x00b0,
    },
  }, {
    name: LOCATION.BANDANNA,
    extension: EXTENSION.EQUIPMENT,
    itemId: 198,
    tileIndex: 0,
    asRelic: {
      y: 0x00a0,
    },
  }, {
    name: LOCATION.NUNCHAKU,
    extension: EXTENSION.EQUIPMENT,
    itemId: 21,
    tileIndex: 0,
    asRelic: {
      y: 0x00f2,
    },
  }, {
    name: LOCATION.KNUCKLE_DUSTER,
    extension: EXTENSION.EQUIPMENT,
    itemId: 85,
    tileIndex: 0,
    asRelic: {
      y: 0x00f5,
    },
  }, {
    name: LOCATION.CAVERNS_ONYX,
    extension: EXTENSION.EQUIPMENT,
    itemId: 235,
    tileIndex: 1,
    asRelic: {
      x: 0x053f,
      y: 0x0052,
    },
  }, {
    name: LOCATION.SECRET_BOOTS,
    extension: EXTENSION.EQUIPMENT,
    itemId: 257,
    tileIndex: 0,
    asRelic: {
      y: 0x021f,
    },
  }, {
    name: LOCATION.COMBAT_KNIFE,
    extension: EXTENSION.EQUIPMENT,
    itemId: 20,
    tileIndex: 0,
    asRelic: {
      y: 0x005f,
    },
  }, {
    name: LOCATION.RING_OF_ARES,
    extension: EXTENSION.EQUIPMENT,
    itemId: 240,
    tileIndex: 0,
    asRelic: {
      y: 0x0190,
    },
  }, {
    name: LOCATION.BLOODSTONE,
    extension: EXTENSION.EQUIPMENT,
    itemId: 229,
    tileIndex: 0,
    asRelic: {
      y: 0x0090,
    },
  }, {
    name: LOCATION.ICEBRAND,
    extension: EXTENSION.EQUIPMENT,
    itemId: 113,
    tileIndex: 0,
    asRelic: {
      y: 0x0098,
    },
  }, {
    name: LOCATION.WALK_ARMOR,
    extension: EXTENSION.EQUIPMENT,
    itemId: 188,
    tileIndex: 0,
    asRelic: {
      y: 0x00b0,
    },
  }, {
    name: LOCATION.BERYL_CIRCLET,
    extension: EXTENSION.EQUIPMENT,
    itemId: 211,
    tileIndex: 0,
    asRelic: {
      y: 0x0090,
    },
  }, {
    name: LOCATION.TALISMAN,
    extension: EXTENSION.EQUIPMENT,
    itemId: 252,
    tileIndex: 0,
    asRelic: {
      y: 0x0080,
    },
  }, {
    name: LOCATION.KATANA,
    extension: EXTENSION.EQUIPMENT,
    itemId: 100,
    tileIndex: 0,
    asRelic: {
      x: 0x0080,
      y: 0x0070,
    },
  }, {
    name: LOCATION.GODDESS_SHIELD,
    extension: EXTENSION.EQUIPMENT,
    itemId: 11,
    tileIndex: 0,
    asRelic: {
      x: 0x0080,
      y: 0x0080,
    },
  }, {
    name: LOCATION.TWILIGHT_CLOAK,
    extension: EXTENSION.EQUIPMENT,
    itemId: 225,
    tileIndex: 0,
    asRelic: {
      y: 0x0080,
    },
  }, {
    name: LOCATION.TALWAR,
    extension: EXTENSION.EQUIPMENT,
    itemId: 99,
    tileIndex: 0,
  }, {
    name: LOCATION.SWORD_OF_DAWN,
    extension: EXTENSION.EQUIPMENT,
    itemId: 236, // Actually the garnet because sword is in breakable wall.
    tileIndex: 2,
    asRelic: {
      y: 0x0110,
    },
  }, {
    name: LOCATION.BASTARD_SWORD,
    extension: EXTENSION.EQUIPMENT,
    itemId: 96,
    tileIndex: 0,
    asRelic: {
      y: 0x0080,
    },
  }, {
    name: LOCATION.ROYAL_CLOAK,
    extension: EXTENSION.EQUIPMENT,
    itemId: 222,
    tileIndex: 0,
    asRelic: {
      y: 0x0080,
    },
  }, {
    name: LOCATION.LIGHTNING_MAIL,
    extension: EXTENSION.EQUIPMENT,
    itemId: 180,
    tileIndex: 0,
    asRelic: {
      y: 0x0080,
    },
  }, {
    name: LOCATION.MOON_ROD,
    extension: EXTENSION.EQUIPMENT,
    itemId: 132,
    tileIndex: 0,
    asRelic: {
      y: 0x0080,
    },
  }, {
    name: LOCATION.SUNSTONE,
    extension: EXTENSION.EQUIPMENT,
    itemId: 228,
    tileIndex: 0,
    asRelic: {
      y: 0x0080,
    },
  }, {
    name: LOCATION.LUMINUS,
    extension: EXTENSION.EQUIPMENT,
    itemId: 105,
    tileIndex: 0,
  }, {
    name: LOCATION.DRAGON_HELM,
    extension: EXTENSION.EQUIPMENT,
    itemId: 214,
    tileIndex: 0,
    asRelic: {
      y: 0x0060,
    },
  }, {
    name: LOCATION.SHOTEL,
    extension: EXTENSION.EQUIPMENT,
    itemId: 147, // Actually the hammer.
    tileIndex: 2,
    asRelic: {
      y: 0x00b0,
    },
  }, {
    name: LOCATION.STAUROLITE,
    extension: EXTENSION.EQUIPMENT,
    itemId: 230,
    tileIndex: 0,
    asRelic: {
      y: 0x00b0,
    },
  }, {
    name: LOCATION.BADELAIRE,
    extension: EXTENSION.SPREAD,
    itemId: 125,
    tileIndex: 0,
    asRelic: {
      y: 0x00c0,
    },
  }, {
    name: LOCATION.FORBIDDEN_LIBRARY_OPAL,
    extension: EXTENSION.SPREAD,
    itemId: 237,
    tileIndex: 0,
    asRelic: {
      y: 0x0080,
    },
  }, {
    name: LOCATION.REVERSE_CAVERNS_DIAMOND,
    extension: EXTENSION.EQUIPMENT,
    itemId: 238,
    tileIndex: 1,
    asRelic: {
      x: 0x0080,
      y: 0x0080,
    },
  }, {
    name: LOCATION.REVERSE_CAVERNS_OPAL,
    extension: EXTENSION.EQUIPMENT,
    itemId: 237,
    tileIndex: 1,
    asRelic: {
      y: 0x0090,
    },
  }, {
    name: LOCATION.REVERSE_CAVERNS_GARNET,
    extension: EXTENSION.EQUIPMENT,
    itemId: 236,
    tileIndex: 4,
    asRelic: {
      y: 0x0080,
    },
  }, {
    name: LOCATION.OSAFUNE_KATANA,
    extension: EXTENSION.EQUIPMENT,
    itemId: 139,
    tileIndex: 0,
    asRelic: {
      x: 0x0080,
      y: 0x0080,
    },
  }, {
    name: LOCATION.ALUCARD_SHIELD,
    extension: EXTENSION.EQUIPMENT,
    itemId: 16,
    tileIndex: 0,
    asRelic: {
      x: 0x0080,
      y: 0x0080,
    },
  }, {
    name: LOCATION.ALUCARD_SWORD,
    extension: EXTENSION.EQUIPMENT,
    itemId: 123,
    tileIndex: 0,
    asRelic: {
      y: 0x0080,
    },
  }, {
    name: LOCATION.NECKLACE_OF_J,
    extension: EXTENSION.EQUIPMENT,
    itemId: 247,
    tileIndex: 0,
    asRelic: {
      y: 0x0080,
    },
  }, {
    name: LOCATION.FLOATING_CATACOMBS_DIAMOND,
    extension: EXTENSION.EQUIPMENT,
    itemId: 238,
    tileIndex: 2,
    asRelic: {
      y: 0x0080,
    },
  }, {
    name: LOCATION.SWORD_OF_HADOR,
    extension: EXTENSION.EQUIPMENT,
    itemId: 237, // Actually the Opal.
    tileIndex: 3,
    asRelic: {
      y: 0x0080,
    },
  }, {
    name: LOCATION.ALUCARD_MAIL,
    extension: EXTENSION.EQUIPMENT,
    itemId: 184,
    tileIndex: 0,
    asRelic: {
      y: 0x0080,
    },
  }, {
    name: LOCATION.GRAM,
    extension: EXTENSION.EQUIPMENT,
    itemId: 108,
    tileIndex: 0,
    asRelic: {
      y: 0x00b0,
    },
  }, {
    name: LOCATION.FURY_PLATE,
    extension: EXTENSION.EQUIPMENT,
    itemId: 191,
    tileIndex: 0,
    asRelic: {
      y: 0x0080,
    },
  }, {
    name: LOCATION.CONFESSIONAL,
    extension: EXTENSION.TOURIST,
    entity: {
      zones: [ ZONE.DAI ],
      entities: [ 0x27f2, 0x3184 ],
    },
    replaceWithRelic: replaceConfessionalWithRelic,
    replaceWithItem: replaceConfessionalWithItem
  }, {
    name: LOCATION.TELESCOPE,
    extension: EXTENSION.TOURIST,
    entity: {
      zones: [ ZONE.NO1 ],
      entities: [ 0x3904, 0x4108 ],
    },
    replaceWithRelic: replaceTelescopeWithRelic,
    replaceWithItem: replaceTelescopeWithItem
  }, {
    name: LOCATION.COLOSSEUM_GREEN_TEA,
    extension: EXTENSION.TOURIST,
    itemId: 58,
    tileIndex: 0,
    asRelic: {
      y: 0x00a9,
    },
  }, {
    name: LOCATION.CLOCK_TOWER_CLOAKED_KNIGHT,
    extension: EXTENSION.TOURIST,
    entity: {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2444, 0x2e50 ],
    },
    replaceWithRelic: replaceCloakedKnightWithRelic,
    replaceWithItem: replaceCloakedKnightWithItem
  }, {
    name: LOCATION.WATERFALL_CAVE,
    extension: EXTENSION.TOURIST,
    entity: {
      zones: [ ZONE.NO4 ],
      entities: [ 0x3f6e, 0x5000 ],
    },
    replaceWithRelic: replaceWaterfallVesselWithRelic,
    replaceWithItem: replaceWaterfallVesselWithItem
  }, {
    name: LOCATION.FLOATING_CATACOMBS_ELIXIR,
    extension: EXTENSION.TOURIST,
    itemId: 161,
    tileIndex: 2,
    asRelic: {
      y: 0x0077,
    },
  }, {
    name: LOCATION.REVERSE_ENTRANCE_ANTIVENOM,
    extension: EXTENSION.TOURIST,
    itemId: 144,
    tileIndex: 3,
    asRelic: {
      y: 0x0279,
    },
  }, {
    name: LOCATION.REVERSE_FORBIDDEN_ROUTE,
    extension: EXTENSION.TOURIST,
    itemId: 166,
    tileIndex: 5,
    asRelic: {
      y: 0x02b5,
    },
  }, {
    name: LOCATION.CAVE_LIFE_APPLE,
    extension: EXTENSION.TOURIST,
    itemId: 146,
    tileIndex: 3,
    asRelic: {
      y: 0x00a0,
    },
  }, {
    name: LOCATION.REVERSE_COLOSSEUM_ZIRCON,
    extension: EXTENSION.TOURIST,
    itemId: 232,
    tileIndex: 8,
    asRelic: {
      y: 0x00ad,
    },
  }, {
    name: LOCATION.REVERSE_ALUCART_SWORD,
    extension: EXTENSION.TOURIST,
    itemId: 157,
    tileIndex: 1,
  }, {
    name: LOCATION.BLACK_MARBLE_MEAL_TICKET,
    extension: EXTENSION.TOURIST,
    itemId: 70,
    tileIndex: 4,
    asRelic: {
      x: 0x0088,
      y: 0x00a5,
    },
  }, {
    name: LOCATION.REVERSE_KEEP_HIGH_POTION,
    extension: EXTENSION.TOURIST,
    itemId: 160,
    tileIndex: 0,
    asRelic: {
      y: 0x0180,
    },
  }, {
    name: LOCATION.CONFESSIONAL,
    extension: EXTENSION.WANDERER,
    entity: {
      zones: [ ZONE.DAI ],
      entities: [ 0x27f2, 0x3184 ],
    },
    replaceWithRelic: replaceConfessionalWithRelic,
    replaceWithItem: replaceConfessionalWithItem
  }, {
    name: LOCATION.TELESCOPE,
    extension: EXTENSION.WANDERER,
    entity: {
      zones: [ ZONE.NO1 ],
      entities: [ 0x3904, 0x4108 ],
    },
    replaceWithRelic: replaceTelescopeWithRelic,
    replaceWithItem: replaceTelescopeWithItem
  }, {
    name: LOCATION.COLOSSEUM_GREEN_TEA,
    extension: EXTENSION.WANDERER,
    itemId: 58,
    tileIndex: 0,
    asRelic: {
      y: 0x00a9,
    },
  }, {
    name: LOCATION.CLOCK_TOWER_CLOAKED_KNIGHT,
    extension: EXTENSION.WANDERER,
    entity: {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x2444, 0x2e50 ],
    },
    replaceWithRelic: replaceCloakedKnightWithRelic,
    replaceWithItem: replaceCloakedKnightWithItem
  }, {
    name: LOCATION.WATERFALL_CAVE,
    extension: EXTENSION.WANDERER,
    entity: {
      zones: [ ZONE.NO4 ],
      entities: [ 0x3f6e, 0x5000 ],
    },
    replaceWithRelic: replaceWaterfallVesselWithRelic,
    replaceWithItem: replaceWaterfallVesselWithItem
  }, {
    name: LOCATION.FLOATING_CATACOMBS_ELIXIR,
    extension: EXTENSION.WANDERER,
    itemId: 161,
    tileIndex: 2,
    asRelic: {
      y: 0x0077,
    },
  }, {
    name: LOCATION.REVERSE_ENTRANCE_ANTIVENOM,
    extension: EXTENSION.WANDERER,
    itemId: 144,
    tileIndex: 3,
    asRelic: {
      y: 0x0279,
    },
  }, {
    name: LOCATION.REVERSE_FORBIDDEN_ROUTE,
    extension: EXTENSION.WANDERER,
    itemId: 166,
    tileIndex: 5,
    asRelic: {
      y: 0x02b5,
    },
  }, {
    name: LOCATION.CAVE_LIFE_APPLE,
    extension: EXTENSION.WANDERER,
    itemId: 146,
    tileIndex: 3,
    asRelic: {
      y: 0x00a0,
    },
  }, {
    name: LOCATION.REVERSE_COLOSSEUM_ZIRCON,
    extension: EXTENSION.WANDERER,
    itemId: 232,
    tileIndex: 8,
    asRelic: {
      y: 0x00ad,
    },
  }, {
    name: LOCATION.REVERSE_ALUCART_SWORD,
    extension: EXTENSION.WANDERER,
    itemId: 157,
    tileIndex: 1,
  }, {
    name: LOCATION.BLACK_MARBLE_MEAL_TICKET,
    extension: EXTENSION.WANDERER,
    itemId: 70,
    tileIndex: 4,
    asRelic: {
      x: 0x0088,
      y: 0x00a5,
    },
  }, {
    name: LOCATION.REVERSE_KEEP_HIGH_POTION,
    extension: EXTENSION.WANDERER,
    itemId: 160,
    tileIndex: 0,
    asRelic: {
      y: 0x0180,
    },
  }, {
    name: LOCATION.BASILARD,
    extension: EXTENSION.WANDERER,
    itemId: 18,
    tileIndex: 0,
    asRelic: {
      y: 0x0090,
    },
  }, {
    name: LOCATION.GOGGLES,
    extension: EXTENSION.WANDERER,
    itemId: 201,
    tileIndex: 0,
    asRelic: {
      y: 0x0120,
    },
  }, {
    name: LOCATION.GOLD_PLATE,
    extension: EXTENSION.WANDERER,
    itemId: 176,
    tileIndex: 0,
    asRelic: {
      y: 0x0090,
    },
  }, {
    name: LOCATION.BEKATOWA,
    extension: EXTENSION.WANDERER,
    itemId: 92,
    tileIndex: 0,
    asRelic: {
      y: 0x0280,
    },
  }, {
    name: LOCATION.MYSTIC_PENDANT,
    extension: EXTENSION.WANDERER,
    itemId: 245,
    tileIndex: 0,
  }, {
    name: LOCATION.JEWEL_KNUCKLES,
    extension: EXTENSION.WANDERER,
    itemId: 97,
    tileIndex: 0,
    asRelic: {
      y: 0x0090,
    },
  }, {
    name: LOCATION.ALUCART_SWORD,
    extension: EXTENSION.WANDERER,
    itemId: 168,
    tileIndex: 0,
    asRelic: {
      y: 0x00b0,
    },
  }, {
    name: LOCATION.NUNCHAKU,
    extension: EXTENSION.WANDERER,
    itemId: 21,
    tileIndex: 0,
    asRelic: {
      y: 0x00f2,
    },
  }, {
    name: LOCATION.RING_OF_ARES,
    extension: EXTENSION.WANDERER,
    itemId: 240,
    tileIndex: 0,
    asRelic: {
      y: 0x0190,
    },
  }, {
    name: LOCATION.BERYL_CIRCLET,
    extension: EXTENSION.WANDERER,
    itemId: 211,
    tileIndex: 0,
    asRelic: {
      y: 0x0090,
    },
  }, {
    name: LOCATION.KATANA,
    extension: EXTENSION.WANDERER,
    itemId: 100,
    tileIndex: 0,
    asRelic: {
      x: 0x0080,
      y: 0x0070,
    },
  }, {
    name: LOCATION.TWILIGHT_CLOAK,
    extension: EXTENSION.WANDERER,
    itemId: 225,
    tileIndex: 0,
    asRelic: {
      y: 0x0080,
    },
  }, {
    name: LOCATION.PLATINUM_MAIL,
    extension: EXTENSION.WANDERER,
    itemId: 177,
    tileIndex: 0,
    asRelic: {
      y: 0x00be,
    },
  }, {
    name: LOCATION.MOON_ROD,
    extension: EXTENSION.WANDERER,
    itemId: 132,
    tileIndex: 0,
    asRelic: {
      y: 0x0080,
    },
  }, {
    name: LOCATION.LUMINUS,
    extension: EXTENSION.WANDERER,
    itemId: 105,
    tileIndex: 0,
  }, {
    name: LOCATION.REVERSE_CAVERNS_OPAL,
    extension: EXTENSION.WANDERER,
    itemId: 237,
    tileIndex: 1,
    asRelic: {
      y: 0x0090,
    },
  }, {
    name: LOCATION.OSAFUNE_KATANA,
    extension: EXTENSION.WANDERER,
    itemId: 139,
    tileIndex: 0,
    asRelic: {
      x: 0x0080,
      y: 0x0080,
    },
  }, {
    name: LOCATION.GRAM,
    extension: EXTENSION.WANDERER,
    itemId: 108,
    tileIndex: 0,
    asRelic: {
      y: 0x00b0,
    },
  }]

  const exports = locations
  if (self) {
    self.sotnRando = Object.assign(self.sotnRando || {}, {
      extension: exports,
    })
  } else {
    module.exports = exports
  }
})(typeof(self) !== 'undefined' ? self : null)
