import React from 'react';
import { reduxForm } from 'redux-form';
import Destination from '../../../SharedFiche/Destination';

const DestinationForm = ({ header, previousHandler, handleSubmit }) => (
  <Destination header={header} previousHandler={previousHandler} handleSubmit={handleSubmit} />
);

export default reduxForm({
  form: 'regForm',
  destroyOnUnmount: false,
})(DestinationForm);
