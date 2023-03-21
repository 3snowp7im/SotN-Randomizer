(function (self) {

  let util

  if (self) {
    util = self.sotnRando.util
  } else {
    util = require('./util')
  }

  const StageIndex = {
    NO0: [0x00],
    NO1: [0x01],
    LIB: [0x02],
    CAT: [0x03],
    NO2: [0x04],
    CHI: [0x05],
    DAI: [0x06],
    NO3: [0x07],
    NO4: [0x09],
    ARE: [0x0A],
    TOP: [0x0B],
    NZ0: [0x0C],
    NZ1: [0x0D],
  };

  function setStartingDestination(data, stage) {
    data.writeChar(0x05377294, stage)
    data.writeChar(0x00119B58, stage)
  }

  function randomizeStartingZone(rng, options) {
    const data = new util.checked()
    if (options.startingZone) {
      let stages = Object.values(StageIndex)
      setStartingDestination(data, stages[[Math.floor(rng() * stages.length)]])
    }
    return data
  }

  const exports = randomizeStartingZone
  if (self) {
    self.sotnRando = Object.assign(self.sotnRando || {}, {
      randomizeStartingZone: exports,
    })
  } else {
    module.exports = exports
  }
})(typeof (self) !== 'undefined' ? self : null)
