import React from 'react';
import { Col } from 'reactstrap';
import Card from '../../../../Components/Card/Card';
import CustomLabel from '../../../../Components/Label/Label';

const DetailsPatient = ({ fiche }) => (
  <Card header="Détails patient:">
    <Col xs={12}>
      <CustomLabel><strong>Lieu ou se trouve le patient:</strong> </CustomLabel>
      <span>{' '}{fiche.lieu_patient}</span>
    </Col>
    {fiche.lieu_patient === 'Hôpital' && (
    <Col xs={12}>
      <CustomLabel><strong>Hôpital:</strong> </CustomLabel>
      <span>{' '}{fiche.hopital}</span>
    </Col>
    )}
    <Col xs={12}>
      <CustomLabel><strong>Service:</strong> </CustomLabel>
      <span>{' '}{fiche.service}</span>
    </Col>
    <Col xs={12}>
      <CustomLabel><strong>Identité du patient:</strong> </CustomLabel>
      <span>{' '}{fiche.id_patient}</span>
    </Col>
    <Col xs={12}>
      <CustomLabel><strong>Âge:</strong> </CustomLabel>
      <span>{' '}{fiche.age}</span>
    </Col>
    <Col xs={12}>
      <CustomLabel><strong>Sexe:</strong> </CustomLabel>
      <span>{' '}{fiche.sexe}</span>
    </Col>
    <Col xs={12}>
      <CustomLabel><strong>Adresse à Sousse:</strong> </CustomLabel>
      <span>{' '}{fiche.lieu_sousse}</span>
    </Col>
    <Col xs={12}>
      <CustomLabel><strong>Adresse , Ville:</strong> </CustomLabel>
      <span>{' '}{fiche.adresse_ville}</span>
    </Col>
  </Card>
);

export default DetailsPatient;
