import React from 'react';
import { Panel, Table } from 'react-bootstrap';
import { isEmpty } from 'lodash';

import './style.css';

const NoResultsFound = 'No results found!';
const getResultsTable = props => (
  <Table striped bordered condensed hover>
    <thead>
    <tr>
      <th>#</th>
      <th>ARTICLE_ID</th>
      <th>DOI</th>
      <th>SORT_DATE</th>
      <th>ARTICLE_TITLE</th>
      <th>PUBLICATION_NAME</th>
      <th>Corresponding authors</th>
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
      </tr>
    ))}
    </tbody>
  </Table>
);

const SearchResults = (props) => (
  <Panel
    header="Search results"
    className="SearchResults"
    bsStyle={isEmpty(props.results) ? 'danger' : 'success'}
  >
    {
      isEmpty(props.results)
      ? NoResultsFound
      : getResultsTable(props)
    }

  </Panel>
);

export default SearchResults;