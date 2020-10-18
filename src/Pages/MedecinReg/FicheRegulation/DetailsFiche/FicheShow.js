/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, CardImg, Button } from 'reactstrap';
import { getFiche } from '../../../../Actions/Med_Reg/Actions';
import { lockFiche } from '../../../../Actions/Parm/Actions';
import { isEmpty } from '../../../../Shared/isEmpty/isEmpty';
import Card from '../../../../Components/Card/Card';
import Spinner from '../../../../Components/Spinner/Spinner';
import DetailsPatient from './DetailsPatient';
import DetailsIntervention from './DetailsIntervention';
import BilanIntervention from './BilanIntervention';
import DetailsAppel from './DetailsAppel';
import DetailsFiche from './DetailsFiche';
import DetailsDestination from './DetailsDestination';


class FicheShow extends Component {
  componentDidMount() {
    this.props.getFiche(this.props.match.params.id);
  }

  // Check if we receive the same ID or not
  // If yes , getFiche(with new ID)
  // else do nothing
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.getFiche(this.props.match.params.id);
    }
  }

  render() {
    const { loading, fiche } = this.props.fiche;
    const { user } = this.props;
    const { id } = this.props.match.params;
    if (loading || isEmpty(fiche) || !user) {
      return <Spinner />;
    }
    return (
      <React.Fragment>
        <Row>
          <Col>
            <Card
              header="Informations fiche de régulation: "
              content={(
                <>
                  {user.role === 'Permanencier' && <Button disabled={fiche.cloture} onClick={() => this.props.lockFiche(id, this.props.history)} color="success"><i className="fa fa-lock" /></Button>} {' '}
                  {(user.role === 'Médecin Régulateur' || user.role === 'Chef Service') && <Link to={`/fiche_reg/edit/${id}`}><Button color="primary">Modifier Fiche</Button></Link> }
                </>
                )}
            >
              <Row>
                <Col lg={6}>
                  <DetailsFiche fiche={fiche} />
                </Col>
                <Col lg={6}>
                  <DetailsAppel fiche={fiche} />
                </Col>
                <Col lg={6}>
                  <DetailsPatient fiche={fiche} />
                </Col>
                {user.role !== 'Permanencier'
                && (
                <>
                  <Col lg={6}>
                    <DetailsIntervention fiche={fiche} />
                  </Col>
                  <Col lg={6}>
                    <BilanIntervention fiche={fiche} />
                  </Col>
                  <Col lg={6}>
                    <DetailsDestination fiche={fiche} />
                  </Col>
                </>
                )}
              </Row>
            </Card>
          </Col>
        </Row>
        {fiche.attached_image && user.role !== 'Permanencier' && (
        <Row>
          <Col>
            <Card header="Images / Fichiers associés: ">
              <Col lg={4}>
                <CardImg style={{ cursor: 'pointer' }} onClick={() => this.props.history.push('/preview', { image: fiche.attached_image, route: `/fiche_reg/${id}` })} width="100%" src={fiche.attached_image} />
              </Col>
            </Card>
          </Col>
        </Row>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  fiche: state.ficheReg,
  user: state.auth.user,
});
export default connect(mapStateToProps, { lockFiche, getFiche })(FicheShow);
