import * as actionTypes from './Types';
import axios from '../../Services/httpService';
import IO from '../../Services/socketService';

const axiosInstance = axios.getInstance();

export const getConnectedUsers = id => async (dispatch) => {
  IO.getSocket().on('onlineUsers', users => dispatch({
    type: actionTypes.GET_ALL_CONNECTED_USERS,
    payload: users.filter(user => user.id !== id),
  }));
};

export const getConversation = data => async (dispatch) => {
  try {
    const result = await axiosInstance.post('/conversation', data);
    // redirect to conversation
    window.location = `/conversation/${result.data._id}`;
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ERROR,
      payload: error.response.data.message,
    });
  }
};

// get all conversations
export const getAllConversations = id => async (dispatch) => {
  try {
    const result = await axiosInstance.get(`/conversation/user/${id}`);
    dispatch({
      type: actionTypes.GET_ALL_CONVERSATIONS,
      payload: result.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const getFullConversation = id => async (dispatch) => {
  try {
    const result = await axiosInstance.get(`/conversation/${id}`);
    dispatch({
      type: actionTypes.GET_CONVERSATION,
      payload: result.data,
    });
    IO.getSocket().on('sending', messages => dispatch({
      type: actionTypes.GET_MESSAGES,
      messages,
    }));
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const sendMessage = (id, data) => async (dispatch) => {
  try {
    await axiosInstance.post(`/conversation/${id}`, data);
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const changeProfilePicture = (image, id) => async (dispatch) => {
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
    await axiosInstance.post(`/users/profile/${id}`, { attached_image: img ? img.data.secure_url : '' });
    dispatch({
      type: actionTypes.CHANGE_PROFILE_PICTURE,
    });
    window.location = `/profile/${id}`;
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ERROR,
      payload: error.response.data.message,
    });
  }
};
