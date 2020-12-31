import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import './questions.css'

import { editCandidate } from '../../Redux/Interview/interviewActions';

import { 
    RadioGroup, 
    Radio, 
    TextField, 
    Button, 
    FormControlLabel 
} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const questions = [
    {
        id: 0,
        topic: 'React JS',
        content: 'Difference between Typescript and Javascript?',
        correct: "false",
        comments: ''
    },
    {
        id: 1,
        topic: 'React JS',
        content: 'Difference between functional and class component?',
        correct: "false",
        comments: ''
    },
    {
        id: 2,
        topic: 'Javascript',
        content: 'What are the biggest challenges of working with React?',
        correct: "false",
        comments: ''
    },
    {
        id: 3,
        topic: 'Node JS',
        content: 'Do you have andy experience with Node JS?',
        correct: "false",
        comments: ''
    },
    {
        id: 4,
        topic: 'Angular',
        content: 'Do you have experience with Angular?',
        correct: "false",
        comments: ''
    },
    {
        id: 5,
        topic: 'Angular',
        content: 'What are the biggest challenges of working with Angular?',
        correct: "false",
        comments: ''
    },
    {
        id: 6,
        topic: 'Angular',
        content: 'Wich versions of Angular have you experienced?',
        correct: "false",
        comments: ''
    },
    {
        id: 7,
        topic: 'Backend',
        content: 'You have experience in backend technologies? / Which ones?',
        correct: "false",
        comments: ''
    },
]

function Questions(props){
    let history = useHistory();
    let { idInterviewer, idCandidate } = useParams();
    const dispatch = useDispatch();
    const [selectedValue, setSelectedValue] = useState("true");
    const [candidate, setCandidate] = useState({});

    useEffect(()=>{
        let aux = {}

        aux = props.reducer.filter(i => {
            return i.id === parseInt(idCandidate)
        });
        setCandidate(aux[0]);
    },[])

    const handleChange = (event) => {        
        questions[event.target.id].correct = event.target.value;
        setSelectedValue(event.target.value)
    };

    const handleNext = () =>{
        history.push("/summary/" + idCandidate)
    }

    const handleAnswers = (e) => {
        e.preventDefault();
        candidate.questions = questions;
        dispatch(editCandidate(candidate));
        history.push("/summary/" + idCandidate)
        console.log('go tosummer: ', candidate)
    }

    const handleChangeComments = (e) => {
        questions[e.target.id].comments = e.target.value;
    }

    return(
        <React.Fragment>
            <AliceCarousel disableDotsControls disableSlideInfo={false} className="noOverflow">
                {questions.map((question, i)=> (
                    <div className="question-container">
                        <h2>{question.topic}</h2>
                        <h5>{question.content}</h5>
                        <form onSubmit={handleAnswers}>
                            <RadioGroup value={selectedValue} onChange={handleChange} className="radiobuttons">
                                <FormControlLabel control={<Radio value="true" id={i} />} label="Correct" />
                                <FormControlLabel control={<Radio value="false" id={i} />} label="Incorrect" />
                            </RadioGroup>
                            <TextField
                            id={i}
                            label="Comments"
                            name="comments"
                            value={questions.comments}
                            onChange={handleChangeComments}
                            multiline
                            rows={4}
                            defaultValue="..."
                            variant="outlined"
                            />
                            <div className="btn-container">
                                <Button variant="contained" color="secondary" type="submit" className="btnStyle"> Finalize <ArrowForwardIosIcon className="iconNext" /> </Button>
                            </div>
                        </form>
                    </div>
                ))}
            </AliceCarousel>
            
        </React.Fragment>
    )
}

export default Questions;