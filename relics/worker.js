importScripts(
  '/constants.js',
  '/errors.js',
  '/extension.js',
  '/items.js',
  '/relics.js',
  '/util.js',
  '/presets/casual.js',
  '/presets/safe.js',
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
  // Get random relic placement.
  randomizeRelics(rng, options).then(function(result) {
    // Clean up the relics so they can be serialized.
    util.sanitizeResult(result)
    result.id = message.data.id
    self.postMessage(result)
  }).catch(function(err) {
    self.postMessage({error: err})
  })
})
