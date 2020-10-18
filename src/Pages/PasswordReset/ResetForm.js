import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import * as Yup from 'yup';
import { checkResetToken, updatePassword } from '../../Actions/AuthActions/Actions';
import Input from '../../Components/Input/FormInput/FormInput';
import ErrorAlert from '../../Components/Alerts/ErrorAlert/ErrorAlert';
import { validateInput, validateForm } from '../../Shared/FormValidation/FormValidation';

const Schema = Yup.object().shape({
  password: Yup.string().required('Ce champ est obligatoire !'),
  confirmation: Yup.string()
    .required('Ce champ est obligatoire !')
    .oneOf([Yup.ref('password')], 'Les deux mots de passe doivent correspondre.'),
});

class ResetForm extends Component {
  state= {
    user: {
      password: '',
      confirmation: '',
    },
    errors: {},
  };

  componentDidMount() {
    this.props.checkResetToken(this.props.match.params.token);
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
    this.props.updatePassword(this.props.match.params.token, user);

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
        <ToastContainer />
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="8">
                <Card className="p-4">
                  <CardBody>
                    {this.props.errors && <ErrorAlert> {this.props.errors} </ErrorAlert>}
                    <Form onSubmit={this.handleSubmit}>
                      <h2>Réinitialisation de mot de passe:</h2>
                      <p className="text-muted">{'Tapez votre nouveau mot de passe'} </p>
                      <Input
                        name="password"
                        value={password}
                        type="password"
                        icon="fa fa-lock"
                        hasInputError={!(!errors.password)}
                        error={errors.password}
                        onchange={this.handleChange}
                      />
                      <Input
                        name="confirmation"
                        value={confirmation}
                        type="password"
                        icon="fa fa-lock"
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
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.auth.error,
});

export default connect(mapStateToProps, { checkResetToken, updatePassword })(ResetForm);
