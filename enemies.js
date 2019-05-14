(function(self) {

  const enemies = [{
    id: 1,
    name: 'Dracula',
    level: 0,
  }, {
    id: 2,
    name: 'Blood Skeleton',
    level: 0,
  }, {
    id: 3,
    name: 'Bat',
    level: 1,
  }, {
    id: 4,
    name: 'Stone Skull',
    level: 1,
  }, {
    id: 5,
    name: 'Zombie',
    level: 1,
  }, {
    id: 6,
    name: 'Merman',
    level: 2,
  }, {
    id: 7,
    name: 'Skeleton',
    level: 2,
  }, {
    id: 8,
    name: 'Warg',
    level: 2,
  }, {
    id: 9,
    name: 'Bone Scimitar',
    level: 3,
  }, {
    id: 10,
    name: 'Merman',
    level: 3,
  }, {
    id: 11,
    name: 'Spittle Bone',
    level: 3,
  }, {
    id: 12,
    name: 'Axe Knight',
    level: 4,
  }, {
    id: 13,
    name: 'Bloody Zombie',
    level: 4,
  }, {
    id: 14,
    name: 'Slinger',
    level: 4,
  }, {
    id: 15,
    name: 'Ouija Table',
    level: 5,
  }, {
    id: 16,
    name: 'Skelerang',
    level: 5,
  }, {
    id: 17,
    name: 'Thornweed',
    level: 5,
  }, {
    id: 18,
    name: 'Gaibon',
    level: 6,
  }, {
    id: 19,
    name: 'Ghost',
    level: 6,
  }, {
    id: 20,
    name: 'Marionette',
    level: 6,
  }, {
    id: 21,
    name: 'Slogra',
    level: 6,
  }, {
    id: 22,
    name: 'Diplocephalus',
    level: 7,
  }, {
    id: 23,
    name: 'Flea Man',
    level: 7,
  }, {
    id: 24,
    name: 'Medusa Head',
    level: 7,
  }, {
    id: 25,
    name: 'Blade Soldier',
    level: 8,
  }, {
    id: 26,
    name: 'Bone Musket',
    level: 8,
  }, {
    id: 27,
    name: 'Medusa Head',
    level: 8,
  }, {
    id: 28,
    name: 'Plate Lord',
    level: 8,
  }, {
    id: 29,
    name: 'Stone Rose',
    level: 8,
  }, {
    id: 30,
    name: 'Axe Knight',
    level: 9,
  }, {
    id: 31,
    name: 'Ctulhu',
    level: 9,
  }, {
    id: 32,
    name: 'Bone Archer',
    level: 10,
  }, {
    id: 33,
    name: 'Bone Pillar',
    level: 10,
  }, {
    id: 34,
    name: 'Doppleganger10',
    level: 10,
  }, {
    id: 35,
    name: 'Owl',
    level: 10,
  }, {
    id: 36,
    name: 'Phantom Skull',
    level: 10,
  }, {
    id: 37,
    name: 'Scylla wyrm',
    level: 10,
  }, {
    id: 38,
    name: 'Skeleton Ape',
    level: 10,
  }, {
    id: 39,
    name: 'Spear Guard',
    level: 10,
  }, {
    id: 40,
    name: 'Spellbook',
    level: 10,
  }, {
    id: 41,
    name: 'Winged Guard',
    level: 10,
  }, {
    id: 42,
    name: 'Ectoplasm',
    level: 11,
  }, {
    id: 43,
    name: 'Sword Lord',
    level: 11,
  }, {
    id: 44,
    name: 'Toad',
    level: 11,
  }, {
    id: 45,
    name: 'Armor Lord',
    level: 12,
  }, {
    id: 46,
    name: 'Corner Guard',
    level: 12,
  }, {
    id: 47,
    name: 'Dhuron',
    level: 12,
  }, {
    id: 48,
    name: 'Frog',
    level: 12,
  }, {
    id: 49,
    name: 'Frozen Shade',
    level: 12,
  }, {
    id: 50,
    name: 'Magic Tome',
    level: 12,
  }, {
    id: 51,
    name: 'Skull Lord',
    level: 12,
  }, {
    id: 52,
    name: 'Black Crow',
    level: 13,
  }, {
    id: 53,
    name: 'Blue Raven',
    level: 13,
  }, {
    id: 54,
    name: 'Corpseweed',
    level: 13,
  }, {
    id: 55,
    name: 'Flail Guard',
    level: 13,
  }, {
    id: 56,
    name: 'Flea Rider',
    level: 13,
  }, {
    id: 57,
    name: 'Spectral Sword',
    level: 13,
  }, {
    id: 58,
    name: 'Bone Halberd',
    level: 14,
  }, {
    id: 59,
    name: 'Scylla',
    level: 14,
  }, {
    id: 60,
    name: 'Hunting Girl',
    level: 15,
  }, {
    id: 61,
    name: 'Mudman',
    level: 15,
  }, {
    id: 62,
    name: 'Owl Knight',
    level: 15,
  }, {
    id: 63,
    name: 'Spectral Sword ',
    level: 15,
  }, {
    id: 64,
    name: 'Vandal Sword',
    level: 15,
  }, {
    id: 65,
    name: 'Flea Armor',
    level: 16,
  }, {
    id: 66,
    name: 'Hippogryph',
    level: 16,
  }, {
    id: 67,
    name: 'Paranthropus',
    level: 16,
  }, {
    id: 68,
    name: 'Slime',
    level: 16,
  }, {
    id: 69,
    name: 'Blade Master',
    level: 17,
  }, {
    id: 70,
    name: 'Wereskeleton',
    level: 17,
  }, {
    id: 71,
    name: 'Grave Keeper',
    level: 18,
  }, {
    id: 72,
    name: 'Gremlin',
    level: 18,
  }, {
    id: 73,
    name: 'Harpy',
    level: 18,
  }, {
    id: 74,
    name: 'Minotaurus',
    level: 18,
  }, {
    id: 75,
    name: 'Werewolf',
    level: 18,
  }, {
    id: 76,
    name: 'Bone Ark',
    level: 19,
  }, {
    id: 77,
    name: 'Valhalla Knight',
    level: 19,
  }, {
    id: 78,
    name: 'Cloaked knight',
    level: 20,
  }, {
    id: 79,
    name: 'Fishhead',
    level: 20,
  }, {
    id: 80,
    name: 'Lesser Demon',
    level: 20,
  }, {
    id: 81,
    name: 'Lossoth',
    level: 20,
  }, {
    id: 82,
    name: 'Salem Witch',
    level: 20,
  }, {
    id: 83,
    name: 'Blade',
    level: 21,
  }, {
    id: 84,
    name: 'Gurkha',
    level: 21,
  }, {
    id: 85,
    name: 'Hammer',
    level: 21,
  }, {
    id: 86,
    name: 'Discus Lord',
    level: 22,
  }, {
    id: 87,
    name: 'Karasuman',
    level: 22,
  }, {
    id: 88,
    name: 'Large Slime',
    level: 22,
  }, {
    id: 89,
    name: 'Hellfire Beast',
    level: 23,
  }, {
    id: 90,
    name: 'Cerberos',
    level: 24,
  }, {
    id: 91,
    name: 'Killer Fish',
    level: 25,
  }, {
    id: 92,
    name: 'Olrox',
    level: 25,
  }, {
    id: 93,
    name: 'Succubus',
    level: 25,
  }, {
    id: 94,
    name: 'Tombstone',
    level: 25,
  }, {
    id: 95,
    name: 'Venus Weed',
    level: 25,
  }, {
    id: 96,
    name: 'Lion',
    level: 27,
  }, {
    id: 97,
    name: 'Scarecrow',
    level: 27,
  }, {
    id: 98,
    name: 'Granfaloon',
    level: 28,
  }, {
    id: 99,
    name: 'Schmoo',
    level: 28,
  }, {
    id: 100,
    name: 'Tin man',
    level: 28,
  }, {
    id: 101,
    name: 'Balloon pod',
    level: 29,
  }, {
    id: 102,
    name: 'Yorick',
    level: 29,
  }, {
    id: 103,
    name: 'Bomb Knight',
    level: 30,
  }, {
    id: 104,
    name: 'Flying Zombie',
    level: 32,
  }, {
    id: 105,
    name: 'Bitterfly',
    level: 33,
  }, {
    id: 106,
    name: 'Jack O\'Bones',
    level: 33,
  }, {
    id: 107,
    name: 'Archer',
    level: 34,
  }, {
    id: 108,
    name: 'Werewolf',
    level: 34,
  }, {
    id: 109,
    name: 'Black Panther',
    level: 35,
  }, {
    id: 110,
    name: 'Darkwing Bat',
    level: 35,
  }, {
    id: 111,
    name: 'Dragon Rider',
    level: 35,
  }, {
    id: 112,
    name: 'Minotaur',
    level: 35,
  }, {
    id: 113,
    name: 'Nova Skeleton',
    level: 35,
  }, {
    id: 114,
    name: 'Orobourous',
    level: 35,
  }, {
    id: 115,
    name: 'White Dragon',
    level: 35,
  }, {
    id: 116,
    name: 'Fire Warg',
    level: 36,
  }, {
    id: 117,
    name: 'Rock Knight',
    level: 36,
  }, {
    id: 118,
    name: 'Sniper of Goth',
    level: 36,
  }, {
    id: 119,
    name: 'Spectral Sword',
    level: 36,
  }, {
    id: 120,
    name: 'Ghost Dancer',
    level: 37,
  }, {
    id: 121,
    name: 'Warg Rider',
    level: 37,
  }, {
    id: 122,
    name: 'Cave Troll',
    level: 38,
  }, {
    id: 123,
    name: 'Dark Octopus',
    level: 38,
  }, {
    id: 124,
    name: 'Fire Demon',
    level: 38,
  }, {
    id: 125,
    name: 'Gorgon',
    level: 38,
  }, {
    id: 126,
    name: 'Malachi',
    level: 39,
  }, {
    id: 127,
    name: 'Akmodan II',
    level: 40,
  }, {
    id: 128,
    name: 'Blue Venus Weed',
    level: 40,
  }, {
    id: 129,
    name: 'Doppleganger40',
    level: 40,
  }, {
    id: 130,
    name: 'Medusa',
    level: 40,
  }, {
    id: 131,
    name: 'The Creature',
    level: 40,
  }, {
    id: 132,
    name: 'Fake Grant',
    level: 41,
  }, {
    id: 133,
    name: 'Fake Trevor',
    level: 41,
  }, {
    id: 134,
    name: 'Imp',
    level: 41,
  }, {
    id: 135,
    name: 'Fake Sypha',
    level: 42,
  }, {
    id: 136,
    name: 'Beezelbub',
    level: 44,
  }, {
    id: 137,
    name: 'Azaghal',
    level: 45,
  }, {
    id: 138,
    name: 'Frozen Half',
    level: 45,
  }, {
    id: 139,
    name: 'Salome',
    level: 45,
  }, {
    id: 140,
    name: 'Richter Belmont',
    level: 48,
  }, {
    id: 141,
    name: 'Dodo Bird',
    level: 49,
  }, {
    id: 142,
    name: 'Galamoth',
    level: 50,
  }, {
    id: 143,
    name: 'Guardian',
    level: 60,
  }, {
    id: 144,
    name: 'Death',
    level: 66,
  }, {
    id: 145,
    name: 'Shaft',
    level: 88,
  }, {
    id: 146,
    name: 'Dracula',
    level: 98,
  }]

  const exports = enemies
  if (self) {
    self.sotnRando = Object.assign(self.sotnRando || {}, {
      enemies: exports,
    })
  } else {
    module.exports = exports
  }
})(typeof(self) !== 'undefined' ? self : null)
