const Joi = require("joi");

const postContactValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        // tlds: { allow: ["com", "net"] },
      })
      .required(),
    phone: Joi.string()
      .min(3)
      .max(15)
      .pattern(/^[0-9-()+ ]+$/)
      .required(),
  });
  const valodationResult = schema.validate(req.body);

  if (valodationResult.error) {
    const requiredFild = valodationResult.error.details[0].context.key;
    return res
      .status(400)
      .json({ message: `missing required '${requiredFild}' field` });
  }
  next();
};

const putContactValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email({
      minDomainSegments: 2,
    }),
    phone: Joi.string()
      .min(3)
      .max(15)
      .pattern(/^[0-9-()+ ]+$/),
  }).min(1);
  const valodationResult = schema.validate(req.body);

  if (valodationResult.error) {
    return res.status(400).json({ message: "missing fields" });
  }
  next();
};

const favoriteContactValidation = (req, res, next) => {
  const schema = Joi.object({
    favorite: Joi.bool().required(),
  });
  const valodationResult = schema.validate(req.body);

  if (valodationResult.error) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  next();
};

const queryContactValidation = (req, res, next) => {
  const schema = Joi.object({
    page: Joi.number().integer().positive(),
    limit: Joi.number().integer().positive().less(51),
    favorite: Joi.bool(),
  });
  const valodationResult = schema.validate(req.query);

  if (valodationResult.error) {
    return res.status(400).json({ message: "Wrong query field" });
  }
  next();
};

module.exports = {
  postContactValidation,
  putContactValidation,
  favoriteContactValidation,
  queryContactValidation,
};
