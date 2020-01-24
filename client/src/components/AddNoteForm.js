import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {addNote} from "../actions/notes";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ReactDOM from 'react-dom';

class AddNoteForm extends Component{
    state = {
        noteTitle: '',
        noteContent: '',
        isCheckList: false,
        isClicked: false
    }

    onChange = e =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    };

     onSubmit = e => {
        e.preventDefault();

        const newNote = {
            noteTitle: this.state.noteTitle,
            noteContent: this.state.noteContent,
            isCheckList: this.state.isCheckList
        }

        this.props.addNote(newNote);

        this.setState({
            noteTitle: '',
            noteContent:'',
            isCheckList: false,
            isClicked: false
        })
    };

     openNoteFrom = ()=>{
         this.setState({
             isClicked: true
         })
     };

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, true);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, true);
    }

    handleClickOutside = event => {
        const domNode = ReactDOM.findDOMNode(this);

        if (!domNode || !domNode.contains(event.target)) {
            this.setState({
                isClicked: false
            });
        }
    }

    render() {
        const isClicked = this.state.isClicked
        const initialForm = (
            <form>
                <div className="form-container">
                    <TextField
                        type="text"
                        name="noteTitle"
                        id="noteTitle"
                        placeholder="Insert the note"
                        onClick={this.openNoteFrom}
                        required
                    />
                </div>
            </form>
        );

        const realForm = (
            <form onSubmit={this.onSubmit}>
                <div className="form-container">
                    <div className="row">
                        <Input
                            type="text"
                            name="noteTitle"
                            id="noteTitle"
                            value={this.state.noteTitle}
                            placeholder="Insert the Title"
                            onChange={this.onChange}
                            required
                        />
                    </div>
                    <div className="row">
                        <TextField
                            name="noteContent"
                            id="noteContent"
                            value={this.state.noteContent}
                            placeholder="Insert the content"
                            multiline={true}
                            rows={3}
                            rowsMax={5}
                            onChange={this.onChange}
                            required
                        />
                    </div>
                    <Button variant="outlined" type="submit" value="Submit">Add Note</Button>
                </div>
            </form>
        )

        return !isClicked ? (initialForm) :(realForm);

    }
};

AddNoteForm.propTypes = {
    addNote: PropTypes.func.isRequired
}

export default connect(null,{addNote})(AddNoteForm);
