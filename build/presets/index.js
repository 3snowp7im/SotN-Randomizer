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
      require('./bountyhuntertc'),
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
      require('./brawler'),
    ]
  }

  if (self) {    
    self.sotnRando = Object.assign(self.sotnRando || {}, {
      presets: exports,
    })
  } else {
    module.exports = exports
  }
})(typeof(self) !== 'undefined' ? self : null)
