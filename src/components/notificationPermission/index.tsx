import {Platform, PermissionsAndroid, Alert} from 'react-native';
import {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@utils/types';

const NotificationPermission = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  messaging().onNotificationOpenedApp(async remoteMessage => {
    console.log('remoteMessage',remoteMessage);
    
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    const item = {id: 1, name: 'Daily mood & anxiety score'};
    if(remoteMessage?.data?.type === 'questionnaires'){
      const route = remoteMessage?.data?.chartName as "NSESSS" | "PHQ-9" | "Y-BOCS" | "QIDS" | "C-SSRS" | "ACE" | "RRS-10" | "GAD-7";
      console.log('route',route);
      setTimeout(() => {
        navigation.navigate(route)
      }, 2000);
    }else{
      setTimeout(() => {
      navigation.navigate('Chat', {item});
    }, 2000);
    }
  });

  const checkAndroidNotificationPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        if (granted === PermissionsAndroid.RESULTS.DENIED) {
            // If permission is denied, show alert
            Alert.alert(
                'Notification Permission Denied',
                'To receive notifications, enable notifications in your device settings.',
                [
                    {
                        text: 'OK',
                        onPress: () => console.log('OK Pressed'),
                    },
                ],
                { cancelable: false },
            );
        }
        return granted; // Return permission status
    } catch (error) {
        console.log('Error checking Android notification permission:', error);
        return PermissionsAndroid.RESULTS.DENIED; // Return denied status if error occurs
    }
};

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      checkAndroidNotificationPermission();
    }
    messaging()
      .requestPermission()
      .then(authStatus => {
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (!authStatus&&!enabled) {
          Alert.alert(
            'Notification Permission Denied',
            'To receive notifications, enable notifications in your device settings.',
            [
              {
                text: 'OK',
                onPress: () => console.log('OK Pressed'),
              },
            ],
            {cancelable: false},
          );
        }
        // else {
        //   // Permission granted, get FCM token
        //   messaging().getToken().then((token) => {
        //     console.log(Platform.OS, 'FCM Token:', token);
        //   }).catch((error) => {
        //     console.log('Error getting FCM token:', error);
        //   });
        // }
      })
      .catch(error => {
        console.log('Error requesting permission:', error);
      });
  };
  useEffect(() => {
    const notificationPermission = () => {
      requestPermission();
    };
    notificationPermission();
  });

  return null;
};

export default NotificationPermission;
