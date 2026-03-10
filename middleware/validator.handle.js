const boom = require('@hapi/boom');

const validatorHanlder = (schema, property) => {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data);
    if (error) {
      next(boom.badRequest(error.details[0].message));
    } else {
      next();
    }
  };
};
module.exports = validatorHanlder;