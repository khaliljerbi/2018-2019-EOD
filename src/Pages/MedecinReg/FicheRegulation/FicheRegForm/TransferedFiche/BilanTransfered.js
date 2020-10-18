import React from 'react';
import { reduxForm } from 'redux-form';
import Bilan from '../../../../SharedFiche/Bilan';

const BilanForm = ({ header, previousHandler, handleSubmit }) => (
  <Bilan header={header} previousHandler={previousHandler} handleSubmit={handleSubmit} />
);

export default reduxForm({
  form: 'regFormTransfer',
  destroyOnUnmount: false,
})(BilanForm);
