import React, { memo } from 'react';
import {
  InputGroup, InputGroupAddon, FormGroup, FormFeedback, InputGroupText, Input,
} from 'reactstrap';

const FormInput = memo(({ name, value, type, onchange, icon, placeholder, error, hasInputError }) => (
  <FormGroup>
    <InputGroup className="mb-3">
      <InputGroupAddon addonType="prepend">
        <InputGroupText>
          <i className={icon && icon} />
        </InputGroupText>
      </InputGroupAddon>
      <Input type={type} invalid={hasInputError} name={name} placeholder={placeholder} value={value} onChange={onchange} />
      {hasInputError && <FormFeedback>{error}</FormFeedback>}
    </InputGroup>
  </FormGroup>
));

export default FormInput;
