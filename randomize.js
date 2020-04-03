const fs = require('fs')
const path = require('path')
const constants = require('./constants')
const errors = require('./errors')
const extension = require('./extension')
const presets = require('./presets')
const randomizeItems = require('./randomize_items')
const randomizeRelics = require('./randomize_relics')
const relics = require('./relics')
const util = require('./util')
let version = require('./package').version

const optionsHelp = [
  'The options string may contain any of the following:',
  '  "P" for preset (`--help preset`)',
  '  "d" for enemy drops (`--help drops`)',
  '  "e" for starting equipment (`--help equipment`)',
  '  "i" for item locations (`--help items`)',
  '  "p" for prologue rewards (`--help rewards`)',
  '  "r" for relic locations (`--help relics`)',
  '  "t" for turkey mode',
  '',
  'The default randomization mode is "'
    +  constants.defaultOptions
    + '", which randomizes everything.',
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
  '  d[:<enemy>[-<level>][:[<item>][-[<item>]]][:...]',
  '',
  'Enemies and items are specified by removing any non-alphanumeric',
  'characters from their name. Enemies with the same name can be dis-',
  'ambiguated by specifying their level.',
  '',
  'A wildcard character ("*") can be used to replace items for all enemies.',
  '',
  'Examples:',
  '  d:Zombie:Cutlass-Bandana  Zombie drops Cutlass and Bandana',
  '  d:Slinger:-Orange         Replace Slinger rare drop with orange',
  '  d:MedusaHead-8:           Medusa Head level 8 drops nothing',
  '  d:*:Grapes-Potion         Every enemy drops Grapes and Potion',
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
  '  e[:<slot>[:<item>]][:...]',
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
  '  i[:<zone>:<item>[-<index>]:<replacement>][:...]',
  '',
  'Items are specified by removing any non-alphanumeric characters from',
  'their name. If a zone contains multiple occurences of the same item,',
  'it can be disambuated by specifying its index.',
  '',
  'A wildcard character ("*") can be used for the zone and/or the item. When',
  'used as the zone, the replacement will occur in every zone. When used as',
  'the item, every item will be replaced.',
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
  '  i:NO3:PotRoast:LibraryCard  Replace Pot Roast with Library Card',
  '  i:TOP:Turkey-2:Peanuts      Replace 2nd Turkey with Peanuts',
  '  i:CAT:*:Orange              Replace every item in Catacombs with Orange',
  '  i:*:MannaPrism:Potion       Replace every Manna Prism with Potion',
  '  i:*:*:Grapes                Replace every item with Grapes',
  '',
  'If other randomization options follow an item, they must also be',
  'separated from the item with a comma:',
  '  $0 -o i:TOP:Turkey-2:Peanuts,dpt',
].join('\n')

