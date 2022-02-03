const jwt = require('jsonwebtoken');
require('dotenv').config();
const UnauthError = require('../errors')

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`
//finished
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`
const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthError('Not authorized to access this part of the site')
    }

    const token = authHeader.split(' ')[1]

    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(payload);
        // const {id, username} = payload;
        req.user = {userID: payload.userID, name: payload.name};
        next();
    }

    catch(err){
        throw new UnauthError('Invalid authorization')
    }
}


module.exports = authMiddleware