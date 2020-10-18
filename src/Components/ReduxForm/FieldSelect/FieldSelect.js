import React, { memo } from 'react';
import { Field } from 'redux-form';
import SingleSelect from '../../Select/SingleSelect/SingleSelect';
// render Select
const renderSelect = ({ input, ...custom }) => (
  <SingleSelect {...input} {...custom} />
);

const FieldSelect = memo(({ options, label, name, value, ...props }) => (
  <Field
    label={label}
    name={name}
    component={renderSelect}
    options={options}
    value={value}
    {...props}
  />
));

export default FieldSelect;