const rewardsHelp = [
  'Prologue reward randomization can be toggled with the "p" switch.',
  'Rewards may be specified using argument syntax.',
  '',
  'Rewards format:',
  '  p[:<reward>[:<item>]][:...]',
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
  'and custom relic location locks may be specified using argument syntax.',
  '',
  'A relic location lock sets the abilities required to access a relic',
  'location. Each relic location may be guarded by multiple locks, and the',
  'location will be open to the player once they have all abilities',
  'comprising any single lock.',
  '',
  'Relics format:',
  '  r[:<location>[:<abilities>[-<abilities>...]][:...]',
  '',
  'Relic locations and the abilities they provide are identified by one',
  'letter:',
  '  (' + constants.RELIC.SOUL_OF_BAT + ') Soul of Bat',
  '  (' + constants.RELIC.FIRE_OF_BAT + ') Fire of Bat',
  '  (' + constants.RELIC.ECHO_OF_BAT + ') Echo of Echo',
  '  (' + constants.RELIC.FORCE_OF_ECHO + ') Force of Echo',
  '  (' + constants.RELIC.SOUL_OF_WOLF + ') Soul of Wolf',
  '  (' + constants.RELIC.POWER_OF_WOLF + ') Power of Wolf',
  '  (' + constants.RELIC.SKILL_OF_WOLF + ') Skill of Wolf',
  '  (' + constants.RELIC.FORM_OF_MIST + ') Form of Mist',
  '  (' + constants.RELIC.POWER_OF_MIST + ') Power of Mist',
  '  (' + constants.RELIC.GAS_CLOUD + ') Gas Cloud',
  '  (' + constants.RELIC.CUBE_OF_ZOE + ') Cube of Zoe',
  '  (' + constants.RELIC.SPIRIT_ORB + ') Spirit Orb',
  '  (' + constants.RELIC.GRAVITY_BOOTS + ') Gravity Boots',
  '  (' + constants.RELIC.LEAP_STONE + ') Leap Stone',
  '  (' + constants.RELIC.HOLY_SYMBOL + ') Holy Symbol',
  '  (' + constants.RELIC.FAERIE_SCROLL + ') Faerie Scroll',
  '  (' + constants.RELIC.JEWEL_OF_OPEN + ') Jewel of Open',
  '  (' + constants.RELIC.MERMAN_STATUE + ') Merman Statue',
  '  (' + constants.RELIC.BAT_CARD + ') Bat Card',
  '  (' + constants.RELIC.GHOST_CARD + ') Ghost Card',
  '  (' + constants.RELIC.FAERIE_CARD + ') Faerie Card',
  '  (' + constants.RELIC.DEMON_CARD + ') Demon Card',
  '  (' + constants.RELIC.SWORD_CARD + ') Sword Card',
  '  (' + constants.RELIC.HEART_OF_VLAD + ') Heart of Vlad',
  '  (' + constants.RELIC.TOOTH_OF_VLAD + ') Tooth of Vlad',
  '  (' + constants.RELIC.RIB_OF_VLAD + ') Rib of Vlad',
  '  (' + constants.RELIC.RING_OF_VLAD + ') Ring of Vlad',
  '  (' + constants.RELIC.EYE_OF_VLAD + ') Eye of Vlad',
  '  (' + constants.RELIC.SPIKE_BREAKER + ') Spike Breaker',
  '  (' + constants.RELIC.SILVER_RING + ') Silver Ring',
  '  (' + constants.RELIC.GOLD_RING + ') Gold Ring',
  '  (' + constants.RELIC.HOLY_GLASSES + ') Holy Glasses',
  '',
  'Examples:',
  '  r:B:L      Soul of Bat relic location requires Leap Stone.',
  '  r:y:LV-MP  Holy Symbol relic location requires Leap Stone + Gravity',
  '             Boots OR Form of Mist + Power of Mist.',
  '',
  'Locks for different location can be specified by separating each',
  'location by a colon:',
  '  r:B:L:y:LV-MP',
  '',
  'An optional complexity target can specify a set of abilities that are',
  'considered win conditions. A minimum and maximum complexity depth specify',
  'how many relics must be obtained in series to unlock a win condition:',
  '  r:3:LV-MP    Leap Stone + Gravity Boots OR Form of Mist + Power of Mist',
  '               required to complete seed with a minimum depth of 3.',
  '  r:3-5:LV-MP  Silver + Gold ring required to complete seed with a minimum',
  '               depth of 3 and a maximum depth of 5.',
  '',
  'If other randomization options follow a lock, they must also be',
  'separated from the lock with a comma:',
  '  $0 -o r:B:L:y:LG-MP,dpt',
].join('\n')

const presetHelp = [
  'Presets specify collection of randomization options. A preset is enabled',
  'by using argument syntax.',
  '',
  'Preset format:',
  '  P:<preset>',
  '',
  'This randomizer has several built-in presets:',
].concat(presets.map(function(meta) {
  return '  ' + meta.id + (meta.id === 'safe' ? ' (default)' : '')
})).concat([
  '',
  'Use `--help <preset>` for information on a specific scheme.',
  '',
  'Examples:',
  '  P:safe     Use safe preset.',
  '  P:agonize  Use agonize preset.',
]).join('\n')

