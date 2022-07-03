var Cookies = require( "cookies" )
const { promisify } = require('util')
var jwt  = require('jsonwebtoken')
const AppError = require('../utils/appError')

async function isConnected(req, res, next){
    const token = new Cookies(req,res).get('access_token');  
    const eventInvitation = new Cookies(req,res).get('eventInvitation');
    if(token) {
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
        console.log("Ton id : ", decoded.id);
        if (next){
            next();
        } else 
        {
          return decoded.id;
        }
    }
    else {
        return next(new AppError("Tu n'es pas connecté", 404));
    }
}

module.exports = {
    isConnected
}