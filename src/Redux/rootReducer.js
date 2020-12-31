import { combineReducers } from 'redux';
import interviewerReducers from './Interview/interviewerReducers';
import candidateReducers from './Interview/candidateReducers';

const rootReducer = combineReducers({
    interviewer: interviewerReducers,
    candidate: candidateReducers,
});

export default rootReducer;