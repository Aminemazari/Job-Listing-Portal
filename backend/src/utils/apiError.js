class ApiError extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;
		this.status = `${this.message}`.startsWith(4) ? "failed" : "Error";
		this.operational = true;
	}
}

module.exports = ApiError;
