const validate = (schema, property = "body") => {
  return (req, res, next) => {
    // console.log("step 1", property);
    try {
      const { error } = schema
        .options({ abortEarly: false })
        .validate(req[property]);
      const valid = error == null;

      if (valid) {
        next();
      } else {
        const { details } = error;
        // console.log("step 3", details);
        const message = details.map((i) => i.message);
        // console.log("error 4", message, property);
        return res.status(422).json({ error: message });
      }
    } catch (err) {
      // console.log("validation error 5", err);
      next(err);
    }
  };
};
module.exports = validate;
