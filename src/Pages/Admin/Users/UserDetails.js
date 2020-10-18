import React from 'react';
import { Form } from 'reactstrap';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { getUserFromTable } from '../../../Actions/Admin/Actions';
import { changeProfilePicture } from '../../../Actions/Users/Actions';
import Spinner from '../../../Components/Spinner/Spinner';
import UserDetailsPerso from './UserDetailsPerso';
import Modal from '../../../Components/Modal/SamePageModal/SamePageModal';
import CropImage from '../../../Components/CropImage/CropImage';


class UserDetails extends React.Component {
  state = {
    isOpen: false,
  }

  componentDidMount() {
    this.props.getUserFromTable(this.props.match.params.id);
  }

  // toggle modal
  toggle = () => this.setState(prevState => ({ isOpen: !prevState.isOpen }));

  // onChange handler
  onChangeHandler = e => this.setState({ [e.target.name]: e.target.value });

  // submitting the form
  onSubmitHandler = ({ image }) => {
    const formData = new FormData();
    formData.append('image', image);

    this.props.changeProfilePicture(formData, this.props.auth.id);
  }

  render() {
    const { user: { loading, user }, auth } = this.props;
    const { isOpen } = this.state;
    const details = loading || !user ? <Spinner /> : (
      <React.Fragment>
        <UserDetailsPerso handlePhotoChange={this.toggle} user={user} auth={auth.id} givenId={this.props.match.params.id} />
      </React.Fragment>
    );
    return (
      <React.Fragment>
        {user && (
        <Modal isOpen={isOpen} action={this.props.handleSubmit(this.onSubmitHandler)} toggle={this.toggle} confirmLabel="Sauvegarder" title="Photo de profile: " cancelLabel="Annuler">
          <Form>
            <Field
              name="image"
              component={CropImage}
            />
          </Form>
        </Modal>
        )}
        { details }
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.admin,
  auth: state.auth.user,
});
export default connect(mapStateToProps, { getUserFromTable, changeProfilePicture })(reduxForm({
  form: 'profile',
})(UserDetails));
