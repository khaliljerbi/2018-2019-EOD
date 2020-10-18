import React from 'react';
import { Col } from 'reactstrap';
import * as dateFormat from '../../../../Shared/DateFormat/DateFormat';
import Card from '../../../../Components/Card/Card';
import CustomLabel from '../../../../Components/Label/Label';

const DetailsFiche = ({ fiche }) => (
  <Card header="Détails fiche:">
    <Col xs={12}>
      <CustomLabel><strong>{'N° d\'ordre:'}</strong> </CustomLabel>
      <span>{' '}{fiche.num_ordre}</span>
    </Col>
    <Col xs={12}>
      <CustomLabel><strong>Date:</strong> </CustomLabel>
      <span>{' '}{dateFormat.regularDate(fiche.date)}</span>
    </Col>
    <Col xs={12}>
      <CustomLabel><strong>Heure:</strong> </CustomLabel>
      <span>{' '}{fiche.time_fiche}</span>
    </Col>
    <Col xs={12}>
      <CustomLabel><strong>Médecin Régulateur:</strong> </CustomLabel>
      <span>{' '}{`${fiche.medecin.lastname} ${fiche.medecin.firstname}`}</span>
    </Col>
    <Col xs={12}>
      <CustomLabel><strong>PARM:</strong> </CustomLabel>
      <span>{' '}{`${fiche.parm.lastname} ${fiche.parm.firstname}`}</span>
    </Col>
  </Card>
);

export default DetailsFiche;
