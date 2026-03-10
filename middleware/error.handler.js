function errorLogs(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

function errorHandler(err, req, res, next) {
  res.status(500).json({ 
    message: 'Error interno del servidor',
    stack: err.stack 
  });
}

module.exports = {
  errorLogs,
  errorHandler
};