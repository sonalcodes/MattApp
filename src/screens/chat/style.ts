import {fonts} from '@src/theme/fonts';
import color from '@theme/colors';
import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: color.White,
    paddingTop: scale(10),
  },
  chatScreen: {
    flex: 1,
    height: '100%',
    backgroundColor: color.White,
    paddingTop: scale(10),
  },
  alreadySentScoreContainer: {
    padding: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.BabyBlue, // Set your background color
    alignSelf: 'center',
    bottom: verticalScale(42),
    width: '100%',
    position: 'absolute',
  },
  alreadySentScoreText: {
    fontSize: 16,
    color: color.LightBlack, // Set your text color
    textAlign: 'center',
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {textAlign: 'center'},
  composer: {
    color: color.Black, // Specify your desired text color
    paddingTop: scale(10),
    fontFamily: fonts.Regular,
  },
  timeText: {
    marginHorizontal: moderateScale(10),
    fontFamily: fonts.Regular,
    marginBottom: moderateScale(5),
    fontSize:moderateScale(10),
  },
});
