import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Platform} from 'react-native';
import Config from 'react-native-config';
import {store} from '@redux/store';
import {logout, selectLoading} from '@redux/authSlice';
import {showToastMessage} from '@utils/helpers';
const PRODUCTION = true;
const baseUrl = PRODUCTION
  ? Config.PRODUCTION_URL + 'api'
  : Platform.OS === 'android'
  ? 'http://10.0.2.2:8083' + '/api'
  : Config.DEVELOPMENT_URL + '/api';
// const baseUrl = 'https://119c-122-176-137-159.ngrok-free.app/api';
console.log(Platform.OS, baseUrl, '===>baseUrl');
// console.log(Config.DEVELOPMENT_URL, '===>Config.PRODUCTION_URL');

const api = axios.create({
  baseURL: baseUrl,
});

// Add a request interceptor
api.interceptors.request.use(
  async config => {
    config.headers.origin = PRODUCTION ? Config.PRODUCTION_URL : 8083;
    const token = await AsyncStorage.getItem('userData');

    // Add the token to the Authorization header
    if (token) {
      const parsedToken = JSON.parse(token)?.accessToken;
      config.headers.Authorization = `Bearer ${parsedToken}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

api.interceptors.response.use(
  response => {
    // console.log('response===>', response?.data);
    return response;
  },
  error => {
    console.log('RESPERROR===>', error?.response?.data);
    handleError(error);
    if(error?.response?.data?.message == 'Unauthorized'){
      console.log('Unauthorized ======');
      store.dispatch(logout());
    }
    if (error?.response?.data?.logoutPatient) {
      store.dispatch(logout());
      // return error;
    }
    return error;
  },
);

const handleError = (error: any) => {
  console.log('handleError', error?.response?.status);
  store.dispatch(selectLoading(false));
  if (error.response) {
    switch (error.response.status) {
      case 400:
        showToastMessage(
          'error',
          error?.response?.data?.message ||
            'Bad Request. Please check your input data.',
        );
        break;
      case 401:
        showToastMessage(
          'error',
          error?.response?.data?.message ||
            'Unauthorize user! Please Login Again.',
        );
        store.dispatch(logout());
        break;
      case 403:
        showToastMessage(
          'error',
          error?.response?.data?.message || 'Invalid Credentials.',
        );
        break;
      case 404:
        showToastMessage(
          'error',
          error?.response?.data?.message || 'Not found.',
        );
        store.dispatch(logout());
        break;
      case 410:
        showToastMessage(
          'error',
          error?.response?.data?.message || 'Resource No Longer Available.',
        );
        break;
      case 500:
        showToastMessage('error', 'Internal Server Error.');
        break;
      default:
        break;
    }
  } else {
    showToastMessage('error', 'Network Request Failed! Try again later.');
    throw new Error('Network Request Failed! Try again later.');
  }
};

export default api;
