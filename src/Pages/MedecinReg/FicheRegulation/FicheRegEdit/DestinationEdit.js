import React from 'react';
import { reduxForm } from 'redux-form';
import Destination from '../../../SharedFiche/Destination';

const DestinationEdit = ({ header, previousHandler, handleSubmit }) => (
  <Destination header={header} previousHandler={previousHandler} handleSubmit={handleSubmit} />
);

export default reduxForm({
  form: 'regFormEdit',
  destroyOnUnmount: false,
})(DestinationEdit);
