function randomize(applied,rng) {
  try {
    let check
    let checksum
    let startTime
    let endTime
    let optFlag

    startTime = performance.now()
    const presets = require('./build/presets')
    const randomizeRelics = require('./src/randomize_relics')

    if (!argv.noSeed) {
      check = new util.checked(typeof(fd) === 'object' ? undefined : fd)
      try {
        if ('debug' in argv) {console.log('randomize | function: randomize | Check for overriding preset')}
        // Check for overriding preset.
        let override
        for (let preset of presets) {
          if (preset.override) {
            applied = preset.options()
            override = true
            break
          }
        }
        if ('debug' in argv) {console.log('randomize | function: randomize | Retrieve user-specified options')}
        // Get user specified options.
        if (!override) {
          applied = util.Preset.options(options)
        }
      } catch (err) {
        yargs.showHelp()
        console.error('\n' + err.message)
        process.exit(1)
      }
      try {
        let rng
        let result
        if ('debug' in argv) {console.log('randomize | function: randomize | Randomize stats')}
        // Randomize stats.
        rng = new require('seedrandom')(util.saltSeed(
          version,
          options,
          seed,
          0,
        ))
        result = randomizeStats(rng, applied)
        const newNames = result.newNames
        check.apply(result.data)
        if ('debug' in argv) {console.log('randomize | function: randomize | Randomize Relics:assemble workers')}
        // Randomize relics.
        const cores = os.cpus().length
        const workers = Array(util.workerCountFromCores(cores))
        for (let i = 0; i < workers.length; i++) {
          workers[i] = new Worker('./src/worker.js')
        }
        if ('debug' in argv) {console.log('randomize | function: randomize | Randomize Relics:call util function')}
        result = await util.randomizeRelics(
          version,
          applied,
          options,
          seed,
          newNames,
          workers,
          4,
        )
        util.mergeInfo(info, result.info)
        if ('debug' in argv) {console.log('randomize | function: randomize | Randomize Relics:Write new relic map')}
        // Write relics mapping.
        rng = new require('seedrandom')(util.saltSeed( //new rng generation?
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
        if ('debug' in argv) {console.log('randomize | function: randomize | Randomize Items:call util function')}
        // Randomize items.
        result = await util.randomizeItems(
          version,
          applied,
          options,
          seed,
          new Worker('./src/worker.js'),
          2,
          result.items,
          newNames,
        )
        if ('debug' in argv) {console.log('randomize | function: randomize | Randomize Items:Write new item map')}
        check.apply(result.data)
        util.mergeInfo(info, result.info)
        if ('debug' in argv) {console.log('randomize | function: randomize | Randomize Music')}
        // Randomize music.
        rng = new require('seedrandom')(util.saltSeed(
          version,
          options,
          seed,
          3,
        ))
        check.apply(randomizeMusic(rng, applied))
        if ('debug' in argv) {console.log('randomize | function: randomize | Apply options / writes function master')}
        // Start the function master
        let optWrite = 0x00000000                   // This variable lets the ASM used in the Master Function know if it needs to run certain code or sets flags for the tracker to use
        let nGoal
        // console.log(options.newGoalsSet + '|' + applied.newGoalsSet)
        if ('newGoals' in argv || options.newGoalsSet || applied.newGoalsSet) {                   // Sets flag for the tracker to know which goals to use
          if (argv.newgoals !== undefined) {
            nGoal = argv.newgoals
          } else if (applied.newGoalsSet !== undefined) {
            nGoal = applied.newGoalsSet
          } else if (options.newGoalsSet !== undefined) {
            nGoal = options.newGoalsSet
          }
          switch(nGoal) {
            case "b":                                 // all bosses flag
              optWrite = optWrite + 0x01
              break
            case "r":                                 // all relics flag
              optWrite = optWrite + 0x02
              break
            case "a":                                 //  all bosses and relics flag
              optWrite = optWrite + 0x03
              break
            case "v":                                 //  all bosses and vlad relics flag
            case "x":                                 //  all bosses and bounties flag
              optWrite = optWrite + 0x05
              break
            default:
              break
          }
          // console.log('optwrite ' + optWrite)
        }
        // Apply Godspeed Shoes Patches
        if ('godspeed' in argv || options.godspeedMode || applied.godspeedMode) {
          optWrite = optWrite + 0x80000000
        }
        check.apply(util.randoFuncMaster(optWrite))
        check.apply(util.applySplashText(rng))
        if ('debug' in argv) {console.log('randomize | function: randomize | Apply patches from options')}
        optFlag = false
        if (options.tournamentMode) {
          // Apply tournament mode patches.
          optFlag = true
          check.apply(util.applyTournamentModePatches())
        }
        if ('debug' in argv) {console.log('randomize | function: randomize | Tournament Mode | ' + optFlag)}
        optFlag = false
        if (options.magicmaxMode || applied.magicmaxMode) { // Adds MP Vessel to replace Heart Vessel - eldrich
          // Apply magic max mode patches. - MottZilla
          optFlag = true
          check.apply(util.applyMagicMaxPatches())
        }
        if ('debug' in argv) {console.log('randomize | function: randomize | Magicmax Mode | ' + optFlag)}
        optFlag = false
        if (options.antiFreezeMode || applied.antiFreezeMode) { // Removes screen freezes on relic / vessel collection and level-up - eldrich
          // Apply anti-freeze mode patches. - eldri7ch
          optFlag = true
          check.apply(util.applyAntiFreezePatches())
        }
        if ('debug' in argv) {console.log('randomize | function: randomize | Anti-Freeze Mode | ' + optFlag)}
        optFlag = false
        if (options.mypurseMode || applied.mypurseMode) { // Removes Death from Entrance - eldrich
          // Apply Death repellant patches. - eldri7ch
          optFlag = true
          check.apply(util.applyMyPursePatches())
        }
        if ('debug' in argv) {console.log('randomize | function: randomize | That\'s my purse! Mode | ' + optFlag)}
        optFlag = false
        if (options.iwsMode || applied.iwsMode) { // Makes wing smash essentially infinite - eldrich
          // Apply infinite wing smashe mode patches. - eldri7ch
          optFlag = true
          check.apply(util.applyiwsPatches())
        }
        if ('debug' in argv) {console.log('randomize | function: randomize | Infinite Wing Smash Mode | ' + optFlag)}
        optFlag = false
        if (options.fastwarpMode || applied.fastwarpMode) { // Quickens teleporter warp animations - eldrich
          // Apply fast warp mode patches. - eldri7ch
          optFlag = true
          check.apply(util.applyfastwarpPatches())
        }
        if ('debug' in argv) {console.log('randomize | function: randomize | Fast Warps Mode | ' + optFlag)}
        optFlag = false
        if (options.noprologueMode || applied.noprologueMode) { // removes prologue - eldrich
          // Apply no prologue mode patches. - eldri7ch
          optFlag = false
          check.apply(util.applynoprologuePatches())
        }
        if ('debug' in argv) {console.log('randomize | function: randomize | No Prologue Mode | ' + optFlag)}
        optFlag = false
        if (options.unlockedMode || applied.unlockedMode) { // Unlocks shortcuts - eldrich
          // Apply unlocked mode patches. - eldri7ch
          optFlag = true
          check.apply(util.applyunlockedPatches())
        }
        if ('debug' in argv) {console.log('randomize | function: randomize | Unlocked Mode | ' + optFlag)}
        optFlag = false
        if (options.surpriseMode || applied.surpriseMode) { // Hides relics behind the same sprite - eldrich
          // Apply surprise mode patches. - eldri7ch
          optFlag = true
          check.apply(util.applysurprisePatches())
        }
        if ('debug' in argv) {console.log('randomize | function: randomize | Surprise Mode | ' + optFlag)}
        optFlag = false
        if (options.enemyStatRandoMode || applied.enemyStatRandoMode) { // Randomizes enemy stats - eldrich
          // Apply Enemy Stat Rando mode patches. - eldri7ch
          optFlag = true
          rng = new require('seedrandom')(util.saltSeed(
            version,
            options,
            seed,
            0,
          ))
          check.apply(util.applyenemyStatRandoPatches(rng))
        }
        if ('debug' in argv) {console.log('randomize | function: randomize | Enemy Stat Randomizer Mode | ' + optFlag)}
        optFlag = false
        if (options.shopPriceRandoMode || applied.shopPriceRandoMode) { // Randomizes shop prices - eldrich
          // Apply shop price Rando mode patches. - eldri7ch
          optFlag = true
          rng = new require('seedrandom')(util.saltSeed(
            version,
            options,
            seed,
            0,
          ))
          check.apply(util.applyShopPriceRandoPatches(rng))
        }
        if ('debug' in argv) {console.log('randomize | function: randomize | Shop Price Randomizer Mode | ' + optFlag)}
        optFlag = false
        if (options.startRoomRandoMode || applied.startRoomRandoMode || options.startRoomRando2ndMode || applied.startRoomRando2ndMode) { // Randomizes starting room - eldrich & MottZilla
          // Apply starting room Rando mode patches. - eldri7ch
          optFlag = true
          rng = new require('seedrandom')(util.saltSeed(
            version,
            options,
            seed,
            0,
          ))
          let castleFlag = 0x00
          if (options.startRoomRandoMode || applied.startRoomRandoMode) {
            castleFlag = castleFlag + 0x01
          }
          if (options.startRoomRando2ndMode || applied.startRoomRando2ndMode) {
            castleFlag = castleFlag + 0x10
          }
          check.apply(util.applyStartRoomRandoPatches(rng,castleFlag))
        }
        if ('debug' in argv) {console.log('randomize | function: randomize | Starting Room Randomizer Mode | ' + optFlag)}
        optFlag = false
        if (options.dominoMode || applied.dominoMode) { // Guarantees drops - eldrich
          // Apply guaranteed drops patches. - eldri7ch
          optFlag = true
          check.apply(util.applyDominoPatches())
        }
        if ('debug' in argv) {console.log('randomize | function: randomize | Guaranteed Drops Mode | ' + optFlag)}
        optFlag = false
        if (options.rlbcMode || applied.rlbcMode) { // reverse library cards - eldrich
          // Apply reverse library card patches. - eldri7ch
          optFlag = true
          check.apply(util.applyRLBCPatches())
        }
        if ('debug' in argv) {console.log('randomize | function: randomize | Reverse Library Card Mode | ' + optFlag)}
        optFlag = false
        if (options.immunityPotionMode || applied.immunityPotionMode) { // todo: Change this to Resist to Immune Potions "mode" or option. 
          // Apply resist to immune potion patches. - MottZilla
          optFlag = true
          check.apply(util.applyResistToImmunePotionsPatches())
        }
        if ('debug' in argv) {console.log('randomize | function: randomize | Immunity Potions Mode | ' + optFlag)}
        optFlag = false
        if (options.godspeedMode || applied.godspeedMode) { // godspeed shoes - eldrich
          optFlag = true
        }
        if ('debug' in argv) {console.log('randomize | function: randomize | Godspeed Mode | ' + optFlag)}
        optFlag = false
        if (options.bossMusicSeparation || applied.bossMusicSeparation) { // reverse library cards - eldrich
          // verify boss music separate. - eldri7ch
          optFlag = true
        }
        if ('debug' in argv) {console.log('randomize | function: randomize | Boss Music Separator | ' + optFlag)}
        optFlag = false
        if ('mapcolor' in argv) { // Colors the map - eldrich
          // Apply map color patches. - eldri7ch
          let mapcol = argv.mapcolor
          check.apply(util.applyMapColor(mapcol))
        }
        if ('debug' in argv) {console.log('randomize | function: randomize | Map colors')}
        optFlag = false
        if (options.newGoalsSet || applied.newGoalsSet) { // changes the goals - eldrich
          // Apply new goal patches. - eldri7ch
          if (options.newGoalsSet !== undefined){
            nGoal = options.newGoalsSet
          } else {
            nGoal = applied.newGoalsSet
          }
          if (nGoal = "h") {
            check.apply(util.applyBountyHunterTargets(rng,0))                 // 0 = normal Bounty Hunter; 1 = buffed drop rates and guaranteed relics after card obtained
          } else if (nGoal = "t") {
            check.apply(util.applyBountyHunterTargets(rng,2))                 // 0 = normal Bounty Hunter; 1 = buffed drop rates and guaranteed relics after card obtained
          } else if (nGoal = "w") {
            check.apply(util.applyBountyHunterTargets(rng,1))                 // 0 = normal Bounty Hunter; 1 = buffed drop rates and guaranteed relics after card obtained
          }else if (nGoal = "x") {
            check.apply(util.applyNewGoals(nGoal))
            check.apply(util.applyBountyHunterTargets(rng,2))                 // 0 = normal Bounty Hunter; 1 = buffed drop rates and guaranteed relics after card obtained
          } else {
            check.apply(util.applyNewGoals(nGoal))
          }
        }
        if ('debug' in argv) {console.log('randomize | function: randomize | New Goals')}
        if ('alucardPalette' in argv) { // Changes Alucard's Palette. -Crazy4blades
          // Apply new goal patches. - eldri7ch
          let alColP = argv.alucardPalette
          check.apply(util.applyAlucardPalette(alColP))
        }
        if ('debug' in argv) {console.log('randomize | function: randomize | Alucard Palette')}
        if ('alucardLiner' in argv) { // Changes Alucard's Palette. -Crazy4blades
          // Apply new goal patches. - eldri7ch
          let alColL = argv.alucardLiner
          check.apply(util.applyAlucardLiner(alColL))
        }
        if ('debug' in argv) {console.log('randomize | function: randomize | Alucard Liner')}
        if ('debug' in argv) {console.log('randomize | function: randomize | Apply Writes')}
        // Apply writes.
        check.apply(util.applyWrites(rng, applied))
      } catch (err) {
        if ('debug' in argv) {console.log('randomize | function: randomize | Error catching')}
        console.error('Seed: ' + seed)
        if (errors.isError(err)) {
          console.error('Error: ' + err.message)
        } else {
          console.error(err.stack)
        }
        process.exit(1)
      }
      if ('debug' in argv) {console.log('randomize | function: randomize | Set seed text in menu')}
      util.setSeedText(
        check,
        seed,
        version,
        options.preset,
        options.tournamentMode,
      )
      checksum = await check.sum()
      if ('debug' in argv) {console.log('randomize | function: randomize | Checksum verification')}
      // Verify expected checksum matches actual checksum.
      if (haveChecksum && expectChecksum !== checksum) {
        console.error('Checksum mismatch.')
        process.exit(1)
      }
    }
    if ('debug' in argv) {console.log('randomize | function: randomize | Accessibility patches')}
    if (!argv.disableAccessibilityPatches) {
      // Apply accessibility patches.
      check.apply(applyAccessibilityPatches())
    }
    if ('debug' in argv) {console.log('randomize | function: randomize | Show url if provided as arg')}
    // Show url if not provided as arg.
    if ('url' in argv && !argv._[0] && !argv.quiet) {
      console.log(util.optionsToUrl(
        version,
        options,
        checksum || '',
        seed || '',
        baseUrl,
      ))
    }
    if ('debug' in argv) {console.log('randomize | function: randomize | Show spoilers')}
    // Print spoilers.
    if (argv.verbose > 0) {
      let verbose = argv.verbose
      if (options.tournamentMode && argv.verbose >= 2) {
        verbose = 2
      }
      if ('debug' in argv && argv.verbose <= 4) {
        verbose = 4
      }
      const text = util.formatInfo(info, verbose)

      //start calculating the time elapsed
      endTime = performance.now();
      var timeDiff = endTime - startTime; //in ms 
      // strip the ms 
      timeDiff /= 1000; 
  
      // get the time 
      var time = Math.round(timeDiff);
      var minutes = Math.floor(time / 60)
      var seconds = time - minutes * 60;

      if (text.length) {
        console.log("Generation time: " + minutes + ":" + seconds)
        console.log(text)
      }
    }
    if (!argv.noSeed) {
      if ('out' in argv) {
        if ('debug' in argv) {console.log('Continue debug output:')}
        if ('debug' in argv) {console.log('randomize | function: randomize | Check if BIN input, if not, use PPF')}
        if ('inBin' in argv) {
          // If is not an in-place randomization, apply writes to the buffer
          // containing the disc image bytes.
          const writer = new util.checked(fd)
          writer.apply(check)
        } else {
          // Otherwise, write patch file.
          const patch = check.toPatch(
            seed,
            options.preset,
            options.tournamentMode,
          )
          fs.writeFileSync(argv.out, patch)
        }
      }
      if ('debug' in argv) {console.log('randomize | function: randomize | Write error detection')}
      // Write error detection codes.
      if (fd) {
        eccEdcCalc(fd, size, true)
      }
      if ('debug' in argv) {console.log('randomize | function: randomize | Output BIN')}
      // Write randomized bin.
      if (typeof(fd) === 'object') {
        fs.writeFileSync(argv.out, fd)
      }
    }
  } finally {
    if ('debug' in argv) {console.log('randomize | function: randomize | Wrap-up')}
    if (typeof(fd) === 'number') {
      fs.closeSync(fd)
    }
  }
}