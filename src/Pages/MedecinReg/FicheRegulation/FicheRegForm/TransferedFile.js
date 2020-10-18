/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { reset } from 'redux-form';
import { fillUpPendingFiche, getMedParm, getFiche } from '../../../../Actions/Med_Reg/Actions';
import InfosFicheForm from './TransferedFiche/InfoFicheTransfer';
import * as dateFormat from '../../../../Shared/DateFormat/DateFormat';
import InfosAppelForm from './TransferedFiche/InfoAppelTransfer';
import InfoPatientForm from './TransferedFiche/InfoPatientTransfer';
import DetailsInterventionForm from './TransferedFiche/DetailsInterventionTransfer';
import BilanForm from './TransferedFiche/BilanTransfered';
import DestinationForm from './TransferedFiche/DestinationTransfered';
import FicheUpload from './TransferedFiche/UploadTransfer';
import { isEmpty } from '../../../../Shared/isEmpty/isEmpty';
import Spinner from '../../../../Components/Spinner/Spinner';

class TransferedFile extends Component {
  state = {
    page: 3,
  }

  componentDidMount() {
    this.props.getMedParm();
    this.props.getFiche(this.props.match.params.id);
  }

  previousPage = () => {
    this.setState(prevState => ({ page: prevState.page - 1 }));
  }

  nextPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  }

  submitHandler = ({ image, ...values }) => {
    const { history, match: { params: { id } } } = this.props;
    const formData = new FormData();
    formData.append('image', image);
    if (values.lieu_patient !== 'Hôpital') {
      values.hopital = '';
      values.service = '';
    }
    this.props.fillUpPendingFiche(id, values, formData, history, reset);
  }

  render() {
    const { page } = this.state;
    const { fiche, loading } = this.props.fiche;

    if (loading || isEmpty(fiche)) {
      return <Spinner />;
    }
    const { parms, meds } = this.props.fiche;
    // transform values to react select format
    const parmsData = parms.map(parm => ({ value: parm._id, label: `${parm.lastname} ${parm.firstname}` }));
    const medsData = meds.map(med => ({ value: med._id, label: `${med.lastname} ${med.firstname}` }));
    // get initial Values
    const initialValues = _.pick(fiche, 'time_fiche',
      'origine_appel',
      'arr_appel',
      'appelant',
      'nom_appelant',
      'num_appelant',
      'lieu_patient',
      'hopital',
      'service',
      'id_patient',
      'age',
      'sexe',
      'lieu_sousse',
      'adresse_ville',
      'nb_victime',
      'motif_appel');
    return (
      <React.Fragment>
        {this.state.alert}
        {page === 1 && <InfosFicheForm parms={parmsData} meds={medsData} onSubmit={this.nextPage} header="Informations fiche régulation: " />}
        {page === 2 && <InfosAppelForm previousHandler={this.previousPage} header="Informations appel: " onSubmit={this.nextPage} />}
        {page === 3 && <InfoPatientForm previousHandler={this.previousPage} initialValues={{ date_fiche: dateFormat.pickerFormat(fiche.date), parm: fiche.parm._id, medecin: fiche.medecin._id, ...initialValues }} header="Informations patient: " onSubmit={this.nextPage} />}
        {page === 4 && <DetailsInterventionForm previousHandler={this.previousPage} header="Détails intervention: " onSubmit={this.nextPage} />}
        {page === 5 && <BilanForm previousHandler={this.previousPage} header="Bilan intervention: " onSubmit={this.nextPage} />}
        {page === 6 && <DestinationForm previousHandler={this.previousPage} header="Destionation: " onSubmit={this.nextPage} />}
        {page === 7 && <FicheUpload previousHandler={this.previousPage} header="Fichier(s) supplémentaire(s)" onSubmit={this.submitHandler} />}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  fiche: state.ficheReg,
});
export default connect(mapStateToProps, { fillUpPendingFiche, getMedParm, getFiche })(TransferedFile);
