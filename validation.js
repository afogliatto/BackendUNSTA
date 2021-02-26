const Joi = require("@hapi/joi");

const carRentVal = (data) => {
  const schema = Joi.object({
    brand: Joi.string().min(6).required(),
    plate: Joi.string().min(6).max(7).required(),
    model: Joi.number().min(2010).max(2021).required(),
    pickupLocation: Joi.string().required(),
    pickupDate: Joi.string().required(),
    dropLocation: Joi.string().required(),
    dropDate: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports.carRentVal = carRentVal;
