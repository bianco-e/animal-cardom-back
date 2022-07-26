import { Document } from "mongoose";

export interface IAnimal extends Document {
  created_at: string;
  name: string;
  species: string;
  image: string;
  skill: {
    name: string;
    description: string;
    types: string[];
  };
  attack: { initial: number; current: number };
  life: { initial: number; current: number };
  poisoned: { damage: number; rounds: number };
  paralyzed: number;
  targeteable: boolean;
  bleeding: boolean;
  price: number;
}

export interface IFeedback extends Document {
  name: string;
  message: string;
  created_at: string;
}

export interface IAction extends Document {
  action: string;
  utm: string;
  guest_name: string;
  auth_id: string;
  created_at: string;
}

export interface IGame extends Document {
  auth_id: string;
  games: {
    created_at: string;
    earned_animal: string;
    terrain: string;
    earned_coins: number;
    earned_xp: number;
    won: boolean;
    used_animals: {
      user: { name: string; survived: boolean }[];
      pc: { name: string; survived: boolean }[];
    };
    used_plants: {
      user: { name: string; applied: boolean }[];
      pc: { name: string; applied: boolean }[];
    };
  }[];
}

export interface IPlant extends Document {
  name: string;
  description: string;
  image: string;
  appliable_on: string;
}

export interface ITerrain extends Document {
  speciesToBuff: string;
  image: string;
  name: string;
  color: string;
}

export interface IUser extends Document {
  auth_id: string;
  picture: string;
  email: string;
  first_name: string;
  last_name: string;
  locale: string;
  xp: number;
  coins: number;
  owned_cards: string[];
  hand: string[];
  preferences: {
    language: string;
  };
}
