responseHandler.js
function successResponse(res, data, message = 'Success') {
  res.status(200).json({
    status: 'success',
    message,
    data
  });
}

function errorResponse(res, error, statusCode = 500) {
  res.status(statusCode).json({
    status: 'error',
    message: error.message || 'An error occurred'
  });
}

module.exports = { successResponse, errorResponse };