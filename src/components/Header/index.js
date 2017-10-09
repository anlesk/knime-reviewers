import React from 'react';

import logo from '../../logo.png';
import './style.css';
import { PageHeader } from 'react-bootstrap';

const Header = () => (
  <PageHeader bsClass="App-header">
    <img src={logo} className="App-logo" alt="logo" />
  </PageHeader>
);

export default Header;