const jwt = require("jsonwebtoken");

require("dotenv").config({ path: ".env.local" });
const SECRET_KEY = process.env.SECRET_KEY;

const checkToken = (req,res,next) => {
    try{
        if(!req.headers.authorization){
            req.decoded = { Admin:false };
            return next();
        } 
        req.decoded = jwt.verify(req.headers.authorization, SECRET_KEY);
        next();
    }catch(err){
        if(err.name === 'JsonWebTokenError'){
            return res.status(401).end("유효하지 않은 토큰입니다.")
        }else if (err.name === 'TokenExpiredError') {
            return res.status(401).end("토큰이 만료됐습니다.");
          } 
        next(err);    
    }
<<<<<<< HEAD
};
=======
  }
>>>>>>> b78c4e26fec5e525cef0efe1acd1150b0a0ff400

module.exports = checkToken;
