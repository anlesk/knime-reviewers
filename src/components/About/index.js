import React from 'react';
import classnames from 'classnames';

import './style.css';


const About = ({ className, ...props }) => (
  <div className={classnames('About', className)} {...props}>
    <h1>
      About
    </h1>
  </div>
);

export default About;
