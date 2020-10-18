import React from 'react';
import { Col, Badge } from 'reactstrap';
import Card from '../../../../Components/Card/Card';
import CustomLabel from '../../../../Components/Label/Label';

const BilanIntervention = ({ fiche }) => (
  <Card header="Bilan intervention: ">
    <Col xs={12}>
      <CustomLabel><strong>Bilan:</strong> </CustomLabel>
      <span>{' '}{fiche.bilan}</span>
    </Col>
    <Col xs={12}>
      <CustomLabel><strong>Pathologie:</strong> </CustomLabel>
      <span>{' '}{fiche.pathologie}</span>
    </Col>
    <Col xs={12}>
      <CustomLabel><strong>Typologie Pathologie:</strong> </CustomLabel>
      <span>{' '}{fiche.typ_pathologie.map(item => <React.Fragment key={item._id}><Badge color="primary">{item.label}</Badge>{' '}</React.Fragment>)}</span>
    </Col>
    <Col xs={12}>
      <CustomLabel><strong>Typologie spécifique et Diagnostic:</strong> </CustomLabel>
      <span>{' '}{fiche.typ_pathologie_diag.map(item => <React.Fragment key={item._id}><Badge color="primary">{item.label}</Badge>{' '}</React.Fragment>)}</span>
    </Col>
    <Col xs={12}>
      <CustomLabel><strong>Menace des fonctions vitales:</strong> </CustomLabel>
      <span>{' '}{fiche.menace_vit}</span>
    </Col>
    <Col xs={12}>
      <CustomLabel><strong>Circonstance:</strong> </CustomLabel>
      <span>{' '}{fiche.circonstance}</span>
    </Col>
  </Card>
);

export default BilanIntervention;
