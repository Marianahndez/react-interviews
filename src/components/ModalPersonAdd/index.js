import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import Fab from '@material-ui/core/Fab';
import { Dialog, DialogContent, TextField, FormControl, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { addInterviewer, editInterviewer, deleteInterviewer, addCandidate } from '../../Redux/Interview/interviewActions';


const modalStyles = makeStyles((theme)=> ({
    titleFormat: {
        padding: theme.spacing(3),
        margin: 0,
        textAlign: 'center'
    },
    inputForm: {
        width: '100%',
        margin: theme.spacing(2, 0)
    },
    btnsContainer: {
        padding: theme.spacing(2, 1),
        float: 'right'
    },
    btnStyle: {
        textTransform: 'inherit',
        '&:first-child':{
            marginRight: theme.spacing(2)
        }
    }
}))

function Modal({
    type,
    openDialog,
    person,
    candidate,
    onChangeInputPerson,
    onChangeInputCandidate,
    closeDialog,
    handleAddCandidate,
    handleAddInterviewer,
    keyID
}){
    const classes = modalStyles();
    return(
        <Dialog open={openDialog} onClose={closeDialog} fullWidth={true} maxWidth={'sm'}>
            <h2 className={classes.titleFormat}>{type}</h2>
            <DialogContent>
            { type === 'Add Interviewer' ?
                <form autoComplete="off" className="form" onSubmit={handleAddInterviewer}>
                    <TextField name="name" label="Name" value={person.name} onChange={onChangeInputPerson} required className={classes.inputForm} />
                    <TextField name="id" label="ID" value={keyID} onChange={onChangeInputPerson} required className={classes.inputForm}/>
                    <TextField name="eid" label="EID" value={person.eid} onChange={onChangeInputPerson} required className={classes.inputForm}/>
                    <div className={classes.btnsContainer}>
                        <Button variant="contained" color="secondary" type="submit" onClick={handleAddInterviewer} className={classes.btnStyle}>Save</Button>
                        <Button variant="contained" color="info" onClick={closeDialog} className={classes.btnStyle}>Cancel</Button>
                    </div>
                </form>
                : 
                <form autoComplete="off" className="form" onSubmit={handleAddCandidate}>
                    <TextField name="name" label="Name" value={candidate.name} onChange={onChangeInputCandidate} required className={classes.inputForm} />
                        <TextField name="email" label="Email" value={candidate.email} onChange={onChangeInputCandidate} required className={classes.inputForm}/>
        
                        <TextField name="typeCandidate" label="Type" value={candidate.typeCandidate} onChange={onChangeInputCandidate} required className={classes.inputForm}/>
                        <div className={classes.btnsContainer}>
                            <Button variant="contained" color="secondary" type="submit" onClick={handleAddCandidate} className={classes.btnStyle}>Save</Button>
                            <Button variant="contained" color="info" onClick={closeDialog} className={classes.btnStyle}>Cancel</Button>
                        </div>
                </form>
            }
            </DialogContent>
        </Dialog>
    )
}

function ModalPersonAdd(props){
    const [typeOfPerson, setTypeOfPerson] = useState("");
    const [open, setOpen] = useState(false);
    const [id, setID] = useState(0);
    const dispatch = useDispatch();
    const [person, setPerson] = useState({
        name: '',
        id: id,
        eid: '',
        candidates: 0       
    });
    const [candidate, setCandidate] = useState({
        id: id,
        name: '',
        email: '',
        typeCandidate: '',
        skills: [],
        score: 20,
        interviewerId: null,
        questions: [],
        button: ''
    });

    useEffect(()=>{
        if(props.id === undefined){
            setID(0)
        }else{
            setID(props.id)
        }
    },[props])

    const handleInputChangePerson = (e, x) => {
        const newInterviewer = {...person};
        newInterviewer[e.target.name] = e.target.value;
        e.preventDefault();
        setPerson(newInterviewer)
    }
    
    const handleInputChangeCandidate = (e) => {
        const newCandidate = {...candidate};
        newCandidate[e.target.name] = e.target.value;
        e.preventDefault();
        setCandidate(newCandidate)
    }

    const handleModalClose = () => {
        setOpen(false)
        console.log('close> ', open)
    }

    const handleTypeOfPerson = (x) => {
        setOpen(true)
        setTypeOfPerson(x)
    }

    const postInterviewer = (e) => {
        e.preventDefault();
        dispatch(addInterviewer(person));
        setPerson({
            name: '',
            id: id,
            eid: '',
            candidates: 0       
        })
        setOpen(false)
    }

    const postCandidate = (e) => {
        e.preventDefault();
        dispatch(addCandidate(candidate));
        setCandidate({
            id: null,
            name: '',
            email: '',
            typeCandidate: '',
            skills: [],
            score: 20,
            interviewerId: null,
            questions: [],
            button: ''
        })
        setOpen(false)
    }

    return(
        <React.Fragment>
            <Modal 
            type={typeOfPerson} 
            openDialog={open} 
            person={person}
            candidate={candidate}
            onChangeInputPerson={handleInputChangePerson}
            onChangeInputCandidate={handleInputChangeCandidate}
            closeDialog={handleModalClose} 
            handleAddInterviewer={postInterviewer}
            handleAddCandidate={postCandidate}
            keyID={id}
            />

            <Fab color="secondary" aria-label="add" onClick={()=> handleTypeOfPerson(props.actionType)}>
                <PersonAddOutlinedIcon />
            </Fab>
        </React.Fragment>
    )
}

export default ModalPersonAdd;