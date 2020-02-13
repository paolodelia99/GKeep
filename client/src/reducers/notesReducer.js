import {
    ADD_NOTE,
    GET_NOTES,
    DELETE_NOTE,
    EDIT_NOTE,
    SET_FILTER_ACTIVE,
    SET_FILTER_UNACTIVE,
    SET_KEYWORD_FILTER,
    REMOVE_KEYWORD_FILTER
} from "../actions/types";

const initState = {
    notes:[],
    isLoading: true,
    activeFilter: false,
    currentLabel: '',
    keywordFilter: false,
    keyword: ''
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
                    {
                        ...note,
                        noteTitle: payload.noteTitle,
                        noteContent: payload.noteContent,
                        label: payload.label,
                        reminder: payload.reminder,
                        isCheckList: payload.isCheckList,
                        color: payload.color
                    }: note)
            };
        case SET_FILTER_ACTIVE:
            if(payload === 'reminders')
                return {
                    ...state,
                    isLoading: false,
                    activeFilter: true,
                    keywordFilter: false,
                    keyword: '',
                    currentLabel: payload,
                };
            return{
                ...state,
                isLoading: false,
                activeFilter: true,
                keywordFilter: false,
                keyword: '',
                currentLabel: payload,
            };
        case SET_FILTER_UNACTIVE:
            return {
                ...state,
                isLoading: false,
                activeFilter: false,
                currentLabel: '',
            };
        case DELETE_NOTE:
            return {
                ...state,
                notes: state.notes.filter(note => note._id !== payload),
                isLoading: false
            };
        case SET_KEYWORD_FILTER:
            return {
                ...state,
                keywordFilter: true,
                activeFilter: false,
                currentLabel: '',
                keyword: payload
            };
        case REMOVE_KEYWORD_FILTER:
            return {
                ...state,
                keywordFilter: false,
                keyword: ''
            }
        default:
            return state
    }
}