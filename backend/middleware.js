const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config")

const authenticateToken = (req,res,next) =>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(403).json({});
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, user) =>{
        if(err){
            return res.status(403).json(err)
        }
        req.user = user;
        next();
    });
}

module.exports = {
    authenticateToken
}