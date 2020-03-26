function randomizeWorker() {
  self.addEventListener('message', function(message) {
    importScripts('https://cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.1/seedrandom.min.js')
    importScripts('https://cdnjs.cloudflare.com/ajax/libs/sjcl/1.0.8/sjcl.min.js')
    const url = message.data.url
    importScripts(url + "constants.js")
    importScripts(url + 'enemies.js')
    importScripts(url + 'errors.js')
    importScripts(url + "extension.js")
    importScripts(url + "items.js")
    importScripts(url + "relics.js")
    importScripts(url + "util.js")
    importScripts(url + "presets/casual.js")
    importScripts(url + "presets/safe.js")
    importScripts(url + "presets/glitch.js")
    importScripts(url + "presets/glitch-hard.js")
    importScripts(url + "randomize_items.js")
    importScripts(url + "randomize_relics.js")
    importScripts(url + "ecc-edc-recalc-js.js")
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
      self.sotnRando.randomizeRelics(check, options, data.info)
      self.sotnRando.randomizeItems(check, options, data.info)
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
