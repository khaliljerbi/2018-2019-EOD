import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Row } from 'reactstrap';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { resetPassword } from '../../Actions/AuthActions/Actions';
import Input from '../../Components/Input/FormInput/FormInput';
import ErrorAlert from '../../Components/Alerts/ErrorAlert/ErrorAlert';
import { validateInput, validateForm } from '../../Shared/FormValidation/FormValidation';

const Schema = Yup.object().shape({
  email: Yup.string().email('Ceci n\'est pas un email valide.').required('Ce champ est obligatoire !'),
});

class ResetPassword extends Component {
  state= {
    user: {
      email: '',
    },
    errors: {},
  };

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
      email: this.state.user.email,
    };

    this.props.resetPassword(user, this.props.history);

    this.setState({
      user: {
        email: '',
      },
    });
  }


  render() {
    const { user: { email }, errors } = this.state;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <Card className="p-4">
                <CardBody>
                  {this.props.errors && <ErrorAlert> {this.props.errors} </ErrorAlert>}
                  <Form onSubmit={this.handleSubmit}>
                    <h2>Réinitialisation de mot de passe:</h2>
                    <p className="text-muted">{'Notez que l\'envoi de l\'email peut prendre quelques minutes!'} </p>
                    <Input
                      name="email"
                      value={email}
                      type="text"
                      icon="fa fa-user"
                      placeholder="Email..."
                      hasInputError={!(!errors.email)}
                      error={errors.email}
                      onchange={this.handleChange}
                    />
                    <Row>
                      <Col xs="6">
                        <Button disabled={validateForm(this.state.user, Schema)} color="primary" className="px-4">Envoyer</Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" onClick={() => this.props.history.push('/login')} className="px-0">Vous avez déjà un compte ?</Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.auth.error,
});

export default connect(mapStateToProps, { resetPassword })(ResetPassword);
