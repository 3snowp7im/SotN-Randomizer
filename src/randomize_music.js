(function(self) {

  let constants
  let enemies
  let util

  if (self) {
    constants = self.sotnRando.constants
    enemies = self.sotnRando.enemies
    util = self.sotnRando.util
  } else {
    constants = require('./constants')
    enemies = require('./enemies')
    util = require('./util')
  }

  const musicBySong = {
    LOST_PAINTING: [
      /* RDAI */ 0x00b0788, 0x6757ad8, 0x6757b74,
      /* RLIB */ 0x00b06d8,
      /* RNO4 */ 0x00b080c,
    ],
    CURSE_ZONE: [
      /* RCAT */ 0x00b0704, 0x6a7c4f0, 0x6a7c58c,
    ],
    REQUIEM_FOR_THE_GODS: [
      /* DAI  */  0x00b00d8,
    ],
    RAINBOW_CEMETARY: [
      /* CAT  */ 0x00b0054, 0x609505c,
    ],
    WOOD_CARVING_PARTITA: [
      /* LIB  */ 0x00b0028, 0x00b036c, 0x47e5ec4, 0x47e6060,
    ],
    CRYSTAL_TEARDROPS: [
      /* NO4  */ 0x00b015c, 0x61d1fa8, 0x61d1fec, 0x61d2188,
    ],
    MARBLE_GALLERY: [
      /* NO0  */ 0x00affd0,
    ],
    DRACULAS_CASTLE: [
      /* NO3  */ 0x00b0104, 0x00b0c2c, 0x4ba6cb0, 0x4bb0064,
    ],
    THE_TRAGIC_PRINCE: [
      /* NZ1  */ 0x00b020c, 0x55a2f90, 0x55a3008,
    ],
    TOWER_OF_MIST: [
      /* NO1  */ 0x00afffc,
    ],
    DOOR_OF_HOLY_SPIRITS: [
      /* RARE */ 0x00b0838, 0x6487b44, 0x6487bec,
    ],
    DANCE_OF_PALES: [
      /* NO2  */ 0x00b0080, 0x5fea9dc,
    ],
    ABANDONED_PIT: [
      /* CHI  */ 0x00b00ac, 0x66cc898,
      /* RCHI */ 0x00b075c, 0x6644d10,
    ],
    HEAVENLY_DOORWAY: [
      /* TOP  */ 0x00b01b4,
      /* RTOP */ 0x00b0864,
    ],
    FESTIVAL_OF_SERVANTS: [
      0x47e5e08, 0x54eca88, 0x55a2ed0,
      0x59ee490, 0x6129480, 0x61d20f4,
      0x67ec2bc, 0x689e4f0, 0x69e8318,
    ],
    WANDERING_GHOSTS: [
      /* ARE  */ 0x00b0188, 0x6126570,
    ],
    THE_DOOR_TO_THE_ABYSS: [
      /* CEN  */ 0x00b0130,
      /* RCEN */ 0x00b07e0,
    ],
    DANCE_OF_GOLD: [
      /* NZ0  */ 0x00b01e0, 0x54ecb58, 0x54ecbd4,
    ],
    ENCHANTED_BANQUET: [
      0x5b074f4, 0x6757a78,
    ],
    DEATH_BALLAD: [
      0x56dc624, 0x5fddd24, 0x5fddd80,
      0x5fddda0, 0x5fdde14, 0x6094500,
      0x6094534, 0x632e8c8, 0x65a88e8,
      0x65a8908, 0x6644bc4, 0x6a7c490,
    ],
    FINAL_TOCCATA: [
      0x00b08bc, 0x00b07b4, 0x00b0680,
      0x00b06ac, 0x00b0730, 0x00b0890,
      0x59ee534, 0x59ee5ac, 0x65a8960,
      0x65a89f0, 0x67ec31c, 0x67ec3b8,
    ],
  };

  const musicByArea = {
    ARE: [ 0x00b0188, 0x6126570 ],
    CAT: [ 0x00b0054, 0x609505c ],
    CEN: [ 0x00b0130 ],
    CHI: [ 0x00b00ac, 0x66cc898 ],
    DAI: [ 0x00b00d8 ],
    DRE: [ 0x5b074f4 ],
    LIB: [ 0x00b0028, 0x00b036c, 0x47e5ec4, 0x47e6060 ],
    LIB_BOSS: [ 0x47e5e08 ],
    NO0: [ 0x00affd0 ],
    NO1: [ 0x00afffc ],
    NO2: [ 0x00b0080, 0x5fea9dc ],
    NO3: [ 0x00b0104, 0x00b0c2c, 0x4ba6cb0, 0x4bb0064 ],
    NO4: [ 0x00b015c, 0x61d1fa8, 0x61d1fec, 0x61d2188 ],
    NZ0: [ 0x00b01e0, 0x54ecb58, 0x54ecbd4 ],
    NZ0_BOSS: [ 0x54eca88 ],
    NZ1: [ 0x00b020c, 0x55a2f90, 0x55a3008 ],
    NZ1_BOSS: [ 0x55a2ed0 ],
    TOP: [ 0x00b01b4 ],
    RARE: [ 0x00b0838, 0x6487b44, 0x6487bec ],
    RCAT: [ 0x00b0704, 0x6a7c4f0, 0x6a7c58c ],
    RCEN: [ 0x00b07e0 ],
    RCEN_BOSS: [ 0x56dc624 ],
    RCHI: [ 0x00b075c, 0x6644d10 ],
    RDAI: [ 0x00b0788, 0x6757ad8, 0x6757b74 ],
    RLIB: [ 0x00b06d8 ],
    RNO0: [ 0x00b0680 ],
    RNO1: [ 0x00b06ac, 0x67ec31c, 0x67ec3b8 ],
    RNO2: [ 0x00b0730 ],
    RNO3: [ 0x00b07b4 ],
    RNO4: [ 0x00b080c ],
    RNZ0: [ 0x00b0890, 0x65a8960, 0x65a89f0 ],
    RNZ1: [ 0x00b08bc, 0x59ee534, 0x59ee5ac ],
    RNZ1_BOSS: [ 0x59ee490 ],
    RTOP: [ 0x00b0864 ],
    BO0: [ 0x5fddd24, 0x5fddd80, 0x5fddda0, 0x5fdde14 ],
    BO1: [ 0x6094500, 0x6094534 ],
    BO2: [ 0x6129480 ],
    BO3: [ 0x61d20f4 ],
    BO5: [ 0x632e8c8 ],
    RBO1: [ 0x65a88e8, 0x65a8908 ],
    RBO2: [ 0x6644bc4 ],
    RBO3: [ 0x6757a78 ],
    RBO4: [ 0x67ec2bc ],
    RBO5: [ 0x689e4f0 ],
    RBO7: [ 0x69e8318 ],
    RBO8: [ 0x6a7c490 ],
  };

  function randomizeMusic(rng, options) {
    const data = new util.checked()
    if (options.music) {
      let music
      if (options.turkeyMode) {
        music = Object.values(musicByArea)
      } else {
        music = Object.values(musicBySong)
      }
      const songSrc = Object.values(constants.MUSIC)
      const songPool = songSrc.slice()
      while (songPool.length < music.length) {
        songPool.push(songSrc[Math.floor(rng() * songSrc.length)])
      }
      const randSongs = util.shuffled(rng, songPool)
      for (const zone of music) {
        const randSong = randSongs.pop()
        for (const addr of zone) {
          data.writeChar(addr, randSong)
        }
      }
    }
    return data
  }

  const exports = randomizeMusic
  if (self) {
    self.sotnRando = Object.assign(self.sotnRando || {}, {
      randomizeMusic: exports,
    })
  } else {
    module.exports = exports
  }
})(typeof(self) !== 'undefined' ? self : null)
