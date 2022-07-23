import JoiBase from "@hapi/joi";
import JoiDate from "@hapi/joi-date";

const Joi = JoiBase.extend(JoiDate);

export const customerSchema = Joi.object({
  name: Joi.string().min(1).required(),
  phone: Joi.string().min(10).max(11).required().pattern(/[0-9]/),
  cpf: Joi.string().min(11).max(11).required().pattern(/[0-9]/),
  birthday: Joi.date().format(["YYYY-MM-DD", "DD-MM-YYYY"]).utc().required(),
});
