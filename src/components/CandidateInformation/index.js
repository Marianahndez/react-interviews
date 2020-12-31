import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { editCandidate } from '../../Redux/Interview/interviewActions';

import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import { Dialog, DialogContent, FormControlLabel, FormGroup, Button, Card, CardContent, Avatar, Checkbox, ListItemIcon, ListItem, ListItemAvatar } from '@material-ui/core';

import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExtensionIcon from '@material-ui/icons/Extension';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import StarRateRoundedIcon from '@material-ui/icons/StarRateRounded';
import { makeStyles } from '@material-ui/core';

import ModalPersonAdd from '../ModalPersonAdd';

const candidateStyles = makeStyles((theme)=> ({
    center: {
        textAlign: 'center'
    },
    flex: {
        display: 'flex'
    },
    title: {
        ...theme.typography.h6,
        fontWeight: '600',
        margin: theme.spacing(1, 0)
    },
    infoText: {
        ...theme.typography.subtitle1,
        margin: theme.spacing(0)
    },
    iconSize: {
        fontSize: '5rem',
    },
    avatar: {
        padding: theme.spacing(4),
        marginTop: theme.spacing(1.5)
    },
    infoBox: {
        padding: theme.spacing(2, 6, 4, 6)
    },
    skillsBox: {
        padding: theme.spacing(2, 6, 4, 6),
        height: '40vh'
    },
    subtitle: {
        fontSize: '0.7rem',
        fontStyle: 'italic',
        marginTop: '1.3rem',
    },
    titleAddSkills: {
        margin: '1rem 0 1rem 0',
        fontSize: '1.2rem',
        fontWeight: '100',
        fontStyle: 'italic'
    },
    extendedIcon: {
        margin: theme.spacing(2, 1)
    },
    mainCard: {
        width: '90%'
    },
    addBtnSkills: {
        textTransform: 'inherit',
        float: 'right',
        margin: theme.spacing(3, 2)
    },
    paddingTop: {
        paddingTop: theme.spacing(4)
    },
    modalSkillsContainer: {
        width: '80%',
        margin: '0 auto',
    },
    modalTitle: {
        margin: theme.spacing(0, 4, 2, 4)
    },
    modalBtns: {
        padding: theme.spacing(3, 0),
        width: '100%',
        '& :nth-child(2)': {
            float: 'right'
        }
    },
    iconList: {
        minWidth: '10%'
    },
    textList: {
        fontSize: '1.1rem',
        margin: '0 0 5px 0',
        fontWeight: '400'
    },
    btn: {
        textTransform: 'inherit'
    },
    btnContainer: {
        width: '100%',
        padding: theme.spacing(4),
        '& button' : {
          float: 'right'  
        }
    },
    summaryBtn: {
        textTransform: 'inherit',
        margin: theme.spacing(2, 0),
        position: 'absolute'
    },
    btnEdit: {
        position: 'relative',
        left: '90%'
    }
}))


const skillsArray = [
    {
        name: 'Bootstrap',
        checked: false
    },
    {
        name: 'Node JS',
        checked: false
    },
    {
        name: 'React JS',
        checked: false
    },
    {
        name: 'Vue JS',
        checked: false
    },
    {
        name: 'Angular 6+',
        checked: false
    },
]

function Modal({
    openDialog,
    candidate,
    onChangeInputPerson,
    closeDialog,
    classes,
    handleAddSkills
}){
    const [skills, setSkills] = useState(skillsArray)
    
    const handleChange = (event) => {
        setSkills([...skillsArray, skillsArray[event.target.id].checked = event.target.checked])
    };

    return(
        <Dialog open={openDialog} onClose={closeDialog} fullWidth={true} maxWidth={'xs'}>
            <DialogContent>
                <h2 className={classes.modalTitle}>Skills to evaluate</h2>
                <div>
                <FormGroup row className={classes.modalSkillsContainer}>
                    {skillsArray.map((element, i) => (
                        <FormControlLabel
                        control={<Checkbox id={i} checked={element.checked} onChange={handleChange} name={element.name} />}
                        label={element.name} />
                    ))}
                    <div className={classes.modalBtns}>
                        <Button variant="contained" onClick={closeDialog} className={classes.btn}>Cancel</Button>
                        <Button color="secondary" variant="contained" onClick={()=>handleAddSkills(skills)} className={classes.btn}>Save</Button>
                    </div>
                </FormGroup>
                </div>
            </DialogContent>
        </Dialog>
    )
}

