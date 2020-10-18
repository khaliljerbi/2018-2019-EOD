import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser, getUserFromTable } from '../../../Actions/Admin/Actions';
import Spinner from '../../../Components/Spinner/Spinner';
import * as dateFormat from '../../../Shared/DateFormat/DateFormat';
import UserFormEdit from '../UserForm/UserEditForm';

class UserUpdateForm extends Component {
  componentDidMount() {
    this.props.getUserFromTable(this.props.match.params.id);
  }

  handleSubmit = (values) => {
    const { id } = this.props.match.params;
    const user = {
      firstname: values.firstname,
      lastname: values.lastname,
      gardeDuration: values.gardeDuration,
      telephone: values.telephone,
      role: values.role,
    };
    this.props.updateUser(id, user, this.props.history);
  }

  render() {
    const { user, isLoading } = this.props.user;
    if (isLoading || !user) {
      return <Spinner />;
    }
    const { gardeDuration, ...rest } = user;
    return (
      <UserFormEdit initialValues={{ gardeDuration: dateFormat.pickerFormat(gardeDuration), ...rest }} onSubmit={this.handleSubmit} header="Modifier utilisateur:" />
    );
  }
}
const mapStateToProps = state => ({
  user: state.admin,
});
export default connect(mapStateToProps, { updateUser, getUserFromTable })(UserUpdateForm);
