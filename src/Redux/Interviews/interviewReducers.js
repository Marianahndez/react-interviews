import {
    SAVE_INTEVIEW,
} from './interviewTypes';

const INITIAL_STATE = [];

const reducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case SAVE_INTEVIEW:
            console.log('state interview: ', state);
            return state;
        default:
            return state;
    }
}

export default reducer;