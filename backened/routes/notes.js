const express = require("express");
const router = express.Router();
var fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes');

// ROUTE 1: Get all the notes using: GET:/api/auth/createuser . No login required
router.get('/fetchallnotes', fetchuser ,async (req, res) => {
    const notes = await Notes.find({user: req.user.id})
    res.json(notes)
})

module.exports = router