import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import * as sw from './serviceWorker';
import 'react-table/react-table.css';
import 'react-image-crop/dist/ReactCrop.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import IO from './Services/socketService';
// new Socket
IO.init();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

sw.register();
