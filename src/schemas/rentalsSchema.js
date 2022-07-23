import joi from "joi";

export const rentalsSchema = joi.object({
  customerId: joi.number().integer().required(),
  gameId: joi.number().integer().required(),
  daysRented: joi.number().integer().greater(0).required(),
});
