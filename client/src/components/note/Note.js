import React, {useState} from 'react';
import {
    Box,
    Button,
    Menu,
    MenuItem,
    Icon,
    Grid
} from "@material-ui/core";
import { green } from '@material-ui/core/colors';
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
import NoteMenu from "../NoteMenu";


const Note = ({deleteNote,editNote, note, labels:{labels}}) => {
    const classes = noteStyle();
    const [open, setOpen] = useState(false);
    // const [anchorEl, setAnchorEl] = useState(null);
    // const [anchorLabMenu, setAnchorLabMenu] = useState(null);
    const [openPicker,setOpenPicker] = useState(false);
    const [noteData, setNoteData] = useState({
        noteTitle: note.noteTitle,
        noteContent: note.noteContent,
        label: note.label,
        isCheckList: note.isCheckList,
        reminder: note.reminder
    });
    const [selectedDate, handleDateChange] = useState(noteData.reminder);
    const [checkList, setCheckList] = useState(noteData.isCheckList)

    const {
        noteTitle,
        noteContent,
        label,
        isCheckList,
        reminder
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
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        const {_id} = note;
        if(selectedDate !== null){
            console.log(selectedDate)
            noteData.reminder = selectedDate;
        }
        noteData.isCheckList = checkList;
        console.log(noteData)
        editNote(_id,noteData);
        setOpen(false);
    };

    return (
        <div className="big-note-wrapper">
            <Box className="note-container">
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
                    <Fade in={open}>
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
                                <Button>
                                    <Icon>color_lens</Icon>
                                </Button>
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