function CandidateInformation(props){
    let { idInterviewer, idCandidate } = useParams();
    const dispatch = useDispatch();
    let history = useHistory();
    const classes = candidateStyles();
    const [candidate, setCandidate] = useState({});
    const [skills, setSkills] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(()=>{
        let aux = {}
        aux = props.reducer.filter(i => {
            return i.id === parseInt(idCandidate)
        });
        setCandidate(aux[0]);
        
        if(candidate.skills !== undefined){
            setSkills(candidate.skills)
        }
    },[candidate, skills, idCandidate, props])

    const handleInputChange = (e, x) => {
        const newInterviewer = {...candidate};
        newInterviewer[e.target.name] = e.target.value;
        e.preventDefault();
        setCandidate(newInterviewer)
    }

    const handleModalClose = () =>{
        setOpen(false);
    }

    const handleAddSkills = () =>{
        setOpen(true)
    }
    
    const handleSaveSkills = (i) =>{
        candidate.skills = i;
        setSkills(i)
        dispatch(editCandidate(candidate));
        setOpen(false)
    }

    const handleSaveCandidate = () =>{
        dispatch(editCandidate(candidate))
        history.push("/candidates/" + idInterviewer )
    }
    
    const handleSeeSummary = () => {
        history.push("/summary/" + candidate.id )
    }

    return(
        <Grid container className={classes.paddingTop}>
            <Grid item xs={6} className={classes.flex}>
                <Card className={classes.mainCard}>
                <CardContent className={classes.flex}>
                <Grid item xs={2}>
                    <Avatar className={classes.avatar}>
                        <AccountCircleIcon className={classes.iconSize} />
                    </Avatar>
                </Grid>
                <Grid item xs={10} className={classes.infoBox}>
                    <h2 className={classes.title}>Nombre Completo</h2>
                    <p className={classes.infoText}>{candidate.name}</p>
                    <h2 className={classes.title}>Email</h2>
                    <p className={classes.infoText}>{candidate.email}</p>
                    <h2 className={classes.title}>Type of candidate</h2>
                    <p className={classes.infoText}>{candidate.typeCandidate}</p>
                    
                    <Fab variant="extended" color="secondary" aria-label="add" onClick={handleSeeSummary} disabled={(candidate.summary === false)} className={classes.summaryBtn}>
                        <InsertDriveFileOutlinedIcon className={classes.extendedIcon} /> See Summary
                    </Fab>

                    <div className={classes.btnEdit}>
                        <ModalPersonAdd actionType="Edit Candidate" id={0} active={idCandidate} reducer={[candidate]} />
                    </div>
                </Grid>
                </CardContent>
                </Card>
            </Grid>

            <Grid item xs={6} className={classes.flex}>
                <Card className={classes.mainCard}>
                    <CardContent className={classes.flex}>
                        <Grid item xs={2}>
                            <Avatar className={classes.avatar}>
                                <ExtensionIcon className={classes.iconSize} />
                            </Avatar>
                        </Grid>
                        <Grid item xs={10} className={classes.skillsBox}>
                            <p className={classes.title}>Skills to evaluate</p>
                            <Modal
                            openDialog={open} 
                            candidate={candidate}
                            onChangeInputPerson={handleInputChange}
                            closeDialog={handleModalClose} 
                            classes={classes}
                            handleAddSkills={(inputSkills)=>handleSaveSkills(inputSkills)}
                            />
                            
                            {candidate.skills === [] ?
                                <p className={classes.titleAddSkills}>No skills found</p>
                                :
                                <div>
                                    {skills.map((element, i)=>(
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
                                </div>
                            }
                        </Grid>
                    </CardContent>
                    <Fab variant="extended" color="secondary" aria-label="add" onClick={handleAddSkills} className={classes.addBtnSkills}>
                        <AddOutlinedIcon className={classes.extendedIcon} /> Add Skills
                    </Fab>
                </Card>
            </Grid>
            <div className={classes.btnContainer}>
                <Button variant="contained" color="secondary" onClick={handleSaveCandidate} className={classes.btn}>Save</Button>
            </div>
        </Grid>
    )
}

export default CandidateInformation;