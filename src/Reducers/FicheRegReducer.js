import * as actionTypes from '../Actions/Med_Reg/Types';
import * as parmActions from '../Actions/Parm/Types';

const initialState = {
  fiches: [],
  fiche: {},
  parms: [],
  meds: [],
  affectation: [],
  pending: [],
  loading: false,
  progress: 0,
  error: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FICHE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.SET_FILE_PROGRESS:
      return {
        ...state,
        progress: action.payload,
      };
    case actionTypes.ADD_FICHE:
      return {
        ...state,
        progress: 0,
      };
    case actionTypes.GET_ALL:
      return {
        ...state,
        loading: false,
        fiches: action.payload,
      };
    case actionTypes.GET_FICHE:
      return {
        ...state,
        loading: false,
        fiche: action.payload,
      };
    case actionTypes.GET_MED_PARM:
      return {
        ...state,
        parms: action.payload.filter(user => user.role === 'Permanencier'),
        meds: action.payload.filter(user => user.role === 'Médecin Régulateur'),
      };
    case actionTypes.GET_ALL_PENDING_FICHES:
      return {
        ...state,
        loading: false,
        pending: action.payload,
      };
    case actionTypes.PENDING_FICHE:
      return {
        ...state,
        pending: [action.payload, ...state.pending],
      };
    case actionTypes.PENDING_END:
      return {
        ...state,
        pending: state.pending.filter(fiche => fiche._id !== action.payload),
        progress: 0, // set progress to 0
      };
    case actionTypes.FICHE_AFFECT:
      return {
        ...state,
        affectation: [action.payload, ...state.affectation],
      };
    case parmActions.AFFECT_AMBULANCE_NOTIFICATION:
      return {
        ...state,
        affectation: state.affectation.filter(fiche => fiche._id !== action.payload),
      };
    case parmActions.PENDING_AFFECT_AMBULANCE:
      return {
        ...state,
        affectation: action.payload,
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
