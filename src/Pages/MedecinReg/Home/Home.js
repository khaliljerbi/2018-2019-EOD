import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import { getAllFiche } from '../../../Actions/Med_Reg/Actions';
import Card from '../../../Components/Card/Card';

class MedecinRegHome extends Component {
  componentDidMount() {
    this.props.getAllFiche();
  }

  renderLineChart = () => {
    const chart = {
      labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
      datasets: [
        {
          label: 'Fiches',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [2, 5, 9, 20, 26, 15, 30],
        },
      ],
    };
    return <Line data={chart} height={500} options={{ maintainAspectRatio: false }} />;
  }

  render() {
    // const { user } = this.props;
    return (
      <React.Fragment>
        <Row style={{ marginTop: 20 }}>
          <Col lg={6}>
            <Card>
              {this.renderLineChart()}
            </Card>
          </Col>
          <Col lg={6}>
            <Card header="Derniers articles: ">
              <p>En cours...</p>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  fiches: state.ficheReg,
});
export default connect(mapStateToProps, { getAllFiche })(MedecinRegHome);
