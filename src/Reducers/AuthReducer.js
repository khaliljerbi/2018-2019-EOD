import * as actionTypes from '../Actions/AuthActions/Types';
import { isEmpty } from '../Shared/isEmpty/isEmpty';

const initialState = {
  user: null,
  isAuthenticated: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER_FAIL:
      return {
        error: action.payload,
      };
    case actionTypes.SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case actionTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case actionTypes.RESET_FAIL:
      return {
        error: action.payload,
      };
    default: return state;
  }
};

export default reducer;
