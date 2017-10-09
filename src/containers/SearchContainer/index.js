import React  from 'react';
import { connect } from 'react-redux';

import Search from '../../components/Search';

import {
  loadArticlesEpicAC,
  getArticles,
} from '../../redux/ducks/articles';

const SearchContainer = props => (
  <Search
    articles={props.articles}
    onSelect={props.loadArticlesEpicAC}
  />
);

export default connect((state) => ({
  articles: getArticles(state),
}), {
  loadArticlesEpicAC,
})(SearchContainer);