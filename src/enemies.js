(function(self) {

  const enemies = [{
    id: 1,
    name: 'Dracula',
    level: 0,
    dropAddresses: [ 0x0b766a, 0x0b766c ],
  }, {
    id: 2,
    name: 'Blood Skeleton',
    level: 0,
    dropAddresses: [ 0x0b6492, 0x0b6494 ],
  }, {
    id: 3,
    name: 'Bat',
    level: 1,
    dropAddresses: [ 0x0b63a2, 0x0b63a4 ],
  }, {
    id: 4,
    name: 'Stone Skull',
    level: 1,
    dropAddresses: [ 0x0b9cc2, 0x0b9cc4 ],
  }, {
    id: 5,
    name: 'Zombie',
    level: 1,
    dropAddresses: [ 0x0b6c02, 0x0b6c04 ],
  }, {
    id: 6,
    name: 'Merman',
    level: 2,
    dropAddresses: [ 0x0b5caa, 0x0b5cac ],
  }, {
    id: 7,
    name: 'Skeleton',
    level: 2,
    dropAddresses: [ 0x0b655a, 0x0b655c ],
  }, {
    id: 8,
    name: 'Warg',
    level: 2,
    dropAddresses: [ 0x0b775a, 0x0b775c ],
  }, {
    id: 9,
    name: 'Bone Scimitar',
    level: 3,
    dropAddresses: [ 0x0b6b3a, 0x0b6b3c ],
  }, {
    id: 10,
    name: 'Merman',
    level: 3,
    dropAddresses: [ 0x0b5cfa, 0x0b5cfc ],
  }, {
    id: 11,
    name: 'Spittle Bone',
    level: 3,
    dropAddresses: [ 0x0b664a, 0x0b664c ],
  }, {
    id: 12,
    name: 'Axe Knight',
    level: 4,
    dropAddresses: [ 0x0b83a2, 0x0b83a4 ],
  }, {
    id: 13,
    name: 'Bloody Zombie',
    level: 4,
    dropAddresses: [ 0x0b5a7a, 0x0b5a7c ],
  }, {
    id: 14,
    name: 'Slinger',
    level: 4,
    dropAddresses: [ 0x0b77d2, 0x0b77d4 ],
  }, {
    id: 15,
    name: 'Ouija Table',
    level: 5,
    dropAddresses: [ 0x0b7a2a, 0x0b7a2c ],
  }, {
    id: 16,
    name: 'Skelerang',
    level: 5,
    dropAddresses: [ 0x0b5a2a, 0x0b5a2c ],
  }, {
    id: 17,
    name: 'Thornweed',
    level: 5,
    dropAddresses: [ 0x0b748a, 0x0b748c ],
  }, {
    id: 18,
    name: 'Gaibon',
    level: 6,
    dropAddresses: [ 0x0b8612, 0x0b8614 ],
  }, {
    id: 19,
    name: 'Ghost',
    level: 6,
    dropAddresses: [ 0x0b7462, 0x0b7464 ],
  }, {
    id: 20,
    name: 'Marionette',
    level: 6,
    dropAddresses: [ 0x0b614a, 0x0b614c ],
  }, {
    id: 21,
    name: 'Slogra',
    level: 6,
    dropAddresses: [ 0x0b832a, 0x0b832c ],
  }, {
    id: 22,
    name: 'Diplocephalus',
    level: 7,
    dropAddresses: [ 0x0b5af2, 0x0b5af4 ],
  }, {
    id: 23,
    name: 'Flea Man',
    level: 7,
    dropAddresses: [ 0x0b5eb2, 0x0b5eb4 ],
  }, {
    id: 24,
    name: 'Medusa Head',
    level: 7,
    dropAddresses: [ 0x0b8eea, 0x0b8eec ],
  }, {
    id: 25,
    name: 'Blade Soldier',
    level: 8,
    dropAddresses: [ 0x0b6e32, 0x0b6e34 ],
  }, {
    id: 26,
    name: 'Bone Musket',
    level: 8,
    dropAddresses: [ 0x0b6ac2, 0x0b6ac4 ],
  }, {
    id: 27,
    name: 'Medusa Head',
    level: 8,
    dropAddresses: [ 0x0b8f12, 0x0b8f14 ],
  }, {
    id: 28,
    name: 'Plate Lord',
    level: 8,
    dropAddresses: [ 0x0b69fa, 0x0b69fc ],
  }, {
    id: 29,
    name: 'Stone Rose',
    level: 8,
    dropAddresses: [ 0x0b66ea, 0x0b66ec ],
  }, {
    id: 30,
    name: 'Axe Knight',
    level: 9,
    dropAddresses: [ 0x0b5962, 0x0b5964 ],
  }, {
    id: 31,
    name: 'Ctulhu',
    level: 9,
    dropAddresses: [ 0x0b819a, 0x0b819c ],
  }, {
    id: 32,
    name: 'Bone Archer',
    level: 10,
    dropAddresses: [ 0x0b6bb2, 0x0b6bb4 ],
  }, {
    id: 33,
    name: 'Bone Pillar',
    level: 10,
    dropAddresses: [ 0x0b789a, 0x0b789c ],
  }, {
    id: 34,
    name: 'Doppleganger10',
    level: 10,
    dropAddresses: [ 0x0b85ea, 0x0b85ec ],
  }, {
    id: 35,
    name: 'Owl',
    level: 10,
    dropAddresses: [ 0x0b5be2, 0x0b5be4 ],
  }, {
    id: 36,
    name: 'Phantom Skull',
    level: 10,
    dropAddresses: [ 0x0b641a, 0x0b641c ],
  }, {
    id: 37,
    name: 'Scylla wyrm',
    level: 10,
    dropAddresses: [ 0x0b8c52, 0x0b8c54 ],
  }, {
    id: 38,
    name: 'Skeleton Ape',
    level: 10,
    dropAddresses: [ 0x0b669a, 0x0b669c ],
  }, {
    id: 39,
    name: 'Spear Guard',
    level: 10,
    dropAddresses: [ 0x0b682a, 0x0b682c ],
  }, {
    id: 40,
    name: 'Spellbook',
    level: 10,
    dropAddresses: [ 0x0b83ca, 0x0b83cc ],
  }, {
    id: 41,
    name: 'Winged Guard',
    level: 10,
    dropAddresses: [ 0x0b6ed2, 0x0b6ed4 ],
  }, {
    id: 42,
    name: 'Ectoplasm',
    level: 11,
    dropAddresses: [ 0x0b6762, 0x0b6764 ],
  }, {
    id: 43,
    name: 'Sword Lord',
    level: 11,
    dropAddresses: [ 0x0b59da, 0x0b59dc ],
  }, {
    id: 44,
    name: 'Toad',
    level: 11,
    dropAddresses: [ 0x0b6b62, 0x0b6b64 ],
  }, {
    id: 45,
    name: 'Armor Lord',
    level: 12,
    dropAddresses: [ 0x0b5dc2, 0x0b5dc4 ],
  }, {
    id: 46,
    name: 'Corner Guard',
    level: 12,
    dropAddresses: [ 0x0b7822, 0x0b7824 ],
  }, {
    id: 47,
    name: 'Dhuron',
    level: 12,
    dropAddresses: [ 0x0b71a2, 0x0b71a4 ],
  }, {
    id: 48,
    name: 'Frog',
    level: 12,
    dropAddresses: [ 0x0b6b8a, 0x0b6b8c ],
  }, {
    id: 49,
    name: 'Frozen Shade',
    level: 12,
    dropAddresses: [ 0x0b6a4a, 0x0b6a4c ],
  }, {
    id: 50,
    name: 'Magic Tome',
    level: 12,
    dropAddresses: [ 0x0b859a, 0x0b859c ],
  }, {
    id: 51,
    name: 'Skull Lord',
    level: 12,
    dropAddresses: [ 0x0b872a, 0x0b872c ],
  }, {
    id: 52,
    name: 'Black Crow',
    level: 13,
    dropAddresses: [ 0x0b6cca, 0x0b6ccc ],
  }, {
    id: 53,
    name: 'Blue Raven',
    level: 13,
    dropAddresses: [ 0x0b6ca2, 0x0b6ca4 ],
  }, {
    id: 54,
    name: 'Corpseweed',
    level: 13,
    dropAddresses: [ 0x0b74b2, 0x0b74b4 ],
  }, {
    id: 55,
    name: 'Flail Guard',
    level: 13,
    dropAddresses: [ 0x0b6442, 0x0b6444 ],
  }, {
    id: 56,
    name: 'Flea Rider',
    level: 13,
    dropAddresses: [ 0x0b6122, 0x0b6124 ],
  }, {
    id: 57,
    name: 'Spectral Sword',
    level: 13,
    dropAddresses: [ 0x0b6efa, 0x0b6efc ],
  }, {
    id: 58,
    name: 'Bone Halberd',
    level: 14,
    dropAddresses: [ 0x0b6d42, 0x0b6d44 ],
  }, {
    id: 59,
    name: 'Scylla',
    level: 14,
    dropAddresses: [ 0x0b8b3a, 0x0b8b3c ],
  }, {
    id: 60,
    name: 'Hunting Girl',
    level: 15,
    dropAddresses: [ 0x0b80aa, 0x0b80ac ],
  }, {
    id: 61,
    name: 'Mudman',
    level: 15,
    dropAddresses: [ 0x0b7ea2, 0x0b7ea4 ],
  }, {
    id: 62,
    name: 'Owl Knight',
    level: 15,
    dropAddresses: [ 0x0b5b92, 0x0b5b94 ],
  }, {
    id: 63,
    name: 'Spectral Sword',
    level: 15,
    dropAddresses: [ 0x0b7012, 0x0b7014 ],
  }, {
    id: 64,
    name: 'Vandal Sword',
    level: 15,
    dropAddresses: [ 0x0b80d2, 0x0b80d4 ],
  }, {
    id: 65,
    name: 'Flea Armor',
    level: 16,
    dropAddresses: [ 0x0b5eda, 0x0b5edc ],
  }, {
    id: 66,
    name: 'Hippogryph',
    level: 16,
    dropAddresses: [ 0x0b8d42, 0x0b8d44 ],
  }, {
    id: 67,
    name: 'Paranthropus',
    level: 16,
    dropAddresses: [ 0x0b7e2a, 0x0b7e2c ],
  }, {
    id: 68,
    name: 'Slime',
    level: 16,
    dropAddresses: [ 0x0b63f2, 0x0b63f4 ],
  }, {
    id: 69,
    name: 'Blade Master',
    level: 17,
    dropAddresses: [ 0x0b6de2, 0x0b6de4 ],
  }, {
    id: 70,
    name: 'Wereskeleton',
    level: 17,
    dropAddresses: [ 0x0b632a, 0x0b632c ],
  }, {
    id: 71,
    name: 'Grave Keeper',
    level: 18,
    dropAddresses: [ 0x0b6c2a, 0x0b6c2c ],
  }, {
    id: 72,
    name: 'Gremlin',
    level: 18,
    dropAddresses: [ 0x0b805a, 0x0b805c ],
  }, {
    id: 73,
    name: 'Harpy',
    level: 18,
    dropAddresses: [ 0x0b828a, 0x0b828c ],
  }, {
    id: 74,
    name: 'Minotaurus',
    level: 18,
    dropAddresses: [ 0x0b7cea, 0x0b7cec ],
  }, {
    id: 75,
    name: 'Werewolf',
    level: 18,
    dropAddresses: [ 0x0b7d62, 0x0b7d64 ],
  }, {
    id: 76,
    name: 'Bone Ark',
    level: 19,
    dropAddresses: [ 0x0b60aa, 0x0b60ac ],
  }, {
    id: 77,
    name: 'Valhalla Knight',
    level: 19,
    dropAddresses: [ 0x0b6f9a, 0x0b6f9c ],
  }, {
    id: 78,
    name: 'Cloaked knight',
    level: 20,
    dropAddresses: [ 0x0b88ba, 0x0b88bc ],
  }, {
    id: 79,
    name: 'Fishhead',
    level: 20,
    dropAddresses: [ 0x0b89aa, 0x0b89ac ],
  }, {
    id: 80,
    name: 'Lesser Demon',
    level: 20,
    dropAddresses: [ 0x0b5c0a, 0x0b5c0c ],
  }, {
    id: 81,
    name: 'Lossoth',
    level: 20,
    dropAddresses: [ 0x0b6f4a, 0x0b6f4c ],
  }, {
    id: 82,
    name: 'Salem Witch',
    level: 20,
    dropAddresses: [ 0x0b7fba, 0x0b7fbc ],
  }, {
    id: 83,
    name: 'Blade',
    level: 21,
    dropAddresses: [ 0x0b79b2, 0x0b79b4 ],
  }, {
    id: 84,
    name: 'Gurkha',
    level: 21,
    dropAddresses: [ 0x0b7962, 0x0b7964 ],
  }, {
    id: 85,
    name: 'Hammer',
    level: 21,
    dropAddresses: [ 0x0b7912, 0x0b7914 ],
  }, {
    id: 86,
    name: 'Discus Lord',
    level: 22,
    dropAddresses: [ 0x0b65aa, 0x0b65ac ],
  }, {
    id: 87,
    name: 'Karasuman',
    level: 22,
    dropAddresses: [ 0x0b8a22, 0x0b8a24 ],
  }, {
    id: 88,
    name: 'Large Slime',
    level: 22,
    dropAddresses: [ 0x0b63ca, 0x0b63cc ],
  }, {
    id: 89,
    name: 'Hellfire Beast',
    level: 23,
    dropAddresses: [ 0x0b64ba, 0x0b64bc ],
  }, {
    id: 90,
    name: 'Cerberos',
    level: 24,
    dropAddresses: [ 0x0b997a, 0x0b997c ],
  }, {
    id: 91,
    name: 'Killer Fish',
    level: 25,
    dropAddresses: [ 0x0b9642, 0x0b9644 ],
  }, {
    id: 92,
    name: 'Olrox',
    level: 25,
    dropAddresses: [ 0x0b6172, 0x0b6174 ],
  }, {
    id: 93,
    name: 'Succubus',
    level: 25,
    dropAddresses: [ 0x0b9502, 0x0b9504 ],
  }, {
    id: 94,
    name: 'Tombstone',
    level: 25,
    dropAddresses: [ 0x0b6c7a, 0x0b6c7c ],
  }, {
    id: 95,
    name: 'Venus Weed',
    level: 25,
    dropAddresses: [ 0x0b752a, 0x0b752c ],
  }, {
    id: 96,
    name: 'Lion',
    level: 27,
    dropAddresses: [ 0x0b8752, 0x0b8754 ],
  }, {
    id: 97,
    name: 'Scarecrow',
    level: 27,
    dropAddresses: [ 0x0b91e2, 0x0b91e4 ],
  }, {
    id: 98,
    name: 'Granfaloon',
    level: 28,
    dropAddresses: [ 0x0b8c7a, 0x0b8c7c ],
  }, {
    id: 99,
    name: 'Schmoo',
    level: 28,
    dropAddresses: [ 0x0b920a, 0x0b920c ],
  }, {
    id: 100,
    name: 'Tin man',
    level: 28,
    dropAddresses: [ 0x0b87a2, 0x0b87a4 ],
  }, {
    id: 101,
    name: 'Balloon pod',
    level: 29,
    dropAddresses: [ 0x0b8aea, 0x0b8aec ],
  }, {
    id: 102,
    name: 'Yorick',
    level: 29,
    dropAddresses: [ 0x0b6d92, 0x0b6d94 ],
  }, {
    id: 103,
    name: 'Bomb Knight',
    level: 30,
    dropAddresses: [ 0x0b75ca, 0x0b75cc ],
  }, {
    id: 104,
    name: 'Flying Zombie',
    level: 32,
    dropAddresses: [ 0x0b5aa2, 0x0b5aa4 ],
  }, {
    id: 105,
    name: 'Bitterfly',
    level: 33,
    dropAddresses: [ 0x0b7872, 0x0b7874 ],
  }, {
    id: 106,
    name: 'Jack O\'Bones',
    level: 33,
    dropAddresses: [ 0x0b6cf2, 0x0b6cf4 ],
  }, {
    id: 107,
    name: 'Archer',
    level: 34,
    dropAddresses: [ 0x0b8f3a, 0x0b8f3c ],
  }, {
    id: 108,
    name: 'Werewolf',
    level: 34,
    dropAddresses: [ 0x0b9d8a, 0x0b9d8c ],
  }, {
    id: 109,
    name: 'Black Panther',
    level: 35,
    dropAddresses: [ 0x0b5e3a, 0x0b5e3c ],
  }, {
    id: 110,
    name: 'Darkwing Bat',
    level: 35,
    dropAddresses: [ 0x0b890a, 0x0b890c ],
  }, {
    id: 111,
    name: 'Dragon Rider',
    level: 35,
    dropAddresses: [ 0x0b7152, 0x0b7154 ],
  }, {
    id: 112,
    name: 'Minotaur',
    level: 35,
    dropAddresses: [ 0x0b9d12, 0x0b9d14 ],
  }, {
    id: 113,
    name: 'Nova Skeleton',
    level: 35,
    dropAddresses: [ 0x0b6e82, 0x0b6e84 ],
  }, {
    id: 114,
    name: 'Orobourous',
    level: 35,
    dropAddresses: [ 0x0b70da, 0x0b70dc ],
  }, {
    id: 115,
    name: 'White Dragon',
    level: 35,
    dropAddresses: [ 0x0b5f2a, 0x0b5f2c ],
  }, {
    id: 116,
    name: 'Fire Warg',
    level: 36,
    dropAddresses: [ 0x0b7322, 0x0b7324 ],
  }, {
    id: 117,
    name: 'Rock Knight',
    level: 36,
    dropAddresses: [ 0x0b761a, 0x0b761c ],
  }, {
    id: 118,
    name: 'Sniper of Goth',
    level: 36,
    dropAddresses: [ 0x0b7a7a, 0x0b7a7c ],
  }, {
    id: 119,
    name: 'Spectral Sword',
    level: 36,
    dropAddresses: [ 0x0b7062, 0x0b7064 ],
  }, {
    id: 120,
    name: 'Ghost Dancer',
    level: 37,
    dropAddresses: [ 0x0b7ef2, 0x0b7ef4 ],
  }, {
    id: 121,
    name: 'Warg Rider',
    level: 37,
    dropAddresses: [ 0x0b739a, 0x0b739c ],
  }, {
    id: 122,
    name: 'Cave Troll',
    level: 38,
    dropAddresses: [ 0x0b73ea, 0x0b73ec ],
  }, {
    id: 123,
    name: 'Dark Octopus',
    level: 38,
    dropAddresses: [ 0x0b5e62, 0x0b5e64 ],
  }, {
    id: 124,
    name: 'Fire Demon',
    level: 38,
    dropAddresses: [ 0x0b65fa, 0x0b65fc ],
  }, {
    id: 125,
    name: 'Gorgon',
    level: 38,
    dropAddresses: [ 0x0b5d4a, 0x0b5d4c ],
  }, {
    id: 126,
    name: 'Malachi',
    level: 39,
    dropAddresses: [ 0x0b8212, 0x0b8214 ],
  }, {
    id: 127,
    name: 'Akmodan II',
    level: 40,
    dropAddresses: [ 0x0b881a, 0x0b881c ],
  }, {
    id: 128,
    name: 'Blue Venus Weed',
    level: 40,
    dropAddresses: [ 0x0b9e02, 0x0b9e04, 0x0b9e2a, 0x0b9e2c ],
  }, {
    id: 129,
    name: 'Doppleganger40',
    level: 40,
    dropAddresses: [ 0x0b9ae2, 0x0b9ae4 ],
  }, {
    id: 130,
    name: 'Medusa',
    level: 40,
    dropAddresses: [ 0x0b99f2, 0x0b99f4 ],
  }, {
    id: 131,
    name: 'The Creature',
    level: 40,
    dropAddresses: [ 0x0b9a92, 0x0b9a94 ],
  }, {
    id: 132,
    name: 'Fake Grant',
    level: 41,
    dropAddresses: [ 0x0b93c2, 0x0b93c4 ],
  }, {
    id: 133,
    name: 'Fake Trevor',
    level: 41,
    dropAddresses: [ 0x0b92d2, 0x0b92d4 ],
  }, {
    id: 134,
    name: 'Imp',
    level: 41,
    dropAddresses: [ 0x0b8ac2, 0x0b8ac4 ],
  }, {
    id: 135,
    name: 'Fake Sypha',
    level: 42,
    dropAddresses: [ 0x0b943a, 0x0b943c ],
  }, {
    id: 136,
    name: 'Beezelbub',
    level: 44,
    dropAddresses: [ 0x0b9232, 0x0b9234 ],
  }, {
    id: 137,
    name: 'Azaghal',
    level: 45,
    dropAddresses: [ 0x0b8032, 0x0b8034 ],
  }, {
    id: 138,
    name: 'Frozen Half',
    level: 45,
    dropAddresses: [ 0x0b7f1a, 0x0b7f1c ],
  }, {
    id: 139,
    name: 'Salome',
    level: 45,
    dropAddresses: [ 0x0b80fa, 0x0b80fc ],
  }, {
    id: 140,
    name: 'Richter Belmont',
    level: 48,
    dropAddresses: [ 0x0b8f8a, 0x0b8f8c ],
  }, {
    id: 141,
    name: 'Dodo Bird',
    level: 49,
    dropAddresses: [ 0x0b6b12, 0x0b6b14 ],
  }, {
    id: 142,
    name: 'Galamoth',
    level: 50,
    dropAddresses: [ 0x0b7c22, 0x0b7c24 ],
  }, {
    id: 143,
    name: 'Guardian',
    level: 60,
    dropAddresses: [ 0x0b9ea2, 0x0b9ea4 ],
  }, {
    id: 144,
    name: 'Death',
    level: 66,
    dropAddresses: [ 0x0b9862, 0x0b9864 ],
  }, {
    id: 145,
    name: 'Shaft',
    level: 88,
    dropAddresses: [ 0x0b966a, 0x0b966c ],
  }, {
    id: 146,
    name: 'Dracula',
    level: 98,
    dropAddresses: [ 0x0b9bfa, 0x0b9bfc ],
  }, {
    name: 'Poltergeist',
    id: 147,
    dropAddresses: [ 0x0b6f24 ],
  }, {
    name: 'Puppet sword',
    id: 148,
    dropAddresses: [ 0x0b703c ],
  }, {
    name: 'Shield',
    id: 149,
    dropAddresses: [ 0x0b70b4 ],
  }, {
    name: 'Spear',
    id: 150,
    dropAddresses: [ 0x0b708c ],
  }, {
    name: 'Ball',
    id: 151,
    dropAddresses: [ 0x0b6dba, 0x0b6dbc ],
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
