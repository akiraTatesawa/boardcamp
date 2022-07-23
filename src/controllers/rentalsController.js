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
