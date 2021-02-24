(function(self) {

  let stats
  let items
  let constants
  let util

  if (self) {
    stats = self.sotnRando.stats
    items = self.sotnRando.items
    constants = self.sotnRando.constants
    util = self.sotnRando.util
  } else {
    stats = require('./stats')
    items = require('./items')
    constants = require('./constants')
    util = require('./util')
  }

  const shuffled = util.shuffled

  function shuffleStats(rng, data, stats, stat, offset, func) {
    shuffled(rng, stats).forEach(function(item, index) {
      const addr = util.romOffset(constants.exe, stats[index].offset + offset)
      func.call(data, addr, item[stat])
    })
  }

  function shuffleHandStats(rng, data, newNames, stats, handType) {
    // Randomize names of non-elemental items.
    const nonElem = stats.filter(function(item) {
      return [
        'Firebrand',
        'Thunderbrand',
        'Icebrand',
        'Stone sword',
        'Holy sword',
        'Dark blade',
      ].indexOf(item.name) === -1
    })
    shuffled(rng, nonElem).forEach(function(item, index) {
      newNames.push({
        id: stats[index].id,
        name: item.name,
      })
      let addr = util.romOffset(constants.exe, nonElem[index].offset + 0x00)
      addr = data.writeWord(addr, item.nameAddress)
    })
    // Randomize icons and sprite.
    shuffled(rng, stats).forEach(function(item, index) {
      let addr
      if (handType === 'SHIELD') {
        addr = util.romOffset(constants.exe, stats[index].offset + 0x0f)
        addr = data.writeChar(addr, item.sprite)
      }
      addr = util.romOffset(constants.exe, stats[index].offset + 0x2c)
      addr = data.writeShort(addr, item.icon)
    })
    // Randomize damage shield stats together.
    if (handType === 'SHIELD') {
      shuffled(rng, stats).forEach(function(item, index) {
        let addr
        addr = util.romOffset(constants.exe, stats[index].offset + 0x08)
        addr = data.writeShort(addr, item.attack)
        addr = util.romOffset(constants.exe, stats[index].offset + 0x28)
        addr = data.writeShort(addr, item.range)
      })
      shuffleStats(rng, data, stats, 'defense', 0x0a, data.writeShort)
    } else {
      shuffled(rng, stats).forEach(function(item, index) {
        let addr
        addr = util.romOffset(constants.exe, stats[index].offset + 0x08)
        addr = data.writeShort(addr, item.attack)
        addr = util.romOffset(constants.exe, stats[index].offset + 0x0a)
        addr = data.writeShort(addr, item.defense)
      })
      shuffleStats(rng, data, stats, 'range', 0x28, data.writeShort)
    }
    // Randomize everything else.
    shuffleStats(rng, data, stats, 'spell', 0x1c, data.writeWord)
    shuffleStats(rng, data, stats, 'stunFrames', 0x26, data.writeShort)
    shuffleStats(rng, data, stats, 'extra', 0x2a, data.writeChar)
    shuffleStats(rng, data, stats, 'palette', 0x2e, data.writeShort)
  }

  function shuffleEquipmentStats(rng, data, newNames, stats) {
    // Randomize names of non-elemental items.
    const nonElem = stats.filter(function(item) {
      return [
        'Fire mail',
        'Lightning mail',
        'Ice mail',
        'Mirror cuirass',
        'Dark armor',
        'Holy mail',
      ].indexOf(item.name) == -1
    })
    shuffled(rng, nonElem).forEach(function(item, index) {
      newNames.push({
        id: stats[index].id,
        name: item.name,
      })
      let addr = util.romOffset(constants.exe, nonElem[index].offset + 0x00)
      addr = data.writeWord(addr, item.nameAddress)
    })
    // Randomize everything else.
    const regular = stats.filter(function(item) {
      // Ignore Duplicator and items that have stats in their descriptions
      return [
        'Duplicator',
        'Necklace of J',
        'Gauntlet',
        'Medal',
        'King\'s stone',
        'Covenant stone',
        'Nauglamir',
      ].indexOf(item.name) === -1
    })
    shuffled(rng, regular).forEach(function(item, index) {
      let addr = util.romOffset(constants.exe, regular[index].offset + 0x08)
      addr = data.writeShort(addr, item.attack)
      addr = data.writeShort(addr, item.defense)
      addr = data.writeChar(addr, item.strength)
      addr = data.writeChar(addr, item.constitution)
      addr = data.writeChar(addr, item.intelligence)
      addr = data.writeChar(addr, item.luck)
    })
    shuffleStats(rng, data, stats, 'icon', 0x18, data.writeShort)
    shuffleStats(rng, data, stats, 'palette', 0x1a, data.writeShort)
  }

  function randomizeStats(rng, options) {
    const data = new util.checked()
    const newNames = []
    if (options.stats) {
      // Randomize hand item stats.
      Object.getOwnPropertyNames(constants.HAND_TYPE).forEach(
        function(handType) {
          const items = stats.hand.filter(function(item) {
            return item.handType === constants.HAND_TYPE[handType]
          })
          shuffleHandStats(rng, data, newNames, items, handType)
        }
      )
      // Randomize equipment item stats.
      Object.getOwnPropertyNames(constants.TYPE).forEach(
        function(type) {
          const items = stats.equipment.filter(function(item) {
            return item.type === constants.TYPE[type]
          })
          shuffleEquipmentStats(rng, data, newNames, items)
        }
      )
    }
    return {
      newNames: newNames,
      data: data,
    }
  }

  const exports = randomizeStats
  if (self) {
    self.sotnRando = Object.assign(self.sotnRando || {}, {
      randomizeStats: exports,
    })
  } else {
    module.exports = exports
  }
})(typeof(self) !== 'undefined' ? self : null)
