const { ZodError } = require('zod');

function sendValidation(res, error) {
  const details = error instanceof ZodError ? error.flatten() : String(error);
  return res.status(400).json({
    error: { code: 'VALIDATION_ERROR', message: 'Invalid input', details }
  });
}

const validateBody = (schema) => (req, res, next) => {
  try {
    const r = schema.safeParse(req.body);
    if (!r.success) return sendValidation(res, r.error);
    req.body = r.data;
    next();
  } catch (e) { return sendValidation(res, e); }
};

const validateParams = (schema) => (req, res, next) => {
  try {
    const r = schema.safeParse(req.params);
    if (!r.success) return sendValidation(res, r.error);
    req.params = r.data;
    next();
  } catch (e) { return sendValidation(res, e); }
};

module.exports = { validateBody, validateParams };
