function randomizeWorker() {

  let constants
  let eccEdcCalc
  let errors
  let util
  let randomizeRelics
  let randomizeItems
  let seedrandom

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
    constants = self.sotnRando.constants
    eccEdcCalc = self.eccEdcCalc
    errors = self.sotnRando.errors
    randomizeRelics = self.sotnRando.randomizeRelics.randomizeRelics
    randomizeItems = self.sotnRando.randomizeItems.randomizeItems
    seedrandom = Math.seedrandom
    util = self.sotnRando.util
  }

  function loadNode() {
    constants = require('./constants')
    eccEdcCalc = require('./ecc-edc-recalc-js')
    errors = require('./errors')
    randomizeRelics = require('./randomize_relics').randomizeRelics
    randomizeItems = require('./randomize_items').randomizeItems
    seedrandom = require('seedrandom')
    util = require('./util')
  }

  function getRng(salt) {
    return new seedrandom(util.saltSeed(
      salt.version,
      salt.options,
      salt.seed,
      salt.nonce,
    ))
  }

  const ctx = {}

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
      case constants.WORKER_ACTION.RELICS: {
        if (message.cancel) {
          if ('unref' in this) {
            this.unref()
          }
        } else {
          if (message.bootstrap) {
            Object.assign(ctx, {
              salt: {
                options: message.options,
                version: message.version,
                seed: message.seed,
              },
              options: util.Preset.options(message.options),
              removed: message.removed,
            })
          }
          const rng = getRng(Object.assign({}, ctx.salt, {
            nonce: message.nonce,
          }))
          try {
            const result = randomizeRelics(rng, ctx.options, ctx.removed)
            util.sanitizeResult(result)
            Object.assign(result, {
              action: constants.WORKER_ACTION.RELICS,
              done: true,
              nonce: ctx.nonce,
            })
            this.postMessage(result)
          } catch (err) {
            if (errors.isError(err)) {
              this.postMessage({
                action: constants.WORKER_ACTION.RELICS,
                error: true,
              })
            } else {
              this.postMessage({
                action: constants.WORKER_ACTION.RELICS,
                error: err,
              })
            }
          }
        }
        break
      }
      case constants.WORKER_ACTION.ITEMS: {
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
      case constants.WORKER_ACTION.FINALIZE: {
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
