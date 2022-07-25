import { Router } from "express";

// Middlewares
import {
  calcDelayFee,
  checkIfCustomerExists,
  checkIfGameExists,
  checkIfGameIsAvailable,
  checkIfRentalExists,
  checkIfRentalIsFinished,
  validateRentalBody,
} from "../middlewares/rentalsMiddlewares.js";

// Controllers
import {
  finishRental,
  getRentals,
  postRental,
} from "../controllers/rentalsController.js";

export const rentalsRouter = Router();

// Validar gameId, customerId e daysRented
rentalsRouter.post(
  "/rentals",
  validateRentalBody,
  checkIfCustomerExists,
  checkIfGameExists,
  checkIfGameIsAvailable,
  postRental
);
rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post(
  "/rentals/:id/return",
  checkIfRentalExists,
  checkIfRentalIsFinished,
  calcDelayFee,
  finishRental
);
