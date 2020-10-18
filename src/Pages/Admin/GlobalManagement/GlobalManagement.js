/* eslint-disable camelcase */
import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { connect } from 'react-redux';
import classnames from 'classnames';
import SWA from 'react-bootstrap-sweetalert';
import CustomCard from '../../../Components/Card/Card';
import Input from '../../../Components/Input/CommonInput/CommonInput';
import Spinner from '../../../Components/Spinner/Spinner';
import { addTypologie, addTypologieSP, addMotif, getAllMotifs, getAllTypologies, getAllTypologiesSP, deleteTypologie, deleteTypologieSP, deleteMotif, updateMotif, updateTypologie, updateTypologieSP } from '../../../Actions/Admin/Actions';

class GlobalManagement extends Component {
  state = {
    activeTab: '1',
    typologie: '',
    typologie_sp: '',
    motif: '',
    alert: null,
    isEditing: false,
    editID: null,
  };

  componentDidMount() {
    this.props.getAllTypologies();
  }

  // handle input change
  inputChangeHandler = e => this.setState({ [e.target.name]: e.target.value });

  // add Typologie handler
  addTypologieHandler = () => {
    if (this.state.typologie.trim()) {
      this.props.addTypologie({ typologie: this.state.typologie.trim() });
      this.setState({ typologie: '' });
    }
  }

  // add Typologie spécifique handler
  addTypologieSpHandler = () => {
    if (this.state.typologie_sp.trim()) {
      this.props.addTypologieSP({ typologie_sp: this.state.typologie_sp.trim() });
      this.setState({ typologie_sp: '' });
    }
  }

    // add Motif handler
    addMotifHandler = () => {
      if (this.state.motif.trim()) {
        this.props.addMotif({ motif: this.state.motif.trim() });
        this.setState({ motif: '' });
      }
    }

    // handle update toggle
    updateToggleHandler = id => this.setState({ isEditing: true, editID: id });

    // handle update
    updateManagementData = (id, label, type) => {
      const newData = { data: this.state[type] || label };
      switch (type) {
        case 'typologie':
          this.props.updateTypologie(id, newData);
          break;
        case 'typologie_sp':
          this.props.updateTypologieSP(id, newData);
          break;
        case 'motif':
          this.props.updateMotif(id, newData);
          break;
        default: break;
      }
      this.setState({ isEditing: false, typologie: '', typologie_sp: '', motif: '' });
    };

    // handle delete toggle
    handleDeleteToggle = (id, type) => {
      this.setState({
        alert: (
          <SWA
            warning
            style={{ marginTop: '-100px' }}
            title="Êtes-vous sûr ?"
            onConfirm={() => this.deleteDataHandler(id, type)}
            onCancel={() => this.setState({
              alert: false,
            })}
            confirmBtnCssClass="btn-danger"
            cancelBtnBsStyle="link"
            confirmBtnText="Supprimer"
            cancelBtnText="Annuler"
            showCancel
            btnSize=""
          >
            {'Cette action est irréversible!'}
          </SWA>
        ),
      });
    }

    // delete Data handler
    deleteDataHandler = (id, type) => {
      switch (type) {
        case 'Typologie':
          this.props.deleteTypologie(id);
          break;
        case 'TypologieSP':
          this.props.deleteTypologieSP(id);
          break;
        case 'Motif':
          this.props.deleteMotif(id);
          break;
        default: break;
      }
      this.setState({
        alert: (
          <SWA
            success
            style={{ display: 'block', marginTop: '-100px' }}
            title="Succès!"
            onConfirm={() => this.setState({ alert: null })}
            onCancel={() => this.setState({ alert: null })}
            confirmBtnBsStyle="primary"
            confirmBtnText="Ok"
            btnSize=""
          />
        ),
      });
    }

    toggle(tab) {
      if (this.state.activeTab !== tab) {
        this.setState({
          activeTab: tab,
        });
        switch (tab) {
          case '2':
            if (!this.props.typologies_sp) {
              this.props.getAllTypologiesSP();
            }
            break;
          case '3':
            if (!this.props.motifs) {
              this.props.getAllMotifs();
            }
            break;
          default: break;
        }
      }
    }

