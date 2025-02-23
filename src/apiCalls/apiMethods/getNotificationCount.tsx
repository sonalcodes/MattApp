import axios from 'src/axios.interceptor';

export const getNotificationCount = async () => {
  const apiEndpoint = '/patient/sendcount';
  try {
    const response = await axios.get(apiEndpoint);
    console.log('count response.data', response.data);
    if (response?.data?.success) {
      return response.data?.count || 0;
    } else {
      throw new Error(response?.data?.message);
    }
  } catch (error) {
    console.log('error', error);
  }
};
