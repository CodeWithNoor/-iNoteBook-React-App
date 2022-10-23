const express = require("express");
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');  // This is bcryptjs, Which is Convert our PlaintextPassword to Hashing
var jwt = require('jsonwebtoken'); // This is JSON Web Token We User Signin We give the User A Token, and When a User Again Login, Token Will be check
var JWT_SECRET = "Null"; // Signature    
var fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');

// hit the post request and send the data


// ROUTE 1: Create a User using: POST:/api/auth/createuser . No login required

router.post('/createuser', [

    // username must be an email
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),

    // password must be at least 5 chars long
    body('password', 'Password must be 5 numbers').isLength({ min: 5 }),
], async (req, res) => {

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


    // try --> if any mistake in create user throw error 
    // The try statement lets you test a block of code for errors.
    // The catch statement lets you handle the error.
    // The throw statement lets you create custom errors.
    // The final statement lets you execute code, after try and catch, regardless of the result.


    try {

        // Check whether the user with this email exsist already

        let user = await User.findOne({ email: req.body.email })
        // console.log(user)

        if (user) {
            return res.status(400).json({ error: "Sorry a User with this email is alraedy exsist" })
        }

        // salt to protect against rainbow table attacks
        // bcrypt.js relies on Web Crypto API's getRandomValues interface to obtain secure random numbers.

        // Here plainText pass in hashing form
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt)

        // create new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        });

        // send a Token and id
        const data = {
            user: {
                id: user.id
            }
        }


        // Synchronously sign
        const authtoken = jwt.sign(data, JWT_SECRET); // Generate authtoken
        res.json({ authtoken })

        // res.json({"msg": "nice"})
        // res.json(user)


    }
    // catch error
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

    // .then(user => res.json(user))
    // .catch(err => {
    //     console.log(err);
    //     res.json({ Error: "Please Enter Unique Email Address" }
    //     )
    // })
})



// ROUTE 2: Authentication a User using: POST:/api/auth/login . No login required

router.post('/login', [    //Endpoint login
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {

    // If there are errors, return bad request and the errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }


        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})

// ROUTE 3: GET loggedin User detail : POST:/api/auth/getuser . Login required
// send a gwt token

router.post('/getuser', fetchuser,  async (req, res) => { // This fetchuser Gives us a user ID, This Function is in Middleware directory

        try {
            // .findById() Find User by ID
            // .select() is Select all Value Excluding password
            userId = req.user.id;
            const user = await User.findById(userId).select("-password")
            res.send(user)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })
module.exports = router;