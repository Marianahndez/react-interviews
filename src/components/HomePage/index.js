import React from 'react';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core';

import {InterviewContext} from '../../Redux/context';

import InterviewerDashboard from '../InterviewersDashboard';
import CandidatesDashboard from '../CandidatesDashboard';
import CandidateInformation from '../CandidateInformation';
import QuestionsPage from '../QuestionsPage';
import SummaryPage from '../SummaryPage';

function mapStateToProps(state){
  console.log('state home: ', state);
  return {
    interviews: state.interview,
    interviewers: state.interviewer,
    candidates: state.candidate
  }
}
const theme = createMuiTheme({
  palette: {
    primary: {
      // main: '#bd00ff'
      main: '#9c33c1'
    },
    secondary: {
      main: '#8400b2',
      dark: '#5c007c'
    },
    info: {
      main: '#9c33c1'
    }
  }
})

const homeStyles = makeStyles((theme)=> ({
  mainContent: {
    padding: theme.spacing(3, 5)
  }
}))



function Template(props){
  // console.log('state home: ', props)

  const [view, setView] = useState(props.keyword);
  const [interviewersList, setInterviewersList] = useState(props.interviewers);
  const [candidatesList, setCandidatesList] = useState(props.candidates);
  // const interviewersList = useSelector(state => state.interviewer)
  const classes = homeStyles();

  useEffect(()=> {
    setView(props.keyword)
    setInterviewersList(props.interviewers)
    setCandidatesList(props.candidates)
  },[props])

  return(
    <InterviewContext>
      <MuiThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="p" color="inherit">
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.mainContent}>
      {(() => {
        switch (view) {
          case 1:
            return ( <InterviewerDashboard reducer={interviewersList} /> )
          case 2:
            return ( <CandidatesDashboard reducer={candidatesList} /> )
          case 3:
            return ( <CandidateInformation reducer={candidatesList} /> )
          case 4:
            return ( <QuestionsPage reducer={candidatesList} /> )
          case 5:
            return ( <SummaryPage /> )
          default:
            return ( <div>Not available.</div> )
        }
      })()}
      </div>
      </MuiThemeProvider>
    </InterviewContext>
  )
}

export default connect(mapStateToProps)(Template);