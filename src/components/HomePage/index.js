import React from 'react';
import { useEffect, useState } from 'react';
import {Route, Switch} from 'react-router-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import { useDispatch, connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import {InterviewContext} from '../../Redux/context';

import InterviewerDashboard from '../InterviewersDashboard';
import CandidatesDashboard from '../CandidatesDashboard';
import QuestionsPage from '../QuestionsPage';
import SummaryPage from '../SummaryPage';

function mapStateToProps(state){
  return {
    interviews: state.interview,
    interviewers: state.interviewer,
    candidates: state.candidate
  }
}

function Template(props){
  const [view, setView] = useState(props.keyword);
  const dispatch = useDispatch();

  useEffect(()=> {
    setView(props.keyword)
    console.log('connected: ', props.interviews);
    console.log('connected2: ', props.interviewers);
    console.log('connected3: ', props.candidates);
    console.log('props: ', props);
  },[props])

  return(
    <InterviewContext>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="p" color="inherit">
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="main-content">
      {(() => {
        switch (view) {
          case 1:
            return ( <InterviewerDashboard reducer={props.interviewers} /> )
          case 2:
            return ( <CandidatesDashboard /> )
          case 3:
            return ( <QuestionsPage /> )
          case 4:
            return ( <SummaryPage /> )
          default:
            return ( <div>Not available.</div> )
        }
      })()}
      </div>
    </InterviewContext>
  )
}

export default connect(mapStateToProps)(Template);
