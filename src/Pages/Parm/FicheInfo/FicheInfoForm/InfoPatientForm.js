import React from 'react';
import { Row, Col, Button, Form } from 'reactstrap';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import Card from '../../../../Components/Card/Card';
import Field from '../../../../Components/ReduxForm/FieldInput/FieldInput';
import Select from '../../../../Components/ReduxForm/FieldSelect/FieldSelect';
import * as options from '../../../../Shared/StaticData/StaticOptions';
import Radio from '../../../../Components/ReduxForm/FieldRadio/FieldRadio';

const InfoPatientForm = ({ header, isHopital, previousHandler, handleSubmit }) => (
  <Row>
    <Col xs={12} sm={12} md={12} lg={{ size: 8, offset: 2 }} xl={{ size: 8, offset: 2 }} xxl={{ size: 8, offset: 2 }}>
      <Card header={header}>
        <Form onSubmit={handleSubmit}>
          <Select
            name="lieu_patient"
            label="Lieu ou se trouve le patient:"
            options={options.lieuPatient}
          />
          {isHopital === 'Hôpital' && (
            <Select
              name="hopital"
              label="Hôpital:"

              options={options.hopitalOptions}
            />
          )}
          <Field
            name="service"
            type="text"
            placeholder="Service..."
            label="Service: "
          />
          <Row>
            <Col lg={8}>
              <Field
                name="id_patient"
                type="text"
                placeholder="id patient..."
                label="Identité du patient: "
              />
            </Col>
            <Col lg={4}>
              <Field
                name="age"
                type="number"
                label="Âge:"
              />
            </Col>
          </Row>
          <Radio
            name="sexe"
            label="Sexe:"
            options={options.sexeOptions}
          />
          <Select
            name="lieu_sousse"
            label="Adresse à Sousse:"
            options={options.lieuSousse}
          />
          <Field
            name="adresse_ville"
            type="text"
            placeholder="Adresse..."
            label="Adresse , Ville: "
          />
          <Row>
            <Col xs={{ size: 6, offset: 0 }} sm={{ size: 3, offset: 4 }} md={{ size: 3, offset: 4 }} lg={{ size: 2, offset: 4 }}>
              <Button outline color="primary" onClick={previousHandler}><i className="fa fa-arrow-left" />{' '}Précédent</Button>{' '}
            </Col>
            <Col xs={{ size: 6, offset: 0 }} sm={{ size: 4, offset: 0 }} md={{ size: 4, offset: 0 }} lg={{ size: 4, offset: 0 }}>
              <Button type="submit" color="success">Sauvegarder{' '}</Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Col>
  </Row>
);

const selector = formValueSelector('regFormParm');
export default connect((state) => {
  const isHopital = selector(state, 'lieu_patient');
  return {
    isHopital,
  };
})(reduxForm({
  form: 'regFormParm',
  destroyOnUnmount: false,
})(InfoPatientForm));
