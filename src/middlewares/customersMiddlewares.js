import chalk from "chalk";

// DB connection
import connection from "../dbStrategy/postgres.js";

// Schemas
import { customerSchema } from "../schemas/customersSchema.js";

export async function validateCustomerBody(req, res, next) {
  const { error } = customerSchema.validate(req.body);

  if (error) {
    console.log(chalk.red.bold(error.message));
    return res.sendStatus(400);
  }

  return next();
}

export async function checkIfCustomerExists(req, res, next) {
  const { cpf } = req.body;

  try {
    const { rows: customer } = await connection.query(
      "SELECT * FROM customers WHERE cpf = $1",
      [cpf]
    );

    if (customer[0]) {
      console.log(chalk.red.bold("Customer already exists"));
      return res.sendStatus(409);
    }

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function validateCustomerId(req, res, next) {
  const { id } = req.params;

  try {
    const { rows: customer } = await connection.query(
      "SELECT * FROM customers WHERE id = $1",
      [id]
    );

    if (!customer[0]) {
      console.log(chalk.red.bold("Customer not found"));
      return res.sendStatus(404);
    }

    res.locals.customer = customer;
    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function checkIfCustomerCPFisBeingUsed(req, res, next) {
  const { cpf } = req.body;
  const { id } = req.params;

  try {
    const { rows: customer } = await connection.query(
      "SELECT * FROM customers WHERE cpf = $1 AND id != $2",
      [cpf, id]
    );

    if (customer[0]) {
      console.log(chalk.red.bold("Invalid cpf"));
      return res.sendStatus(409);
    }

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
