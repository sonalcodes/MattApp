import color from '@theme/colors';
import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  text: {
    color: color.Silver,
    fontSize: scale(14),
    marginLeft: scale(4),
    marginVertical: scale(5),
  },
  heading: {
    marginLeft: scale(4),
    marginVertical: scale(5),
  },
  greenText: {
    color: color.Primary,
    alignSelf: 'center',
  },
});
