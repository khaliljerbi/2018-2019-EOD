import React, { memo } from 'react';
import { Label } from 'reactstrap';

const CustomLabel = memo(({ children }) => <Label><strong>{children}</strong></Label>);

export default CustomLabel;
