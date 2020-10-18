import React from 'react';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import InformationsPatient from '../../../../SharedFiche/InformationsPatient';

const InfoPatientForm = ({ header, isHopital, previousHandler, handleSubmit }) => (
  <InformationsPatient header={header} isHopital={isHopital} previousHandler={previousHandler} handleSubmit={handleSubmit} />
);

const selector = formValueSelector('regForm');
export default connect((state) => {
  const isHopital = selector(state, 'lieu_patient');
  const hopital = selector(state, 'hopital');
  return {
    isHopital,
    hopital,
  };
})(reduxForm({
  form: 'regFormTransfer',
  destroyOnUnmount: false,
})(InfoPatientForm));
