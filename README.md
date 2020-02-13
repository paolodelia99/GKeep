# GKeep

Since I'm a Productivity guy, here I made a full web app (without auth) that tries to copy and app that I use a lot to keep traking my goal, my ideas, and my thought in general: Google Keep!
<br/>
<br/>

Check it out:
https://damp-fjord-04834.herokuapp.com/
<br/>
<br/>

## Disclaimer

Since I'm a junior SWE, don't expect my code to be perfect! I know that I can optimize a lot,
but that is just one of my first "big project", and I've tried to do my best with the skill 
that I've had back when I was starting working on this project.  So please be understanding.

## Quick Start: how to install it

```bash
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install

# Run both Express & React from root
npm run dev

# Build for production
cd client
npm run build
```

```bash
# change .env file in config folder

# add uri of your mongodb connection for example

 "mongoURI": "mongodb://localhost/dev-social",
 
```

# App Info

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
```javascript
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
```javascript
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
```javascript
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

```javascript
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

```javascript
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
    │       ├── SearchBar.js
    │       └── DashBoard.js
    ├── reducers
    ├── App.ccs
    ├── App.js
    ├── index.js
    ├── serviceWorker.js
    └── store.js
```

The App.js is a functional component and is the js file that will render, is pretty simple:

```javascript
    import React from 'react';
    import './App.css';
    import DashBoard from "./components/Dashboard";
    
    import {Provider} from 'react-redux';
    import store from "./store";
    
    function App() {
      return (
          <Provider store={store}>
              <div className="App">
                  <DashBoard/>
              </div>
          </Provider>
      );
    }
    
    export default App;
```

As you can see Its contains just one component <em>DashBoard</em> which is the main component that contains tha AppBar, the 
Drawer and the NotesContainer. In order for redux to work I've wrapped up the main app div with the <em>Provider</em> component from 'react-redux'.
I'll talk about how I went with Redux in the next section.
<br/>
The DashBoard component is a  pretty big stateless component( I know I have to do some cleaning ), which contains the AppBar component ( a Material UI component),
the Drawer component ( another Material UI component ) and main section contains the NotesContainer component. 

For handling all the events in the DashBoard I've used hooks.

The <b>AppBar</b> contains the menuItem that triggers the drawer the log and the search bar
```javascript
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
                bgcolor="text.secondary"
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap onClick={() => unSetFilter()}>
                        <Icon style={{ color: yellow[700] }}>lightbulb</Icon>  GKeep
                    </Typography>
                    <div className={classes.search}>
                        <SearchBar/>
                    </div>
                </Toolbar>
            </AppBar>
```

While the <b>Drawer</b> contains the note and reminder listItem, one listItem for label, the Menu for adding a new 
Label and the modal for edit/remove a label

```javascript
      <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <ListItem button onClick={unSetFilter} className={classes.sideBarItem}>
                            <ListItemIcon><Icon>lightbulb</Icon></ListItemIcon>
                            <ListItemText primary="Notes" />
                        </ListItem>
                        <ListItem button onClick={ e => setFilter('reminders')} className={classes.sideBarItem}>
                            <ListItemIcon><Icon>notifications_none</Icon></ListItemIcon>
                            <ListItemText primary="Reminders" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        {labels.map(label => (
                            <ListItem
                                button
                                key={label._id}
                                onClick={ e => setFilter(label.labelName)}
                                className={classes.sideBarItem}
                            >
                                <ListItemIcon><Icon>label</Icon></ListItemIcon>
                                <ListItemText primary={label.labelName}/>
                            </ListItem>
                        ))}
                    </List>
                    <Divider/>
                    <List>
                        <ListItem button onClick={handleOpenAddLabelMenu} className={classes.sideBarItem}>
                            <ListItemIcon >
                                <Icon>add</Icon>
                            </ListItemIcon>
                            <ListItemText primary="Add new Label"/>
                        </ListItem>
                        <Menu
                            id="add-label-menu"
                            anchorEl={anchorMenuAddLabel}
                            keepMounted
                            open={Boolean(anchorMenuAddLabel)}
                            onClose={handleCloseAddLabelMenu}
                            style={{
                                padding: '3px'
                            }}
                        >
                            <TextField
                                margin="normal"
                                autoFocus
                                type="text"
                                name="labelName"
                                id="newLabel-TextField"
                                value={labelName}
                                placeholder="The new Label"
                                onChange={e => setNewLabelName(e.target.value)}
                                required
                            />
                            <Grid
                                container
                                alignItems="flex-start"
                                justify="space-around"
                            >
                                <Grid item xs={5}>
                                    <Button onClick={handleCloseAddLabelMenu}>
                                        Close
                                    </Button>
                                </Grid>
                                <Grid item xs={5}>
                                    <Button onClick={addNewLabel}>
                                        Add Label
                                    </Button>
                                </Grid>
                            </Grid>
                        </Menu>
                        <ListItem button onClick={setOpenEditModal} className={classes.sideBarItem}>
                            <ListItemIcon >
                                <Icon>create</Icon>
                            </ListItemIcon>
                            <ListItemText primary="Edit Labels"/>
                        </ListItem>
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className={classes.modal}
                            open={openEditLab}
                            onClose={setCloseEditModal}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={openEditLab}>
                                <div className={classes.paper}>
                                    <List>
                                        {labels.map(label => (
                                            <ListItem key={label._id} button onClick={ e => deleteSelectedLabel(label._id)}>
                                                <ListItemIcon><Icon>delete</Icon></ListItemIcon>
                                                <ListItemText primary={label.labelName}/>
                                            </ListItem>
                                        ))}
                                    </List>
                                </div>
                            </Fade>
                        </Modal>
                    </List>
                </Drawer>
```

