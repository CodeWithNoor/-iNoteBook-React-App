const express = require("express");
const User = require('../models/User');
const router = express.Router();

// hit the post request and send the data
// Create a User using: POST:/api/auth . Doesn't require Auth

router.post('/', (req, res) => {

    // --> Endpoint <--
    console.log(req.body);  // password can not be used in plain text
    const user = User(req.body)
    user.save()
    res.send(req.body);
    // res.send("Hello");
})

module.exports = router