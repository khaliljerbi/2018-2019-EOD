import React, { memo } from 'react';
import { Row, Col, Button, CardImg } from 'reactstrap';
import { Link } from 'react-router-dom';
import Card from '../../../Components/Card/Card';
import CustomLabel from '../../../Components/Label/Label';
import * as dateFormat from '../../../Shared/DateFormat/DateFormat';

const UserDetailsPerso = memo(({ user, auth, givenId, handlePhotoChange }) => (
  <Row>
    <Col xs={12} lg={{ size: 7, offset: 2 }}>
      <Card header="Informations personnelles: ">
        <Row>
          <Col xs={{ size: 10, offset: 2 }} lg={{ size: 5, offset: 4 }}>
            <CardImg style={{ width: 200, height: 200, marginBottom: 20 }} src={user.profilePicture ? user.profilePicture : '/static/images/no_image.webp'} />
          </Col>
          {auth === givenId && (
          <Col xs={{ size: 10, offset: 2 }} lg={{ size: 5, offset: 4 }}>
            <Button onClick={handlePhotoChange} style={{ marginBottom: 25 }} color="success">Modifier photo</Button>
          </Col>
          )}
          <Col xs={{ size: 10, offset: 2 }} lg={{ size: 5, offset: 4 }}>
            <CustomLabel><strong>Nom:</strong> </CustomLabel>
            <span>{' '}{user.lastname}</span>
          </Col>
          <Col xs={{ size: 10, offset: 2 }} lg={{ size: 5, offset: 4 }}>
            <CustomLabel><strong>Prénom:</strong> </CustomLabel>
            <span>{' '}{user.firstname}</span>
          </Col>
          <Col xs={{ size: 10, offset: 2 }} lg={{ size: 5, offset: 4 }}>
            <CustomLabel><strong>CIN:</strong> </CustomLabel>
            <span>{' '}{user.cin}</span>
          </Col>
          <Col xs={{ size: 10, offset: 2 }} lg={{ size: 5, offset: 4 }}>
            <CustomLabel><strong>Email:</strong> </CustomLabel>
            <span>{' '}{user.email}</span>
          </Col>
          <Col xs={{ size: 10, offset: 2 }} lg={{ size: 5, offset: 4 }}>
            <CustomLabel><strong>Téléphone:</strong> </CustomLabel>
            <span>{' '}{user.telephone}</span>
          </Col>
          <Col xs={{ size: 10, offset: 2 }} lg={{ size: 5, offset: 4 }}>
            <CustomLabel><strong>Date fin de garde:</strong> </CustomLabel>
            <span>{' '}{dateFormat.regularDate(user.gardeDuration)}</span>
          </Col>
          <Col xs={{ size: 10, offset: 2 }} lg={{ size: 5, offset: 4 }}>
            <CustomLabel><strong>Rôle:</strong> </CustomLabel>
            <span>{' '}{user.role}</span>
          </Col>
        </Row>
        <Row style={{ marginTop: 20 }}>
          <Col style={{ margin: 0 }}>
            <Link to={`/admin/users/update/${user._id}`}><Button color="primary">Modifier</Button></Link>
          </Col>
        </Row>
      </Card>
    </Col>
  </Row>
));


export default UserDetailsPerso;
