(function (self) {
  let util

  if (self) {
    util = self.sotnRando.util
  } else {
    util = require('./util')
  }

  const POWER_OF_MIST_CLUT = 0x000EEFEE
  const POWER_OF_WOLF_CLUT = 0x000EEF8E
  const FIRE_OF_BAT_CLUT = 0x000EEF0E

  const POWER_OF_MIST_COLORS = [
    0x8001, 0x8004, 0x8802,
    0x9004, 0x9805, 0xa006,
    0xac07, 0xb027, 0xc448,
    0xfc69, 0xfc89, 0xfcaa,
    0xfccb, 0xfd0e, 0xfe3f
  ]

  const POWER_OF_WOLF_COLORS = [
    0x8421, 0x8464, 0x8481,
    0x8d21, 0x8da2, 0x99a3,
    0xa5e3, 0x9a24, 0x8e66,
    0x86e7, 0x8789, 0x8ba8,
    0xa38c, 0xb790, 0xe7db
  ]

  const FIRE_OF_BAT_COLORS = [
    0x8045, 0x84cb, 0x9049,
    0xa071, 0xa895, 0xb0f8,
    0xc13c, 0xad5c, 0x9d9e,
    0x8dff, 0x8a5f, 0x8aff,
    0xa75f, 0xc39f, 0xebff
  ]


  // Patch a color look up table at the specified address with new colors in the RGB1555 format.
  function patchCLUT(data, address, colors) {
    for (let i = 0; i < colors.length; i++) {
      data.writeShort(address + (i * 2), colors[i])
    }
  }

  // Patches researched by MottZilla.
  function patchPowerOfSireFlashing(data) {
    data.writeWord(0x00136580, 0x03e00008)
  }

  function patchClockTowerPuzzleGate(data) {
    data.writeChar(0x05574dee, 0x80)
    data.writeChar(0x055a110c, 0xe0)
  }

  function patchOlroxDeath(data) {
    data.writeChar(0x05fe6914, 0x80)
  }

  function patchScyllaDoor(data) {
    data.writeChar(0x061ce8ec, 0xce)
    data.writeWord(0x061cb734, 0x304200fe)
  }
  
  function patchMinotaurWerewolf(data) {
    let offset = 0x0613a640
    data.writeWord(0x061294dc, 0x0806d732)
    offset = data.writeWord(offset, 0x3c028007)
    offset = data.writeWord(offset, 0x34423404)
    offset = data.writeWord(offset, 0x34030005)
    offset = data.writeWord(offset, 0x90420000)
    offset = data.writeWord(offset, 0x00000000)
    offset = data.writeWord(offset, 0x1043000b)
    offset = data.writeWord(offset, 0x34030018)
    offset = data.writeWord(offset, 0x00000000)
    offset = data.writeWord(offset, 0x10430008)
    offset = data.writeWord(offset, 0x34030009)
    offset = data.writeWord(offset, 0x00000000)
    offset = data.writeWord(offset, 0x10430005)
    offset = data.writeWord(offset, 0x34030019)
    offset = data.writeWord(offset, 0x00000000)
    offset = data.writeWord(offset, 0x10430002)
    offset = data.writeWord(offset, 0x00000000)
    offset = data.writeWord(offset, 0x0806d747)
    offset = data.writeWord(offset, 0x34020001)
    offset = data.writeWord(offset, 0x00000000)
    offset = data.writeWord(offset, 0xac82002c)
    offset = data.writeWord(offset, 0x00000000)
    offset = data.writeWord(offset, 0x3c028007)
    offset = data.writeWord(offset, 0x944233da)
    offset = data.writeWord(offset, 0x08069bc3)
  }

  function applyAccessibilityPatches() {
    const data = new util.checked()
    patchPowerOfSireFlashing(data)
    // Adjust colors and brightness for better visibility.
    patchCLUT(data, POWER_OF_MIST_CLUT, POWER_OF_MIST_COLORS)
    patchCLUT(data, POWER_OF_WOLF_CLUT, POWER_OF_WOLF_COLORS)
    patchCLUT(data, FIRE_OF_BAT_CLUT, FIRE_OF_BAT_COLORS)
    patchClockTowerPuzzleGate(data)
    patchOlroxDeath(data)
    patchScyllaDoor(data)
    patchMinotaurWerewolf(data)
    return data
  }

  const exports = applyAccessibilityPatches
  if (self) {
    self.sotnRando = Object.assign(self.sotnRando || {}, {
      applyAccessibilityPatches: exports,
    })
  } else {
    module.exports = exports
  }
})(typeof (self) !== 'undefined' ? self : null)
