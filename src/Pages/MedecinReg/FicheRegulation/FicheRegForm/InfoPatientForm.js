import React from 'react';
import { reduxForm } from 'redux-form';
import InformationsPatient from '../../../SharedFiche/InformationsPatient';

const InfoPatientForm = ({ header, isHopital, previousHandler, handleSubmit }) => (
  <InformationsPatient header={header} isHopital={isHopital} previousHandler={previousHandler} handleSubmit={handleSubmit} />
);

export default reduxForm({
  form: 'regForm',
  destroyOnUnmount: false,
})(InfoPatientForm);
