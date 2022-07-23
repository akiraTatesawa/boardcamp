import { Router } from "express";

// Controllers
import { postCustomer } from "../controllers/customersController.js";

// Middlewares
import {
  checkIfCustomerExists,
  validateCustomerBody,
} from "../middlewares/customersMiddlewares.js";

export const customersRouter = Router();

customersRouter.post(
  "/customers",
  validateCustomerBody,
  checkIfCustomerExists,
  postCustomer
);
