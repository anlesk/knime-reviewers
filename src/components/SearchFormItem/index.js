import React from 'react';
import { Button, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';
import { isEmpty } from 'lodash';
import SearchFormRoleSelect from '../SearchFormRoleSelect';

class SearchFormItem extends React.PureComponent {
  handleChange = prop => ({ target: { value = '' } }) => {
    const trimmedValue = value.trim();
    const result = isEmpty(trimmedValue) ? trimmedValue : value;
    return this.props.onChange({ ...this.props.item, [prop]: result });
  };

  render() {
    const {
      item: {
        lastName,
        firstName,
        role,
      },
      onRemove,
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
        {' '}
        <Button
          onClick={onRemove}
          bsStyle={'danger'}
        >
          -
        </Button>
      </Form>
    );
  }
}

export default SearchFormItem;
