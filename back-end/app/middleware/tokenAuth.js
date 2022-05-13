const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

// Set up Global configuration access
dotenv.config();

module.exports = (req, res, next) => {

    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    
    try {
        const token = req.header.authorization.split(' ')[1];

        const verifyingToken = jwt.verify(token, jwtSecretKey);
        
        if(verifyingToken) {
            return res.send("token successfully verified");
            next();
        }else{
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
}