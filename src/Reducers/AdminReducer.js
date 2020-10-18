import * as actionTypes from '../Actions/Admin/Types';

const initialState = {
  user: null,
  users: [],
  logs: [],
  typologies: null,
  typologies_sp: null,
  motifs: null,
  loading: false,
  error: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case actionTypes.ADD_USER:
      return {
        ...state,
        users: [action.payload, ...state.users],
      };
    case actionTypes.GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case actionTypes.DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.payload),
      };
    case actionTypes.LOADING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_USER_FROM_TABLE:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case actionTypes.SET_LOGS:
      return {
        ...state,
        loading: false,
        logs: action.payload,
      };
    case actionTypes.ADD_LOG:
      return {
        ...state,
        logs: [action.payload, ...state.logs],
      };
    case actionTypes.ADD_TYPOLOGIE:
      return {
        ...state,
        typologies: [...state.typologies, action.payload],
      };
    case actionTypes.ADD_TYPOLOGIE_SP:
      return {
        ...state,
        typologies_sp: [...state.typologies_sp, action.payload],
      };
    case actionTypes.ADD_MOTIF:
      return {
        ...state,
        motifs: [...state.motifs, action.payload],
      };
    case actionTypes.GET_ALL_TYPOLOGIES:
      return {
        ...state,
        typologies: action.payload,
      };
    case actionTypes.GET_ALL_TYPOLOGIES_SP:
      return {
        ...state,
        typologies_sp: action.payload,
      };
    case actionTypes.GET_ALL_MOTIFS:
      return {
        ...state,
        motifs: action.payload,
      };
    case actionTypes.DELETE_TYPOLOGIE:
      return {
        ...state,
        typologies: state.typologies.filter(typologie => typologie._id !== action.payload),
      };
    case actionTypes.DELETE_TYPOLOGIE_SP:
      return {
        ...state,
        typologies_sp: state.typologies_sp.filter(typologie => typologie._id !== action.payload),
      };
    case actionTypes.DELETE_MOTIF:
      return {
        ...state,
        motifs: state.motifs.filter(motif => motif._id !== action.payload),
      };
    case actionTypes.UPDATE_TYPOLOGIE: {
      return {
        ...state,
        typologies: state.typologies.map(typologie => (typologie._id === action.payload._id ? action.payload : typologie)),
      };
    }
    case actionTypes.UPDATE_TYPOLOGIE_SP: {
      return {
        ...state,
        typologies_sp: state.typologies_sp.map(typologie => (typologie._id === action.payload._id ? action.payload : typologie)),
      };
    }
    case actionTypes.UPDATE_MOTIF: {
      return {
        ...state,
        motifs: state.motifs.map(motif => (motif._id === action.payload._id ? action.payload : motif)),
      };
    }
    default: return state;
  }
};

export default reducer;
