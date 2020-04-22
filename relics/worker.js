importScripts(
  '/constants.js',
  '/errors.js',
  '/extension.js',
  '/items.js',
  '/relics.js',
  '/util.js',
  '/build/presets/casual.js',
  '/build/presets/safe.js',
  '/randomize_relics.js',
)

const util = self.sotnRando.util
const randomizeRelics = self.sotnRando.randomizeRelics.randomizeRelics

function rng() {
  return Math.random()
}

self.addEventListener('message', function(message) {
  const data = message.data
  const options = util.Preset.options(util.optionsFromString(data.options))
  while (true) {
    try {
      // Get random relic placement.
      const result = randomizeRelics(rng, options)
      // Clean up the relics so they can be serialized.
      util.sanitizeResult(result)
      result.id = message.data.id
      self.postMessage(result)
      break
    } catch (err) {
      if (!self.sotnRando.errors.isError(err)) {
        self.postMessage({error: err})
      }
      continue
    }
  }
})
