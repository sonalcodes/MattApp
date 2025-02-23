import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootState} from './store';

export interface CounterState {
  userData: null;
  loading: boolean;
}

const initialState: CounterState = {
  userData: null,
  loading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveUserDetails: (state, data) => {
      const newObj = {
        ...data.payload,
      };
      state.userData = newObj;
    },
    logout: state => {
      state.userData = null;
      AsyncStorage.removeItem('userData');
    },
    selectLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {saveUserDetails, logout, selectLoading} = authSlice.actions;
export const loader = (state: RootState) => state.auth.loading;
export const user = (state: RootState) => state.auth.userData;

export default authSlice.reducer;
