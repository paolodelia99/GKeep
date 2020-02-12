import axios from 'axios';
import {
    GET_NOTES,
    ADD_NOTE,
    DELETE_NOTE,
    EDIT_NOTE,
    SET_FILTER_ACTIVE,
    SET_FILTER_UNACTIVE
} from "./types";

//Get notes
export const getNotes = () => async dispatch =>{
    try{
        const res = await axios.get('/api/notes');

        dispatch({
            type: GET_NOTES,
            payload: res.data
        })
    }catch (err) {//todo: ad gestire gli errori con opportuno reducer
        console.log(err)
    }
};

//Add note
export const addNote = (note) => async dispatch =>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try{
        const res = await axios.post('/api/notes',note,config);

        dispatch({
            type: ADD_NOTE,
            payload: res.data
        });

    }catch (err) {//todo: ad gestire gli errori con opportuno reducer
        console.log(err)
    }
};

//Delete note
export const deleteNote = (id) => async dispatch =>{
    try{
        await axios.delete(`/api/notes/${id}`);

        dispatch({
            type: DELETE_NOTE,
            payload: id
        })
    }catch (err) {//todo: ad gestire gli errori con opportuno reducer
        console.log(err)
    }
};

//Edit note
export const editNote = (id,note) => async dispatch =>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try{
        const res = await axios.put(`/api/notes/${id}`,note, config);

        dispatch({
            type: EDIT_NOTE,
            payload: res.data
        })

    }catch (err) {//todo: ad gestire gli errori con opportuno reducer
        console.log(err)
    }
};

//set active filter
export const setFilterActive = (label) => dispatch => {
    dispatch({
        type: SET_FILTER_ACTIVE,
        payload: label
    })
};

export const setFilterUnActive = () => dispatch => {
    dispatch({
        type: SET_FILTER_UNACTIVE
    })
}
