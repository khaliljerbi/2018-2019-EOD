import React from 'react';
import { Col } from 'reactstrap';
import Card from '../../../../Components/Card/Card';
import CustomLabel from '../../../../Components/Label/Label';

const DetailsDestination = ({ fiche }) => (
  <Card header="Détails destination:">
    <Col xs={12}>
      <CustomLabel><strong>Destination Désirée:</strong> </CustomLabel>
      <span>{' '}{fiche.destination_desiree}</span>
    </Col>
    <Col xs={12}>
      <CustomLabel><strong>Destination obtenue:</strong> </CustomLabel>
      <span>{' '}{fiche.destination_obtenue}</span>
    </Col>
    <Col xs={12}>
      <CustomLabel><strong>Destination Finale:</strong> </CustomLabel>
      <span>{' '}{fiche.destination_finale}</span>
    </Col>
    <Col xs={12}>
      <CustomLabel><strong>Mission::</strong> </CustomLabel>
      <span>{' '}{fiche.mission}</span>
    </Col>
    <Col xs={12}>
      <CustomLabel><strong>{'Utilité de l\'intervention:'}</strong> </CustomLabel>
      <span>{' '}{fiche.mission_util}</span>
    </Col>
  </Card>
);

export default DetailsDestination;
