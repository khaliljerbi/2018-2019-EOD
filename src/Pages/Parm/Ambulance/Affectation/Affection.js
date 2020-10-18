import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardImg, CardText, CardBody, CardTitle, Button, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { getAmbulances } from '../../../../Actions/Admin/Actions';
import { affectAmbulance } from '../../../../Actions/Parm/Actions';
import Alert from '../../../../Components/Alerts/ErrorAlert/ErrorAlert';
import CustomCard from '../../../../Components/Card/Card';

class Affection extends Component {
  componentDidMount() {
    this.props.getAmbulances();
  }

  render() {
    const { ambulances: { available, error }, match: { params: { id } } } = this.props;
    return (
      <>
        {error && <Alert>{error}</Alert>}
        <Row>
          <Col xs={12}>
            <CustomCard header="Affectation des SMUR">
              <Row>
                {available.map(ambulance => (
                  <Col key={ambulance._id} lg={{ size: 6, offsete: 1 }}>
                    <Card>
                      <Row>
                        <Col sm={{ size: 5, offset: 3 }}>
                          <CardImg top src="/static/images/amb.webp" alt={ambulance.name} />
                        </Col>
                      </Row>
                      <CardBody>
                        <CardTitle className="text-center"><strong>{ambulance.name}</strong></CardTitle>
                        <CardText><strong>Equipements:</strong></CardText>
                        <ListGroup>
                          {ambulance.equipements.map(e => <ListGroupItem key={e}>{e}</ListGroupItem>)}
                        </ListGroup>
                        <br />
                        <Col xs={{ size: 5, offset: 3 }} lg={{ size: 5, offset: 4 }}>
                          <Button color="success" onClick={() => this.props.affectAmbulance(ambulance._id, id)}>Affecter</Button>
                        </Col>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>
            </CustomCard>
          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToProps = state => ({
  ambulances: state.ambulance,
});
export default connect(mapStateToProps, { getAmbulances, affectAmbulance })(Affection);
