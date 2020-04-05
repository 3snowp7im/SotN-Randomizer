const searchParams = new URLSearchParams(window.location.search)
const runs = parseInt(searchParams.get('runs'), 10) || 1000
const defaultOptions = window.sotnRando.constants.defaultOptions
const options = searchParams.get('options') || defaultOptions
const threads = window.navigator.hardwareConcurrency
let locations
let relics

const totals = {}
let completed = 0
let running = 0

const progress = document.getElementById('progress')

function handleMessage(message) {
  const result = message.data
  if (completed === 0) {
    relics = result.relics
    locations = result.locations
  }
  running--
  completed++
  progress.style.width = (100 * (completed / runs)) + '%'
  if (result.error) {
    throw result.error
  }
  Object.getOwnPropertyNames(result.mapping).forEach(function(ability) {
    const location = result.mapping[ability]
    const locationId = location.ability || location.name
    totals[locationId] = totals[locationId] || {}
    totals[locationId][ability] = totals[locationId][ability] || 0
    totals[locationId][ability]++
  })
  if (completed + running < runs) {
    running++
    this.postMessage({options: options})
  } else if (completed === runs) {
    render()
  }
}

let pool
if (runs > threads) {
  pool = threads
} else {
  pool = runs
}

for (let i = 0; i < pool; i++) {
  running++
  const worker = new Worker('/relics/worker.js')
  worker.addEventListener('message', handleMessage)
  worker.postMessage({options: options})
}

function render() {
  document.getElementById('meter').classList.add('hidden')
  const content = document.getElementById('content')
  const row = document.createElement('div')
  row.className = 'row'

  const empty = document.createElement('div')
  empty.className = 'empty'
  row.appendChild(empty)

  relics.forEach(function(relic) {
    const cell = document.createElement('div')
    cell.textContent = relic.name
    cell.className = 'col-header'
    row.appendChild(cell)
  })
  content.appendChild(row)

  locations.forEach(function(location) {
    const locationId = location.ability || location.name
    const locRow = document.createElement('div')
    locRow.className = 'row'
    const loc = document.createElement('div')
    loc.className = 'row-header'
    loc.textContent = location.name
    locRow.appendChild(loc)
    relics.forEach(function(r) {
      const count = document.createElement('div')
      const amount = (totals[locationId] || {})[r.ability] || 0
      count.textContent = amount
      count.className = getClassname(amount)
      locRow.appendChild(count)
    })
    content.appendChild(locRow)
  })
}

function getClassname(count) {
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
