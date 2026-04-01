// Handle Mongoose validation errors
const handleValidationError = (err) => {
  const errors = {};
  
  Object.values(err.errors).forEach(error => {
    errors[error.path] = error.message;
  });
  
  return {
    success: false,
    message: 'Validation Error',
    errors
  };
};

// Handle duplicate field values (MongoDB)
const handleDuplicateField = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];
  
  return {
    success: false,
    message: `Duplicate field value: ${field} with value ${value}`,
    field,
    value
  };
};

// Handle invalid ObjectId
const handleCastError = (err) => {
  return {
    success: false,
    message: 'Invalid data format',
    field: err.path,
    value: err.value
  };
};

// Handle invalid JWT
const handleJWTError = () => {
  return {
    success: false,
    message: 'Invalid token. Please log in again.'
  };
};

// Handle expired JWT
const handleJWTExpiredError = () => {
  return {
    success: false,
    message: 'Token has expired. Please log in again.'
  };
};

// Send error response
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    success: err.success,
    message: err.message,
    error: err,
    stack: err.stack
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      ...(err.errors && { errors: err.errors })
    });
  } else {
    // Log error for debugging
    console.error('ERROR:', err);
    
    res.status(500).json({
      success: false,
      message: 'Something went wrong!'
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.success = err.success || false;

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else {
    let error = { ...err };
    error.message = err.message;

    // Handle specific error types
    if (err.name === 'ValidationError') error = handleValidationError(err);
    if (err.code === 11000) error = handleDuplicateField(err);
    if (err.name === 'CastError') error = handleCastError(err);
    if (err.name === 'JsonWebTokenError') error = handleJWTError();
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};