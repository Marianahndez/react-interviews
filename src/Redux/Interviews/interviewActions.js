import {
    ADD_INTERVIEWER,
    EDIT_INTERVIEWER,
    DELETE_INTERVIEWER,
    ADD_CANDIDATE,
    EDIT_CANDIDATE,
    ADD_SKILLS,
    EDIT_SKILLS,
    SAVE_QUESTIONS,
    ADD_COMMENT_SUMMARY,
    SAVE_INTEVIEW,
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

export const addSkills = (JSONSkills) => {
    return{
        type: ADD_SKILLS,
        payload: JSONSkills
    }
}

export const editSkills = (JSONSkills) => {
    return{
        type: EDIT_SKILLS,
        payload: JSONSkills
    }
}

export const saveQuestions = (answers) => {
    return{
        type: SAVE_QUESTIONS,
        payload: answers
    }
}

export const addCommentSummary = (comment) => {
    return{
        type: ADD_COMMENT_SUMMARY,
        payload: comment
    }
}

export const saveInterview = (interview) => {
    return{
        type: SAVE_INTEVIEW,
        payload: interview
    }
}