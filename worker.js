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
      url + "build/presets/casual.js",
      url + "build/presets/safe.js",
      url + "build/presets/adventure.js",
      url + "build/presets/speedrun.js",
      url + "build/presets/glitch.js",
      url + "build/presets/empty-hand.js",
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

  function getRng(message) {
    return new seedrandom(util.saltSeed(
      message.version,
      message.options,
      message.seed,
      message.nonce,
    ))
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
          if ('unref' in this) {
            this.unref()
          }
        } else {
          const rng = getRng(message)
          const removed = message.removed
          ctx.options = ctx.options || util.Preset.options(message.options)
          try {
            const result = randomizeRelics(rng, ctx.options, removed)
            result.action = 'relics'
            result.done = true
            result.nonce = message.nonce
            util.sanitizeResult(result)
            this.postMessage(result)
          } catch (err) {
            this.postMessage({
              action: 'relics',
              error: err,
            })
          }
        }
        break
      }
      case 'items': {
        const rng = getRng(message)
        ctx.options = ctx.options || util.Preset.options(message.options)
        const result = randomizeItems(rng, message.items, ctx.options)
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
