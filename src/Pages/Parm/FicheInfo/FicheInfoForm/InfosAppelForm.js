import React from 'react';
import { reduxForm } from 'redux-form';
import InformationsAppel from '../../../SharedFiche/InformationsAppel';

const InfosAppelForm = ({ header, previousHandler, handleSubmit }) => (
  <InformationsAppel header={header} previousHandler={previousHandler} handleSubmit={handleSubmit} />
);

export default reduxForm({
  form: 'regFormParm',
  destroyOnUnmount: false,
})(InfosAppelForm);
