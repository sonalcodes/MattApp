import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import color from '@theme/colors';

export const styles = StyleSheet.create({
  inputView: {
    marginTop: scale(20),
  },
  text: {
    color: color.Black,
    fontSize: scale(14),
    marginLeft: scale(4),
    alignSelf: 'flex-start',
    marginVertical: scale(2),
  },
  loginButtonView: {
    alignSelf: 'center',
    marginTop: scale(10),
    flexDirection: 'row',
  },
  greenText: {
    color: color.Primary,
  },
});
