import React, { PureComponent } from "react";
import PropTypes from 'prop-types';
import { Button, ListGroup, ListGroupItem, Panel, ProgressBar, Row } from 'react-bootstrap';

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
      persons: [{}],
      firstName: '',
      lastName: '',
      isSubmitClickedOnce: false,
    };
  }

  handleSelect = () => {
    const { persons } = this.state;
    this.props.onSelect({ persons });
  };

  handleAddMore = () => this.setState({ persons: [...this.state.persons, {}] });

  handleFormChange = persons => this.setState({ persons });

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
    const { persons } = this.state;

    return (
      <section>
        <Row>
          <ListGroup>
            {
              Object.entries(processes).map(([key, value]) => {
                const disabled = value.status !== STATUS.COMPLETE;
                const bsStyle = value.status === STATUS.IN_PROGRESS ? "danger" : "success";
                const handleSelect = () => this.handleProcessSelect(key);

                return (
                  <ListGroupItem
                    header={key}
                    disabled={disabled}
                    onClick={!disabled && handleSelect}
                    bsStyle={bsStyle}
                  >
                    {JSON.stringify(value)}
                  </ListGroupItem>
                )
              })
            }
          </ListGroup>
        </Row>

        <Row>
          <SearchForm
            persons={persons}
            onChange={this.handleFormChange}
          />

          <Button
            onClick={this.handleAddMore}
          >
            + Add More
          </Button>

          <Button
            onClick={this.handleSelect}
          >
            Find Articles
          </Button>
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