import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Card from '../../Components/Card/Card';
import ChangePassword from './ChangePassword/ChangePassword';

class Profile extends Component {
  render() {
    return (
      <>
        <Row>
          <Col xs={12} sm={12} md={12} lg={{ size: 8, offset: 2 }} xl={{ size: 8, offset: 2 }} xxl={{ size: 8, offset: 2 }}>
            <Card header="Changer votre mot de passe: ">
              <ChangePassword />
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

export default Profile;
