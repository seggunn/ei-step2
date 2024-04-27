const logger = require('./logger')

class ErrorHandler {
	serverError(err, req, res, next) {
		logger.error(err.stack)
		res.status(500).send('Something broke!')
	}
}

module.exports = new ErrorHandler();