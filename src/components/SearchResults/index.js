import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const SearchResults = (props) => (
  <ListGroup>
    {props.results.map(result => (
      <ListGroupItem>
        {result}
      </ListGroupItem>
    ))}
  </ListGroup>
);

export default SearchResults;