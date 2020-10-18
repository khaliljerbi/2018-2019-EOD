import React from 'react';
import { Container, Row, Col, Button, Card, CardBody } from 'reactstrap';

const ResetSuccesView = ({ location, history }) => {
  // redirect if no state provided
  if (!location.state) window.location = '/reset';
  const { email } = location.state;
  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <Card className="p-4">
              <CardBody>
                <span className="clearfix">
                  <span className="float-left">Email envoyé avec succés à: <strong>{email}</strong></span>
                  <p className="text-muted float-left">Si vous ne recevez pas de mail dans les 5 minutes qui suivent, réessayez en cliquant sur le boutton ci-dessous.</p>
                </span>
                <Row>
                  <Col xs="6">
                    <Button onClick={() => history.push('/reset')} color="primary" className="px-4">Réessayez</Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ResetSuccesView;
