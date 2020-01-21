import { combineReducers} from "redux";
import notes from './notesReducer';
import labels from './labelReducer';

export default combineReducers({
    notes,
    labels
})