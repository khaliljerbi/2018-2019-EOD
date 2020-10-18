import React from 'react';
import {
  FormGroup, Input, FormFeedback,
} from 'reactstrap';
import Label from '../../Label/Label';

const CommonInput = ({ label, placeholder, type, name, value, onChange, onBlur, meta, ...props }) => (
  <React.Fragment>
    {meta ? (
      <FormGroup>
        <Label>{label}</Label>
        <Input
          invalid={meta.touched && meta.invalid}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          {...props}
        />
        { meta.touched && meta.error && <FormFeedback>{meta.error}</FormFeedback>}
      </FormGroup>
    )
      : (
        <FormGroup>
          {label && <Label>{label}</Label>}
          <Input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...props}
          />
        </FormGroup>
      )}
  </React.Fragment>
);

export default CommonInput;
