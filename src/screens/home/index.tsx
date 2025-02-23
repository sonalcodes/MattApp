import {LogBox, Platform, ScrollView, View} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {commonStyles} from '@commonStyles/index';
import HomeContainerCard from '@components/homeContainerCard';
import api from '@src/apiCalls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotificationPermission from '@components/notificationPermission';
import {getTimeZone} from 'react-native-localize';
import QuestionCard from '@components/questionCard/QuestionCard';
import {useFocusEffect} from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {showToastMessage} from '@utils/helpers';
import {useAppDispatch} from '@src/redux/hooks';
import {logout} from '@src/redux/authSlice';
import MoodAndAnxietyGraph from '@components/MoodAndAnxietyGraph/MoodAndAnxietyGraph';
//what is this?
interface dataCardProps {
  id: number;
  name: string;
}

const Home = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const updateTimezone = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        try {
          await api.updateTimezoneApiCall({
            email: (parsedUserData as {email?: string})?.email || '',
            timezone: getTimeZone(),
          });
          await api.verifyUserApiCall({
            email: (parsedUserData as {email?: string})?.email || '',
          });
        } catch (error) {
          console.error('Error fetching data:', error);
          showToastMessage(
            'error',
            (error as {message: string})?.message + ' Login Again',
          );
          dispatch(logout());
        }
      }
    };

    updateTimezone(); // Call the async function immediately
  }, []);

  const fetchNotificationCount = async () => {
    try {
      const badgeCount = await api.getNotificationCount();
      console.log(badgeCount, 'badgeCount onmessage');
      if (Platform.OS === 'android') {
        PushNotification.setApplicationIconBadgeNumber(badgeCount);
        PushNotification.getApplicationIconBadgeNumber(count => {
          console.log(count, 'android');
        });
      } else {
        console.log('mai chlya');
        
        PushNotificationIOS.setApplicationIconBadgeNumber(badgeCount);
        PushNotificationIOS.getApplicationIconBadgeNumber(count => {
          console.log(count, 'ios');
        });
      }
    } catch (error) {
      console.log('catch error', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchNotificationCount();
    }, []), // Adding fetchDetails as a dependency
  );

  return (
    <ScrollView>
      <MoodAndAnxietyGraph />
      <View style={commonStyles.main}>
        <HomeContainerCard />
        <QuestionCard />
        <NotificationPermission />
      </View>
    </ScrollView>
  );
};

export default Home;
