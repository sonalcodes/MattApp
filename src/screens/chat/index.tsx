import {View, Alert, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackHeader from '@commonComponents/backHeader';
import {styles} from './style';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '@utils/types';
import {Bubble, Composer, GiftedChat, IMessage} from 'react-native-gifted-chat';
import api from '@src/apiCalls';
import {getUserDataFromGlobalStorage} from '@utils/helpers';
import color from '@src/theme/colors';
import {scale} from 'react-native-size-matters';
import Label from '@commonComponents/label';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { fonts } from '@src/theme/fonts';
import { Text } from 'react-native';

type ChatRouteProp = RouteProp<RootStackParamList, 'Chat'>;

export interface User {
  _id: string | number;
  name?: string;
  avatar?: string | number;
}

export interface apiMessage {
  _id: string | number;
  text: string;
  createdAt: Date | number;
  user: User;
  type: string | undefined;
}

const Chat = ({route}: {route: ChatRouteProp}) => {
  const {name} = route?.params?.item;
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [hasSentScore, setHasSentScore] = useState<boolean>(false);
  const [dailyTextMessage, setDailyTextMessage] = useState<boolean>(true);

  const userData = getUserDataFromGlobalStorage();

  useEffect(() => {
    const fetchmessages = async () => {
      try {
        const response = await api.getMessageApiCall();
        if (response) {
          const apiMessages = response.messages;
          setHasSentScore(response.hasSentScore);
          setDailyTextMessage(response.dailyTextMessage);
          // Format the response data into the shape expected by GiftedChat
          const formattedMessages = apiMessages.map((message: apiMessage) => {
            return {
              _id: message._id,
              text: message.text,
              createdAt: new Date(message.createdAt), // Convert to Date object
              user: {
                _id: message.type !== 'SYSTEM' ? userData.email : 'SYSTEM',
              },
            };
          });
          setMessages(formattedMessages);
        }

        // Update the state with the formatted messages
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchmessages(); // Call the async function immediately
  }, []);

  const onSend = async (newMessages: IMessage[] = []) => {
    const enteredText = newMessages[0]?.text;
    const isValid = /^(10|[0-9])\s*,\s*(10|[0-9])$/.test(enteredText);
    // Update the chat messages with the new messages
    if (isValid) {
      // Update the chat messages with the new messages
      setHasSentScore(true);
      try {
        const response = await api.sendMessageApiCall(enteredText);
        const badgeCount = await api.getNotificationCount();
        if (Platform.OS === 'android') {
          PushNotification.setApplicationIconBadgeNumber(badgeCount);
          PushNotification.getApplicationIconBadgeNumber(count => {
            console.log(count, 'android');
          });
        } else {
          PushNotificationIOS.setApplicationIconBadgeNumber(badgeCount);
          PushNotificationIOS.getApplicationIconBadgeNumber(count => {
            console.log(count, 'ios');
          });
        }
        if (response) {
          setMessages(prevMessages =>
            GiftedChat.append(prevMessages, newMessages),
          );
        }
      } catch (error) {
        console.log('catch', error);
      }
    } else {
      Alert.alert(
        'Invalid Format',
        'Please enter the message in the format: "2,5" \n input range: 0-10',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      );
    }
  };
  return (
    <View style={styles.chatScreen}>
      <BackHeader title={name} borderBottom={0.5} />
      {dailyTextMessage ? (
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: userData && userData.email,
          }}
          renderTime={(props) => {
            const createdAt = props?.currentMessage?.createdAt;
            if (!createdAt) return null; // Add a null check
            const formattedTime = new Date(createdAt.toString()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            return (
              <Text style={[styles.timeText,{
                color:props.currentMessage?.user._id=='SYSTEM'?color.Black:color.White
              }]}>
                {formattedTime}
              </Text>
            );
          }}
          
          renderAvatar={null}
          renderBubble={props => {
            const isLastMessage = props.currentMessage === messages[0];
            // Change background color for the left and right side messages
            return (
              <View
                style={{
                  marginBottom:
                    hasSentScore && isLastMessage ? scale(40) : scale(5),
                }}>
                <Bubble
                  {...props}
                  wrapperStyle={{
                    right: {
                      backgroundColor: color.Primary, // Green color for right side
                      marginBottom: scale(10),
                    },
                    left: {
                      marginBottom: scale(5),
                    },
                  }}
                  textStyle={
                    {
                      left:{
                        fontFamily:fonts.Regular
                      },
                      right:{
                        fontFamily:fonts.Regular
                      }
                    }
                  }
                />
              </View>
            );
          }}
          renderComposer={composerProps => (
            <Composer
              {...composerProps}
              composerHeight={scale(35)}
              placeholder="Please enter your scores, e.g. 4,6"
              disableComposer={hasSentScore}
              textInputStyle={styles.composer}
            />
          )}
        />
      ) : (
        <View style={styles.centerView}>
          <Label
            labelStyle={styles.text}
            name={
              'Your daily text is disabled by the doctor. \n Please do contact with the doctor.'
            }
          />
        </View>
      )}
      {hasSentScore && (
        <View style={styles.alreadySentScoreContainer}>
          <Label labelStyle={styles.alreadySentScoreText} name={"You have submitted today's scores"}/>
        </View>
      )}
    </View>
  );
};

export default Chat;
