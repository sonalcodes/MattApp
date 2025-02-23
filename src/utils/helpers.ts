import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@src/apiCalls';
import {selectLoading} from '@src/redux/authSlice';
import {store} from '@src/redux/store';
import {Platform} from 'react-native';
import Toast from 'react-native-toast-message';

export const isIOS = () => {
  return Platform.OS === 'ios';
};

export const validateEmail = (email: string) => {
  // Regular expression for basic email validation
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
};
export const validateNumberInput = (number: string) => {
  // Regular expression for basic email validation
  const numericPattern = /^[0-9]+$/;
  return numericPattern.test(number);
};

export const showToastMessage = (
  type: 'error' | 'success',
  message: string,
  extraMessage?: string,
) => {
  Toast.show({
    type: type,
    text1: message,
    text2: extraMessage,
  });
};

export interface userDataProps {
  accessToken: string;
  email: string;
  success: boolean;
}
export const getUserDataFromStorage =
  async (): Promise<userDataProps | null> => {
    const userDataString = await AsyncStorage.getItem('userData');
    return userDataString ? JSON.parse(userDataString) : null;
  };

export const getUserAuthToken = async (): Promise<string | null> => {
  const userDataString = await AsyncStorage.getItem('userData');

  // Check if userDataString is not null before parsing
  if (userDataString !== null) {
    const parsedData = JSON.parse(userDataString) as userDataProps; // Type assertion

    // Check if parsedData is not null before accessing auth_token
    return parsedData ? parsedData.accessToken : null;
  }
  // Return null if userDataString is null
  return null;
};

export const getUserDataFromGlobalStorage = () => {
  const data = store.getState().auth.userData;
  return data as unknown as userDataProps;
};

export const handleFormSubmission = async (
  type: 'NSESSS' | 'PHQ-9' | 'Y-BOCS' | 'QIDS' | 'C-SSRS' | 'ACE' | 'RRS-10'|'GAD-7',
  data: any,
) => {
  try {
    store.dispatch(selectLoading(true));
    const response = await api.formSubmissionApiCall(data);
    if (response) {
      store.dispatch(selectLoading(false));
      console.log(response);
      showToastMessage('success',`Form ${type} Submitted Successfully`)
    }
  } catch (error) {
    store.dispatch(selectLoading(false));
    console.log('form submit catch', error);
  } finally {
    store.dispatch(selectLoading(false));
  }
};
