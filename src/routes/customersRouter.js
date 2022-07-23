import { Router } from "express";

// Controllers
import {
  getCustomerById,
  getCustomers,
  postCustomer,
  updateCustomerData,
} from "../controllers/customersController.js";

// Middlewares
import {
  checkIfCustomerCPFisBeingUsed,
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
customersRouter.put(
  "/customers/:id",
  validateCustomerId,
  checkIfCustomerCPFisBeingUsed,
  validateCustomerBody,
  updateCustomerData
);
