const express = require("express");
const router = express.Router();
var fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


// ROUTE 1: Get all the notes using: GET:/api/notescreateuser . No login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const note = await Note.find({ user: req.user.id });
        res.json(note);    
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new notes using: POST:/api/notes/addnotes . No login required
 // This fetchuser Gives us a user ID, This Function is in Middleware directory

router.post('/addnotes', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 character').isLength({ min: 3 })
], async (req, res) => {
    
    try {
        const {title, description, tag} = req.body    
        
        // If there are errors, return bad request and the errors
        
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
           return res.status(400).json({ errors: errors.array() });
       }
           
       const note = new Note({     // Create New Note. new keyword create A new empty object.
           title, description, tag, user: req.user.id
       })
    
       const SavedNote = await note.save()    // .save() method Save New Created Note.
       res.json(SavedNote);
   }   
        
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }   
})


// ROUTE 3: Upadta an exsisting notes using: PUT:/api/notes/updatenotes . No login required
router.put('/updatenotes/:id', fetchuser, async (req, res) => { 

    try {
            
    const {title, description, tag} = req.body  //  destructuring

    // create a newnote object
    const newNote = {}
    if(title) {newNote.title = title}
    if(description) {newNote.description = description}
    if(tag) {newNote.tag = tag}

    // Find the note to be updated and update it
    let note = await Note.findById(req.params.id)
    if(!note){return res.status(400).send("Not found")}

    if(note.user.toString() !== req.user.id)
    {
        return res.status(401).send("Not Allowed")
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
    res.json({note})

}  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}   
})

module.exports = router
