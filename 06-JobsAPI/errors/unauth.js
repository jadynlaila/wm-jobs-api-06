const CustomAPIError = require('./custom-api-error')
const { StatusCodes } = require('http-status-codes')

class UnauthError extends CustomAPIError {
    constructor(message){
        super(message);
        this.statusCodes = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnauthError;




