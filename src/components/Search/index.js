import React, { PureComponent } from "react";
import PropTypes from 'prop-types';
import { Col, ListGroup, ListGroupItem, Panel, ProgressBar, Row } from 'react-bootstrap';

import './style.css'
import SearchResults from '../SearchResults';
import SearchForm from '../SearchForm';

const STATUS = {
  COMPLETE: 'complete',
  IN_PROGRESS: 'in progress',
  FAILED: 'failed',
};

const LoadingProgress = (
  <Panel>
    <ProgressBar
      active
      now={100}
      label={'Loading'}
    />
  </Panel>
);

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
  };

  handleInputChange = input => ({ target: { value } }) => this.setState({ [input]: value });

  handleProcessSelect = id => this.props.loadProcess(id);

  render() {
    const {
      articles: {
        items,
        _status: {
          isLoading,
          isShown,
          error,
        } = {},
      },
      processes: {
        processes,
      },
    } = this.props;
    const { firstName, lastName } = this.state;

    return (
      <section>
        <Row>
          <ListGroup>
            {
              Object.entries(processes).map(([key, value]) => (
                <ListGroupItem
                  header={key}
                  disabled={value.status !== STATUS.COMPLETE}
                  onClick={() => this.handleProcessSelect(key)}
                  bsStyle={value.status === STATUS.IN_PROGRESS ? "danger" : "success"}
                >
                  {JSON.stringify(value)}
                </ListGroupItem>
              ))
            }
          </ListGroup>
        </Row>

        <Row>
          <Col lgoffset={3} lg={7}>
            <SearchForm
              firstName={firstName}
              lastName={lastName}
              onFirstNameChange={this.handleInputChange('firstName')}
              onLastNameChange={this.handleInputChange('lastName')}
              onSubmit={this.handleSelect}
            />
          </Col>
        </Row>

        <Row className='show-grid'>
          {isLoading
            ? LoadingProgress
            : (
              isShown &&
              <SearchResults
                results={items}
                error={error}
              />
            )
          }
        </Row>
      </section>
    );
  }
}

Search.propTypes = {
  articles: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.string),
    _status: PropTypes.shape({
      isLoading: PropTypes.bool,
      isShown: PropTypes.bool,
      error: PropTypes.string,
    }),
  }).isRequired,
  processes: PropTypes.shape().isRequired,
  onSelect: PropTypes.func.isRequired,
  loadProcess: PropTypes.func.isRequired,
};

Search.defaultProps = {
  articles: {
    items: [],
    _status: {
      isLoading: false,
      isShown: true,
    }
  },
};

export default Search;