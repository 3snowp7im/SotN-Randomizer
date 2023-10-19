(function(window) {
  const changelogObject = new Map();
  const container = document.querySelector("#changelog");

  const log2023 = {
    "April 2, 2023": [
      'Add Rat Race preset'
    ],
    "March 15, 2023": [
      "Update tournament mode to include free shop relic and open clock room statue",
      "Update accessibility mode to patch soft locks at Olrox, Scylla, and Minotaur & Werewolf",
      "Update accessibility mode to patch soft locks at Olrox, Scylla, and Minotaur & Werewolf"
    ]
  };
  changelogObject.set("2023", log2023);

  const log2022 = {
    "October 5, 2022": [
      "Prevent Clock Tower puzzle softlock in Equipment extension",
    ],
    "July 20, 2022": [
      "Add Warlock preset"
    ],
    "July 9, 2022": [
      "Add Expedition preset",
      "Add Lycanthrope preset"
    ],
    "April 20, 2022": ["Add Nimble preset"],
    "April 2, 2022": ["Add Third Castle preset"],
    "February 24, 2022": ["Fix stat randomization for club weapons"],
    "January 11, 2022": ["Add Guarded O.G. preset"]
  };
  changelogObject.set("2022", log2022);

  const log2021 = {
    "December 26, 2021": ["Add Spread relic locations extension", "Add Bat Master preset"],
    "May 17, 2021": ["Use Guarded relic locations for Casual preset"],
    "April 27, 2021": ["Reject disc images that are not valid, vanilla backups"],
    "April 2, 2021": ["Add Gem Farmer preset"],
    "March 12, 2021": ["Add O.G. preset"],
    "February 27, 2021": ["Add item stats randomization"],
    "February 15, 2021": ["Add PPF output option"],
    "February 7, 2021": ["Add Trio as a possible relic location in Guarded and Equipment extensions"],
    "January 18, 2021": ["Add Thrust Sword logic to Speedrun preset", "Increase minimum complexities for Safe and Adventure presets"]
  };
  changelogObject.set("2021", log2021);

  const log2020 = {
    "September 19, 2020": ["Add Tournament Mode"],
    "August 11, 2020": ["Add Scavenger preset"],
    "August 7, 2020": ["Make Leap Stone a 0-relic check in Speedrun preset"],
    "July 27, 2020": ["Add music randomizer"],
    "July 10, 2020": ["Fix escape requirements not being honored when a location is empty"],
    "June 22, 2020": ["Add Jewel of Open + Soul of Wolf + Leap Stone as Gold Ring location lock for Speedrun preset"],
    "June 3, 2020": ["Fix duped progression item in Cave"],
    "May 26, 2020": ["Add Forbidden Library Opal location to Adventure preset"],
    "April 30, 2020": ['Add Pixie singing "Nocturne" when sitting in a chair'],
    "April 25, 2020": [
      "Increase worker performance",
      "Add <a href='/faq'>FAQ</a>"
    ],
    "April 21, 2020": [
      "Add Jewel of Open + Soul of Wolf + Skill of Wolf to Gold Ring location locks in Speedrun preset",
      "Fix missing cape color layer"
    ],
    "April 17, 2020": [
      "Add solutions to spoiler log",
      "Increase minimum complexities"
    ],
    "April 12, 2020": [
      "Prevent generation of seeds that softlock at Holy Glasses",
      "Show preset ID at file select menu",
      "Increase minimum complexities"
    ],
    "April 10, 2020": [
      'Add "Menu" theme'
    ],
    "April 8, 2020": [
      "Add multithreaded seed generation strategy"
    ],
    "April 5, 2020": [
      "Add Sprite and Nosedevil familiars in Guarded and Equipment extensions"
    ],
    "April 3, 2020": ["Add Speedrun preset", "Randomize all cape colors", "Fix erasing Ring of Vlad location"],
    "April 2, 2020": ["Add Adventure preset", "Add Empty hand preset", "Add night mode"],
    "March 31, 2020": ["Fix exception when replacing Holy Glasses with relic"],
    "March 30, 2020": ["Fix gold ring duping"],
    "March 29, 2020": ["Fix progression item duping at relic bosses", "Fix missing progression item at Scylla"],
    "March 28, 2020": ["Fix information leak of progression item randomization", "Fix progression item randomization in Outer Wall"],
    "March 27, 2020": ["Add progression item randomization", "Fix icons of equipment stolen by Death"],
    "March 17, 2020": ["Fix disappearing items"],
    "March 15, 2020": ["Fix duping item that replaces Cube of Zoe"],
    "March 13, 2020": ["Fix relic placement in miscellaneous presets", "Fix missing replacement item at Soul of Bat", "Add extra agony to agonize preset"],
    "March 12, 2020": ["Add relic locations extension with new Guarded option", "Fix softlock in Lesser Demon fight"],
    "March 4, 2020": ["Add Joseph's Cloak color randomization to Turkey Mode"],
    "February 27, 2020": ["Fix relic duping when performing glitches"],
    "February 5, 2020": ["Update links section"]
  }
  changelogObject.set("2020", log2020);

  const log2019 = {
    "October 26, 2019": [
      '"The Manly Update": Add Jewel + Power + Wolf to locks on Demon Card location',
      "Add extra agony to agonize preset"
    ],
    "October 1, 2019": ["Fix some candles not being randomized", "Add extra agony to agonize preset"],
    "August 15, 2019": ["Fix crash related to transfering data to web worker"],
    "August 11, 2019": [
      "Fix uncurse being placed in random candles",
      "Add support for custom enemy drops from enemies that have no vanilla drops"
    ],
    "May 23, 2019": [
      "Add support for custom enemy drops, starting equipment, item locations, and prologue rewards",
      'Deprecate relic logic selector in favor of <a href="https://github.com/3snowp7im/SotN-Randomizer#presets">presets</a>'
    ],
    "May 11, 2019": ["Add selector for built-in relic logic schemes"],
    "May 8, 2019": ["Add support for custom relic logic"],
    "May 3, 2019": ["Add file input as alternative to drag API"],
    "April 30, 2019": ["Use web worker"],
    "April 28, 2019": ["Add drop randomization"],
    "April 23, 2019": ["Add checksum verification"],
    "April 22, 2019": ["Add turkey mode"],
    "April 20, 2019": [
      "Add candle randomization",
      "Add prologue reward item randomization",
      "Add Axe Lord and Luck Mode starting equipment randomization",
      "Add copy seed button"
    ],
    "April 15, 2019": [
      "Display seed at file select menu",
      "Distribute jewel types with same frequency as vanilla"
    ],
    "April 14, 2019": [
      "Add option to show relic locations in spoilers"
    ],
    "April 13, 2019": ["Fix Maria cutscene skip in Richter mode"],
    "April 11, 2019": [
      "Remove Maria cutscene in Marble Gallery to avoid confusion",
      "Add spoilers option"
    ],
    "April 8, 2019": [
      "Fix bug that allowed salable gems to be sold in shop menu",
      "Items are now placed by type with same frequency as vanilla"
    ],
    "April 7, 2019": ["Add item location randomization"],
    "April 5, 2019": [
      'Add <a href="relics">relic distribution</a> (thx Soba)',
      "Fix relic duping in Medusa room",
      "Fix shop relic name not being updated in shop menu",
      "Produce more uniform relic distribution (thx Soba)"
    ],
    "April 4, 2019": [
      "Remove Maria cutscene in Alchemy Lab to avoid softlock",
      "Fix 2nd castle relic locations (thx Soba)",
      "Fix randomized equipment by same type"
    ],
    "April 3, 2019": [
      "Fix random seed not being reproducible",
      "Fix crash after Scylla fight",
      "Fix faerie scroll duping",
      "Fix same seed causes different randomizations"
    ],
    "April 2, 2019": [
      "Fix equipment randomization",
      "Fix bug that allowed bat relic to be placed in 2nd castle without ability to get spike breaker armor",
      "Download file name contains seed value"
    ],
    "April 1, 2019": [
      "Fix shop relic glitch",
      "Fix relic duping in clock tower and outer wall"
    ],
    "March 31, 2019": ["Add equipment location randomization"],
    "March 28, 2019": ["Add starting equipment randomization"],
    "March 27, 2019": [
      `Ported setz's <a href="https://github.com/josephstevenspgh/SotN-Relic-Randomizer">relic randomizer</a> to javascript`
    ]
  };
  changelogObject.set("2019", log2019);

  const accordion = document.createElement("div");
  accordion.className = "accordion";

  changelogObject.forEach((log, key) => {
    const keys = Object.keys(log);
    const tab = document.createElement("div");
    tab.className = "tab";
    tab.innerHTML = `
      <input type="radio" name="test" id="${key}">
      <label for="${key}" class="tab__label">
        <h3>${key} (${keys.length})</h3>
      </label>
    `;

    keys.forEach(k => {
      const content = document.createElement("div");
      content.className = "tab__content";
      content.innerHTML = `
      <h4>${k}</h4>
      <ul>
        ${log[k].reduce((acc, t) => acc += `<li>${t}</li>`, "")}
      </ul>`;
      tab.append(content);
    });
    accordion.append(tab);
  });

  container.append(accordion);
})(typeof(window) !== 'undefined' ? window : null)
