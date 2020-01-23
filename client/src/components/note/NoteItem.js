import React from 'react';
import {Box, CardContent,Typography,Grid} from "@material-ui/core";
import PropTypes from 'prop-types'

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
                <Grid
                    container
                    alignItems="flex-start"
                    justify="space-around"
                >
                    <Grid item xs={9}>
                        <CardContent>
                            <Typography>{reminder === null ? null :displayRightDate(reminder)}</Typography>
                        </CardContent>
                    </Grid>
                    <Grid item xs={3}>
                        <CardContent className="label">
                            <Typography>{label}</Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

const displayRightDate = (date) => {
    let hourOffSet = -(new Date().getTimezoneOffset())/60;
    let realHour = parseInt(date.toString().slice(11,14))+hourOffSet;
    return realHour+date.toString().slice(13,16);
};

NoteItem.propTypes = {
    note: PropTypes.object.isRequired
};

export default NoteItem;
