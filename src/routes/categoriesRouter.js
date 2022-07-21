import { Router } from "express";

// Middlewares
import {
  checkIfCategoryExists,
  validateCategoryBody,
} from "../middlewares/categoriesMiddlewares.js";

// Controllers
import {
  getCategories,
  postCategory,
} from "../controllers/categoriesController.js";

export const categoriesRouter = Router();

categoriesRouter.get("/categories", getCategories);

categoriesRouter.post(
  "/categories",
  validateCategoryBody,
  checkIfCategoryExists,
  postCategory
);
