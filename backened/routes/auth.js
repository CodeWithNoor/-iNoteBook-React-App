const express = require("express");
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');  // This is bcryptjs, Which is Convert our PlaintextPassword to Hashing
const jwt = require('jsonwebtoken'); // This is JSON Web Token We User Signin We give the User A Token, and When a User Again Login, Token Will be check
const JWT_SECRET = "Null"; // Signature    
const { body, validationResult } = require('express-validator');

// hit the post request and send the data
// Create a User using: POST:/api/auth/createuser . Doesn't require Auth . No login required

router.post('/createuser', [

    // username must be an email
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valide email').isEmail(),

    // password must be at least 5 chars long
    body('password', 'Password must be 5 numbers').isLength({ min: 5 }),
    ]  , async (req, res) => {

    // --> Endpoint <--
    // console.log(req.body);  // password can not be used in plain text
    // const user = User(req.body)
    // user.save()
    // res.send("Hello");

    // Finds the validation errors in this request and wraps them in an object with handy functions
    // If there are errors, return bad request and the errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // res.send(req.body);
    
    // Check whether the user with this email exsist already

    // try --> if any mistake in create user throw error 
    // The try statement lets you test a block of code for errors.
    // The catch statement lets you handle the error.
    // The throw statement lets you create custom errors.
    // The final statement lets you execute code, after try and catch, regardless of the result.
    

    try{  


        let user = await User.findOne({email: req.body.email})
        // console.log(user)
    
        if(user){
            return res.status(400).json({error: "Sorry a User with this email is alraedy exsist"})
        }

        // salt to protect against rainbow table attacks
        // bcrypt.js relies on Web Crypto API's getRandomValues interface to obtain secure random numbers.

        // Here plainText pass in hashing form
        const salt= await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password,salt)

            // create new user
            user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        // send a Token and id
        const data = {
            user:{
                id: 'user.id'
            }
        }

        // Synchronously sign
        const authtoken = await jwt.sign(data, JWT_SECRET); // Generate authtoken
        res.json({authtoken})

        // res.json({"msg": "nice"})
        // res.json(user)
        

    } 
        // catch error
        catch(error) {console.log(error.message)
        res.status(500).send("some error occured") }
    
})

module.exports = router