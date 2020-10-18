/* eslint-disable no-use-before-define */
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import * as actionTypes from './Types';
import axios from '../../Services/httpService';
import IO from '../../Services/socketService';

const axiosInstance = axios.getInstance();

// clear error
const clearErrors = () => ({
  type: actionTypes.CLEAR_ERRORS,
});

// login user and redirect on success
export const loginUser = (data, history) => async (dispatch) => {
  try {
    dispatch(clearErrors());
    const result = await axiosInstance.post('/auth/login', data);
    localStorage.setItem('jwt', result.headers['x-auth-token']);
    const decoded = jwtDecode(result.headers['x-auth-token']);
    dispatch(setCurrentUser(decoded));
    history.push('/');
  } catch (error) {
    dispatch({
      type: actionTypes.LOGIN_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};
// logout user and redirect
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('jwt');
  dispatch(setCurrentUser(null));
  IO.getSocket().emit('userDisconnected');
  window.location = '/login';
};

// set current user
export const setCurrentUser = decoded => ({
  type: actionTypes.SET_CURRENT_USER,
  payload: decoded,
});

// reset password
export const resetPassword = (email, history) => async (dispatch) => {
  try {
    dispatch(clearErrors());
    await axiosInstance.post('/auth/reset', email);
    history.push('/reset/view', email);
  } catch (error) {
    dispatch({
      type: actionTypes.RESET_FAIL,
      payload: error.response.data.message,
    });
  }
};

// check reset token
export const checkResetToken = token => async (dispatch) => {
  try {
    await axiosInstance.get(`/auth/reset/${token}`);
  } catch (error) {
    dispatch({
      type: actionTypes.RESET_FAIL,
      payload: error.response.data.message,
    });
    setTimeout(() => {
      window.location = '/reset';
    }, 5000);
  }
};

// update Password
export const updatePassword = (token, data) => async (dispatch) => {
  try {
    await axiosInstance.put(`/auth/reset/${token}`, data);
    setInterval(() => {
      window.location = '/login';
    }, 5000);
    toast('Mot de passe modifié avec succés. Vous allez être redirigé dans 5 secondes', {
      position: 'top-right',
      type: 'success',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.RESET_FAIL,
      payload: error.response.data.message,
    });
  }
};

// update Password from profile
export const updatePasswordById = (id, data) => async (dispatch) => {
  try {
    await axiosInstance.put(`/auth/update_password/${id}`, data);
    setInterval(() => {
      // to change to a better implementation later
      localStorage.removeItem('jwt');
      dispatch(setCurrentUser(null));
      IO.getSocket().emit('userDisconnected');
      window.location = '/login';
    }, 5000);
    toast('Mot de passe modifié avec succés. Vous allez être déconnecté dans 5 secondes', {
      position: 'top-right',
      type: 'success',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.RESET_FAIL,
      payload: error.response.data.message,
    });
  }
};
