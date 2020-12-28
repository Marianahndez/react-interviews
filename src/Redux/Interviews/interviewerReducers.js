import {
    ADD_INTERVIEWER,
    EDIT_INTERVIEWER,
    DELETE_INTERVIEWER
} from './interviewTypes';

const INITIAL_STATE = [];

const reducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case ADD_INTERVIEWER:
            console.log('state interviewer: ', state);

            state.push({
                id: state.length,
                eid: action.payload.eid,
                name: action.payload.name,
                candidates: action.payload.candidates
            })
            return state;
        default:
            return state;
    }
}

export default reducer;