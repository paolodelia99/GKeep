import { makeStyles } from "@material-ui/core";

export const noteStyle = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        borderRadius: '10px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    noteItemWrapper: {
        '&.hover':{
            shadows: { 24: '10px 10px rgba(0,0,0,0.2)' }
        }
    }
}));