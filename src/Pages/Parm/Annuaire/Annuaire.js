import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Row, Col, Button } from 'reactstrap';
import Table from '../../../Components/Table/Table';
import Spinner from '../../../Components/Spinner/Spinner';
import { getAnnuaire } from '../../../Actions/Parm/Actions';
import Card from '../../../Components/Card/Card';
import { roleOption } from '../../../Shared/StaticData/StaticOptions';
import Select from '../../../Components/Select/SingleSelect/SelectWithoutRedux';

class Annuaire extends Component {
  UsersColumns =
    [
      {
        columns: [
          {
            Header: 'Nom',
            accessor: 'lastname',
          },
          {
            Header: 'Prénom',
            accessor: 'firstname',
          },
        ],
      },
      {
        columns: [
          {
            Header: 'Téléphone',
            accessor: 'telephone',
          },
          {
            Header: 'Rôle',
            accessor: 'role',
          },
        ],
      },
      {
        id: 'action',
        accessor: user => (<Button color="primary" onClick={() => this.props.history.push('/mail', { email: user.email })}><i className="fa fa-at" style={{ fontSize: '1rem' }} /></Button>),
      },
    ];

  state = {
    role: null,
  }

  componentDidMount() {
    this.props.getAnnuaire();
  }

  onChangeHandler = e => this.setState({ role: e });

  render() {
    const { role } = this.state;
    const { annuaire, loading } = this.props.parm;

    if (loading) return <Spinner />;
    const filteredData = !role ? [...annuaire] : annuaire.filter(a => a.role === role.value);
    return (
      <Row>
        <Col lg={4}>
          <Select name="role" onChange={this.onChangeHandler} options={roleOption} label="Rôle: " />
          <ToastContainer />
        </Col>
        <Col xs={12}>
          <Card header="Annuaire des utilisateurs">
            <Table data={filteredData} columns={this.UsersColumns} />
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  parm: state.parm,
});
export default connect(mapStateToProps, { getAnnuaire })(Annuaire);
