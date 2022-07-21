import chalk from "chalk";
import connection from "../dbStrategy/postgres.js";

// Schemas
import { categoriesSchema } from "../schemas/categoriesSchema.js";

export async function validateCategoryBody(req, res, next) {
  const { error } = categoriesSchema.validate(req.body);
  const { name } = req.body;

  if (error) {
    console.log(chalk.red.bold(error.message));

    if (name.length === 0) {
      return res.sendStatus(400);
    }
    return res.sendStatus(422);
  }

  res.locals.categoryName = name;
  return next();
}

export async function checkIfCategoryExists(_req, res, next) {
  const { categoryName } = res.locals;

  try {
    const { rows: category } = await connection.query(
      "SELECT * FROM categories WHERE name=$1",
      [categoryName]
    );

    if (category.length !== 0 || category.name === categoryName) {
      console.log(chalk.red.bold(`Category already exists`));
      return res.sendStatus(409);
    }

    return next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
