import React from 'react';
import { Row, Col, Button, Form } from 'reactstrap';
import Card from '../../Components/Card/Card';
import Select from '../../Components/ReduxForm/FieldSelect/FieldSelect';
import * as options from '../../Shared/StaticData/StaticOptions';
import Radio from '../../Components/ReduxForm/FieldRadio/FieldRadio';

const Destination = ({ header, previousHandler, handleSubmit }) => (
  <Row>
    <Col xs={12} sm={12} md={12} lg={{ size: 8, offset: 2 }} xl={{ size: 8, offset: 2 }} xxl={{ size: 8, offset: 2 }}>
      <Card header={header}>
        <Form onSubmit={handleSubmit}>
          <Radio
            name="destination_desiree"
            label="Destination Désirée:"
            options={options.destinationDEOptions}
          />
          <Radio
            name="destination_obtenue"
            label="Destination obtenue:"
            options={options.yesNo}
          />
          <Select
            name="destination_finale"
            label="Destination Finale: "
            options={options.destinationFLOptions}
          />
          <Radio
            name="mission"
            label="Mission:"
            options={options.missionOptions}
          />
          <Radio
            name="mission_util"
            label="Utilité de l'intervention:"
            options={options.utInterventionOptions}
          />
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

export default Destination;
