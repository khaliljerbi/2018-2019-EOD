import React, { memo } from 'react';
import Select from 'react-select';
import CustomLabel from '../../Label/Label';

const simpleSelect = memo(({ name, label, options, onChange, value }) => (
  <React.Fragment>
    <CustomLabel>{label}</CustomLabel>
    <Select isClearable value={value} name={name} options={options} onChange={onChange} />
  </React.Fragment>
));

export default simpleSelect;
