/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import _ from 'lodash';
import { editFicheReg, getFiche, getMedParm } from '../../../../Actions/Med_Reg/Actions';
import { isEmpty } from '../../../../Shared/isEmpty/isEmpty';
import Spinner from '../../../../Components/Spinner/Spinner';
import * as dateFormat from '../../../../Shared/DateFormat/DateFormat';
import InfosAppelEdit from './InfosAppelEdit';
import InfosPatientEdit from './InfosPatientEdit';
import DetailsInterventionEdit from './DetailsInterventionEdit';
import DestinationEdit from './DestinationEdit';
import FicheUploadEdit from './FicheUploadEdit';
import InfosFicheEdit from './InfosFicheEdit';
import BilanEdit from './BilanEdit';

class FicheEdit extends Component {
  state = {
    page: 1,
  }

  componentDidMount() {
    this.props.getFiche(this.props.match.params.id);
    this.props.getMedParm();
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
    this.props.editFicheReg(id, values, formData, history, reset);
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
      'motif_appel',
      'objet_demande',
      'decision_reg',
      'vh_eng',
      'smur_eng',
      'medecin_int',
      'nom_med',
      'bilan',
      'pathologie',
      'typ_pathologie',
      'typ_pathologie_diag',
      'menace_vit',
      'circonstance',
      'destination_desiree',
      'destination_obtenue',
      'destination_finale',
      'mission',
      'mission_util');
    return (
      <React.Fragment>
        {page === 1 && <InfosFicheEdit parms={parmsData} meds={medsData} onSubmit={this.nextPage} initialValues={{ date_fiche: dateFormat.pickerFormat(fiche.date), parm: fiche.parm._id, medecin: fiche.medecin._id, ...initialValues }} header="Informations fiche régulation: " />}
        {page === 2 && <InfosAppelEdit previousHandler={this.previousPage} header="Informations appel: " onSubmit={this.nextPage} />}
        {page === 3 && <InfosPatientEdit previousHandler={this.previousPage} header="Informations patient: " onSubmit={this.nextPage} />}
        {page === 4 && <DetailsInterventionEdit previousHandler={this.previousPage} header="Détails intervention: " onSubmit={this.nextPage} />}
        {page === 5 && <BilanEdit previousHandler={this.previousPage} header="Bilan intervention: " onSubmit={this.nextPage} />}
        {page === 6 && <DestinationEdit previousHandler={this.previousPage} header="Destionation: " onSubmit={this.nextPage} />}
        {page === 7 && <FicheUploadEdit previousHandler={this.previousPage} header="Fichier(s) supplémentaire(s)" onSubmit={this.submitHandler} />}
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  fiche: state.ficheReg,
});
export default connect(mapStateToProps, { editFicheReg, getFiche, getMedParm })(FicheEdit);
