import {combineReducers} from 'redux';
import AssignmentReducer from './assignment-reducer';
import ActiveAssignmentReducer from './reducer-active-assignment'

const allReducers = combineReducers({
    assignments: AssignmentReducer,
    activeAssignment: ActiveAssignmentReducer
});

export default allReducers;