const jwt = require('jsonwebtoken'); // This is JSON Web Token We User Signin We give the User A Token, and When a User Again Login, Token Will be check
const JWT_SECRET = "Null"; // Signature    

// This is Middleware, Basically This is a Function Which have 3 params, We Called next() in middleware, because we want req and res value in next param, In this case the next(), call the next function where we Use fetchuser as a middleware, 
// Its Used in auth.js in 3rd Route as a middleware.

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and id to req obj
    const token = req.header("auth-token");
    if(!token){
        res.status(401).send({error: "Please authenticate using a valid token"})
    }

    try {
        const data = jwt.verify(token, JWT_SECRET)
        // console.log(token);
        // console.log(data);
        // console.log(data.user);
        req.user = data.user;
        next()
    } catch (error) {
        res.status(401).send({error: "Please authenticate using a valid token"})
    }
} 

module.exports = fetchuser