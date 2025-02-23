import {View, TextInput, Keyboard} from 'react-native';
import React, {useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {styles} from './style';
import {showToastMessage, validateEmail} from '@utils/helpers';
import WrapComponent from '@commonComponents/wrapper';
import {commonStyles} from '@commonStyles/index';
import BackHeader from '@commonComponents/backHeader';
import Logo from '@commonComponents/logo';
import Heading from '@commonComponents/heading';
import Label from '@commonComponents/label';
import Textinput from '@commonComponents/input';
import CustomButton from '@commonComponents/button';
import icon from '@utils/images';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@utils/types';
import {useAppSelector} from '@src/redux/hooks';
import {loader, selectLoading} from '@src/redux/authSlice';
import {useDispatch} from 'react-redux';
import api from '@src/apiCalls';
import Loader from '@commonComponents/loader';

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>('');
  const emailRef = useRef<TextInput>(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const loading = useAppSelector(loader);
  const dispatch = useDispatch();
  const handleLoginClick = async () => {
    if (!email?.trim()) {
      showToastMessage('error', 'Pleae enter email Id');
      return;
    }
    if (!validateEmail(email)) {
      showToastMessage('error', 'Please enter valid Email Id');
      return;
    }
    try {
      dispatch(selectLoading(true));
      // Call the OTP verification API
      const apiData = {
        email: email.toLowerCase(),
        resend: true,
      };
      const response = await api.forgotPasswordApiCall(apiData);

      // If the API call is successful
      if (response) {
        dispatch(selectLoading(false));
        showToastMessage('success', 'OTP has been sent to', email);
        // Navigate to ChangePassword screen with parameters
        navigation.navigate('Verification', {
          email: email.toLowerCase(),
        });
      } else {
        dispatch(selectLoading(false));
      }
    } catch (error) {
      dispatch(selectLoading(false));
      console.log('catch error', error);
      showToastMessage('error', (error as {message: string})?.message);
      // Handle errors if the API call fails
    }
  };
  return (
    <WrapComponent>
      <View style={commonStyles.main}>
        <Loader Visible={loading} />
        <BackHeader />
        <Logo source={icon.AppLogo} />
        <Heading name="Forgot Your Password?" labelStyle={styles.heading} />
        <Label
          name="Enter your email, we will send you confirmation code"
          labelStyle={styles.text}
        />
        <Textinput
          leftIcon="mail"
          placeholder="Enter email"
          onChangeText={text => setEmail(text)}
          value={email}
          inputRef={emailRef}
          onSubmitEditing={() => {
            Keyboard.dismiss();
          }}
          nextButton={'next'}
          rightIcon={validateEmail(email)}
        />
        <CustomButton
          btnStyle={commonStyles.button}
          name="Send Reset Email"
          onClick={handleLoginClick}
        />
      </View>
    </WrapComponent>
  );
};

export default ForgotPassword;
