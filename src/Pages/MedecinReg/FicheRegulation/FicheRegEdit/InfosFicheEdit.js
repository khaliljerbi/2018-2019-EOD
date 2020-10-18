import React from 'react';
import { reduxForm } from 'redux-form';
import * as Yup from 'yup';
import { validator } from '../../../../Shared/FormValidation/FormValidation';
import InformationsFiche from '../../../SharedFiche/InformationsFiche';

const Schema = Yup.object().shape({
  parm: Yup.string().required('Ce champ est obligatoire!'),
  date_fiche: Yup.date().required('Ce champ est obligatoire!'),
  time_fiche: Yup.string().required('Ce champ est obligatoire!'),
});

const InfosFicheForm = ({ header, handleSubmit, parms, meds }) => (
  <InformationsFiche header={header} handleSubmit={handleSubmit} parms={parms} meds={meds} />
);

export default reduxForm({
  form: 'regFormEdit',
  destroyOnUnmount: false,
  validate: validator(Schema),
})(InfosFicheForm);
