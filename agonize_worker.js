const child_process = require('child_process')
const crypto = require('crypto')
const worker_threads = require('worker_threads')

const options = worker_threads.workerData

const flightRequired = '(' + [
  'Ghost Card',
  'Power of Mist',
  'Fire of Bat',
  'Echo of Bat',
].join('|') + ')'

const vladRelics = '(' + [
  'Eye',
  'Heart',
  'Rib',
  'Ring',
  'Tooth',
].join('|') + ') of Vlad'

let seed
let agony
let output
do {
  seed = crypto.randomBytes(13).toString('base64').replace(/=+$/, '')
  if (seed.match(/[+\-\/]/)) {
    continue
  }
  output = child_process.execFileSync('./randomize', [
    '-lvvvs',
    seed,
  ]).toString()
  agony = true
  agony = agony && output.match('Jewel of Open at Jewel of Open')
  agony = agony && output.match('Leap Stone at Merman Statue')
  agony = agony && output.match('Form of Mist at Demon Card')
  agony = agony && output.match('Soul of Bat at Power of Wolf')
  agony = agony && output.match('Echo of Bat at ' + flightRequired)
  agony = agony && output.match('Gravity Boots at Force of Echo')
  agony = agony && output.match(vladRelics + ' at Tooth of Vlad')
  agony = agony && output.match('Soul of Wolf at ' + vladRelics)
  agony = agony && output.match('Cube of Zoe at ' + vladRelics)
  if (options.earlyMerman) {
    if (agony && output.match('Merman Statue at Leap Stone')) {
      agony = agony && output.match('Power of Mist at Holy Symbol')
      agony = agony && output.match(vladRelics + ' at Gas Cloud')
    } else {
      agony = false
    }
  } else {
    if (agony && output.match('Merman Statue at Gas Cloud')) {
      agony = agony && output.match('Power of Mist at Form of Mist')
      agony = agony && output.match(vladRelics + ' at Holy Symbol')
    } else {
      agony = false
    }
  }
} while (!agony)

worker_threads.parentPort.postMessage(seed)
