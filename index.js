(function(window) {
  const releaseBaseUrl = 'https://sotn.io/'
  const devBaseUrl = 'https://dev.sotn.io/'

  let version
  let constants
  let util
  let relics
  let preset

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
    relics = sotnRando.relics
    preset = sotnRando.preset
  } else {
    version = require('./package').version
    constants = require('./constants')
    util = require('./util')
    relics = require('./relics')
    preset = require('./preset')
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
    const args = []
    if (options !== constants.defaultOptions) {
      args.push(options)
    }
    args.push(checksum.toString(16))
    args.push(encodeURIComponent(seed))
    let versionBaseUrl
    if (version.match(/-/)) {
      versionBaseUrl = devBaseUrl
    } else {
      versionBaseUrl = releaseBaseUrl
    }
    return (baseUrl || versionBaseUrl) + '?' + args.join(',')
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
    elems.loader.classList.add('hide')
  }

  function showLoader() {
    elems.loader.classList.remove('hide')
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
      elems.status.innerText = status
      elems.randomize.disabled = false
    } else {
      elems.target.classList.remove('active')
      elems.status.innerText = 'Drop .bin file here or'
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

  function presetChange() {
    localStorage.setItem('preset', elems.preset.checked)
    if (elems.preset.checked) {
      elems.presetField.classList.remove('hide')
    } else {
      elems.presetField.classList.add('hide')
    }
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

  function presetIdChange() {
    const meta = preset[elems.preset.selectedIndex]
    elems.presetDescription.innerText = meta.description
    elems.presetAuthor.innerText = 'by ' + meta.author
    localStorage.setItem('presetId', meta.id)
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
    if (elems.preset.checked) {
      return preset[elems.preset.selectedIndex].options()
    }
    const options = {
      enemyDrops: elems.enemyDrops.checked,
      startingEquipment: elems.startingEquipment.checked,
      itemLocations: elems.itemLocations.checked,
      prologueRewards: elems.prologueRewards.checked,
      relicLocations: elems.relicLocations.checked,
      turkeyMode: elems.turkeyMode.checked,
    }
    if (elems.enemyDropsArg.value) {
      options.enemyDrops = util.optionsFromString({
        enemyDrops: elems.enemyDropsArg.value,
      }).enemyDrops
    }
    if (elems.startingEquipmentArg.value) {
      options.startingEquipment = util.optionsFromString({
        startingEquipment: elems.startingEquipmentArg.value,
      }).startingEquipment
    }
    if (elems.prologueRewards.value) {
      options.prologueRewards = util.optionsFromString({
        prologueRewards: elems.prologueRewardsArg.value,
      }).prologueRewards
    }
    if (elems.relicLocationsArg.value) {
      options.relicLocations = util.optionsFromString({
        relicLocations: elems.relicLocationsArg.value,
      }).relicLocations
    }
    return options
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
      elems.status.innerText = data.error
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

  function clearHandler(event) {
    expectChecksum = undefined
    event.preventDefault()
    event.stopPropagation()
    elems.seed.value = ''
    elems.seed.disabled = false
    elems.relicLocations.disabled = false
    elems.itemLocations.disabled = false
    elems.enemyDrops.disabled = false
    elems.startingEquipment.disabled = false
    elems.prologueRewards.disabled = false
    elems.turkeyMode.disabled = false
    elems.relicPreset.disabled = false
    elems.clear.classList.add('hidden')
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
    const input = document.createElement('input')
    document.body.appendChild(input)
    input.type = 'text'
    input.value = url.toString()
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
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

  const optionsHelp = [
    'The options string may contain any of the following:',
    '  "d" for enemy drops (`--help drops`)',
    '  "e" for starting equipment (`--help equipment`)',
    '  "i" for item locations (`--help items`)',
    '  "p" for prologue rewards (`--help rewards`)',
    '  "r" for relic locations (`--help relics`)',
    '  "t" for turkey mode',
    '',
    'The default randomization mode is "'
      +  constants.defaultOptions
      + '", which randomizes everything',
    'while using default relic placement preset.',
    '',
    'Examples:',
    '  $0 -o d    # Only randomize enemy drops.',
    '  $0 -o di   # Randomize drops and item locations.',
    '  $0         # Randomize everything (default mode).',
  ].join('\n')

  const dropsHelp = [
    'Enemy drop randomization can be toggled with the "d" switch. Drops may',
    'also be specified using argument syntax.',
    '',
    'Drops format:',
    '  d[:enemy[-level][:[item][-[item]]][:...]',
    '',
    'Enemies and items are specified by removing any non-alphanumeric',
    'characters from their name. Enemies with the same name can be dis-',
    'ambiguated by specifying their level.',
    '',
    'Examples:',
    '  d:Zombie:Cutlass-Bandana  Zombie drops Cutlass and Bandana',
    '  d:Slinger:-Orange         Replace Slinger rare drop with orange',
    '  d:MedusaHead-8:           Medusa Head level 8 drops nothing',
    '',
    'If other randomization options follow a drop, they must also be',
    'separated from the drop with a comma:',
    '  $0 -o d:Slinger:-Orange,ipt',
  ].join('\n')

  const equipmentHelp = [
    'Starting equipment randomization can be toggled with the "e" switch.',
    'Equipment may also be specified using argument syntax.',
    '',
    'Equipment format:',
    '  e[:slot[:item]][:...]',
    '',
    'Items are specified by removing any non-alphanumeric characters from',
    'their name.',
    '',
    'Slot is one of:',
    '  "r" for right hand',
    '  "l" for left hand',
    '  "h" for head',
    '  "b" for body',
    '  "c" for cloak',
    '  "o" for other',
    '  "a" for Axe Lord Armor (Axe Armor mode only)',
    '  "x" for Lapis Lazuli (Luck mode only)',
    '',
    'Examples:',
    '  e:l:Marsil:FireShield  Marsil in left hand, Fire Shield in right',
    '  e:o:Duplicator         Duplicator in other slot',
    '  e:c:                   No cloak',
    '',
    'If other randomization options follow an equip, they must also be',
    'separated from the equip with a comma:',
    '  $0 -o e:o:Duplicator,dpt',
  ].join('\n')

  const itemsHelp = [
    'Item location randomization can be toggled using the "i" switch. Items',
    'may be placed in specific locations using argument syntax.',
    '',
    'Items format:',
    '  i[:zone:item[-index]:replacement][:...]',
    '',
    'Items are specified by removing any non-alphanumeric characters from',
    'their name. If a zone contains multiple occurences of the same item,',
    'it can be disambuated by specifying its index.',
    '',
    'Zone is one of:',
    '  ST0   (Final Stage: Bloodlines)',
    '  ARE   (Colosseum)',
    '  CAT   (Catacombs)',
    '  CHI   (Abandoned Mine)',
    '  DAI   (Royal Chapel)',
    '  LIB   (Long Library)',
    '  NO0   (Marble Gallery)',
    '  NO1   (Outer Wall)',
    '  NO2   (Olrox\'s Quarters)',
    '  NO3   (Castle Entrance)',
    '  NO4   (Underground Caverns)',
    '  NZ0   (Alchemy Laboratory)',
    '  NZ1   (Clock Tower)',
    '  TOP   (Castle Keep)',
    '  RARE  (Reverse Colosseum)',
    '  RCAT  (Floating Catacombs)',
    '  RCHI  (Cave)',
    '  RDAI  (Anti-Chapel)',
    '  RLIB  (Forbidden Library)',
    '  RNO0  (Black Marble Gallery)',
    '  RNO1  (Reverse Outer Wall)',
    '  RNO2  (Death Wing\'s Lair)',
    '  RNO3  (Reverse Entrance)',
    '  RNO4  (Reverse Caverns)',
    '  RNZ0  (Necromancy Laboratory)',
    '  RNZ1  (Reverse Clock Tower)',
    '  RTOP  (Reverse Castle Keep)',
    '',
    'Examples:',
    '  i:ARE:BloodCloak:Banana     Replace Blood Cloak with Banana',
    '  i:NO3:Potroast:LibraryCard  Replace Pot roast with Library Card',
    '  i:TOP:Turkey-2:Peanuts      Replace 2nd Turkey with Peanuts',
    '',
    'If other randomization options follow an item, they must also be',
    'separated from the item with a comma:',
    '  $0 -o e:TOP:Turkey-2:Peanuts,dpt',
  ].join('\n')

  const rewardsHelp = [
    'Prologue reward randomization can be toggled with the "p" switch.',
    'Rewards may be specified using argument syntax.',
    '',
    'Rewards format:',
    '  p[:reward[:item]][:...]',
    '',
    'Reward is one of:',
    '  "h" for Heart Refresh',
    '  "n" for Neutron Bomb',
    '  "p" for Potion',
    '',
    'Items are specified by removing any non-alphanumeric characters from',
    'their name.',
    '',
    'Examples:',
    '  p:h:MannaPrism   Replace Heart Refresh with Manna Prism',
    '  p:n:PowerofSire  Replace Neutron Bomb with Power of Sire',
    '  p:p:BuffaloStar  Replace Potion with Buffalo Star',
    '',
    'If other randomization options follow an item, they must also be',
    'separated from the item with a comma:',
    '  $0 -o r:h:MannaPrism,dpt',
  ].join('\n')

  const relicsHelp = [
    'Relic location randomization can be either toggled with the "r" switch,',
    'or more advanced options can be enabled using preset logic schemes and',
    'location locks. Preset logic and locks may be specified using argument',
    'syntax.',
    '',
    'A relic location lock sets the abilities required to access a relic',
    'location. Each relic location may be guarded by multiple locks, and the',
    'location will be open to the player once they have all abilities',
    'comprising any single lock.',
    '',
    'Relics format:',
    '  r[:\'preset\':preset][:location[:abilities[-abilities...]][:...]',
    '',
    'Examples:',
    '  r:B:L      Soul of Bat relic location requires Leap Stone.',
    '  r:S:LG-MP  Holy Symbol relic location requires Leap Stone + Gravity',
    '             Boots OR Form of Mist + Power of Mist.',
    '',
    'Locks for different location can be specified by separating each',
    'location by a colon:',
    '  r:B:L:S:LG-MP',
    '',
    'If other randomization options follow a lock, they must also be',
    'separated from the lock with a comma:',
    '  $0 -o r:B:L:S:LG-MP,dpt',
  ].join('\n')

  const presetHelp = [
    'This randomizer has several built-in presets:',
  ].concat(preset.map(function(meta) {
    return '  ' + meta.id + (meta.id === 'safe' ? ' (default)' : '')
  })).concat([
    '',
    'Use `--help <preset>` for information on a specific scheme.',
  ]).join('\n')

  function presetMetaHelp(meta) {
    return [
      meta.name + ' by ' + meta.author,
      meta.description,
      '',
    ].concat(relics.map(function(relic) {
      let label = '  (' + relic.ability + ') ' + relic.name
      label += Array(28).fill(' ').join('')
      return label.slice(0, 28) + relic.ability + ':'
        + (meta.relicL[relic.ability] ?
           meta.locks[relic.ability].join('-') : '')
    })).join('\n')
  }

  function main() {
    const fs = require('fs')
    const constants = require('./constants')
    const path = require('path')
    const randomizeItems = require('./randomize_items')
    const randomizeRelics = require('./randomize_relics')
    let eccEdcCalc
    const yargs = require('yargs')
      .strict()
      .usage('$0 [options] [url]')
      .option('bin', {
        alias: 'b',
        describe: 'Path to .bin file',
        type: 'string',
        requiresArg: true,
      })
      .option('seed', {
        alias: 's',
        describe: 'Seed',
        type: 'string',
        requiresArg: true,
      })
      .option('options', {
        alias: 'o',
        describe: 'Randomizations (`--help options`)',
        type: 'string',
      })
      .option('check-vanilla', {
        alias: 'c',
        describe: 'Check .bin file (does not modify image)',
        type: 'boolean',
      })
      .option('expect-checksum', {
        alias: 'e',
        describe: 'Verify checksum',
        type: 'string',
        requiresArg: true,
      })
      .option('url', {
        alias: 'u',
        description: 'Print seed url using optional base',
        type: 'string',
      })
      .option('race', {
        alias: 'r',
        describe: 'Same as -uvv',
        type: 'boolean',
      })
      .option('verbose', {
        alias: 'v',
        describe: 'Verbosity level',
        type: 'count',
      })
      .help(false)
      .option('help', {
        alias: 'h',
        describe: 'Show help',
        type: 'string',
      })
      .demandCommand(0, 1)
    const argv = yargs.argv
    let options
    let seed
    let baseUrl
    let expectChecksum
    let haveChecksum
    // Check for help.
    if ('help' in argv) {
      if (!argv.help) {
        yargs.showHelp()
        process.exit()
      }
      const topics = {
        options: optionsHelp,
        drops: dropsHelp,
        equipment: equipmentHelp,
        items: itemsHelp,
        rewards: rewardsHelp,
        relics: relicsHelp,
        preset: presetHelp,
      }
      const script = path.basename(process.argv[1])
      Object.getOwnPropertyNames(topics).forEach(function(topic) {
        topics[topic] = topics[topic].replace(/\$0/g, script)
      }, {})
      preset.forEach(function(meta) {
        topics[meta.id] = presetMetaHelp(meta)
      })
      if (argv.help in topics) {
        console.log(topics[argv.help])
        process.exit()
      } else {
        yargs.showHelp()
        console.error('\nUnknown help topic: ' + argv.help)
        process.exit(1)
      }
    }
    // Check for seed string.
    if ('seed' in argv) {
      seed = argv.seed.toString()
    }
    // Check for base url.
    if (argv.url) {
      baseUrl = argv.url
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
    if ('options' in argv) {
      try {
        options = util.optionsFromString(argv.options)
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
      // Ensure randomizations match if given using --options.
      const optionStr = util.optionsToString(options)
      if ('options' in argv && argv.options !== optionStr) {
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
    // Set options for --race.
    if (argv.race) {
      argv.url = ''
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
    if ('checkVanilla' in argv) {
      options.checkVanilla = argv.checkVanilla
    }
    if ('verbose' in argv) {
      options.verbose = argv.verbose
    }
    info = newInfo()
    // Set seed if not running a sanity check.
    if (!argv.checkVanilla) {
      require('seedrandom')(util.saltSeed(
        version,
        options,
        seed,
      ), {global: true})
      // Add seed to log info if not provided through arg or url.
      if (!('url' in argv) || argv._[0]) {
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
      eccEdcCalc = require('./ecc-edc-recalc-js')
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
    if ('url' in argv && !argv._[0]) {
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
    elems.relicLabel = document.getElementById('relic-label')
    elems.relicLocations = document.getElementById('relic-locations')
    elems.relicLocations.addEventListener('change', relicLocationsChange)
    elems.relicPresetField = document.getElementById('relic-preset-field')
    elems.relicPreset = document.getElementById('relic-preset')
    elems.relicPreset.addEventListener('change', relicPresetChange)
    elems.presetDescription = document.getElementById('preset-description')
    elems.presetAuthor = document.getElementById('preset-author')
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
    elems.relicLocks = document.getElementById('relic-locks')
    elems.clear = document.getElementById('clear')
    elems.clear.addEventListener('click', clearHandler)
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
    // Load relic preset.
    preset.forEach(function(meta) {
      const option = document.createElement('option')
      option.value = meta.id
      option.innerText = meta.name
      elems.relicPreset.appendChild(option)
    })
    const url = new URL(window.location.href)
    if (url.protocol !== 'file:') {
      fetch(new Request('package.json')).then(function(response) {
        if (response.ok) {
          response.json().then(function(json) {
            version = json.version
            document.getElementById('version').innerText = version
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
      elems.turkeyMode.checked = options.turkeyMode
      turkeyModeChange()
      elems.relicLocations.checked = options.relicLocations
      relicLocationsChange()
      let relicLocks = ''
      if (typeof(options.relicLocations) === 'object') {
        relicLocks = util.optionsToString({
          relicLocations: options.relicLocations,
        })
        if (options.relicLocations.preset) {
          for (let i = 0; i < preset.length; i++) {
            if (preset[i].id === options.relicLocations.preset) {
              elems.relicPreset.selectedIndex = i
              break
            }
          }
        } else {
          elems.relicPreset.selectedIndex = 0
        }
      }
      relicPresetChange()
      elems.relicLocks.value = relicLocks
      if (typeof(seed) === 'string') {
        elems.seed.value = seed
        seedChange()
        haveChecksum = true
      }
      elems.seed.disabled = true
      elems.relicLocations.disabled = true
      elems.itemLocations.disabled = true
      elems.enemyDrops.disabled = true
      elems.startingEquipment.disabled = true
      elems.prologueRewards.disabled = true
      elems.turkeyMode.disabled = true
      elems.relicPreset.disabled = true
      elems.clear.classList.remove('hidden')
      const baseUrl = url.origin + url.pathname
      window.history.replaceState({}, document.title, baseUrl)
    } else {
      loadOption('relicLocations', relicLocationsChange, true)
      loadOption('itemLocations', itemLocationsChange, true)
      loadOption('enemyDrops', enemyDropsChange, true)
      loadOption('startingEquipment', startingEquipmentChange, true)
      loadOption('prologueRewards', prologueRewardsChange, true)
      loadOption('turkeyMode', turkeyModeChange, true)
      const relicPreset = localStorage.getItem('relicPreset')
      if (typeof(relicPreset) === 'string') {
        for (let i = 0; i < preset.length; i++) {
          if (preset[i].id === relicPreset) {
            elems.relicPreset.selectedIndex = i
            break
          }
        }
      }
      relicPresetChange()
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
    setTimeout(function() {
      const els = document.getElementsByClassName('tooltip')
      Array.prototype.forEach.call(els, function(el) {
        el.classList.remove('hidden')
      })
    })
  } else {
    main()
  }
})(typeof(window) !== 'undefined' ? window : null)
