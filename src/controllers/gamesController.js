// DB connection
import connection from "../dbStrategy/postgres.js";

export async function postGame(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

  try {
    await connection.query(
      `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)`,
      [name, image, stockTotal, categoryId, pricePerDay]
    );

    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getGames(req, res) {
  const { name } = req.query;

  try {
    const query = `
    SELECT games.*, categories.name as "categoryName" FROM games
    JOIN categories
    ON games."categoryId" = categories.id
    ${name ? "WHERE games.name ILIKE $1" : ""}`;

    const value = name ? [`${name}%`] : null;

    const { rows: games } = await connection.query(query, value);

    return res.send(games);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
