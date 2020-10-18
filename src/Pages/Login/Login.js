import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Row } from 'reactstrap';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { loginUser } from '../../Actions/AuthActions/Actions';
import Input from '../../Components/Input/FormInput/FormInput';
import ErrorAlert from '../../Components/Alerts/ErrorAlert/ErrorAlert';
import { validateInput, validateForm } from '../../Shared/FormValidation/FormValidation';
import { isAuthenticated } from '../../Services/authService';

const Schema = Yup.object().shape({
  login: Yup.string().required('Ce champ est obligatoire !'),
  password: Yup.string().required('Ce champ est obligatoire!'),
});

class Login extends Component {
  state= {
    user: {
      login: '',
      password: '',
    },
    errors: {},
  };

  componentDidMount() {
    if (isAuthenticated()) {
      this.props.history.push('/');
    }
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
      login: this.state.user.login,
      password: this.state.user.password,
    };
    this.props.loginUser(user, this.props.history);
  }


  render() {
    const { user: { login, password }, errors } = this.state;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <Card className="p-4">
                <CardBody>
                  {this.props.errors && <ErrorAlert> {this.props.errors} </ErrorAlert>}
                  <Form onSubmit={this.handleSubmit}>
                    <h2>Authentification</h2>
                    <p className="text-muted">Connectez-vous à votre compte !</p>
                    <Input
                      name="login"
                      value={login}
                      type="text"
                      icon="fa fa-user"
                      placeholder="Cin/Email..."
                      hasInputError={!(!errors.login)}
                      error={errors.login}
                      onchange={this.handleChange}
                    />
                    <Input
                      name="password"
                      value={password}
                      type="password"
                      icon="fa fa-lock"
                      placeholder="Mot de passe..."
                      hasInputError={!(!errors.password)}
                      error={errors.password}
                      onchange={this.handleChange}
                    />
                    <Row>
                      <Col xs="6">
                        <Button disabled={validateForm(this.state.user, Schema)} color="primary" className="px-4">{'S\'authentifier'}</Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" onClick={() => this.props.history.push('/reset')} className="px-0">Mot de passe oublié?</Button>
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

export default connect(mapStateToProps, { loginUser })(Login);
