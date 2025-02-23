import {showToastMessage} from '@utils/helpers';
import axios from 'src/axios.interceptor';

interface verifyUserDataType {
  email: string;
}
export const verifyUserApiCall = async (verifyUserData: verifyUserDataType) => {
  const apiEndpoint = '/patient/verify-patient';
  // console.log('verifyUserData', verifyUserData);

  if (!verifyUserData.email) {
    showToastMessage('error', 'Data is required');
    throw new Error('data is required');
  }
  try {
    const response = await axios.post(apiEndpoint, verifyUserData);
    // console.log(response.data);

    if (response?.data?.success) {
      return response.data;
    } else {
      throw new Error(response?.data?.message);
    }
  } catch (error) {
    console.log('error', error);
  }
};
