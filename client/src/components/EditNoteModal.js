import React,{useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {removeCurrentNote,editNote} from "../actions/notes";
import Input from "@material-ui/core/Input";

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
}));

const EditNoteModal = ({ removeCurrentNote,notes:{isLoading, note}}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [noteData,setNoteData] = useStyles({
        noteTitle: '',
        noteContent: '',
        label: null,
        isCheckList: false,
        reminder: null
    });

    useEffect(() => {
        setNoteData({
            noteTitle: isLoading || !note.noteTitle ? '': note.noteTitle,
            noteContent: isLoading || !note.noteContent ? '': note.noteContent,
            label: isLoading || !note.label ? '': note.label,
            isCheckList: isLoading || !note.isCheckList ? '': note.isCheckList,
            reminder: isLoading || !note.reminder ? '': note.reminder
        },[isLoading])
    });

    const {
        noteTitle,
        noteContent,
        label,
        isCheckList,
        reminder
    } = noteData;

    const onChange = e =>
        setNoteData({...noteData, [e.target.name]: e.target.value});

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        removeCurrentNote();
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" onClick={handleOpen}>
                Edit Note
            </Button>

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
                        <Input
                            type="text"
                            name="noteTitle"
                            id="noteTitle"
                            placeholder="Insert the Title"
                            value={noteTitle}
                            required
                        />
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};

EditNoteModal.propTypes = {
    notes: PropTypes.object.isRequired,
    removeCurrentNote: PropTypes.func.isRequired

}

const mapStateToProps = state => ({
    notes : state.notes
})

export default connect(mapStateToProps,{removeCurrentNote})(EditNoteModal);
