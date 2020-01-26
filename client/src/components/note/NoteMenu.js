import React, {Fragment, useState} from 'react';
import {Button, Icon, Menu, MenuItem} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import PropTypes from 'prop-types';

const NoteMenu = ({labels,isNewNote,toggleMenu,setLabel,removeNote,toggleCheckList,isCheckList}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorLabMenu, setAnchorLabMenu] = useState(null);
    const firstLabelName = labels[0].labelName;

    const handleClickLabelMenu = e =>{
        setAnchorLabMenu(e.currentTarget);
    };

    const handleCloseLabelMenu = e => {
        if(e.target.innerText !== undefined)
            setLabel(e.target.innerText);
        setAnchorLabMenu(null);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
        toggleMenu(false)
    };

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
        toggleMenu(true)
    };

    const toggleRemoveNote = () =>{
        removeNote();
        handleCloseMenu()
    };

    const setCheckList = ()=> {
        toggleCheckList()
    };

    return (
        <Fragment>
            <Button aria-controls="main-menu" aria-haspopup="true" onClick={handleClick}>
                <Icon>more_vert</Icon>
            </Button>
            <Menu
                id="main-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
            >
                {isNewNote ? null : (<MenuItem onClick={toggleRemoveNote}>Delete Note</MenuItem>)}
                <MenuItem aria-controls="labels-menu"
                          aria-haspopup="true"
                          onClick={handleClickLabelMenu} >
                    Add Labels
                </MenuItem>
                <MenuItem onClick={setCheckList}>Checklist {isCheckList ? <Icon style={{ color: green[500] }} >done</Icon> : <Icon color="secondary">clear</Icon>}</MenuItem>
                <Menu
                    id="labels-menu"
                    anchorEl={anchorLabMenu}
                    keepMounted
                    open={Boolean(anchorLabMenu)}
                    onClose={handleCloseLabelMenu}
                    PaperProps={{
                        style: {
                            maxHeight: 48 * 4.5,
                            width: 200,
                        },
                    }}
                >
                    {labels.map(label => (
                        <MenuItem
                            key={label._id}
                            className="label-item"
                            selected={label.labelName === firstLabelName}
                            onClick={handleCloseLabelMenu}
                        >
                            {label.labelName}
                        </MenuItem>
                    ))}
                </Menu>
            </Menu>
        </Fragment>
    );
};

NoteMenu.propTypes = {
    isNewNote: PropTypes.bool.isRequired,
    labels: PropTypes.array.isRequired,
    setLabel: PropTypes.func.isRequired,
    removeNote: PropTypes.func,
    toggleMenu: PropTypes.func,
    toggleCheckList: PropTypes.func.isRequired,
    isCheckList: PropTypes.bool.isRequired
}

export default NoteMenu;
