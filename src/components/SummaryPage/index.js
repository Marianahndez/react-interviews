import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { editCandidate } from '../../Redux/Interview/interviewActions';

import { 
    makeStyles, 
    Button, 
    Grid, 
    ListItem, 
    ListItemIcon, 
    TextField, 
    Dialog, 
    DialogContent, 
    Fab 
} from '@material-ui/core';
import StarRateRoundedIcon from '@material-ui/icons/StarRateRounded';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';

const summaryStyles = makeStyles((theme)=> ({
    firstRow: {
        height: '50vh'
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
        margin: theme.spacing(0.5, 0, 0,0),
        fontWeight: 100,
        fontSize: '0.8rem'
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
    },
    modalContainer: {
        padding: theme.spacing(1, 3, 3, 3)
    },
    titleQuestions: {
        background: '#5c007c',
        color: '#fff',
        padding: theme.spacing(2),
        fontWeight: '200',
        margin: 0
    },
    dataQuestions: {
        padding: theme.spacing(1),
        borderLeft: '1px solid',
        borderBottom: '1px solid',
        '& p': {
            margin: 0,
        }
    },
    dataQuestionsRight: {
        borderLeft: '1px solid',
        borderBottom: '1px solid',
        borderRight: '1px solid',
        '& p': {
            margin: 0,
        }
    },
    btnQuestions: {
        float: 'right',
        top: '15%',
        right: '5%',
        position: 'absolute',
    }
}))

function Modal({
    openDialog,
    closeDialog,
    questions,
    classes
}){
    return(
        <Dialog open={openDialog} onClose={closeDialog} fullWidth={true} maxWidth={'lg'}>
            <DialogContent>
                <Grid container className={classes.modalContainer}>
                    <Grid item xs={6}>
                        <h3 className={classes.titleQuestions}>Question</h3>
                    </Grid>
                    <Grid item xs={3}>
                        <h3 className={classes.titleQuestions}>Answer</h3>
                    </Grid>
                    <Grid item xs={3}>
                        <h3 className={classes.titleQuestions}>Comments</h3>
                    </Grid>
                    {questions.map((element, i)=> (
                        <React.Fragment>
                            <Grid item xs={6} className={classes.dataQuestions}>
                                <p >{element.content}</p>
                            </Grid>
                            <Grid item xs={3} className={classes.dataQuestions}>
                                <p >{(element.correct === 'false') ? "Incorrect" : "Correct"}</p>
                            </Grid>
                            <Grid item xs={3} className={classes.dataQuestionsRight}>
                                <p >{element.comments}</p>
                            </Grid>
                        </React.Fragment>
                    ))}
                </Grid>
            </DialogContent>
        </Dialog>
    )
}

function Results({reducer}){
    const classes = summaryStyles();
    let { idCandidate } = useParams();
    let history = useHistory();
    const dispatch = useDispatch();
    const [open, setOpen] = useState();
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
    },[idCandidate])

    const handleChangeComments = (e) =>{
        candidate.summaryComments = e.target.value;
        dispatch(editCandidate(candidate))
    }
    
    const handleSaveInterview = (e) =>{
        candidate.summary = true;
        e.preventDefault();
        history.push("/")
    }

    const handleModalQuestions = () =>{
        setOpen(true)
    }

    const handleModalClose = () =>{
        setOpen(false);
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
                    <Modal
                    openDialog={open} 
                    questions={candidate.questions}
                    closeDialog={handleModalClose} 
                    classes={classes}
                    />
                    <h3 className={classes.title}>Questions correct</h3> 
                    <Fab color="secondary" aria-label="add" className={classes.btnQuestions} onClick={handleModalQuestions}>
                        <InsertDriveFileOutlinedIcon />
                    </Fab>
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