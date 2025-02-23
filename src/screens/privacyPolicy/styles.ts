import {StyleSheet} from 'react-native';
import {moderateScale, scale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  main: {
    flexGrow: 1,
    padding: scale(15),
  },
  centerHeading: {
    alignSelf: 'center',
    fontSize: moderateScale(24),
    marginBottom: scale(10),
  },
  sideHeading: {
    alignSelf: 'flex-start',
    marginVertical: scale(5),
  },
  lightHeading: {
    color: 'rgba(52,52,52,0.8)',
    textAlign: 'justify',
  },
});
