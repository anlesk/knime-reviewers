import React, { PureComponent } from "react";
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { Col, Row } from 'react-bootstrap';

import './style.css'
import SearchResults from '../SearchResults';
import SearchForm from '../SearchForm';

const DEBOUNCE_DELAY = 300;

class Search extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      isSubmitClickedOnce: false,
    };
  }

  handleSelect = () => {
    const { firstName, lastName } = this.state;
    this.props.onSelect({ firstName, lastName });
    this.setState({ isSubmitClickedOnce: true });
  };

  handleInputChange = input => ({ target: { value } }) => this.setState({ [input]: value });
  debouncedSelectionHandler = input => debounce(this.handleInputChange(input), DEBOUNCE_DELAY, { leading: true });

  render() {
    const { articles } = this.props;
    const { firstName, lastName, isSubmitClickedOnce } = this.state;

    return (
      <section>
        <Row>
          <Col lgoffset={3} lg={7}>
            <SearchForm
              firstName={firstName}
              lastName={lastName}
              onFirstNameChange={this.debouncedSelectionHandler('firstName')}
              onLastNameChange={this.debouncedSelectionHandler('lastName')}
              onSubmit={this.handleSelect}
            />
          </Col>
        </Row>

        {
          isSubmitClickedOnce &&
          <Row>
            <SearchResults
              results={articles}
            />
          </Row>
        }
      </section>
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