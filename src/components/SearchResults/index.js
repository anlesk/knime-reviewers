import React from 'react';
import { Alert, Panel, Table } from 'react-bootstrap';
import { isEmpty } from 'lodash';

import './style.css';

const NoResultsFound = (
  <Alert bsStyle="warning">
    No results found!
  </Alert>
);
const renderError = message => (
  <Alert bsStyle="danger">
    {message}
  </Alert>
);
const renderResults = props => (
  <Panel
    header="Search results"
    className="SearchResults"
    bsStyle={'success'}
  >
    <Table striped bordered condensed hover>
      <thead>
      <tr>
        <th>#</th>
        <th>ARTICLE_ID</th>
        <th>DOI</th>
        <th>SORT_DATE</th>
        <th>ARTICLE_TITLE</th>
        <th>PUBLICATION_NAME</th>
        <th>Authors #1</th>
        <th>Authors #2</th>
      </tr>
      </thead>
      <tbody>
      {props.results.map((result, idx) => (
        <tr>
          <td>{idx+1}</td>
          <td>{result.ARTICLE_ID}</td>
          <td>{result.DOI}</td>
          <td>{result.SORT_DATE}</td>
          <td>{result.ARTICLE_TITLE}</td>
          <td>{result.PUBLICATION_NAME}</td>
          <td>{result['Unique concatenate(AUTHOR_FULL_NAME)']}</td>
          <td>{result['Unique concatenate(AUTHOR_FULL_NAME (#1))']}</td>
        </tr>
      ))}
      </tbody>
    </Table>
  </Panel>
);

const SearchResults = (props) => {
  const { error, results } = props;
  const isError = !isEmpty(error);
  const noResults = isEmpty(results);

  return (
    isError
      ? renderError(error)
      : noResults
        ? NoResultsFound
        : renderResults(props)
  );
};

export default SearchResults;