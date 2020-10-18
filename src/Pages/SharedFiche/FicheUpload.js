import React from 'react';
import { Field } from 'redux-form';
import { Row, Col, Button, Form, Progress } from 'reactstrap';
import CustomCard from '../../Components/Card/Card';
import CustomLabel from '../../Components/Label/Label';
import CropImage from '../../Components/CropImage/CropImage';

const FicheUpload = ({ header, handleSubmit, previousHandler, progress }) => (
  <Row>
    <Col xs={12} sm={12} md={12} lg={{ size: 8, offset: 2 }} xl={{ size: 8, offset: 2 }} xxl={{ size: 8, offset: 2 }}>
      <CustomCard header={header}>
        <Form onSubmit={handleSubmit}>
          <CustomLabel>Fichier à ajouter:</CustomLabel>
          <br />
          <Field
            name="image"
            component={CropImage}
          />
          <br />
          { progress !== 0 ? <Progress animated color="success" value={progress}>{progress}%</Progress> : null }
          <br />
          <Row>
            <Col xs={{ size: 6, offset: 0 }} sm={{ size: 3, offset: 4 }} md={{ size: 3, offset: 4 }} lg={{ size: 2, offset: 4 }}>
              <Button outline color="primary" onClick={previousHandler}><i className="fa fa-arrow-left" />{' '}Précédent</Button>{' '}
            </Col>
            <Col xs={{ size: 6, offset: 0 }} sm={{ size: 4, offset: 0 }} md={{ size: 4, offset: 0 }} lg={{ size: 4, offset: 0 }}>
              <Button type="submit" color="success">Sauvegarder{' '}</Button>
            </Col>
          </Row>
        </Form>
      </CustomCard>
    </Col>
  </Row>
);
export default FicheUpload;
