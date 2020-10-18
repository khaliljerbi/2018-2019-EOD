import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Row } from 'reactstrap';
import Modal from '../../../../Components/Modal/Modal';
import { getFiche } from '../../../../Actions/Med_Reg/Actions';
import Spinner from '../../../../Components/Spinner/Spinner';
import { isEmpty } from '../../../../Shared/isEmpty/isEmpty';
import Samu03Heading from './Samu03Heading';
import DetailsFiche from './DetailsFiche';
import { toPDF } from '../../../../Shared/PDF/pdf';
import DetailsAppel from './DetailsAppel';
import DetailsPatient from './DetailsPatient';
import DetailsIntervention from './DetailsIntervention';
import BilanIntervention from './BilanIntervention';
import DetailsDestination from './DetailsDestination';

class FichePDF extends Component {
  componentDidMount() {
    this.props.getFiche(this.props.match.params.id);
  }

  renderContent = fiche => (
    <div id="pdf">
      <br />
      <Samu03Heading fiche={fiche} />
      <br /><br />
      <Row>
        <Col xs={{ size: 10, offset: 1 }}>
          <DetailsFiche fiche={fiche} />
        </Col>
        <Col xs={{ size: 10, offset: 1 }}>
          <DetailsAppel fiche={fiche} />
        </Col>
      </Row>
      <Row>
        <Col xs={{ size: 10, offset: 1 }}>
          <DetailsIntervention fiche={fiche} />
        </Col>
        <Col xs={{ size: 10, offset: 1 }}>
          <br /><br /><br /><br /><br /><br /><br /><br /><br />
          <DetailsPatient fiche={fiche} />
        </Col>
      </Row>
      <Row>
        <Col xs={{ size: 10, offset: 1 }}>
          <BilanIntervention fiche={fiche} />
        </Col>
        <Col xs={{ size: 10, offset: 1 }}>
          <DetailsDestination fiche={fiche} />
        </Col>
      </Row>
    </div>
  );

  renderActions = fiche => (
    <React.Fragment>
      <Button color="danger" onClick={() => toPDF('pdf', fiche.num_ordre)}>Télécharger</Button>{' '}
      <Button color="secondary" onClick={() => this.onDismissHandler()}>Annuler</Button>
    </React.Fragment>
  );

  onDismissHandler = () => this.props.history.push('/fiche_reg/all');

  render() {
    const { fiche, loading } = this.props.fiche;
    if (loading || isEmpty(fiche)) {
      return <Spinner />;
    }
    return (
      <Modal size="lg" content={() => this.renderContent(fiche)} actions={() => this.renderActions(fiche)} toggle={this.onDismissHandler} header="Fiche de régulation: " />
    );
  }
}

const mapStateToProps = state => ({
  fiche: state.ficheReg,
});
export default connect(mapStateToProps, { getFiche })(FichePDF);
