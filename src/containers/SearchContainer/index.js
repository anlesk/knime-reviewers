import React  from 'react';
import { connect } from 'react-redux';

import Search from '../../components/Search';

import {
  loadReviewersEpicAC,
  getReviewers,
} from '../../redux/ducks/reviewers';

const SearchContainer = props => (
  <Search
    reviewers={props.reviewers}
    onSelect={props.loadReviewersEpicAC}
  />
);

export default connect((state) => ({
  reviewers: getReviewers(state),
}), {
  loadReviewersEpicAC,
})(SearchContainer);