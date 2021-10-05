const INITIAL_ANIMALS = [
  "Alligator",
  "Basilisk Lizard",
  "Little Lion",
  "Octopus",
  "Vulture",
];

export const NEW_USER_TEMPLATE = {
  coins: 25,
  xp: 0,
  owned_cards: INITIAL_ANIMALS,
  hand: INITIAL_ANIMALS,
  preferences: { language: "en" },
};

export const campaignPcAnimals: { [x: number]: string[] } = {
  0: [
    "Mosquito",
    "Bee",
    "Parrot",
    "Toad",
    "Salamander",
    "Ball bug",
    "Comb Star",
    "Lizard",
    "Frog",
    "Leech",
  ],
  450: [
    "Mosquito",
    "Bee",
    "Parrot",
    "Toad",
    "Hedgehog",
    "Bat",
    "Lizard",
    "Salamander",
    "Chameleon",
    "Electric Eel",
  ],
  900: [
    "Tortoise",
    "Bee",
    "Parrot",
    "Toad",
    "Swordfish",
    "Hedgehog",
    "Blowfish",
    "Electric Eel",
    "Pelican",
    "Lizard",
  ],
  1350: [
    "Salamander",
    "Bee",
    "Spider",
    "Toad",
    "Frog",
    "Basilisk Lizard",
    "Vulture",
    "Swordfish",
    "Leech",
    "Tortoise",
  ],
  1800: [
    "Mosquito",
    "Bee",
    "Spider",
    "Scorpion",
    "Ball Bug",
    "Leech",
    "Bat",
    "Toad",
    "Eagle",
    "Frog",
  ],
  2250: [
    "Eagle",
    "Cassowary",
    "Parrot",
    "Ostrich",
    "Salamander",
    "Pelican",
    "Bat",
    "Cheetah",
    "Spider",
    "Stingray",
  ],
  2700: [
    "Swordfish",
    "Shark",
    "Electric Eel",
    "Stingray",
    "Blowfish",
    "Comb Star",
    "Orc",
    "Octopus",
    "Pelican",
    "Basilisk Lizard",
  ],
  3150: [
    "Chameleon",
    "Crocodile",
    "Snake",
    "Tortoise",
    "Lizard",
    "Komodo Dragon",
    "Alligator",
    "Basilisk Lizard",
    "Orc",
    "Elephant",
  ],
  3600: [
    "Lion",
    "Elephant",
    "Wolf",
    "Cheetah",
    "Hyena",
    "Gorilla",
    "Bear",
    "Orc",
    "Shark",
    "Little Lion",
  ],
};
