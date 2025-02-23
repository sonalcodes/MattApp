import {View, TextInput, Keyboard, TouchableOpacity} from 'react-native';
import React, {useRef, useState} from 'react';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import {showToastMessage, validateEmail} from '@utils/helpers';
import WrapComponent from '@commonComponents/wrapper';
import {commonStyles} from '@commonStyles/index';
import icon from '@utils/images';
import Logo from '@commonComponents/logo';
import Textinput from '@commonComponents/input';
import Label from '@commonComponents/label';
import CustomButton from '@commonComponents/button';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@utils/types';
import {useDispatch} from 'react-redux';
import {loader, saveUserDetails, selectLoading} from '@src/redux/authSlice';
import api from '@src/apiCalls';
import {useAppSelector} from '@src/redux/hooks';
import Loader from '@commonComponents/loader';
import messaging from '@react-native-firebase/messaging';

type loginCodeProps = {
  email: string;
  password: string;
};

const Login = () => {
  const [value, setValue] = useState<loginCodeProps>({
    email: '',
    password: '',
  });
  const {email, password} = value;
  const dispatch = useDispatch();
  const loading = useAppSelector(loader);

  const handleFieldChange = (fieldName: keyof loginCodeProps, text: string) => {
    setValue(prevUserData => ({...prevUserData, [fieldName]: text}));
  };
  const inputRef = useRef<TextInput>(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLoginClick = async () => {
    if (!email?.trim()) {
      showToastMessage('error', 'Pleae enter email Id');
      return;
    }
    if (!validateEmail(email)) {
      showToastMessage('error', 'Pleae enter valid Email Id');
      return;
    }
    if (!password?.trim()) {
      showToastMessage('error', 'Pleae enter your Password');
      return;
    }
    try {
      // Call the login API here
      dispatch(selectLoading(true));
      const token = await messaging().getToken();
      console.log('fcm token', token);
      const apiData = {
        email: email.toLowerCase(),
        password,
        token,
      };

      const data = await api.loginApiCall(apiData);
      // Handle the response as needed
      if (data) {
        // Successful login, navigate to the desired screen
        dispatch(saveUserDetails(data));
        dispatch(selectLoading(false));
        showToastMessage('success', data?.message || 'Login success!');
      } else {
        // Handle unsuccessful login (show an error message, etc.)
        dispatch(selectLoading(false));

        showToastMessage('error', data?.message || 'Login failed');
      }
    } catch (error) {
      // Handle API call error (show an error message, etc.)
      dispatch(selectLoading(false));
      showToastMessage(
        'error',
        (error as {message: string})?.message || 'An error occurred',
      );
    }
  };
  return (
    <WrapComponent>
      <View style={commonStyles.main}>
        <Loader Visible={loading} />
        <Logo source={icon.AppLogo} />
        <Label name="Email" labelStyle={styles.text} />
        <Textinput
          leftIcon="mail"
          placeholder="Enter email"
          onChangeText={text => {
            handleFieldChange('email', text);
          }}
          value={email}
          inputRef={inputRef}
          onSubmitEditing={() => {
            if (inputRef.current) {
              inputRef.current.focus();
            }
          }}
          nextButton={'next'}
          rightIcon={validateEmail(email)}
        />
        <Label name="Password" labelStyle={styles.text} />
        <Textinput
          leftIcon="lock"
          placeholder="Password"
          value={password}
          nextButton="done"
          inputRef={inputRef}
          onSubmitEditing={() => {
            Keyboard.dismiss();
          }}
          onChangeText={text => handleFieldChange('password', text)}
          secureEntry
        />
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Label
            name="Forgot Password"
            labelStyle={[styles.text, styles.forgotText]}
          />
        </TouchableOpacity>

        <CustomButton
          btnStyle={commonStyles.button}
          name="Login"
          onClick={handleLoginClick}
        />
      </View>
    </WrapComponent>
  );
};

export default Login;
