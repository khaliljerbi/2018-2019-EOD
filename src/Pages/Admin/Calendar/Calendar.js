/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/no-string-refs */
import React from 'react';
import classnames from 'classnames';
// JavaScript library that creates a callendar with events
import { Calendar } from '@fullcalendar/core';
import frLocale from '@fullcalendar/core/locales/fr';
import dayGridPlugin from '@fullcalendar/daygrid';
import interaction from '@fullcalendar/interaction';
// react component used to create sweet alerts
import ReactBSAlert from 'react-bootstrap-sweetalert';
// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Modal,
  Row,
  Col,
} from 'reactstrap';

class Fullcalendar extends React.Component {
  state = {
    events: [],
    alert: null,
  };

  componentDidMount() {
    this.createCalendar();
  }

  createCalendar = () => {
    this.calendar = new Calendar(this.calendarContainer, {
      plugins: [interaction, dayGridPlugin],
      defaultView: 'dayGridMonth',
      allDayDefault: false,
      datesRender: el => this.setState({ currentDate: `${el.view.title.charAt(0).toUpperCase()}${el.view.title.slice(1)}` }),
      selectable: true,
      selectHelper: true,
      editable: true,
      locale: frLocale,
      displayEventTime: true,
      events: this.state.events,
      // Add new event
      select: (info) => {
        this.setState({
          modalAdd: true,
          startDate: info.startStr,
          endDate: info.endStr,
          radios: 'bg-info',
        });
      },
      // Edit calendar event action
      eventClick: ({ event }) => {
        this.setState({
          modalChange: true,
          eventId: event.id,
          eventTitle: event.title,
          eventDescription: event.extendedProps.description,
          radios: 'bg-info',
          event,
        });
      },
    });
    this.calendar.render();
  };

  changeView = (newView) => {
    this.calendar.changeView(newView);
  };

  addNewEvent = () => {
    const newEvents = this.state.events;
    newEvents.push({
      title: this.state.eventTitle,
      start: this.state.startDate,
      end: this.state.endDate,
      className: this.state.radios,
      id: this.state.events[this.state.events.length] + 1,
    });
    this.calendar.addEvent({
      title: this.state.eventTitle,
      start: this.state.startDate,
      end: this.state.endDate,
      className: this.state.radios,
      id: this.state.events[this.state.events.length] + 1,
    });
    this.setState({
      modalAdd: false,
      events: newEvents,
      startDate: undefined,
      endDate: undefined,
      radios: 'bg-info',
      eventTitle: undefined,
    });
  };

  changeEvent = () => {
    const newEvents = this.state.events.map((prop) => {
      console.log(prop);
      if (`${prop.id}` === `${this.state.eventId}`) {
        this.state.event.remove();
        this.calendar.addEvent({
          ...prop,
          title: this.state.eventTitle,
          className: this.state.radios,
          description: this.state.eventDescription,
        });
        return {
          ...prop,
          title: this.state.eventTitle,
          className: this.state.radios,
          description: this.state.eventDescription,
        };
      }
      return prop;
    });
    this.setState({
      modalChange: false,
      events: newEvents,
      radios: 'bg-info',
      eventTitle: undefined,
      eventDescription: undefined,
      eventId: undefined,
      event: undefined,
    });
  };

  deleteEventSweetAlert = () => {
    this.setState({
      alert: (
        <ReactBSAlert
          warning
          style={{ display: 'block', marginTop: '-100px' }}
          title="Êtes-vous sûr ?"
          onConfirm={() => this.setState({
            alert: false,
            radios: 'bg-info',
            eventTitle: undefined,
            eventDescription: undefined,
            eventId: undefined,
          })
          }
          onCancel={() => this.deleteEvent()}
          confirmBtnCssClass="btn-secondary"
          cancelBtnBsStyle="danger"
          confirmBtnText="Annuler"
          cancelBtnText="Supprimer"
          showCancel
          btnSize=""
        >
          {'Cette action est irréversible!'}
        </ReactBSAlert>
      ),
    });
  };

