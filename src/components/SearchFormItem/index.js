import React from 'react';
import { ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';
import SearchFormRoleSelect from '../SearchFormRoleSelect';

class SearchFormItem extends React.PureComponent {
  handleChange = prop => ({ target: { value } }) => this.props.onChange({ ...this.props.item, [prop]: value });

  render() {
    const {
      item: {
        lastName,
        firstName,
        role,
      },
    } = this.props;

    return (
      <Form componentClass="fieldset" inline>
        <FormGroup>
          <ControlLabel>First Name</ControlLabel>
          <FormControl
            type="text"
            value={firstName}
            placeholder="Enter first name"
            onChange={this.handleChange('firstName')}
          />
        </FormGroup>
        {' '}
        <FormGroup>
          <ControlLabel>Last Name</ControlLabel>
          <FormControl
            type="text"
            value={lastName}
            placeholder="Enter last name"
            onChange={this.handleChange('lastName')}
          />
        </FormGroup>
        {' '}
        <SearchFormRoleSelect
          role={role}
          onSelect={this.handleChange('role')}
        />
      </Form>
    );
  }
}

export default SearchFormItem;
