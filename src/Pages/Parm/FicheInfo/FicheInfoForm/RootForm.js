import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { addFicheInfo } from '../../../../Actions/Parm/Actions';
import { getMedParm } from '../../../../Actions/Med_Reg/Actions';
import InfosFicheForm from './InfosFicheForm';
import * as dateFormat from '../../../../Shared/DateFormat/DateFormat';
import InfosAppelForm from './InfosAppelForm';
import InfoPatientForm from './InfoPatientForm';

class RootFicheForm extends Component {
  state = {
    page: 1,
  }

  componentDidMount() {
    this.props.getMedParm();
  }

  previousPage = () => {
    this.setState(prevState => ({ page: prevState.page - 1 }));
  }

  nextPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  }

  submitHandler = (values) => {
    const { history } = this.props;
    this.props.addFicheInfo(values, history, reset);
  }

  render() {
    const { page } = this.state;
    const { parms, meds, user } = this.props;
    const parmsData = parms.map(parm => ({ value: parm._id, label: `${parm.lastname} ${parm.firstname}` }));
    const medsData = meds.map(med => ({ value: med._id, label: `${med.lastname} ${med.firstname}` }));
    return (
      <>
        {page === 1 && <InfosFicheForm user={user} parms={parmsData} meds={medsData} onSubmit={this.nextPage} initialValues={{ date_fiche: dateFormat.today, parm: user.id, time_fiche: dateFormat.timeDate(new Date()) }} header="Informations fiche régulation: " />}
        {page === 2 && <InfosAppelForm previousHandler={this.previousPage} header="Informations appel: " onSubmit={this.nextPage} />}
        {page === 3 && <InfoPatientForm previousHandler={this.previousPage} header="Informations patient: " onSubmit={this.submitHandler} />}
      </>
    );
  }
}

const mapStateToProps = state => ({
  parms: state.ficheReg.parms,
  meds: state.ficheReg.meds,
  user: state.auth.user,
});
export default connect(mapStateToProps, { addFicheInfo, getMedParm })(RootFicheForm);
