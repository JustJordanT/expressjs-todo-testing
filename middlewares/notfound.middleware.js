const notFoundHandler = (req, res, next) => {
  const error = {
    status: 404,
    error: "Not Found",
    message: `Cannot ${req.method} ${req.originalUrl}`,
    timestamp: new Date().toISOString(),
    details: {
      path: req.path,
      method: req.method,
      query: req.query,
    },
  };

  // Send structured response
  res.status(404).json(error);
};

module.exports = notFoundHandler;
