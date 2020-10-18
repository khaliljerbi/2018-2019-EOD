import React, { Component } from 'react';
import { Row, Col, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Logs from '../AdminLogs/Logs';
import { getAllUser } from '../../../Actions/Admin/Actions';
import Statistiques from '../Statistiques/Statistiques';
import CustomCard from '../../../Components/Card/Card';
import SpinnerUI from '../../../Components/Spinner/Spinner';

class AdminHome extends Component {
  componentDidMount() {
    this.props.getAllUser();
  }

  render() {
    const { users } = this.props.users;
    if (!users) {
      return <SpinnerUI />;
    }
    return (
      <>
        <Row>
          <Col lg={7}>
            <Statistiques initialValues={{ year: new Date().getFullYear() }} />
          </Col>
          <Col lg={5}>
            <Logs />
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <CustomCard header="Utilisateurs en garde: ">
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Rôle</th>
                    <td />
                  </tr>
                </thead>
                <tbody>
                  {users.filter(user => new Date(user.gardeDuration) >= new Date()).map((user, index) => (
                    <tr key={user._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{user.lastname}</td>
                      <td>{user.firstname}</td>
                      <td>{user.role}</td>
                      <td><Link to={`/admin/users/${user._id}`}> Voir Détails</Link></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CustomCard>
          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToProps = state => ({
  users: state.admin,
});
export default connect(mapStateToProps, { getAllUser })(AdminHome);
