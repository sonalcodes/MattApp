import {showToastMessage} from '@utils/helpers';
import axios from 'src/axios.interceptor';

export const sendMessageApiCall = async (text: string) => {
  if (!text) {
    showToastMessage('error', 'Message field is required');
    throw new Error('Message field is required');
  }
  const apiData = {message: text};
  const apiEndpoint = '/message/send';
  try {
    const response = await axios.post(apiEndpoint, apiData);
    console.log(response.data);

    if (response?.data?.success) {
      return response.data?.success;
    } else {
      throw new Error(response?.data?.message);
    }
  } catch (error) {
    console.log('error', error);
  }
};
