(function(window) {
  const baseUrl = 'https://sotn.io'

  let version
  let constants
  let util

  let info
  let lastSeed
  let checksum
  let expectChecksum
  let haveChecksum

  let downloadReady
  let selectedFile

  const MAX_VERBOSITY = 5

  let worker
  if (window) {
    worker = new Worker('worker.js')
    worker.addEventListener('message', workerMessage);
    constants = sotnRando.constants
    util = sotnRando.util
  } else {
    version = require('./package').version
    constants = require('./constants')
    util = require('./util')
  }

  function loadOption(name, changeHandler, defaultValue) {
    const value = localStorage.getItem(name)
    if (typeof(value) === 'string') {
      elems[name].checked = value === 'true'
    } else {
      elems[name].checked = defaultValue
    }
    changeHandler()
  }

  function optionsToUrl(options, checksum, seed, baseUrl) {
    options = util.optionsToString(options)
    if (baseUrl[baseUrl.length - 1] === '/') {
      baseUrl = baseUrl.slice(0, baseUrl.length - 1)
    }
    const args = []
    if (options !== constants.defaultOptions) {
      args.push(options)
    }
    args.push(checksum.toString(16))
    args.push(encodeURIComponent(seed))
    return baseUrl + '?' + args.join(',')
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

  function resetTarget(showFileName) {
    if (selectedFile) {
      let status = 'Ready to randomize'
      if (showFileName) {
        status += ' ' + selectedFile.name
      }
      elems.target.classList.add('active')
      elems.status.innerHTML = status
      elems.randomize.disabled = false
    } else {
      elems.target.classList.remove('active')
      elems.status.innerHTML = 'Drop .bin file here or'
    }      
  }

  function resetCopy() {
    if (elems.seed.value.length || (lastSeed && lastSeed.length)) {
      elems.copy.disabled = false
    } else {
      elems.copy.disabled = true
    }
  }

  function seedChange() {
    disableDownload()
    elems.copy.disabled = true
    haveChecksum = false
  }

  function startingEquipmentChange() {
    localStorage.setItem('startingEquipment', elems.startingEquipment.checked)
  }

  function itemLocationsChange() {
    localStorage.setItem('itemLocations', elems.itemLocations.checked)
  }

  function enemyDropsChange() {
    localStorage.setItem('enemyDrops', elems.enemyDrops.checked)
  }

  function prologueRewardsChange() {
    localStorage.setItem('prologueRewards', elems.prologueRewards.checked)
  }

  function relicLocationsChange() {
    localStorage.setItem('relicLocations', elems.relicLocations.checked)
  }

  function turkeyModeChange() {
    localStorage.setItem('turkeyMode', elems.turkeyMode.checked)
  }

  function appendSeedChange() {
    localStorage.setItem('appendSeed', elems.appendSeed.checked)
  }

  function fileChange(event) {
    if (elems.file.files[0]) {
      resetState()
      selectedFile = elems.file.files[0]
      resetTarget()
    }
  }

  function spoilersChange() {
    if (!elems.showSpoilers.checked) {
      elems.spoilers.style.visibility = 'hidden'
      elems.showRelics.checked = false
      elems.showRelics.disabled = true
    } else {
      showSpoilers()
      elems.showRelics.disabled = false
    }
    localStorage.setItem('showSpoilers', elems.showSpoilers.checked)
  }

  function showRelicsChange() {
    showSpoilers()
    localStorage.setItem('showRelics', elems.showRelics.checked)
  }

  function dragLeaveListener(event) {
    elems.target.classList.remove('active')
  }

  function dragOverListener(event) {
    event.preventDefault()
    event.stopPropagation()
    event.dataTransfer.dropEffect = 'copy'
    elems.target.classList.add('active')
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
    resetTarget(true)
    elems.file.style.display = 'none'
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
      enemyDrops: elems.enemyDrops.checked,
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
    info[1]['Seed'] = seed
    worker.postMessage({
      version: version,
      file: selectedFile,
      checksum: expectChecksum,
      options: options,
      seed: seed,
      info: info,
    })
  }

  function workerMessage(message) {
    const data = message.data
    if (data.error) {
      elems.target.classList.remove('active')
      elems.target.classList.add('error')
      elems.status.innerHTML = data.error
      return
    }
    const seed = data.seed
    checksum = data.checksum
    info = data.info
    showSpoilers()
    const url = URL.createObjectURL(new Blob([data.data], {
      type: 'application/octet-binary',
    }))
    if (elems.appendSeed.checked) {
      elems.download.download = randomizedFilename(
        selectedFile.name,
        seed,
      )
    } else {
      elems.download.download = selectedFile.name
    }
    elems.download.href = url
    elems.download.click()
    URL.revokeObjectURL(url)
    resetCopy()
  }

  let animationDone = true

  function copyHandler(event) {
    event.preventDefault()
    event.stopPropagation()
    elems.seed.value = elems.seed.value || lastSeed || ''
    const url = util.optionsToUrl(
      getFormOptions(),
      checksum,
      elems.seed.value,
      window.location.href,
    )
    const textarea = document.createElement('textarea')
    textarea.textContent = url.toString()
    document.body.appendChild(textarea)
    const selection = document.getSelection()
    const range = document.createRange()
    range.selectNode(textarea)
    selection.removeAllRanges()
    selection.addRange(range)
    document.execCommand('copy')
    selection.removeAllRanges()
    document.body.removeChild(textarea)
    if (animationDone) {
      animationDone = false
      elems.notification.classList.add('success')
      elems.notification.classList.remove('hide')
      setTimeout(function() {
        elems.notification.classList.add('hide')
      }, 250)
      setTimeout(function() {
        elems.notification.classList.remove('success')
        animationDone = true
      }, 2250)
    }
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

  const elems = {}

  function main() {
    const fs = require('fs')
    const constants = require('./constants')
    const randomizeItems = require('./randomizeItems')
    const randomizeRelics = require('./randomizeRelics')
    const eccEdcCalc = require('./ecc-edc-recalc-js')
    const yargs = require('yargs')
      .strict()
      .option('bin', {
        alias: 'b',
        describe: 'Path to .bin file',
        type: 'string',
        requiresArg: true,
      })
      .option('seed', {
        alias: 's',
        describe: 'Seed',
        requiresArg: true,
      })
      .option('randomize', {
        alias: 'r',
        describe: [
          'Specify randomizations:',
          '"d" for enemy drops',
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
        requiresArg: true,
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
      .demandCommand(0, 1)
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
        options = util.optionsFromString(argv.randomize)
      } catch (e) {
        yargs.showHelp()
        console.error('\n' + e.message)
        process.exit(1)
      }
    }
    // Check for seed url.
    if (argv._[0]) {
      try {
        const url = util.optionsFromUrl(argv._[0])
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
      const optionStr = util.optionsToString(options)
      if ('randomize' in argv && argv.randomize !== optionsStr) {
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
      if (argv.verbose === 0) {
        argv.verbose = 2
      }
    }
    // Create default options if none provided.
    if (typeof(seed) === 'undefined') {
      seed = (new Date()).getTime().toString()
    }
    if (!options) {
      options = util.optionsFromString(constants.defaultOptions)
    }
    // Set misc options.
    options.checkVanilla = argv.checkVanilla
    options.verbose = argv.verbose
    info = newInfo()
    // Set seed if not running a sanity check.
    if (!argv.checkVanilla) {
      require('seedrandom')(util.saltSeed(
        version,
        options,
        seed,
      ), {global: true})
      // Add seed to log info if not provided through arg or url.
      if (!argv._[0] && !('seed' in argv) && !argv.url) {
        info[1]['Seed'] = seed
      }
    }
    let data
    // If checking a vanilla .bin file, the path to the file must be given.
    if (options.checkVanilla && !('bin' in argv)) {
      yargs.showHelp()
      console.error('\nDid not specify path to .bin file')
      process.exit(1)
    }
    if ('bin' in argv) {
      data = fs.readFileSync(argv.bin)
    }
    const check = new util.checked(data)
    let returnVal = true
    returnVal = randomizeItems(check, options, info) && returnVal
    returnVal = randomizeRelics(check, options, info) && returnVal
    util.setSeedText(check, seed)
    const checksum = check.sum()
    // Verify expected checksum matches actual checksum.
    if (haveChecksum && expectChecksum !== checksum) {
      console.error('Checksum mismatch.')
      process.exit(1)
    }
    // Show url if not provided as arg.
    if (argv.url && !argv._[0]) {
      console.log(optionsToUrl(
        options,
        checksum,
        seed,
        baseUrl,
      ).toString())
    }
    if (argv.verbose >= 1) {
      const text = formatInfo(info, argv.verbose)
      if (text.length) {
        console.log(text)
      }
    }
    if (argv.checkVanilla || !('bin' in argv)) {
      process.exit(returnVal ? 0 : 1)
    }
    eccEdcCalc(data)
    fs.writeFileSync(argv.bin, data)
  }

  if (window) {
    const body = document.getElementsByTagName('body')[0]
    body.addEventListener('dragover', dragOverListener)
    body.addEventListener('dragleave', dragLeaveListener)
    body.addEventListener('drop', dropListener)
    elems.target = document.getElementById('target')
    elems.status = document.getElementById('status')
    elems.file = document.getElementById('file')
    elems.file.addEventListener('change', fileChange)
    elems.form = document.getElementById('form')
    form.addEventListener('submit', submitListener)
    elems.randomize = document.getElementById('randomize')
    elems.seed = document.getElementById('seed')
    elems.seed.addEventListener('change', seedChange)
    elems.relicLocations = document.getElementById('relic-locations')
    elems.relicLocations.addEventListener('change', relicLocationsChange)
    elems.startingEquipment = document.getElementById('starting-equipment')
    elems.startingEquipment.addEventListener('change', startingEquipmentChange)
    elems.itemLocations = document.getElementById('item-locations')
    elems.itemLocations.addEventListener('change', itemLocationsChange)
    elems.enemyDrops = document.getElementById('enemy-drops')
    elems.enemyDrops.addEventListener('change', enemyDropsChange)
    elems.prologueRewards = document.getElementById('prologue-rewards')
    elems.prologueRewards.addEventListener('change', prologueRewardsChange)
    elems.turkeyMode = document.getElementById('turkey-mode')
    elems.turkeyMode.addEventListener('change', turkeyModeChange)
    elems.appendSeed = document.getElementById('append-seed')
    elems.appendSeed.addEventListener('change', appendSeedChange)
    elems.showSpoilers = document.getElementById('show-spoilers')
    elems.showSpoilers.addEventListener('change', spoilersChange)
    elems.showRelics = document.getElementById('show-relics')
    elems.showRelics.addEventListener('change', showRelicsChange)
    elems.spoilers = document.getElementById('spoilers')
    elems.download = document.getElementById('download')
    elems.loader = document.getElementById('loader')
    resetState()
    elems.copy = document.getElementById('copy')
    elems.copy.addEventListener('click', copyHandler)
    elems.notification = document.getElementById('notification')
    elems.seedUrl = document.getElementById('seed-url')
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
    if (url.search.length) {
      const rs = util.optionsFromUrl(window.location.href)
      options = rs.options
      seed = rs.seed
      expectChecksum = rs.checksum
      elems.startingEquipment.checked = options.startingEquipment
      startingEquipmentChange()
      elems.itemLocations.checked = options.itemLocations
      itemLocationsChange()
      elems.enemyDrops.checked = options.enemyDrops
      enemyDropsChange()
      elems.prologueRewards.checked = options.prologueRewards
      prologueRewardsChange()
      elems.relicLocations.checked = options.relicLocations
      relicLocationsChange()
      elems.turkeyMode.checked = options.turkeyMode
      turkeyModeChange()
      if (typeof(seed) === 'string') {
        elems.seed.value = seed
        seedChange()
        haveChecksum = true
      }
      const baseUrl = url.origin + url.pathname
      window.history.replaceState({}, document.title, baseUrl)
    } else {
      loadOption('relicLocations', relicLocationsChange, true)
      loadOption('itemLocations', itemLocationsChange, true)
      loadOption('enemyDrops', enemyDropsChange, true)
      loadOption('startingEquipment', startingEquipmentChange, true)
      loadOption('prologueRewards', prologueRewardsChange, true)
      loadOption('turkeyMode', turkeyModeChange, true)
    }
    let path = url.pathname
    if (path.match(/index\.html$/)) {
      path = path.slice(0, path.length - 10)
    }
    if (url.hostname === 'localhost'
        || url.hostname.match(/^dev\./)
        || url.protocol === 'file:') {
      document.getElementById('dev-border').classList.add('dev')
    }
    loadOption('appendSeed', appendSeedChange, true)
    loadOption('showSpoilers', spoilersChange, true)
    loadOption('showRelics', showRelicsChange, false)
  } else {
    main()
  }
})(typeof(window) !== 'undefined' ? window : null)
