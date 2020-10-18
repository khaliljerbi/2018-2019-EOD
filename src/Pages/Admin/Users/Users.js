/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import UserList from './UserList';
import Card from '../../../Components/Card/Card';
import IO from '../../../Services/socketService';
import SearchInput from '../../../Components/Input/FormInput/FormInput';
import { getAllUser, deleteUser, realTimeAddUser } from '../../../Actions/Admin/Actions';
import SpinnerUI from '../../../Components/Spinner/Spinner';


class Users extends Component {
  state = {
    search: '',
  }

  componentDidMount() {
    // et all users
    this.props.getAllUser();
    // for realtime user add
    this.props.realTimeAddUser();
    // for realtime user delete
    IO.getSocket().on('user_delete', () => this.props.getAllUser());
  }

  // modify User
  getUserHandler = (user) => {
    this.props.history.push(`/admin/users/${user._id}`);
  }

  // Search input onChange
  handleSearchChange = e => this.setState({ search: e.target.value });

  // global search method
  onFilterChange = data => data.filter(row => `${row.lastname.toLowerCase()} ${row.firstname.toLowerCase()}`.includes(this.state.search.trim().toLowerCase())
  || `${row.firstname.toLowerCase()} ${row.lastname.toLowerCase()}`.includes(this.state.search.trim().toLowerCase())
  || row.telephone.toString().toLowerCase().includes(this.state.search.trim().toLowerCase())
  || row.cin.toString().toLowerCase().includes(this.state.search.trim().toLowerCase()));

  render() {
    const { users, loading } = this.props.users;
    const { search } = this.state;
    const content = (<Link to="/admin/register"><Button color="success">Ajouter utilisateur</Button></Link>);
    if (loading) {
      return <SpinnerUI />;
    }
    let rows = [...users];
    if (search) {
      rows = [...this.onFilterChange(users)];
    }

    return (
      <>
        <Row>
          <Col lg={7}>
            <Card>
              <SearchInput value={search} onchange={this.handleSearchChange} icon="fa fa-search" placeholder="Rechercher..." />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Card header="Liste de tous les utilisateurs : " content={content}>
              <UserList
                users={rows}
                loading={loading}
                history={this.props.history}
                getUserHandler={this.getUserHandler}
              />
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToProps = state => ({
  users: state.admin,
});
export default connect(mapStateToProps, { getAllUser, deleteUser, realTimeAddUser })(Users);
