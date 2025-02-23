import { fonts } from '@src/theme/fonts';
import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  drawerheaderImage: {
    height: scale(110),
    width: scale(200),
    resizeMode: 'contain',
  },
  drawerheader: {
    height: verticalScale(45),
  },
  sideIcon: {
    marginLeft: scale(10),
  },
  drawerWidth: {
    width: '70%',
  },
  drawerLabel: {
    fontSize: scale(14),
    fontFamily:fonts.SemiBold
  },
});
