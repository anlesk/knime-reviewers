import React, { PureComponent } from "react";
import PropTypes from 'prop-types';
import { Button, ListGroup, ListGroupItem, Modal, Panel, ProgressBar, Row } from 'react-bootstrap';
import moment from 'moment';
import { isEmpty } from 'lodash';

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
      persons: [
        { role: 'author' },
        { role: 'referee' },
      ],
      isSubmitClickedOnce: false,
    };
  }

  handleSelect = () => {
    const { persons } = this.state;
    this.props.onSelect(persons);
  };

  handleAddMore = () => this.setState({ persons: [ ...this.state.persons, { role: 'author' } ] });

  handleFormChange = persons => this.setState({ persons });

  handleProcessSelect = id => this.props.loadArticles(id);

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
    const isRefereeExists = persons.some(({role, firstName, lastName}) =>
      (role === 'referee') && !isEmpty(firstName) && !isEmpty(lastName)
    );
    const isAuthorExists = persons.some(({role, firstName, lastName}) =>
      (role === 'author') && !isEmpty(firstName) && !isEmpty(lastName)
    );
    const isFindArticleButtonDisabled = !isRefereeExists || !isAuthorExists;

    return (
      <section>
        <Modal show={isLoading} />

        <Row>
          <ListGroup>
            {
              Object.entries(processes).map(([key, { status, persons }]) => {
                const disabled = status !== STATUS.COMPLETE;
                const bsStyle = status === STATUS.IN_PROGRESS ? "danger" : "success";
                const handleSelect = () => this.handleProcessSelect(key);
                const keyWithoutExtension = Number(key.substring(0, key.length - 4));
                const date = moment(keyWithoutExtension).format("LLL");

                return (
                  <ListGroupItem
                    header={date}
                    disabled={disabled}
                    onClick={!disabled && handleSelect}
                    bsStyle={bsStyle}
                  >
                    {JSON.stringify(persons)}
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
            + Add
          </Button>

          <Button
            onClick={this.handleSelect}
            disabled={isFindArticleButtonDisabled}
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
  loadArticles: PropTypes.func.isRequired,
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