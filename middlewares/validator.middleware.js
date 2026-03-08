let validatorMiddleware = (schema, field = "body") => {
  return (req, res, next) => {
    try {
      let { error } = schema.validate(req[field]);
      if (error) throw error;
      next();
    } catch (error) {
      next(error);
    }
  };
};
export { validatorMiddleware };
