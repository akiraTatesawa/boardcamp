import { Router } from "express";

// Middlewares
import {
  calcDelayFee,
  checkIfCustomerExists,
  checkIfGameExists,
  checkIfGameIsAvailable,
  checkIfRentalExists,
  checkIfRentalIsFinished,
  checkIfRentalIsNotFinished,
  validateRentalBody,
} from "../middlewares/rentalsMiddlewares.js";

// Controllers
import {
  deleteRental,
  finishRental,
  getRentals,
  postRental,
} from "../controllers/rentalsController.js";

export const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post(
  "/rentals",
  validateRentalBody,
  checkIfCustomerExists,
  checkIfGameExists,
  checkIfGameIsAvailable,
  postRental
);
rentalsRouter.post(
  "/rentals/:id/return",
  checkIfRentalExists,
  checkIfRentalIsNotFinished,
  calcDelayFee,
  finishRental
);
rentalsRouter.delete(
  "/rentals/:id",
  checkIfRentalExists,
  checkIfRentalIsFinished,
  deleteRental
);
