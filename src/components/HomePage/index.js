import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useEffect, useState } from 'react';
import {Route, Switch} from 'react-router-dom';
import { BrowserRouter as Router } from "react-router-dom";

import InterviewerDashboard from '../InterviewersDashboard';
import CandidatesDashboard from '../CandidatesDashboard';
import QuestionsPage from '../QuestionsPage';

const routes = [
  {
    path: '/',
    exact: true,
    main: Template,
    props: 'Interviewers Dashboard',
    id: 1
  },
  {
    path: '/interview',
    exact: true,
    main: Template,
    props: 'Candidates Dashboard',
    id: 2
  },
  {
    path: '/questions',
    exact: true,
    main: Template,
    props: 'Questions',
    id: 3
  },
]

function Template({ title, keyword }){
  const [view, setView] = useState(keyword);
  
  useEffect(()=> {
    setView(keyword)
  },[keyword])

  return(
    <React.Fragment>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="p" color="inherit">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="main-content">
      {(() => {
        switch (view) {
          case 1:
              return (
                <InterviewerDashboard />
              )
          case 2:
              return (
                <CandidatesDashboard />
              )
          case 3:
              return (
                <QuestionsPage />
              )
          default:
              return (
                <div>Not available.</div>
              )
        }
      })()}
      </div>
    </React.Fragment>
  )
}

function HomePage() {
  return (
    <Router>
      <Switch>
        {routes.map((route, index)=> (
          <Route 
            key={index}
            path={route.path}
            exact={route.exact}
            children={<route.main title={route.props} keyword={route.id} />}
          />
        ))}
      </Switch>
    </Router>
  );
}

export default HomePage;
