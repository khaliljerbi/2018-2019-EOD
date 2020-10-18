import React from 'react';
import { Field } from 'redux-form';
import Input from '../../Input/CommonInput/CommonInput';
// render Input
const renderInput = ({ input, ...custom }) => (
  <Input {...input} {...custom} />
);

const FieldInput = ({ name, placeholder, type, label, ...props }) => (
  <Field
    name={name}
    placeholder={placeholder}
    component={renderInput}
    type={type}
    label={label}
    {...props}
  />
);

export default FieldInput;
