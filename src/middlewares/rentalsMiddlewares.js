import chalk from "chalk";

// DB connection
import connection from "../dbStrategy/postgres.js";

// Schemas
import { rentalsSchema } from "../schemas/rentalsSchema.js";

export function validateRentalBody(req, res, next) {
  const { error } = rentalsSchema.validate(req.body);

  if (error) {
    console.log(chalk.red.bold(error.message));
    return res.sendStatus(400);
  }

  return next();
}

export async function checkIfCustomerExists(req, res, next) {
  const { customerId } = req.body;

  try {
    const text = `
    SELECT * FROM customers
    WHERE id = $1
    `;
    const value = [customerId];

    const { rows: customer } = await connection.query(text, value);

    if (!customer[0]) {
      console.log(chalk.red.bold("Invalid customer"));
      return res.sendStatus(400);
    }

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function checkIfGameExists(req, res, next) {
  const { gameId } = req.body;

  try {
    const text = `
    SELECT * FROM games
    WHERE id = $1
    `;
    const value = [gameId];

    const { rows: game } = await connection.query(text, value);

    if (!game[0]) {
      console.log(chalk.red.bold("Invalid game"));
      return res.sendStatus(400);
    }

    res.locals.game = game;
    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function checkIfGameIsAvailable(req, res, next) {
  const { gameId } = req.body;
  const { game } = res.locals;

  try {
    const text = `
    SELECT * FROM rentals
    WHERE "gameId" = $1
    `;
    const value = [gameId];

    const { rows: rentals } = await connection.query(text, value);

    if (rentals.length >= game[0].stockTotal) {
      return res.sendStatus(400);
    }

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
