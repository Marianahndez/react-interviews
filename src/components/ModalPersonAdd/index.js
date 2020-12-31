import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import { Dialog, DialogContent, TextField, FormControl, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { addInterviewer, editInterviewer, deleteInterviewer, addCandidate, editCandidate } from '../../Redux/Interview/interviewActions';


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

const buttonsStyles = makeStyles((theme)=> ({
    display: {
        display: 'block', 
    },
    notDisplay: {
        display: 'none'
    },
    marginBtn: {
        display: 'block', 
        margin: theme.spacing(2, 0)
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
    handleEditCandidate,
    handleAddInterviewer,
    handleEditInterviewer,
    keyID
}){
    const classes = modalStyles();
    // console.log('modal values: ', candidate)
    return(
        <Dialog open={openDialog} onClose={closeDialog} fullWidth={true} maxWidth={'sm'}>
            <h2 className={classes.titleFormat}>{type}</h2>
            <DialogContent>
            { (type === 'Add Interviewer' || type === 'Edit Interviewer') ?
                <form autoComplete="off" className="form" onSubmit={handleAddInterviewer}>
                    <TextField name="name" label="Name" value={person.name} onChange={onChangeInputPerson} required className={classes.inputForm} />
                    <TextField name="id" disabled label="ID" value={keyID} onChange={onChangeInputPerson} required className={classes.inputForm}/>
                    <TextField name="eid" label="EID" value={person.eid} onChange={onChangeInputPerson} required className={classes.inputForm}/>
                    <div className={classes.btnsContainer}>
                        {type === 'Add Interviewer' ? 
                        <Button variant="contained" color="secondary" type="submit" onClick={handleAddInterviewer} className={classes.btnStyle}>Save</Button>
                        :
                        <Button variant="contained" color="secondary" type="submit" onClick={handleEditInterviewer} className={classes.btnStyle}>Save Cahnges</Button>
                        }
                        <Button variant="contained" color="info" onClick={closeDialog} className={classes.btnStyle}>Cancel</Button>
                    </div>
                </form>
                :
                <form autoComplete="off" className="form" onSubmit={handleAddCandidate}>
                    <TextField name="name" label="Name" value={candidate.name} onChange={onChangeInputCandidate} required className={classes.inputForm} />
                        <TextField name="email" label="Email" value={candidate.email} onChange={onChangeInputCandidate} required className={classes.inputForm}/>
        
                        <TextField name="typeCandidate" label="Type" value={candidate.typeCandidate} onChange={onChangeInputCandidate} required className={classes.inputForm}/>
                        <div className={classes.btnsContainer}>
                            {type === 'Add Candidate' ? 
                            <Button variant="contained" color="secondary" type="submit" onClick={handleAddCandidate} className={classes.btnStyle}>Save</Button>
                            :
                            <Button variant="contained" color="secondary" type="submit" onClick={handleEditCandidate} className={classes.btnStyle}>Save Changes</Button>
                            }
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
    const [active, setActive] = useState(false);
    const [id, setID] = useState(0);
    const dispatch = useDispatch();
    const classes = buttonsStyles();

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
        interviewerEID: '',
        questions: [],
        button: '',
        summary: false,
        summaryComments: ''
    });

    useEffect(()=>{
        if(props.id === undefined){
            setID(0)
        }else{
            setID(props.id)
        }

        if(props.active !== "null") {
            setActive(true)
            setID(parseInt(props.active))
            // console.log('active m: ', id)
        }

        if(props.id === 0){
            setActive(false)
            setID(0)
        }
    },[props])
    // console.log('props m: ', props)

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
    }
    
    const handleTypeOfPerson = (x) => {
        // console.log('type> ', x)
        setOpen(true)
        setTypeOfPerson(x)

        if(x === "Edit Interviewer"){
            let aux = {}
            aux = props.reducer.filter(i => {
                return i.id === parseInt(props.active)
            });
            setPerson(aux[0]);
            setID(aux[0].id)
            // console.log('person m: ', aux[0])
        }else{
            setPerson({
                name: '',
                id: id,
                eid: '',
                candidates: 0       
            })
            setID(props.id)
        }

        if(x === "Edit Candidate"){
            let aux = {}
            aux = props.reducer.filter(i => {
                return i.id === parseInt(props.active)
            });
            setCandidate(aux[0]);
            setID(aux[0].id)
        }else{
            setCandidate({
                id: id,
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
            })
            setID(props.id)
        }
        // console.log('candidate m: ', candidate)

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

    const handleEditInterviewer = (e) => {
        e.preventDefault();
        dispatch(editInterviewer(person));
        setOpen(false)
    }
    
    const saveEditCandidate = (e) => {
        e.preventDefault();
        dispatch(editCandidate(candidate));
        setOpen(false)
        console.log('new candidate: ', candidate)
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
            interviewerEID: '',
            questions: [],
            button: '',
            summary: false,
            summaryComments: ''
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
            handleEditInterviewer={handleEditInterviewer}
            handleAddCandidate={postCandidate}
            handleEditCandidate={saveEditCandidate}
            keyID={id}
            />


            {props.actionType === 'Edit Candidate' ? 
            <Fab color="secondary" aria-label="add" onClick={()=> handleTypeOfPerson(props.actionType)}>
                <EditIcon />
            </Fab>
            :
            <Fab color="secondary" aria-label="add" onClick={()=> handleTypeOfPerson(props.actionType)}>
                <PersonAddOutlinedIcon />
            </Fab>
            }

            <Fab color="secondary" aria-label="add" onClick={()=> handleTypeOfPerson("Edit Interviewer")} className={`${!active ? classes.notDisplay : classes.marginBtn}`}>
                <EditIcon />
            </Fab>

            <Fab color="secondary" aria-label="add" onClick={()=> dispatch(deleteInterviewer(id))} className={`${!active ? classes.notDisplay : classes.display}`}>
                <DeleteOutlineIcon />
            </Fab>
        </React.Fragment>
    )
}

export default ModalPersonAdd;