import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {addNote} from "../actions/notes";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ReactDOM from 'react-dom';
import {Icon} from "@material-ui/core";
import {dateTimePickerStyle} from './styles/dateTimePickerStyle'
import {DateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {ThemeProvider} from "@material-ui/styles";
import NoteMenu from "./note/NoteMenu";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ColorPicker from "./ColorPicker";

class AddNoteForm extends Component{
    state = {
        noteTitle: '',
        noteContent: '',
        isCheckList: false,
        label: '',
        color: '#fff',
        reminder: null,
        isClicked: false,
        isPickerOpen: false,
        selectedDate: null,
        isMenuOpen: false,
        isColorPickerOpen: false
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
            label: this.state.label,
            isCheckList: this.state.isCheckList,
            reminder: this.state.selectedDate,
            color: this.state.color
        };

        this.props.addNote(newNote);

        this.setState({
            noteTitle: '',
            noteContent:'',
            isCheckList: false,
            isClicked: false,
            reminder: null,
            color: '#fff'
        })
    };

     openNoteFrom = ()=>{
         this.setState({
             isClicked: true
         })
     };

    handleOpenPicker = () =>{
        this.setState({
            isPickerOpen: true
        })
    };

    handleClosePicker = () =>{
        this.setState({
            isPickerOpen: false
        })
    };

    onChangeDate=  (date) =>{
        this.setState({
            selectedDate: date
        })
    };

    setLabel = (label) => {
        this.setState({
            label: label
        })
    };

    handleColorChange = (color)=>{
        this.setState({
            color: color
        })
    };

    setCheckList = () =>{
        this.setState({
            isCheckList: !this.state.isCheckList
        })
    };

    toggleMenu = (isOpen) =>{
        this.setState({
            isMenuOpen: isOpen
        })
    };

    toggleColorPicker = (isOpen) =>{
        this.setState({
            isColorPickerOpen: isOpen
        })
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, true);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, true);
    }

    handleClickOutside = event => {
        const domNode = ReactDOM.findDOMNode(this);

        if ((!domNode || !domNode.contains(event.target)) && !this.state.isPickerOpen && !this.state.isMenuOpen && !this.state.isColorPickerOpen) {
            this.setState({
                isClicked: false
            });
        }
    };

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

        const {labels} = this.props.labels;

        const realForm = (
            <form onSubmit={this.onSubmit}>
                <div className="form-container" style={{background: this.state.color }}>
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
                    <div className="row">
                        <Grid
                            container
                            alignItems="flex-start"
                            justify="space-around"
                        >
                            <Grid item xs={9}>
                                <ThemeProvider theme={dateTimePickerStyle}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DateTimePicker
                                            disabled={true}
                                            value={this.state.selectedDate}
                                            onChange={this.onChangeDate}
                                            open={this.state.isPickerOpen}
                                            onClose={this.handleClosePicker}
                                        />
                                    </MuiPickersUtilsProvider>
                                </ThemeProvider>
                            </Grid>
                            <Grid item xs={3}>
                                <CardContent>
                                    <Typography>{this.state.label ? this.state.label : null}</Typography>
                                </CardContent>
                            </Grid>
                        </Grid>
                    </div>
                    <div className="btns-container">
                        <Button onClick={this.handleOpenPicker}>
                            <Icon>add_alert</Icon>
                        </Button>
                        <ColorPicker
                            setColor={this.handleColorChange}
                            toggleMenu={this.toggleColorPicker}
                            newNote={true}
                        />
                        <NoteMenu
                            labels={labels}
                            isNewNote={true}
                            setLabel={this.setLabel}
                            toggleCheckList={this.setCheckList}
                            isCheckList={this.state.isCheckList}
                            toggleMenu={this.toggleMenu}
                        />
                        <Button variant="outlined" type="submit" value="Submit">Add Note</Button>
                    </div>
                </div>
            </form>
        )

        return !isClicked ? (initialForm) :(realForm);

    }
};

AddNoteForm.propTypes = {
    addNote: PropTypes.func.isRequired,
    labels: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    labels: state.labels
});

export default connect(mapStateToProps,{addNote})(AddNoteForm);
