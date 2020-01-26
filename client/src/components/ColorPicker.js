import React,{Fragment, useState} from 'react';
import { CirclePicker } from 'react-color';
import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import Icon from "@material-ui/core/Icon";

const ColorPicker = ({setColor,newNote,toggleMenu}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [color,setBGColor] = useState('#fff');

    const handleCloseMenu = () => {
        setColor(color);
        if(newNote)
            toggleMenu(false)
        setAnchorEl(null);
    };

    const handleClick = e =>{
        if(newNote)
            toggleMenu(true)
        setAnchorEl(e.currentTarget)
    };

    const handleChange = (color) =>{
        setBGColor(color.hex)
    };

    const colors = ["#fff","#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b"]

    return (
        <Fragment>
            <Button aria-controls="color-picker-menu" aria-haspopup="true" onClick={handleClick}>
                <Icon>color_lens</Icon>
            </Button>
            <Menu
                id="color-picker-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
            >
                <CirclePicker
                    color={color}
                    colors={colors}
                    onChangeComplete={handleChange}
                />
            </Menu>
        </Fragment>
    );
};

ColorPicker.propTypes = {
    toggleMenu: PropTypes.func,
    setColor: PropTypes.func.isRequired,
    newNote: PropTypes.bool.isRequired
};

export default ColorPicker;
