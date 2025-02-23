import {FlatList, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '@utils/types';
import {commonStyles} from '@commonStyles/index';
import Label from '@commonComponents/label';
import api from '@src/apiCalls';
import color from '@src/theme/colors';
import {scale} from 'react-native-size-matters';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';

const QuestionCard = () => {
  const [questionnaireData, setQuestionnaireData] = useState([]);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const hanldeItemClick = (
    name:
      | 'NSESSS'
      | 'PHQ-9'
      | 'Y-BOCS'
      | 'QIDS'
      | 'C-SSRS'
      | 'ACE'
      | 'RRS-10'
      | 'GAD-7',
  ) => {
    navigation.navigate(name);
  };

  const fetchForms = async () => {
    try {
      const response = await api.getFormsApiCall();
      setQuestionnaireData(response);
    } catch (error) {
      console.log('get forms catch', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchForms();
    }, []), // Adding fetchDetails as a dependency
  );

  useEffect(() => {
    messaging()
      .getInitialNotification()
      .then(async remoteMessage => {});
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // console.log('----remoteMessage----->', remoteMessage);
      onDisplayNotification(remoteMessage);
    });
    return unsubscribe;
  }, []);

  async function onDisplayNotification(
    data: FirebaseMessagingTypes.RemoteMessage,
  ) {
    fetchForms();
  }

  const renderItem = ({
    item,
  }: {
    item:
      | 'NSESSS'
      | 'PHQ-9'
      | 'Y-BOCS'
      | 'QIDS'
      | 'C-SSRS'
      | 'ACE'
      | 'RRS-10'
      | 'GAD-7';
  }) => {
    // const {name} = item;

    return (
      <TouchableOpacity
        onPress={() => hanldeItemClick(item)}
        style={commonStyles.card}>
        <Label name={item} labelStyle={commonStyles.text} />
      </TouchableOpacity>
    );
  };
  return (
    <>
      {questionnaireData && questionnaireData.length > 0 && (
        <>
          <Label
            name="Please complete the following"
            labelStyle={styles.questionHeading}
          />

          {/* <FlatList
            data={questionnaireData}
            keyExtractor={(item, i) => i.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          /> */}
          {questionnaireData.map((item, i) => {
            return <Fragment key={i}>{renderItem({item})}</Fragment>;
          })}
        </>
      )}
    </>
  );
};

export default QuestionCard;

const styles = StyleSheet.create({
  questionHeading: {
    color: color.Black,
    fontSize: scale(14),
    marginVertical: scale(5),
    textAlign: 'center',
  },
});
