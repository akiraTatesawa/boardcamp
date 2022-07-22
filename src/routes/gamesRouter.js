import { Router } from "express";

// Middlewares
import {
  checkIfGameCategoryExists,
  checkIfGameIsRegistered,
  validateGameBody,
} from "../middlewares/gamesMiddlewares.js";

// Controllers
import { getGames, postGame } from "../controllers/gamesController.js";

export const gamesRouter = Router();

gamesRouter.get("/games", getGames);

gamesRouter.post(
  "/games",
  validateGameBody,
  checkIfGameCategoryExists,
  checkIfGameIsRegistered,
  postGame
);
