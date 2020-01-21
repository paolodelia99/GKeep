import React from 'react';
import {
    Box,
    Button,
    Menu,
    MenuItem,
    CardContent,
    Typography,
    Icon
} from "@material-ui/core";
import {editNote, deleteNote,setCurrentNote} from "../actions/notes";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import EditNoteModal from './EditNoteModal'

const Note = ({deleteNote,setCurrentNote, note:{_id,noteTitle,noteContent,label,isCheckList,reminder}}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const removeNote = () => {
        deleteNote(_id);
        handleCloseMenu()
    }

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const setNote = () => {
        const note = {
            _id,
            noteTitle,
            noteContent,
            label,
            isCheckList,
            reminder
        }

        setCurrentNote(note);
    }

    return (
        <div className="big-note-wrapper">
            <Box className="note-container" >
                <Box >
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {noteTitle}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {noteContent}
                        </Typography>
                    </CardContent>
                    <CardContent className="label">
                        <Typography className="label">{label}</Typography>
                    </CardContent>
                </Box>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    <Icon>more_vert</Icon>
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                >
                    <MenuItem onClick={removeNote}>Delete Note</MenuItem>
                    <MenuItem onClick={handleCloseMenu}>Add Labels</MenuItem>
                    <MenuItem onClick={handleCloseMenu}>Add Reminder</MenuItem>
                </Menu>
                <Button onClick={setNote}>
                    <EditNoteModal/>
                </Button>
            </Box>

        </div>
    );
};

Note.propTypes = {
    note: PropTypes.object.isRequired,
    deleteNote: PropTypes.func.isRequired,
    setCurrentNote: PropTypes.func.isRequired
}

export default connect(null,{deleteNote,setCurrentNote})(Note);
