import { validationResult } from "express-validator";

/**
 * Middleware to validate request against a given schema.
 *
 * @param {Array} schema - Array of validation chains from express-validator.
 * @returns {Function} Middleware function to validate the request.
 */
export const validate = (schema) => {
  return async (req, res, next) => {
    await Promise.all(schema.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  };
};
