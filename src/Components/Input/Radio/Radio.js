import React, { memo } from 'react';
import { CustomInput } from 'reactstrap';
import Label from '../../Label/Label';

const Radio = memo(({ options, label, name, onChange, meta: { error, touched, invalid }, value, ...props }) => (
  <React.Fragment>
    <Label>{label}</Label> { error && touched && <span style={{ color: '#f86c6b', fontSize: '80%' }}>{error}</span> }
    {options.map(option => (
      <React.Fragment key={option.value}>
        <CustomInput {...props} type="radio" invalid={touched && invalid} checked={option.value === value} id={option.value} name={name} label={option.label} value={option.value} onChange={onChange} />
        <br />
      </React.Fragment>
    ))}
  </React.Fragment>
));

export default Radio;
