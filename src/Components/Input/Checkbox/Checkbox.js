import React, { memo } from 'react';
import { CustomInput } from 'reactstrap';
import Label from '../../Label/Label';

const onCheckboxChange = (e, option, value, onChange) => {
  const checkedValues = [...value];
  if (e.target.checked) {
    checkedValues.push(option.value);
  } else {
    checkedValues.splice(checkedValues.indexOf(option.value), 1);
  }
  return onChange(checkedValues);
};

const Checkbox = memo(({ options, label, name, onChange, value }) => (
  <React.Fragment>
    <Label>{label}</Label>
    {options.map((option, index) => (
      <React.Fragment key={option.value}>
        <CustomInput type="checkbox" checked={value.indexOf(option.value) !== -1} id={`${name}[${index}]`} name={`${name}[${index}]`} label={option.label} value={option.value} onChange={e => onCheckboxChange(e, option, value, onChange)} />
        <br />
      </React.Fragment>
    ))}
  </React.Fragment>
));

export default Checkbox;
