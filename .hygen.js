module.exports = {
  helpers: {
    preset: function preset(name) {
      return JSON.stringify(require('./presets/' + name))
    },
  },
}
