import React from 'react';
import { Field } from 'redux-form';
import Radio from '../../Input/Radio/Radio';
// render Input
const renderRadio = ({ input, ...custom }) => (
  <Radio {...input} {...custom} />
);

const FieldInput = ({ name, label, ...props }) => (
  <Field
    name={name}
    component={renderRadio}
    label={label}
    {...props}
  />
);

export default FieldInput;
