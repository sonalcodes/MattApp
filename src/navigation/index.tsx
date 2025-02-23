import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  DrawerNavigationProp,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import Login from '@auth/login';
import PassCode from '@auth/passCode';
import ChangePassword from '@auth/changePassword';
import ForgotPassword from '@auth/forgotPassword';
import Home from '@src/screens/home';
import Verification from '@auth/verification';
import {RootStackParamList} from '@utils/types';
import {Alert, Platform} from 'react-native';
import icon from '@utils/images';
import {styles} from './style';
import color from '@src/theme/colors';
import Chat from '@src/screens/chat';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  logout,
  saveUserDetails,
  selectLoading,
  user,
} from '@src/redux/authSlice';
import {useAppSelector} from '@src/redux/hooks';
import api from '@src/apiCalls';
import {showToastMessage} from '@utils/helpers';
import messaging from '@react-native-firebase/messaging';
import AceForm from '@src/screens/questionnaire/ACE/AceForm';
import GADForm from '@src/screens/questionnaire/GAD7/GADForm';
import QIDSForm from '@src/screens/questionnaire/QIDS/QIDSForm';
import PHQForm from '@src/screens/questionnaire/PHQ9/PHQForm';
import RRSForm from '@src/screens/questionnaire/RRS/RRSForm';
import NSESSSForm from '@src/screens/questionnaire/NSESSS/NSESSSForm';
import YBOCSForm from '@src/screens/questionnaire/YBOCS/YBOCSForm';
import CSSRSForm from '@src/screens/questionnaire/CSSRS/CSSRSForm';
import {WithLocalSvg} from 'react-native-svg';
import {moderateScale} from 'react-native-size-matters';
import Menu from 'react-native-vector-icons/Entypo';
import {
  DrawerActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import PrivacyPolicy from '@src/screens/privacyPolicy';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Invalidate FCM token on logout
    const invalidateFcmToken = async () => {
      try {
        await messaging().deleteToken();
        // await AsyncStorage.removeItem('badgeCount');

        if (Platform.OS === 'android') {
          PushNotification.setApplicationIconBadgeNumber(0);
          PushNotification.getApplicationIconBadgeNumber(count => {
            console.log(count, 'android');
          });
          PushNotification.removeAllDeliveredNotifications();
        } else {
          PushNotificationIOS.setApplicationIconBadgeNumber(0);
          PushNotificationIOS.getApplicationIconBadgeNumber(count => {
            console.log(count, 'ios');
          });
          PushNotificationIOS.removeAllDeliveredNotifications();
        }
      } catch (error) {
        console.error('Error deleting FCM token:', error);
      }
    };
    // Dispatch the logout action (assuming you have a logout action)
    dispatch(logout());
    // Invalidate FCM token
    invalidateFcmToken();
  }, [dispatch]);

  return null;
};

const DeleteAccount = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useFocusEffect(() => {
    const invalidateFcmToken = async () => {
      try {
        await messaging().deleteToken();
      } catch (error) {
        console.error('Error deleting FCM token:', error);
      }
    };

    const handleDeleteAccount = async () => {
      dispatch(logout());
      invalidateFcmToken();
    };

    // Show confirmation alert
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'Cancel',
          onPress: () => navigation.goBack(),
          style: 'cancel',
        },
        {text: 'OK', onPress: handleDeleteAccount},
      ],
      {cancelable: false},
    );
  });
  return null;
};

const HeaderTitle = () => (
  // <Image source={icon.AppLogo} style={styles.drawerheader} />
  <WithLocalSvg asset={icon.AppLogo} style={styles.drawerheaderImage} />
);
function DrawerStack() {
  const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();

  const toggleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer()); // Dispatch the toggle drawer action
  };
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTintColor: color.Primary,
        headerTitleAlign: 'center',
        headerTitle: HeaderTitle, // Use the HeaderTitle component here
        headerStyle: styles.drawerheader,
        headerLeft: () => (
          <Menu
            onPress={toggleDrawer}
            name="menu"
            size={moderateScale(20)}
            color={color.Primary}
            style={styles.sideIcon}
          />
        ),
        drawerStyle: styles.drawerWidth,
        drawerLabelStyle: styles.drawerLabel,
      }}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Privacy Policy" component={PrivacyPolicy} />
      <Drawer.Screen name="Delete Account" component={DeleteAccount} />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
}

export function Navigation() {
  const globalUser = useAppSelector(user);
  const dispatch = useDispatch();
  // console.log('globaluser', globalUser);
  useEffect(() => {
    const checkStoredUser = async () => {
      try {
        dispatch(selectLoading(true));
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const parsedUserData = JSON.parse(userData);

          try {
            const response = await api.verifyUserApiCall({
              email: (parsedUserData as {email?: string})?.email || '',
            });
            // console.log('response', response);

            if (response) {
              dispatch(selectLoading(false));
              dispatch(saveUserDetails(parsedUserData));
            }
          } catch (error) {
            dispatch(selectLoading(false));
            console.log(error);
            showToastMessage(
              'error',
              (error as {message: string})?.message + ' Login Again',
            );
            dispatch(logout());
          }
        } else {
          dispatch(selectLoading(false));
          if (Platform.OS === 'android') {
            PushNotification.setApplicationIconBadgeNumber(0);
            PushNotification.getApplicationIconBadgeNumber(count => {
              console.log(count, 'android');
            });
            PushNotification.removeAllDeliveredNotifications();
          } else {
            PushNotificationIOS.removeAllDeliveredNotifications();
            PushNotificationIOS.setApplicationIconBadgeNumber(0);
            PushNotificationIOS.getApplicationIconBadgeNumber(count => {
              console.log(count, 'ios');
            });
          }
        }
      } catch (error) {
        dispatch(selectLoading(false));
        console.log('Error reading user data from AsyncStorage:', error);
      }
    };
    checkStoredUser();
  }, [dispatch]);

  return (
    <>
      <Stack.Navigator
        initialRouteName="PassCode"
        screenOptions={{headerShown: false}}>
        {!globalUser ? (
          <>
            <Stack.Screen name="PassCode" component={PassCode} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="Verification" component={Verification} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
          </>
        ) : (
          <>
            <Stack.Screen name="Drawer" component={DrawerStack} />
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="ACE" component={AceForm} />
            <Stack.Screen name="GAD-7" component={GADForm} />
            <Stack.Screen name="QIDS" component={QIDSForm} />
            <Stack.Screen name="PHQ-9" component={PHQForm} />
            <Stack.Screen name="RRS-10" component={RRSForm} />
            <Stack.Screen name="NSESSS" component={NSESSSForm} />
            <Stack.Screen name="Y-BOCS" component={YBOCSForm} />
            <Stack.Screen name="C-SSRS" component={CSSRSForm} />
          </>
        )}
      </Stack.Navigator>
    </>
  );
}
