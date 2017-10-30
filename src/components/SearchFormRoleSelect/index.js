import React from 'react';
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

class SearchFormRoleSelect extends React.PureComponent {
  render() {
    const {
      role,
      onSelect,
    } = this.props;

    return (
      <FormGroup>
        <ControlLabel>Role</ControlLabel>
        <FormControl
          componentClass="select"
          placeholder="select"
          value={role}
          onChange={onSelect}
        >
          <option value="author">Author</option>
          <option value="referee">Referee</option>
        </FormControl>
      </FormGroup>
    );
  }
}

export default SearchFormRoleSelect;