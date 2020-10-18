/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { Input, ListGroup, ListGroupItem } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getConversation } from '../../Actions/Users/Actions';
import { getAnnuaire } from '../../Actions/Parm/Actions';

class Online extends Component {
  state = {
    search: '',
  }

  componentDidMount() {
    this.props.getAnnuaire();
  }

  // onChange handler
  onChangeHandler = e => this.setState({ [e.target.name]: e.target.value });

  // search user Handler
  searchUserHandler = data => data.filter(user => user.fullName.toLowerCase().includes(this.state.search.toLowerCase().trim()));

  render() {
    const { users: { onlineUsers }, auth, getConversation, history, annuaire, location } = this.props;
    const { search } = this.state;
    // get offline users
    const transformedArray = annuaire.map(value => ({ id: value._id, fullName: `${value.firstname} ${value.lastname}`, role: value.role, email: value.email }));
    const offlineUsers = _.differenceBy(transformedArray, onlineUsers, 'id').filter(offline => offline.id !== auth.user.id);

    const allUsers = [...onlineUsers, ...offlineUsers];
    // filtered Users
    let searchUsers = [...allUsers];
    if (search) {
      searchUsers = [...this.searchUserHandler(allUsers)];
    }
    if (location.pathname === '/contacts') {
      return (
        <ListGroup className="list-group-accent" tag="div">
          <ListGroupItem className="list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small">
            <Input
              placeholder="Rechercher..."
              name="search"
              value={search}
              onChange={this.onChangeHandler}
            />
          </ListGroupItem>
          { searchUsers.map(user => (
            <React.Fragment key={user.id}>
              {onlineUsers.some(online => online.id === user.id)
                ? (
                  <ListGroupItem onClick={() => getConversation({ participants: [auth.user.id, user.id] }, history)} action tag="a" style={{ cursor: 'pointer' }} className="list-group-item-accent-success list-group-item-divider">
                    <div className="avatar float-left">
                      <img className="img-avatar" src="/static/images/no_image.webp" alt={user.fullName} />
                    </div>
                    <div className="text-center"><strong>{user.fullName}</strong></div>
                    <div className="small text-muted text-center">
                      <span>{user.role}</span>
                    </div>
                  </ListGroupItem>
                )
                : (
                  <ListGroupItem onClick={() => getConversation({ participants: [auth.user.id, user.id] }, history)} action tag="a" style={{ cursor: 'pointer' }} className="list-group-item-accent-secondary list-group-item-divider">
                    <div className="avatar float-left">
                      <img className="img-avatar" src="/static/images/no_image.webp" alt={user.fullName} />
                    </div>
                    <div className="text-center"><strong>{user.fullName}</strong></div>
                    <div className="small text-muted text-center">
                      <span>{user.role}</span>
                    </div>
                  </ListGroupItem>
                )}
            </React.Fragment>
          )) }
        </ListGroup>
      );
    }
    return (
      <>
        <Scrollbars>
          <ListGroup className="list-group-accent" tag="div">
            <ListGroupItem className="list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small">
              <Input
                placeholder="Rechercher..."
                name="search"
                value={search}
                onChange={this.onChangeHandler}
              />
            </ListGroupItem>
            { searchUsers.map(user => (
              <React.Fragment key={user.id}>
                {onlineUsers.some(online => online.id === user.id)
                  ? (
                    <ListGroupItem onClick={() => getConversation({ participants: [auth.user.id, user.id] }, history)} action tag="a" style={{ cursor: 'pointer' }} className="list-group-item-accent-success list-group-item-divider">
                      <div className="avatar float-left">
                        <img className="img-avatar" src="/static/images/no_image.webp" alt={user.fullName} />
                      </div>
                      <div className="text-center"><strong>{user.fullName}</strong></div>
                      <div className="small text-muted text-center">
                        <span>{user.role}</span>
                      </div>
                    </ListGroupItem>
                  )
                  : (
                    <ListGroupItem onClick={() => getConversation({ participants: [auth.user.id, user.id] }, history)} action tag="a" style={{ cursor: 'pointer' }} className="list-group-item-accent-secondary list-group-item-divider">
                      <div className="avatar float-left">
                        <img className="img-avatar" src="/static/images/no_image.webp" alt={user.fullName} />
                      </div>
                      <div className="text-center"><strong>{user.fullName}</strong></div>
                      <div className="small text-muted text-center">
                        <span>{user.role}</span>
                      </div>
                    </ListGroupItem>
                  )}
              </React.Fragment>
            )) }
          </ListGroup>
        </Scrollbars>
      </>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  auth: state.auth,
  annuaire: state.parm.annuaire,
});

export default connect(mapStateToProps, { getConversation, getAnnuaire })(withRouter(Online));
