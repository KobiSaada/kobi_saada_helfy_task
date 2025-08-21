function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || 'Error';
  res.status(status).json({ error: { code: 'ERROR', message } });
}
module.exports = { errorHandler };