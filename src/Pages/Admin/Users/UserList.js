import React, { Component } from 'react';
import { Button, CustomInput } from 'reactstrap';
import { connect } from 'react-redux';
import { activateUser } from '../../../Actions/Admin/Actions';
import Table from '../../../Components/Table/Table';
import Spinner from '../../../Components/Spinner/Spinner';
import * as dateFormat from '../../../Shared/DateFormat/DateFormat';

class UserList extends Component {
  UsersColumns =
    [
      {
        Header: 'Nom Complet',
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
        Header: 'Informations Supplémentaires',
        columns: [
          {
            Header: 'Rôle',
            accessor: 'role',
          },
          {
            Header: 'Date fin de garde',
            id: 'gardeDuration',
            accessor: user => (user.isAdmin ? <span> - </span> : dateFormat.regularDate(user.gardeDuration)),
          },
          {
            Header: 'Derniére connexion',
            id: 'lastConnection',
            accessor: user => (user.lastConnection ? <span>{`${dateFormat.slashFormat(user.lastConnection)} à ${dateFormat.timeDate(user.lastConnection)}`}</span> : <span> - </span>),
          },
          {
            Header: 'Activer',
            id: 'activation',
            accessor: user => (user.isAdmin ? null : <CustomInput defaultChecked={user.isAllowed} onChange={() => this.props.activateUser(user._id, !user.isAllowed)} value={user.isAllowed} className="text-center" type="switch" id={user._id} name={`switch_${user.cin}`} />),
          },
        ],
      },
      {
        Header: 'Actions',
        id: 'action',
        accessor: user => (<React.Fragment><Button color="primary" onClick={() => this.props.getUserHandler(user)}><i className="fa fa-info" /></Button>{' '}<Button disabled={user.isAdmin} color="danger" onClick={() => this.props.history.push(`/admin/users/delete/${user._id}`)}><i className="fa fa-trash" /></Button></React.Fragment>),
      },
    ];

  render() {
    const { users, loading } = this.props;
    const userList = loading ? <Spinner /> : <Table columns={this.UsersColumns} data={users} />;
    return (
      <React.Fragment>
        { userList }
      </React.Fragment>
    );
  }
}


export default connect(null, { activateUser })(UserList);
