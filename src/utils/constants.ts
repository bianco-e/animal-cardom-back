const CAMPAIGN_CIRCUIT_XP = [0, 450, 900, 1350, 1800, 2250, 2700, 3150, 3600];

const INITIAL_ANIMALS = ["Alligator", "Basilisk Lizard", "Spider", "Octopus", "Vulture"];

export const NEW_USER_TEMPLATE = {
  coins: 25,
  xp: 0,
  owned_cards: INITIAL_ANIMALS,
  hand: INITIAL_ANIMALS,
  preferences: { language: "en" },
  role: "USER",
};

export const CAMPAIGN_REWARDS: {
  [x: number]: { coins: number; animal: string | null; xp: number };
} = {
  [CAMPAIGN_CIRCUIT_XP[0]]: { coins: 5, animal: null, xp: 450 },
  [CAMPAIGN_CIRCUIT_XP[1]]: { coins: 5, animal: null, xp: 450 },
  [CAMPAIGN_CIRCUIT_XP[2]]: { coins: 5, animal: null, xp: 450 },
  [CAMPAIGN_CIRCUIT_XP[3]]: { coins: 5, animal: "Frog", xp: 450 },
  [CAMPAIGN_CIRCUIT_XP[4]]: { coins: 5, animal: "Bee", xp: 450 },
  [CAMPAIGN_CIRCUIT_XP[5]]: { coins: 5, animal: "Pelican", xp: 450 },
  [CAMPAIGN_CIRCUIT_XP[6]]: { coins: 5, animal: "Orc", xp: 450 },
  [CAMPAIGN_CIRCUIT_XP[7]]: { coins: 5, animal: "Snake", xp: 450 },
  [CAMPAIGN_CIRCUIT_XP[8]]: { coins: 5, animal: "Lion", xp: 450 },
};

export const CAMPAIGN_GAMES: {
  [x: number]: string[];
} = {
  [CAMPAIGN_CIRCUIT_XP[0]]: [
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
  [CAMPAIGN_CIRCUIT_XP[1]]: [
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

  [CAMPAIGN_CIRCUIT_XP[2]]: [
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
  [CAMPAIGN_CIRCUIT_XP[3]]: [
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

  [CAMPAIGN_CIRCUIT_XP[4]]: [
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

  [CAMPAIGN_CIRCUIT_XP[5]]: [
    "Eagle",
    "Cassowary",
    "Parrot",
    "Pelican",
    "Salamander",
    "Ostrich",
    "Bat",
    "Cheetah",
    "Spider",
    "Stingray",
  ],

  [CAMPAIGN_CIRCUIT_XP[6]]: [
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
  [CAMPAIGN_CIRCUIT_XP[7]]: [
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
  [CAMPAIGN_CIRCUIT_XP[8]]: [
    "Lion",
    "Elephant",
    "Wolf",
    "Cheetah",
    "Hyena",
    "Gorilla",
    "Bear",
    "Orc",
    "Shark",
    "Alligator",
  ],
};
