(function(self) {

  let exports
  if (self) {
    exports = self.sotnRando.presets
  } else {
    exports = [
      require('./casual'),
      require('./safe'),
      require('./adventure'),
      require('./og'),
      require('./guarded-og'),
      require('./speedrun'),
      require('./lycanthrope'),
      require('./warlock'),
      require('./nimble'),
      require('./expedition'),
      require('./glitch'),
      require('./scavenger'),
      require('./empty-hand'),
      require('./bat-master'),
      require('./gem-farmer'),
      require('./third-castle'),
      require('./rat-race'),
      require('./magic-mirror'),
      require('./leg-day'),
      require('./boss-rush'),
      require('./aperture'),
      require('./big-toss'),
      require('./bountyhunter'),
      require('./bountyhunter-tc'),
      require('./hitman'),
      require('./chaos-lite'),
      require('./beyond'),
      require('./breach'),
      require('./grand-tour'),
      require('./crash-course'),
      require('./forge'),
      require('./lookingglass'),
      require('./skinwalker'),
      require('./summoner'),
      require('./agonizetwtw'),
      require('./stwosafe'),
      require('./open'),
    ]
  }
  exports.sort(function(a, b) {
    if (!('weight' in a && 'id' in a)) {
      if (!('weight' in b && 'id' in b)) {
        return 0
      }
      return 1
    } else if (!('weight' in b && 'id' in b)) {
      return -1
    }
    const weight = a.weight - b.weight
    if (weight === 0) {
      if (a.id < b.id) {
        return -1
      } else if (a.id > b.id) {
        return 1
      }
    }
    return weight
  })

  if (self) {
    self.sotnRando = Object.assign(self.sotnRando || {}, {
      presets: exports,
    })
  } else {
    module.exports = exports
  }
})(typeof(self) !== 'undefined' ? self : null)
