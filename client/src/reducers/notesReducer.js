import {
    ADD_NOTE,
    GET_NOTES,
    DELETE_NOTE,
    EDIT_NOTE, SET_CURRENT_NOTE, REMOVE_CURRENT_NOTE
} from "../actions/types";

const initState = {
    notes:[],
    note: null,
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
            };
        case ADD_NOTE:
            return {
                ...state,
                notes: [ payload, ...state.notes],
                isLoading: false
            };
        case EDIT_NOTE:
            const {_id} = payload;
            return {
                ...state,
                [_id]: {...state[_id],note: payload}
            };
        case SET_CURRENT_NOTE:
            return {
                ...state,
                note: payload,
                isLoading: false
            };
        case REMOVE_CURRENT_NOTE:
            return {
                ...state,
                note: null,
                isLoading: false
            }
        case DELETE_NOTE:
            return {
                ...state,
                notes: state.notes.filter(note => note._id !== payload),
                isLoading: false
            };
        default:
            return state
    }
}
