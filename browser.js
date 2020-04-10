(function(window) {
  const constants = sotnRando.constants
  const errors = sotnRando.errors
  const util = sotnRando.util
  const presets = sotnRando.presets
  const randomizeItems = sotnRando.randomizeItems
  const randomizeRelics = sotnRando.randomizeRelics
  const relics = sotnRando.relics

  let info
  let lastSeed
  let checksum
  let expectChecksum
  let haveChecksum
  let downloadReady
  let selectedFile
  let version

  function cloneItems(items) {
    return items.map(function(item) {
      const clone = Object.assign({}, item)
      delete clone.tiles
      if (item.tiles) {
        clone.tiles = item.tiles.slice()
      }
      return clone
    })
  }

  const items = cloneItems(sotnRando.items)

  function createWorkers(count) {
    const workers = Array(count)
    const url = new URL(window.location.href)
    if (url.protocol === 'file:') {
      const source = '(' + randomizeWorker.toString() + ')()'
      for (let i = 0; i < count; i++) {
        workers[i] = new Worker(
          URL.createObjectURL(new Blob([source], {
            type: 'text/javascript',
          }))
        )
      }
    } else {
      for (let i = 0; i < count; i++) {
        workers[i] = new Worker('worker.js')
      }
    }
    return workers
  }

  function getUrl() {
    const url = new URL(window.location.href)
    if (url.protocol === 'file:') {
      return 'file://'
        + window.location.pathname.split('/').slice(0, -1).join('/') + '/'
    } else {
      return window.location.protocol + '//' + window.location.host + '/'
    }
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
    sotnRando.items = cloneItems(items)
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
      elems.presetSelect.classList.remove('hide')
      elems.enemyDrops.disabled = true
      elems.startingEquipment.disabled = true
      elems.itemLocations.disabled = true
      elems.prologueRewards.disabled = true
      elems.relicLocations.disabled = true
      elems.relicLocationsSet.disabled = true
      elems.turkeyMode.disabled = true
      presetIdChange()
    } else {
      elems.presetSelect.classList.add('hide')
      elems.enemyDrops.disabled = false
      elems.startingEquipment.disabled = false
      elems.itemLocations.disabled = false
      elems.prologueRewards.disabled = false
      elems.relicLocations.disabled = false
      elems.relicLocationsSet.disabled = !elems.relicLocations.checked
      elems.turkeyMode.disabled = false
    }
  }

  function presetIdChange() {
    const preset = presets[elems.presetId.selectedIndex]
    elems.presetDescription.innerText = preset.description
    elems.presetAuthor.innerText = 'by ' + preset.author
    localStorage.setItem('presetId', preset.id)
    if (elems.preset.checked) {
      const options = preset.options()
      elems.enemyDrops.checked = !!options.enemyDrops
      elems.startingEquipment.checked = !!options.startingEquipment
      elems.itemLocations.checked = !!options.itemLocations
      elems.prologueRewards.checked = !!options.prologueRewards
      elems.relicLocations.checked = !!options.relicLocations
      elems.relicLocationsExtension.guarded.checked =
        options.relicLocationsExtension === constants.EXTENSION.GUARDED
      elems.relicLocationsExtension.equipment.checked =
        options.relicLocationsExtension === constants.EXTENSION.EQUIPMENT
      elems.relicLocationsExtension.classic.checked =
        !options.relicLocationsExtension
      elems.turkeyMode.checked = !!options.turkeyMode
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

  let relicLocationsExtensionCache

  function relicLocationsChange() {
    localStorage.setItem('relicLocations', elems.relicLocations.checked)
    if (!elems.relicLocations.checked) {
      elems.relicLocationsSet.disabled = true
      elems.relicLocationsExtension.guarded.checked = false
      elems.relicLocationsExtension.equipment.checked = false
      elems.relicLocationsExtension.classic.checked = false
    } else {
      elems.relicLocationsSet.disabled = false
      elems.relicLocationsExtension.guarded.checked =
        relicLocationsExtensionCache === constants.EXTENSION.GUARDED
      elems.relicLocationsExtension.equipment.checked =
        relicLocationsExtensionCache === constants.EXTENSION.EQUIPMENT
      elems.relicLocationsExtension.classic.checked =
        !relicLocationsExtensionCache
    }
  }

  function relicLocationsExtensionChange() {
    let value
    if (elems.relicLocationsExtension.guarded.checked) {
      value = constants.EXTENSION.GUARDED
    } else if (elems.relicLocationsExtension.equipment.checked) {
      value = constants.EXTENSION.EQUIPMENT
    } else{
      value = false
    }
    relicLocationsExtensionCache = value
    localStorage.setItem('relicLocationsExtension', value)
  }

  function turkeyModeChange() {
    localStorage.setItem('turkeyMode', elems.turkeyMode.checked)
  }

  function themeChange() {
    localStorage.setItem('theme', elems.theme.value)
    //console.log(elems.theme.value)
    {
      ['menu', 'light', 'dark'].forEach(function(theme) {
        if (theme === elems.theme.value) {
          body.classList.add(theme)
        } else {
          body.classList.remove(theme)
        }
      })
    }
  }

  function appendSeedChange() {
    localStorage.setItem('appendSeed', elems.appendSeed.checked)
  }

  function fileChange(event) {
    if (elems.file.files[0]) {
      resetState()
      selectedFile = elems.file.files[0]
      resetTarget()
      elems.target.classList.add('active')
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

  function getFormRelicLocationsExtension() {
    if (elems.relicLocationsExtension.guarded.checked) {
      return constants.EXTENSION.GUARDED
    } else if (elems.relicLocationsExtension.equipment.checked) {
      return constants.EXTENSION.EQUIPMENT
    }
    return false
  }

  function getFormOptions() {
    if (elems.preset.checked) {
      return {preset: presets[elems.presetId.selectedIndex].id}
    }
    const options = {
      enemyDrops: elems.enemyDrops.checked,
      startingEquipment: elems.startingEquipment.checked,
      itemLocations: elems.itemLocations.checked,
      prologueRewards: elems.prologueRewards.checked,
      relicLocations: elems.relicLocations.checked,
      relicLocationsExtension: getFormRelicLocationsExtension(),
      turkeyMode: elems.turkeyMode.checked,
    }
    if (elems.enemyDropsArg.value) {
      options.enemyDrops = util.optionsFromString(
        elems.enemyDropsArg.value,
      ).enemyDrops
    }
    if (elems.startingEquipmentArg.value) {
      options.startingEquipment = util.optionsFromString(
        elems.startingEquipmentArg.value,
      ).startingEquipment
    }
    if (elems.itemLocationsArg.value) {
      options.itemLocations = util.optionsFromString(
        elems.itemLocationsArg.value,
      ).itemLocations
    }
    if (elems.prologueRewardsArg.value) {
      options.prologueRewards = util.optionsFromString(
        elems.prologueRewardsArg.value,
      ).prologueRewards
    }
    if (elems.relicLocationsArg.value) {
      options.relicLocations = util.optionsFromString(
        elems.relicLocationsArg.value,
      ).relicLocations
    }
    return options
  }

  function submitListener(event) {
    event.preventDefault()
    event.stopPropagation()
    // Disable UI.
    disableDownload()
    // Show loading bar.
    showLoader()
    // Create new info collection.
    info = util.newInfo()
    // Get seed.
    let seed = (new Date()).getTime().toString()
    if (elems.seed.value.length) {
      seed = elems.seed.value
    }
    lastSeed = seed
    info[1]['Seed'] = seed
    // Get options.
    const options = getFormOptions()
    const applied = util.Preset.options(options)
    // Place planned progression items.
    const removed = randomizeItems.placePlannedItems(applied)
    const reader = new FileReader()
    // Read file.
    reader.addEventListener('load', function() {
      const check = new util.checked(this.result)
      // Save handle to file data.
      const file = this.result
      // Randomize relics.
      util.randomizeRelics(
        version,
        options,
        seed,
        removed,
        createWorkers(constants.threads),
        getUrl(),
      ).then(function(result) {
        util.mergeInfo(info, result.info)
        const rng = new Math.seedrandom(util.saltSeed(
          version,
          options,
          seed,
          constants.threads,
        ))
        result = randomizeRelics.writeRelics(rng, applied, result)
        check.apply(result.data)
        return util.randomizeItems(
          version,
          options,
          seed,
          constants.threads + 1,
          createWorkers(1)[0],
          result.items,
          getUrl(),
        )
      }).then(function(result) {
        check.apply(result.data)
        util.mergeInfo(info, result.info)
        return util.finalizeData(
          seed,
          file,
          check,
          expectChecksum,
          createWorkers(1)[0],
          getUrl(),
        )
      }).then(function(result) {
        checksum = result.checksum
        showSpoilers()
        const url = URL.createObjectURL(new Blob([result.file], {
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
      }).catch(function(err) {
        if (!errors.isError(err)) {
          console.error(err)
        }
        elems.target.classList.remove('active')
        elems.target.classList.add('error')
        elems.status.innerText = err.message
      }).finally(function() {
        // Reset global items list.
        sotnRando.items = cloneItems(items)
      })
    })
    reader.readAsArrayBuffer(selectedFile)
  }

  function clearHandler(event) {
    expectChecksum = undefined
    event.preventDefault()
    event.stopPropagation()
    elems.seed.value = ''
    elems.seed.disabled = false
    elems.preset.disabled = false
    elems.presetId.disabled = false
    elems.enemyDrops.disabled = false
    elems.enemyDropsArg.value = ''
    elems.startingEquipment.disabled = false
    elems.startingEquipmentArg.value = ''
    elems.itemLocations.disabled = false
    elems.itemLocationsArg.value = ''
    elems.prologueRewards.disabled = false
    elems.prologueRewardsArg.value = ''
    elems.relicLocations.disabled = false
    elems.relicLocationsSet.disabled = false
    elems.relicLocationsArg.value = ''
    elems.turkeyMode.disabled = false
    elems.clear.classList.add('hidden')
    presetChange()
  }

  let animationDone = true

  function copyHandler(event) {
    event.preventDefault()
    event.stopPropagation()
    elems.seed.value = elems.seed.value || lastSeed || ''
    const url = util.optionsToUrl(
      version,
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
      }, 2000)
      setTimeout(function() {
        elems.notification.classList.remove('success')
        animationDone = true
      }, 4000)
    }
  }

  function showOlderHandler(event) {
    elems.showOlder.classList.add('hidden')
    elems.older.classList.remove('hidden')
  }

  function loadOption(name, changeHandler, defaultValue) {
    const value = localStorage.getItem(name)
    if (elems[name].type === 'checkbox') {
      if (typeof(value) === 'string') {
        elems[name].checked = value === 'true'
      } else {
        elems[name].checked = defaultValue
      }
    } else if (typeof(value) === 'string') {
      elems[name].value = value
    } else {
      elems[name].value = defaultValue
    }
    changeHandler()
  }

  function showSpoilers() {
    let verbosity = 2
    if (elems.showRelics.checked) {
      verbosity++
    }
    elems.spoilers.value = util.formatInfo(info, verbosity)
    if (elems.showSpoilers.checked && elems.spoilers.value.match(/[^\s]/)) {
      elems.spoilers.style.visibility = 'visible'
    }
  }

  const body = document.getElementsByTagName('body')[0]
  body.addEventListener('dragover', dragOverListener)
  body.addEventListener('dragleave', dragLeaveListener)
  body.addEventListener('drop', dropListener)
  const elems = {
    target: document.getElementById('target'),
    status: document.getElementById('status'),
    file: document.getElementById('file'),
    form: document.getElementById('form'),
    randomize: document.getElementById('randomize'),
    seed: document.getElementById('seed'),
    preset: document.getElementById('preset'),
    presetSelect: document.getElementById('preset-select'),
    presetId: document.getElementById('preset-id'),
    presetDescription: document.getElementById('preset-description'),
    presetAuthor: document.getElementById('preset-author'),
    enemyDrops: document.getElementById('enemy-drops'),
    enemyDropsArg: document.getElementById('enemy-drops-arg'),
    startingEquipment: document.getElementById('starting-equipment'),
    startingEquipmentArg: document.getElementById('starting-equipment-arg'),
    relicLocationsSet: document.getElementById('relic-locations-set'),
    relicLocations: document.getElementById('relic-locations'),
    relicLocationsExtension: {
      guarded: document.getElementById('extension-guarded'),
      equipment: document.getElementById('extension-equipment'),
      classic: document.getElementById('extension-classic'),
    },
    relicLocationsArg: document.getElementById('relic-locations-arg'),
    itemLocations: document.getElementById('item-locations'),
    itemLocationsArg: document.getElementById('item-locations-arg'),
    prologueRewards: document.getElementById('prologue-rewards'),
    prologueRewardsArg: document.getElementById('prologue-rewards-arg'),
    turkeyMode: document.getElementById('turkey-mode'),
    clear: document.getElementById('clear'),
    theme: document.getElementById('theme'),
    appendSeed: document.getElementById('append-seed'),
    showSpoilers: document.getElementById('show-spoilers'),
    showRelics: document.getElementById('show-relics'),
    spoilers: document.getElementById('spoilers'),
    download: document.getElementById('download'),
    loader: document.getElementById('loader'),
    copy: document.getElementById('copy'),
    notification: document.getElementById('notification'),
    seedUrl: document.getElementById('seed-url'),
    showOlder: document.getElementById('show-older'),
    older: document.getElementById('older'),
  }
  resetState()
  elems.file.addEventListener('change', fileChange)
  elems.form.addEventListener('submit', submitListener)
  elems.seed.addEventListener('change', seedChange)
  elems.preset.addEventListener('change', presetChange)
  elems.presetId.addEventListener('change', presetIdChange)
  elems.enemyDrops.addEventListener('change', enemyDropsChange)
  elems.startingEquipment.addEventListener('change', startingEquipmentChange)
  elems.relicLocations.addEventListener('change', relicLocationsChange)
  elems.relicLocationsExtension.guarded.addEventListener(
    'change',
    relicLocationsExtensionChange,
  )
  elems.relicLocationsExtension.equipment.addEventListener(
    'change',
    relicLocationsExtensionChange,
  )
  elems.relicLocationsExtension.classic.addEventListener(
    'change',
    relicLocationsExtensionChange,
  )
  elems.itemLocations.addEventListener('change', itemLocationsChange)
  elems.prologueRewards.addEventListener('change', prologueRewardsChange)
  elems.turkeyMode.addEventListener('change', turkeyModeChange)
  elems.clear.addEventListener('click', clearHandler)
  elems.theme.addEventListener('change', themeChange)
  elems.appendSeed.addEventListener('change', appendSeedChange)
  elems.showSpoilers.addEventListener('change', spoilersChange)
  elems.showRelics.addEventListener('change', showRelicsChange)
  elems.copy.addEventListener('click', copyHandler)
  elems.showOlder.addEventListener('click', showOlderHandler)
  // Load presets
  presets.forEach(function(preset) {
    const option = document.createElement('option')
    option.value = preset.id
    option.innerText = preset.name
    elems.presetId.appendChild(option)
  })
  const url = new URL(window.location.href)
  const fakeVersion = '0.0.0-0'
  if (url.protocol !== 'file:') {
    fetch(new Request('package.json')).then(function(response) {
      if (response.ok) {
        response.json().then(function(json) {
          version = json.version
          document.getElementById('version').innerText = version
        })
      }
    }).catch(function(){
      version = fakeVersion
    })
  } else {
    version = fakeVersion
  }
  let options
  let seed
  if (url.search.length) {
    const rs = util.optionsFromUrl(window.location.href)
    options = rs.options
    const applied = util.Preset.options(options)
    seed = rs.seed
    if (!Number.isNaN(rs.checksum)) {
      expectChecksum = rs.checksum
    }
    if (typeof(seed) === 'string') {
      elems.seed.value = seed
      seedChange()
      haveChecksum = true
    }
    if (seed.length) {
      elems.seed.disabled = true
    }
    if (options.preset) {
      elems.preset.checked = true
      for (let i = 0; i < presets.length; i++) {
        if (presets[i].id === options.preset) {
          elems.presetId.selectedIndex = i
          break
        }
      }
      presetIdChange()
    } else {
      elems.preset.checked = false
      elems.presetId.selectedIndex = 0
    }
    presetChange()
    elems.enemyDrops.checked = applied.enemyDrops
    enemyDropsChange()
    let enemyDropsArg = ''
    if (typeof(options.enemyDrops) === 'object') {
      enemyDropsArg = util.optionsToString({
        enemyDrops: options.enemyDrops,
      })
    }
    elems.enemyDropsArg.value = enemyDropsArg
    elems.startingEquipment.checked = applied.startingEquipment
    startingEquipmentChange()
    let startingEquipmentArg = ''
    if (typeof(options.startingEquipment) === 'object') {
      startingEquipmentArg = util.optionsToString({
        startingEquipment: options.startingEquipment,
      })
    }
    elems.startingEquipmentArg.value = startingEquipmentArg
    elems.itemLocations.checked = applied.itemLocations
    itemLocationsChange()
    let itemLocationsArg = ''
    if (typeof(options.itemLocations) === 'object') {
      itemLocationsArg = util.optionsToString({
        itemLocations: options.itemLocations,
      })
    }
    elems.itemLocationsArg.value = itemLocationsArg
    elems.prologueRewards.checked = applied.prologueRewards
    prologueRewardsChange()
    let prologueRewardsArg = ''
    if (typeof(options.prologueRewards) === 'object') {
      prologueRewardsArg = util.optionsToString({
        prologueRewards: options.prologueRewards,
      })
    }
    elems.prologueRewardsArg.value = prologueRewardsArg
    elems.relicLocations.checked = applied.relicLocations
    relicLocationsChange()
    let relicLocationsArg = ''
    if (typeof(options.relicLocations) === 'object') {
      relicLocationsArg = util.optionsToString({
        relicLocations: options.relicLocations,
        relicLocationsExtension: 'equipment',
      }).replace(',' + util.optionsToString({
        relicLocationsExtension: 'equipment',
      }), '')
      console.log(options.relicLocations)
      console.log(relicLocationsArg)
    }
    elems.relicLocationsArg.value = relicLocationsArg
    elems.relicLocationsExtension.guarded.checked =
      applied.relicLocationsExtension === constants.EXTENSION.GUARDED
    elems.relicLocationsExtension.equipment.checked =
      applied.relicLocationsExtension === constants.EXTENSION.EQUIPMENT
    elems.relicLocationsExtension.classic.checked =
      !applied.relicLocationsExtension
    relicLocationsExtensionChange()
    elems.turkeyMode.checked = applied.turkeyMode
    turkeyModeChange()
    elems.preset.disabled = true
    elems.presetId.disabled = true
    elems.enemyDrops.disabled = true
    elems.startingEquipment.disabled = true
    elems.itemLocations.disabled = true
    elems.prologueRewards.disabled = true
    elems.relicLocations.disabled = true
    elems.relicLocationsSet.disabled = true
    elems.turkeyMode.disabled = true
    elems.clear.classList.remove('hidden')
    const baseUrl = url.origin + url.pathname
    window.history.replaceState({}, document.title, baseUrl)
  } else {
    loadOption('enemyDrops', enemyDropsChange, true)
    loadOption('startingEquipment', startingEquipmentChange, true)
    loadOption('itemLocations', itemLocationsChange, true)
    loadOption('prologueRewards', prologueRewardsChange, true)
    loadOption('relicLocations', relicLocationsChange, true)
    loadOption('turkeyMode', turkeyModeChange, true)
    let relicLocationsExtension =
        localStorage.getItem('relicLocationsExtension')
    if (typeof(relicLocationsExtension) === 'string') {
      switch (relicLocationsExtension) {
      case constants.EXTENSION.GUARDED:
        elems.relicLocationsExtension.guarded.checked = true
        break
      case constants.EXTENSION.EQUIPMENT:
        elems.relicLocationsExtension.equipment.checked = true
        break
      default:
        elems.relicLocationsExtension.classic.checked = true
        break
      }
    } else if (constants.defaultExtension) {
      elems.relicLocationsExtension[constants.defaultExtension].checked = true
    } else {
      elems.relicLocationsExtension.classic.checked = true
    }
    relicLocationsExtensionChange()
    let presetId = localStorage.getItem('presetId')
    if (typeof(presetId) !== 'string') {
      presetId = 'safe'
    }
    for (let i = 0; i < presets.length; i++) {
      if (presets[i].id === presetId) {
        elems.presetId.selectedIndex = i
        break
      }
    }
    presetIdChange()
    loadOption('preset', presetChange, true)
  }
  let path = url.pathname
  if (path.match(/index\.html$/)) {
    path = path.slice(0, path.length - 10)
  }
  if (url.hostname === 'localhost'
      || url.hostname.match(/^dev\./)
      || url.protocol === 'file:') {
    document.body.classList.add('dev')
    document.getElementById('dev-border').classList.add('dev')
    document.write([
      '<div id="warning">WARNING: This is the development version of the',
      'randomizer. Do not use this unless you know what you\'re doing.',
      'Bugs and softlocks are to be expected.<br>',
      'Go to <a href="https://sotn.io">sotn.io</a> for the stable release.',
      '</div>',
    ].join(' '))
    setTimeout(function() {
      document.getElementById('content').prepend(
        document.getElementById('warning'),
      )
    })
  }
  loadOption('theme', themeChange, 'menu')
  loadOption('appendSeed', appendSeedChange, true)
  loadOption('showSpoilers', spoilersChange, true)
  loadOption('showRelics', showRelicsChange, false)
  setTimeout(function() {
    const els = document.getElementsByClassName('tooltip')
    Array.prototype.forEach.call(els, function(el) {
      el.classList.remove('hidden')
    })
  })

})(typeof(window) !== 'undefined' ? window : null)
