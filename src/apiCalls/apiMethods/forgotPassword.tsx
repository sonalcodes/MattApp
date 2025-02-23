import {showToastMessage} from '@utils/helpers';
import axios from 'src/axios.interceptor';

interface forgotPasswordDataType {
  email: string;
  resend: boolean;
}
export const forgotPasswordApiCall = async (
  forgotPasswordData: forgotPasswordDataType,
) => {
  const apiEndpoint = '/auth/forget-password';
  // console.log('forgotPasswordData', forgotPasswordData);

  if (!forgotPasswordData.email) {
    showToastMessage('error', 'User data is required!');
    throw new Error('User data is required');
  }
  try {
    const response = await axios.post(apiEndpoint, forgotPasswordData);

    if (response?.data?.success) {
      return response.data;
    } else {
      throw new Error(response?.data?.message);
    }
  } catch (error) {
    console.log('error', error);
  }
};
