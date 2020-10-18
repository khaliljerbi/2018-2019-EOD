import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './AuthReducer';
import adminReducer from './AdminReducer';
import ficheRegReducer from './FicheRegReducer';
import parmReducer from './ParmReducer';
import ambulanceReducer from './AmbulanceReducer';
import usersReducer from './usersReducer';

export default combineReducers({
  auth: authReducer,
  admin: adminReducer,
  ficheReg: ficheRegReducer,
  parm: parmReducer,
  ambulance: ambulanceReducer,
  form: formReducer,
  users: usersReducer,
});
