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
      <th>DOI</th>
      <th>Journal title</th>
      <th>Title</th>
      <th>Corresponding authors</th>
    </tr>
    </thead>
    <tbody>
    {props.results.map((result, idx) => (
      <tr>
        <td>{idx+1}</td>
        <td>{result}</td>
        <td>{result}</td>
        <td>{result}</td>
        <td>{result}</td>
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