(function(self) {

  const enemies = [{
    id: 1,
    name: 'Dracula',
    level: 0,
    dropAddresses: [ 0x000b766a, 0x000b766c ],
  }, {
    id: 2,
    name: 'Blood Skeleton',
    level: 0,
    dropAddresses: [ 0x000b6492, 0x000b6494 ],
  }, {
    id: 3,
    name: 'Bat',
    level: 1,
    dropAddresses: [ 0x000b63a2, 0x000b63a4 ],
  }, {
    id: 4,
    name: 'Stone Skull',
    level: 1,
    dropAddresses: [ 0x000b9cc2, 0x000b9cc4 ],
  }, {
    id: 5,
    name: 'Zombie',
    level: 1,
    dropAddresses: [ 0x000b6c02, 0x000b6c04 ],
  }, {
    id: 6,
    name: 'Merman',
    level: 2,
    dropAddresses: [ 0x000b5caa, 0x000b5cac ],
  }, {
    id: 7,
    name: 'Skeleton',
    level: 2,
    dropAddresses: [ 0x000b655a, 0x000b655c ],
  }, {
    id: 8,
    name: 'Warg',
    level: 2,
    dropAddresses: [ 0x000b775a, 0x000b775c ],
  }, {
    id: 9,
    name: 'Bone Scimitar',
    level: 3,
    dropAddresses: [ 0x000b6b3a, 0x000b6b3c ],
  }, {
    id: 10,
    name: 'Merman',
    level: 3,
    dropAddresses: [ 0x000b5cfa, 0x000b5cfc ],
  }, {
    id: 11,
    name: 'Spittle Bone',
    level: 3,
    dropAddresses: [ 0x000b664a, 0x000b664c ],
  }, {
    id: 12,
    name: 'Axe Knight',
    level: 4,
    dropAddresses: [ 0x000b83a2, 0x000b83a4 ],
  }, {
    id: 13,
    name: 'Bloody Zombie',
    level: 4,
    dropAddresses: [ 0x000b5a7a, 0x000b5a7c ],
  }, {
    id: 14,
    name: 'Slinger',
    level: 4,
    dropAddresses: [ 0x000b77d2, 0x000b77d4 ],
  }, {
    id: 15,
    name: 'Ouija Table',
    level: 5,
    dropAddresses: [ 0x000b7a2a, 0x000b7a2c ],
  }, {
    id: 16,
    name: 'Skelerang',
    level: 5,
    dropAddresses: [ 0x000b5a2a, 0x000b5a2c ],
  }, {
    id: 17,
    name: 'Thornweed',
    level: 5,
    dropAddresses: [ 0x000b748a, 0x000b748c ],
  }, {
    id: 18,
    name: 'Gaibon',
    level: 6,
    dropAddresses: [ 0x000b8612, 0x000b8614 ],
  }, {
    id: 19,
    name: 'Ghost',
    level: 6,
    dropAddresses: [ 0x000b7462, 0x000b7464 ],
  }, {
    id: 20,
    name: 'Marionette',
    level: 6,
    dropAddresses: [ 0x000b614a, 0x000b614c ],
  }, {
    id: 21,
    name: 'Slogra',
    level: 6,
    dropAddresses: [ 0x000b832a, 0x000b832c ],
  }, {
    id: 22,
    name: 'Diplocephalus',
    level: 7,
    dropAddresses: [ 0x000b5af2, 0x000b5af4 ],
  }, {
    id: 23,
    name: 'Flea Man',
    level: 7,
    dropAddresses: [ 0x000b5eb2, 0x000b5eb4 ],
  }, {
    id: 24,
    name: 'Medusa Head',
    level: 7,
    dropAddresses: [ 0x000b8eea, 0x000b8eec ],
  }, {
    id: 25,
    name: 'Blade Soldier',
    level: 8,
    dropAddresses: [ 0x000b6e32, 0x000b6e34 ],
  }, {
    id: 26,
    name: 'Bone Musket',
    level: 8,
    dropAddresses: [ 0x000b6ac2, 0x000b6ac4 ],
  }, {
    id: 27,
    name: 'Medusa Head',
    level: 8,
    dropAddresses: [ 0x000b8f12, 0x000b8f14 ],
  }, {
    id: 28,
    name: 'Plate Lord',
    level: 8,
    dropAddresses: [ 0x000b69fa, 0x000b69fc ],
  }, {
    id: 29,
    name: 'Stone Rose',
    level: 8,
    dropAddresses: [ 0x000b66ea, 0x000b66ec ],
  }, {
    id: 30,
    name: 'Axe Knight',
    level: 9,
    dropAddresses: [ 0x000b5962, 0x000b5964 ],
  }, {
    id: 31,
    name: 'Ctulhu',
    level: 9,
    dropAddresses: [ 0x000b819a, 0x000b819c ],
  }, {
    id: 32,
    name: 'Bone Archer',
    level: 10,
    dropAddresses: [ 0x000b6bb2, 0x000b6bb4 ],
  }, {
    id: 33,
    name: 'Bone Pillar',
    level: 10,
    dropAddresses: [ 0x000b789a, 0x000b789c ],
  }, {
    id: 34,
    name: 'Doppleganger10',
    level: 10,
    dropAddresses: [ 0x000b85ea, 0x000b85ec ],
  }, {
    id: 35,
    name: 'Owl',
    level: 10,
    dropAddresses: [ 0x000b5be2, 0x000b5be4 ],
  }, {
    id: 36,
    name: 'Phantom Skull',
    level: 10,
    dropAddresses: [ 0x000b641a, 0x000b641c ],
  }, {
    id: 37,
    name: 'Scylla wyrm',
    level: 10,
    dropAddresses: [ 0x000b8c52, 0x000b8c54 ],
  }, {
    id: 38,
    name: 'Skeleton Ape',
    level: 10,
    dropAddresses: [ 0x000b669a, 0x000b669c ],
  }, {
    id: 39,
    name: 'Spear Guard',
    level: 10,
    dropAddresses: [ 0x000b682a, 0x000b682c ],
  }, {
    id: 40,
    name: 'Spellbook',
    level: 10,
    dropAddresses: [ 0x000b83ca, 0x000b83cc ],
  }, {
    id: 41,
    name: 'Winged Guard',
    level: 10,
    dropAddresses: [ 0x000b6ed2, 0x000b6ed4 ],
  }, {
    id: 42,
    name: 'Ectoplasm',
    level: 11,
    dropAddresses: [ 0x000b6762, 0x000b6764 ],
  }, {
    id: 43,
    name: 'Sword Lord',
    level: 11,
    dropAddresses: [ 0x000b59da, 0x000b59dc ],
  }, {
    id: 44,
    name: 'Toad',
    level: 11,
    dropAddresses: [ 0x000b6b62, 0x000b6b64 ],
  }, {
    id: 45,
    name: 'Armor Lord',
    level: 12,
    dropAddresses: [ 0x000b5dc2, 0x000b5dc4 ],
  }, {
    id: 46,
    name: 'Corner Guard',
    level: 12,
    dropAddresses: [ 0x000b7822, 0x000b7824 ],
  }, {
    id: 47,
    name: 'Dhuron',
    level: 12,
    dropAddresses: [ 0x000b71a2, 0x000b71a4 ],
  }, {
    id: 48,
    name: 'Frog',
    level: 12,
    dropAddresses: [ 0x000b6b8a, 0x000b6b8c ],
  }, {
    id: 49,
    name: 'Frozen Shade',
    level: 12,
    dropAddresses: [ 0x000b6a4a, 0x000b6a4c ],
  }, {
    id: 50,
    name: 'Magic Tome',
    level: 12,
    dropAddresses: [ 0x000b859a, 0x000b859c ],
  }, {
    id: 51,
    name: 'Skull Lord',
    level: 12,
    dropAddresses: [ 0x000b872a, 0x000b872c ],
  }, {
    id: 52,
    name: 'Black Crow',
    level: 13,
    dropAddresses: [ 0x000b6cca, 0x000b6ccc ],
  }, {
    id: 53,
    name: 'Blue Raven',
    level: 13,
    dropAddresses: [ 0x000b6ca2, 0x000b6ca4 ],
  }, {
    id: 54,
    name: 'Corpseweed',
    level: 13,
    dropAddresses: [ 0x000b74b2, 0x000b74b4 ],
  }, {
    id: 55,
    name: 'Flail Guard',
    level: 13,
    dropAddresses: [ 0x000b6442, 0x000b6444 ],
  }, {
    id: 56,
    name: 'Flea Rider',
    level: 13,
    dropAddresses: [ 0x000b6122, 0x000b6124 ],
  }, {
    id: 57,
    name: 'Spectral Sword',
    level: 13,
    dropAddresses: [ 0x000b6efa, 0x000b6efc ],
  }, {
    id: 58,
    name: 'Bone Halberd',
    level: 14,
    dropAddresses: [ 0x000b6d42, 0x000b6d44 ],
  }, {
    id: 59,
    name: 'Scylla',
    level: 14,
    dropAddresses: [ 0x000b8b3a, 0x000b8b3c ],
  }, {
    id: 60,
    name: 'Hunting Girl',
    level: 15,
    dropAddresses: [ 0x000b80aa, 0x000b80ac ],
  }, {
    id: 61,
    name: 'Mudman',
    level: 15,
    dropAddresses: [ 0x000b7ea2, 0x000b7ea4 ],
  }, {
    id: 62,
    name: 'Owl Knight',
    level: 15,
    dropAddresses: [ 0x000b5b92, 0x000b5b94 ],
  }, {
    id: 63,
    name: 'Spectral Sword ',
    level: 15,
    dropAddresses: [ 0x000b7012, 0x000b7014 ],
  }, {
    id: 64,
    name: 'Vandal Sword',
    level: 15,
    dropAddresses: [ 0x000b80d2, 0x000b80d4 ],
  }, {
    id: 65,
    name: 'Flea Armor',
    level: 16,
    dropAddresses: [ 0x000b5eda, 0x000b5edc ],
  }, {
    id: 66,
    name: 'Hippogryph',
    level: 16,
    dropAddresses: [ 0x000b8d42, 0x000b8d44 ],
  }, {
    id: 67,
    name: 'Paranthropus',
    level: 16,
    dropAddresses: [ 0x000b7e2a, 0x000b7e2c ],
  }, {
    id: 68,
    name: 'Slime',
    level: 16,
    dropAddresses: [ 0x000b63f2, 0x000b63f4 ],
  }, {
    id: 69,
    name: 'Blade Master',
    level: 17,
    dropAddresses: [ 0x000b6de2, 0x000b6de4 ],
  }, {
    id: 70,
    name: 'Wereskeleton',
    level: 17,
    dropAddresses: [ 0x000b632a, 0x000b632c ],
  }, {
    id: 71,
    name: 'Grave Keeper',
    level: 18,
    dropAddresses: [ 0x000b6c2a, 0x000b6c2c ],
  }, {
    id: 72,
    name: 'Gremlin',
    level: 18,
    dropAddresses: [ 0x000b805a, 0x000b805c ],
  }, {
    id: 73,
    name: 'Harpy',
    level: 18,
    dropAddresses: [ 0x000b828a, 0x000b828c ],
  }, {
    id: 74,
    name: 'Minotaurus',
    level: 18,
    dropAddresses: [ 0x000b7cea, 0x000b7cec ],
  }, {
    id: 75,
    name: 'Werewolf',
    level: 18,
    dropAddresses: [ 0x000b7d62, 0x000b7d64 ],
  }, {
    id: 76,
    name: 'Bone Ark',
    level: 19,
    dropAddresses: [ 0x000b60aa, 0x000b60ac ],
  }, {
    id: 77,
    name: 'Valhalla Knight',
    level: 19,
    dropAddresses: [ 0x000b6f9a, 0x000b6f9c ],
  }, {
    id: 78,
    name: 'Cloaked knight',
    level: 20,
    dropAddresses: [ 0x000b88ba, 0x000b88bc ],
  }, {
    id: 79,
    name: 'Fishhead',
    level: 20,
    dropAddresses: [ 0x000b89aa, 0x000b89ac ],
  }, {
    id: 80,
    name: 'Lesser Demon',
    level: 20,
    dropAddresses: [ 0x000b5c0a, 0x000b5c0c ],
  }, {
    id: 81,
    name: 'Lossoth',
    level: 20,
    dropAddresses: [ 0x000b6f4a, 0x000b6f4c ],
  }, {
    id: 82,
    name: 'Salem Witch',
    level: 20,
    dropAddresses: [ 0x000b7fba, 0x000b7fbc ],
  }, {
    id: 83,
    name: 'Blade',
    level: 21,
    dropAddresses: [ 0x000b79b2, 0x000b79b4 ],
  }, {
    id: 84,
    name: 'Gurkha',
    level: 21,
    dropAddresses: [ 0x000b7962, 0x000b7964 ],
  }, {
    id: 85,
    name: 'Hammer',
    level: 21,
    dropAddresses: [ 0x000b7912, 0x000b7914 ],
  }, {
    id: 86,
    name: 'Discus Lord',
    level: 22,
    dropAddresses: [ 0x000b65aa, 0x000b65ac ],
  }, {
    id: 87,
    name: 'Karasuman',
    level: 22,
    dropAddresses: [ 0x000b8a22, 0x000b8a24 ],
  }, {
    id: 88,
    name: 'Large Slime',
    level: 22,
    dropAddresses: [ 0x000b63ca, 0x000b63cc ],
  }, {
    id: 89,
    name: 'Hellfire Beast',
    level: 23,
    dropAddresses: [ 0x000b64ba, 0x000b64bc ],
  }, {
    id: 90,
    name: 'Cerberos',
    level: 24,
    dropAddresses: [ 0x000b997a, 0x000b997c ],
  }, {
    id: 91,
    name: 'Killer Fish',
    level: 25,
    dropAddresses: [ 0x000b9642, 0x000b9644 ],
  }, {
    id: 92,
    name: 'Olrox',
    level: 25,
    dropAddresses: [ 0x000b6172, 0x000b6174 ],
  }, {
    id: 93,
    name: 'Succubus',
    level: 25,
    dropAddresses: [ 0x000b9502, 0x000b9504 ],
  }, {
    id: 94,
    name: 'Tombstone',
    level: 25,
    dropAddresses: [ 0x000b6c7a, 0x000b6c7c ],
  }, {
    id: 95,
    name: 'Venus Weed',
    level: 25,
    dropAddresses: [ 0x000b752a, 0x000b752c ],
  }, {
    id: 96,
    name: 'Lion',
    level: 27,
    dropAddresses: [ 0x000b8752, 0x000b8754 ],
  }, {
    id: 97,
    name: 'Scarecrow',
    level: 27,
    dropAddresses: [ 0x000b91e2, 0x000b91e4 ],
  }, {
    id: 98,
    name: 'Granfaloon',
    level: 28,
    dropAddresses: [ 0x000b8c7a, 0x000b8c7c ],
  }, {
    id: 99,
    name: 'Schmoo',
    level: 28,
    dropAddresses: [ 0x000b920a, 0x000b920c ],
  }, {
    id: 100,
    name: 'Tin man',
    level: 28,
    dropAddresses: [ 0x000b87a2, 0x000b87a4 ],
  }, {
    id: 101,
    name: 'Balloon pod',
    level: 29,
    dropAddresses: [ 0x000b8aea, 0x000b8aec ],
  }, {
    id: 102,
    name: 'Yorick',
    level: 29,
    dropAddresses: [ 0x000b6d92, 0x000b6d94 ],
  }, {
    id: 103,
    name: 'Bomb Knight',
    level: 30,
    dropAddresses: [ 0x000b75ca, 0x000b75cc ],
  }, {
    id: 104,
    name: 'Flying Zombie',
    level: 32,
    dropAddresses: [ 0x000b5aa2, 0x000b5aa4 ],
  }, {
    id: 105,
    name: 'Bitterfly',
    level: 33,
    dropAddresses: [ 0x000b7872, 0x000b7874 ],
  }, {
    id: 106,
    name: 'Jack O\'Bones',
    level: 33,
    dropAddresses: [ 0x000b6cf2, 0x000b6cf4 ],
  }, {
    id: 107,
    name: 'Archer',
    level: 34,
    dropAddresses: [ 0x000b8f3a, 0x000b8f3c ],
  }, {
    id: 108,
    name: 'Werewolf',
    level: 34,
    dropAddresses: [ 0x000b9d8a, 0x000b9d8c ],
  }, {
    id: 109,
    name: 'Black Panther',
    level: 35,
    dropAddresses: [ 0x000b5e3a, 0x000b5e3c ],
  }, {
    id: 110,
    name: 'Darkwing Bat',
    level: 35,
    dropAddresses: [ 0x000b890a, 0x000b890c ],
  }, {
    id: 111,
    name: 'Dragon Rider',
    level: 35,
    dropAddresses: [ 0x000b7152, 0x000b7154 ],
  }, {
    id: 112,
    name: 'Minotaur',
    level: 35,
    dropAddresses: [ 0x000b9d12, 0x000b9d14 ],
  }, {
    id: 113,
    name: 'Nova Skeleton',
    level: 35,
    dropAddresses: [ 0x000b6e82, 0x000b6e84 ],
  }, {
    id: 114,
    name: 'Orobourous',
    level: 35,
    dropAddresses: [ 0x000b70da, 0x000b70dc ],
  }, {
    id: 115,
    name: 'White Dragon',
    level: 35,
    dropAddresses: [ 0x000b5f2a, 0x000b5f2c ],
  }, {
    id: 116,
    name: 'Fire Warg',
    level: 36,
    dropAddresses: [ 0x000b7322, 0x000b7324 ],
  }, {
    id: 117,
    name: 'Rock Knight',
    level: 36,
    dropAddresses: [ 0x000b761a, 0x000b761c ],
  }, {
    id: 118,
    name: 'Sniper of Goth',
    level: 36,
    dropAddresses: [ 0x000b7a7a, 0x000b7a7c ],
  }, {
    id: 119,
    name: 'Spectral Sword',
    level: 36,
    dropAddresses: [ 0x000b7062, 0x000b7064 ],
  }, {
    id: 120,
    name: 'Ghost Dancer',
    level: 37,
    dropAddresses: [ 0x000b7ef2, 0x000b7ef4 ],
  }, {
    id: 121,
    name: 'Warg Rider',
    level: 37,
    dropAddresses: [ 0x000b739a, 0x000b739c ],
  }, {
    id: 122,
    name: 'Cave Troll',
    level: 38,
    dropAddresses: [ 0x000b73ea, 0x000b73ec ],
  }, {
    id: 123,
    name: 'Dark Octopus',
    level: 38,
    dropAddresses: [ 0x000b5e62, 0x000b5e64 ],
  }, {
    id: 124,
    name: 'Fire Demon',
    level: 38,
    dropAddresses: [ 0x000b65fa, 0x000b65fc ],
  }, {
    id: 125,
    name: 'Gorgon',
    level: 38,
    dropAddresses: [ 0x000b5d4a, 0x000b5d4c ],
  }, {
    id: 126,
    name: 'Malachi',
    level: 39,
    dropAddresses: [ 0x000b8212, 0x000b8214 ],
  }, {
    id: 127,
    name: 'Akmodan II',
    level: 40,
    dropAddresses: [ 0x000b881a, 0x000b881c ],
  }, {
    id: 128,
    name: 'Blue Venus Weed',
    level: 40,
    dropAddresses: [ 0x000b9e02, 0x000b9e04 ],
  }, {
    id: 129,
    name: 'Doppleganger40',
    level: 40,
    dropAddresses: [ 0x000b9ae2, 0x000b9ae4 ],
  }, {
    id: 130,
    name: 'Medusa',
    level: 40,
    dropAddresses: [ 0x000b99f2, 0x000b99f4 ],
  }, {
    id: 131,
    name: 'The Creature',
    level: 40,
    dropAddresses: [ 0x000b9a92, 0x000b9a94 ],
  }, {
    id: 132,
    name: 'Fake Grant',
    level: 41,
    dropAddresses: [ 0x000b93c2, 0x000b93c4 ],
  }, {
    id: 133,
    name: 'Fake Trevor',
    level: 41,
    dropAddresses: [ 0x000b92d2, 0x000b92d4 ],
  }, {
    id: 134,
    name: 'Imp',
    level: 41,
    dropAddresses: [ 0x000b8ac2, 0x000b8ac4 ],
  }, {
    id: 135,
    name: 'Fake Sypha',
    level: 42,
    dropAddresses: [ 0x000b943a, 0x000b943c ],
  }, {
    id: 136,
    name: 'Beezelbub',
    level: 44,
    dropAddresses: [ 0x000b9232, 0x000b9234 ],
  }, {
    id: 137,
    name: 'Azaghal',
    level: 45,
    dropAddresses: [ 0x000b8032, 0x000b8034 ],
  }, {
    id: 138,
    name: 'Frozen Half',
    level: 45,
    dropAddresses: [ 0x000b7f1a, 0x000b7f1c ],
  }, {
    id: 139,
    name: 'Salome',
    level: 45,
    dropAddresses: [ 0x000b80fa, 0x000b80fc ],
  }, {
    id: 140,
    name: 'Richter Belmont',
    level: 48,
    dropAddresses: [ 0x000b8f8a, 0x000b8f8c ],
  }, {
    id: 141,
    name: 'Dodo Bird',
    level: 49,
    dropAddresses: [ 0x000b6b12, 0x000b6b14 ],
  }, {
    id: 142,
    name: 'Galamoth',
    level: 50,
    dropAddresses: [ 0x000b7c22, 0x000b7c24 ],
  }, {
    id: 143,
    name: 'Guardian',
    level: 60,
    dropAddresses: [ 0x000b9ea2, 0x000b9ea4 ],
  }, {
    id: 144,
    name: 'Death',
    level: 66,
    dropAddresses: [ 0x000b9862, 0x000b9864 ],
  }, {
    id: 145,
    name: 'Shaft',
    level: 88,
    dropAddresses: [ 0x000b966a, 0x000b966c ],
  }, {
    id: 146,
    name: 'Dracula',
    level: 98,
    dropAddresses: [ 0x000b9bfa, 0x000b9bfc ],
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
