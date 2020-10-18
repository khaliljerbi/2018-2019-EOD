import React, { Component } from 'react';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import { Row, Col } from 'reactstrap';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Card from '../../../Components/Card/Card';
import { getAllFiche } from '../../../Actions/Med_Reg/Actions';
import SpinnerUI from '../../../Components/Spinner/Spinner';
import SingleSelect from '../../../Components/ReduxForm/FieldSelect/FieldSelect';
import Years from '../../../Shared/Years/Years';
import * as options from '../../../Shared/StaticData/StaticOptions';

class Statistiques extends Component {
  state = {
    annee: new Date().getFullYear(),
  }

  componentDidMount() {
    this.props.getAllFiche();
  }

  // get stats for each month function
  getEachMontStat = (month) => {
    const { fiches } = this.props.fiches;
    return fiches.filter(f => new Date(f.date).getMonth() + 1 === month && new Date(f.date).getFullYear() === this.state.annee).length;
  }

  onChangeHandler = (value) => {
    this.setState({ annee: value });
  }

  // get arrivee appel data
  getProvenanceData = (label) => {
    const { fiches } = this.props.fiches;
    return fiches.filter(fiche => fiche.arr_appel === label).length;
  }

  getLocationData = (label) => {
    const { fiches } = this.props.fiches;
    return fiches.filter(fiche => fiche.lieu_patient === label).length;
  }

  // render Pie data
  renderPieDataHandler = () => {
    // const { fiches } = this.props.fiches;
    const data = {
      labels: options.arrAppelOptions.map(option => option.value),
      datasets: [{
        data: options.arrAppelOptions.map(option => this.getProvenanceData(option.value)), // we need something like : { typologie: 'name of typologie', count: number }
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
        ],
      }],
    };
    return <Pie data={data} height={200} />;
  }

  renderDoughnutDataHandler = () => {
    const data = {
      labels: options.appelanntOptions.slice(0, 5).map(option => option.value),
      datasets: [{
        data: options.appelanntOptions.slice(0, 5).map(option => this.getLocationData(option.value)), // we need something like : { typologie: 'name of typologie', count: number }
        backgroundColor: [
          '#AD60D8',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
        ],
        hoverBackgroundColor: [
          '#C772F6',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
        ],
      }],
    };
    return <Doughnut data={data} height={200} />;
  }

  renderBarDataFormatHandler = () => {
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
          data: [this.getEachMontStat(1),
            this.getEachMontStat(2),
            this.getEachMontStat(3),
            this.getEachMontStat(4),
            this.getEachMontStat(5),
            this.getEachMontStat(6),
            this.getEachMontStat(7),
            this.getEachMontStat(8),
            this.getEachMontStat(9),
            this.getEachMontStat(10),
            this.getEachMontStat(11),
            this.getEachMontStat(12)],
        },
      ],
    };

    return <Bar data={data} height={400} options={{ maintainAspectRatio: false }} />;
  }

  render() {
    const { loading } = this.props.fiches;
    const { location } = this.props;
    if (loading) {
      return <SpinnerUI />;
    }
    return (
      <>
        <Card style={{ marginTop: 20 }} header="Statistiques des fiches: ">
          <Row>
            <Col lg={4}>
              <SingleSelect name="year" value={this.state.annee} onChange={this.onChangeHandler} options={Years} label="Année: " />
            </Col>
            <Col xs={12}>
              {this.renderBarDataFormatHandler()}
            </Col>
          </Row>
        </Card>
        {location && location.pathname === '/admin/global_stats' && (
        <Row>
          <Col lg={6}>
            <Card header="Statistiques provenance de l'appel: ">
              {this.renderPieDataHandler()}
            </Card>
          </Col>
          <Col lg={6}>
            <Card header="Statistiques localisation de l'appelant: ">
              {this.renderDoughnutDataHandler()}
            </Card>
          </Col>
        </Row>
        )}
      </>
    );
  }
}
const mapStateToProps = state => ({
  fiches: state.ficheReg,
});

export default connect(mapStateToProps, { getAllFiche })(reduxForm({
  form: 'stat',
})(Statistiques));
