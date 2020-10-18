import React from 'react';
import { Row, Col, Button, Form } from 'reactstrap';
import Card from '../../Components/Card/Card';
import Field from '../../Components/ReduxForm/FieldInput/FieldInput';
import Select from '../../Components/ReduxForm/FieldSelect/FieldSelect';
import * as options from '../../Shared/StaticData/StaticOptions';
import Radio from '../../Components/ReduxForm/FieldRadio/FieldRadio';

const InformationsAppel = ({ header, previousHandler, isHopital, handleSubmit }) => (
  <Row>
    <Col xs={12} sm={12} md={12} lg={{ size: 8, offset: 2 }} xl={{ size: 8, offset: 2 }} xxl={{ size: 8, offset: 2 }}>
      <Card header={header}>
        <Form onSubmit={handleSubmit}>
          <Select
            name="origine_appel"
            label="Origine de l'Appel:"
            options={options.appelantLocationOptions}
          />
          <Radio
            name="arr_appel"
            label="Arrivée de l'Appel:"
            options={options.arrAppelOptions}
          />
          <Radio
            name="appelant"
            label="Appelant:"
            options={options.appelanntOptions}
          />
          <Field
            name="nom_appelant"
            type="text"
            placeholder="Nom appelant..."
            label="Nom appelant: "
          />
          <Field
            name="num_appelant"
            type="text"
            placeholder="Numéro appelant..."
            label="Numéro tel Appelant: "
          />
          <Select
            name="lieu_patient"
            label="Lieu ou se trouve le patient:"
            options={options.lieuPatient}
          />
          {isHopital === 'Hôpital' && (
            <>
              <Select
                name="hopital"
                label="Hôpital:"
                options={options.hopitalOptions}
              />
              <Field
                name="service"
                type="text"
                placeholder="Service..."
                label="Service: "
              />
            </>
          )}
          <Row>
            <Col xs={{ size: 7, offset: 0 }} sm={{ size: 4, offset: 4 }} md={{ size: 4, offset: 2 }} lg={{ size: 4, offset: 3 }}>
              <Button outline color="primary" onClick={previousHandler}><i className="fa fa-arrow-left" />{' '}Précédent</Button>{' '}
            </Col>
            <Col xs={{ size: 5, offset: 0 }} sm={{ size: 4, offset: 0 }} md={{ size: 4, offset: 0 }} lg={{ size: 4, offset: 0 }}>
              <Button type="submit" color="primary">Suivant{' '} <i className="fa fa-arrow-right" /></Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Col>
  </Row>
);

export default InformationsAppel;
