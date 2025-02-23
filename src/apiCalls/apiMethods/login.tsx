import AsyncStorage from '@react-native-async-storage/async-storage';
import {showToastMessage} from '@utils/helpers';
import axios from 'src/axios.interceptor';

interface loginDataType {
  email: string;
  password: string;
  token: string;
}

export const loginApiCall = async (loginData: loginDataType) => {
  const apiEndpoint = '/auth/login';
  // console.log('loginData', loginData);

  if (!loginData.email || !loginData.password || !loginData.token) {
    showToastMessage('error', 'Email and password are required');
    throw new Error('Email and password are required');
  }

  try {
    const response = await axios.post(apiEndpoint, loginData);
    // console.log(response.data,'======response.data');

    if (response?.data?.success || response?.data?.accessToken) {
      await AsyncStorage.setItem('userData', JSON.stringify(response?.data));
      return response.data;
    } else {
      throw new Error(response?.data?.message);
    }
  } catch (error) {
    console.log('catch', error);
  }
};
