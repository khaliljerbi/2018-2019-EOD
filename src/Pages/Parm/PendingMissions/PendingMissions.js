import React, { Component } from 'react';
import { Table, UncontrolledTooltip, Button, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import Card from '../../../Components/Card/Card';
import { getInMission } from '../../../Actions/Parm/Actions';
import Spinner from '../../../Components/Spinner/Spinner';

class PendingMissions extends Component {
  componentDidMount() {
    this.props.getInMission();
  }

  render() {
    const { inMission } = this.props;
    if (!inMission) return <Spinner />;
    if (inMission.length === 0) return <Alert color="primary">Pas de missions en cours.</Alert>;
    return (
      <Card style={{ marginTop: 20 }} header="Missions en cours">
        <Table responsive>
          <thead>
            <tr>
              <th>Num_ordre</th>
              <th>Equipe</th>
              <th>SMUR</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {inMission.map(mission => (
              <tr key={mission._id}>
                <th scope="row">{mission.num_ordre}</th>
                <td>
                  <div className="avatars-stack mt-2">
                    <div id={`medecin_${mission.num_ordre}`} style={{ cursor: 'pointer' }} className="avatar avatar-sm">
                      <img style={{ width: 25, height: 25 }} src={mission.medecin.profilePicture ? mission.medecin.profilePicture : '/static/images/no_image.webp'} className="img-avatar" alt={`${mission.medecin.firstname} ${mission.medecin.lastname}`} />
                    </div>
                    <UncontrolledTooltip placement="left" target={`medecin_${mission.num_ordre}`}>
                      {`${mission.medecin.firstname} ${mission.medecin.lastname}`}
                    </UncontrolledTooltip>
                    <div id={`parm_${mission.num_ordre}`} style={{ cursor: 'pointer' }} className="avatar avatar-sm">
                      <img style={{ width: 25, height: 25 }} src={mission.parm.profilePicture ? mission.parm.profilePicture : '/static/images/no_image.webp'} className="img-avatar" alt={`${mission.parm.firstname} ${mission.parm.lastname}`} />
                    </div>
                    <UncontrolledTooltip placement="top" target={`parm_${mission.num_ordre}`}>
                      {`${mission.parm.firstname} ${mission.parm.lastname}`}
                    </UncontrolledTooltip>
                    <div id={`intervention_${mission.num_ordre}`} style={{ cursor: 'pointer' }} className="avatar avatar-sm">
                      <img style={{ width: 25, height: 25 }} src="/static/images/no_image.webp" className="img-avatar" alt="intervention" />
                    </div>
                    <UncontrolledTooltip placement="right" target={`intervention_${mission.num_ordre}`}>
                      {'Médecin d\'intervention'}
                    </UncontrolledTooltip>
                  </div>
                </td>
                <td>{mission.sortie.name}</td>
                <td><Button color="success">Suivre sur map</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>

      </Card>
    );
  }
}

const mapStateToProps = state => ({
  inMission: state.parm.inMission,
});

export default connect(mapStateToProps, { getInMission })(PendingMissions);
