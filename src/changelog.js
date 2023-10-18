(function(window) {
  // console.log(window);
  // changelogObject.set('2023', {});
  // changelogObject.set('2022', {});
  // changelogObject.set('2021', {});
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

  const accordion = document.createElement("div");
  accordion.className = "accordion";

  changelogObject.forEach((log, key) => {
    console.log(log);
    const keys = Object.keys(log);
    const tab = document.createElement("div");
    tab.className = "tab";
    tab.innerHTML = `
      <input type="radio" name="test" id="${key}">
      <label for="${key}" class="tab__label">
        <h3>${key}</h3>
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
