import dayjs from "dayjs";

// DB Connection
import connection from "../dbStrategy/postgres.js";

export async function postRental(req, res) {
  const { customerId, gameId, daysRented } = req.body;
  const { game } = res.locals;

  const rentDate = dayjs().format("YYYY-MM-DD");
  const returnDate = null;
  const delayFee = null;
  const originalPrice = daysRented * game[0].pricePerDay;

  try {
    const text = `
    INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    const values = [
      customerId,
      gameId,
      rentDate,
      daysRented,
      returnDate,
      originalPrice,
      delayFee,
    ];

    await connection.query(text, values);
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getRentals(req, res) {
  const { customerId, gameId } = req.query;
  let conditionalSearch = "";
  let conditionalValues;

  if (customerId && gameId) {
    conditionalSearch = `WHERE rentals."customerId" = $1 AND rentals."gameId" = $2`;
    conditionalValues = [customerId, gameId];
  } else if (customerId && !gameId) {
    conditionalSearch = `WHERE rentals."customerId" = $1`;
    conditionalValues = [customerId];
  } else if (!customerId && gameId) {
    conditionalSearch = `WHERE rentals."gameId" = $1`;
    conditionalValues = [gameId];
  } else {
    conditionalValues = null;
  }

  const text = `
  SELECT rentals.*, json_build_object('id', customers.id, 'name', customers.name) AS customer, 
  json_build_object('id', games.id, 'name', games.name, 'categoryId', games."categoryId", 'categoryName', categories.name) AS game
  FROM rentals 
  JOIN customers 
  ON rentals."customerId" = customers.id
  JOIN games
  ON rentals."gameId" = games.id
  JOIN categories
  ON games."categoryId" = categories.id
  ${conditionalSearch}
  `;

  try {
    const { rows: rentals } = await connection.query(text, conditionalValues);

    return res.send(rentals);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function finishRental(req, res) {
  const { rental, returnDate, delayFee } = res.locals;
  const { id } = rental;

  try {
    const text = `
    UPDATE rentals
    SET "returnDate" = $1, "delayFee" = $2
    WHERE id = $3`;

    const values = [returnDate, delayFee, id];

    await connection.query(text, values);

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function deleteRental(req, res) {
  const { id } = req.params;

  try {
    const text = `
    DELETE FROM rentals
    WHERE id = $1
    `;
    const value = [id];

    await connection.query(text, value);

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
