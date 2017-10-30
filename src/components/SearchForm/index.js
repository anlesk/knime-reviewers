import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SearchFormItem from '../SearchFormItem';

class SearchForm extends PureComponent {
  handleItemChange = idx => newItem => this.props.onChange(this.props.persons.map((item, index) => index === idx ? newItem : item));

  render() {
    const {
      persons,
    } = this.props;

    return persons.map((person, idx) => (
      <SearchFormItem
        item={person}
        onChange={this.handleItemChange(idx)}
      />
    ));
  }
}

SearchForm.propTypes = {
  persons: PropTypes.array,
  onChange: PropTypes.func.isRequired,
};

SearchForm.defaultProps = {
  persons: [{}],
};

export default SearchForm;