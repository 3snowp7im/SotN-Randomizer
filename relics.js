(function(self) {

  let constants
  if (self) {
    constants = self.sotnRando.constants
  } else {
    constants = require('./constants')
  }
  const RELIC = constants.RELIC
  const TYPE = constants.TYPE
  const ZONE = constants.ZONE
  const SLOT = constants.SLOT
  const slots = constants.slots
  const equipIdOffset = constants.equipIdOffset
  const invOffset = constants.equipmentInvIdOffset
  const tileIdOffset = constants.tileIdOffset

  function items() {
    let items
    if (self) {
      items = self.sotnRando.items
    } else {
      items = require('./items')
    }
    return items
  }

  function util() {
    let util
    if (self) {
      util = self.sotnRando.util
    } else {
      util = require('./util')
    }
    return util
  }

  function getItemSlots(item) {
    switch (item.type) {
    case TYPE.HELMET:
      return [ slots[SLOT.HEAD] ]
    case TYPE.ARMOR:
      return [ slots[SLOT.BODY] ]
    case TYPE.ACCESSORY:
      return [ slots[SLOT.OTHER], slots[SLOT.OTHER2] ]
      break
    }
  }

  function replaceShopRelicWithRelic(data, jewelOfOpen, relic) {
    const shopRelicNameAddress = 0x047d5650
    const shopRelicIdAddress = 0x047dbde0
    const shopRelicIdOffset = 0x64
    // Write relic id.
    const address = jewelOfOpen.ids[0].addresses[0]
    data.writeChar(address, relic.relicId)
    // Fix shop menu check.
    data.writeChar(shopRelicIdAddress, relic.relicId + shopRelicIdOffset)
    // Change shop menu name.
    for (let i = 0; i < jewelOfOpen.name.length; i++) {
      let value
      if (i >= relic.name.length
          || relic.name.charCodeAt(i) === ' '.charCodeAt()) {
        value = ' '
      } else {
        value = relic.name.charCodeAt(i) - 0x20
      }
      data.writeChar(shopRelicNameAddress + i, value)
    }
  }

  function replaceShopRelicWithItem(data, jewelOfOpen, item) {
    let offset
    const id = item.id
    const type = 0x02
    const zone = constants.zones[constants.ZONE.LIB]
    const slots = getItemSlots(item)
    // Write item type.
    data.writeChar(util().romOffset(zone, 0x134c), type)
    // Write item id.
    data.writeShort(util().romOffset(zone, 0x134e), id + equipIdOffset)
    data.writeShort(util().romOffset(zone, 0x14d4), id + equipIdOffset)
    // Entry point.
    offset = util().romOffset(zone, 0x032b08)
    offset = data.writeWord(offset, 0x08075180) // j 0x801d4600
    offset = data.writeWord(offset, 0x00000000) // nop
    // Equipped check.
    offset = util().romOffset(zone, 0x054600)
    //                                          // ori v1, r0, id
    offset = data.writeWord(offset, 0x34030000 + id + equipIdOffset)
    slots.forEach(function(slot, index) {
      //                                          // lui v0, 0x8009
      offset = data.writeWord(offset, 0x3c028000 + (slot >>> 16))
      //                                          // lbu v0, slot (v0)
      offset = data.writeWord(offset, 0x90420000 + (slot & 0xffff))
      offset = data.writeWord(offset, 0x00000000) // nop
      const next = 4 + 5 * (slots.length - index - 1)
      //                                          // beq v0, v1, pc + next
      offset = data.writeWord(offset, 0x10430000 + next)
      offset = data.writeWord(offset, 0x00000000) // nop
    })
    // Inventory check.
    offset = data.writeWord(offset, 0x3c028009) // lui v0, 0x8009
    //                                          // lbu v0, 0x798a + id (v0)
    offset = data.writeWord(offset, 0x90420000 + id + invOffset)
    offset = data.writeWord(offset, 0x00000000) // nop
    // Return.
    offset = data.writeWord(offset, 0x0806cac7) // j 0x801b2b1c
    offset = data.writeWord(offset, 0x00000000) // nop
    // Entry point.
    offset = util().romOffset(zone, 0x033050)
    offset = data.writeWord(offset, 0x08075190) // j 0x801d4640
    // Load base address.
    offset = util().romOffset(zone, 0x054640)
    offset = data.writeWord(offset, 0x3c02801d) // lui v0, 0x801d
    offset = data.writeWord(offset, 0x34424364) // ori v0, v0, 0x4364
    offset = data.writeWord(offset, 0x14450003) // bne a1, v0, pc + 0x10
    offset = data.writeWord(offset, 0x94a30000) // lhu v1, 0x0000 (a1)
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x34030005) // ori v1, r0, 0x0005
    // Return.
    offset = data.writeWord(offset, 0x0806cc16) // j 0x801b3058
    offset = data.writeWord(offset, 0x00000000) // nop
    // Patch checker.
    offset = util().romOffset(zone, 0x03317c)
    offset = data.writeWord(offset, 0x080751a0) // j 0x801d4680
    offset = data.writeWord(offset, 0x34020000) // ori v0, r0, 0x0000
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x00000000) // nop
    // Injection.
    offset = util().romOffset(zone, 0x054680)
    slots.forEach(function(slot, index) {
      //                                          // lui v0, 0x8009
      offset = data.writeWord(offset, 0x3c028000 + (slot >>> 16))
      //                                          // lbu v0, slot (v0)
      offset = data.writeWord(offset, 0x90420000 + (slot & 0xffff))
      offset = data.writeWord(offset, 0x00000000) // nop
      const next = 5 + 5 * (slots.length - index - 1)
      //                                          // beq v0, s3, pc + next
      offset = data.writeWord(offset, 0x10530000 + next)
      offset = data.writeWord(offset, 0x00000000) // nop
    })
    // Inventory check.
    offset = data.writeWord(offset, 0x3c028009) // lui v0, 0x8009
    //                                          // lbu v0, 0x798a + id (v0)
    offset = data.writeWord(offset, 0x90420000 + id + invOffset)
    offset = data.writeWord(offset, 0x00000000) // nop
    // Return.
    offset = data.writeWord(offset, 0x10400002) // beq v0, r0, pc + 0x0c
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x0806cc1f) // j 0x801b307c
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x0806cc61) // j 0x801b3184
    offset = data.writeWord(offset, 0x00000000) // nop
  }

  function replaceRingOfVladWithItem(data, relic, item, index) {
    let offset
    const id = item.id
    const zone = constants.zones[ZONE.RNZ1]
    const slots = getItemSlots(item)
    // Patch instructions that load a relic.
    data.writeWord(
      relic.erase.instructions[0].addresses[0],
      relic.erase.instructions[0].instruction,
    )
    data.writeWord(0x059ee2c8, 0x3402000c)
    data.writeWord(0x059ee2d4, 0x24423a54)
    data.writeShort(0x059ee2e4, index)
    offset = util().romOffset(zone, 0x2dd6)
    data.writeShort(offset, index)
    // Replace item in rewards table.
    offset = util().romOffset(zone, zone.rewards)
    data.writeShort(offset, id + tileIdOffset)
    // Replace item in items table.
    offset = util().romOffset(zone, zone.items + 0x02 * index)
    data.writeShort(offset, id + tileIdOffset)
    // Injection point.
    offset = util().romOffset(zone, 0x02c860)
    data.writeWord(offset, 0x0807bc40)          // j 0x801ef100
    offset = util().romOffset(zone, 0x02c868)
    data.writeWord(offset, 0x00000000)          // nop
    // Zero out tile function pointer if item is in inventory.
    offset = util().romOffset(zone, 0x03f100)
    //                                          // ori v0, r0, id
    offset = data.writeWord(offset, 0x34020000 + id + equipIdOffset)
    slots.forEach(function(slot, index) {
      //                                          // lui s0, 0x8009
      offset = data.writeWord(offset, 0x3c108000 + (slot >>> 16))
      //                                          // lbu s0, slot (s0)
      offset = data.writeWord(offset, 0x92100000 + (slot & 0xffff))
      offset = data.writeWord(offset, 0x00000000) // nop
      const next = 4 + 5 * (slots.length - index - 1)
      //                                          // beq s0, v0, pc + next
      offset = data.writeWord(offset, 0x12020000 + next)
      offset = data.writeWord(offset, 0x00000000) // nop
    })
    //                                          // addiu s0, id
    offset = data.writeWord(offset, 0x26100000 + id)
    //                                          // lbu s0, 0x798a (s0)
    offset = data.writeWord(offset, 0x92100000 + invOffset)
    offset = data.writeWord(offset, 0x00000000) // nop
    offset = data.writeWord(offset, 0x12000002) // beq s0, r0, pc + 0x0c
    offset = data.writeWord(offset, 0x3c108007) // lui s0, 0x8007
    offset = data.writeWord(offset, 0xae0065f0) // sw r0, 0x65f0 (s0)
    // Return.
    offset = data.writeWord(offset, 0x0806b21a) // j 0x801ac868
    offset = data.writeWord(offset, 0x00000000) // nop
  }

  function replaceVladRelicWithItem(opts) {
    const boss = constants.zones[opts.boss]
    return function(data, relic, item, index) {
      let offset
      const id = item.id
      const zone = constants.zones[relic.entity.zones[0]]
      const slots = getItemSlots(item)
      // Patch item table.
      offset = util().romOffset(zone, zone.items + 0x02 * index)
      data.writeShort(offset, id + tileIdOffset)
      // Patch entities table.
      relic.entity.entities.forEach(function(addr) {
        if ('asItem' in relic) {
          if ('x' in relic.asItem) {
            offset = util().romOffset(zone, addr + 0x00)
            data.writeShort(offset, relic.asItem.x)
          }
          if ('y' in relic.asItem) {
            offset = util().romOffset(zone, addr + 0x02)
            data.writeShort(offset, relic.asItem.y)
          }
        }
        offset = util().romOffset(zone, addr + 0x04)
        data.writeShort(offset, 0x000c)
        offset = util().romOffset(zone, addr + 0x08)
        data.writeShort(offset, index)
      })
      // Patch instructions that load a relic.
      data.writeWord(
        relic.erase.instructions[0].addresses[0],
        relic.erase.instructions[0].instruction,
      )
      // Patch boss reward.
      data.writeShort(util().romOffset(boss, boss.rewards), id + tileIdOffset)
      // Entry point.
      offset = util().romOffset(zone, opts.entry)
      //                                          // j inj
      offset = data.writeWord(offset, 0x08060000 + (opts.inj >> 2))
      offset = data.writeWord(offset, 0x00041400) // sll v0, a0, 10
      // Zero tile function if item is in inventory.
      offset = util().romOffset(zone, opts.inj)
      //                                          // ori t1, r0, id
      offset = data.writeWord(offset, 0x34090000 + id + equipIdOffset)
      slots.forEach(function(slot, index) {
        //                                          // lui t0, 0x8009
        offset = data.writeWord(offset, 0x3c080000 + (slot >>> 16))
        //                                          // lbu t0, slot (t0)
        offset = data.writeWord(offset, 0x91080000 + (slot & 0xffff))
        offset = data.writeWord(offset, 0x00000000) // nop
        const next = 5 + 5 * (slots.length - index - 1)
        //                                          // beq t0, t1, pc + next
        offset = data.writeWord(offset, 0x11090000 + next)
        offset = data.writeWord(offset, 0x00000000) // nop
      })
      // Inventory check.
      offset = data.writeWord(offset, 0x3c088009) // lui t0, 0x8009
      //                                          // lbu t0, 0x798a + id (v0)
      offset = data.writeWord(offset, 0x91080000 + id + invOffset)
      offset = data.writeWord(offset, 0x00000000) // nop
      offset = data.writeWord(offset, 0x15090003) // beq t0, r0, pc + 0x10
      offset = data.writeWord(offset, 0x3409000f) // ori t1, r0, 0x000f
      relic.entity.entities.forEach(function(addr) {
        //                                        // sh t1, entity + 4 (t0)
        offset = data.writeWord(offset, 0xa5090000 + addr + 0x04)
      })
      // Return.
      offset = data.writeWord(offset, 0x03e00008) // jr ra
      offset = data.writeWord(offset, 0x00000000) // nop
    }
  }

  function replaceGoldRingWithRelic(data, item, relic) {
    let offset
    const zone = constants.zones[constants.ZONE.NO4]
    // Put relic in entity table.
    const itemId = item.itemId + constants.tileIdOffset
    const goldRing = util().itemFromTileId(items(), itemId)
    const entity = goldRing.tiles[0]
    entity.entities.forEach(function(addr) {
      data.writeShort(util().romOffset(zone, addr + 8), relic.relicId)
    })
    // Injection point.
    offset = util().romOffset(zone, 0x04c590)
    offset = data.writeWord(offset, 0x08077aed) // j 0x801debb4
    // Branch.
    offset = util().romOffset(zone, 0x05ebb4)
    offset = data.writeWord(offset, 0x10400003) // beq v0, r0, pc + 0x10
    offset = data.writeWord(offset, 0x00000000) // nop
    // Return.
    offset = data.writeWord(offset, 0x08073166) // j 0x801cc598
    offset = data.writeWord(offset, 0x00000000) // nop
    // Get Succubus defeat time.
    offset = data.writeWord(offset, 0x3c020003) // lui v0, 0x0003
    offset = data.writeWord(offset, 0x3442ca4c) // ori v0, v0, 0xca4c
    offset = data.writeWord(offset, 0x84420000) // lh v0, 0x0000 (v0)
    offset = data.writeWord(offset, 0x00000000) // nop
    // Branch if zero.
    offset = data.writeWord(offset, 0x10400006) // beq v0, r0, pc + 0x1c
    offset = data.writeWord(offset, 0x00000000) // nop
    // Patch entity type.
    offset = data.writeWord(offset, 0x3403000b) // ori v1, r0, 0x000b
    offset = data.writeWord(offset, 0x3c028018) // lui v0, 0x8018
    entity.entities.forEach(function(addr) {
      //                                        // sh v1, addr + 4 (v0)
      offset = data.writeWord(offset, 0xa4430000 + addr + 4)
    })
    offset = data.writeWord(offset, 0x34020000) // ori v0, r0, 0x0000
    // Return.
    offset = data.writeWord(offset, 0x0807316f) // j 0x801cc5bc
    offset = data.writeWord(offset, 0x00000000) // nop
  }

  function replaceHolyGlassesWithRelic(data, item, relic) {
    let offset
    const zone = constants.zones[constants.ZONE.CEN]
    // Injection point.
    offset = util().romOffset(zone, 0xfe98)
    offset = data.writeWord(offset, 0x08067208) // j 0x8019c820
    offset = data.writeWord(offset, 0x3404000b) // ori a0, r0, 0x000b
    //                                          // ori v0, r0, id
    offset = data.writeWord(offset, 0x34020000 + relic.relicId)
    offset = util().romOffset(zone, 0xfebc)
    offset = data.writeWord(offset, 0x00000000) // nop
    // Create entity.
    offset = util().romOffset(zone, 0x01c820)
    offset = data.writeWord(offset, 0x0c064d31) // jal 0x8001934c4, ra
    offset = data.writeWord(offset, 0x00000000) // nop
    // Add timeout and visual data.
    offset = data.writeWord(offset, 0x3c018007) // lui at, 0x8007
    offset = data.writeWord(offset, 0x3421c9f0) // ori at, at, 0xc9f0
    offset = data.writeWord(offset, 0x3c020da0) // lui v0, 0x0da0
    offset = data.writeWord(offset, 0x34422000) // ori v0, v0, 0x2000
    offset = data.writeWord(offset, 0xac22ffec) // sw v0, 0xffec (at)
    offset = data.writeWord(offset, 0x3402002b) // ori v0, r0, 0x002b
    offset = data.writeWord(offset, 0xa022001c) // sb v0, 0x001c (at)
    // Return.
    offset = data.writeWord(offset, 0x08063fa8) // j 0x8018fea0
    offset = data.writeWord(offset, 0x00000000) // nop
  }

  const relics = [{
    name: 'Soul of Bat',
    ability: RELIC.SOUL_OF_BAT,
    relicId: 0,
    entity: {
      zones: [ ZONE.LIB ],
      entities: [ 0x3826, 0x3f06 ],
    },
  }, {
    name: 'Fire of Bat',
    ability: RELIC.FIRE_OF_BAT,
    relicId: 1,
    entity: {
      zones: [ ZONE.NZ1 ],
      entities: [ 0x28ae, 0x32ba ],
    },
    asItem: {
      y: 0x00c9,
    },
  }, {
    name: 'Echo of Bat',
    ability: RELIC.ECHO_OF_BAT,
    relicId: 2,
    entity: {
      zones: [ ZONE.NO2 ],
      entities: [ 0x35f6, 0x3d1e ],
    },
    asItem: {
      y: 0x009d,
    },
  }, {
    name: 'Force of Echo',
    ability: RELIC.FORCE_OF_ECHO,
    relicId: 3,
    entity: {
      zones: [ ZONE.RNO4 ],
      entities: [ 0x3718, 0x4686 ],
    },
    asItem: {
      y: 0x00b9,
    },
  }, {
    name: 'Soul of Wolf',
    ability: RELIC.SOUL_OF_WOLF,
    relicId: 4,
    entity: {
      zones: [ ZONE.NO1 ],
      entities: [ 0x3c2e, 0x4356 ],
    },
    asItem: {
      y: 0x0331,
    },
  }, {
    name: 'Power of Wolf',
    ability: RELIC.POWER_OF_WOLF,
    relicId: 5,
    entity: {
      zones: [ ZONE.NO3, ZONE.NP3 ],
      entities: [ 0x41e2, 0x4914, 0x3fbe, 0x468c ],
    },
    asItem: {
      y: 0x00c8,
    },
  }, {
    name: 'Skill of Wolf',
    ability: RELIC.SKILL_OF_WOLF,
    relicId: 6,
    entity: {
      zones: [ ZONE.NZ0 ],
      entities: [ 0x3054, 0x3998 ],
      replaceWithRelic: false,
    },
    ids: [{
      zone: ZONE.NZ0,
      addresses: [ 0x054b1d5a ],
    }],
    asItem: {
      x: 0x007e,
      y: 0x00b9,
    },
  }, {
    name: 'Form of Mist',
    ability: RELIC.FORM_OF_MIST,
    relicId: 7,
    entity: {
      zones: [ ZONE.ARE ],
      entities: [ 0x304a, 0x36c8 ],
    },
    asItem: {
      y: 0x0099,
    },
  }, {
    name: 'Power of Mist',
    ability: RELIC.POWER_OF_MIST,
    relicId: 8,
    entity: {
      zones: [ ZONE.TOP ],
      entities: [ 0x2138, 0x27ac ],
    },
    asItem: {
      y: 0x04c8,
    },
  }, {
    name: 'Gas Cloud',
    ability: RELIC.GAS_CLOUD,
    relicId: 9,
    entity: {
      zones: [ ZONE.RCAT ],
      entities: [ 0x2596, 0x30ba ],
    },
    asItem: {
      x: 0x0016,
      y: 0x00b1,
    },
  }, {
    name: 'Cube of Zoe',
    ability: RELIC.CUBE_OF_ZOE,
    relicId: 10,
    entity: {
      zones: [ ZONE.NO3, ZONE.NP3 ],
      entities: [ 0x411a, 0x48a6, 0x3ece, 0x460a ],
    },
    asItem: {
      y: 0x007b,
    },
  }, {
    name: 'Spirit Orb',
    ability: RELIC.SPIRIT_ORB,
    relicId: 11,
    entity: {
      zones: [ ZONE.NO0 ],
      entities: [ 0x309e, 0x3ff0 ],
    },
    asItem: {
      x: 0x0043,
    },
  }, {
    name: 'Gravity Boots',
    ability: RELIC.GRAVITY_BOOTS,
    relicId: 12,
    entity: {
      zones: [ ZONE.NO0 ],
      entities: [ 0x298a, 0x37ec ],
    },
    asItem: {
      y: 0x00b9,
    },
  }, {
    name: 'Leap Stone',
    ability: RELIC.LEAP_STONE,
    relicId: 13,
    entity: {
      zones: [ ZONE.TOP ],
      entities: [ 0x2142, 0x286a ],
    },
    asItem: {
      y: 0x0729,
    },
  }, {
    name: 'Holy Symbol',
    ability: RELIC.HOLY_SYMBOL,
    relicId: 14,
    entity: {
      zones: [ ZONE.NO4 ],
      entities: [ 0x3ea6, 0x4f38 ],
    },
    asItem: {
      y: 0x00b9,
    },
  }, {
    name: 'Faerie Scroll',
    ability: RELIC.FAERIE_SCROLL,
    relicId: 15,
    entity: {
      zones: [ ZONE.LIB ],
      entities: [ 0x3510, 0x3a92 ],
    },
    asItem: {
      y: 0x00b9,
    },
  }, {
    name: 'Jewel of Open',
    ability: RELIC.JEWEL_OF_OPEN,
    relicId: 16,
    ids: [{
      zone: ZONE.LIB,
      addresses: [ 0x047a321c ],
    }],
    erase: {
      instructions: [{
        addresses: [ 0x047dbde0 ],
        instruction: 0x34020001,
      }],
    },
    replaceWithRelic: replaceShopRelicWithRelic,
    replaceWithItem: replaceShopRelicWithItem,
    consumesItem: false,
  }, {
    name: 'Merman Statue',
    ability: RELIC.MERMAN_STATUE,
    relicId: 17,
    entity: {
      zones: [ ZONE.NO4 ],
      entities: [ 0x4004, 0x50aa ],
    },
    asItem: {
      y: 0x00b9,
    },
  }, {
    name: 'Bat Card',
    ability: RELIC.BAT_CARD,
    relicId: 18,
    entity: {
      zones: [ ZONE.NZ0, ZONE.NZ0 ],
      entities: [ 0x2a8c, 0x33d0, 0x2ad2, 0x343e ],
      replaceWithRelic: false,
    },
    ids: [{
      zone: ZONE.NZ0,
      addresses: [ 0x054b1d58 ],
    }],
    asItem: {
      x: 0x007e,
      y: 0x00b9,
    },
  }, {
    name: 'Ghost Card',
    ability: RELIC.GHOST_CARD,
    relicId: 19,
    entity: {
      zones: [ ZONE.TOP ],
      entities: [ 0x25fc, 0x2ba8 ],
    },
    asItem: {
      y: 0x02a8,
    },
  }, {
    name: 'Faerie Card',
    ability: RELIC.FAERIE_CARD,
    relicId: 20,
    entity: {
      zones: [ ZONE.LIB ],
      entities: [ 0x3574, 0x3c2c ],
    },
    asItem: {
      y: 0x00b9,
    },
  }, {
    name: 'Demon Card',
    ability: RELIC.DEMON_CARD,
    relicId: 21,
    entity: {
      zones: [ ZONE.CHI ],
      entities: [ 0x1ade, 0x1e62 ],
    },
    asItem: {
      y: 0x00b8,
    },
  }, {
    name: 'Sword Card',
    ability: RELIC.SWORD_CARD,
    relicId: 22,
    entity: {
      zones: [ ZONE.NO2 ],
      entities: [ 0x3416, 0x3b3e ],
    },
    asItem: {
      y: 0x009c,
    },
  }, {
    name: 'Heart of Vlad',
    ability: RELIC.HEART_OF_VLAD,
    relicId: 25,
    entity: {
      zones: [ ZONE.RDAI ],
      entities: [ 0x1dc4, 0x2730 ],
    },
    reward: {
      zone: ZONE.RBO3,
      index: 0x11,
    },
    erase: {
      instructions: [{
        addresses: [ 0x06757b54 ],
        instruction: 0x34020000,
      }],
    },
    replaceWithItem: replaceVladRelicWithItem({
      boss:   ZONE.RBO3,
      entry:  0x034950,
      inj:    0x047900,
    }),
  }, {
    name: 'Tooth of Vlad',
    ability: RELIC.TOOTH_OF_VLAD,
    relicId: 26,
    entity: {
      zones: [ ZONE.RNO1 ],
      entities: [ 0x2332, 0x2a1e ],
    },
    reward: {
      zone: ZONE.RBO4,
      index: 0x12,
    },
    erase: {
      instructions: [{
        addresses: [ 0x067ec398 ],
        instruction: 0x34020000,
      }],
    },
    replaceWithItem: replaceVladRelicWithItem({
      boss:   ZONE.RBO4,
      entry:  0x029fc0,
      inj:    0x037500,
    }),
  }, {
    name: 'Rib of Vlad',
    ability: RELIC.RIB_OF_VLAD,
    relicId: 27,
    entity: {
      zones: [ ZONE.RNO2 ],
      entities: [ 0x29d4, 0x31b8 ],
    },
    reward: {
      zone: ZONE.RBO7,
      index: 0x13,
    },
    erase: {
      instructions: [{
        addresses: [ 0x069e8524 ],
        instruction: 0x34020000,
      }],
    },
    replaceWithItem: replaceVladRelicWithItem({
      boss:   ZONE.RBO7,
      entry:  0x037014,
      inj:    0x04bf00,
    }),
  }, {
    name: 'Ring of Vlad',
    ability: RELIC.RING_OF_VLAD,
    relicId: 28,
    ids: [{
      zone: ZONE.RNZ1,
      addresses: [ 0x059e8074, 0x059ee2e4, 0x059bdb30 ]
    }],
    erase: {
      instructions: [{
        addresses: [ 0x059ee594 ],
        instruction: 0x34020000,
      }, {
        addresses: [ 0x059ee2f0 ],
        instruction: 0x00000000,
      }],
    },
    replaceWithItem: replaceRingOfVladWithItem,
  }, {
    name: 'Eye of Vlad',
    ability: RELIC.EYE_OF_VLAD,
    relicId: 29,
    entity: {
      zones: [ ZONE.RCHI ],
      entities: [ 0x18f2, 0x1d52 ],
    },
    reward: {
      zone: ZONE.RBO2,
      index: 0x15,
    },
    erase: {
      instructions: [{
        addresses: [ 0x06644cf0 ],
        instruction: 0x34020000,
      }],
    },
    replaceWithItem: replaceVladRelicWithItem({
      boss:   ZONE.RBO2,
      entry:  0x01af18,
      inj:    0x02a000,
    }),
    asItem: {
      y: 0x0079,
    },
  }, {
    name: 'Spike Breaker',
    ability: RELIC.SPIKE_BREAKER,
    itemId: 183,
    tileIndex: 0,
    asRelic: {
      y: 0x0094,
    },
  }, {
    name: 'Gold Ring',
    ability: RELIC.GOLD_RING,
    itemId: 241,
    ids: [{
      zone: ZONE.NO4,
      addresses: [ 0x04c324b4 ],
      tileId: true,
    }],
    replaceWithRelic: replaceGoldRingWithRelic,
  }, {
    name: 'Silver Ring',
    ability: RELIC.SILVER_RING,
    itemId: 242,
    tileIndex: 0,
    asRelic: {
      y: 0x009a,
    },
  }, {
    name: 'Holy Glasses',
    ability: RELIC.HOLY_GLASSES,
    itemId: 203,
    ids: [{
      zone: ZONE.CEN,
      addresses: [ 0x0456e368 ],
    }],
    erase: {
      instructions: [{
        addresses: [ 0x0456e360 ],
        instruction: 0x08063ff6,
      }],
    },
    replaceWithRelic: replaceHolyGlassesWithRelic,
  }]

  const exports = relics
  if (self) {
    self.sotnRando = Object.assign(self.sotnRando || {}, {
      relics: exports,
    })
  } else {
    module.exports = exports
  }
})(typeof(self) !== 'undefined' ? self : null)
