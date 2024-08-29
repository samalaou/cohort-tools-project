class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 500;
  }
}

class NotFoundError extends CustomError {
  constructor(message) {
    super(message || "Resource not found", 404);
  }
}

module.exports = {
  CustomError,
  NotFoundError,
};