  deleteEvent = () => {
    const newEvents = this.state.events.filter(
      prop => `${prop.id}` !== this.state.eventId,
    );
    this.state.event.remove();
    this.setState({
      alert: (
        <ReactBSAlert
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
      modalChange: false,
      events: newEvents,
      radios: 'bg-info',
      eventTitle: undefined,
      eventDescription: undefined,
      eventId: undefined,
      event: undefined,
    });
  };

  render() {
    return (
      <>
        {this.state.alert}
        <Card className="card-calendar">
          <CardHeader className="bg-info">
            <Row className="align-items-center py-4">
              <Col lg="6">
                <h6 className="fullcalendar-title h2 text-white d-inline-block mb-0 mr-1">
                  {this.state.currentDate}
                </h6>
              </Col>
              <Col style={{ padding: 5 }} className="mt-3 mt-lg-0 text-lg-right" lg="6">
                <Button
                  style={{ backgroundColor: '#fff' }}
                  className="fullcalendar-btn-prev btn-neutral"
                  onClick={() => {
                    this.calendar.prev();
                  }}
                  size="sm"
                >
                  <i className="fa fa-angle-left" />
                </Button>
                {' '}
                <Button
                  style={{ backgroundColor: '#fff' }}
                  className="fullcalendar-btn-next btn-neutral"
                  onClick={() => {
                    this.calendar.next();
                  }}
                  size="sm"
                >
                  <i className="fa fa-angle-right" />
                </Button>
                {' '}
                <Button
                  style={{ backgroundColor: '#fff' }}
                  className="btn-neutral"
                  data-calendar-view="month"
                  onClick={() => this.changeView('dayGridMonth')}
                  size="sm"
                >
                  Mois
                </Button>
                {' '}
                <Button
                  className="btn-neutral"
                  style={{ backgroundColor: '#fff' }}
                  data-calendar-view="basicWeek"
                  onClick={() => this.changeView('dayGridWeek')}
                  size="sm"
                >
                  Semaine
                </Button>
                {' '}
                <Button
                  style={{ backgroundColor: '#fff' }}
                  className="btn-neutral"
                  data-calendar-view="basicDay"
                  onClick={() => this.changeView('dayGridDay')}
                  size="sm"
                >
                  Jour
                </Button>
              </Col>
            </Row>
          </CardHeader>
          <CardBody className="p-0">
            <div
              className="calendar"
              ref={el => this.calendarContainer = el}
            />
          </CardBody>
        </Card>
        <Modal
          isOpen={this.state.modalAdd}
          toggle={() => this.setState({ modalAdd: false })}
          className="modal-dialog-centered modal-secondary"
        >
          <div className="modal-body">
            <form className="new-event--form">
              <FormGroup>
                <label className="form-control-label">Titre:</label>
                <Input
                  className="form-control-alternative new-event--title"
                  placeholder="Titre..."
                  type="text"
                  onChange={e => this.setState({ eventTitle: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup className="mb-0">
                <label className="form-control-label d-block mb-3">
                  Couleur:
                </label>
                <ButtonGroup
                  className="btn-group-toggle btn-group-colors event-tag"
                  data-toggle="buttons"
                >
                  <Button
                    className={classnames('bg-info', {
                      active: this.state.radios === 'bg-info',
                    })}
                    color=""
                    type="button"
                    onClick={() => this.setState({ radios: 'bg-info' })}
                  />
                  <Button
                    className={classnames('bg-warning', {
                      active: this.state.radios === 'bg-warning',
                    })}
                    color=""
                    type="button"
                    onClick={() => this.setState({ radios: 'bg-warning' })
                    }
                  />
                  <Button
                    className={classnames('bg-danger', {
                      active: this.state.radios === 'bg-danger',
                    })}
                    color=""
                    type="button"
                    onClick={() => this.setState({ radios: 'bg-danger' })}
                  />
                  <Button
                    className={classnames('bg-success', {
                      active: this.state.radios === 'bg-success',
                    })}
                    color=""
                    type="button"
                    onClick={() => this.setState({ radios: 'bg-success' })
                    }
                  />
                  <Button
                    className={classnames('bg-primary', {
                      active: this.state.radios === 'bg-primary',
                    })}
                    color=""
                    type="button"
                    onClick={() => {
                      this.setState({ radios: 'bg-primary' });
                    }}
                  />
                </ButtonGroup>
              </FormGroup>
            </form>
          </div>
          <div className="modal-footer">
            <Button
              className="new-event--add"
              color="primary"
              type="button"
              onClick={this.addNewEvent}
            >
              Ajouter
            </Button>
            <Button
              className="ml-auto"
              color="link"
              type="button"
              onClick={() => this.setState({ modalAdd: false })}
            >
              Fermer
            </Button>
          </div>
        </Modal>
        <Modal
          isOpen={this.state.modalChange}
          toggle={() => this.setState({ modalChange: false })}
          className="modal-dialog-centered modal-secondary"
        >
          <div className="modal-body">
            <Form className="edit-event--form">
              <FormGroup>
                <label className="form-control-label">Titre:</label>
                <Input
                  className="form-control-alternative edit-event--title"
                  placeholder="Event Title"
                  type="text"
                  defaultValue={this.state.eventTitle}
                  onChange={e => this.setState({ eventTitle: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup>
                <label className="form-control-label d-block mb-3">
                  Couleur:
                </label>
                <ButtonGroup
                  className="btn-group-toggle btn-group-colors event-tag mb-0"
                  data-toggle="buttons"
                >
                  <Button
                    className={classnames('bg-info', {
                      active: this.state.radios === 'bg-info',
                    })}
                    color=""
                    type="button"
                    onClick={() => this.setState({ radios: 'bg-info' })}
                  />
                  <Button
                    className={classnames('bg-warning', {
                      active: this.state.radios === 'bg-warning',
                    })}
                    color=""
                    type="button"
                    onClick={() => this.setState({ radios: 'bg-warning' })
                    }
                  />
                  <Button
                    className={classnames('bg-danger', {
                      active: this.state.radios === 'bg-danger',
                    })}
                    color=""
                    type="button"
                    onClick={() => this.setState({ radios: 'bg-danger' })}
                  />
                  <Button
                    className={classnames('bg-success', {
                      active: this.state.radios === 'bg-success',
                    })}
                    color=""
                    type="button"
                    onClick={() => this.setState({ radios: 'bg-success' })
                    }
                  />
                  <Button
                    className={classnames('bg-primary', {
                      active: this.state.radios === 'bg-primary',
                    })}
                    color=""
                    type="button"
                    onClick={() => {
                      this.setState({ radios: 'bg-primary' });
                    }}
                  />
                </ButtonGroup>
              </FormGroup>
              <FormGroup>
                <label className="form-control-label">Description</label>
                <Input
                  className="form-control-alternative edit-event--description textarea-autosize"
                  placeholder="Event Desctiption"
                  type="textarea"
                  defaultValue={this.state.eventDescription}
                  onChange={e => this.setState({ eventDescription: e.target.value })
                  }
                />
                <i className="form-group--bar" />
              </FormGroup>
              <input className="edit-event--id" type="hidden" />
            </Form>
          </div>
          <div className="modal-footer">
            <Button color="primary" onClick={this.changeEvent}>
              Modifier
            </Button>
            <Button
              color="danger"
              onClick={() => this.setState({ modalChange: false }, () => this.deleteEventSweetAlert())
              }
            >
              Supprimer
            </Button>
            <Button
              className="ml-auto"
              color="link"
              onClick={() => this.setState({ modalChange: false })}
            >
              Fermer
            </Button>
          </div>
        </Modal>
      </>
    );
  }
}

export default Fullcalendar;
