import React, { Component } from 'react';
import { Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLogs, addLogs } from '../../../Actions/Admin/Actions';
import Spinner from '../../../Components/Spinner/Spinner';
import CustomCard from '../../../Components/Card/Card';
import * as dateFormat from '../../../Shared/DateFormat/DateFormat';
import Pagination from '../../../Shared/Pagination/Pagination';
import { paginate } from '../../../Shared/Pagination/PaginationMethod';

class FullLogs extends Component {
  state = {
    currentPage: 1,
    pageSize: 10,

  }

  componentDidMount() {
    this.props.getLogs();
    // adding logs
    this.props.addLogs();
  }

  // handle page change
  onPageChange = (page) => {
    this.setState({ currentPage: page });
  }

  onNextPage = () => this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));

  onPreviousPage = () => this.setState(prevState => ({ currentPage: prevState.currentPage - 1 }));

  render() {
    const { loading, logs } = this.props.logs;
    const { pageSize, currentPage } = this.state;
    if (loading) {
      return (<Spinner />);
    }
    const { length: count } = logs;
    const paginatedLogs = paginate(logs, currentPage, pageSize);
    return (
      <Row>
        <Col xs={12} sm={12} md={12} lg={{ size: 8, offset: 2 }} xl={{ size: 8, offset: 2 }}>
          <CustomCard style={{ marginTop: 20 }} header="Activités des fiches de régulation: ">
            <ListGroup>
              {paginatedLogs.map(item => (
                <ListGroupItem key={item._id}>
                  <strong>{item.creator.name}</strong>
                  {' '}{item.message}{' '}
                  <Link to={`/fiche_reg/${item.actionOn}`}>Fiche</Link>
                  <p style={{ color: '#6b808c' }}>Date: {dateFormat.regularDate(item.createdAt)}{' à '}{dateFormat.timeDate(item.createdAt)} </p>
                </ListGroupItem>
              ))}
            </ListGroup>
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.onPageChange}
              onNextPage={this.onNextPage}
              onPreviousPage={this.onPreviousPage}
            />
          </CustomCard>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  logs: state.admin,
});
export default connect(mapStateToProps, { getLogs, addLogs })(FullLogs);
