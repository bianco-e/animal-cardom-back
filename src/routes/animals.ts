import express, { Request, Response, Router } from "express";
import { CallbackError } from "mongoose";
import { IAnimal } from "../interfaces";
import AnimalCard from "../models/AnimalCard";
import { defaultOkResponse } from "../utils/defaultResponses";
const router: Router = express.Router();

router.get("/animals/all", (req: Request, res: Response) => {
  AnimalCard.find({}).exec((err: CallbackError, animals: IAnimal[]) => {
    if (err) return console.error("Error getting all animals", err);
    defaultOkResponse(res, { animals });
  });
});

router.get("/animals/newest", (req: Request, res: Response) => {
  AnimalCard.find({})
    .sort("-created_at")
    .limit(3)
    .exec((err: CallbackError, animals: IAnimal[]) => {
      if (err) return console.error("Error getting newest animals", err);
      defaultOkResponse(res, { animals });
    });
});

router.get("/animals/filter", (req: Request, res: Response) => {
  const { species, owned, skill_type, owned_to_filter } = req.query;
  const parsedSpecies = species?.toString();
  const ownedAnimals = owned && owned.toString().split(";");
  const ownedAnimalsToFilter =
    owned_to_filter && owned_to_filter.toString().split(";");
  AnimalCard.find({
    ...(ownedAnimals
      ? { name: { $in: ownedAnimals } }
      : ownedAnimalsToFilter
      ? { name: { $nin: ownedAnimalsToFilter } }
      : {}),
    ...(parsedSpecies ? { species: parsedSpecies } : {}),
    ...(skill_type ? { "skill.types": skill_type } : {}),
  }).exec((err: CallbackError, animals: IAnimal[]) => {
    if (err) return console.error("Error getting all animals", err);
    defaultOkResponse(res, { animals });
  });
});

router.post("/animals/create", (req: Request, res: Response) => {
  const newCard = new AnimalCard({
    ...req.body,
    created_at: new Date().getTime(),
  });
  newCard.save((err: CallbackError, createdAnimalCard: IAnimal) => {
    if (err) return console.error("Error creating new animal card", err);
    defaultOkResponse(res, `New card created: ${createdAnimalCard}`);
  });
});

router.post("/animals/create-many", (req: Request, res: Response) => {
  const cardsArray = req.body.map((card: IAnimal) => ({
    ...card,
    created_at: new Date().getTime(),
  }));
  AnimalCard.create(cardsArray)
    .then(() => {
      defaultOkResponse(res, `${cardsArray.length} cards created`);
    })
    .catch((err) => console.error("Error creating many animals cards", err));
});

export default router;
