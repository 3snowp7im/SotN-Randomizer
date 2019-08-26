(function(window) {
  const constants = sotnRando.constants
  const util = sotnRando.util
  const relics = sotnRando.relics
  const presets = sotnRando.presets
  const worker = new Worker('worker.js')
  worker.addEventListener('message', workerMessage);

  let info
  let lastSeed
  let checksum
  let expectChecksum
  let haveChecksum
  let downloadReady
  let selectedFile
  let version

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
      elems.presetSelect.classList.remove('hide')
      elems.enemyDrops.disabled = true
      elems.startingEquipment.disabled = true
      elems.itemLocations.disabled = true
      elems.prologueRewards.disabled = true
      elems.relicLocations.disabled = true
      elems.turkeyMode.disabled = true
      presetIdChange()
    } else {
      elems.presetSelect.classList.add('hide')
      elems.enemyDrops.disabled = false
      elems.startingEquipment.disabled = false
      elems.itemLocations.disabled = false
      elems.prologueRewards.disabled = false
      elems.relicLocations.disabled = false
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
    if (elems.preset.checked) {
      return {preset: presets[elems.presetId.selectedIndex].id}
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
    disableDownload()
    showLoader()
    info = util.newInfo()
    const options = getFormOptions()
    let seed = (new Date()).getTime().toString()
    if (elems.seed.value.length) {
      seed = elems.seed.value
    }
    lastSeed = seed
    info[1]['Seed'] = seed
    const reader = new FileReader()
    reader.onload = function() {
      worker.postMessage({
        version: version,
        fileData: this.result,
        checksum: expectChecksum,
        options: options,
        seed: seed,
        info: info,
      }, [this.result])
    }
    reader.readAsArrayBuffer(selectedFile)
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
      }, 250)
      setTimeout(function() {
        elems.notification.classList.remove('success')
        animationDone = true
      }, 2250)
    }
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
    relicLocations: document.getElementById('relic-locations'),
    relicLocationsArg: document.getElementById('relic-locations-arg'),
    itemLocations: document.getElementById('item-locations'),
    itemLocationsArg: document.getElementById('item-locations-arg'),
    prologueRewards: document.getElementById('prologue-rewards'),
    prologueRewardsArg: document.getElementById('prologue-rewards-arg'),
    turkeyMode: document.getElementById('turkey-mode'),
    clear: document.getElementById('clear'),
    appendSeed: document.getElementById('append-seed'),
    showSpoilers: document.getElementById('show-spoilers'),
    showRelics: document.getElementById('show-relics'),
    spoilers: document.getElementById('spoilers'),
    download: document.getElementById('download'),
    loader: document.getElementById('loader'),
    copy: document.getElementById('copy'),
    notification: document.getElementById('notification'),
    seedUrl: document.getElementById('seed-url'),
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
  elems.itemLocations.addEventListener('change', itemLocationsChange)
  elems.prologueRewards.addEventListener('change', prologueRewardsChange)
  elems.turkeyMode.addEventListener('change', turkeyModeChange)
  elems.clear.addEventListener('click', clearHandler)
  elems.appendSeed.addEventListener('change', appendSeedChange)
  elems.showSpoilers.addEventListener('change', spoilersChange)
  elems.showRelics.addEventListener('change', showRelicsChange)
  elems.copy.addEventListener('click', copyHandler)
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
    expectChecksum = rs.checksum
    if (typeof(seed) === 'string') {
      elems.seed.value = seed
      seedChange()
      haveChecksum = true
    }
    elems.seed.disabled = true
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
      })
    }
    elems.relicLocationsArg.value = relicLocationsArg
    elems.turkeyMode.checked = applied.turkeyMode
    turkeyModeChange()
    elems.preset.disabled = true
    elems.presetId.disabled = true
    elems.enemyDrops.disabled = true
    elems.startingEquipment.disabled = true
    elems.itemLocations.disabled = true
    elems.prologueRewards.disabled = true
    elems.relicLocations.disabled = true
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

})(typeof(window) !== 'undefined' ? window : null)
