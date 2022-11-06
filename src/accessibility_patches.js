(function(self) {
    let util
  
    if (self) {
      util = self.sotnRando.util
    } else {
      util = require('./util')
    }

    function patchPowerOfSireFlashing(data) {
        // Fix researched by MottZilla.
        data.writeWord(0x00136580, 0x03e00008)
      }
  
    function applyAccessibilityPatches(options) {
      const data = new util.checked()
      if (options.accessibilityPatches) {
        patchPowerOfSireFlashing(data)
      }
      return {
        data: data
      }
    }
  
    const exports = applyAccessibilityPatches
    if (self) {
      self.sotnRando = Object.assign(self.sotnRando || {}, {
        applyAccessibilityPatches: exports,
      })
    } else {
      module.exports = exports
    }
  })(typeof(self) !== 'undefined' ? self : null)
  