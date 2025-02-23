import {showToastMessage} from '@utils/helpers';
import axios from 'src/axios.interceptor';

interface updateTimezoneDataType {
  email: string;
  timezone: string;
}

export const updateTimezoneApiCall = async (
  userData: updateTimezoneDataType,
) => {
  if (!userData.email || !userData.timezone) {
    showToastMessage('error', 'Email is required field.');
    throw new Error('Email and password are required');
  }

  const apiEndpoint = '/patient/update-timezone';
  try {
    const response = await axios.post(apiEndpoint, userData);

    if (response?.data?.success) {
      return response.data;
    } else {
      throw new Error(response?.data?.message);
    }
  } catch (error) {
    console.log('error', error);
  }
};
