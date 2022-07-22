import { Router } from "express";

// Middlewares
import {
  checkIfGameCategoryExists,
  checkIfGameIsRegistered,
  validateGameBody,
} from "../middlewares/gamesMiddlewares.js";

// Controllers
import { postGame } from "../controllers/gamesController.js";

export const gamesRouter = Router();

gamesRouter.post(
  "/games",
  validateGameBody,
  checkIfGameCategoryExists,
  checkIfGameIsRegistered,
  postGame
);
