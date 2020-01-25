import React, {Fragment} from 'react';
import {Box, CardContent,Typography,Grid, List, ListItem,Checkbox} from "@material-ui/core";
import PropTypes from 'prop-types'
import Icon from "@material-ui/core/Icon";

const NoteItem = ({note:{_id,noteTitle,noteContent,label,isCheckList,reminder}}) => {

    return (
        <div>
            <Box >
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {noteTitle}
                    </Typography>
                        {isCheckList ? (<List>
                                {createCheckList(noteContent).map(item => (
                                <ListItem key={item}>
                                    <Checkbox disabled value="disabled" inputProps={{ 'aria-label': 'disabled checkbox' }} />
                                    {" "}{item}</ListItem>
                                ))}
                            </List>
                        ) : (<Typography variant="body2" component="p">
                            {noteContent}
                        </Typography>)}
                </CardContent>
                <Grid
                    container
                    alignItems="flex-start"
                    justify="space-around"
                >
                    <Grid item xs={9}>
                        <CardContent>
                            <Fragment>{reminder === null ? null :(
                                <div className="time-wrapper">
                                    <Icon>access_time</Icon>
                                    <Typography className="time">{"  "}{displayRightDate(reminder)}</Typography>
                                </div>
                            )}</Fragment>
                        </CardContent>
                    </Grid>
                    <Grid item xs={3}>
                        {label ? (
                            <CardContent className="label">
                                <div className="label-container">
                                    <Typography>{label}</Typography>
                                </div>
                            </CardContent>
                        ): null}
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

// Slice and Stitch
const  createCheckList =( str ) => {
    console.log("metodo")
    let checkList = new Array()
    let newstr = "";

    for( var i = 0; i < str.length; i++ ){
        if( !(str[i] == '\n' || str[i] == '\r') )
            newstr += str[i];
        else {
            checkList.push(newstr);
            newstr = "";
        }
    }

    checkList.push(newstr);

    return checkList;
}

const displayRightDate = (date) => {
    let hourOffSet = -(new Date().getTimezoneOffset())/60;
    let realHour = parseInt(date.toString().slice(11,14))+hourOffSet;
    return realHour+date.toString().slice(13,16);
};

NoteItem.propTypes = {
    note: PropTypes.object.isRequired
};

export default NoteItem;
