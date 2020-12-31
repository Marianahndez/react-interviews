import React, { useEffect, useState } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { editCandidate } from '../../Redux/Interview/interviewActions';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import ArrowRightOutlinedIcon from '@material-ui/icons/ArrowRightOutlined';

import ModalPersonAdd from '../ModalPersonAdd';

const useStyles = makeStyles((theme)=> ({
    a: {
        textDecoration: 'none'
    },
    center: {
        textAlign: 'center',
        height: '60vh',
        padding: theme.spacing(4)
    },
    buttonsContainer: {
        padding: theme.spacing(4)
    },
    btnStyle: {
        textTransform: 'inherit'
    },
    btnStyleRight: {
        textTransform: 'inherit',
        float: 'right'
    },
    iconBack: {
        fontSize: '0.7rem',
        marginRight: '0.5rem'
    },
    iconNext: {
        fontSize: '0.7rem',
        marginLeft: '0.5rem'
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
    titleBold: {
        fontWeight: '600'
    },
    tableContainer: {
        height: '60vh',
        width: '100%',
        marginBottom: '3rem'
    },
    floatButton: {
        height: 'auto',
        textAlign: 'right',
        position: 'absolute',
        right: '3%',
        top: '-10px'
    },
}));

function CandidatesDashboard({ reducer, interns }){
    let { slug } = useParams();
    let history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [idSelected, setID] = useState();
    const [interviewerSelected, setInterviewrSelected] = useState(interns);
    const [urlQuestions, setURLQuestions] = useState();
    const [urlInformation, setURLInformation] = useState();

    useEffect(()=> {
        let index = [];
        index = interns.filter(i => {
            return i.id === parseInt(slug)
        });
        setInterviewrSelected(index[0]);
        let urlQuestion = "/questions/" + interviewerSelected.id +"/" + idSelected;
        setURLQuestions(urlQuestion);
    },[idSelected])

    const handleBack = () => {
        history.push("/")
    }

    const handleSeeMore = (params) =>{
        let id = params.rowIndex;
        history.push("/candidate/" + slug + "/" + id)
    }

    const handleSaveData = () =>{
        reducer[idSelected].interviewerEID = interviewerSelected.eid;
        dispatch(editCandidate(reducer[idSelected]))
    }
      
    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'name', headerName: 'Full Name', width: 350 },
        { field: 'email', headerName: 'Email', width: 350 },
        { field: 'typeCandidate', headerName: 'Type Of Candidate', width: 200 },
        { 
            field: 'button',
            headerName: 'Candidates Information', 
            width: 240,
            renderCell: (params) => (
                <Link to={{ pathname: urlInformation }} className={classes.a}> 
                    <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    style={{ width: '100%', textTransform: 'inherit'}}
                    onClick={() =>handleSeeMore(params)}
                    > 
                    See More <ArrowRightOutlinedIcon /> 
                    </Button>
                </Link>
            )
        },
    ];

    return(
        <React.Fragment>
            {reducer.length !== 0 ?
                <div className={classes.tableContainer}>
                    <div className={classes.floatButton}>
                        <ModalPersonAdd actionType="Add Candidate" id={reducer.length} active="null" reducer="[]" />
                    </div>
                    <h2 className={classes.titleBold}>Canidates List</h2>
                    <DataGrid 
                    autoPageSize={false} 
                    disableMultipleSelection={true} 
                    rows={reducer} 
                    columns={columns}
                    onSelectionChange={(newSelection) => {
                        const cellID = parseInt(newSelection.rowIds);
                        setID(cellID);
                    }}
                    />
                    
                </div>
            :
                <React.Fragment>
                    <div className={classes.center}>
                        <p className={classes.mainText}>No candidate has been registered</p>
                        <ModalPersonAdd actionType="Add Candidate" id={reducer.length} active="null" reducer={reducer} />
                        <p className={classes.helpText}>Click here to add</p>
                    </div>

                </React.Fragment>
            }
            <div className={classes.buttonsContainer}>
                <Button variant="contained" color="secondary" onClick={handleBack} className={classes.btnStyle}><ArrowBackIosIcon className={classes.iconBack} /> Back </Button>
                <Link to={{ pathname: urlQuestions }}> 
                    <Button onClick={handleSaveData} variant="contained" color="secondary" className={classes.btnStyleRight}> 
                        Continue <ArrowForwardIosIcon className={classes.iconNext} />
                    </Button>
                </Link>
            </div>
        </React.Fragment>
    )
}

export default CandidatesDashboard;