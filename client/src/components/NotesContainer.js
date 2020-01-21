import React, {Component, Fragment} from 'react';
import AddNoteForm from "./AddNoteForm";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getLabels} from "../actions/labels";
import {getNotes} from "../actions/notes";
import Note from "./Note";
import CircularProgress from "@material-ui/core/CircularProgress";

class NotesContainer extends Component {

    componentDidMount() {
        this.props.getNotes();
        this.props.getLabels();
    }

    render() {
        const { notes }= this.props.notes;
        const {isLoading} = this.props.notes;
        console.log("notecontainer props")
        console.log(notes);
        const notesList = notes.map(note => (
                <Note note={note} key={note._id}/>
        ));
        return isLoading ? (
            <CircularProgress color="primary" m="auto"/>
        ): (
            <div className="big-wrapper">
                <AddNoteForm/>
                <div className="notes-container">
                    {notesList}
                </div>
            </div>
        );
    }
}

NotesContainer.protoTypes ={
    notes: PropTypes.object.isRequired,
    labels: PropTypes.object.isRequired,
    getLabels: PropTypes.func.isRequired,
    getNotes: PropTypes.func.isRequired
};

const mapStateToProps = state =>({
    notes: state.notes,
    labels: state.labels
});

export default connect(mapStateToProps,{getNotes,getLabels})(NotesContainer);