const errorHandler = (error, req, res, next) => {
  const errorResponse = {
    status: error.status || 500,
    error: error.name || "Internal Server Error",
    message: error.message || "Something went wrong",
    timestamp: new Date().toISOString(),
    details: error.details || {},
  };

  res.status(errorResponse.status).json(errorResponse);
};

module.exports = errorHandler;
