import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../../Actions/Admin/Actions';
import * as dateFormat from '../../../Shared/DateFormat/DateFormat';
import UserForm from '../UserForm/UserForm';

class RegisterUser extends Component {
  handleSubmit = (values) => {
    this.props.registerUser(values, this.props.history);
  }

  render() {
    return (
      <UserForm onSubmit={this.handleSubmit} initialValues={{ gardeDuration: dateFormat.today }} header="Enregister les utilisateurs: " />
    );
  }
}
export default connect(null, { registerUser })(RegisterUser);
