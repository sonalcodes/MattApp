import {View, TextInput, Keyboard} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  CommonActions,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import {styles} from './style';
import WrapComponent from '@commonComponents/wrapper';
import {commonStyles} from '@commonStyles/index';
import BackHeader from '@commonComponents/backHeader';
import Logo from '@commonComponents/logo';
import icon from '@utils/images';
import Heading from '@commonComponents/heading';
import Label from '@commonComponents/label';
import Textinput from '@commonComponents/input';
import CustomButton from '@commonComponents/button';
import SuccessModal from '@commonComponents/sucessModal';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@utils/types';
import {showToastMessage} from '@utils/helpers';
import api from '@src/apiCalls';
import Loader from '@commonComponents/loader';
import {useAppSelector} from '@src/redux/hooks';
import {loader, selectLoading} from '@src/redux/authSlice';
import {useDispatch} from 'react-redux';

type changePasswordfieldProps = {
  password: string;
  confirmPassword: string;
};

type changePasswordScreenRouteProp = RouteProp<
  RootStackParamList,
  'ChangePassword'
>;

interface changePasswordProps {
  route: changePasswordScreenRouteProp;
}

const ChangePassword = ({route}: changePasswordProps) => {
  const {email} = route.params;

  const [value, setValue] = useState<changePasswordfieldProps>({
    password: '',
    confirmPassword: '',
  });
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const {password, confirmPassword} = value;
  const loading = useAppSelector(loader);
  const dispatch = useDispatch();
  const handleFieldChange = (
    fieldName: keyof changePasswordfieldProps,
    text: string,
  ) => {
    setValue(prevUserData => ({...prevUserData, [fieldName]: text}));
  };
  const inputRef = useRef<TextInput>(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleChangePasswordClick = async () => {
    if (!password?.trim() || !confirmPassword?.trim()) {
      showToastMessage('error', 'Pleae enter All fields');
      return;
    }
    if (password !== confirmPassword) {
      showToastMessage('error', 'Password must be same');
      return;
    }
    try {
      dispatch(selectLoading(true));
      // Call the OTP verification API
      const apiData = {
        email: email.toLowerCase(),
        password: password,
      };
      const response = await api.resetPasswordApiCall(apiData);
      // If the API call is successful
      if (response) {
        setIsModalVisible(true);
        dispatch(selectLoading(false));
        showToastMessage('success', 'Password Setup Successfully!');
      } else {
        dispatch(selectLoading(false));
        // Handle other cases if needed
      }
    } catch (error) {
      dispatch(selectLoading(false));
      console.log(error);
      showToastMessage('error', (error as {message: string})?.message);
      // Handle errors if the API call fails
    }
    setValue({
      password: '',
      confirmPassword: '',
    });
  };
  const handleButtonClick = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Login'}],
        }),
      );
    }, 300);
  };
  return (
    <WrapComponent>
      <View style={commonStyles.main}>
        <Loader Visible={loading} />
        <BackHeader />
        <Logo source={icon.AppLogo} />
        <Heading name="Setup Password" labelStyle={styles.heading} />
        <Label
          name="Create your new password to login"
          labelStyle={styles.text}
        />
        <Textinput
          leftIcon="lock"
          placeholder="Enter new password"
          onChangeText={text => handleFieldChange('password', text)}
          value={password}
          inputRef={inputRef}
          onSubmitEditing={() => {
            if (inputRef?.current) {
              inputRef.current.focus();
            }
          }}
          nextButton={'next'}
          secureEntry
        />
        <Textinput
          leftIcon="lock"
          placeholder="Confirm password"
          onChangeText={text => handleFieldChange('confirmPassword', text)}
          value={confirmPassword}
          inputRef={inputRef}
          onSubmitEditing={() => {
            Keyboard.dismiss();
          }}
          nextButton={'done'}
          secureEntry
        />
        <CustomButton
          name="Setup Password"
          onClick={handleChangePasswordClick}
          btnStyle={commonStyles.button}
        />
        <SuccessModal
          showModal={isModalVisible}
          message="Your passowrd has been successfully changed."
          handleButtonClick={handleButtonClick}
          title="Success"
          buttonText="Go to Login Screen"
        />
      </View>
    </WrapComponent>
  );
};

export default ChangePassword;
