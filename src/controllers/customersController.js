import connection from "../dbStrategy/postgres.js";

export async function postCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  try {
    const text =
      "INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)";
    const values = [name, phone, cpf, birthday];

    await connection.query(text, values);

    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getCustomers(req, res) {
  const { cpf } = req.query;

  try {
    const text = `
    SELECT * FROM customers
    ${cpf ? "WHERE customers.cpf LIKE $1" : ""}`;

    const value = cpf ? [`${cpf}%`] : null;

    const { rows: customers } = await connection.query(text, value);

    return res.send(customers);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export function getCustomerById(_req, res) {
  const { customer } = res.locals;

  return res.send(customer);
}

export async function updateCustomerData(req, res) {
  const { name, phone, cpf, birthday } = req.body;
  const { id } = req.params;

  try {
    const text = `
    UPDATE customers
    SET name = $1, phone = $2, cpf = $3, birthday = $4
    WHERE id = $5
    `;
    const values = [name, phone, cpf, birthday, id];

    await connection.query(text, values);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
