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

- in the api folder I've made all the apis that I need to have: 


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