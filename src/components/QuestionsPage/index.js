import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import './questions.css'
import Radio from '@material-ui/core/Radio';
import { useState } from 'react';
import { RadioGroup } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const questions = [
    {
        id: 1,
        topic: 'Javascript',
        content: 'Bla bla bla question here?',
        correct: false,
        comments: ''
    },
    {
        id: 2,
        topic: 'Node JS',
        content: 'Bla bla bla question here?',
        correct: false,
        comments: ''
    },
]

function Questions(){
    let history = useHistory();
    const [selectedValue, setSelectedValue] = useState('true');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleNext = () =>{
        history.push("/")
    }

    return(
        <React.Fragment>
            <AliceCarousel disableDotsControls disableSlideInfo={false} className="noOverflow">
                {questions.map((question, i)=> (
                    <div className="question-container">
                        <h2>{question.topic}</h2>
                        <h5>{question.content}</h5>
                        <FormControl component="fieldset">
                            <RadioGroup value={selectedValue} onChange={handleChange} className="radiobuttons">
                                <FormControlLabel value="true" control={<Radio />} label="Correcto" />
                                <FormControlLabel value="false" control={<Radio />} label="Incorrecto" />
                            </RadioGroup>
                            <TextField
                            id="outlined-multiline-static"
                            label="Comentarios"
                            multiline
                            rows={4}
                            defaultValue="Default Value"
                            variant="outlined"
                            />
                        </FormControl>
                    </div>
                ))}
            </AliceCarousel>
            <div className="btn-container">
                <Button variant="contained" color="primary" onClick={handleNext} className="btnStyle">Finalizar <ArrowForwardIosIcon className="iconNext" /> </Button>
            </div>
        </React.Fragment>
    )
}

export default Questions;