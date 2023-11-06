const jwt = require('jsonwebtoken');

require("dotenv").config({ path: ".env.local" });
const SECRET_KEY = process.env.SECRET_KEY;

const checkToken = (req,res,next) => {
    try{
        req.decoded = jwt.verify(req.headers.authorization, SECRET_KEY);
        return next();
    }
    catch(err){
        if(err.name === 'JsonWebTokenError'){
            return res.status(401).end("유효하지 않은 토큰입니다.")
        }
        next(err);    
    }
}

module.exports = checkToken;