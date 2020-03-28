const totals = {}
const searchParams = new URLSearchParams(window.location.search)
const runs = searchParams.get('runs') || 10
const defaultOptions = window.sotnRando.constants.defaultOptions
const optionsStr = searchParams.get('options') || defaultOptions
const optionsObj = window.sotnRando.util.optionsFromString(optionsStr)
const options = window.sotnRando.util.Preset.options(optionsObj)
for (let i = 0; i < runs; i++) {
  const result = window.sotnRando.randomizeRelics.getMapping(options)
  Object.getOwnPropertyNames(result.mapping).forEach(function(ability) {
    const location = result.mapping[ability]
    if (!totals[location.name]) {
      totals[location.name] = {}
    }
    if (!totals[location.name][ability]) {
      totals[location.name][ability] = 0
    }
    totals[location.name][ability]++
  })
}

const content = document.getElementById('content')
const newDiv = function() {
  return document.createElement('div')
}
const row = newDiv()
row.className = 'row'

row.appendChild(newDiv())
relics.forEach(function(relic) {
  const cell = newDiv()
  cell.textContent = relic.name
  cell.className = 'col-header'
  row.appendChild(cell)
})
content.appendChild(row)

const getClassname = function(count) {
  if (count === 0) {
    return 'zero'
  }
  if (count <= runs / relics.length) {
    return 'below-average'
  }
  if (count <= 1.5 * runs / relics.length) {
    return 'average'
  }
  if (count <= 3 * runs / relics.length) {
    return 'above-average'
  }
  return 'a-lot'
}

relics.forEach(function(relic) {
  const locRow = newDiv()
  locRow.className = 'row'
  const loc = newDiv()
  loc.className = 'row-header'
  loc.textContent = relic.name
  locRow.appendChild(loc)
  relics.forEach(function(r) {
    const count = newDiv()
    const amount = totals[relic.name][r.name] || 0
    count.textContent = amount
    count.className = getClassname(amount)
    locRow.appendChild(count)
  })
  content.appendChild(locRow)
})
