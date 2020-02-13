import React,{Fragment,useState,useEffect,useRef,useLayoutEffect} from 'react';
import PropTypes from 'prop-types'
// Material UI imports
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from '@material-ui/icons/Search';
import Cancel from '@material-ui/icons/Cancel';
import Divider from "@material-ui/core/Divider";
import DirectionsIcon from '@material-ui/icons/Directions';
//Other imports
import { searchBarStyle } from "./styles/searchBarStyle";
//redux stuff
import { connect } from 'react-redux'
import {
    setKeyWordFilter,
    removeKeywordFilter
} from '../actions/notes'

const SearchBar =
    ({
         notes:{keywordFilter},
         setKeyWordFilter,
         removeKeywordFilter
     }) => {
    const classes = searchBarStyle();
    const [keyword,setKeyword] = useState('');
    const [keywordCounter,setKeywordCounter] = useState(0);
    const [removeKeywordCounter,setRemoveKeywordCounter] = useState(0)
    const firstUpdate = useRef(true);

    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }else {
            console.log(keyword)
            setKeyWordFilter(keyword)
        }
   },[keywordCounter]);

    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }else {
            removeKeywordFilter()
        }
    },[removeKeywordCounter]);

    const filterNotesByKeyWord = e => {
        e.preventDefault()
        console.log(keyword)
        setKeywordCounter(keywordCounter => keywordCounter+1)
    };

    const removeFilter = e =>{
        e.preventDefault()
        setKeyword('')
        setRemoveKeywordCounter(removeKeywordCounter => removeKeywordCounter + 1)
    }

    const searchButton = (
        <IconButton
            type="submit"
            onClick={e => filterNotesByKeyWord(e)}
            className={classes.iconButton}
            aria-label="search">
            <SearchIcon />
        </IconButton>
    );

    const cancelSearchButton = (
        <IconButton
            type="submit"
            onClick={e => removeFilter(e)}
            className={classes.iconButton}
            aria-label="search">
            <Cancel />
        </IconButton>
    )

    return (
        <Fragment>
            <Paper component="form" className={classes.root}>
                <InputBase
                    className={classes.input}
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
                {!keywordFilter ? searchButton : cancelSearchButton}
            </Paper>
        </Fragment>
    );
};

SearchBar.propTypes = {
    setKeyWordFilter: PropTypes.func.isRequired,
    removeKeywordFilter: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    notes: state.notes
})

export default
connect(mapStateToProps,
    {
        setKeyWordFilter,
        removeKeywordFilter
    })
(SearchBar);