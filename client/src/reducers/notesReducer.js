import {
    ADD_NOTE,
    GET_NOTES,
    DELETE_NOTE,
    EDIT_NOTE, SET_FILTER_ACTIVE, SET_FILTER_UNACTIVE,
} from "../actions/types";

const initState = {
    notes:[],
    note: null,
    isLoading: true,
    activeFilter: false,
    currentLabel: '',
    filteredNotes: []
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
        case SET_FILTER_ACTIVE:
            if(payload === 'reminders')
                return {
                    ...state,
                    isLoading: false,
                    activeFilter: true,
                    currentLabel: payload,
                    filteredNotes: createReminderArray(state.notes)
                };
            return{
                ...state,
                isLoading: false,
                activeFilter: true,
                currentLabel: payload,
                filteredNotes: createFilteredArray(payload, state.notes)
            };
        case SET_FILTER_UNACTIVE:
            return {
                ...state,
                isLoading: false,
                activeFilter: false,
                currentLabel: '',
                filteredNotes: []
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

const createFilteredArray = (label,initialArray) =>{
    let filteredArray = new Array();

    for(let i=0;i<initialArray.length;i++)
        if(initialArray[i].label === label)
            filteredArray.push(initialArray[i])

    return filteredArray
};

const createReminderArray = (initialArray) => {
    let filteredArray = new Array();

    for(let i=0;i<initialArray.length;i++)
        if(initialArray[i].reminder !== null || initialArray[i].reminder !== undefined)
            filteredArray.push(initialArray[i])

    return filteredArray;
}
