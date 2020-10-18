import React from 'react';
import { UncontrolledAlert } from 'reactstrap';

const ErrorAlert = ({ children }) => <UncontrolledAlert color="danger">{children}</UncontrolledAlert>;

export default ErrorAlert;
