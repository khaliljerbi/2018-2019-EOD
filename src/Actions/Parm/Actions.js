import { toast } from 'react-toastify';
import * as actionTypes from './Types';
import axios from '../../Services/httpService';

const axiosInstance = axios.getInstance();

const setLoading = () => ({ type: actionTypes.SET_LOADING });

const clearErrors = () => ({
  type: actionTypes.CLEAR_ERRORS,
});

export const getAnnuaire = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const result = await axiosInstance.get('/parm/annuaire');
    dispatch({
      type: actionTypes.GET_ANNUAIRE,
      payload: result.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const sendMail = (data, history) => async (dispatch) => {
  try {
    history.push('/parm/annuaire');
    await axiosInstance.post('/mail', data);
    toast('Email envoyé avec succés!', {
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
      type: actionTypes.GET_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const addFicheInfo = (data, history, reset) => async (dispatch) => {
  try {
    await axiosInstance.post('/parm/new_fiche_info', data);
    dispatch(reset('regFormParm'));
    history.push('/');
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const getFiches = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const result = await axiosInstance.get('/parm/noneclosed');
    dispatch({
      type: actionTypes.GET_NONE_CLOSED,
      payload: result.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const lockFiche = (id, history) => async (dispatch) => {
  try {
    await axiosInstance.put(`/parm/close/${id}`);
    history.push('/parm/fiches');
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const affectAmbulance = (ambulanceId, ficheId) => async (dispatch) => {
  try {
    dispatch(clearErrors());
    await axiosInstance.put(`/parm/affect/${ficheId}`, { ambulance: ambulanceId });
    dispatch({
      type: actionTypes.AFFECT_AMBULANCE,
      payload: ambulanceId,
    });
    dispatch({
      type: actionTypes.AFFECT_AMBULANCE_NOTIFICATION,
      payload: ficheId,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const getPendingAffectation = id => async (dispatch) => {
  try {
    const result = await axiosInstance.get(`/parm/pending_affect/${id}`);
    dispatch({
      type: actionTypes.PENDING_AFFECT_AMBULANCE,
      payload: result.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const getInMission = () => async (dispatch) => {
  try {
    const result = await axiosInstance.get('/parm/in_mission');
    dispatch({
      type: actionTypes.GET_IN_MISSION,
      payload: result.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ERROR,
      payload: error.response.data.message,
    });
  }
};
