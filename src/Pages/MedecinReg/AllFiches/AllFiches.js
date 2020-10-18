import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, UncontrolledTooltip } from 'reactstrap';
import moment from 'moment';
import { getAllFiche } from '../../../Actions/Med_Reg/Actions';
import Spinner from '../../../Components/Spinner/Spinner';
import Select from '../../../Components/Select/SingleSelect/SelectWithoutRedux';
import Table from '../../../Components/Table/Table';
import Card from '../../../Components/Card/Card';
import CustomDate from '../../../Components/Input/Date/Date';
import Input from '../../../Components/Input/CommonInput/CommonInput';
import SearchInput from '../../../Components/Input/FormInput/FormInput';
import * as dateFormat from '../../../Shared/DateFormat/DateFormat';


class AllFiches extends Component {
  state = {
    isOpen: false,
    search: '',
    date: {
      startDate: new Date(),
      endDate: null,
    },
    filtered: [],
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
            Header: 'Sortie',
            id: 'sortie',
            accessor: fiche => fiche.sortie && (
              <>
                <img id={`ambulanceName_${fiche.num_ordre}`} style={{ width: 35, height: 25, cursor: 'pointer' }} src="/static/images/amb.webp" alt="" />
                <UncontrolledTooltip placement="right" target={`ambulanceName_${fiche.num_ordre}`}>
                  {fiche.sortie.name}
                </UncontrolledTooltip>
              </>
            ),
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
                {' '}
                <Button color="danger" onClick={() => this.props.history.push(`/fiche_reg/pdf/${fiche._id}`)}>
                  <i className="fa fa-file-pdf-o" />
                </Button>
              </React.Fragment>
            ),
          },
        ],
      },
    ];

  componentDidMount() {
    this.props.getAllFiche();
  }


  // toggle details handler (Show / hide options)
  toggleDetailsHandler = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  // Search input onChange
  handleSearchChange = e => this.setState({ search: e.target.value });

  // Date input onChange
  onDateChangeHandler = (e, picker) => {
    const { fiches } = this.props.ficheReg;
    if (fiches.length) {
      const updatedArray = fiches.filter(fiche => moment(fiche.date).isSameOrAfter(picker.startDate) && moment(fiche.date).isSameOrBefore(picker.endDate));
      this.setState({ filtered: updatedArray, date: { startDate: picker.startDate, endDate: picker.endDate } });
    }
  };

  // global search method
  onFilterChange = data => data.filter(row => `${row.medecin.lastname.toLowerCase()} ${row.medecin.firstname.toLowerCase()}`.includes(this.state.search.trim().toLowerCase())
  || `${row.medecin.firstname.toLowerCase()} ${row.medecin.lastname.toLowerCase()}`.includes(this.state.search.trim().toLowerCase())
  || `${row.parm.lastname.toLowerCase()} ${row.parm.firstname.toLowerCase()}`.includes(this.state.search.trim().toLowerCase())
  || `${row.parm.firstname.toLowerCase()} ${row.parm.lastname.toLowerCase()}`.includes(this.state.search.trim().toLowerCase())
  || row.num_ordre.toString().toLowerCase().includes(this.state.search.trim().toLowerCase()));

  render() {
    const { loading, fiches } = this.props.ficheReg;
    const { isOpen, search, date: { startDate, endDate }, filtered } = this.state;
    if (loading) {
      return (<Row><Col xs={{ size: 5, offset: 5 }}><Spinner /></Col></Row>);
    }
    let rows = [...fiches];
    if (search) {
      rows = [...this.onFilterChange(fiches)];
    }
    if (filtered.length) {
      rows = this.state.filtered;
    }
    return (
      <Row>
        <Col lg={{ size: 7 }}>
          <Card header="Recherche détaillée: ">
            <Row>
              {!isOpen && (
              <Col xs={12}>
                <SearchInput value={search} onchange={this.handleSearchChange} icon="fa fa-search" placeholder="Rechercher..." />
              </Col>
              )}
              <Col xs={4}>
                <Button onClick={this.toggleDetailsHandler} color="primary">{isOpen ? 'Moins' : 'Plus'} de détails</Button>
              </Col>
            </Row>
            {isOpen && (
            <Row>
              <Col lg={12}>
                <br />
                <CustomDate label="Date: " onDateChange={this.onDateChangeHandler} startDate={startDate} endDate={endDate} />
              </Col>
              <Col lg={5}>
                <Select label="Médecin Régulateur" />
              </Col>
              <Col lg={5}>
                <Select label="PARM" />
              </Col>
              <Col lg={5}>
                <br />
                <Input label="Nom patient:" />
              </Col>
            </Row>
            )}
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
  ficheReg: state.ficheReg,
});
export default connect(mapStateToProps, { getAllFiche })(AllFiches);
