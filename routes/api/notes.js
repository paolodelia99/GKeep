const express = require('express');
const router = express.Router();

const Note = require('../../models/Note');

// @route GET api/notes
// @desc get All notes
// @access Public
router.get('/', async (req,res)=>{
    try{
        const notes = await Note.find()
                              .sort({date:-1});

        res.json(notes)
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route POST api/notes
// @desc create a note
// @access Public
router.post('/', async (req,res)=>{
    try{
        const newNote = new Note({
            noteTitle: req.body.noteTitle,
            noteContent: req.body.noteContent,
            isCheckList: req.body.isCheckList
        });

        if(req.body.label)
            newNote["label"] = req.body.label;

        if(req.body.reminder)
            newNote["reminder"] = req.body.reminder;

        await newNote.save()

        res.json(newNote);
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route DELETE api/notes
// @desc delete a note
// @access Public
router.delete('/:id',async (req,res)=>{
    try{
        const note = await Note.findById(req.params.id);

        await note.remove();
        res.json({success:true})
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route PUT api/notes
// @desc edit a note
// @access Public
router.put('/:id', async (req,res)=>{
    const {
        noteTitle,
        noteContent,
        isCheckList,
        label,
        reminder
    } = req.body;
    /*fixme da rivedere: il problema sta nell useFindAndModify che dovrebbe essere vero,
        ma se passo sempre almeno il titolo e il contenuto non dovrebbe essere un problema*/

    const noteFields = {};
    if(noteTitle) noteFields.noteTitle = noteTitle;
    if(noteContent) noteFields.noteContent = noteContent;
    if(isCheckList) noteFields.isCheckList = isCheckList;
    if(label) noteFields.label = label;
    if(reminder) noteFields.reminder = reminder;

    try{
        let editedNote = await Note.findOneAndUpdate(req.params.id,{$set: noteFields},{new: true ,upsert: false, useFindAndModify:false });

        res.json(editedNote);
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
