import React, { Component } from 'react';
import { Button, Col, Form, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Yup from 'yup';
import Input from '../../../Components/Input/FormInput/FormInput';
import ErrorAlert from '../../../Components/Alerts/ErrorAlert/ErrorAlert';
import { updatePasswordById } from '../../../Actions/AuthActions/Actions';
import { validateInput, validateForm } from '../../../Shared/FormValidation/FormValidation';


const Schema = Yup.object().shape({
  password: Yup.string().required('Ce champ est obligatoire !'),
  confirmation: Yup.string()
    .required('Ce champ est obligatoire !')
    .oneOf([Yup.ref('password')], 'Les deux mots de passe doivent correspondre.'),
});

class ChangePassword extends Component {
  state= {
    user: {
      password: '',
      confirmation: '',
    },
    errors: {},
  };

  componentDidMount() {
    // later
  }

  handleChange = async ({ target: { name, value } }) => {
    const errors = { ...this.state.errors };
    // Getting each input error
    const errorMessage = await validateInput(name, value, Schema);
    if (errorMessage) errors[name] = errorMessage.message;
    else delete errors[name];

    const user = { ...this.state.user };
    user[name] = value;
    this.setState({ user, errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      password: this.state.user.password,
    };
    // update password
    this.props.updatePasswordById(this.props.match.params.id, user);

    this.setState({
      user: {
        password: '',
        confirmation: '',
      },
    });
  }


  render() {
    const { user: { password, confirmation }, errors } = this.state;
    return (
      <>
        {this.props.errors && <ErrorAlert> {this.props.errors} </ErrorAlert>}
        <Form onSubmit={this.handleSubmit}>
          <h2>Changer votre mot de passe</h2>
          <p className="text-muted">{'Tapez votre nouveau mot de passe: '} </p>
          <Input
            name="password"
            value={password}
            type="password"
            icon="fa fa-lock"
            placeholder="Nouveau mot de passe..."
            hasInputError={!(!errors.password)}
            error={errors.password}
            onchange={this.handleChange}
          />
          <Input
            name="confirmation"
            value={confirmation}
            type="password"
            icon="fa fa-lock"
            placeholder="Retapez votre mot de passe..."
            hasInputError={!(!errors.confirmation)}
            error={errors.confirmation}
            onchange={this.handleChange}
          />
          <Row>
            <Col xs="6">
              <Button disabled={validateForm(this.state.user, Schema)} color="primary" className="px-4">Envoyer</Button>
            </Col>
          </Row>
        </Form>
      </>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.auth.error,
});

export default connect(mapStateToProps, { updatePasswordById })(withRouter(ChangePassword));
