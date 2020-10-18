/* eslint-disable no-param-reassign */
import axios from 'axios';
import { getToken } from './authService';

class AxiosService {
  axiosInstance = {};

  constructor() {
    this.initInstance();
  }

  initInstance() {
    this.axiosInstance = axios.create({
      baseURL: '/api',
    });
    // Set the header request with the token
    this.axiosInstance.interceptors.request.use((config) => {
      const token = getToken();
      if (token) {
        config.headers['x-auth-token'] = token;
      } else {
        delete config.headers['x-auth-token'];
      }
      return config;
    });

    // check error status and redirect on 500
    this.axiosInstance.interceptors.response.use(null, (error) => {
      const expectedError = error.response
          && error.response.status >= 400
          && error.response.status < 500;

      if (!expectedError) {
        console.log(error);
        window.location = '/500';
      }

      return Promise.reject(error);
    });

    return this.axiosInstance;
  }

  getInstance() {
    return this.axiosInstance || this.initInstance();
  }
}

export default new AxiosService();
