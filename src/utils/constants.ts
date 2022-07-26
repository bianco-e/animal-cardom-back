const CAMPAIGN_CIRCUIT_XP = [0, 450, 900, 1350, 1800, 2250, 2700, 3150, 3600];

const INITIAL_ANIMALS = ["Alligator", "Basilisk Lizard", "Spider", "Octopus", "Vulture"];

export const NEW_USER_TEMPLATE = {
  coins: 25,
  xp: 0,
  owned_cards: INITIAL_ANIMALS,
  hand: INITIAL_ANIMALS,
  preferences: { language: "en" },
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
  [x: number]: { PC_ANIMALS: string[]; TERRAIN: string };
} = {
  [CAMPAIGN_CIRCUIT_XP[0]]: {
    PC_ANIMALS: [
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
    TERRAIN: "neutral",
  },
  [CAMPAIGN_CIRCUIT_XP[1]]: {
    PC_ANIMALS: [
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
    TERRAIN: "neutral",
  },
  [CAMPAIGN_CIRCUIT_XP[2]]: {
    PC_ANIMALS: [
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
    TERRAIN: "neutral",
  },
  [CAMPAIGN_CIRCUIT_XP[3]]: {
    PC_ANIMALS: [
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
    TERRAIN: "swamp",
  },
  [CAMPAIGN_CIRCUIT_XP[4]]: {
    PC_ANIMALS: [
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
    TERRAIN: "dessert",
  },
  [CAMPAIGN_CIRCUIT_XP[5]]: {
    PC_ANIMALS: [
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
    TERRAIN: "mountain",
  },
  [CAMPAIGN_CIRCUIT_XP[6]]: {
    PC_ANIMALS: [
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
    TERRAIN: "sea",
  },
  [CAMPAIGN_CIRCUIT_XP[7]]: {
    PC_ANIMALS: [
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
    TERRAIN: "forest",
  },
  [CAMPAIGN_CIRCUIT_XP[8]]: {
    PC_ANIMALS: [
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
    TERRAIN: "jungle",
  },
};
