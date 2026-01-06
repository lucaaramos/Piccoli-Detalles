export const validateRequest = (schema, property = "body") => {
  return (req, res, next) => {
    const result = schema.safeParse(req[property]);

    if (!result.success) {
      return res.status(400).json({
        message: "Invalid request data",
        errors: result.error.errors
      });
    }

    req.validated = result.data;
    next();
  };
};
