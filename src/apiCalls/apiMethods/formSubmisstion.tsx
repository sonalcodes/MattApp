import {showToastMessage} from '@utils/helpers';
import axios from 'src/axios.interceptor';

export const formSubmissionApiCall = async (
  data: any,
) => {
  const apiEndpoint = '/questionnaires';

  if (!data) {
    showToastMessage('error', 'form data is required!');
    throw new Error('form data is required');
  }
  
  try {
    const response = await axios.post(apiEndpoint, data);

    if (response?.data?.success) {
      return response.data;
    } else {
      throw new Error(response?.data?.message);
    }
  } catch (error) {
    console.log('error', error);
  }
};
