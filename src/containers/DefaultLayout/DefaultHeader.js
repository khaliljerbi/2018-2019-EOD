/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler, AppAsideToggler } from '@coreui/react';
import { getPendingFiches, waitingForFiches, waitingForFicheConfirmation } from '../../Actions/Med_Reg/Actions';
import { getConnectedUsers, getAllConversations } from '../../Actions/Users/Actions';
import { getPendingAffectation } from '../../Actions/Parm/Actions';
import { agoFormat } from '../../Shared/DateFormat/DateFormat';
import { iconSize } from '../../Shared/Variables/Variables';
import IO from '../../Services/socketService';

const defaultProps = {};

class DefaultHeader extends Component {
  componentDidMount() {
    // get online Users
    this.props.getConnectedUsers(this.props.user.id);
    // get messages
    this.props.getAllConversations(this.props.user.id);
    // notice server a user is connected
    // once the server receive the id, it will put the user in a room with the given ID
    IO.getSocket().emit('userConnected', this.props.user);
    if (this.props.user.role === 'Médecin Régulateur') {
      // notifications
      this.props.waitingForFiches();
      // les fiches en attente
      this.props.getPendingFiches(this.props.user.id);
    }
    if (this.props.user.role === 'Permanencier') {
      // les fiches en attente d'affectation
      this.props.getPendingAffectation(this.props.user.id);
      // notifications parm
      this.props.waitingForFicheConfirmation();
    }

    window.addEventListener('beforeunload', this.onUserDisconnectHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onUserDisconnectHandler);
  }

  // event to disconnect user
  onUserDisconnectHandler = () => IO.getSocket().emit('userDisconnected');

