const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = {

    // middleware untuk generate token
    createToken : (data) => {
        const token = jwt.sign({...data}, process.env.SECRET_KEY_TOKEN);
        
        return token;
    },

    validateToken: (req, res, next) => {
        try {
        const bearerToken = req.headers.authorization // kalo sukses = token / gagal = undefined
        if(!bearerToken){
            res.status(401).json({
                message: "Unauthorized"
            })
        }
        
            const token = bearerToken.split(" ")[1]
            const decoded = jwt.verify(token, process.nextTick.SECRET_KEY_TOKEN);
            if(decoded){
                next()
            }
        }
        catch(error){
            console.log(error);
            res.status(401).json({
                message: "Invalid signature"
            })
        }
    }
}