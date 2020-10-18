import React from 'react';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import InformationsAppel from '../../../SharedFiche/InformationsAppel';

const InfosAppelForm = ({ header, previousHandler, isHopital, handleSubmit }) => (
  <InformationsAppel header={header} isHopital={isHopital} previousHandler={previousHandler} handleSubmit={handleSubmit} />
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
  form: 'regForm',
  destroyOnUnmount: false,
})(InfosAppelForm));
