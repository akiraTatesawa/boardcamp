import chalk from "chalk";
import dayjs from "dayjs";

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

export async function checkIfRentalExists(req, res, next) {
  const { id } = req.params;

  try {
    const text = `SELECT * FROM rentals WHERE id = $1`;
    const value = [id];

    const { rows: rentals } = await connection.query(text, value);
    const [rental] = rentals;

    if (!rental) {
      console.log(chalk.red.bold("Rental not found"));
      return res.sendStatus(404);
    }

    res.locals.rental = rental;
    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export function checkIfRentalIsNotFinished(_req, res, next) {
  const { rental } = res.locals;

  if (rental.returnDate !== null) {
    console.log(chalk.red.bold("The rental is already finished"));
    return res.sendStatus(400);
  }

  const returnDate = dayjs().format("YYYY-MM-DD");
  res.locals.returnDate = returnDate;

  return next();
}

export function checkIfRentalIsFinished(_req, res, next) {
  const { rental } = res.locals;

  if (rental.returnDate === null) {
    console.log(chalk.red.bold("The rental is not finished"));
    return res.sendStatus(400);
  }

  return next();
}

export async function calcDelayFee(_req, res, next) {
  const { rental, returnDate } = res.locals;
  const { rentDate, daysRented, gameId } = rental;

  const maxReturnDate = dayjs(rentDate).add(daysRented, "day");
  const isReturnDateBeforeRentDueDate = dayjs(returnDate).isBefore(
    dayjs(maxReturnDate)
  );

  let delayFee = 0;

  try {
    const text = `SELECT * FROM games WHERE id = $1`;
    const value = [gameId];

    const { rows: game } = await connection.query(text, value);
    const { pricePerDay } = game[0];

    if (isReturnDateBeforeRentDueDate) {
      delayFee = 0;
    } else {
      delayFee =
        dayjs(returnDate).diff(dayjs(maxReturnDate), "day") * pricePerDay;
    }

    res.locals.delayFee = delayFee;

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
