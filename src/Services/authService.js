import jwtDecode from 'jwt-decode';
import moment from 'moment';

export const getToken = () => localStorage.getItem('jwt');

const decode = token => jwtDecode(token);

const getExipirationDate = token => moment.unix(decode(token).exp);

const isValidToken = token => moment().isBefore(getExipirationDate(token)) && decode(token).isAllowed;

export const isAuthenticated = () => {
  const token = getToken();

  if (token && decode(token).isAdmin) return true;
  return !!((token && isValidToken(token)));
};
