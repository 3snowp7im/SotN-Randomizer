function randomizeWorker() {
  self.addEventListener('message', function(message) {
    importScripts('https://cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.1/seedrandom.min.js')
    importScripts('https://cdnjs.cloudflare.com/ajax/libs/sjcl/1.0.8/sjcl.min.js')
    const url = message.data.url
    importScripts(
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
      url + "presets/glitch.js",
      url + "presets/glitch-hard.js",
      url + "randomize_items.js",
      url + "randomize_relics.js",
      url + "ecc-edc-recalc-js.js",
    )
    const randomizeRelics = self.sotnRando.randomizeRelics
    const randomizeItems = self.sotnRando.randomizeItems
    try {
      const data = message.data
      const fileData = data.fileData
      const array = new Uint8Array(fileData)
      const check = new self.sotnRando.util.checked(array)
      Math.seedrandom(self.sotnRando.util.saltSeed(
        data.version,
        data.options,
        data.seed,
      ))
      const options = self.sotnRando.util.Preset.options(data.options)
      const planned = randomizeItems.placePlannedItems(options)
      randomizeRelics.randomizeRelics(check, options, planned, data.info)
      randomizeItems.randomizeItems(check, options, planned, data.info)
      self.sotnRando.util.setSeedText(check, data.seed)
      const checksum = check.sum()
      if (data.checksum && data.checksum !== checksum) {
        throw new self.sotnRando.errors.VersionError()
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
}

if (typeof(window) === 'undefined' || window !== self) {
  randomizeWorker()
}
