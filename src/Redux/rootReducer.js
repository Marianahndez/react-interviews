import { combineReducers } from 'redux';
import interviewReducers from './Interview/interviewReducers';
import interviewerReducers from './Interview/interviewerReducers';
import candidateReducers from './Interview/candidateReducers';

const rootReducer = combineReducers({
    interview: interviewReducers,
    interviewer: interviewerReducers,
    candidate: candidateReducers,
});

export default rootReducer;