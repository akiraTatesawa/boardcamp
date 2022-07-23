import { Router } from "express";

// Middlewares
import {
  checkIfCustomerExists,
  checkIfGameExists,
  checkIfGameIsAvailable,
  validateRentalBody,
} from "../middlewares/rentalsMiddlewares.js";

// Controllers
import { postRental } from "../controllers/rentalsController.js";

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
