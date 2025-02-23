import color from '@src/theme/colors';
import { fonts } from '@src/theme/fonts';
import {StyleSheet} from 'react-native';
import { scale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  txtStyle: {
    color: color.Black,
    fontSize:scale(12),
    fontFamily:fonts.Regular
  },
});
