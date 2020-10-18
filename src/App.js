import React, { Component, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import store from './store';
import './App.scss';
import ProtectedRoute from './Shared/ProtectedRoute/ProtectedRoute';
import { setCurrentUser } from './Actions/AuthActions/Actions';
import DefaultLayout from './containers/DefaultLayout/DefaultLayout';
import SpinnerUI from './Components/Spinner/Spinner';
import { isAuthenticated } from './Services/authService';

// const DefaultLayout = lazy(() => import('./containers/DefaultLayout/DefaultLayout'));
const Login = React.lazy(() => import('./Pages/Login/Login'));
const Page500 = React.lazy(() => import('./Pages/Page500/Page500'));
const PasswordReset = React.lazy(() => import('./Pages/PasswordReset/PasswordReset'));
const ResetForm = React.lazy(() => import('./Pages/PasswordReset/ResetForm'));
const ResetView = React.lazy(() => import('./Pages/PasswordReset/ResetSuccesView'));
class App extends Component {
  componentDidMount() {
    if (isAuthenticated()) {
      const decoded = jwtDecode(localStorage.jwt);
      store.dispatch(setCurrentUser(decoded));
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={<SpinnerUI />}>
          <Switch>
            <Route exact path="/login" name="Login Page" render={props => (<Login {...props} />)} />
            <Route exact path="/reset" name="resetPassword" render={props => (<PasswordReset {...props} />)} />
            <Route exact path="/reset/view" name="resetView" render={props => (<ResetView {...props} />)} />
            <Route exact path="/reset/:token" name="resetForm" render={props => (<ResetForm {...props} />)} />
            <Route exact path="/500" name="Page 500" render={props => (<Page500 {...props} />)} />
            <ProtectedRoute path="/" name="Accueil" component={DefaultLayout} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
