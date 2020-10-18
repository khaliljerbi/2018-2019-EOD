import React from 'react';
import { Col } from 'reactstrap';
import Card from '../../../../Components/Card/Card';
import CustomLabel from '../../../../Components/Label/Label';

const DetailsAppel = ({ fiche }) => (
  <Card header="Détails appel: ">
    <Col xs={12}>
      <CustomLabel><strong>{'Origine de l\'Appel:'}</strong> </CustomLabel>
      <span>{' '}{fiche.origine_appel}</span>
    </Col>
    <Col xs={12}>
      <CustomLabel><strong>{'Arrivée de l\'Appel:'}</strong> </CustomLabel>
      <span>{' '}{fiche.arr_appel}</span>
    </Col>
    <Col xs={12}>
      <CustomLabel><strong>Appelant:</strong> </CustomLabel>
      <span>{' '}{fiche.appelant}</span>
    </Col>
    <Col xs={12}>
      <CustomLabel><strong>Nom appelant:</strong> </CustomLabel>
      <span>{' '}{fiche.nom_appelant}</span>
    </Col>
    <Col xs={12}>
      <CustomLabel><strong>Numéro tel Appelant:</strong> </CustomLabel>
      <span>{' '}{fiche.num_appelant}</span>
    </Col>
  </Card>
);

export default DetailsAppel;
