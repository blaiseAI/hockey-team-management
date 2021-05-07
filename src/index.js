import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Players from './components/Players';
import Navigation from './components/Navigation';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Navigation/>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/players" component={Players} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
