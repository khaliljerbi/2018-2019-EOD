import { toast } from 'react-toastify';
import axios from '../../Services/httpService';
import IO from '../../Services/socketService';
import * as actionTypes from './Types';

const axiosInstance = axios.getInstance();

// Set loading state
export const setFicheLoading = () => ({
  type: actionTypes.FICHE_LOADING,
});

// add new fiche
export const addFicheReg = (data, image, history, reset) => async (dispatch) => {
  try {
    let img;
    if (image.get('image').size) {
      img = await axiosInstance.post('/upload', image, {
        onUploadProgress: progressEvent => dispatch({
          type: actionTypes.SET_FILE_PROGRESS,
          payload: Math.round(progressEvent.loaded * 100 / (progressEvent.total)),
        }),
      });
    }
    await axiosInstance.post('/med/new_fiche', { attached_image: img ? img.data.secure_url : '', ...data });
    dispatch(reset('regForm'));
    dispatch({
      type: actionTypes.ADD_FICHE,
    });
    history.push('/fiche_reg/all');
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ERROR,
      payload: error.response.data.message,
    });
  }
};
// get all fiche
export const getAllFiche = () => async (dispatch) => {
  try {
    dispatch(setFicheLoading());
    const result = await axiosInstance.get('/med/all');
    dispatch({
      type: actionTypes.GET_ALL,
      payload: result.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ERROR,
      payload: error.response.data.message,
    });
  }
};

// get single fiche
export const getFiche = id => async (dispatch) => {
  try {
    dispatch(setFicheLoading());
    const result = await axiosInstance.get(`/med/fiche/${id}`);
    dispatch({
      type: actionTypes.GET_FICHE,
      payload: result.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ERROR,
      payload: error.response.data.message,
    });
  }
};
// edit fiche
export const editFicheReg = (id, data, image, history, reset) => async (dispatch) => {
  try {
    // need more tests here
    let img;
    if (image.get('image').size) {
      img = await axiosInstance.post('/upload', image, {
        onUploadProgress: progressEvent => dispatch({
          type: actionTypes.SET_FILE_PROGRESS,
          payload: Math.round(progressEvent.loaded * 100 / (progressEvent.total)),
        }),
      });
    }
    await axiosInstance.put(`/med/fiche/${id}`, { attached_image: img ? img.data.secure_url : '', ...data });
    dispatch(reset('regFormEdit'));
    history.push('/fiche_reg/all');
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ERROR,
      payload: error.response.data.message,
    });
  }
};

// getting notifications med
export const waitingForFiches = () => (dispatch) => {
  IO.getSocket().on('fiche_init', (fiche) => {
    toast('Une nouvelle fiche vous a été assignée. \n Vérifier votre liste de tâches!', {
      position: 'bottom-right',
      type: 'info',
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
    dispatch({
      type: actionTypes.PENDING_FICHE,
      payload: fiche,
    });
  });
};

// getting notifications med
export const waitingForFicheConfirmation = () => (dispatch) => {
  IO.getSocket().on('fiche_end', (fiche) => {
    if (fiche.affect) {
      toast(`Une fiche a été remplie par ${fiche.medecin.firstname} ${fiche.medecin.lastname}, et a besoin qu'on lui affecte un SMUR`, {
        position: 'bottom-right',
        type: 'info',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
      dispatch({
        type: actionTypes.FICHE_AFFECT,
        payload: fiche,
      });
    } else {
      toast(`Une fiche a été remplie par ${fiche.medecin.firstname} ${fiche.medecin.lastname}.`, {
        position: 'bottom-right',
        type: 'info',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
      dispatch({
        type: actionTypes.FICHE_END,
        payload: fiche,
      });
    }
  });
};

// get doctors & parms
export const getMedParm = () => async (dispatch) => {
  try {
    const result = await axiosInstance.get('/parm/annuaire');
    dispatch({
      type: actionTypes.GET_MED_PARM,
      payload: result.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ERROR,
      payload: error.response.data.message,
    });
  }
};

// get all pending fiches
export const getPendingFiches = id => async (dispatch) => {
  try {
    dispatch(setFicheLoading());
    const result = await axiosInstance.get(`/med/pending/${id}`);
    dispatch({
      type: actionTypes.GET_ALL_PENDING_FICHES,
      payload: result.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ERROR,
      payload: error.response.data.message,
    });
  }
};

// fill up pending fiche
export const fillUpPendingFiche = (id, data, image, history, reset) => async (dispatch) => {
  try {
    let img;
    if (image.get('image').size) {
      img = await axiosInstance.post('/upload', image, {
        onUploadProgress: progressEvent => dispatch({
          type: actionTypes.SET_FILE_PROGRESS,
          payload: Math.round(progressEvent.loaded * 100 / (progressEvent.total)),
        }),
      });
    }
    await axiosInstance.put(`/med/transfer/${id}`, { attached_image: img ? img.data.secure_url : '', ...data });
    dispatch(reset('regFormTransfer'));
    dispatch({
      type: actionTypes.PENDING_END,
      payload: id,
    });
    history.push('/fiche_reg/all');
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ERROR,
      payload: error.response.data.message,
    });
  }
};
