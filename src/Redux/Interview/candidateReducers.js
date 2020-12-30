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
            state.push({
                id: state.length,
                name: action.payload.name,
                email: action.payload.email,
                typeCandidate: action.payload.typeCandidate,
                skills: [],
                score: 20,
                interviewerId: action.payload.interviewerId,
                questions: []
            })
            return [...state]
        case EDIT_CANDIDATE:
            const aux = state.findIndex(i => i.id === action.payload.id)
            state[aux] = action.payload;
            return [...state]
        default:
            return state;
    }
}

export default reducer;