    render() {
      const { typologie, typologie_sp, motif, isEditing, editID, alert } = this.state;
      const { typologies, typologies_sp, motifs } = this.props;
      return (
        <>
          <Row>
            <Col xs={7}>
              {alert}
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={12} lg={{ size: 8, offset: 2 }} xl={{ size: 8, offset: 2 }} xxl={{ size: 8, offset: 2 }}>
              <CustomCard header="Gestion globale: ">
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '1' })}
                      onClick={() => this.toggle('1')}
                    >
                Typologies
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '2' })}
                      onClick={() => this.toggle('2')}
                    >
                Typologies Spécifiques
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '3' })}
                      onClick={() => this.toggle('3')}
                    >
                Motifs
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    {!typologies
                      ? <Spinner />
                      : (
                        <ListGroup>
                          {typologies.map(typ => (
                            <ListGroupItem key={typ._id}>
                              <Row>
                                <Col style={{ marginBottom: 10 }} xs={12} lg={10}>
                                  {isEditing && editID === typ._id
                                    ? <Input name="typologie" onChange={this.inputChangeHandler} defaultValue={typ.label} />
                                    : typ.label}
                                </Col>
                                <Col xs={2} lg={1}>
                                  {isEditing && editID === typ._id
                                    ? <Button onClick={() => this.updateManagementData(typ._id, typ.label, 'typologie')} color="success"><i className="fa fa-check" /></Button>
                                    : <Button onClick={() => this.updateToggleHandler(typ._id)} color="primary"><i className="fa fa-pencil" /></Button>}
                                </Col>
                                <Col xs={2} lg={1}>
                                  <Button disabled={isEditing && editID === typ._id} onClick={() => this.handleDeleteToggle(typ._id, 'Typologie')} color="danger"><i className="fa fa-trash" /></Button>
                                </Col>
                              </Row>
                            </ListGroupItem>
                          ))}
                        </ListGroup>
                      )
                    }
                    {isEditing ? null : (
                      <Row>
                        <Col lg="10">
                          <Input
                            onChange={this.inputChangeHandler}
                            value={typologie}
                            name="typologie"
                            label=" "
                            placeholder="Nouvelle typologie...."
                          />
                        </Col>
                        <Col lg="2">
                          <Button onClick={this.addTypologieHandler} style={{ marginTop: 20 }} color="primary">Ajouter</Button>
                        </Col>
                      </Row>
                    )}
                  </TabPane>
                  <TabPane tabId="2">
                    {!typologies_sp
                      ? <Spinner />
                      : (
                        <ListGroup>
                          {typologies_sp.map(typ => (
                            <ListGroupItem key={typ._id}>
                              <Row>
                                <Col style={{ marginBottom: 10 }} xs={12} lg={10}>
                                  {isEditing && editID === typ._id
                                    ? <Input name="typologie_sp" onChange={this.inputChangeHandler} defaultValue={typ.label} />
                                    : typ.label}
                                </Col>
                                <Col xs={2} lg={1}>
                                  {isEditing && editID === typ._id
                                    ? <Button onClick={() => this.updateManagementData(typ._id, typ.label, 'typologie_sp')} color="success"><i className="fa fa-check" /></Button>
                                    : <Button onClick={() => this.updateToggleHandler(typ._id)} color="primary"><i className="fa fa-pencil" /></Button>}
                                </Col>
                                <Col xs={2} lg={1}>
                                  <Button disabled={isEditing && editID === typ._id} onClick={() => this.handleDeleteToggle(typ._id, 'TypologieSP')} color="danger"><i className="fa fa-trash" /></Button>
                                </Col>
                              </Row>
                            </ListGroupItem>
                          ))}
                        </ListGroup>
                      )
                    }
                    {isEditing ? null : (
                      <Row>
                        <Col lg="10">
                          <Input
                            onChange={this.inputChangeHandler}
                            value={typologie_sp}
                            name="typologie_sp"
                            label=" "
                            placeholder="Nouvelle typologie spécifique...."
                          />
                        </Col>
                        <Col lg="2">
                          <Button onClick={this.addTypologieSpHandler} style={{ marginTop: 20 }} color="primary">Ajouter</Button>
                        </Col>
                      </Row>
                    )}
                  </TabPane>
                  <TabPane tabId="3">
                    {!motifs
                      ? <Spinner />
                      : (
                        <ListGroup>
                          {motifs.map(mot => (
                            <ListGroupItem key={mot._id}>
                              <Row>
                                <Col style={{ marginBottom: 10 }} xs={12} lg={10}>
                                  {isEditing && editID === mot._id
                                    ? <Input name="motif" onChange={this.inputChangeHandler} defaultValue={mot.label} />
                                    : mot.label}
                                </Col>
                                <Col xs={2} lg={1}>
                                  {isEditing && editID === mot._id
                                    ? <Button onClick={() => this.updateManagementData(mot._id, mot.label, 'motif')} color="success"><i className="fa fa-check" /></Button>
                                    : <Button onClick={() => this.updateToggleHandler(mot._id)} color="primary"><i className="fa fa-pencil" /></Button>}
                                </Col>
                                <Col xs={2} lg={1}>
                                  <Button disabled={isEditing && editID === mot._id} onClick={() => this.handleDeleteToggle(mot._id, 'Motif')} color="danger"><i className="fa fa-trash" /></Button>
                                </Col>
                              </Row>
                            </ListGroupItem>
                          ))}
                        </ListGroup>
                      )
                    }
                    {isEditing ? null : (
                      <Row>
                        <Col lg="10">
                          <Input
                            onChange={this.inputChangeHandler}
                            value={motif}
                            name="motif"
                            label=" "
                            placeholder="Nouveau motif...."
                          />
                        </Col>
                        <Col lg="2">
                          <Button onClick={this.addMotifHandler} style={{ marginTop: 20 }} color="primary">Ajouter</Button>
                        </Col>
                      </Row>
                    )}
                  </TabPane>
                </TabContent>
              </CustomCard>
            </Col>
          </Row>
        </>
      );
    }
}

const mapStateToProps = state => ({
  typologies: state.admin.typologies,
  typologies_sp: state.admin.typologies_sp,
  motifs: state.admin.motifs,
});
export default connect(mapStateToProps, { addTypologie, addMotif, addTypologieSP, getAllMotifs, getAllTypologies, getAllTypologiesSP, deleteTypologie, deleteTypologieSP, deleteMotif, updateMotif, updateTypologie, updateTypologieSP })(GlobalManagement);
