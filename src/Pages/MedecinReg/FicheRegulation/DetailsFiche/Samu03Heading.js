import React from 'react';
import { Row, Col } from 'reactstrap';

const Samu03Heading = () => (
  <Row>
    <Col xs={{ size: 3, offset: 1 }}>
      <Row>
        <Col xs={12}>
          <h6>REPUBLIQUE TUNISIENNE</h6>
        </Col>
        <Col xs={12}>
          <h6>MINISTERE DE LA SANTE</h6>
        </Col>
      </Row>
    </Col>
    <Col xs={2}>
      <img style={{ height: 52, width: 80, marginTop: -7 }} src="/static/images/logo1.webp" alt="samu " />
    </Col>
    <Col xs={{ size: 3 }}>
      <Row>
        <Col xs={12}>
          <h6>E.P.S SAHLOUL SAMU DU CENTRE EST</h6>
        </Col>
      </Row>
    </Col>
  </Row>
);

export default Samu03Heading;
