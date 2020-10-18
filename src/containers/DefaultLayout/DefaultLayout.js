/* eslint-disable react/no-array-index-key */
import React, { Component, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import {
  AppBreadcrumb,
  AppAside,
  AppHeader,
  AppSidebar,
  AppSidebarNav,
} from '@coreui/react';
import { ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';
import { logoutUser } from '../../Actions/AuthActions/Actions';

// sidebar nav config
import { navigation } from '../../_nav';
// routes config
import routes from '../../routes';
import SpinnerUI from '../../Components/Spinner/Spinner';
import Online from '../../Shared/Online/Online';

const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }

  render() {
    const { user } = this.props;
    const navigationCPY = { ...navigation() };
    if (user) {
      const filterNavigation = navigation().items.filter(item => item.role === user.role);
      navigationCPY.items = filterNavigation;
    } else {
      return <SpinnerUI />;
    }
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader user={user} onLogout={e => this.signOut(e)} />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <Suspense>
              <AppSidebarNav navConfig={navigationCPY} {...this.props} />
            </Suspense>
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb />
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => (route.component && route.role.includes(user.role) ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={props => (
                        <route.component {...props} />
                      )}
                    />
                  ) : (null)))}
                  {/* <Redirect from="/" exact to="/dashboard" /> */}
                </Switch>
              </Suspense>
              <ToastContainer />
            </Container>
          </main>
          <AppAside fixed>
            <Online />
          </AppAside>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { logoutUser })(DefaultLayout);
