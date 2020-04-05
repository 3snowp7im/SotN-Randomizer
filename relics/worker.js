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
const getMapping = self.sotnRando.randomizeRelics.getMapping

self.addEventListener('message', function(message) {
  const data = message.data
  const options = util.Preset.options(util.optionsFromString(data.options))
  let result
  try {
    // Get random relic placement.
    result = getMapping(options)
    // Clean up the relics so they can be serialized.
    Object.getOwnPropertyNames(result.mapping).forEach(function(location) {
      const relic = result.mapping[location]
      delete relic.replaceWithItem
      delete relic.replaceWithRelic
    })
    result.relics = result.relics.map(function(relic) {
      return Object.assign({}, relic, {
        replaceWithItem: undefined,
        replaceWithRelic: undefined,
      })
    })
    result.locations = result.locations.map(function(location) {
      return Object.assign({}, location, {
        replaceWithItem: undefined,
        replaceWithRelic: undefined,
      })
    })
    result.id = message.data.id
  } catch (err) {
    result = {error: err}
  }
  self.postMessage(result)
})
