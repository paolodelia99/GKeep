import axios from 'axios';
import {
    ADD_LABEL,
    DELETE_LABEL,
    GET_LABELS
} from "./types";


//Get labels
export const getLabels = () => async dispatch =>{
    try{
        const res = await axios.get('/api/labels');

        dispatch({
            type: GET_LABELS,
            payload: res.data
        })
    }catch (err) {//todo: ad gestire gli errori con opportuno reducer
        console.log(err)
    }
};

//Add New Label
export const addLabel = (labelName) => async dispatch =>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try{
        const res = await axios.post('/api/labels/',labelName,config);

        dispatch({
            type: ADD_LABEL,
            payload: res.data
        })
    }catch (err) {//todo: ad gestire gli errori con opportuno reducer
        console.log(err)
    }
};

//Get notes
export const deleteLabel = (id) => async dispatch =>{
    try{
        await axios.delete(`/api/labels/${id}`);

        dispatch({
            type: DELETE_LABEL,
            payload: id
        })
    }catch (err) {//todo: ad gestire gli errori con opportuno reducer
        console.log(err)
    }
};
