import {
    ADD_CANDIDATE,
    EDIT_CANDIDATE,
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
                interviewerEID: action.payload.interviewerEID,
                questions: [],
                button: action.payload.button,
                summary: action.payload.summary,
                summaryComments: action.payload.summaryComments
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