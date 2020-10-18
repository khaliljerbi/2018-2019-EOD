import React from 'react';
import { Field } from 'redux-form';
import Checkbox from '../../Input/Checkbox/Checkbox';
// render Input
const renderCheckbox = ({ input, ...custom }) => (
  <Checkbox {...input} {...custom} />
);

const FieldCheckbox = ({ name, label, ...props }) => (
  <Field
    name={name}
    component={renderCheckbox}
    label={label}
    {...props}
  />
);

export default FieldCheckbox;
