const express = require("express");
const User = require('../models/User');
const router = express.Router();
// ...rest of the initial code omitted for simplicity.
const { body, validationResult } = require('express-validator');

// hit the post request and send the data
// Create a User using: POST:/api/auth . Doesn't require Auth

router.post('/', [

    // username must be an email
    body('username', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valide email').isEmail(),

    // password must be at least 5 chars long
    body('password', 'Password must be 5 numbers').isLength({ min: 5 }),
    ]  , (req, res) => {

    // --> Endpoint <--
    // console.log(req.body);  // password can not be used in plain text
    // const user = User(req.body)
    // user.save()
    // res.send("Hello");

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.send(req.body);
    
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }).then(user => res.json(user))

    .catch(err => {console.log(err) })
    res.json({err: "Please entera unique value of email", message: err.message});
    
})

module.exports = router