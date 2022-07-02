const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    //check from token being sent in headers or a query parameter
    let token = req.get('Authorization') || process.env.TESTING_TOKEN
    if(token){
        console.log("check token")
        //We need to replace for our token string between the word bearer and our token
        token = token.replace('Bearer ', '');
        jwt.verify(token, process.env.SECRET, (err, decoded)=>{
            req.user = err ? null : decoded.user;
            //expiration
            req.exp = err ? null : new Date(decoded.exp * 1000);
        });
        next();
    }else{
        //No token was sent in headers
        req.user = null,
        next();
    }
}