import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Alert, Input, Media } from 'reactstrap';
import { connect } from 'react-redux';
import { getFullConversation, sendMessage } from '../../Actions/Users/Actions';
import Spinner from '../../Components/Spinner/Spinner';

class Conversation extends Component {
  state = {
    content: '',
    showContent: 8,
  }

  componentDidMount() {
    this.props.getFullConversation(this.props.match.params.id);
  }

  onChangeHandler = e => this.setState({ [e.target.name]: e.target.value });

  // load more messages
  loadMoreHandler = () => {
    const { messages } = this.props.users.conversation;
    this.setState(prevState => ({ showContent: prevState.showContent + 8 > messages.length ? messages.length : prevState.showContent + 8 }));
  }

  // send Message
  submitMessageHandler = (e) => {
    const data = {
      message: this.state.content,
    };
    if (e.key === 'Enter') {
      if (this.state.content.trim()) {
        this.props.sendMessage(this.props.match.params.id, data);
        this.setState({ content: '' });
      }
    }
  }

  render() {
    const { users: { conversation }, auth } = this.props;
    const { content } = this.state;

    if (!conversation) return <Spinner />;

    return (
      <Row>
        <Col lg={{ size: 9, offset: 1 }}>
          <Card>
            <CardBody>
              {!conversation.messages.length && (
              <Alert color="primary">{
             `Pas de conversation active entre vous.
              Commencez une conversation en envoyant un message ci-dessous.`}
              </Alert>
              )}
              {conversation.messages.length > 9 && this.state.showContent !== conversation.messages.length &&  (
              <Alert className="text-center" color="primary">
                <span onClick={this.loadMoreHandler} style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                  Plus de messages{' '}({conversation.messages.length - this.state.showContent})
                </span>
              </Alert>
              )}
              {conversation.messages.slice(-this.state.showContent).map(message => (
                <React.Fragment key={message._id}>
                  {message.sender._id === auth.user.id ? (
                    <Row>
                      <Col lg={{ size: 6, offset: 6 }}>
                        <Media>
                          <Media left>
                            <Media className="img-avatar" style={{ height: 35, width: 35, marginRight: 5 }} src={auth.user.profilePicture ? auth.user.profilePicture : '/static/images/no_image.webp'} alt={auth.user.fullName} />
                          </Media>
                          <Media body>
                            <Card style={{ backgroundColor: '#39A9E3', borderColor: '#39A9E3', color: 'white' }}>
                              <CardBody>{message.content}</CardBody>
                            </Card>
                          </Media>
                        </Media>
                      </Col>
                    </Row>
                  ) : (
                    <Row>
                      <Col lg={6}>
                        <Media>
                          <Media left>
                            <Media className="img-avatar" style={{ height: 35, width: 35, marginRight: 5 }} src={message.sender.profilePicture ? message.sender.profilePicture : '/static/images/no_image.webp'} alt={auth.user.fullName} />
                          </Media>
                          <Media body>
                            <Card style={{ backgroundColor: '#e2e2e2', borderColor: '#e2e2e2' }}>
                              <CardBody>{message.content}</CardBody>
                            </Card>
                          </Media>
                        </Media>
                      </Col>
                    </Row>
                  )

                }
                </React.Fragment>
              ))}
              <Input
                type="textarea"
                name="content"
                placeholder="message..."
                onChange={this.onChangeHandler}
                value={content}
                onKeyDown={this.submitMessageHandler}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  auth: state.auth,
});
export default connect(mapStateToProps, { getFullConversation, sendMessage })(Conversation);
