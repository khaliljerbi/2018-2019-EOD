import React from 'react';
import { Row, Col, Form, Button } from 'reactstrap';
import { reduxForm } from 'redux-form';
import * as Yup from 'yup';
import Card from '../../../Components/Card/Card';
import * as options from '../../../Shared/StaticData/StaticOptions';
import { validator } from '../../../Shared/FormValidation/FormValidation';
import * as dateFormat from '../../../Shared/DateFormat/DateFormat';
import Field from '../../../Components/ReduxForm/FieldInput/FieldInput';
import FieldSelect from '../../../Components/ReduxForm/FieldSelect/FieldSelect';

const Schema = Yup.object().shape({
  firstname: Yup.string().trim().required('Ce champ est obligatoire !'),
  lastname: Yup.string().trim().required('Ce champ est obligatoire!'),
  telephone: Yup.string().matches(/^\d{8}$/, { message: 'Le champ Téléphone doit contenir exactement 8 chiffres', excludeEmptyString: true }).required('Ce champ est obligatoire!'),
  gardeDuration: Yup.date().required('Ce champ est obligatoire!'),
  role: Yup.string().required(),
});

const UserEditForm = ({ header, onSubmit, invalid, checkUserHandler, ...props }) => (
  <Row>
    <Col xs={12} sm={12} md={12} lg={{ size: 8, offset: 2 }} xl={{ size: 8, offset: 2 }} xxl={{ size: 8, offset: 2 }}>
      <Card header={header}>
        <Form onSubmit={props.handleSubmit(onSubmit)}>
          <Field
            name="lastname"
            placeholder="Nom..."
            type="text"
            label="Nom:"
          />
          <Field
            name="firstname"
            placeholder="Prenom.."
            type="text"
            label="Prenom:"
          />
          <Field
            name="telephone"
            placeholder="Téléphone..."
            type="text"
            label="Téléphone:"
          />
          <FieldSelect
            label="Rôle"
            name="role"
            options={options.roleOption}
          />
          <Field
            name="gardeDuration"
            placeholder="Durée garde..."
            min={dateFormat.today}
            type="date"
            label="Fin de garde:"
          />
          <Button disabled={invalid} color="primary">Modifier</Button>
        </Form>
      </Card>
    </Col>
  </Row>
);
export default reduxForm({
  form: 'userEditForm',
  validate: validator(Schema),
})(UserEditForm);
