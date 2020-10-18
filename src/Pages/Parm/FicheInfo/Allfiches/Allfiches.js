import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'reactstrap';
import { getFiches } from '../../../../Actions/Parm/Actions';
import Spinner from '../../../../Components/Spinner/Spinner';
import Table from '../../../../Components/Table/Table';
import Card from '../../../../Components/Card/Card';
import SearchInput from '../../../../Components/Input/FormInput/FormInput';
import * as dateFormat from '../../../../Shared/DateFormat/DateFormat';


class AllFiches extends Component {
  state = {
    search: '',
  }

  FicheColumns =
    [
      { Header: 'Liste',
        columns: [
          {
            Header: 'NUM',
            accessor: 'num_ordre',
          },
          {
            Header: 'Date',
            id: 'date',
            accessor: fiche => dateFormat.slashFormat(fiche.date),
          },
          {
            Header: 'Heure',
            id: 'heure',
            accessor: fiche => fiche.time_fiche,
          },
          {
            Header: 'Médecin Régulateur',
            id: 'med',
            accessor: fiche => `${fiche.medecin.lastname} ${fiche.medecin.firstname}`,
          },
          {
            Header: 'PARM',
            id: 'parm',
            accessor: fiche => `${fiche.parm.lastname} ${fiche.parm.firstname}`,
          },
          {
            Header: 'Cloturée',
            id: 'status',
            accessor: fiche => (fiche.cloture ? 'Oui' : 'Non'),
          },
          {
            id: 'actions',
            accessor: fiche => (
              <React.Fragment>
                <Button color="primary" onClick={() => this.props.history.push(`/fiche_reg/${fiche._id}`)}>
                  <i className="fa fa-eye" />
                </Button>
              </React.Fragment>
            ),
          },
        ],
      },
    ];

  componentDidMount() {
    this.props.getFiches();
  }


  // toggle details handler (Show / hide options)
  toggleDetailsHandler = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  // Search input onChange
  handleSearchChange = e => this.setState({ search: e.target.value });

  // global search method
  onFilterChange = data => data.filter(row => `${row.medecin.lastname.toLowerCase()} ${row.medecin.firstname.toLowerCase()}`.includes(this.state.search.trim().toLowerCase())
  || `${row.medecin.firstname.toLowerCase()} ${row.medecin.lastname.toLowerCase()}`.includes(this.state.search.trim().toLowerCase())
  || `${row.parm.lastname.toLowerCase()} ${row.parm.firstname.toLowerCase()}`.includes(this.state.search.trim().toLowerCase())
  || `${row.parm.firstname.toLowerCase()} ${row.parm.lastname.toLowerCase()}`.includes(this.state.search.trim().toLowerCase())
  || row.num_ordre.toString().toLowerCase().includes(this.state.search.trim().toLowerCase()));

  render() {
    const { loading, fiches } = this.props.fiches;
    const { search } = this.state;
    if (loading) {
      return (<Row><Col xs={{ size: 5, offset: 5 }}><Spinner /></Col></Row>);
    }
    let rows = [...fiches];
    if (this.state.search) {
      rows = [...this.onFilterChange(fiches)];
    }
    return (
      <Row>
        <Col lg={{ size: 7 }}>
          <Card header="Recherche détaillée: ">
            <Row>
              <Col xs={12}>
                <SearchInput value={search} onchange={this.handleSearchChange} icon="fa fa-search" placeholder="Rechercher..." />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={12}>
          <Card header="Liste des fiches de régulation: ">
            <Table columns={this.FicheColumns} data={rows} />
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  fiches: state.parm,
});
export default connect(mapStateToProps, { getFiches })(AllFiches);
