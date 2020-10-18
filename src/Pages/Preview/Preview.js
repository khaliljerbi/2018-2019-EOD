import React, { Component } from 'react';
import { Button, Card, CardImg } from 'reactstrap';
import Modal from '../../Components/Modal/Modal';

class Preview extends Component {
  renderContent = image => (
    <Card>
      <CardImg width="100%" src={image} />
    </Card>
  );

  renderActions = route => (<Button color="primary" onClick={() => this.props.history.push(route)}>OK</Button>);

  onDismissHandler = route => this.props.history.push(route);

  render() {
    console.log(this.props);
    const { image, route } = this.props.location.state;
    if (!image || !route) {
      this.props.history.push(route);
    }
    return (
      <Modal size="xl" toggle={() => this.onDismissHandler(route)} actions={() => this.renderActions(route)} content={() => this.renderContent(image)} />
    );
  }
}

export default Preview;
