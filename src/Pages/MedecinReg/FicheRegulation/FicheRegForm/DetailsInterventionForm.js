import React from 'react';
import { reduxForm } from 'redux-form';
import DetailsIntervention from '../../../SharedFiche/DetailsIntervention';

const DetailsInterventionForm = ({ header, previousHandler, handleSubmit }) => (
  <DetailsIntervention header={header} previousHandler={previousHandler} handleSubmit={handleSubmit} />
);

export default reduxForm({
  form: 'regForm',
  destroyOnUnmount: false,
})(DetailsInterventionForm);
