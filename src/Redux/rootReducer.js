import { combineReducers } from 'redux';
import interviewReducers from './Interviews/interviewReducers';
import interviewerReducers from './Interviews/interviewerReducers';
import candidateReducers from './Interviews/candidateReducers';

const rootReducer = combineReducers({
    interview: interviewReducers,
    interviewer: interviewerReducers,
    candidate: candidateReducers,
});

export default rootReducer;