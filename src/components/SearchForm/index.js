import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';

class SearchForm extends PureComponent {
  render() {
    const {
      lastName,
      firstName,
      onFirstNameChange,
      onLastNameChange,
      onSubmit,
    } = this.props;

    return (
      <Form horizontal>
        <FormGroup controlId="firstNameControl">
          <Col lg={2}>
            <ControlLabel>First Name</ControlLabel>
          </Col>
          <Col lg={5}>
            <FormControl
              type="text"
              value={firstName}
              placeholder="Enter first name"
              onChange={onFirstNameChange}
            />
          </Col>
        </FormGroup>

        <FormGroup controlId="lastNameControl">
          <Col lg={2}>
            <ControlLabel>Last Name</ControlLabel>
          </Col>
          <Col lg={5}>
            <FormControl
              type="text"
              value={lastName}
              placeholder="Enter last name"
              onChange={onLastNameChange}
            />
          </Col>
        </FormGroup>

        <Col lgOffset={2} lg={10}>
          <Button
            onClick={onSubmit}
          >
            Find Articles
          </Button>
        </Col>
      </Form>
    );
  }
}

SearchForm.propTypes = {
  lastName: PropTypes.string,
  firstName: PropTypes.string,
  onFirstNameChange: PropTypes.func.isRequired,
  onLastNameChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

SearchForm.defaultProps = {
  lastName: '',
  firstName: '',
};

export default SearchForm;