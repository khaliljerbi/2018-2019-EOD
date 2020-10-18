import React, { memo } from 'react';
import Select from 'react-select';
import { FormGroup } from 'reactstrap';
import Label from '../../Label/Label';

// Added function to fit redux structure  from react-select structure : { label: value, value: value }
const multiChangeHandler = func => values => func(values.map(value => value.value));

// Added function to fit redux structure  from react-select structure : { label: value, value: value }
const singleChangeHandler = func => value => func(value ? value.value : '');
const transformValue = (value, options, multi) => {
  if (multi && typeof value === 'string') return [];

  const filteredOptions = options.filter(option => (multi
    ? value.indexOf(option.value) !== -1 // need fix for multi create
    : option.value === value));
  return multi ? filteredOptions : filteredOptions[0];
};

// Change UI configuration
const textEmpty = text => text;

const SingleSelect = memo(({ options, label, multi, value, meta: { error, touched }, onChange }) => {
  const transformedValue = transformValue(value, options, multi);
  console.log(value);
  return (
    <FormGroup>
      <Label>{label}</Label> { error && touched && <span style={{ color: '#f86c6b', fontSize: '80%' }}>{error}</span> }
      <Select isMulti={multi} noOptionsMessage={() => textEmpty('Aucun trouvé')} options={options} isClearable value={transformedValue} onChange={multi ? multiChangeHandler(onChange) : singleChangeHandler(onChange)} />
    </FormGroup>
  );
});

export default SingleSelect;
