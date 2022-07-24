import joi from "joi";

export const customerSchema = joi.object({
  name: joi.string().min(1).required(),
  phone: joi.string().min(10).max(11).required().pattern(/[0-9]/),
  cpf: joi.string().min(11).max(11).required().pattern(/[0-9]/),
  birthday: joi.date().iso().required(),
});
