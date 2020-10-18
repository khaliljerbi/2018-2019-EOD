import React from 'react';
import { Row, Col, Button, Form } from 'reactstrap';
import Card from '../../Components/Card/Card';
import Field from '../../Components/ReduxForm/FieldInput/FieldInput';
import Select from '../../Components/ReduxForm/FieldSelect/FieldSelect';
import * as options from '../../Shared/StaticData/StaticOptions';
import Radio from '../../Components/ReduxForm/FieldRadio/FieldRadio';
import * as dateFormat from '../../Shared/DateFormat/DateFormat';

const InformationsPatient = ({ header, previousHandler, handleSubmit }) => (
  <Row>
    <Col xs={12} sm={12} md={12} lg={{ size: 8, offset: 2 }} xl={{ size: 8, offset: 2 }} xxl={{ size: 8, offset: 2 }}>
      <Card header={header}>
        <Form onSubmit={handleSubmit}>
          <Field
            name="id_patient"
            type="text"
            placeholder="Nom & prénom..."
            label="Identité du patient: "
          />
          <Row>
            <Col lg={6}>
              <Field
                name="naissance"
                type="date"
                label="Date de naissance:"
                max={dateFormat.today}
              />
            </Col>
            <Col lg={6}>
              {/* <Field
                name="pediatrique"
                type="text"
              /> */}
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
          <Field
            name="cin_patient" // à changer aprés
            type="text"
            placeholder="CIN..."
            label="CIN: "
          />
          <Row>
            <Col lg={6}>
              <Select
                name="lieu_sousse"
                label="Adresse:"
                options={options.lieuSousse}
              />
            </Col>
            <Col lg={6}>
              <Field
                name="adresse_ville"
                type="text"
                placeholder="Adresse..."
                label="Adresse , Ville: "
              />
            </Col>
          </Row>
          <Field
            name="tel_patient" // à changer aprés
            type="text"
            placeholder="Téléphone..."
            label="Téléphone: "
          />
          <Field
            name="med_traitant" // à changer aprés
            type="text"
            placeholder="Médecin traitant"
            label="Médecin traitant: "
          />
          <Field
            name="personne_a_contacter" // à changer aprés
            type="text"
            placeholder="Personne à contacter..."
            label="Personne à contacter: "
          />
          <Row>
            <Col xs={{ size: 7, offset: 0 }} sm={{ size: 4, offset: 4 }} md={{ size: 4, offset: 2 }} lg={{ size: 4, offset: 3 }}>
              <Button outline color="primary" onClick={previousHandler}><i className="fa fa-arrow-left" />{' '}Précédent</Button>{' '}
            </Col>
            <Col xs={{ size: 5, offset: 0 }} sm={{ size: 4, offset: 0 }} md={{ size: 4, offset: 0 }} lg={{ size: 3, offset: 0 }}>
              <Button type="submit" color="primary">Suivant{' '} <i className="fa fa-arrow-right" /></Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Col>
  </Row>
);

export default InformationsPatient;
