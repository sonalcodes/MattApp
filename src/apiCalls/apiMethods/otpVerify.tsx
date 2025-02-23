import {showToastMessage} from '@utils/helpers';
import axios from 'src/axios.interceptor';

interface otpVerifyDataType {
  email: string;
  otp: string;
  verification?: boolean;
  dob?: string;
}

export const otpVerifyApiCall = async (otpVerifyData: otpVerifyDataType) => {
  const apiEndpoint = '/auth/verify-otp';
  // console.log('otpVerifyData', otpVerifyData);

  if (!otpVerifyData.email || !otpVerifyData.otp) {
    showToastMessage('error', 'User Data is required');
    throw new Error('User data is required');
  }
  let apiData;
  if (otpVerifyData.verification) {
    apiData = {
      ...otpVerifyData,
    };
  } else {
    apiData = {
      ...otpVerifyData,
    };
  }
  try {
    const response = await axios.post(apiEndpoint, apiData);

    if (response?.data?.success) {
      return response.data;
    } else {
      throw new Error(response?.data?.message);
    }
  } catch (error) {
    console.log('catch error', error);
  }
};
