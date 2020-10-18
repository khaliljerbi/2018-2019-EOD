import * as actionTypes from '../Actions/Parm/Types';

const initialState = {
  annuaire: [],
  fiches: [],
  inMission: null,
  loading: false,
  error: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_NONE_CLOSED:
      return {
        ...state,
        fiches: action.payload,
        loading: false,
      };
    case actionTypes.GET_IN_MISSION:
      return {
        ...state,
        inMission: action.payload,
      };
    case actionTypes.GET_ANNUAIRE:
      return {
        ...state,
        loading: false,
        annuaire: action.payload,
      };
    case actionTypes.GET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default: return state;
  }
};

export default reducer;
