import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import color from '@theme/colors';

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
});
