import chalk from "chalk";

// DB Connection
import connection from "../dbStrategy/postgres.js";

// Schemas
import { gameSchema } from "../schemas/gamesSchema.js";

export async function validateGameBody(req, res, next) {
  const { error } = gameSchema.validate(req.body);

  if (error) {
    console.log(chalk.red.bold(error.message));
    return res.sendStatus(400);
  }

  return next();
}

export async function checkIfGameCategoryExists(req, res, next) {
  const { categoryId } = req.body;

  try {
    const { rows: category } = await connection.query(
      "SELECT * FROM categories WHERE id = $1",
      [categoryId]
    );

    if (!category[0]) {
      console.log(chalk.red.bold("Invalid category"));
      return res.sendStatus(400);
    }

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function checkIfGameIsRegistered(req, res, next) {
  const { name } = req.body;

  try {
    const { rows: game } = await connection.query(
      "SELECT * FROM games WHERE name = $1",
      [name]
    );

    if (game[0]) {
      console.log(chalk.red.bold("This game is already registered"));
      return res.sendStatus(409);
    }

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
