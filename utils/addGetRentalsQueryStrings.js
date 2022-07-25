import SqlString from "sqlstring";

export function addGetRentalsQueryStrings(
  gameId,
  customerId,
  startDate,
  status
) {
  const conditionalQueries = [];

  if (gameId) {
    conditionalQueries.push(`rentals."gameId" = ${SqlString.escape(gameId)}`);
  }
  if (customerId) {
    conditionalQueries.push(
      `rentals."customerId" = ${SqlString.escape(customerId)}`
    );
  }
  if (startDate) {
    conditionalQueries.push(
      `rentals."rentDate" >= ${SqlString.escape(startDate)}`
    );
  }
  if (status) {
    if (status === "open") {
      conditionalQueries.push(`rentals."returnDate" IS NULL`);
    }
    if (status === "closed") {
      conditionalQueries.push(`rentals."returnDate" IS NOT NULL`);
    }
  }

  return conditionalQueries;
}
