import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '../../../Components/Card/Card';
import Table from '../../../Components/Table/Table';
import { getAmbulances } from '../../../Actions/Admin/Actions';

class AmbulanceList extends Component {
  AmbulanceColumns =
    [
      { Header: 'Liste',
        columns: [
          {
            Header: 'SMUR',
            accessor: 'name',
          },
          {
            Header: 'Status',
            id: 'status',
            accessor: ambulance => (ambulance.inMission ? <span style={{ color: 'red' }}> Pas disponible </span> : <span style={{ color: 'green' }}> Disponible </span>),
          },
        ],
      },
    ];

  componentDidMount() {
    this.props.getAmbulances();
  }

  render() {
    const { ambulances } = this.props.ambulance;
    return (
      <Row>
        <Col>
          <Card header="Liste des toutes les ambulances:" content={(<Link to="/admin/ambulances/add_ambulance"><Button color="success">Ajouter ambulance</Button></Link>)}>
            <Table data={ambulances} columns={this.AmbulanceColumns} />
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  ambulance: state.ambulance,
});
export default connect(mapStateToProps, { getAmbulances })(AmbulanceList);
