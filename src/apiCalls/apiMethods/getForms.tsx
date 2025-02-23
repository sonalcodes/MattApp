import axios from 'src/axios.interceptor';

export const getFormsApiCall = async () => {
  const apiEndpoint = '/questionnaires';
  try {
    const response = await axios.get(apiEndpoint);
    if (response?.data?.success) {
      return response.data.questionnaires;
    } else {
      throw new Error(response?.data?.message);
    }
  } catch (error) {
    console.log('error', error);
  }
};
