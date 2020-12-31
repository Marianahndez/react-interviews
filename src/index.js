import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import { BrowserRouter as Router } from "react-router-dom";

import store from '../src/Redux/store';
import Template from '../src/components/HomePage';

const routes = [
  {
    path: '/',
    exact: true,
    main: Template,
    props: 'Interviewers Dashboard',
    id: 1
  },
  {
    path: '/candidates/:slug',
    exact: true,
    main: Template,
    props: 'Candidates Dashboard',
    id: 2
  },
  {
    path: '/candidate/:idInterviewer/:idCandidate',
    exact: true,
    main: Template,
    props: 'Candidate Information',
    id: 3
  },
  {
    path: '/questions/:idInterviewer/:idCandidate',
    exact: true,
    main: Template,
    props: 'Interview Questions',
    id: 4
  },
  {
    path: '/summary/:idCandidate',
    exact: true,
    main: Template,
    props: 'Summary of the Interview',
    id: 5
  },
]

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
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
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
