/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import api from '@src/apiCalls';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  try {
    const badgeCount = await api.getNotificationCount();
    console.log(badgeCount, 'badgeCount index.js', typeof(badgeCount));
    if (Platform.OS === 'android') {
      PushNotification.setApplicationIconBadgeNumber(badgeCount);
      PushNotification.getApplicationIconBadgeNumber(count => {
        console.log(count, 'android');
      });
    } 
    else {
      PushNotificationIOS.setApplicationIconBadgeNumber(badgeCount);
      PushNotificationIOS.getApplicationIconBadgeNumber(count => {
        console.log(count, 'ios');
      });
    }
  } catch (error) {
    console.log('catch error', error);
  }
});

AppRegistry.registerComponent(appName, () => App);
