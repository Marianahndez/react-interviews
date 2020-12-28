import {
    ADD_CANDIDATE,
    EDIT_CANDIDATE,
    ADD_SKILLS,
    EDIT_SKILLS,
    SAVE_QUESTIONS,
    ADD_COMMENT_SUMMARY,
} from './interviewTypes';

const INITIAL_STATE = [];

const reducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case ADD_CANDIDATE:
            console.log('state candidate: ', state);
            return state;
        default:
            return state;
    }
}

export default reducer;