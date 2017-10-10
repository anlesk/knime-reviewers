import React from 'react';

import logo from '../../logo.png';
import './style.css';
import { Image, PageHeader } from 'react-bootstrap';

const Header = () => (
  <PageHeader bsClass="App-header">
    <Image src={logo} className="App-logo" />
  </PageHeader>
);

export default Header;