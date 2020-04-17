function randomizeWorker() {
  const ctx = {}

  let seedrandom
  let eccEdcCalc
  let errors
  let util
  let randomizeRelics
  let randomizeItems

  function loadBrowser(url) {
    importScripts(
      'https://cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.1/seedrandom.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/sjcl/1.0.8/sjcl.min.js',
      url + "constants.js",
      url + 'enemies.js',
      url + 'errors.js',
      url + "extension.js",
      url + "items.js",
      url + "relics.js",
      url + "util.js",
      url + "presets/casual.js",
      url + "presets/safe.js",
      url + "presets/adventure.js",
      url + "presets/speedrun.js",
      url + "presets/glitch.js",
      url + "presets/glitch-hard.js",
      url + "presets/balance.js",
      url + "randomize_items.js",
      url + "randomize_relics.js",
      url + "ecc-edc-recalc-js.js",
    )
    seedrandom = Math.seedrandom
    eccEdcCalc = self.eccEdcCalc
    errors = self.sotnRando.errors
    util = self.sotnRando.util
    randomizeRelics = self.sotnRando.randomizeRelics.randomizeRelics
    randomizeItems = self.sotnRando.randomizeItems.randomizeItems
  }

  function loadNode() {
    seedrandom = require('seedrandom')
    eccEdcCalc = require('./ecc-edc-recalc-js')
    errors = require('./errors')
    util = require('./util')
    randomizeRelics = require('./randomize_relics').randomizeRelics
    randomizeItems = require('./randomize_items').randomizeItems
  }

  function handleMessage(message) {
    if (!ctx.loaded) {
      if (typeof(module) === 'undefined') {
        loadBrowser(message.data.url)
      } else {
        loadNode()
      }
      ctx.loaded = true
    }
    if (typeof(module) === 'undefined') {
      message = message.data
    }
    try {
      switch (message.action) {
      case 'relics': {
        if (message.cancel) {
          ctx.resolve(false)
        } else if (message.continue) {
          ctx.resolve(true)
        } else {
          delete ctx.canceled
          const rng = new seedrandom(message.saltedSeed)
          const options = util.Preset.options(message.options)
          const removed = message.removed
          const seed = message.seed
          ctx.thread= message.thread
          self = this
          randomizeRelics(rng, options, removed, function(resolve, rounds) {
            ctx.resolve = resolve
            ctx.rounds = rounds
            self.postMessage({rounds: rounds})
          }).then(function(result) {
            result = result || {}
            result.action = 'relics'
            result.done = true
            util.sanitizeResult(result)
            self.postMessage(result)
            if ('unref' in self) {
              self.unref()
            }
          }).catch(function(err) {
            self.postMessage({
              action: 'relics',
              error: err,
              rounds: ctx.rounds,
            })
            if ('unref' in self) {
              self.unref()
            }
          })
        }
        break
      }
      case 'items': {
        const rng = new seedrandom(message.saltedSeed)
        const options = util.Preset.options(message.options)
        const result = randomizeItems(rng, message.items, options)
        result.action = 'items'
        this.postMessage(result)
        if ('unref' in this) {
          this.unref()
        }
        break
      }
      case 'finalize': {
        const array = new Uint8Array(message.file)
        const check = new util.checked(array)
        check.apply(message.data)
        util.setSeedText(check, message.seed, message.preset)
        const checksum = check.sum()
        if (message.checksum && message.checksum !== checksum) {
          throw new errors.VersionError()
        }
        eccEdcCalc(array, array.length)
        this.postMessage({
          action: 'finalize',
          file: message.file,
          checksum: checksum,
        }, [message.file])
        break
      }}
    } catch (err) {
      this.postMessage({error: err})
    }
  }

  if (typeof(self) === 'undefined') {
    const self = require('worker_threads').parentPort
    self.on('message', handleMessage)
  } else {
    self.addEventListener('message', handleMessage)
  }
}

if (typeof(module) === 'undefined') {
  if (typeof(window) === 'undefined') {
    randomizeWorker()
  }
} else {
  randomizeWorker()
}
