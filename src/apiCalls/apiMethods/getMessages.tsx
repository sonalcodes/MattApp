import axios from 'src/axios.interceptor';

export const getMessageApiCall = async () => {
  const apiEndpoint = '/message';
  try {
    const response = await axios.get(apiEndpoint);

    if (response?.data?.success) {
      return {
        messages: response.data?.result,
        hasSentScore: response.data?.hasSentScore,
        dailyTextMessage: response.data.dailyTextMessage,
      };
    } else {
      throw new Error(response?.data?.message);
    }
  } catch (error) {
    console.log('error', error);
  }
};