function presetMetaHelp(preset) {
  const options = preset.options()
  let locations = relics
  const extensions = []
  switch (options.relicLocationsExtension) {
  case constants.EXTENSION.EQUIPMENT:
    extensions.push(constants.EXTENSION.EQUIPMENT)
  case constants.EXTENSION.GUARDED:
    extensions.push(constants.EXTENSION.GUARDED)
  }
  const extendedLocations = extension.locations.filter(function(location) {
    return extensions.indexOf(location.extension) !== -1
  })
  locations = locations.concat(extendedLocations)
  locations = locations.map(function(location) {
    let id
    if ('ability' in location) {
      id = location.ability
    } else {
      id = location.name
    }
    return {
      id: id,
      name: location.name,
      ability: location.ability,
    }
  })
  let info = [
    preset.name + ' by ' + preset.author,
    preset.description,
    '',
  ].concat(locations.map(function(location) {
    let label
    if (location.ability) {
      label = '  (' + location.ability + ') ' + location.name.slice(0, 21)
    } else {
      label = '      ' + location.name.slice(0, 21)
    }
    label += Array(28).fill(' ').join('')
    return label.slice(0, 28) + location.id.replace(/[^a-zA-Z0-9]/g, '') + ':'
      + (options.relicLocations[location.id] ?
         options.relicLocations[location.id].join('-') : '')
  }))
  const keys = Object.getOwnPropertyNames(options.relicLocations)
  const target = keys.filter(function(key) {
    return /^[0-9]+(-[0-9]+)?$/.test(key)
  }).pop()
  if (target) {
    const parts = target.split('-')
    info.push('')
    info.push('  Complexity target: '
              + parts[0] + ' <= depth'
              + (parts.length === 2 ? ' <= ' + parts[1] : ''))
    info.push('  Goals: ' + options.relicLocations[target].join('-'))
  }
  return info.join('\n')
}

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
  .option('compat', {
    type: 'string',
    requiresArg: true,
  })
  .hide('compat')
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
// Require at least one argument.
if (process.argv.length < 3) {
  yargs.showHelp()
  console.error('\nAt least 1 argument or option required')
  process.exit(1)
}
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
  presets.forEach(function(meta) {
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
if (argv.compat) {
  version = argv.compat
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
    if (expectChecksum) {
      haveChecksum = true
    }
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
if ('verbose' in argv) {
  options.verbose = argv.verbose
}
info = util.newInfo()
// Set seed.
require('seedrandom')(util.saltSeed(
  version,
  options,
  seed,
), {global: true})
// Add seed to log info if not provided through command line.
if (!('url' in argv) || argv._[0]) {
  info[1]['Seed'] = seed
}
let fd
let size
// Read bin file if provided.
if ('bin' in argv) {
  eccEdcCalc = require('./ecc-edc-recalc-js')
  const stats = fs.statSync(argv.bin)
  size = stats.size
  fd = fs.openSync(argv.bin, 'r+')
}
try {
  const check = new util.checked(fd)
  let returnVal = true
  let applied
  try {
    applied = util.Preset.options(options)
  } catch (err) {
    yargs.showHelp()
    console.error('\n' + err.message)
    process.exit(1)
  }
  try {
    const removed = randomizeItems.placePlannedItems(applied)
    randomizeRelics.randomizeRelics(check, applied, removed, info)
    randomizeItems.randomizeItems(check, applied, info)
  } catch (err) {
    console.error('Seed:  ' + seed)
    if (errors.isError(err)) {
      console.error('Error: ' + err.message)
      process.exit(1)
    }
    throw err
  }
  util.setSeedText(check, seed)
  const checksum = check.sum()
  // Verify expected checksum matches actual checksum.
  if (haveChecksum && expectChecksum !== checksum) {
    console.error('Checksum mismatch.')
    process.exit(1)
  }
  // Show url if not provided as arg.
  if ('url' in argv && !argv._[0]) {
    console.log(util.optionsToUrl(
      version,
      options,
      checksum,
      seed,
      baseUrl,
    ).toString())
  }
  if (argv.verbose >= 1) {
    const text = util.formatInfo(info, argv.verbose)
    if (text.length) {
      console.log(text)
    }
  }
  if (fd) {
    eccEdcCalc(fd, size)
  }
} finally {
  if (fd) {
    fs.closeSync(fd)
  }
}
