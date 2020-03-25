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

  const locations = [{
    name: LOCATION.SCYLLA,
    extension: EXTENSION.GUARDED,
    itemId: 221,
    tileIndex: 0,
    asRelic: {
      y: 0x00a0,
    },
  }, {
    name: LOCATION.GRANFALLOON,
    extension: EXTENSION.GUARDED,
    itemId: 110,
    tileIndex: 0,
    asRelic: {
      y: 0x0098,
    },
  }, {
    name: LOCATION.DOPPLEGANGER40,
    extension: EXTENSION.GUARDED,
    itemId: 118,
    tileIndex: 0,
    asRelic: {
      y: 0x0080,
    },
  }, {
    name: LOCATION.BEEZLEBUB,
    extension: EXTENSION.GUARDED,
    itemId: 244,
    tileIndex: 0,
    asRelic: {
      x: 0x0082,
      y: 0x0080,
    },
  }]

  const exports = {
    locations: locations,
  }
  if (self) {
    self.sotnRando = Object.assign(self.sotnRando || {}, {
      extension: exports,
    })
  } else {
    module.exports = exports
  }
})(typeof(self) !== 'undefined' ? self : null)
