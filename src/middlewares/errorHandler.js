export const errorHandler = (err, req, res, _next) => {
    res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message || 'Something went wrong',
    
  });
}; 