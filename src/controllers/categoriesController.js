import connection from "../dbStrategy/postgres.js";

export async function postCategory(_req, res) {
  const { categoryName } = res.locals;

  try {
    await connection.query("INSERT INTO categories (name) VALUES ($1)", [
      categoryName,
    ]);

    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getCategories(_req, res) {
  try {
    const { rows: categories } = await connection.query(
      "SELECT * FROM categories"
    );

    return res.send(categories);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
