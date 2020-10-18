import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import Modal from '../../../Components/Modal/Modal';
import { deleteUser, getUserFromTable } from '../../../Actions/Admin/Actions';

class UserDelete extends Component {
  componentDidMount() {
    this.props.getUserFromTable(this.props.match.params.id);
  }

  renderAction = () => {
    const { id } = this.props.match.params;
    const { history } = this.props;
    return (
      <React.Fragment>
        <Button color="danger" onClick={() => this.props.deleteUser(id, history)}>Supprimer</Button>{' '}
        <Button color="secondary" onClick={() => history.push('/admin/users')}>Annuler</Button>
      </React.Fragment>
    );
  }

  onDismissHandler = () => this.props.history.push('/admin/users')

  renderContent = () => (
    <React.Fragment>
      <strong>Êtes-vous sûr de vouloir supprimer cet utilisateur?</strong>
      <br />
      <strong>Cette action est irréversible.</strong>
    </React.Fragment>
  );

  render() {
    return (
      <Modal header="Supprimer utilisateur: " toggle={this.onDismissHandler} actions={this.renderAction} content={this.renderContent} />
    );
  }
}
const mapStateToProps = state => ({
  user: state.admin.user,
});
export default connect(mapStateToProps, { deleteUser, getUserFromTable })(UserDelete);
