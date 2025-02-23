import React, {useEffect} from 'react';
import {Platform, SafeAreaView, StatusBar} from 'react-native';
import {Navigation} from '@src/navigation';
import Toast from 'react-native-toast-message';
import color from '@src/theme/colors';
import {Provider} from 'react-redux';
import {store} from '@src/redux/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {RootStackParamList} from '@utils/types';
import SplashScreen from 'react-native-splash-screen';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import api from '@src/apiCalls';

function App() {
  const navigationRef = createNavigationContainerRef<RootStackParamList>();

  const backgroundStyle = {
    flex: 1,
    backgroundColor: color.White,
  };

  useEffect(() => {
    setTimeout(async () => {
      SplashScreen.hide();
    }, 1000);
  });

  async function onDisplayNotification(
    data: FirebaseMessagingTypes.RemoteMessage,
  ) {
    Toast.show({
      type: 'success',
      text1: data?.notification?.title,
      text2: data?.notification?.body,
      visibilityTime: 4000,
      onPress: () => {
        Toast.hide();
        const item = {id: 1, name: 'Daily mood & anxiety score'};
        console.log('df');
        if (data?.data?.type === 'questionnaires') {
          const route = data?.data?.chartName as
            | 'NSESSS'
            | 'PHQ-9'
            | 'Y-BOCS'
            | 'QIDS'
            | 'C-SSRS'
            | 'ACE'
            | 'RRS-10'
            | 'GAD-7';
          console.log('route', route);
          navigationRef.current?.navigate(route);
        } else {
          navigationRef.current?.navigate('Chat', {item});
        }
      },
    });
  }
  useEffect(() => {
    messaging()
      .getInitialNotification()
      .then(async remoteMessage => {
        // console.log(remoteMessage,'remote');

        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          const item = {id: 1, name: 'Daily mood & anxiety score'};
          if (remoteMessage?.data?.type === 'questionnaires') {
            const route = remoteMessage?.data?.chartName as
              | 'NSESSS'
              | 'PHQ-9'
              | 'Y-BOCS'
              | 'QIDS'
              | 'C-SSRS'
              | 'ACE'
              | 'RRS-10'
              | 'GAD-7';
            console.log('route', route);
            setTimeout(() => {
              navigationRef.current?.navigate(route);
            }, 2000);
          } else {
            setTimeout(() => {
              navigationRef.current?.navigate('Chat', {item});
            }, 2000);
          }
        }
      });
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // console.log('----remoteMessage----->', remoteMessage);
      try {
        const badgeCount = await api.getNotificationCount();
        console.log(badgeCount, 'badgeCount onmessage');
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
      onDisplayNotification(remoteMessage);
    });
    return unsubscribe;
  }, [navigationRef]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <GestureHandlerRootView style={backgroundStyle}>
        <Provider store={store}>
          <NavigationContainer ref={navigationRef}>
            <Navigation />
          </NavigationContainer>
        </Provider>
      </GestureHandlerRootView>

      <Toast />
    </SafeAreaView>
  );
}

export default App;
