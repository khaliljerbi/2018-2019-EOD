import React, { Component } from 'react';
import { Button, Form, Input } from 'reactstrap';
import { connect } from 'react-redux';
import Modal from '../../../Components/Modal/Modal';
import Label from '../../../Components/Label/Label';
import { sendMail } from '../../../Actions/Parm/Actions';

// need fix for navigation
class Email extends Component {
  state = {
    to: this.props.history.location.state.email,
    subject: '',
    text: '',
  }

  renderAction = () => {
    const { history } = this.props;
    const data = {
      to: this.state.to,
      subject: this.state.subject,
      text: this.state.text,
    };
    return (
      <React.Fragment>
        <Button color="danger" onClick={() => this.props.sendMail(data, history)}>Envoyer</Button>{' '}
        <Button color="secondary" onClick={() => this.onDismissHandler()}>Annuler</Button>
      </React.Fragment>
    );
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onDismissHandler = () => this.props.history.push('/parm/annuaire')

  renderContent = () => {
    const { to, subject, text } = this.state;
    return (
      <Form>
        <Label>A:</Label>
        <Input type="text" name="to" value={to} label="A: " onChange={this.onChange} />
        <Label>Objet:</Label>
        <Input type="text" name="subject" value={subject} label="Objet" onChange={this.onChange} />
        <Label>Message:</Label>
        <Input type="textarea" name="text" value={text} label="text" onChange={this.onChange} />
      </Form>
    );
  };

  render() {
    return (
      <Modal header="Email: " toggle={this.onDismissHandler} actions={this.renderAction} content={this.renderContent} />
    );
  }
}

export default connect(null, { sendMail })(Email);
