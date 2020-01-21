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
            return {
                ...state,
                notes: state.notes.map(note => note._id === payload._id ?
                    {...note,
                        noteTitle: payload.noteTitle,
                        noteContent: payload.noteContent,
                        label: payload.label,
                        reminder: payload.reminder,
                        isCheckList: payload.isCheckList,
                    }: note )
            };
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
