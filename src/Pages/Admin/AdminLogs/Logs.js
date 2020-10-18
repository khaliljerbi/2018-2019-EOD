import React, { Component } from 'react';
import { Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLogs, addLogs } from '../../../Actions/Admin/Actions';
import Spinner from '../../../Components/Spinner/Spinner';
import CustomCard from '../../../Components/Card/Card';
import * as dateFormat from '../../../Shared/DateFormat/DateFormat';

class Logs extends Component {
  componentDidMount() {
    this.props.getLogs();
    // adding logs
    this.props.addLogs();
  }

  render() {
    const { loading, logs } = this.props.logs;
    if (loading) {
      return (<Spinner />);
    }
    return (
      <Row>
        <Col xs={12}>
          <CustomCard style={{ marginTop: 20 }} header="Activités des fiches de régulation: ">
            <ListGroup>
              {logs.map(item => (
                <ListGroupItem key={item._id}>
                  <strong>{item.creator.name}</strong>
                  {' '}{item.message}{' '}
                  <Link to={`/fiche_reg/${item.actionOn}`}>Fiche</Link>
                  <p style={{ color: '#6b808c' }}>Date: {dateFormat.regularDate(item.createdAt)}{' à '}{dateFormat.timeDate(item.createdAt)} </p>
                </ListGroupItem>
              )).slice(0, 5)}
              {logs.length > 5 && <ListGroupItem style={{ padding: 22 }} className="text-center"><Link style={{ textDecoration: 'underline' }} to="/admin/history">Voir tout</Link></ListGroupItem>}
            </ListGroup>
          </CustomCard>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  logs: state.admin,
});
export default connect(mapStateToProps, { getLogs, addLogs })(Logs);
