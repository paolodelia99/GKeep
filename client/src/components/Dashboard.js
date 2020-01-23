import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Menu,Grid,Button} from "@material-ui/core";
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NotesContainer from './NotesContainer';
import Icon from "@material-ui/core/Icon";
import CircularProgress from "@material-ui/core/CircularProgress";
import EditLabelModal from './EditLabelModal';

import {connect} from 'react-redux';
import {getLabels, addLabel, deleteLabel} from "../actions/labels";
import { setFilterActive, setFilterUnActive} from "../actions/notes";
import PropTypes from 'prop-types'
import TextField from "@material-ui/core/TextField";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        bgcolor: "text.secondary"
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
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

const DashBoard = ({getLabels,addLabel,deleteLabel,setFilterActive,setFilterUnActive, labels: {labels, isLoading} }) => {
    useEffect(()=> {
        getLabels();
    },[getLabels]);

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [anchorMenuAddLabel, setAnchorMenuAddLabel] = useState(null);
    const [labelName, setNewLabelName] = useState('');
    const [openEditLab, setEditLab] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const setFilter = (labelName) => {
        setFilterActive(labelName)
    };

    const unSetFilter = ()=>{
        setFilterUnActive();
    };

    const addNewLabel = () => {
        addLabel(labelName);
        handleCloseAddLabelMenu()
    };

    const handleOpenAddLabelMenu = e => {
        setAnchorMenuAddLabel(e.currentTarget)
    };

    const handleCloseAddLabelMenu = () => {
        if(labelName !== '')
            setNewLabelName('');
        setAnchorMenuAddLabel(null)
    };

    const setOpenEditModal = () => {
        setEditLab(true)
    };

    const setCloseEditModal = () => {
        setEditLab(false)
    };

    const deleteSelectedLabel = id => {
        deleteLabel(id);
        setCloseEditModal();
    }


    return isLoading ? (
        <CircularProgress color="primary" />
    ):(
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
                bgcolor="text.secondary"
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        <Icon>lightbulb</Icon>  GKeep
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button onClick={unSetFilter}>
                        <ListItemIcon><Icon>lightbulb</Icon></ListItemIcon>
                        <ListItemText primary="Notes" />
                    </ListItem>
                    <ListItem button onClick={ e => setFilter('reminders')}>
                        <ListItemIcon><Icon>notifications_none</Icon></ListItemIcon>
                        <ListItemText primary="Reminders" />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    {labels.map(label => (
                        <ListItem button key={label._id} onClick={ e => setFilter(label.labelName)}>
                            <ListItemIcon><Icon>label</Icon></ListItemIcon>
                            <ListItemText primary={label.labelName}/>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                <List>
                    <ListItem button onClick={handleOpenAddLabelMenu}>
                        <ListItemIcon >
                            <Icon>add</Icon>
                        </ListItemIcon>
                        <ListItemText primary="Add new Label"/>
                    </ListItem>
                    <Menu
                        id="add-label-menu"
                        anchorEl={anchorMenuAddLabel}
                        keepMounted
                        open={Boolean(anchorMenuAddLabel)}
                        onClose={handleCloseAddLabelMenu}
                        style={{
                            padding: '3px'
                        }}
                    >
                        <TextField
                            margin="normal"
                            autoFocus
                            type="text"
                            name="labelName"
                            id="newLabel-TextField"
                            value={labelName}
                            placeholder="The new Label"
                            onChange={e => setNewLabelName(e.target.value)}
                            required
                        />
                        <Grid
                            container
                            alignItems="flex-start"
                            justify="space-around"
                        >
                            <Grid item xs={5}>
                                <Button onClick={handleCloseAddLabelMenu}>
                                    Close
                                </Button>
                            </Grid>
                            <Grid item xs={5}>
                                <Button onClick={addNewLabel}>
                                    Add Label
                                </Button>
                            </Grid>
                        </Grid>
                    </Menu>
                    <ListItem button onClick={setOpenEditModal}>
                        <ListItemIcon >
                            <Icon>create</Icon>
                        </ListItemIcon>
                        <ListItemText primary="Edit Labels"/>
                    </ListItem>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={openEditLab}
                        onClose={setCloseEditModal}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={openEditLab}>
                            <div className={classes.paper}>
                                <List>
                                    {labels.map(label => (
                                        <ListItem key={label._id} button onClick={ e => deleteSelectedLabel(label._id)}>
                                            <ListItemIcon><Icon>delete</Icon></ListItemIcon>
                                            <ListItemText primary={label.labelName}/>
                                        </ListItem>
                                    ))}
                                </List>
                            </div>
                        </Fade>
                    </Modal>
                </List>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <NotesContainer/>
            </main>
        </div>
    );
};

DashBoard.protoTypes = {
    getLabels: PropTypes.func.isRequired,
    addLabel: PropTypes.func.isRequired,
    deleteLabel: PropTypes.func.isRequired,
    labels: PropTypes.object.isRequired,
    setFilterUnActive: PropTypes.func.isRequired,
    setFilterActive: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    labels: state.labels
})

export default connect(
    mapStateToProps,
    {
        getLabels,
        addLabel,
        deleteLabel,
        setFilterUnActive,
        setFilterActive
    }
)(DashBoard);