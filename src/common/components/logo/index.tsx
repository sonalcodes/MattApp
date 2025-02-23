import {ImageSourcePropType, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {scale} from 'react-native-size-matters';
import { WithLocalSvg } from 'react-native-svg';
import icon from '@utils/images';

interface LogoProps {
  source: ImageSourcePropType; // Use ImageSourcePropType for better type safety
}
const Logo: FC<LogoProps> = ({source}) => {
  // return <Image source={source} style={styles.logo} />;
  return <WithLocalSvg asset={icon.AppLogo} style={styles.logo} />
};

const styles = StyleSheet.create({
  logo: {
    height: scale(110),
    width: '90%',
    marginVertical: scale(30),
    alignSelf: 'center',
    resizeMode:'contain',
  },
});
export default Logo;
