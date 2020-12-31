import React, { useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import './questions.css'
import Radio from '@material-ui/core/Radio';
import { useState } from 'react';
import { RadioGroup } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import { useHistory, useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useDispatch } from 'react-redux';
import { editCandidate } from '../../Redux/Interview/interviewActions';

const questions = [
    {
        id: 0,
        topic: 'Javascript',
        content: 'Bla bla bla question here?',
        correct: "false",
        comments: ''
    },
    {
        id: 1,
        topic: 'Node JS',
        content: 'Bla bla bla question here?',
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
                            defaultValue="Default Value"
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