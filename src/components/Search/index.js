import React, { PureComponent } from "react";
import PropTypes from 'prop-types';

import './style.css'

class Search extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      reviewer: '',
      journal: '',
    };
  }

  handleSelect = () => {
    const { reviewer, journal } = this.state;
    this.props.onSelect({ reviewer, journal });
  };

  handleInputChange = input => ({ target: { value } }) => this.setState({ [input]: value });

  render() {
    const { reviewers } = this.props;

    console.log('RENDER', this.props);

    return (
      <section>
        <div>
          <label
            htmlFor='reviewer'
          >
            Reviewer:
          </label>
          <input
            id='reviewer'
            onChange={this.handleInputChange('reviewer')}
          />
        </div>

        <div>
          <label
            htmlFor='journal'
          >
            Journal:
          </label>
          <input
            id='journal'
            onChange={this.handleInputChange('journal')}
          />
        </div>

        <div>
          <button
            id={'findReviewers'}
            onClick={this.handleSelect}
          >
            Find reviewers
          </button>
        </div>

        <div>
          {reviewers.map(reviewer => reviewer)}
        </div>
      </section>
    );
  }
}

Search.propTypes = {
  reviewers: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func.isRequired,
};

Search.defaultProps = {
  reviewers: [],
};

export default Search;