(function() {
  let isNode
  try {
    isNode = !!module
  } catch (e) {}

  const baseUrl = 'https://3snowp7im.github.io/sotnrando'
  const defaultOptions = 'eiprt'

  let version
  let sjcl

  let info
  let lastSeed
  let checksum
  let expectChecksum
  let haveChecksum

  let downloadReady
  let selectedFile

  const MAX_VERBOSITY = 5

  function optionsFromString(randomize) {
    const options = {}
    for (let i = 0; i < (randomize || '').length; i++) {
      switch (randomize[i]) {
      case 'e':
        options.startingEquipment = true
        break
      case 'i':
        options.itemLocations = true
        break
      case 'p':
        options.prologueRewards = true
        break;
      case 'r':
        options.relicLocations = true
        break
      case 't':
        options.turkeyMode = true
        break
      default:
        throw new Error('Invalid randomization: ' + randomize[i])
      }
    }
    return options
  }

  function optionsToString(options) {
    let randomize = ''
    if (options.startingEquipment) {
      randomize += 'e'
    }
    if (options.itemLocations) {
      randomize += 'i'
    }
    if (options.prologueRewards) {
      randomize += 'p'
    }
    if (options.relicLocations) {
      randomize += 'r'
    }
    if (options.turkeyMode) {
      randomize += 't'
    }
    return randomize
  }

  function optionsFromUrl(url) {
    url = new URL(url)
    const args = url.search.slice(1).split(',')
    let options
    let checksum
    let seed
    if (args.length === 3) {
      options = optionsFromString(shift)
    } else {
      options = optionsFromString(defaultOptions)
      if (args.length == 2) {
        checksum = parseInt(args.shift(), 16)
        seed = decodeURIComponent(args.shift())
      }
    }
    return {
      options: options,
      checksum: checksum,
      seed: seed,
    }
  }

  function optionsToUrl(options, checksum, seed, baseUrl) {
    options = optionsToString(options)
    if (baseUrl[baseUrl.length - 1] === '/') {
      baseUrl = baseUrl.slice(0, baseUrl.length - 1)
    }
    const args = []
    if (options !== defaultOptions) {
      args.push(options)
    }
    args.push(checksum.toString(16))
    args.push(encodeURIComponent(seed))
    return baseUrl + '?' + args.join(',')
  }

  function saltSeed(options, seed) {
    return sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(JSON.stringify({
      version: version,
      options: optionsToString(options),
      seed: seed,
    }))).match(/[0-9a-f]{2}/g).map(function(byte) {
      return String.fromCharCode(byte)
    }).join('')
  }

  function newInfo() {
    return Array(MAX_VERBOSITY + 1).fill(null).map(function() {
      return {}
    })
  }

  function disableDownload() {
    downloadReady = false
    delete elems.download.download
    delete elems.download.href
  }

  function hideLoader() {
    elems.loader.style.visibility = 'hidden'
  }

  function showLoader() {
    elems.loader.style.visibility = 'visible'
  }

  function resetState() {
    selectedFile = undefined
    resetTarget()
    elems.randomize.disabled = true
    disableDownload()
    hideLoader()
  }

  function resetTarget() {
    if (selectedFile) {
      elems.target.className = 'active'
      elems.target.innerHTML = 'Ready to randomize'
      elems.randomize.disabled = false
    } else {
      elems.target.className = ''
      elems.target.innerHTML = 'Drop .bin file here'
    }      
  }

  function resetCopy() {
    if (elems.seed.value.length || (lastSeed && lastSeed.length)) {
      elems.copy.disabled = false
    } else {
      elems.copy.disabled = true
    }
  }

  function seedChangeHandler() {
    disableDownload()
    elems.copy.disabled = true
    haveChecksum = false
  }

  function spoilersChangeHandler() {
    if (!elems.showSpoilers.checked) {
      elems.spoilers.style.visibility = 'hidden'
      elems.showRelics.checked = false
      elems.showRelics.disabled = true
    } else {
      showSpoilers()
      elems.showRelics.disabled = false
    }
  }

  function showRelicsChangeHandler() {
    showSpoilers()
  }

  function dragLeaveListener(event) {
    elems.target.className = ''
  }

  function dragOverListener(event) {
    event.preventDefault()
    event.stopPropagation()
    event.dataTransfer.dropEffect = 'copy'
    elems.target.className = 'active'
  }

  function dropListener(event) {
    event.preventDefault()
    event.stopPropagation()
    resetState()
    if (event.dataTransfer.items) {
      for (let i = 0; i < event.dataTransfer.items.length; i++) {
        const item = event.dataTransfer.items[i]
        if (item.kind === 'file') {
          const file = item.getAsFile()
          selectedFile = file
        }
      }
    } else {
      for (let i = 0; i < event.dataTransfer.files.length; i++) {
        const file = event.dataTransfer.files[i]
        selectedFile = file
      }
    }
    resetTarget()
  }

  function randomizedFilename(filename, seed) {
    const lastPeriodIdx = filename.lastIndexOf('.')
    const insertIdx = lastPeriodIdx === -1 ? filename.length : lastPeriodIdx
    return [
      filename.slice(0, insertIdx),
      ' (' + seed + ')',
      filename.slice(insertIdx),
    ].join('')
  }

  function getFormOptions() {
    return {
      relicLocations: elems.relicLocations.checked,
      startingEquipment: elems.startingEquipment.checked,
      prologueRewards: elems.prologueRewards.checked,
      itemLocations: elems.itemLocations.checked,
      turkeyMode: elems.turkeyMode.checked,
    }
  }

  function submitListener(event) {
    event.preventDefault()
    event.stopPropagation()
    disableDownload()
    showLoader()
    info = newInfo()
    const options = getFormOptions()
    let seed = (new Date()).getTime().toString()
    if (elems.seed.value.length) {
      seed = elems.seed.value
    }
    lastSeed = seed
    Math.seedrandom(saltSeed(options, seed))
    info[1]['Seed'] = seed
    const reader = new FileReader()
    reader.addEventListener('load', function() {
      try {
        const data = reader.result
        const array = new Uint8Array(data)
        const check = new window.sotnRandoUtils.checked(array)
        window.sotnRandoItems.randomizeItems(check, options, info)
        window.sotnRandoRelics.randomizeRelics(check, options, info)
        setSeedText(check, seed)
        checksum = check.sum()
        if (haveChecksum && expectChecksum !== checksum) {
          elems.target.className = 'error'
          elems.target.innerHTML =
            'Seed generated by a different version of the randomizer.'
          return
        }
        showSpoilers()
        // Recalc edc
        eccEdcCalc(array)
        const url = URL.createObjectURL(new Blob([ data ], {
          type: 'application/octet-binary'
        }))
        elems.download.download = randomizedFilename(
          selectedFile.name,
          seed,
        )
        elems.download.href = url
        elems.download.click()
        URL.revokeObjectURL(url)
        resetCopy()
      } catch (e) {
        elems.target.className = 'error'
        elems.target.innerHTML = 'Error'
        throw e
      }
    }, false)
    const file = reader.readAsArrayBuffer(selectedFile)
  }

  function copyHandler(event) {
    event.preventDefault()
    event.stopPropagation()
    elems.seed.value = elems.seed.value || lastSeed || ''
    const url = optionsToUrl(
      getFormOptions(),
      checksum,
      elems.seed.value,
      window.location.href,
    )
    elems.seedUrl.className = ''
    elems.seedUrl.value = url.toString()
    elems.seedUrl.select()
    document.execCommand('copy')
    elems.notification.className = 'success'
    setTimeout(function() {
      elems.notification.className = 'success hide'
    }, 250)
  }

  function formatInfo(info, verbosity) {
    if (!info) {
      return ''
    }
    const props = []
    for (let level = 0; level <= verbosity; level++) {
      Object.getOwnPropertyNames(info[level]).forEach(function(prop) {
        if (props.indexOf(prop) === -1) {
          props.push(prop)
        }
      })
    }
    const lines = []
    props.forEach(function(prop) {
      for (let level = 0; level <= verbosity; level++) {
        if (info[level][prop]) {
          let text = prop + ':'
          if (Array.isArray(info[level][prop])) {
            text += '\n' + info[level][prop].map(function(item) {
              return '  ' + item
            }).join('\n')
          } else {
            text += ' ' + info[level][prop]
          }
          lines.push(text)
        }
      }
    })
    return lines.join('\n')
  }

  function showSpoilers() {
    let verbosity = 2
    if (elems.showRelics.checked) {
      verbosity++
    }
    elems.spoilers.value = formatInfo(info, verbosity)
    if (elems.showSpoilers.checked && elems.spoilers.value.match(/[^\s]/)) {
      elems.spoilers.style.visibility = 'visible'
    }
  }

  function setSeedText(data, seed) {
    const map = {
      ',': 0x8143,
      '.': 0x8144,
      ':': 0x8146,
      ';': 0x8147,
      '?': 0x8148,
      '!': 0x8149,
      '`': 0x814d,
      '"': 0x814e,
      '^': 0x814f,
      '_': 0x8151,
      '~': 0x8160,
      '\'': 0x8166,
      '(': 0x8169,
      ')': 0x816a,
      '[': 0x816d,
      ']': 0x816e,
      '{': 0x816f,
      '}': 0x8170,
      '+': 0x817b,
      '-': 0x817c,
      '0': 0x824f,
      '1': 0x8250,
      '2': 0x8251,
      '3': 0x8252,
      '4': 0x8253,
      '5': 0x8254,
      '6': 0x8255,
      '7': 0x8256,
      '8': 0x8257,
      '9': 0x8258,
    }
    const addresses = [{
      start: 0x04389bf8,
      length: 31,
    }, {
      start: 0x04389c6c,
      length: 52,
    }]
    const maxSeedLength = 31
    addresses.forEach(function(address) {
      let a = 0
      let s = 0
      while (a < address.length) {
        if (a < maxSeedLength && s < seed.length) {
          if (seed[s] in map) {
            if ((a + 1) < maxSeedLength) {
              const val = map[seed[s++]]
              data.writeByte(address.start + a++, val >>> 8)
              data.writeByte(address.start + a++, val & 0xff)
            } else {
              s = seed.length
            }
          } else {
            data.writeByte(address.start + a++, seed.charCodeAt(s++))
          }
        } else {
          data.writeByte(addresses.start + a++, 0)
        }
      }
    })
  }

  const elems = {}

  if (isNode) {
    const fs = require('fs')
    const util = require('./utils')
    const items = require('./items')
    const relics = require('./relics')
    const eccEdcCalc = require('./ecc-edc-recalc-js')
    sjcl = require('sjcl')
    version = require('./package').version
    const yargs = require('yargs')
      .strict()
      .option('seed', {
        alias: 's',
        describe: 'Seed',
      })
      .option('randomize', {
        alias: 'r',
        describe: [
          'Specify randomizations:',
          '"e" for starting equipment',
          '"i" for item locations',
          '"p" for prologue rewards',
          '"r" for relic locations',
          '"t" for turkey mode',
        ].join('\n'),
      })
      .option('check-vanilla', {
        alias: 'c',
        describe: 'Check vanilla .bin file (does not modify image)',
        type: 'boolean',
      })
      .option('expect-checksum', {
        alias: 'e',
        describe: 'Verify randomization produces an expected checksum',
        type: 'string',
      })
      .option('url', {
        alias: 'u',
        description: 'Print seed url',
        type: 'boolean',
      })
      .option('verbose', {
        alias: 'v',
        describe: 'Verbosity level',
        type: 'count',
      })
      .option('live', {
        alias: 'l',
        describe: 'Print starting equipment and use url mode (same as -uvv)',
        type: 'boolean',
      })
      .help()
    const argv = yargs.argv
    let options
    let seed
    let expectChecksum
    let haveChecksum
    // Check for seed string.
    if ('seed' in argv) {
      seed = argv.seed.toString()
    }
    // Check for expected checksum.
    if ('expectChecksum' in argv) {
      if (!argv.expectChecksum.match(/^[0-9a-f]{1,3}$/)) {
        yargs.showHelp()
        console.error('\nInvalid checksum string')
        process.exit(1)
      }
      expectChecksum = parseInt(argv.expectChecksum, 16)
      haveChecksum = true
    }
    // Check for randomization string.
    if ('randomize' in argv) {
      try {
        options = optionsFromString(argv.randomize)
      } catch (e) {
        yargs.showHelp()
        console.error('\n' + e.message)
        process.exit(1)
      }
    }
    // Check for seed url.
    if (argv._[1]) {
      try {
        const url = optionsFromUrl(argv._[1])
        options = url.options
        seed = url.seed
        expectChecksum = url.checksum
        haveChecksum = true
      } catch (e) {
        yargs.showHelp()
        console.error('\nInvalid url')
        process.exit(1)
      }
      if (seed === null) {
        yargs.showHelp()
        console.error('\nUrl does not contain seed')
        process.exit(1)
      }
      // Ensure seeds match if given using --seed.
      if ('seed' in argv && argv.seed.toString() !== seed) {
        yargs.showHelp()
        console.error('\nArgument seed is not url seed')
        process.exit(1)
      }
      // Ensure randomizations match if given using --randomize.
      if ('randomize' in argv && argv.randomize !== optionsToString(options)) {
        yargs.showHelp()
        console.error('\nArgument randomizations are not url randomizations')
        process.exit(1)
      }
      // Ensure checksum match if given using --expect-checksum.
      if ('expectChecksum' in argv && argv.expectCheckSum != expectChecksum) {
        yargs.showHelp()
        console.error('\nArgument checksum is not url checksum')
        process.exit(1)
      }
    }
    // Set options for --generate-race.
    if (argv.live) {
      argv.url = true
      argv.verbose = 2
    }
    // Create default options if none provided.
    if (typeof(seed) === 'undefined') {
      seed = (new Date()).getTime().toString()
    }
    if (!options) {
      options = optionsFromString(defaultOptions)
    }
    // Set misc options.
    options.checkVanilla = argv.checkVanilla
    options.verbose = argv.verbose
    info = newInfo()
    // Set seed if not running a sanity check.
    if (!argv.checkVanilla) {
      require('seedrandom')(saltSeed(options, seed), {global: true})
      // Add seed to log info if not provided through arg or url.
      if (!argv._[1] && !('seed' in argv) && !argv.url) {
        info[1]['Seed'] = seed
      }
    }
    const data = fs.readFileSync(argv._[0])
    const check = new util.checked(data)
    let returnVal = true
    returnVal = items.randomizeItems(check, options, info) && returnVal
    returnVal = relics.randomizeRelics(check, options, info) && returnVal
    setSeedText(check, seed)
    const checksum = check.sum()
    // Verify expected checksum matches actual checksum.
    if (haveChecksum && expectChecksum !== checksum) {
      console.error('Checksum mismatch.')
      process.exit(1)
    }
    // Show url if not provided as arg.
    if (argv.url && !argv._[1]) {
      console.log(optionsToUrl(options, checksum, seed, baseUrl).toString())
    }
    if (argv.verbose >= 1) {
      const text = formatInfo(info, argv.verbose)
      if (text.length) {
        console.log(text)
      }
    }
    if (argv.checkVanilla) {
      process.exit(returnVal ? 0 : 1)
    }
    eccEdcCalc(data)
    fs.writeFileSync(argv._[0], data)
  } else {
    const body = document.getElementsByTagName('body')[0]
    body.addEventListener('dragover', dragOverListener, false)
    body.addEventListener('dragleave', dragLeaveListener, false)
    body.addEventListener('drop', dropListener, false)
    elems.target = document.getElementById('target')
    elems.form = document.getElementById('form')
    form.addEventListener('submit', submitListener, false)
    elems.randomize = document.getElementById('randomize')
    elems.seed = document.getElementById('seed')
    elems.seed.addEventListener('change', seedChangeHandler, false)
    elems.relicLocations = document.getElementById('relic-locations')
    elems.startingEquipment = document.getElementById('starting-equipment')
    elems.itemLocations = document.getElementById('item-locations')
    elems.prologueRewards = document.getElementById('prologue-rewards')
    elems.turkeyMode = document.getElementById('turkey-mode')
    elems.showSpoilers = document.getElementById('show-spoilers')
    elems.showSpoilers.addEventListener('change', spoilersChangeHandler, false)
    elems.showRelics = document.getElementById('show-relics')
    elems.showRelics.addEventListener('change', showRelicsChangeHandler, false)
    elems.spoilers = document.getElementById('spoilers')
    elems.download = document.getElementById('download')
    elems.loader = document.getElementById('loader')
    resetState()
    elems.copy = document.getElementById('copy')
    elems.copy.addEventListener('click', copyHandler, false)
    elems.notification = document.getElementById('notification')
    elems.seedUrl = document.getElementById('seed-url')
    sjcl = window.sjcl
    const url = new URL(window.location.href)
    if (url.protocol !== 'file:') {
      fetch(new Request('package.json')).then(function(response) {
        if (response.ok) {
          response.json().then(function(json) {
            version = json.version
            document.getElementById('version').innerHTML = version
          })
        }
      }).catch(function(){})
    }
    let options
    let seed
    const rs = optionsFromUrl(window.location.href)
    options = rs.options
    seed = rs.seed
    expectChecksum = rs.checksum
    if (!options.startingEquipment) {
      elems.startingEquipment.checked = false
    }
    if (!options.itemLocations) {
      elems.itemLocations.checked = false
    }
    if (!options.prologueRewards) {
      elems.prologueRewards.checked = false
    }
    if (!options.relicLocations) {
      elems.relicLocations.checked = false
    }
    if (!options.turkeyMode) {
      elems.turkeyMode.checked = false
    }
    if (typeof(seed) === 'string') {
      elems.seed.value = seed
      seedChangeHandler()
      haveChecksum = true
    }
    window.history.replaceState({}, document.title, url.origin + url.pathname)
    let path = url.pathname
    if (path.match(/index\.html$/)) {
      path = path.slice(0, path.length - 10)
    }
    if (url.hostname === 'localhost' || url.protocol === 'file:'
        || path.match(/-dev\/?$/)) {
      document.getElementById('dev-border').className = 'dev'
    }
  }
})()
