import {showToastMessage} from '@utils/helpers';
import axios from 'src/axios.interceptor';

interface resetPasswordDataType {
  email: string;
  password: string;
}

export const resetPasswordApiCall = async (
  resetPasswordData: resetPasswordDataType,
) => {
  const apiEndpoint = '/auth/reset-password';
  // console.log('resetPasswordData', resetPasswordData);

  if (!resetPasswordData.email || !resetPasswordData.password) {
    showToastMessage('error', 'User data is required');
    throw new Error('User data is required');
  }
  try {
    const response = await axios.patch(apiEndpoint, resetPasswordData);

    if (response?.data?.success) {
      return response.data;
    } else {
      throw new Error(response?.data?.message);
    }
  } catch (error) {
    console.log('error', error);
  }
};
