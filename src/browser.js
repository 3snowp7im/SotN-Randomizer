(function(window) {
  const constants = sotnRando.constants
  const errors = sotnRando.errors
  const extension = sotnRando.extension
  const util = sotnRando.util
  const presets = sotnRando.presets
  const randomizeStats = sotnRando.randomizeStats
  const randomizeItems = sotnRando.randomizeItems
  const randomizeRelics = sotnRando.randomizeRelics
  const randomizeMusic = sotnRando.randomizeMusic
  const applyAccessibilityPatches = sotnRando.applyAccessibilityPatches
  const relics = sotnRando.relics

  let info
  let currSeed
  let checksum
  let expectChecksum
  let haveChecksum
  let downloadReady
  let selectedFile
  let version

  const safe = presets.filter(function(preset) {
    return preset.id === 'safe'
  }).pop()

  function cloneItems(items) {                                                              //Saves previous selections
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

  function workerCount() {
    const cores = navigator.hardwareConcurrency
    const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1
    if (isFirefox) {
      return Math.max(Math.floor(cores / 2), 1)
    }
    return util.workerCountFromCores(cores)
  }

  function createWorkers(count) {
    const workers = Array(count)
    const url = new URL(window.location.href)
    if (url.protocol === 'file:') {
      randomizeWorkerString = randomizeWorker.toString()
      const source = '(' + randomizeWorkerString + ')()'
      for (let i = 0; i < count; i++) {
        workers[i] = new Worker(
          URL.createObjectURL(new Blob([source], {
            type: 'text/javascript',
          }))
        )
      }
    } else {
      for (let i = 0; i < count; i++) {
        workers[i] = new Worker('src/worker.js')
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
    if (elems.seed.value.length || (currSeed && currSeed.length)) {
      elems.copy.disabled = false
    } else {
      elems.copy.disabled = true
    }
  }

  function outputChange(event) {
    if (elems.output.ppf.checked) {
      elems.target.classList.add('hide')
      localStorage.setItem('output', 'ppf')
      elems.randomize.disabled = false
    } else {
      elems.target.classList.remove('hide')
      elems.target.classList.remove('hidden')
      localStorage.setItem('output', 'bin')
      elems.randomize.disabled = true
    }
    if (event) {
      elems.target.classList.add('animate')
    }
  }

  function seedChange() {
    disableDownload()
    elems.copy.disabled = true
    haveChecksum = false
  }

  function presetChange(event) {                                                    //Disables options if presets is checked.
    localStorage.setItem('preset', elems.preset.checked)
    if (elems.preset.checked) {
      elems.presetSelect.classList.remove('hide')
      elems.complexity.disabled = true
      //elems.enemyDrops.disabled = true
      //elems.startingEquipment.disabled = true
      //elems.itemLocations.disabled = true
      //elems.prologueRewards.disabled = true
      elems.relicLocations.disabled = true
      elems.relicLocationsSet.disabled = true
      //elems.stats.disabled = true
      //elems.music.disabled = true
      //elems.turkeyMode.disabled = true
      presetIdChange()
      elems.options.classList.add('hide')
    } else {
      elems.presetSelect.classList.add('hide')
      elems.complexity.disabled = false
      //elems.enemyDrops.disabled = false
      //elems.startingEquipment.disabled = false
      //elems.itemLocations.disabled = false
      //elems.prologueRewards.disabled = false
      elems.relicLocations.disabled = false
      elems.relicLocationsSet.disabled = !elems.relicLocations.checked
      //elems.stats.disabled = false
      //elems.music.disabled = false
      //elems.turkeyMode.disabled = false
      elems.options.classList.remove('hidden')
      elems.options.classList.remove('hide')
    }
    if (event) {
      elems.options.classList.add('animate')
    }
  }

  function presetIdChange() {                                                     //auto checks modes and options that presets use
    const id = elems.presetId.childNodes[elems.presetId.selectedIndex].value      //
    const preset = presets.filter(function(preset) {                              // 
      return preset.id === id                                                     //
    }).pop()                                                                      //
    elems.presetDescription.innerText = preset.description                        //
    elems.presetAuthor.innerText = 'by ' + preset.author                          //  
    localStorage.setItem('presetId', preset.id)                                   //  
    if (elems.preset.checked) {                                                   //
      const options = preset.options()                                            //
      let complexity = 1                                                          //
      Object.getOwnPropertyNames(options.relicLocations).forEach(                 //  
        function(key) {                                                           //
          if (/^[0-9]+(-[0-9]+)?/.test(key)) {                                    //  
            complexity = key.split('-').shift()                                 
          }
        }
      )
      relicLocationsExtensionCache = options.relicLocations
        && options.relicLocations.extension
      adjustMaxComplexity()
      elems.complexity.value = complexity
      elems.enemyDrops.checked = !!options.enemyDrops
      elems.enemyDrops.disabled = options.enemyDrops != null && typeof(options.enemyDrops) == 'object'
      elems.startingEquipment.checked = !!options.startingEquipment
      elems.startingEquipment.disabled = options.startingEquipment != null && typeof(options.startingEquipment) == 'object'
      elems.itemLocations.checked = !!options.itemLocations
      elems.itemLocations.disabled = options.itemLocations != null && typeof(options.itemLocations) == 'object'
      elems.prologueRewards.checked = !!options.prologueRewards
      elems.prologueRewards.disabled = options.prologueRewards != null && typeof(options.startingEquipment) == 'object'
      elems.relicLocations.checked = !!options.relicLocations
      elems.relicLocationsExtension.guarded.checked =
        options.relicLocations
        && options.relicLocations.extension === constants.EXTENSION.GUARDED
      elems.relicLocationsExtension.spread.checked =
        options.relicLocations
        && options.relicLocations.extension === constants.EXTENSION.SPREAD
      elems.relicLocationsExtension.equipment.checked =
        options.relicLocations
        && options.relicLocations.extension === constants.EXTENSION.EQUIPMENT
      elems.relicLocationsExtension.tourist.checked =
        options.relicLocations
        && options.relicLocations.extension === constants.EXTENSION.TOURIST
      elems.relicLocationsExtension.wanderer.checked =
        options.relicLocations
        && options.relicLocations.extension === constants.EXTENSION.WANDERER
      elems.relicLocationsExtension.classic.checked =
        options.relicLocations
        && !options.relicLocations.extension
      elems.stats.checked = !!options.stats
      elems.music.checked = !!options.music
      elems.turkeyMode.checked = !!options.turkeyMode
      elems.magicmaxMode.checked = !!options.magicmaxMode
      elems.colorrandoMode.checked = !!options.colorrandoMode
      elems.antiFreezeMode.checked = !!options.antiFreezeMode
      elems.mypurseMode.checked = !!options.mypurseMode
      elems.iwsMode.checked = !!options.iwsMode
      elems.fastwarpMode.checked = !!options.fastwarpMode
      elems.noprologueMode.checked = !!options.noprologueMode
      elems.unlockedMode.checked = !!options.unlockedMode
      elems.surpriseMode.checked = !!options.surpriseMode
      elems.enemyStatRandoMode.checked = !!options.enemyStatRandoMode
      elems.shopPriceRandoMode.checked = !!options.shopPriceRandoMode
    }
  }

  function complexityChange() {
    localStorage.setItem('complexity', elems.complexity.value)
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
      elems.relicLocationsExtension.spread.checked = false
      elems.relicLocationsExtension.equipment.checked = false
      elems.relicLocationsExtension.tourist.checked = false
      elems.relicLocationsExtension.wanderer.checked = false
      elems.relicLocationsExtension.classic.checked = false
    } else {
      elems.relicLocationsSet.disabled = false
      elems.relicLocationsExtension.guarded.checked =
        relicLocationsExtensionCache === constants.EXTENSION.GUARDED
      elems.relicLocationsExtension.spread.checked =
        relicLocationsExtensionCache === constants.EXTENSION.SPREAD
      elems.relicLocationsExtension.equipment.checked =
        relicLocationsExtensionCache === constants.EXTENSION.EQUIPMENT
      elems.relicLocationsExtension.tourist.checked =
        relicLocationsExtensionCache === constants.EXTENSION.TOURIST
      elems.relicLocationsExtension.wanderer.checked =
        relicLocationsExtensionCache === constants.EXTENSION.WANDERER
      elems.relicLocationsExtension.classic.checked =
        !relicLocationsExtensionCache
    }
  }

  function adjustMaxComplexity() {
    switch (relicLocationsExtensionCache) {
    case constants.EXTENSION.EQUIPMENT:
    case constants.EXTENSION.TOURIST:
      elems.complexity.max = 15
      break
    case constants.EXTENSION.GUARDED:
    case constants.EXTENSION.SPREAD:
    case constants.EXTENSION.WANDERER:
    default:
      elems.complexity.max = 11
      break
    }
    if (parseInt(elems.complexity.value) > parseInt(elems.complexity.max)) {
      elems.complexity.value = elems.complexity.max
    }
  }

  function relicLocationsExtensionChange() {
    let value
    if (elems.relicLocationsExtension.guarded.checked) {
      value = constants.EXTENSION.GUARDED
    } else if (elems.relicLocationsExtension.spread.checked) {
      value = constants.EXTENSION.SPREAD
    } else if (elems.relicLocationsExtension.equipment.checked) {
      value = constants.EXTENSION.EQUIPMENT
    } else if (elems.relicLocationsExtension.tourist.checked) {
      value = constants.EXTENSION.TOURIST
    } else if (elems.relicLocationsExtension.wanderer.checked) {
      value = constants.EXTENSION.WANDERER
    } else{
      value = false
    }
    relicLocationsExtensionCache = value
    adjustMaxComplexity()
    localStorage.setItem('relicLocationsExtension', value)
  }

  function statsChange() {
    localStorage.setItem('stats', elems.stats.checked)
  }

  function musicChange() {
    localStorage.setItem('music', elems.music.checked)
  }

  function turkeyModeChange() {
    localStorage.setItem('turkeyMode', elems.turkeyMode.checked)
  }

  function themeChange() {
    localStorage.setItem('theme', elems.theme.value)
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

  function tournamentModeChange() {
    if (elems.tournamentMode.checked) {
      elems.showRelics.checked = false
      elems.showRelics.disabled = true
      elems.showSolutions.checked = false
      elems.showSolutions.disabled = true
    } else {
      elems.showRelics.disabled = false
    }
    localStorage.setItem('tournamentMode', elems.tournamentMode.checked)
  }

  function colorrandoModeChange() {
    localStorage.setItem('colorrandoMode', elems.colorrandoMode.checked)
  }
  
  function magicmaxModeChange() {
    localStorage.setItem('magicmaxMode', elems.magicmaxMode.checked)
  }

  function antiFreezeModeChange() {
    localStorage.setItem('antiFreezeMode', elems.antiFreezeMode.checked)
  }

  function mypurseModeChange() {
    localStorage.setItem('mypurseMode', elems.mypurseMode.checked)
  }

  function iwsModeChange() {
    localStorage.setItem('iwsMode', elems.iwsMode.checked)
  }

  function fastwarpModeChange() {
    localStorage.setItem('fastwarpMode', elems.fastwarpMode.checked)
  }

  function noprologueModeChange() {
    localStorage.setItem('noprologueMode', elems.noprologueMode.checked)
  }

  function unlockedModeChange() {
    localStorage.setItem('unlockedMode', elems.unlockedMode.checked)
  }

  function surpriseModeChange() {
    localStorage.setItem('surpriseMode', elems.surpriseMode.checked)
  }

  function enemyStatRandoModeChange() {
    localStorage.setItem('enemyStatRandoMode', elems.enemyStatRandoMode.checked)
  }

  function shopPriceRandoModeChange() {
    localStorage.setItem('shopPriceRandoMode', elems.shopPriceRandoMode.checked)
  }

  function accessibilityPatchesChange() {
    localStorage.setItem('accessibilityPatches', elems.accessibilityPatches.checked)
  }

  function spoilersChange() {
    if (elems.showSpoilers.checked) {
      showSpoilers()
      if (!elems.tournamentMode.checked) {
        elems.showRelics.disabled = false
      }
    } else {
      hideSpoilers()
      elems.showRelics.checked = false
      elems.showRelics.disabled = true
      elems.showSolutions.checked = false
      elems.showSolutions.disabled = true

    }
    localStorage.setItem('showSpoilers', elems.showSpoilers.checked)
  }

  function showRelicsChange() {
    if (elems.showRelics.checked) {
      elems.showSolutions.disabled = false
    } else {
      elems.showSolutions.checked = false
      elems.showSolutions.disabled = true
    }
    showSpoilers()
    localStorage.setItem('showRelics', elems.showRelics.checked)
  }

  function showSolutionsChange() {
    showSpoilers()
    localStorage.setItem('showSolutions', elems.showSolutions.checked)
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

  function getFormRelicLocations() {
    if (!elems.preset.checked && !elems.relicLocations.checked) {
      return false
    }
    // Get safe relic locations.
    const relicLocations = safe.options().relicLocations
    if (relicLocations) {
      // Add extension from form.
      if (elems.relicLocationsExtension.guarded.checked) {
        relicLocations.extension = constants.EXTENSION.GUARDED
      } else if (elems.relicLocationsExtension.spread.checked) {
        relicLocations.extension = constants.EXTENSION.SPREAD
      } else if (elems.relicLocationsExtension.equipment.checked) {
        relicLocations.extension = constants.EXTENSION.EQUIPMENT
      } else if (elems.relicLocationsExtension.tourist.checked) {
        relicLocations.extension = constants.EXTENSION.TOURIST
      } else if (elems.relicLocationsExtension.wanderer.checked) {
        relicLocations.extension = constants.EXTENSION.WANDERER
      } else {
        delete relicLocations.extension
      }
      const extensions = []
      switch (relicLocations.extension) {
      case constants.EXTENSION.WANDERER:
        extensions.push(constants.EXTENSION.WANDERER)
        break
      case constants.EXTENSION.TOURIST:
      extensions.push(constants.EXTENSION.TOURIST)
      case constants.EXTENSION.EQUIPMENT:
        extensions.push(constants.EXTENSION.EQUIPMENT)
      case constants.EXTENSION.SPREAD:
        extensions.push(constants.EXTENSION.SPREAD)
      case constants.EXTENSION.GUARDED:
        extensions.push(constants.EXTENSION.GUARDED)
      }
      // Delete default complexity target.
      let goals
      Object.getOwnPropertyNames(relicLocations).forEach(function(key) {
        if (/^[0-9]+(-[0-9]+)?/.test(key)) {
          goals = relicLocations[key]
          delete relicLocations[key]
        } else {
          const location = extension.filter(function(location) {
            if (location.name === key) {
              if (extensions.indexOf(location.extension) === -1) {
                delete relicLocations[key]
              }
            }
          })
        }
      })
      // Add complexity target from form.
      relicLocations[elems.complexity.value] = goals
    }
    return relicLocations
  }

  function getFormOptions() {
    if (elems.preset.checked) {
      const options = {
        preset: presets[elems.presetId.selectedIndex].id
      }
      if (elems.tournamentMode.checked) {
        options.tournamentMode = true
      }
      if (elems.colorrandoMode.checked) {
        options.colorrandoMode = true
      }
      if (elems.magicmaxMode.checked) {
        options.magicmaxMode = true
      }
      if (elems.antiFreezeMode.checked) {
        options.antiFreezeMode = true
      }
      if (elems.mypurseMode.checked) {
        options.mypurseMode = true
      }
      if (elems.iwsMode.checked) {
        options.iwsMode = true
      }
      if (elems.fastwarpMode.checked) {
        options.fastwarpMode = true
      }
      if (elems.noprologueMode.checked) {
        options.noprologueMode = true
      }
      if (elems.unlockedMode.checked) {
        options.unlockedMode = true
      }
      if (elems.surpriseMode.checked) {
        options.surpriseMode = true
      }
      if (elems.enemyStatRandoMode.checked) {
        options.enemyStatRandoMode = true
      }
      if (elems.shopPriceRandoMode.checked) {
        options.shopPriceRandoMode = true
      }
      return options
    }
    const options = {
      enemyDrops: elems.enemyDrops.checked,
      startingEquipment: elems.startingEquipment.checked,
      itemLocations: elems.itemLocations.checked,
      prologueRewards: elems.prologueRewards.checked,
      relicLocations: getFormRelicLocations(),
      stats: elems.stats.checked,
      music: elems.music.checked,
      turkeyMode: elems.turkeyMode.checked,
      tournamentMode: elems.tournamentMode.checked,
      tournamentMode: elems.tournamentMode.checked,
      colorrandoMode: elems.colorrandoMode.checked,
      magicmaxMode: elems.magicmaxMode.checked,
      antiFreezeMode: elems.antiFreezeMode.checked,
      mypurseMode: elems.mypurseMode.checked,
      iwsMode: elems.iwsMode.checked,
      fastwarpMode: elems.fastwarpMode.checked,
      noprologueMode: elems.noprologueMode.checked,
      unlockedMode: elems.unlockedMode.checked,
      surpriseMode: elems.surpriseMode.checked,
      enemyStatRandoMode: elems.enemyStatRandoMode.checked,
      shopPriceRandoMode: elems.shopPriceRandoMode.checked,
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
    if (elems.writes.value) {
      options.writes = util.optionsFromString(
        elems.writes.value,
      ).writes
    }
    return options
  }

  function generateSeedName(){
    let adjectives = [];
    let nouns = [];

    let month = new Date().getMonth() + 1;

    switch (month) {
        case 10:
            adjectives = constants.adjectivesHalloween;
            nouns = constants.nounsHalloween;
            break;
        case 12:
            adjectives = constants.adjectivesHolidays;
            nouns = constants.nounsNormal;
            break;

        default:
            adjectives = constants.adjectivesNormal;
            nouns = constants.nounsNormal;
            break;
    }

    let adjective = adjectives[Math.floor(Math.random() * Math.floor(adjectives.length - 1))];
    let noun = nouns[Math.floor(Math.random() * Math.floor(nouns.length - 1))];
    let number = Math.floor(Math.random() * 999);
    if (number % 100 === 69) {
        number = '69Nice';
    }

    let suffix = '';

    let seedName = adjective + noun + number + suffix;

    return seedName;
  }

  function submitListener(event) {
    // Get seed.
    let selectedPreset = null
    if(elems.preset.checked) {
      selectedPreset = elems.presetId.childNodes[elems.presetId.selectedIndex].value
      self.sotnRando.selectedPreset = selectedPreset
    }else{
      self.sotnRando.selectedPreset = null
    }

    event.preventDefault()
    event.stopPropagation()
    // Disable UI.
    disableDownload()
    // Show loading bar.
    showLoader()
    // Create new info collection.
    info = util.newInfo()    

    let seed = generateSeedName()
    if (elems.seed.value.length) {
      seed = elems.seed.value
    }
    currSeed = seed
    info[1]['Seed'] = seed
    // Get options.
    const options = getFormOptions()
    // Check for overriding preset.
    let applied
    let override
    for (let preset of presets) {
      if (preset.override) {
        applied = preset.options()
        override = true
        break
      }
    }
    // Get user specified options.
    if (!override) {
      applied = util.Preset.options(options)
    }
    function handleError(err) {
      if (!errors.isError(err)) {
        console.error(err)
      }
      elems.target.classList.remove('active')
      elems.target.classList.add('error')
      elems.status.innerText = err.message
    }
    function restoreItems() {
      sotnRando.items = cloneItems(items)
    }
    function randomize() {
      const check = new util.checked(this.result)
      // Save handle to file data.
      const file = this.result
      const threads = workerCount()
      const start = new Date().getTime()
      // Randomize stats.
      const rng = new Math.seedrandom(util.saltSeed(
        version,
        options,
        seed,
        0,
      ))
      applied.stats = elems.stats.checked

      if(applied.startingEquipment == null || typeof(applied.startingEquipment) != 'object'){
        applied.startingEquipment = elems.startingEquipment.checked
      }
      if(applied.prologueRewards == null || typeof(applied.prologueRewards) != 'object'){
        applied.prologueRewards = elems.prologueRewards.checked
      }
      if(applied.itemLocations == null || typeof(applied.itemLocations) != 'object'){
        applied.itemLocations = elems.itemLocations.checked
      }
      if(applied.enemyDrops == null || typeof(applied.enemyDrops) != 'object'){
        applied.enemyDrops = elems.enemyDrops.checked
      }
      applied.music = elems.music.checked
      applied.turkeyMode = elems.turkeyMode.checked
      const result = randomizeStats(rng, applied)
      const newNames = result.newNames
      check.apply(result.data)
      // Randomize relics.
      let selectedPreset = null
      if(elems.preset.checked) {
        selectedPreset = elems.presetId.childNodes[elems.presetId.selectedIndex].value
        util.selectedPreset = selectedPreset
      }
      return util.randomizeRelics(
        version,
        applied,
        options,
        seed,
        newNames,
        createWorkers(threads),
        4,
        getUrl(),
      ).then(function(result) {
        util.mergeInfo(info, result.info)
        const rng = new Math.seedrandom(util.saltSeed(
          version,
          options,
          seed,
          1,
        ))
        result = randomizeRelics.writeRelics(
          rng,
          applied,
          result,
          newNames,
        )
        check.apply(result.data)
        return util.randomizeItems(
          version,
          applied,
          options,
          seed,
          createWorkers(1)[0],
          2,
          result.items,
          newNames,
          getUrl(),
        )
      }).then(function(result) {
        check.apply(result.data)
        util.mergeInfo(info, result.info)
        const rng = new Math.seedrandom(util.saltSeed(
          version,
          options,
          seed,
          3,
        ))
        check.apply(randomizeMusic(rng, applied))
        // Apply tournament mode patches.
        if (options.tournamentMode) {
          check.apply(util.applyTournamentModePatches())
        }
        // Apply magic max patches.
        if (options.magicmaxMode) {
          check.apply(util.applyMagicMaxPatches())
        }
        // Apply anti-freeze patches.
        if (options.antiFreezeMode) {
          check.apply(util.applyAntiFreezePatches())
        }
        // Apply my purse patches.
        if (options.mypurseMode) {
          check.apply(util.applyMyPursePatches())
        }
        // Apply iws patches.
        if (options.iwsMode) {
          check.apply(util.applyiwsPatches())
        }
        // Apply fast warp patches.
        if (options.fastwarpMode) {
          check.apply(util.applyfastwarpPatches())
        }
        // Apply no prologue patches.
        if (options.noprologueMode) {
          check.apply(util.applynoprologuePatches())
        }
        // Apply unlocked patches.
        if (options.unlockedMode) {
          check.apply(util.applyunlockedPatches())
        }
        // Apply surprise patches.
        if (options.surpriseMode || applied.surpriseMode) {
          check.apply(util.applysurprisePatches())
        }
        // Apply enemy stat rando patches.
        if (options.enemyStatRandoMode || applied.enemyStatRandoMode) {
          check.apply(util.applyenemyStatRandoPatches(rng))
        }
        // Apply shop price rando patches.
        if (options.shopPriceRandoMode || applied.shopPriceRandoMode) {
          check.apply(util.applyShopPriceRandoPatches(rng))
        }
        // Apply writes.
        check.apply(util.applyWrites(rng, applied))
        util.setSeedText(
          check,
          seed,
          version,
          options.preset,
          options.tournamentMode,
        )
        return check.sum()
      }).then(function(result) {
        checksum = result
        if (expectChecksum && expectChecksum !== checksum) {
          throw new errors.VersionError()
        }
        // Apply accessibility patches.
        if (elems.accessibilityPatches.checked) {
          check.apply(applyAccessibilityPatches())
        }
        return util.finalizeData(
          seed,
          version,
          options.preset,
          options.tournamentMode,
          file,
          check,
          createWorkers(1)[0],
          getUrl(),
        )
      }).then(function(result) {
        const duration = new Date().getTime() - start
        console.log('Seed generation took ' + (duration / 1000) + 's')
        showSpoilers()
        const url = URL.createObjectURL(new Blob([result.file], {
          type: 'application/octet-binary',
        }))
        let fileName
        if (elems.output.ppf.checked) {
          fileName = seed + ".ppf"
          if(selectedPreset !== null) fileName = selectedPreset + "-" + fileName
        } else {
          fileName = selectedFile.name
        }
        if (elems.appendSeed.checked) {
          if(elems.output.ppf.checked){
            elems.download.download = fileName
          }else{
            elems.download.download = randomizedFilename(fileName, seed)
          }          
        } else {
          resultName = "SotN-Randomizer"
          if(selectedPreset !== null) resultName = resultName + "-" + selectedPreset
          if(elems.output.ppf.checked){
            elems.download.download = resultName + ".ppf"
          }else{
            elems.download.download = fileName
          }
          
        }
        elems.download.href = url
        elems.download.click()
        URL.revokeObjectURL(url)
        resetCopy()
      })
    }
    if (elems.output.ppf.checked) {
      randomize().catch(handleError).finally(restoreItems)
    } else {
      const reader = new FileReader()
      reader.addEventListener('load', function() {
        // Verify vanilla bin.
        util.sha256(this.result).then(function(digest) {
          if (digest !== constants.digest) {
            throw new Error('Disc image is not a valid or vanilla backup')
          }
        }).then(randomize.bind(this)).catch(handleError).finally(restoreItems)
      })
      reader.readAsArrayBuffer(selectedFile)
    }
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
    elems.writes.value = ''
    elems.turkeyMode.disabled = false
    elems.magicmaxMode.disabled = false
    elems.colorrandoMode.disabled = false
    elems.antiFreezeMode.disabled = false
    elems.mypurseMode.disabled = false
    elems.iwsMode.disabled = false
    elems.fastwarpMode.disabled = false
    elems.noprologueMode.disabled = false
    elems.unlockedMode.disabled = false
    elems.surpriseMode.disabled = false
    elems.enemyStatRandoMode.disabled = false
    elems.shopPriceRandoMode.disabled = false
    elems.tournamentMode.disabled = false
    elems.clear.classList.add('hidden')
    presetChange()
  }

  let animationDone = true

  function copyHandler(event) {
    event.preventDefault()
    event.stopPropagation()
    elems.seed.value = elems.seed.value || currSeed || ''
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
    let verbosity
    if (elems.showSolutions.checked) {
      verbosity = 4
    } else if (elems.showRelics.checked) {
      verbosity = 3
    } else {
      verbosity = 2
    }
    elems.spoilers.value = util.formatInfo(info, verbosity)
    if (elems.showSpoilers.checked
        && elems.spoilers.value.match(/[^\s]/)) {
      elems.spoilersContainer.style.display = ''
      elems.spoilersContainer.classList.remove('hide')
    }
  }

  function hideSpoilers() {
    elems.spoilersContainer.classList.add('hide')
  }

  const body = document.getElementsByTagName('body')[0]
  body.addEventListener('dragover', dragOverListener)
  body.addEventListener('dragleave', dragLeaveListener)
  body.addEventListener('drop', dropListener)
  const elems = {
    output: {
      ppf: document.getElementById('output-ppf'),
      bin: document.getElementById('output-bin'),
    },
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
    options: document.getElementById('options'),
    complexity: document.getElementById('complexity'),
    enemyDrops: document.getElementById('enemy-drops'),
    enemyDropsArg: document.getElementById('enemy-drops-arg'),
    startingEquipment: document.getElementById('starting-equipment'),
    startingEquipmentArg: document.getElementById('starting-equipment-arg'),
    relicLocationsSet: document.getElementById('relic-locations-set'),
    relicLocations: document.getElementById('relic-locations'),
    relicLocationsExtension: {
      guarded: document.getElementById('extension-guarded'),
      spread: document.getElementById('extension-spread'),
      equipment: document.getElementById('extension-equipment'),
      tourist: document.getElementById('extension-tourist'),
      wanderer: document.getElementById('extension-wanderer'),
      classic: document.getElementById('extension-classic'),
    },
    relicLocationsArg: document.getElementById('relic-locations-arg'),
    writes: document.getElementById('writes'),
    itemLocations: document.getElementById('item-locations'),
    itemLocationsArg: document.getElementById('item-locations-arg'),
    prologueRewards: document.getElementById('prologue-rewards'),
    prologueRewardsArg: document.getElementById('prologue-rewards-arg'),
    stats: document.getElementById('stats'),
    music: document.getElementById('music'),
    turkeyMode: document.getElementById('turkey-mode'),
    clear: document.getElementById('clear'),
    theme: document.getElementById('theme'),
    appendSeed: document.getElementById('append-seed'),
    tournamentMode: document.getElementById('tournament-mode'),
    colorrandoMode: document.getElementById('colorrando-mode'),
    magicmaxMode: document.getElementById('magicmax-mode'),
    antiFreezeMode: document.getElementById('antifreeze-mode'),
    mypurseMode: document.getElementById('mypurse-mode'),
    iwsMode: document.getElementById('iws-mode'),
    fastwarpMode: document.getElementById('fastwarp-mode'),
    noprologueMode: document.getElementById('noprologue-mode'),
    unlockedMode: document.getElementById('unlocked-mode'),
    surpriseMode: document.getElementById('surprise-mode'),
    enemyStatRandoMode: document.getElementById('enemyStatRando-mode'),
    shopPriceRandoMode: document.getElementById('shopPriceRando-mode'),
    accessibilityPatches: document.getElementById('accessibility-patches'),
    showSpoilers: document.getElementById('show-spoilers'),
    showRelics: document.getElementById('show-relics'),
    showSolutions: document.getElementById('show-solutions'),
    spoilers: document.getElementById('spoilers'),
    spoilersContainer: document.getElementById('spoilers-container'),
    download: document.getElementById('download'),
    loader: document.getElementById('loader'),
    copy: document.getElementById('copy'),
    notification: document.getElementById('notification'),
    seedUrl: document.getElementById('seed-url'),
    showOlder: document.getElementById('show-older'),
    older: document.getElementById('older'),
  }
  resetState()
  elems.output.ppf.addEventListener('change', outputChange)
  elems.output.bin.addEventListener('change', outputChange)
  elems.file.addEventListener('change', fileChange)
  elems.form.addEventListener('submit', submitListener)
  elems.seed.addEventListener('change', seedChange)
  elems.preset.addEventListener('change', presetChange)
  elems.presetId.addEventListener('change', presetIdChange)
  elems.complexity.addEventListener('change', complexityChange)
  elems.enemyDrops.addEventListener('change', enemyDropsChange)
  elems.startingEquipment.addEventListener('change', startingEquipmentChange)
  elems.relicLocations.addEventListener('change', relicLocationsChange)
  elems.relicLocationsExtension.guarded.addEventListener(
    'change',
    relicLocationsExtensionChange,
  )
  elems.relicLocationsExtension.spread.addEventListener(
    'change',
    relicLocationsExtensionChange,
  )
  elems.relicLocationsExtension.equipment.addEventListener(
    'change',
    relicLocationsExtensionChange,
  )
  elems.relicLocationsExtension.tourist.addEventListener(
    'change',
    relicLocationsExtensionChange,
  )
  elems.relicLocationsExtension.wanderer.addEventListener(
    'change',
    relicLocationsExtensionChange,
  )
  elems.relicLocationsExtension.classic.addEventListener(
    'change',
    relicLocationsExtensionChange,
  )
  elems.itemLocations.addEventListener('change', itemLocationsChange)
  elems.prologueRewards.addEventListener('change', prologueRewardsChange)
  elems.stats.addEventListener('change', statsChange)
  elems.music.addEventListener('change', musicChange)
  elems.turkeyMode.addEventListener('change', turkeyModeChange)
  elems.clear.addEventListener('click', clearHandler)
  elems.theme.addEventListener('change', themeChange)
  elems.appendSeed.addEventListener('change', appendSeedChange)
  elems.tournamentMode.addEventListener('change', tournamentModeChange)
  elems.colorrandoMode.addEventListener('change', colorrandoModeChange)
  elems.magicmaxMode.addEventListener('change', magicmaxModeChange)
  elems.antiFreezeMode.addEventListener('change', antiFreezeModeChange)
  elems.mypurseMode.addEventListener('change', mypurseModeChange)
  elems.iwsMode.addEventListener('change', iwsModeChange)
  elems.fastwarpMode.addEventListener('change', fastwarpModeChange)
  elems.noprologueMode.addEventListener('change', noprologueModeChange)
  elems.unlockedMode.addEventListener('change', unlockedModeChange)
  elems.surpriseMode.addEventListener('change', surpriseModeChange)
  elems.enemyStatRandoMode.addEventListener('change', enemyStatRandoModeChange)
  elems.shopPriceRandoMode.addEventListener('change', shopPriceRandoModeChange)
  elems.accessibilityPatches.addEventListener('change', accessibilityPatchesChange)
  elems.showSpoilers.addEventListener('change', spoilersChange)
  elems.showRelics.addEventListener('change', showRelicsChange)
  elems.showSolutions.addEventListener('change', showSolutionsChange)
  elems.copy.addEventListener('click', copyHandler)
  elems.showOlder.addEventListener('click', showOlderHandler)
  // Load presets
  sortedPresets = presets
  sortedPresets.sort(function(a, b) {
    if (!('weight' in a && 'id' in a)) {
      if (!('weight' in b && 'id' in b)) {
        return 0
      }
      return 1
    } else if (!('weight' in b && 'id' in b)) {
      return -1
    }
    const weight = a.weight - b.weight
    if (weight === 0) {
      if (a.id < b.id) {
        return -1
      } else if (a.id > b.id) {
        return 1
      }
    }
    return weight
  })
  sortedPresets.forEach(function(preset) {
    if (!preset.hidden) {
      const option = document.createElement('option')
      option.value = preset.id
      option.innerText = preset.name
      elems.presetId.appendChild(option)
    }
  })
  const url = new URL(window.location.href)
  const releaseBaseUrl = constants.optionsUrls[constants.defaultOptions]
  const releaseHostname = new URL(releaseBaseUrl).hostname
  const isDev = url.hostname !== releaseHostname
  const fakeVersion = '0.0.0D'
  if (url.protocol !== 'file:') {
    fetch('package.json', {cache: 'no-store'}).then(function(response) {
      if (response.ok) {
        response.json().then(function(json) {
          version = json.version
          if (isDev && !version.match(/-/)) {
            version += 'D'
          }
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
      let index = 0
      for (let i = 0; i < presets.length; i++) {
        if (presets[i].id === options.preset) {
          elems.presetId.selectedIndex = index
          break
        }
        if (!presets.hidden) {
          index++
        }
      }
      presetIdChange()
    } else {
      elems.preset.checked = false
      elems.presetId.selectedIndex = 0
    }
    presetChange()
    if (options.tournamentMode) {
      elems.tournamentMode.checked = true
    } else {
      elems.tournamentMode.checked = false
    }
    tournamentModeChange()
    elems.tournamentMode.disabled = true
    let locations
    if (typeof(applied.relicLocations) === 'object') {
      locations = applied.relicLocations
    } else {
      locations = safe.options().relicLocations
    }
    Object.getOwnPropertyNames(locations).forEach(
      function(key) {
        if (/^[0-9]+(-[0-9]+)?$/.test(key)) {
          elems.complexity.value = key.split('-').shift()
        }
      }
    )
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
    elems.relicLocations.checked = !!applied.relicLocations
    relicLocationsChange()
    let relicLocationsArg = ''
    if (typeof(options.relicLocations) === 'object') {
      // This is a hacky way to get all possible relic location locks
      // serialized, without including the relic locations extension.
      const relicOptions = util.optionsFromString(util.optionsToString({
        relicLocations: Object.assign({}, applied.relicLocations, {
          extension: constants.EXTENSION.TOURIST,
        }),
      }).replace(new RegExp(':?' + util.optionsToString({
        relicLocations: {
          extension: constants.EXTENSION.TOURIST,
        },
      }).slice(2)), ''))
      // Restore original extension from URL.
      if ('extension' in options.relicLocations) {
        relicOptions.relicLocations.extension
          = options.relicLocations.extension
      }
      relicLocationsArg = util.optionsToString(relicOptions)
    }
    elems.relicLocationsArg.value = relicLocationsArg
    elems.relicLocationsExtension.wanderer.checked =
      applied.relicLocations
      && applied.relicLocations.extension === constants.EXTENSION.WANDERER
    elems.relicLocationsExtension.tourist.checked =
      applied.relicLocations
      && applied.relicLocations.extension === constants.EXTENSION.TOURIST
    elems.relicLocationsExtension.guarded.checked =
      applied.relicLocations
      && applied.relicLocations.extension === constants.EXTENSION.GUARDED
    elems.relicLocationsExtension.spread.checked =
      applied.relicLocations
      && applied.relicLocations.extension === constants.EXTENSION.SPREAD
    elems.relicLocationsExtension.equipment.checked =
      applied.relicLocations
      && applied.relicLocations.extension === constants.EXTENSION.EQUIPMENT
    elems.relicLocationsExtension.classic.checked =
      applied.relicLocations
      && !applied.relicLocations.extension
    relicLocationsExtensionChange()
    let writes = ''
    if (options.writes) {
      writes = util.optionsToString({writes: options.writes})
    }
    elems.writes.value = writes
    elems.stats.checked = applied.stats
    statsChange()
    elems.music.checked = applied.music
    musicChange()
    elems.turkeyMode.checked = applied.turkeyMode
    turkeyModeChange()
    elems.preset.disabled = true
    elems.presetId.disabled = true
    elems.complexity.disabled = true
    elems.enemyDrops.disabled = true
    elems.startingEquipment.disabled = true
    elems.itemLocations.disabled = true
    elems.prologueRewards.disabled = true
    elems.relicLocations.disabled = true
    elems.relicLocationsSet.disabled = true
    elems.stats.disabled = true
    elems.music.disabled = true
    elems.turkeyMode.disabled = true
    elems.clear.classList.remove('hidden')
    const baseUrl = url.origin + url.pathname
    window.history.replaceState({}, document.title, baseUrl)
  } else {
    loadOption('complexity', complexityChange, 7)
    loadOption('enemyDrops', enemyDropsChange, true)
    loadOption('startingEquipment', startingEquipmentChange, true)
    loadOption('itemLocations', itemLocationsChange, true)
    loadOption('prologueRewards', prologueRewardsChange, true)
    loadOption('relicLocations', relicLocationsChange, true)
    loadOption('stats', statsChange, true)
    loadOption('music', musicChange, true)
    loadOption('turkeyMode', turkeyModeChange, true)
    let relicLocationsExtension =
        localStorage.getItem('relicLocationsExtension')
    if (typeof(relicLocationsExtension) === 'string') {
      switch (relicLocationsExtension) {
      case constants.EXTENSION.GUARDED:
        elems.relicLocationsExtension.guarded.checked = true
        break
      case constants.EXTENSION.SPREAD:
        elems.relicLocationsExtension.spread.checked = true
        break
      case constants.EXTENSION.EQUIPMENT:
        elems.relicLocationsExtension.equipment.checked = true
        break
      case constants.EXTENSION.WANDERER:
        elems.relicLocationsExtension.wanderer.checked = true
        break
      case constants.EXTENSION.TOURIST:
        elems.relicLocationsExtension.tourist.checked = true
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
      presetId = 'casual'
    }
    let index = 0
    for (let i = 0; i < presets.length; i++) {
      if (presets[i].id === presetId) {
        elems.presetId.selectedIndex = index
        break
      }
      if (!presets.hidden) {
        index++
      }
    }
    presetIdChange()
    loadOption('preset', presetChange, true)
  }
  let path = url.pathname
  if (path.match(/index\.html$/)) {
    path = path.slice(0, path.length - 10)
  }
  if (isDev) {
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
  const output = localStorage.getItem('output')
  if (output === 'ppf') {
    elems.output.ppf.checked = true
  } else {
    elems.output.bin.checked = true
  }
  outputChange()
  loadOption('theme', themeChange, 'menu')
  loadOption('appendSeed', appendSeedChange, true)
  loadOption('showSolutions', showSolutionsChange, false)
  loadOption('showRelics', showRelicsChange, false)
  loadOption('tournamentMode', tournamentModeChange, false)
  loadOption('colorrandoMode', colorrandoModeChange, false)
  loadOption('magicmaxMode', magicmaxModeChange, false)
  loadOption('antiFreezeMode', antiFreezeModeChange, false)
  loadOption('mypurseMode', mypurseModeChange, false)
  loadOption('iwsMode', iwsModeChange, false)
  loadOption('fastwarpMode', fastwarpModeChange, false)
  loadOption('noprologueMode', noprologueModeChange, false)
  loadOption('unlockedMode', unlockedModeChange, false)
  loadOption('surpriseMode', surpriseModeChange, false)
  loadOption('enemyStatRandoMode', enemyStatRandoModeChange, false)
  loadOption('shopPriceRandoMode', shopPriceRandoModeChange, false)
  loadOption('accessibilityPatches', accessibilityPatchesChange, true)
  loadOption('showSpoilers', spoilersChange, true)
  setTimeout(function() {
    const els = document.getElementsByClassName('tooltip')
    Array.prototype.forEach.call(els, function(el) {
      el.classList.remove('hidden')
    })
  })
  presetIdChange()

})(typeof(window) !== 'undefined' ? window : null)
