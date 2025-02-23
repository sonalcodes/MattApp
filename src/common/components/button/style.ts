import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import color from '@theme/colors';
import { fonts } from '@src/theme/fonts';

export const styles = StyleSheet.create({
  btn: {
    width: '98%',
    backgroundColor: color.Primary,
    alignSelf: 'center',
    height: scale(46),
    borderRadius: scale(17),
    elevation: scale(4),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(30),
  },
  btnTxt: {
    color: color.White,
    fontSize: scale(15),
    fontFamily:fonts.Regular
  },
});
