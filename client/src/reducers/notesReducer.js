import {
    ADD_NOTE,
    GET_NOTES,
    DELETE_NOTE
} from "../actions/types";

const initState = {
    notes:[],
    isLoading: true
};

export default function (state = initState,action) {
    const {type, payload} = action;

    switch (type) {
        case GET_NOTES:
            return{
                ...state,
                notes: payload,
                isLoading: false
            }
        case ADD_NOTE:
            return {
                ...state,
                notes: [ payload, ...state.notes],
                isLoading: false
            }
        case DELETE_NOTE:
            return {
                ...state,
                notes: state.notes.filter(note => note._id !== payload),
                isLoading: false
            }
        default:
            return state
    }
}
