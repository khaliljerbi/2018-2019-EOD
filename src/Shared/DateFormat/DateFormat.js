import moment from 'moment';

moment.locale('fr');
export const today = moment(new Date()).format('YYYY-MM-DD');
export const pickerFormat = date => moment(date).format('YYYY-MM-DD');
export const regularDate = date => moment(date).format('DD-MM-YYYY');
export const slashFormat = date => moment(date).format('DD/MM/YYYY');
export const timeDate = date => moment(date).format('HH:mm');
export const agoFormat = date => moment(date).fromNow();
