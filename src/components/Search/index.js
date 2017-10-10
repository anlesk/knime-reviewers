import React, { PureComponent } from "react";
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { Button, Col, ControlLabel, Form, FormControl, FormGroup, Row } from 'react-bootstrap';

import './style.css'
import SearchResults from '../SearchResults/index';


const DEBOUNCE_DELAY = 300;

class Search extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
    };
  }

  handleSelect = () => {
    const { firstName, lastName } = this.state;
    this.props.onSelect({ firstName, lastName });
  };

  handleInputChange = input => ({ target: { value } }) => this.setState({ [input]: value });
  debouncedSelectionHandler = input => debounce(this.handleInputChange(input), DEBOUNCE_DELAY, { leading: true });

  render() {
    const { articles } = this.props;
    const { firstName, lastName } = this.state;

    console.log('RENDER', this.props);

    return (
      <div>
        <Row>
          <Col lgoffset={3} lg={7}>
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
                    onChange={this.debouncedSelectionHandler('firstName')}
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
                    onChange={this.debouncedSelectionHandler('lastName')}
                  />
                </Col>
              </FormGroup>

              <Col lgOffset={2} lg={10}>
                <Button
                  onClick={this.handleSelect}
                >
                  Find Articles
                </Button>
              </Col>
            </Form>
          </Col>
        </Row>

        <Row>
          <SearchResults
            results={articles}
          />
        </Row>
      </div>
    );
  }
}

Search.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func.isRequired,
};

Search.defaultProps = {
  articles: [],
};

export default Search;