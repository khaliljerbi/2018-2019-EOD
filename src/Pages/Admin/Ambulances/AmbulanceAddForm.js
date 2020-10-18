import React from 'react';
import { Form, Button, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Field from '../../../Components/ReduxForm/FieldInput/FieldInput';
import Checkbox from '../../../Components/ReduxForm/FieldCheckbox/FieldCheckbox';
import { addAmbulance } from '../../../Actions/Admin/Actions';
import Card from '../../../Components/Card/Card';

const equipementList = [
  { label: 'Equipement 1', value: 'Equipement 1' },
  { label: 'Equipement 2', value: 'Equipement 2' },
  { label: 'Equipement 3', value: 'Equipement 3' },
];

const AmbulanceAddForm = ({ handleSubmit, history, ...props }) => (
  <Row>
    <Col xs={12} sm={12} md={12} lg={{ size: 8, offset: 2 }} xl={{ size: 8, offset: 2 }} xxl={{ size: 8, offset: 2 }}>
      <Card header="Nouvelle ambulance: ">
        <Form onSubmit={handleSubmit(values => props.addAmbulance(values, history))}>
          <Field
            name="name"
            placeholder="Label..."
            type="text"
            label="Label:"
          />
          <Checkbox
            name="equipements"
            label="Equipements: "
            options={equipementList}
          />
          <Button color="primary">Enregistrer</Button>
        </Form>
      </Card>
    </Col>
  </Row>
);

export default connect(null, { addAmbulance })(reduxForm({
  form: 'ambulanceForm',
})(AmbulanceAddForm));
