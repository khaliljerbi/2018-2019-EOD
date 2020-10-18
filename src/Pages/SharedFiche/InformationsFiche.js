import React from 'react';
import { Row, Col, Button, Form } from 'reactstrap';
import Card from '../../Components/Card/Card';
import Field from '../../Components/ReduxForm/FieldInput/FieldInput';
import Select from '../../Components/ReduxForm/FieldSelect/FieldSelect';
import Radio from '../../Components/ReduxForm/FieldRadio/FieldRadio';

const InformationsFiche = ({ header, handleSubmit, parms, meds }) => (
  <Row>
    <Col xs={12} sm={12} md={12} lg={{ size: 8, offset: 2 }} xl={{ size: 8, offset: 2 }} xxl={{ size: 8, offset: 2 }}>
      <Card header={header}>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col lg={6}>
              <Field
                name="date_fiche"
                type="date"
                label="Date:"
                disabled
              />
            </Col>
            <Col lg={6}>
              <Field
                name="time_fiche"
                type="time"
                label="Heure:"
                disabled
              />
            </Col>
          </Row>
          <Select
            name="medecin"
            label="Médecin Régulateur:"
            options={meds}
          />
          <Radio
            name="parm"
            label="PARM:"
            options={parms}
          />
          <Field
            name="nb_victime"
            type="number"
            placeholder="nombre victime..."
            label="Nombre de victime: "
          />
          <Row>
            <Col xs={{ size: 5, offset: 7 }} md={{ size: 5, offset: 5 }} lg={{ size: 5, offset: 5 }}>
              <Button type="submit" color="primary">Suivant{' '} <i className="fa fa-arrow-right" /></Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Col>
  </Row>
);
export default InformationsFiche;
