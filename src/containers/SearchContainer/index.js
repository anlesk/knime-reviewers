import React  from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Search from '../../components/Search';

import {
  loadArticlesEpicAC,
  getArticles,
} from '../../redux/ducks/articles';
import {
  loadProcessesEpicAC,
  startProcessEpicAC,
  getProcesses,
} from '../../redux/ducks/processes';

class SearchContainer extends React.PureComponent {
  componentWillMount() {
    this.props.loadProcessesEpicAC();
  }

  render() {
    const {
      articles,
      processes,
      loadArticlesEpicAC,
      startProcessEpicAC,
    } = this.props;

    return (
      <Search
        processes={processes}
        articles={articles}
        onSelect={startProcessEpicAC}
        loadArticles={loadArticlesEpicAC}
      />
    );
  }
}

SearchContainer.propTypes = {
  loadArticlesEpicAC: PropTypes.func.isRequired,
  loadProcessesEpicAC: PropTypes.func.isRequired,
  startProcessEpicAC: PropTypes.func.isRequired,
  articles: PropTypes.shape(),
  processes: PropTypes.shape(),
};

SearchContainer.defaultProps = {
  articles: {},
  processes: {},
};

export default connect((state) => ({
  articles: getArticles(state),
  processes: getProcesses(state),
}), {
  loadArticlesEpicAC,
  loadProcessesEpicAC,
  startProcessEpicAC,
})(SearchContainer);