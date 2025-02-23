import {Keyboard, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import WrapComponent from '@commonComponents/wrapper';
import {commonStyles} from '@commonStyles/index';
import Logo from '@commonComponents/logo';
import icon from '@utils/images';
import Label from '@commonComponents/label';
import Textinput from '@commonComponents/input';
import CustomButton from '@commonComponents/button';
import {CustomDatePicker} from '@commonComponents/dobPicker';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@utils/types';
import {showToastMessage, validateEmail} from '@utils/helpers';
import api from '@src/apiCalls';
import {useAppSelector} from '@src/redux/hooks';
import {loader, selectLoading} from '@src/redux/authSlice';
import Loader from '@commonComponents/loader';
import {useDispatch} from 'react-redux';
import NotificationPermission from '@components/notificationPermission';

type passCodeProps = {
  code: string;
  email: string;
  dateOfBirth: string;
};

const PassCode = () => {
  const [passCodeValues, setpassCodeValues] = useState<passCodeProps>({
    code: '',
    dateOfBirth: '',
    email: '',
  });
  const {code, dateOfBirth, email} = passCodeValues;

  const loading = useAppSelector(loader);
  const dispatch = useDispatch();

  const handleFieldChange = (fieldName: keyof passCodeProps, text: string) => {
    setpassCodeValues(prevUserData => ({...prevUserData, [fieldName]: text}));
  };
  const codeRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const dobRef = useRef<TextInput>(null);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [passCodeLoader, setPassCodeLoader] = useState<boolean>(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const openDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const handleDateConfirm = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    handleFieldChange('dateOfBirth', formattedDate);
    setIsDatePickerVisible(false);
  };

  const handleValidation = async () => {
    if (!email?.trim()) {
      showToastMessage('error', 'Pleae enter email Id');
      return;
    }
    if (!validateEmail(email)) {
      showToastMessage('error', 'Pleae enter valid Email Id');
      return;
    }
    if (!code?.trim() || code.length !== 10) {
      showToastMessage('error', 'Pleae enter Code of 10 digits');
      return;
    }

    if (!dateOfBirth?.trim()) {
      showToastMessage('error', 'Please enter your Date of Birth');
      return;
    }
    try {
      // dispatch(selectLoading(true));
      setPassCodeLoader(true);
      // Call the OTP verification API
      const apiData = {
        email: email.toLowerCase(),
        otp: code,
        dob: dateOfBirth,
      };
      const response = await api.otpVerifyApiCall(apiData);

      // If the API call is successful
      if (response) {
        // dispatch(selectLoading(false));
        setPassCodeLoader(false);

        // Navigate to ChangePassword screen with parameters
        navigation.navigate('ChangePassword', {
          email: email.toLowerCase(),
        });
        showToastMessage('success', 'OTP Verified!');
      } else {
        // dispatch(selectLoading(false));
        // Handle other cases if needed
        setPassCodeLoader(false);

        showToastMessage('error', 'OTP verification failed. Please try again.');
      }
    } catch (error) {
      // dispatch(selectLoading(false));
      setPassCodeLoader(false);

      console.log(error);
    } finally {
      setPassCodeLoader(false);
      dispatch(selectLoading(false));
    }
  };
  if (loading) {
    return <Loader Visible={loading} />;
  }
  return (
    <WrapComponent>
      <View style={commonStyles.main}>
        <NotificationPermission />
        <Loader Visible={passCodeLoader} />
        <Logo source={icon.AppLogo} />
        <Label name="Your Passcode" labelStyle={styles.text} />
        <Textinput
          leftIcon="dialpad"
          placeholder="Enter Code"
          onChangeText={text => {
            handleFieldChange('code', text);
          }}
          value={code}
          inputRef={codeRef}
          onSubmitEditing={() => {
            if (emailRef.current) {
              emailRef.current.focus();
            }
          }}
          nextButton={'next'}
          rightIcon={code.length === 10}
        />
        <Label name="Email" labelStyle={styles.text} />
        <Textinput
          leftIcon="mail"
          placeholder="Enter email"
          onChangeText={text => {
            handleFieldChange('email', text);
          }}
          value={email}
          inputRef={emailRef}
          onSubmitEditing={() => {
            setIsDatePickerVisible(!isDatePickerVisible);
            Keyboard.dismiss();
          }}
          nextButton={'next'}
          rightIcon={validateEmail(email)}
        />
        <Label name="Date of birth" labelStyle={styles.text} />

        <TouchableOpacity onPress={openDatePicker}>
          <Textinput
            leftIcon="calendar"
            placeholder="DD/MM/YYYY"
            value={dateOfBirth}
            nextButton="done"
            inputRef={dobRef}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            onChangeText={text => handleFieldChange('dateOfBirth', text)}
            rightIcon={dateOfBirth.length > 0}
            editable={false}
            pointerEvents
          />
        </TouchableOpacity>
        <CustomButton
          name="Continue"
          onClick={handleValidation}
          btnStyle={commonStyles.button}
        />
        <View style={styles.loginButtonView}>
          <Label name="Already have credentials ?" labelStyle={styles.text} />
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Label name="Login" labelStyle={[styles.text, styles.greenText]} />
          </TouchableOpacity>
        </View>
      </View>
      <CustomDatePicker
        open={isDatePickerVisible}
        onClose={() => setIsDatePickerVisible(false)}
        onConfirm={handleDateConfirm}
      />
    </WrapComponent>
  );
};

export default PassCode;
