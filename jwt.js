const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req,res,next) => {

    // first check request headres has authorization or not
    const authorization = req.headers.authorization;
    if(!authorization) return res.status(401).json({error: 'Token not found'});

    //Extract the jwt token from the request header
    const token = req.headers.authroization.split(' ')[1];
    if(!token) return res.status(401).json({error: 'Unauthorized'});

    try {
        // verify the JWT token
        const decoded = jwt.verify(token , process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({error: 'Invalid Token'});
    }
}


// Generate Token
const generateToken = (userdata) =>{
    // Generate a new JWT Token using user data
    return jwt.sign(userdata , process.env.JWT_SECRET , {expiresIn: 30000});
}

module.exports = {jwtAuthMiddleware ,generateToken};