  render() {
    const { user, fiches: { loading, pending, affectation }, online: { totalCount }, conversations: { userConversations } } = this.props;
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          className="d-md-down-none"
          full={{ src: '/static/images/logo1.webp', width: 80, height: 52, alt: 'Samu 03' }}
          style={{ cursor: 'pointer' }}
          onClick={() => this.props.history.push('/')}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="ml-auto" navbar>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img style={{ width: 35, height: 35 }} src={user.profilePicture ? user.profilePicture : '/static/images/no_image.webp'} className="img-avatar" alt={user.fullName} />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem onClick={() => this.props.history.push('/contacts')}><i className="fa fa-address-book-o" /> Contacts</DropdownItem>
              <DropdownItem header tag="div"><strong>Compte</strong></DropdownItem>
              {/* <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem> */}
              <DropdownItem onClick={() => this.props.history.push(`/profile/${user.id}`)}><i className="fa fa-cogs" /> Profile</DropdownItem>
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock" />Se déconnecter</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
          <AppHeaderDropdown>
            <DropdownToggle nav>
              <i className="fa fa-comment-o" style={{ fontSize: iconSize }} /><Badge pill color="danger">{userConversations.filter(conv => conv.messages.length && !conv.messages.slice(-1).pop().read).length}</Badge>
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem header tag="div" className="text-center"><strong>Conversations récentes.</strong></DropdownItem>
              {userConversations.filter(conv => conv.messages.length).map(conversation => (
                <DropdownItem
                  key={conversation._id}
                  style={{ width: 350 }}
                  onClick={() => {
                    window.location = `/conversation/${conversation._id}`;
                  }}
                >
                  <div className="message">
                    <div className="pt-3 mr-3 float-left">
                      <div className="avatar">
                        <img src="/static/images/logo1.webp" className="img-avatar" alt="" />
                      </div>
                    </div>
                    <div>
                      <small className="text-muted">{`${conversation.messages.slice(-1).pop().sender.firstname} ${conversation.messages.slice(-1).pop().sender.lastname}`}</small>
                      <small className="text-muted float-right mt-1">{agoFormat(conversation.messages.slice(-1).pop().sentAt)}</small>
                    </div>
                    <div className=" small text-muted text-truncate">
                      {conversation.messages.slice(-1).pop().content}
                    </div>
                  </div>
                </DropdownItem>
              ))}
              {pending.length > 5 && <DropdownItem className="text-center"><strong>Voir toutes les fiches.</strong></DropdownItem>}
            </DropdownMenu>
          </AppHeaderDropdown>
          { user.role === 'Médecin Régulateur' && (
          <AppHeaderDropdown style={{ marginRight: 10 }}>
            <DropdownToggle nav>
              <i className="fa fa-bell-o" style={{ fontSize: iconSize }} />{loading || pending.length === 0 ? null : <Badge pill color="danger">{pending.length}</Badge>}
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem header tag="div" className="text-center"><strong>{`${pending.length} nouvelle(s) fiche(s).`}</strong></DropdownItem>
              {pending.slice(0, 5).map(fiche => (
                <DropdownItem key={fiche._id} style={{ width: 350 }} onClick={() => this.props.history.push(`/fiche_reg/transfered/${fiche._id}`)}>
                  <div className="message">
                    <div className="pt-3 mr-3 float-left">
                      <div className="avatar">
                        <img src="/static/images/logo1.webp" className="img-avatar" alt="" />
                      </div>
                    </div>
                    <div>
                      <small className="text-muted">{`${fiche.parm.firstname} ${fiche.parm.lastname}`}</small>
                      <small className="text-muted float-right mt-1">{agoFormat(fiche.createdAt)}</small>
                    </div>
                    <div className=" small text-muted text-truncate">
                        vous a assigné une nouvelle fiche de régulation.
                    </div>
                  </div>
                </DropdownItem>
              ))}
              {pending.length > 5 && <DropdownItem className="text-center"><strong>Voir toutes les fiches.</strong></DropdownItem>}
            </DropdownMenu>
          </AppHeaderDropdown>
          ) }
          {/* { user.role === 'Chef Service' && (
          <AppHeaderDropdown>
            <DropdownToggle nav>
              <i className="fa fa-bell-o" style={{ fontSize: iconSize }} /><Badge pill color="danger">5</Badge>
            </DropdownToggle>
          </AppHeaderDropdown>
          ) } */}
          { user.role === 'Permanencier' && (
          <AppHeaderDropdown>
            <DropdownToggle nav>
              <i className="fa fa-bell-o" style={{ fontSize: iconSize }} />{loading || pending.length === 0 ? null : <Badge pill color="danger">{affectation.length}</Badge>}
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem header tag="div" className="text-center"><strong>{`${affectation.length} nouvelle(s) fiche(s).`}</strong></DropdownItem>
              {affectation.slice(0, 5).map(fiche => (
                <DropdownItem key={fiche._id} style={{ width: 350 }} onClick={() => this.props.history.push(`/fiche_reg/affectation/${fiche._id}`)}>
                  <div className="message">
                    <div className="pt-3 mr-3 float-left">
                      <div className="avatar">
                        <img src="/static/images/logo1.webp" className="img-avatar" alt="" />
                      </div>
                    </div>
                    <div>
                      <small className="text-muted">{`${fiche.medecin.firstname} ${fiche.medecin.lastname}`}</small>
                      <small className="text-muted float-right mt-1">{agoFormat(fiche.createdAt)}</small>
                    </div>
                    <div className=" small text-muted text-truncate">
                      {'a besoin qu\'on affecte un SMUR à une fiche.'}
                    </div>
                  </div>
                </DropdownItem>
              ))}
              {affectation.length > 5 && <DropdownItem className="text-center"><strong>Voir toutes les affectations.</strong></DropdownItem>}
            </DropdownMenu>
          </AppHeaderDropdown>
          ) }
        </Nav>
        <AppAsideToggler className="d-md-down-none">
          <>
            <i className="fa fa-users" style={{ fontSize: iconSize }} />
            <Badge pill color="success">{totalCount}</Badge>
          </>
        </AppAsideToggler>
      </React.Fragment>
    );
  }
}

DefaultHeader.defaultProps = defaultProps;

const mapStateToProps = state => ({
  user: state.auth.user,
  fiches: state.ficheReg,
  conversations: state.users,
  online: state.users,
});

export default connect(mapStateToProps, {
  getPendingFiches,
  waitingForFiches,
  waitingForFicheConfirmation,
  getPendingAffectation,
  getConnectedUsers,
  getAllConversations,
})(withRouter(DefaultHeader));
