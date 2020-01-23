import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {deleteLabel} from "../actions/labels";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {ListItem} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Icon from "@material-ui/core/Icon";
import ListItemText from "@material-ui/core/ListItemText";

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

const EditLabelModal = ({labels:{labels}, deleteLabel,openModal, toggleModal}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(openModal);
    useEffect( ()=> {
        setOpen(openModal)
    },[setOpen]);

    const handleClose = ()=>{
        toggleModal()
    }

    return (
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
                    <List>
                        {labels.map(label => (
                            <ListItem button key={label._id}>
                                <ListItemIcon><Icon>label</Icon></ListItemIcon>
                                <ListItemText primary={label.labelName}/>
                                <ListItemIcon><Icon>delete</Icon></ListItemIcon>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Fade>
        </Modal>
    );
}

EditLabelModal.propTypes = {
    openModal: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    labels: state.labels
})

export default connect(mapStateToProps,{deleteLabel})(EditLabelModal);