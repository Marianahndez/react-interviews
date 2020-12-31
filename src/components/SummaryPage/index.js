import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, ListItem, ListItemIcon, TextField } from '@material-ui/core';
import StarRateRoundedIcon from '@material-ui/icons/StarRateRounded';

import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { editCandidate } from '../../Redux/Interview/interviewActions';

const summaryStyles = makeStyles((theme)=> ({
    firstRow: {
        height: '45vh'
    },
    secondRow: {
        
    },
    info:{
        ...theme.typography.caption,
        margin: 0
    },
    title: {
        fontWeight: 400,
    },
    titleInfo: {
        fontWeight: 100,
        margin: theme.spacing(1, 0, 0, 0)
    },
    space: {
        padding: theme.spacing(0, 3)
    },
    iconList: {
        minWidth: '10%'
    },
    textList: {
        fontSize: '1.1rem',
        margin: '0 0 5px 0',
        fontWeight: '100'
    },
    green: {
        color: '#2e7d32',
        margin: theme.spacing(1, 0),
        fontStyle: 'italic',
        fontSize: '0.9rem'
    },
    red: {
        color: '#c62828',
        margin: theme.spacing(1, 0),
        fontStyle: 'italic',
        fontSize: '0.9rem'
    },
    topic: {
        margin: theme.spacing(1, 0),
        fontWeight: 100
    },
    form: {
        margin: theme.spacing(2),
        width: '100%',
        '& .MuiTextField-root': {
            width: '50%'
        }
    },
    buttonsContainer: {
        width: '100%',
        '& button': {
            float: 'right',
            position: 'relative',
            bottom: theme.spacing(4),
            textTransform: 'inherit'
        }
    }
}))

function Results({reducer}){
    const classes = summaryStyles();
    let { idCandidate } = useParams();
    let history = useHistory();
    const dispatch = useDispatch();
    const [candidate, setCandidate] = useState({
        id: idCandidate,
        name: '',
        email: '',
        typeCandidate: '',
        skills: [],
        score: 20,
        interviewerEID: '',
        questions: [],
        button: '',
        summary: false,
        summaryComments: ''
    });

    useEffect(()=>{
        let aux = {}
        aux = reducer.filter(i => {
            return i.id === parseInt(idCandidate)
        });
        setCandidate(aux[0]);
        console.log('summary > ', reducer);
    },[idCandidate])

    const handleChangeComments = (e) =>{
        //save comments by candidate, turn 'true' summary
        candidate.summaryComments = e.target.value;
        dispatch(editCandidate(candidate))
    }
    
    const handleSaveInterview = (e) =>{
        candidate.summary = true;
        e.preventDefault();
        console.log('save commnt', candidate)
        history.push("/")
    }

    return(
        <Grid container>
            <Grid container className={classes.firstRow}>
                <Grid item xs={4} className={classes.space}>
                    <h3 className={classes.title}>Candidate Information</h3>
                    <hr/>
                    <h3 className={classes.titleInfo}>Full Name</h3>
                    <p className={classes.info}>{candidate.name}</p>
                    <h3 className={classes.titleInfo}>Email</h3>
                    <p className={classes.info}>{candidate.email}</p>
                    <h3 className={classes.titleInfo}>Type of contract</h3>
                    <p className={classes.info}>{candidate.typeCandidate}</p>
                    <h3 className={classes.titleInfo}>Interviewed by</h3>
                    <p className={classes.info}>{candidate.interviewerEID}</p>
                </Grid>
                <Grid item xs={4} className={classes.space}>
                   <h3 className={classes.title}>Skills List</h3> 
                    <hr/>
                    {candidate.skills.map((element, i)=> (
                    <React.Fragment>{element.checked === true ?
                        <ListItem>
                            <ListItemIcon className={classes.iconList}>
                                <StarRateRoundedIcon />
                            </ListItemIcon>
                            <p className={classes.textList}>{element.name}</p> 
                        </ListItem>
                        : null}
                    </React.Fragment>
                    ))}
                </Grid>
                <Grid item xs={4} className={classes.space}>
                    <h3 className={classes.title}>Questions correct</h3> 
                    <hr/>
                    {candidate.questions.map((element, i)=> (
                    <Grid container>
                        <Grid item xs={6}>
                            <p className={classes.topic}>{element.topic} </p>
                        </Grid>
                        <Grid item xs={6}>
                           <p className={`${(element.correct === "false") ? classes.red : classes.green}`}>{element.correct}</p> 
                        </Grid>
                    </Grid>
                    ))}
                </Grid>
            </Grid>
            <Grid container className={classes.secondRow}>
                <Grid item xs={12}>
                <h3 className={classes.title}>Comments for this interview</h3> 
                <hr/>
                
                <form className={classes.form}>
                    <TextField
                    id={candidate.id}
                    label="Comments"
                    name="comments"
                    value={candidate.summaryComments}
                    onChange={handleChangeComments}
                    multiline
                    rows={4}
                    defaultValue="..."
                    variant="outlined"
                    />
                </form>
                </Grid>
            </Grid>
            <div className={classes.buttonsContainer} onClick={handleSaveInterview}>
                <Button variant="contained" color="secondary">Finalizar</Button>
            </div>
        </Grid>
    )
}

export default Results;