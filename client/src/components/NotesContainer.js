import React, {Component, Fragment, useEffect} from 'react';
import AddNoteForm from "./AddNoteForm";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getNotes} from "../actions/notes";
import Note from "./note/Note";
import CircularProgress from "@material-ui/core/CircularProgress";
import createSpacing from "@material-ui/core/styles/createSpacing";

const NotesContainer = ({getNotes,notes:{notes, isLoading, activeFilter,currentLabel}}) =>{
    useEffect( ()=> {
        getNotes()
    },[getNotes]);

    const notesList = notes.map(note => (
           <Note note={note} key={note._id}/>
    ));

    console.log(notes)
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
    }else
        filteredNoteList = null;

    return isLoading ? (
            <CircularProgress color="primary" m="auto"/>
    ): (
            <div className="big-wrapper">
                <AddNoteForm/>
                <div className="notes-container">
                    {activeFilter ? filteredNoteList : notesList}
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
