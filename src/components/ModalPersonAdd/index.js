import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import Fab from '@material-ui/core/Fab';
import { Dialog, DialogContent, TextField, InputLabel, Select, MenuItem, FormControl, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { addInterviewer, editInterviewer, deleteInterviewer } from '../../Redux/Interviews/interviewActions';


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
    onChangeInput,
    closeDialog,
    handleAddCandidate,
    handleAddInterviewer
}){
    const classes = modalStyles();
    return(
        <Dialog open={openDialog} onClose={closeDialog} fullWidth={true} maxWidth={'sm'}>
            <h2 className={classes.titleFormat}>{type}</h2>
            <DialogContent>
            { type === 'Add Interviewer' ?
                <form autoComplete="off" className="form" onSubmit={handleAddInterviewer}>
                    <TextField name="name" label="Name" value={person.name} onChange={onChangeInput} required className={classes.inputForm} />
                    <TextField name="id" label="ID" value={person.id} onChange={onChangeInput} required className={classes.inputForm}/>
                    <TextField name="eid" label="EID" value={person.eid} onChange={onChangeInput} required className={classes.inputForm}/>
                    <div className={classes.btnsContainer}>
                        <Button variant="contained" color="primary" type="submit" onClick={handleAddInterviewer} className={classes.btnStyle}>Save</Button>
                        <Button variant="contained" onClick={closeDialog} className={classes.btnStyle}>Cancel</Button>
                    </div>
                </form>
                : 
                <form autoComplete="off" className="form" onSubmit={handleAddCandidate}>
                    <TextField name="name" label="Name" value={person.name} onChange={onChangeInput} required className={classes.inputForm} />
                        <TextField name="email" label="Email" value={person.email} onChange={onChangeInput} required className={classes.inputForm}/>
        
                        <TextField name="type" label="Type" value={person.type} onChange={onChangeInput} required className={classes.inputForm}/>
                        <div className={classes.btnsContainer}>
                            <Button variant="contained" color="primary" type="submit" onClick={handleAddCandidate} className={classes.btnStyle}>Save</Button>
                            <Button variant="contained" onClick={closeDialog} className={classes.btnStyle}>Cancel</Button>
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
    const dispatch = useDispatch();
    const [person, setPerson] = useState({
        name: '',
        id: 1,
        eid: '',
        candidates: 0       
    });
    const [candidate, setCandidate] = useState({
        name: '',
        email: 1,
        type: '',
        score: 0,
        skill: [],
        interviewerId: 1       
    });

    useEffect(()=>{
        console.log('modal state: ', props)
    },[])
    const handleInputChange = (e) => {
        const newInterviewer = {...person};
        newInterviewer[e.target.name] = e.target.value;
        e.preventDefault();
        setPerson(newInterviewer)
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
            id: 0,
            eid: '',
            candidates: 0       
        })
        setOpen(false)
    }

    const handleAddCandidate = () => {
        console.log('add Candidate')
    }

    return(
        <React.Fragment>
            <Modal 
            type={typeOfPerson} 
            openDialog={open} 
            person={person}
            onChangeInput={handleInputChange}
            closeDialog={handleModalClose} 
            handleAddInterviewer={postInterviewer}
            handleAddCandidate={handleAddCandidate}
            />

            <Fab color="primary" aria-label="add" onClick={()=> handleTypeOfPerson(props.actionType)}>
                <PersonAddOutlinedIcon />
            </Fab>
        </React.Fragment>
    )
}

export default ModalPersonAdd;