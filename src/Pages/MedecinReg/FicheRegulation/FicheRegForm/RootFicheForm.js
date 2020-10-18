/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { Nav, NavItem, NavLink, TabContent, TabPane, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { addFicheReg, getMedParm } from '../../../../Actions/Med_Reg/Actions';
import InfosFicheForm from './InfosFicheForm';
import * as dateFormat from '../../../../Shared/DateFormat/DateFormat';
import InfosAppelForm from './InfosAppelForm';
import InfoPatientForm from './InfoPatientForm';
import DetailsInterventionForm from './DetailsInterventionForm';
import BilanForm from './BilanForm';
import DestinationForm from './DestinationForm';
import FicheUpload from './FicheUpload';
import CustomCard from '../../../../Components/Card/Card';

class RootFicheForm extends Component {
  state = {
    page: 1,
    activeTab: '1',
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

  submitHandler = ({ image, ...values }) => {
    const { history } = this.props;
    const formData = new FormData();
    formData.append('image', image);
    if (values.lieu_patient !== 'Hôpital') {
      values.hopital = '';
      values.service = '';
    }
    this.props.addFicheReg(values, formData, history, reset);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
        page: 1,
      });
    }
  }

  render() {
    const { page } = this.state;
    const { parms, meds } = this.props;
    const parmsData = parms.map(parm => ({ value: parm._id, label: `${parm.lastname} ${parm.firstname}` }));
    const medsData = meds.map(med => ({ value: med._id, label: `${med.lastname} ${med.firstname}` }));
    return (
      <React.Fragment>
        {page === 5 && <BilanForm previousHandler={this.previousPage} header="Bilan intervention: " onSubmit={this.nextPage} />}
        {page === 6 && <DestinationForm previousHandler={this.previousPage} header="Destionation: " onSubmit={this.nextPage} />}
        <CustomCard>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggle('1'); }}
              >
              Informations
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}
              >
              Motif de l'appel
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '3' })}
                onClick={() => { this.toggle('3'); }}
              >
              Décision
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '4' })}
                onClick={() => { this.toggle('4'); }}
              >
                <i className="fa fa-paperclip" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '5' })}
                onClick={() => { this.toggle('5'); }}
              >
                Typologie
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '6' })}
                onClick={() => { this.toggle('6'); }}
              >
                Destination
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '7' })}
                onClick={() => { this.toggle('7'); }}
              >
                Evolution ultérieure
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '8' })}
                onClick={() => { this.toggle('8'); }}
              >
                Validation finale
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  {page === 1 && <InfosFicheForm parms={parmsData} meds={medsData} onSubmit={this.nextPage} initialValues={{ date_fiche: dateFormat.today, time_fiche: dateFormat.timeDate(new Date()) }} header="Informations fiche régulation: " />}
                  {page === 2 && <InfosAppelForm previousHandler={this.previousPage} header="Informations appel: " onSubmit={this.nextPage} />}
                  {page === 3 && <InfoPatientForm previousHandler={this.previousPage} header="Informations patient: " onSubmit={this.nextPage} />}
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col>
                  {page === 1 && <DetailsInterventionForm previousHandler={this.previousPage} header="Motif de l'appel: " onSubmit={this.nextPage} />}
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="3">
              <Row>
                <Col>
                  tab3
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="4">
              <Row>
                <Col>
                  {page === 7 && <FicheUpload previousHandler={this.previousPage} header="Fichier(s) supplémentaire(s)" onSubmit={this.submitHandler} />}
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </CustomCard>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  parms: state.ficheReg.parms,
  meds: state.ficheReg.meds,
});
export default connect(mapStateToProps, { addFicheReg, getMedParm })(RootFicheForm);
