import { Router } from "express";

// Controllers
import {
  getCustomers,
  postCustomer,
} from "../controllers/customersController.js";

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
customersRouter.get("/customers", getCustomers);