The main section contains the NoteContainer component:

```javascript
            <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <NotesContainer/>
            </main>
```

The <b>NotesContainer</b> is a stateless component and is responsible for filter and the displaying the notes.
Its also containes the note form for creating a new note

```javascript
const NotesContainer = ({getNotes,notes:{
    notes,
    isLoading,
    activeFilter,
    currentLabel,
    keywordFilter,
    keyword
}}) =>{
    useEffect( ()=> {
        getNotes()
    },[getNotes]);

    const notesList = notes.map(note => (
           <Note note={note} key={note._id}/>
    ));

    let filterNotes;
    let filteredNoteList;
    if(currentLabel !== ''  && activeFilter){
        if(currentLabel === 'reminders')
            filterNotes = notes.filter(note => note.reminder !== null);
        else
            filterNotes = notes.filter(note => note.label === currentLabel);

        filteredNoteList = filterNotes.length ? filterNotes.map(note => (
            <Note note={note} key={note._id}/>
        )): null
    }else if(!activeFilter && keywordFilter){
           if(keyword === '')
               filteredNoteList = notesList
           else{
               filterNotes = notes.filter(note => note.noteContent.includes(keyword) || note.noteTitle.includes(keyword))
               filteredNoteList = filterNotes.length ? filterNotes.map(note => (
                   <Note note={note} key={note._id}/>
               )): null
           }
    }else
        filteredNoteList = null;

    return isLoading ? (
        <div className="loading-div">
            <CircularProgress color="primary" className="loading-gif"/>
        </div>
    ): (
            <div className="big-notes-wrapper">
                <Grid container
                      direction="row"
                      justify="center"
                      alignItems="center"
                      className="big-form-wrapper">
                    <Grid>
                        <AddNoteForm/>
                    </Grid>
                </Grid>
                <div className="notes-container">
                    {activeFilter || keywordFilter ? filteredNoteList : notesList}
                </div>
            </div>
    );
}

NotesContainer.protoTypes ={
    notes: PropTypes.object.isRequired,
    getNotes: PropTypes.func.isRequired
};

const mapStateToProps = state =>({
    notes: state.notes
});

export default connect(mapStateToProps,{getNotes})(NotesContainer);
```

The Note component, in turn, contains the <b>NotesItem</b>, responsible for displaying the note title content and so on, and <b>Modal</b> 
that allow the user to edit the node.


## Redux

Redux it'a all about reducers, so let's talk about them.

In the reducer folder inside the client folder, I've made 
three reducers: the noteReducer, the labelReducer and the rootReducer.

The <b>Label reducer</b> is pretty simple and straightforward: the inital state contains and array <em>labels</em> that stores all
the labels, and a boolean isLoading. The actions type are pretty intuitive, ADD_LABEL,GET_LABELS and DELETE_LABEL

```javascript
import {
    ADD_LABEL,
    GET_LABELS,
    DELETE_LABEL
} from "../actions/types";

const initState = {
    labels:[],
    isLoading: true
};

export default function (state = initState,action) {
    const {type, payload} = action;

    switch (type) {
        case GET_LABELS:
            return{
                ...state,
                labels: payload,
                isLoading: false
            }
        case ADD_LABEL:
            return {
                ...state,
                labels: [ payload, ...state.labels],
                isLoading: false
            }
        case DELETE_LABEL:
            return {
                ...state,
                labels: state.labels.filter(label => label._id !== payload),
                isLoading: false
            }
        default:
            return state
    }
}
```

