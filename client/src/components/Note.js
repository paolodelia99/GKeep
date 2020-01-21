import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    CardActions
} from "@material-ui/core";
import theme from './theme'

const Note = (props) => {
    console.log(props);
    return (
            <Box className="note-container" >
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {props.note.noteTitle}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {props.note.noteContent}
                    </Typography>
                </CardContent>
                <CardContent className="label">
                    <Typography className="label">{props.note.label}</Typography>
                </CardContent>
            </Box>
    );
};

export default Note;
