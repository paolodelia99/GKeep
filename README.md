# GKeep

Since I'm a Productivity guy, here I made a full web app (without auth) that tries to copy and app that I use a lot to keep traking my goal, my ideas, and my thought in general: Google Keep!
<br/>
Tools that I've used to build this app:
- [Mongodb](https://www.mongodb.com/) - as database
- [React](https://reactjs.org/) - for the front-end
- [Express](https://expressjs.com/) - as a back-end framework
- [Redux](https://redux.js.org/) - for linking the back-end with the front-end
- [Material-UI](https://material-ui.com/) - as a React UI framework (also to make more similar to the real Google Keep)

# comprehensive guide (or what it pretends to be)
Here's I'm gonna explain how I went to build this app:
## Folder Structure
For the folder structure I've done in this way: 
```
.
├── README.md
├── package-lock.json
├── package.json
├── client
├── models
│   ├── Lablel.js
│   └── Note.js
└── routes
│    └── api
│         ├──  label.js
│         └──  notes.js
├── .env
├── .gitingnore
└── server.js
```

Here's i have my backend and i the client folder I have all the frontend, which I'll explain later.
 
## Backend

For the backend I've imported the following packages from npm: 

- concurrently: for running the server and the client at the same time, without having two terminal opened at the same time
- create-react-app: for creating the react app in the client folder
- dotenv: for keeping the MONGO_URI
- express: as a backend framework
- mongoose: as a Object Data Modeling library for MongoDB and Node.js
 <br/>

---

The Backend structure is pretty simple: 

- in the model folder I've made the Schemas for the note and the label

Label:
```
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LabelSchema = new Schema({
    labelName:{
        type: String,
        isRequired: true
    }
});

module.exports = Label = mongoose.model('labels',LabelSchema);
```

Note:
```
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    noteTitle: {
        type: String,
        required: true
    },
    noteContent:{
        type: String,
        default: '',
        required: true
    },
    label:{
        type: String,
        required: false
    },
    isCheckList:{
        type: Boolean,
        required: true
    },
    reminder: {
        type: Date,
        default: null,
        required: false
    }
});

module.exports = Note = mongoose.model('notes',NoteSchema)
```

- in the api folder (inside the routes folder) I've made all the apis that I need to have: 

notes.js
```
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
    
            const note = await newNote.save();
    
            res.json(note);
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
    
        const noteFields = {};
        if(noteTitle) noteFields.noteTitle = noteTitle;
        if(noteContent) noteFields.noteContent = noteContent;
        if(isCheckList) noteFields.isCheckList = isCheckList;
        if(label) noteFields.label = label;
        if(reminder) noteFields.reminder = reminder;
    
        try{
            let editedNote = await Note.findByIdAndUpdate(req.params.id,
                {$set: {"noteTitle":noteTitle,
                               "noteContent":noteContent,
                               "isCheckList":isCheckList,
                                "label":label,
                                "reminder":reminder}
                                },
                {new: true ,upsert: false, useFindAndModify:false });
    
            res.json(editedNote);
        }catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });
    
    module.exports = router;

```

label.js

```
    const express = require('express');
    const router = express.Router();
    
    const Label = require('../../models/Label');
    
    // @route GET api/labels
    // @desc get All the labels
    // @access Public
    router.get('/',async (req,res)=>{
        try{
            const labels = await Label.find()
                                .sort({date:-1});
    
            res.json(labels)
        }catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });
    
    // @route POST api/labels
    // @desc create a label
    // @access Public
    router.put('/', async (req,res)=>{
        try{
            const newLabel = new Label({
                labelName: req.body.labelName
            });
    
            const label = await newLabel.save();
    
            res.json(label)
        }catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });
    
    // @route DELETE api/labels
    // @desc delete a label
    // @access Public
    router.delete('/:id',async (req,res)=>{
        try{
            const label = await Label.findById(req.params.id);
    
            await label.remove();
            res.json({success:true})
        }catch (err) {
                console.error(err.message);
                res.status(500).send('Server Error');
        }
    });
    
    // @route PUT api/labels
    // @desc edit a label
    // @access Public
    router.put('/:id', async (req,res)=>{
        const {
            labelName
        } = req.body;
    
        const labelFields = {};
        if(labelName) labelFields.labelName = labelName;
    
        try{
            let editedLabel = await Label.findByIdAndUpdate(req.params.id,{$set: labelFields},{ new: true, upsert: true,useFindAndModify:false });
    
            res.json(editedLabel);
        }catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });
    
    module.exports = router;
```

- the server.js file 

```
    const express = require('express');
    const mongoose = require('mongoose');
    const path = require('path');
    require('dotenv').config();
    
    const app = express();
    
    //Bodyparser Middleware
    app.use(express.json());
    
    //Connnect to Mongo
    mongoose.connect(process.env.MONGO_URI,{
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        })
        .then(()=> console.log('MongoDb Connected..'))
        .catch(err => console.log(`DB Connection Error: ${err.message}`));
    
    //Use Routes
    app.use('/api/notes',require('./routes/api/notes'));
    app.use('/api/labels',require('./routes/api/label'));
    
    //Server static assets if in production
    if(process.env.NODE_ENV === 'production'){
        //Set staic folder
        app.use(express.static('client/build'))
    
        app.get('*',(req,res) =>{
            res.sendFile(path.resolve(__dirname,'client','build','index.html'))
        })
    }
    
    const port = process.env.PRT || 5000;
    
    app.listen(port, ()=> console.log(`Server Started on port ${port}`));
```

## Frontend

For the client folder structure I've done in this way: 

```
.
├── README.md
├── package-lock.json
├── package.json
├── .gitingnore
├── public
│   ├── index.html 
│   ├── keep-512.png 
│   ├── manifest.json 
│   └── robots.txt 
└── src
    ├── actions 
    ├── components
    │       ├── note
    │       │    ├── Note.js
    │       │    ├── NoteItem.js
    │       │    └── NoteMenu.js
    │       ├── styles
    │       ├── AddNoteForm.js
    │       ├── NoteMenu.js
    │       ├── NotesContainer.js
    │       └── DashBoard.js
    ├── reducers
    ├── App.ccs
    ├── App.js
    ├── index.js
    ├── serviceWorker.js
    └── store.js
```

## Redux

## UI 
..to finish