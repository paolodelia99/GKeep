import {
    ADD_LABEL,
    GET_LABELS,
    DELETE_LABEL
} from "../actions/types";

const initState = {
    labels:[],
    isLoading: true
};

export default function (state = initState,action) {
    const {type, payload} = action;

    switch (type) {
        case GET_LABELS:
            return{
                ...state,
                labels: payload,
                isLoading: false
            }
        case ADD_LABEL:
            return {
                ...state,
                labels: [ payload, ...state.labels],
                isLoading: false
            }
        case DELETE_LABEL:
            return {
                ...state,
                labels: state.labels.filter(label => label._id !== payload),
                isLoading: false
            }
        default:
            return state
    }
}
