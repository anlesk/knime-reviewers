import React from 'react';
import { Switch, Route } from 'react-router';

import SearchPage from "../../pages/SearchPage";
import AboutPage from "../../pages/AboutPage";
import NotFoundPage from "../../pages/NotFoundPage";
import Header from "../Header";

import './style.css';
import { Col, Grid, Row } from 'react-bootstrap';


const App = (props) => (
  <div className="App">
    <Header />

    <section className='App-container'>
      <Grid>
        <Row>
          <Switch>
            <Route exact path='/' component={SearchPage} />
            <Route path='/about' component={AboutPage} />
            <Route path='*' component={NotFoundPage} />
          </Switch>
        </Row>
      </Grid>
    </section>
  </div>
);

export default App;
