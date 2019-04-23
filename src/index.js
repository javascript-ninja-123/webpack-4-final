import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.less';
import './registerServiceWorker';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Login,Home} from './containers';





ReactDOM.render(
  <Router>
      <Route  path="/signup" component={Login}/>
      <Route exact path='/' component={Home}/>
  </Router>     
, document.getElementById('root'));