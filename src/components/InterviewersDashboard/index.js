import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import ModalPersonAdd from '../ModalPersonAdd';

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
    root: {
        minWidth: 275,
        '&:hover': {
            cursor: 'pointer',
            border: '1.5px solid #BD00FF'
        },
    },
    active: {
        border: '1.5px solid #BD00FF'
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    floatButton: {
        height: 'auto',
        textAlign: 'right',
        position: 'absolute',
        right: '4%',
        top: '14%'
    },
    cards: {
        padding: theme.spacing(1),
    },
    titleBold: {
        fontWeight: '600'
    },
    mainGrid: {
        height: '55vh',
        overflow: 'auto'
    }
}));

function InterviewerDashboard({ reducer }){
    let history = useHistory();
    const classes = useStyles();
    const [active, setActive] = useState({
        id: null,
        active: false
    })

    const handleNext = () =>{
        history.push("/candidates")
    }

    const handleSelectCard = (i) =>{
        const aux = reducer.findIndex(index => index.id === i)
        setActive({
            id: aux,
            active: true
        })
    }

    return(
        <React.Fragment>
            {reducer.length !== 0 ?
            <React.Fragment>
                <h2 className={classes.titleBold}>Interviewers List</h2>
                <div className={classes.floatButton}>
                    <ModalPersonAdd actionType="Add Interviewer" id={reducer.length} />
                </div>
                <Grid container className={classes.mainGrid}>
                {reducer.map((element, i)=>{
                    return (
                        <Grid item xs={3} className={classes.cards}>
                            <Card className={`${(i === active.id) ? classes.active : classes.root}`} onClick={() => handleSelectCard(i)}>
                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Interviewer data
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                    {element.name}
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                    {element.eid}
                                    </Typography>
                                    <Typography component="p" className={classes.title} color="textSecondary" gutterBottom>
                                    Interviewed: {element.candidates}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                })}
                </Grid>
            </React.Fragment> :
            <div className={classes.center}>
                <p className={classes.mainText}>No interviewer has been registered</p>
                <ModalPersonAdd actionType="Add Interviewer" />
                <p className={classes.helpText}>Click here to add</p>
            </div> }

            <div className={classes.buttonsContainer}>
                <Button variant="contained" color="secondary" disabled={(active.id === null)} onClick={handleNext} className={classes.btnStyle}> Continue <ArrowForwardIosIcon className={classes.iconNext} /> </Button>
            </div>
        </React.Fragment>
    )
}

export default InterviewerDashboard;