import React from 'react';
import { connect } from 'react-redux';

import ChefServiceHome from '../ChefSer/Home/Home';
import MedecinIntHome from '../MedecinInt/Home/Home';
import ParmHome from '../Parm/Home/Home';
import MedecinRegHome from '../MedecinReg/Home/Home';
import SpinnerUI from '../../Components/Spinner/Spinner';
import Page404 from '../Page404/Page404';

const Home = ({ user }) => {
  let homeScreen;
  if (!user) return <SpinnerUI />;
  switch (user.role) {
    case 'Permanencier':
      homeScreen = <ParmHome />;
      break;
    case 'Médecin Régulateur':
      homeScreen = <MedecinRegHome />;
      break;
    case 'Médecin d\'intervention':
      homeScreen = <MedecinIntHome />;
      break;
    case 'Chef Service':
      homeScreen = <ChefServiceHome />;
      break;
    default: return <Page404 />;
  }
  return (
    <div>
      {homeScreen}
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
});
export default connect(mapStateToProps)(Home);
