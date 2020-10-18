import * as actionTypes from '../Actions/Admin/Types';
import * as parmactionTypes from '../Actions/Parm/Types';

const initialState = {
  ambulances: [],
  available: [],
  error: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_AMBULANCES:
      return {
        ...state,
        ambulances: action.payload,
        available: action.payload.filter(ambulance => !ambulance.inMission),
      };
    case parmactionTypes.AFFECT_AMBULANCE:
      return {
        ...state,
        available: state.available.filter(ambulance => ambulance._id !== action.payload),
      };
    case actionTypes.ADD_AMBULANCE:
      return {
        ...state,
        ambulances: [action.payload, ...action.payload],
      };
    case parmactionTypes.GET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case parmactionTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default: return state;
  }
};

export default reducer;
