import React from 'react';
import { useHistory } from 'react-router-dom';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import ButtonPersonAdd from '../ModalPersonAdd';

const useStyles = makeStyles((theme)=> ({
    center: {
        textAlign: 'center',
        height: '60vh',
        padding: theme.spacing(4)
    },
    buttonsContainer: {
        textAlign: 'right',
        padding: theme.spacing(4)
    },
    iconNext: {
        fontSize: '0.7rem',
        marginLeft: '0.5rem'
    },
    btnStyle: {
        textTransform: 'inherit'
    },
    mainText: {
        margin: '7rem 0 3rem 0',
        fontSize: '1.4rem',
        fontWeight: '100',
    },
    helpText: {
        fontSize: '0.7rem',
        fontStyle: 'italic',
        marginTop: '1.3rem',
    },
}));

function InterviewerDashboard(){
    let history = useHistory();
    const classes = useStyles();

    const handleNext = () =>{
        history.push("/interview")
    }

    return(
        <React.Fragment>
            <div className={classes.center}>
                <p className={classes.mainText}>No se ha registrado ningun entrevistador</p>
                <ButtonPersonAdd actionType="Add Interviewer" />
                <p className={classes.helpText}>Haz click aqui para agregar</p>
            </div>
            <div className={classes.buttonsContainer}>
                <Button variant="contained" color="primary" onClick={handleNext} className={classes.btnStyle}>Continuar <ArrowForwardIosIcon className={classes.iconNext} /> </Button>
            </div>
        </React.Fragment>
    )
}

export default InterviewerDashboard;