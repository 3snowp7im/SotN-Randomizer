importScripts('https://cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.1/seedrandom.min.js')
importScripts('https://cdnjs.cloudflare.com/ajax/libs/sjcl/1.0.8/sjcl.min.js')
importScripts("constants.js")
importScripts('enemies.js')
importScripts('errors.js')
importScripts("extension.js")
importScripts("items.js")
importScripts("relics.js")
importScripts("util.js")
importScripts("presets/casual.js")
importScripts("presets/safe.js")
importScripts("presets/agonize.js")
importScripts("presets/optimize.js")
importScripts("presets/glitch.js")
importScripts("presets/glitch-hard.js")
importScripts("randomize_items.js")
importScripts("randomize_relics.js")
importScripts("ecc-edc-recalc-js/index.js")

self.addEventListener('message', function(message) {
  try {
    const data = message.data
    const fileData = data.fileData
    const array = new Uint8Array(fileData)
    const check = new sotnRando.util.checked(array)
    Math.seedrandom(sotnRando.util.saltSeed(
      data.version,
      data.options,
      data.seed,
    ))
    const options = self.sotnRando.util.Preset.options(data.options)
    sotnRando.randomizeRelics(check, options, data.info)
    sotnRando.randomizeItems(check, options, data.info)
    sotnRando.util.setSeedText(check, data.seed)
    const checksum = check.sum()
    if (data.checksum && data.checksum !== checksum) {
      throw new errors.VersionError()
    }
    eccEdcCalc(array, array.length)
    self.postMessage({
      seed: data.seed,
      data: fileData,
      checksum: checksum,
      info: data.info,
    }, [fileData])
  } catch (e) {
    self.postMessage({error: e.message})
    console.error(e)
  }
})
