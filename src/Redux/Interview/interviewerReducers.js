import {
    ADD_INTERVIEWER,
    EDIT_INTERVIEWER,
    DELETE_INTERVIEWER
} from './interviewTypes';

const INITIAL_STATE = [];

const reducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case ADD_INTERVIEWER:
            state.push({
                id: state.length,
                eid: action.payload.eid,
                name: action.payload.name,
                candidates: action.payload.candidates
            })
            return [...state]
        case EDIT_INTERVIEWER:
            const aux = state.findIndex(i => i.id === action.payload.id)
            state[aux] = action.payload;
            return [...state]
        case DELETE_INTERVIEWER:
            let index = [];
            index = state.filter(i => {
                return i.id !== action.payload
            })
            return index
        default:
            return state
    }
}

export default reducer;