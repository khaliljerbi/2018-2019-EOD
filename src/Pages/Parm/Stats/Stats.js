import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { HorizontalBar, Bar } from 'react-chartjs-2';
import Card from '../../../Components/Card/Card';
import { getAllFiche, getMedParm } from '../../../Actions/Med_Reg/Actions';

class Stats extends Component {
  componentDidMount() {
    this.props.getMedParm();
    this.props.getAllFiche();
  }

  getEachMonthDataParm = (month) => {
    const { fiches: { fiches }, auth: { user } } = this.props;
    return fiches.filter(f => new Date(f.date).getMonth() + 1 === month && new Date(f.date).getFullYear() === new Date().getFullYear() && user.id === f.parm._id).length;
  }

  renderBarTotalDataHandler = () => {
    const data = {
      labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
      datasets: [
        {
          label: 'Fiche régulation',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [this.getEachMonthDataParm(1),
            this.getEachMonthDataParm(2),
            this.getEachMonthDataParm(3),
            this.getEachMonthDataParm(4),
            this.getEachMonthDataParm(5),
            this.getEachMonthDataParm(6),
            this.getEachMonthDataParm(7),
            this.getEachMonthDataParm(8),
            this.getEachMonthDataParm(9),
            this.getEachMonthDataParm(10),
            this.getEachMonthDataParm(11),
            this.getEachMonthDataParm(12)],
        },
      ],
    };

    return <Bar data={data} height={400} options={{ maintainAspectRatio: false }} />;
  }

  renderBarDataFormatHandler = () => {
    const { fiches: { meds, fiches }, auth: { user } } = this.props;
    const medsLabels = meds.map(med => `${med.firstname} ${med.lastname}`);
    // extract related data
    const dataValues = meds.map(med => fiches.filter(fiche => (fiche.medecin._id === med._id && fiche.parm._id === user.id)).length);
    const data = {
      labels: medsLabels,
      datasets: [
        {
          label: 'Fiche / Médecin Régulateur',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: dataValues,
        },
      ],
    };

    return <HorizontalBar data={data} height={400} options={{ maintainAspectRatio: false }} />;
  }

  renderData = () => {
    // const { meds } = this.props.fiches;
  }

  render() {
    const { location } = this.props;
    return (
      <>
        <Row>
          <Col xs={12}>
            <Card style={{ marginTop: 20 }} header="Statistiques totalité des fiches: ">
              {this.renderBarTotalDataHandler()}
            </Card>
          </Col>
        </Row>
        { location && location.pathname === '/parm_stats' && (
        <Row>
          <Col xs={12}>
            <Card style={{ marginTop: 20 }} header="Statistiques détaillées: ">
              {this.renderBarDataFormatHandler()}
            </Card>
          </Col>
        </Row>
        ) }
      </>
    );
  }
}

const mapStateToProps = state => ({
  fiches: state.ficheReg,
  auth: state.auth,
});
export default connect(mapStateToProps, { getMedParm, getAllFiche })(Stats);
