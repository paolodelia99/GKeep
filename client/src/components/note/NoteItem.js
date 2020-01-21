import React from 'react';
import {Box, CardContent,Typography} from "@material-ui/core";

const NoteItem = ({note:{_id,noteTitle,noteContent,label,isCheckList,reminder}}) => {

    return (
        <div>
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
        </div>
    );
};

export default NoteItem;