While the <b>noteReducer</b> is little bit more complex than the labelReducer. Of course the initial state contains an 
array notes, which stores all the note, and a boolean isLoading, but what is make more complex are: <em>activeFilter</em>,
<em>currentLabel</em>, <em>keywordFilter</em> and <em>keyword</em>. 
 
<em>activeFilter</em> and <em>currentLabel</em> are the selectors that filter the notes when a label on the drawer is clicked.

While the <em>keywordFilter</em> and <em>keyword</em> are the selectors that filter the notes when a keyword on the search bar is typed

```javascript

import {
    ADD_NOTE,
    GET_NOTES,
    DELETE_NOTE,
    EDIT_NOTE,
    SET_FILTER_ACTIVE,
    SET_FILTER_UNACTIVE,
    SET_KEYWORD_FILTER,
    REMOVE_KEYWORD_FILTER
} from "../actions/types";

const initState = {
    notes:[],
    isLoading: true,
    activeFilter: false,
    currentLabel: '',
    keywordFilter: false,
    keyword: ''
};

export default function (state = initState,action) {
    const {type, payload} = action;

    switch (type) {
        case GET_NOTES:
            return{
                ...state,
                notes: payload,
                isLoading: false
            };
        case ADD_NOTE:
            return {
                ...state,
                notes: [ payload, ...state.notes],
                isLoading: false
            };
        case EDIT_NOTE:
            return {
                ...state,
                notes: state.notes.map(note => note._id === payload._id ?
                    {
                        ...note,
                        noteTitle: payload.noteTitle,
                        noteContent: payload.noteContent,
                        label: payload.label,
                        reminder: payload.reminder,
                        isCheckList: payload.isCheckList,
                        color: payload.color
                    }: note)
            };
        case SET_FILTER_ACTIVE:
            if(payload === 'reminders')
                return {
                    ...state,
                    isLoading: false,
                    activeFilter: true,
                    keywordFilter: false,
                    keyword: '',
                    currentLabel: payload,
                };
            return{
                ...state,
                isLoading: false,
                activeFilter: true,
                keywordFilter: false,
                keyword: '',
                currentLabel: payload,
            };
        case SET_FILTER_UNACTIVE:
            return {
                ...state,
                isLoading: false,
                activeFilter: false,
                currentLabel: '',
            };
        case DELETE_NOTE:
            return {
                ...state,
                notes: state.notes.filter(note => note._id !== payload),
                isLoading: false
            };
        case SET_KEYWORD_FILTER:
            return {
                ...state,
                keywordFilter: true,
                activeFilter: false,
                currentLabel: '',
                keyword: payload
            };
        case REMOVE_KEYWORD_FILTER:
            return {
                ...state,
                keywordFilter: false,
                keyword: ''
            }
        default:
            return state
    }
}
```

All the filtered work is made by the <b>NotesContainer</b>: 
```javascript
 const notesList = notes.map(note => (
           <Note note={note} key={note._id}/>
    ));

    let filterNotes;
    let filteredNoteList;
    if(currentLabel !== ''  && activeFilter){
        if(currentLabel === 'reminders')
            filterNotes = notes.filter(note => note.reminder !== null);
        else
            filterNotes = notes.filter(note => note.label === currentLabel);

        filteredNoteList = filterNotes.length ? filterNotes.map(note => (
            <Note note={note} key={note._id}/>
        )): null
    }else if(!activeFilter && keywordFilter){
           if(keyword === '')
               filteredNoteList = notesList
           else{
               filterNotes = notes.filter(note => note.noteContent.includes(keyword) || note.noteTitle.includes(keyword))
               filteredNoteList = filterNotes.length ? filterNotes.map(note => (
                   <Note note={note} key={note._id}/>
               )): null
           }
    }else
        filteredNoteList = null;
```

If you know redux, you know that we need a rootReducer for combining the noteReducer and the labelReducer.
Here it is!

```javascript
import { combineReducers} from "redux";
import notes from './notesReducer';
import labels from './labelReducer';

export default combineReducers({
    notes,
    labels
})
```

## UI 

As I said in the beginnig for the styling part I've used the Material UI Framework that gives 
me a to prebuild and prestyled components ready to use.

For make the code more cleaner I've separeted the style code for the material UI component and another 
folder in the components folder called <em>styles</em>.

I structured these JS files in the following way:

```javascript
import { makeStyles } from "@material-ui/core";

export const componentStyle = makeStyles(theme =>({
    classname:{
       style: 
    },
}));
```

And I've kept my own style in App.css

### Author

Paolo D'Elia
[My webSite](http://www.google.com)

### Version

1.0.0
