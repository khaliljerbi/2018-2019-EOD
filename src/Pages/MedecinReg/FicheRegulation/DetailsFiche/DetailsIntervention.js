import React from 'react';
import { Col, Badge } from 'reactstrap';
import Card from '../../../../Components/Card/Card';
import CustomLabel from '../../../../Components/Label/Label';

const DetailsIntervention = ({ fiche }) => (
  <Card header="Détails Intervention">
    <Col xs={12}>
      <CustomLabel><strong>Nombre de victime:</strong> </CustomLabel>
      <span>{' '}{fiche.nb_victime}</span>
    </Col>
    <Col xs={12}>
      <CustomLabel><strong>{'Motif d\'appel:'}</strong> </CustomLabel>
      {fiche.motif_appel.map(item => <Badge style={{ margin: '0px 2px' }} key={item._id} color="primary">{item.label}</Badge>)}
    </Col>
    <Col xs={12}>
      <CustomLabel><strong>Objet de la demande:</strong> </CustomLabel>
      <span>{' '}{fiche.objet_demande}</span>
    </Col>
    <Col xs={12}>
      <CustomLabel><strong>Décision de la régulation:</strong> </CustomLabel>
      <span>{' '}{fiche.decision_reg}</span>
    </Col>
    <Col xs={12}>
      <CustomLabel><strong>Véhicule Engagé:</strong> </CustomLabel>
      <span>{' '}{fiche.vh_eng.map(item => <React.Fragment key={item}><Badge color="primary">{item}</Badge>{' '}</React.Fragment>)}</span>
    </Col>
    <Col xs={12}>
      <CustomLabel><strong>SMUR Engagé:</strong> </CustomLabel>
      <span>{' '}{fiche.smur_eng.map(item => <React.Fragment key={item}><Badge color="primary">{item}</Badge>{' '}</React.Fragment>)}</span>
    </Col>
    <Col xs={12}>
      <CustomLabel><strong>Médecins:</strong> </CustomLabel>
      <span>{' '}{fiche.medecin_int}</span>
    </Col>
    <Col xs={12}>
      <CustomLabel><strong>{'Nom du médecin d\'intervention:'}</strong> </CustomLabel>
      <span>{' '}{fiche.nom_med}</span>
    </Col>
  </Card>
);

export default DetailsIntervention;
