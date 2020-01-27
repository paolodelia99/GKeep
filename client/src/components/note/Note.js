import React, {useState} from 'react';
import {
    Box,
    Button,
    Icon,
    Grid
} from "@material-ui/core";
import {editNote, deleteNote} from "../../actions/notes";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import NoteItem from "./NoteItem";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from '@date-io/date-fns';
import { ThemeProvider } from "@material-ui/styles";
import {
    DateTimePicker,
    MuiPickersUtilsProvider
} from "@material-ui/pickers";

import {noteStyle} from '../styles/noteStyle';
import {dateTimePickerStyle} from "../styles/dateTimePickerStyle";
import NoteMenu from "./NoteMenu";
import ColorPicker from "../ColorPicker";


const Note = ({deleteNote,editNote, note, labels:{labels}}) => {
    const classes = noteStyle();
    const [open, setOpen] = useState(false);
    const [openPicker,setOpenPicker] = useState(false);
    const [noteData, setNoteData] = useState({
        noteTitle: note.noteTitle,
        noteContent: note.noteContent,
        label: note.label,
        isCheckList: note.isCheckList,
        reminder: note.reminder,
        color: note.color
    });
    const [selectedDate, handleDateChange] = useState(noteData.reminder);
    const [checkList, setCheckList] = useState(noteData.isCheckList);
    const [bgcolor,setColor] = useState(noteData.color)

    const {
        noteTitle,
        noteContent,
        label,
        isCheckList,
        reminder,
        color
    } = noteData;

    const onChangeFields = e => {
        setNoteData({...noteData, [e.target.name]:e.target.value})
    };

    const setLabel = (label) => {
        setNoteData({...noteData,label:label})
    };

    const toggleCheckList = () =>{
        setCheckList(!checkList)
        console.log(checkList)
    };

    const removeNote = () => {
        const {_id} = note;
        deleteNote(_id);
    };

    const handleOpenPicker = () => {
        setOpenPicker(true);
    };

    const handleClosePicker = () => {
        setOpenPicker(false)
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleColorChange = (color) =>{
        setColor(color)
    };

    const handleClose = () => {
        const {_id} = note;
        if(selectedDate !== null){
            noteData.reminder = selectedDate;
        }
        noteData.isCheckList = checkList;
        noteData.color = bgcolor;
        editNote(_id,noteData);
        setOpen(false);
    };

    return (
        <div className="big-note-wrapper">
            <Box className="note-container" style={{background: color}}>
                <div onClick={handleOpen} className={classes.noteItemWrapper}>
                    <NoteItem note={note}/>
                </div>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open} style={{background: color}}>
                        <div className={classes.paper}>
                            <div>
                                <form className={classes.form}>
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        autoFocus
                                        type="text"
                                        name="noteTitle"
                                        id="noteTitle"
                                        value={noteTitle}
                                        placeholder="Insert the Title"
                                        onChange={e => onChangeFields(e)}
                                        required
                                    />
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        autoFocus
                                        name="noteContent"
                                        id="noteContent"
                                        value={noteContent}
                                        placeholder="Insert the content"
                                        multiline={true}
                                        rows={3}
                                        rowsMax={5}
                                        onChange={e => onChangeFields(e)}
                                        required
                                    />
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
                                                        value={selectedDate}
                                                        onChange={handleDateChange}
                                                        open={openPicker}
                                                        onClose={handleClosePicker}
                                                    />
                                                </MuiPickersUtilsProvider>
                                            </ThemeProvider>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <p className="label">{label}</p>
                                        </Grid>
                                    </Grid>
                                </form>
                            </div>
                            <div>
                                <Button onClick={handleOpenPicker}>
                                    <Icon>add_alert</Icon>
                                </Button>
                                <ColorPicker
                                    setColor={handleColorChange}
                                    newNote={false}
                                />
                                <NoteMenu
                                    isNewNote={false}
                                    setLabel={setLabel}
                                    removeNote={removeNote}
                                    labels={labels}
                                    toggleCheckList={toggleCheckList}
                                    isCheckList={isCheckList}
                                />
                                <Button onClick={handleClose} >Close</Button>
                            </div>
                        </div>
                    </Fade>
                </Modal>
            </Box>
        </div>
    );
};

Note.propTypes = {
    note: PropTypes.object.isRequired,
    labels: PropTypes.object.isRequired,
    deleteNote: PropTypes.func.isRequired,
    editNote: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    labels: state.labels
});

export default connect(mapStateToProps,{editNote,deleteNote})(Note);
