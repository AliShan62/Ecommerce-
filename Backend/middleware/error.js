const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Invalid Product Id error handler
    if (err.name === 'CastError') {
        const message = `Resource Not Found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // Duplicate Key error
    if (err.code === 11000) {
        const message = 'Duplicate Key Violation!';
        err = new ErrorHandler(message, 401);
    }

    // Invalid JWT error
    if (err.name === 'JsonWebTokenError') {
        const message = 'Invalid token. Please log in again.';
        err = new ErrorHandler(message, 401);
    }

    // Expired JWT error
    if (err.name === 'TokenExpiredError') {
        const message = 'JSON Web Token Expired. Please log in again.';
        err = new ErrorHandler(message, 401);
    }

    res.status(err.statusCode).json({
        success: false,
        error: err.message,
        statusCode: err.statusCode,
    });
}
