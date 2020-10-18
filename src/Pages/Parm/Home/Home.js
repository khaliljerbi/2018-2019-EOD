import React from 'react';
import { Row, Col } from 'reactstrap';
import Stats from '../Stats/Stats';
import PendingMissions from '../PendingMissions/PendingMissions';

const ParmHome = () => (
  <React.Fragment>
    <Row>
      <Col xs={12} sm={12} md={6} lg={6} xl={6}>
        <Stats />
      </Col>
      <Col xs={12} sm={12} md={6} lg={6} xl={6}>
        <PendingMissions />
      </Col>
    </Row>
  </React.Fragment>
);


export default ParmHome;
