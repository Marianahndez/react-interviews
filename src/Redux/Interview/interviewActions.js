import {
    ADD_INTERVIEWER,
    EDIT_INTERVIEWER,
    DELETE_INTERVIEWER,
    ADD_CANDIDATE,
    EDIT_CANDIDATE,
} from './interviewTypes';

export const addInterviewer = (JSONObj) => {
    return{
        type: ADD_INTERVIEWER,
        payload: JSONObj
    }
}

export const editInterviewer = (JSONObj) => {
    return{
        type: EDIT_INTERVIEWER,
        payload: JSONObj
    }
}

export const deleteInterviewer = (JSONObj) => {
    return{
        type: DELETE_INTERVIEWER,
        payload: JSONObj
    }
}

export const addCandidate = (JSONObj) => {
    return{
        type: ADD_CANDIDATE,
        payload: JSONObj
    }
}

export const editCandidate = (JSONObj) => {
    return{
        type: EDIT_CANDIDATE,
        payload: JSONObj
    }
}