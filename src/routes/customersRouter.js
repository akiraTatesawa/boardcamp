import { Router } from "express";

// Controllers
import {
  getCustomerById,
  getCustomers,
  postCustomer,
} from "../controllers/customersController.js";

// Middlewares
import {
  checkIfCustomerExists,
  validateCustomerBody,
  validateCustomerId,
} from "../middlewares/customersMiddlewares.js";

export const customersRouter = Router();

customersRouter.post(
  "/customers",
  validateCustomerBody,
  checkIfCustomerExists,
  postCustomer
);
customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", validateCustomerId, getCustomerById);
