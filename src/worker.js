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
      url + "src/constants.js",
      url + 'src/enemies.js',
      url + 'src/errors.js',
      url + "src/extension.js",
      url + "src/items.js",
      url + "src/relics.js",
      url + "src/util.js",
      url + "build/presets/casual.js",
      url + "build/presets/safe.js",
      url + "build/presets/adventure.js",
      url + "build/presets/speedrun.js",
      url + "build/presets/glitch.js",
      url + "build/presets/scavenger.js",
      url + "build/presets/empty-hand.js",
      url + "src/randomize_items.js",
      url + "src/randomize_relics.js",
      url + "src/ecc-edc-recalc-js.js",
    )
    constants = self.sotnRando.constants
    eccEdcCalc = self.eccEdcCalc
    errors = self.sotnRando.errors
    randomizeRelics = self.sotnRando.randomizeRelics.randomizeRelics
    randomizeItems = self.sotnRando.randomizeItems
    seedrandom = Math.seedrandom
    util = self.sotnRando.util
  }

  function loadNode() {
    constants = require('./constants')
    eccEdcCalc = require('./ecc-edc-recalc-js')
    errors = require('./errors')
    randomizeRelics = require('./randomize_relics').randomizeRelics
    randomizeItems = require('./randomize_items')
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
    if (typeof(module) === 'undefined') {
      message = message.data
    }
    if (typeof(message) === 'string') {
      message = JSON.parse(message)
    }
    if (!('action' in message)) {
      if (typeof(module) === 'undefined') {
        loadBrowser(message.url)
      } else {
        loadNode()
      }
      ctx.loaded = true
    } else {
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
                options: message.applied,
                newNames: message.newNames,
              })
            }
            let nonce = message.nonce
            for (let i = 0; message.rounds === 0 || i < message.rounds; i++) {
              const rng = getRng(Object.assign({}, ctx.salt, {
                nonce: nonce + i,
              }))
              try {
                const result = randomizeRelics(
                  rng,
                  ctx.options,
                  ctx.newNames,
                )
                util.sanitizeResult(result)
                Object.assign(result, {
                  action: constants.WORKER_ACTION.RELICS,
                  done: true,
                  nonce: nonce + i,
                })
                result.seed = message.seed
                result.options = message.options
                this.postMessage(JSON.stringify(result))
                break
              } catch (err) {
                if (!errors.isError(err)) {
                  this.postMessage(JSON.stringify({
                    action: constants.WORKER_ACTION.RELICS,
                    error: {
                      name: err.name,
                      message: err.message,
                      stack: err.stack,
                    }
                  }))
                } else if (i === message.rounds - 1) {
                  this.postMessage(JSON.stringify({
                    action: constants.WORKER_ACTION.RELICS,
                    error: true,
                  }))
                  break
                }
              }
            }
          }
          break
        }
        case constants.WORKER_ACTION.ITEMS: {
          const rng = getRng(message)
          ctx.options = ctx.options || message.applied
          const result = randomizeItems(
            rng,
            message.items,
            message.newNames,
            ctx.options,
          )
          result.seed = message.seed
          result.options = message.options
          result.action = 'items'
          this.postMessage(result)
          if ('unref' in this) {
            this.unref()
          }
          break
        }
        case constants.WORKER_ACTION.FINALIZE: {
          let output
          let checksum
          let objects
          if (message.file) {
            const array = new Uint8Array(message.file)
            const check = new util.checked(array)
            check.apply(message.data)
            util.setSeedText(
              check,
              message.seed,
              message.preset,
              message.tournament,
            )
            checksum = check.sum()
            if (message.checksum && message.checksum !== checksum) {
              throw new errors.VersionError()
            }
            eccEdcCalc(array, array.length, true)
            output = message.file
            objects = [output]
          } else {
            const check = new util.checked()
            check.apply(message.data)
            checksum = check.sum()
            if (message.checksum && message.checksum !== checksum) {
              throw new errors.VersionError()
            }
            output = check.toPatch(
              message.seed,
              message.preset,
              message.tournament,
            )
          }
          this.postMessage({
            action: 'finalize',
            file: output,
            checksum: checksum,
          }, objects)
          break
        }}
      } catch (err) {
        this.postMessage({error: err})
      }
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
