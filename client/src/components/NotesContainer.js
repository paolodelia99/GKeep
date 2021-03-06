import React, {useEffect} from 'react';
import AddNoteForm from "./AddNoteForm";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getNotes} from "../actions/notes";
import Note from "./note/Note";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Grid} from "@material-ui/core";

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
