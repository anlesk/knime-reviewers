import React from 'react';
import { Switch, Route } from 'react-router';

import SearchPage from "../../pages/SearchPage";
import AboutPage from "../../pages/AboutPage";
import NotFoundPage from "../../pages/NotFoundPage";
import Header from "../Header";

import './style.css';


const App = (props) => (
  <div className="App">
    <Header />

    <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>

    <Switch>
      <Route exact path='/' component={SearchPage} />
      <Route path='/about' component={AboutPage} />
      <Route path='*' component={NotFoundPage} />
    </Switch>
  </div>
);

export default App;
