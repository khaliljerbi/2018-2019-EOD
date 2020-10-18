/* eslint-disable no-throw-literal */
import IO from '../../Services/socketService';
import axios from '../../Services/httpService';
import * as actionTypes from './Types';

const axiosInstance = axios.getInstance();

// Set loading state
const setLoading = () => ({
  type: actionTypes.LOADING,
});
// validate User onblur redux FORM
export const checkUser = async (data, dispatch, props, field) => {
  try {
    await axiosInstance.post('/auth/checkUser', data);
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ERROR,
      payload: error.response.data.message,
    });
    if (field === 'email') {
      throw { email: 'Email existe déjà.' };
    }
    if (field === 'cin') {
      throw { cin: 'Un utilisateur avec ce CIN existe déjà.' };
    }
  }
};

export const activateUser = (id, isAllowed) => async (dispatch) => {
  try {
    await axiosInstance.put(`/users/activate/${id}`, { isAllowed });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ERROR,
      payload: error.response.data.message,
    });
  }
};

// register user action
export const registerUser = (data, history) => async (dispatch) => {
  try {
    await axiosInstance.post('/auth/register', data);
    history.push('/admin/users');
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ERROR,
      payload: error.response.data.message,
    });
  }
};

// socket adding users
export const realTimeAddUser = () => (dispatch) => {
  IO.getSocket().on('user_add', user => dispatch({
    type: actionTypes.ADD_USER,
    payload: user,
  }));
};

// get all users action
export const getAllUser = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const result = await axiosInstance.get('/users/all');
    dispatch({
      type: actionTypes.GET_ALL_USERS,
      payload: result.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ALL_USERS,
      payload: null,
    });
  }
};

// delete user action
export const deleteUser = (id, history) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/users/delete/${id}`);
    dispatch({
      type: actionTypes.DELETE_USER,
      payload: id,
    });
    history.push('/admin/users');
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ERROR,
      payload: error.response.data.message,
    });
  }
};

// get user from table action
export const getUserFromTable = id => async (dispatch) => {
  try {
    const result = await axiosInstance.get(`/users/${id}`);
    dispatch(setLoading());
    dispatch({
      type: actionTypes.GET_USER_FROM_TABLE,
      payload: result.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const updateUser = (id, user, history) => async (dispatch) => {
  try {
    await axiosInstance.put(`/users/update/${id}`, user);
    history.push('/admin/users');
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ERROR,
      payload: error,
    });
  }
};

// get any action done in the application
export const getLogs = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const result = await axiosInstance.get('/logs');
    dispatch({
      type: actionTypes.SET_LOGS,
      payload: result.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ERROR,
      payload: error.response.data.message,
    });
  }
};

// get all ambulances
export const getAmbulances = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const result = await axiosInstance.get('/ambulance/all');
    dispatch({
      type: actionTypes.GET_AMBULANCES,
      payload: result.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ERROR,
      payload: error.response.data.message,
    });
  }
};

// add new ambulance
export const addAmbulance = (data, history) => async (dispatch) => {
  try {
    await axiosInstance.post('/ambulance/add_ambulance', data);
    history.push('/admin/ambulances');
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ERROR,
      payload: error.response.data.message,
    });
  }
};

// realtime socket.io add logs
export const addLogs = () => (dispatch) => {
  IO.getSocket().on('log_admin', log => dispatch({
    type: actionTypes.ADD_LOG,
    payload: log,
  }));
};

/** ********************** Global management ******************************** */
export const addTypologie = data => async (dispatch) => {
  try {
    const result = await axiosInstance.post('/management/typologie/add_typologie', data);
    dispatch({
      type: actionTypes.ADD_TYPOLOGIE,
      payload: result.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const deleteTypologie = id => async (dispatch) => {
  try {
    await axiosInstance.delete(`/management/typologie/${id}`);
    dispatch({
      type: actionTypes.DELETE_TYPOLOGIE,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const getAllTypologies = () => async (dispatch) => {
  try {
    const result = await axiosInstance.get('/management/typologie/all');
    dispatch({
      type: actionTypes.GET_ALL_TYPOLOGIES,
      payload: result.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const updateTypologie = (id, data) => async (dispatch) => {
  try {
    const result = await axiosInstance.put(`/management/typologie/${id}`, data);
    dispatch({
      type: actionTypes.UPDATE_TYPOLOGIE,
      payload: result.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ERROR,
      payload: error.response.data.message,
    });
  }
};


export const addTypologieSP = data => async (dispatch) => {
  try {
    const result = await axiosInstance.post('/management/typologie_sp/add_typologie_sp', data);
    dispatch({
      type: actionTypes.ADD_TYPOLOGIE_SP,
      payload: result.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const deleteTypologieSP = id => async (dispatch) => {
  try {
    await axiosInstance.delete(`/management/typologie_sp/${id}`);
    dispatch({
      type: actionTypes.DELETE_TYPOLOGIE_SP,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const getAllTypologiesSP = () => async (dispatch) => {
  try {
    const result = await axiosInstance.get('/management/typologie_sp/all');
    dispatch({
      type: actionTypes.GET_ALL_TYPOLOGIES_SP,
      payload: result.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ERROR,
      payload: error.response.data.message,
    });
  }
};


export const updateTypologieSP = (id, data) => async (dispatch) => {
  try {
    const result = await axiosInstance.put(`/management/typologie_sp/${id}`, data);
    dispatch({
      type: actionTypes.UPDATE_TYPOLOGIE_SP,
      payload: result.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const addMotif = data => async (dispatch) => {
  try {
    const result = await axiosInstance.post('/management/motif/add_motif', data);
    dispatch({
      type: actionTypes.ADD_MOTIF,
      payload: result.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const deleteMotif = id => async (dispatch) => {
  try {
    await axiosInstance.delete(`/management/motif/${id}`);
    dispatch({
      type: actionTypes.DELETE_MOTIF,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const updateMotif = (id, data) => async (dispatch) => {
  try {
    const result = await axiosInstance.put(`/management/motif/${id}`, data);
    dispatch({
      type: actionTypes.UPDATE_MOTIF,
      payload: result.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const getAllMotifs = () => async (dispatch) => {
  try {
    const result = await axiosInstance.get('/management/motif/all');
    dispatch({
      type: actionTypes.GET_ALL_MOTIFS,
      payload: result.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ERROR,
      payload: error.response.data.message,
    });
  }
};
