const validate = (schema, property = "body") => {
  return (req, res, next) => {
    // console.log("step 1", property);
    try {
      const { error } = schema
        .options({ abortEarly: false })
        .validate(req[property]);
      const valid = error == null;
      // console.log("step 2", valid, error);
      if (valid) {
        next();
      } else {
        const { details } = error;
        // console.log("step 3", details);
        const message = details.map((i) => i.message);
        // console.log("error", message, property);
        res.status(422).json({ error: message });
      }
    } catch (err) {
      console.log("validation error", err);
      next(err);
    }
  };
};
module.exports = validate;