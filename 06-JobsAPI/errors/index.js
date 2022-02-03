const CustomAPIError = require('./custom-api-error')
const BadRequestError = require('./bad-request')
const UnauthError = require('./unauth')
const NotFoundError = require('./not-found')
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//need to finish and add not-found 
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
module.exports = {CustomAPIError, BadRequestError, UnauthError, NotFoundError}