import React from 'react';
import { connect } from 'react-redux';
import AdminHome from '../../Admin/Home/Home';

const ChefServiceHome = ({ user }) => {
  return (
    <React.Fragment>
      {user.isAdmin ? <AdminHome /> : <h1>Contenu Chef Service</h1>}
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
});
export default connect(mapStateToProps)(ChefServiceHome);
