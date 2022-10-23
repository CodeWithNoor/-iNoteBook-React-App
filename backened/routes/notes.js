const express = require("express");
const router = express.Router();
var fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');


// ROUTE 1: Get all the notes using: GET:/api/auth/createuser . No login required
router.get('/fetchallnotes', fetchuser , async (req, res) => {
    const notes = await Notes.find({user: req.user.id});
    res.json(notes);
})

// ROUTE 2: Add a new notes using: POST:/api/auth/addnotes . No login required
router.get('/addnotes', fetchuser , [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 character').isLength({ min: 3 })
] ,async (req, res) => {

    res.json(notes);
})

module.exports = router