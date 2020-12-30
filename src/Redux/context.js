import React, { createContext, useContext } from 'react';

export const InterviewData = {
    interviewers: [],
    candidates: [],
    questionsMock: []
}

export const mainContext = createContext(InterviewData);

export const InterviewContext = (props) => {
    return (
        <mainContext.Provider value={InterviewData}>
            {props.children}
        </mainContext.Provider>
    )
}

export const useStateValue = () => useContext(mainContext);