import React, {useState, useEffect} from 'react';
import {
    Box,
    Button,
    Menu,
    MenuItem,
    CardContent,
    Typography,
    Icon
} from "@material-ui/core";
import {editNote, deleteNote} from "../../actions/notes";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import NoteItem from "./NoteItem";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Input from "@material-ui/core/Input";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    }
}));


const Note = ({deleteNote,editNote, note, labels:{labels}}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorLabMenu, setAnchorLabMenu] = useState(null);
    const [noteData, setNoteData] = useState({
        noteTitle: note.noteTitle,
        noteContent: note.noteContent,
        label: note.label,
        isCheckList: note.isCheckList,
        reminder: note.reminder
    });


    const firstLabelName = labels[0].labelName;
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

    const handleClickLabelMenu = e =>{
        setAnchorLabMenu(e.currentTarget);
    };

    const handleCloseLabelMenu = e => {
        console.log(e.target.innerText)
        if(e.target.innerText !== undefined)
            setNoteData({...noteData, label: e.target.innerText});
        setAnchorLabMenu(null);
    };

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const removeNote = () => {
        const {_id} = note;
        deleteNote(_id);
        handleCloseMenu()
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        const {_id} = note;
        console.log(noteData);
        editNote(_id,noteData);
        setOpen(false);
    };

    return (
        <div className="big-note-wrapper">
            <Box className="note-container">
                <div onClick={handleOpen}>
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
                                    <p className="label">{label}</p>
                                </form>
                            </div>
                            <div>
                                <Button>
                                    <Icon>add_alert</Icon>
                                </Button>
                                <Button>
                                    <Icon>color_lens</Icon>
                                </Button>
                                <Button aria-controls="main-menu" aria-haspopup="true" onClick={handleClick}>
                                    <Icon>more_vert</Icon>
                                </Button>
                                <Menu
                                    id="main-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleCloseMenu}
                                >
                                    <MenuItem onClick={removeNote}>Delete Note</MenuItem>
                                    <MenuItem >
                                        <Button
                                            aria-controls="labels-menu"
                                            aria-haspopup="true"
                                            onClick={handleClickLabelMenu}>
                                            Add Labels
                                        </Button>
                                    </MenuItem>
                                    <Menu
                                        id="labels-menu"
                                        anchorEl={anchorLabMenu}
                                        keepMounted
                                        open={Boolean(anchorLabMenu)}
                                        onClose={handleCloseLabelMenu}
                                        PaperProps={{
                                            style: {
                                                maxHeight: 48 * 4.5,
                                                width: 200,
                                            },
                                        }}
                                    >
                                        {labels.map(label => (
                                            <MenuItem
                                                      key={label._id}
                                                      className="label-item"
                                                      selected={label.labelName === firstLabelName}
                                                      onClick={handleCloseLabelMenu}
                                            >
                                                {label.labelName}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </Menu>
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
