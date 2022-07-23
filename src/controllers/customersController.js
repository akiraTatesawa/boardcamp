import connection from "../dbStrategy/postgres.js";

export async function postCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  try {
    const query =
      "INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)";
    const values = [name, phone, cpf, birthday];

    await connection.query(query, values);

    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getCustomers(req, res) {
  const { cpf } = req.query;

  try {
    const query = `
    SELECT * FROM customers
    ${cpf ? "WHERE customers.cpf LIKE $1" : ""}`;

    const value = cpf ? [`${cpf}%`] : null;

    const { rows: customers } = await connection.query(query, value);

    return res.send(customers);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
