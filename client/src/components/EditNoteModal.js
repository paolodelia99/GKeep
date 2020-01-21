import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {removeCurrentNote,editNote} from "../actions/notes";

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

const EditNoteModal = ({ removeCurrentNote,note}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        removeCurrentNote();
        setOpen(false);
    };

    console.log(note);
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
                        <h2 contentEditable={true}>{}</h2>
                        <p contentEditable={true}>
                            {}
                        </p>
                        <p contentEditable={true}>{}</p>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};

EditNoteModal.propTypes = {
    note: PropTypes.object.isRequired,
    removeCurrentNote: PropTypes.func.isRequired

}

const mapStateToProps = state => ({
    note : state.notes.note
})

export default connect(mapStateToProps,{removeCurrentNote})(EditNoteModal);
