import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from './style';
import WrapComponent from '@commonComponents/wrapper';
import {commonStyles} from '@commonStyles/index';
import BackHeader from '@commonComponents/backHeader';
import Logo from '@commonComponents/logo';
import icon from '@utils/images';
import Heading from '@commonComponents/heading';
import Label from '@commonComponents/label';
import {OTPInputField} from '@components/otpInputField';
import CustomButton from '@commonComponents/button';
import {RootStackParamList} from '@utils/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {showToastMessage} from '@utils/helpers';
import {useAppSelector} from '@src/redux/hooks';
import {loader, selectLoading} from '@src/redux/authSlice';
import {useDispatch} from 'react-redux';
import api from '@src/apiCalls';
import Loader from '@commonComponents/loader';
import {TouchableOpacity} from 'react-native-gesture-handler';

type VerificationScreenRouteProp = RouteProp<
  RootStackParamList,
  'Verification'
>;

interface VerificationProps {
  route: VerificationScreenRouteProp;
}

const Verification = ({route}: VerificationProps) => {
  const {email} = route.params;
  const [resendTimer, setResendTimer] = useState<number>(60); // Set initial timer value in seconds
  const [timerActive, setTimerActive] = useState<boolean>(true);
  const [values, setValues] = React.useState<string[]>(['', '', '', '']);
  const loading = useAppSelector(loader);
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  // const [otp, setOtp] = useState<string>('');

  const startResendTimer = () => {
    setTimerActive(true);
  };

  const resetResendTimer = () => {
    setTimerActive(false);
    setResendTimer(60); // Reset timer to initial value
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (timerActive) {
      intervalId = setInterval(() => {
        setResendTimer(prevTimer => prevTimer - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [timerActive]);

  useEffect(() => {
    if (resendTimer === 0) {
      resetResendTimer();
    }
  }, [resendTimer]);

  const handleResetButtonClick = async () => {
    try {
      dispatch(selectLoading(true));
      // Call the OTP verification API
      const apiData = {
        email: email.toLowerCase(),
        resend: true,
      };
      const response = await api.forgotPasswordApiCall(apiData);
      setValues(['', '', '', '']);
      // If the API call is successful
      if (response) {
        dispatch(selectLoading(false));
        startResendTimer();
        // Navigate to ChangePassword screen with parameters
        showToastMessage('success', 'OTP Sent Again!');
      } else {
        dispatch(selectLoading(false));
      }
    } catch (error) {
      dispatch(selectLoading(false));
      console.log(error);
      showToastMessage('error', (error as {message: string})?.message);
    }
  };
  const handleVerification = async () => {
    const otp = values.join('');
    console.log(otp);

    if (otp?.length !== 4) {
      showToastMessage('error', 'Otp must be filled.');
      return;
    }
    try {
      dispatch(selectLoading(true));
      // Call the OTP verification API
      const apiData = {
        email: email.toLowerCase(),
        otp: otp,
        verification: true,
      };
      const response = await api.otpVerifyApiCall(apiData);

      // If the API call is successful
      if (response) {
        dispatch(selectLoading(false));
        // Navigate to ChangePassword screen with parameters
        showToastMessage('success', 'Otp verified successfully.');
        navigation.navigate('ChangePassword', {
          email: email,
        });
      } else {
        dispatch(selectLoading(false));
        // Handle other cases if needed
      }
    } catch (error) {
      dispatch(selectLoading(false));
      console.log(error);
      showToastMessage('error', (error as {message: string})?.message);
    }
  };

  return (
    <WrapComponent>
      <View style={commonStyles.main}>
        <Loader Visible={loading} />
        <BackHeader />
        <Logo source={icon.AppLogo} />
        <Heading name="Enter Verification Code" labelStyle={styles.heading} />
        <Label
          name="Enter code that we have sent to your email"
          labelStyle={styles.text}
        />
        <Label name={email} labelStyle={styles.text} />
        <OTPInputField values={values} setValues={setValues} />
        {timerActive ? (
          <Label
            name={`Resend OTP in ${resendTimer} seconds`}
            labelStyle={styles.greenText}
          />
        ) : (
          <TouchableOpacity onPress={handleResetButtonClick}>
            <Label name="Resend OTP" labelStyle={styles.greenText} />
          </TouchableOpacity>
        )}

        <CustomButton
          btnStyle={commonStyles.button}
          name="Verify OTP"
          onClick={handleVerification}
        />
      </View>
    </WrapComponent>
  );
};

export default Verification;
