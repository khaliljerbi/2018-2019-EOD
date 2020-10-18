import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Page404 extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <div className="clearfix">
                <h1 className="float-left display-3 mr-4">404</h1>
                <h4 className="pt-3">{'La page demandée n\'existe pas'}</h4>
                <p className="text-muted float-left">{'Revenir à votre dashboard par ce '}
                  <NavLink to="/" style={{ textDecoration: 'underline', color: 'blue', cursor: 'pointer' }}>lien</NavLink>&nbsp;
                  <i className="fa fa-arrow-left" />
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Page404;
