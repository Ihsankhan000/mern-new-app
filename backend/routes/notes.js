const express = require('express');
const fetchuser = require('../midleware/fetchuser');
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Note = require('../models/Notes');

//  ROUTE 1:  Get all notes using GET "/api/notes/fetchallnotes" Login required
router.get('/fetchallnotes',fetchuser,async(req, res) =>{
    try {
  const notes = await Note.find({user: req.user.id})
    res.json(notes)
}catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
})


//  ROUTE 2: Add a new Notes using POST "/api/notes/addnote" Login required
router.post('/addnote',fetchuser, [
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ], async(req, res) =>{
    try {
    const {title,description,tag} = req.body;
    // If there are errors,return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Note({
        title, description, tag, user:req.user.id
    })
   const savedNote =await note.save();
   res.json(savedNote)
} catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
})


//  ROUTE 3: update an existing Note using PUT "/api/notes/updatenote" Login required
router.put('/updatenote/:id',fetchuser, async(req, res) =>{
const {title,description,tag} = req.body; 
try {
// create a new note
const newNote = {};
// if title,description,tag is coming in req then add in newNote object
if(title){newNote.title = title}
if(description){newNote.description= description}
if(tag){newNote.tag = tag}
// Find the note tobe updated and update it
let note = await Note.findById(req.params.id);
// if note is not exist.
if(!note){return res.status(404).send("Not found")}
if(note.user.toString() !==req.user.id){
    return res.status(404).send("Not Allowed")
}

note =await Note.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true})
res.json(note);

} catch (error) {
  console.log(error.message);
  res.status(500).send("Internal Server Error");
}

});




//  ROUTE 4: Delete an existing Note using DELETE "/api/notes/deletenote" Login required
router.delete('/deletenote/:id',fetchuser, async(req, res) =>{
  try {
// Find the note tobe deleted and delete it
let note = await Note.findById(req.params.id);
if(!note){return res.status(404).send("Not found")}

// Allow deletion if user owns this note
if(note.user.toString() !==req.user.id){
    return res.status(404).send("Not Allowed")
}

note =await Note.findByIdAndDelete(req.params.id)
res.json({"success":"Note has been Deleted Successfully", note:note});

}catch (error) {
  console.log(error.message);
  res.status(500).send("Internal Server Error");
}

});


module.exports = router;