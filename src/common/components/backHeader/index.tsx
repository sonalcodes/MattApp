import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import color from '@theme/colors';
import Label from '@commonComponents/label';

interface backheaderProps {
  title?: string;
  borderBottom?: number;
  backStyle?:ViewStyle
}
const BackHeader: FC<backheaderProps> = ({title, borderBottom,backStyle}) => {
  const navigation = useNavigation();
  const dynamicBorderStyle = borderBottom
    ? {
        borderBottomWidth: borderBottom,
        borderColor: color.Primary,
      }
    : {};
  return (
    <TouchableOpacity
      style={[styles.main, dynamicBorderStyle,backStyle]}
      onPress={() => navigation.goBack()}>
      <Ionicons name="chevron-back" color={color.Primary} size={scale(26)} />
      {title && (
        <View style={styles.labelView}>
          <Label name={title} labelStyle={styles.text} />
        </View>
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: scale(5),
  },
  labelView: {
    alignItems: 'center',
    flex: 0.9,
  },
  text: {
    color: color.Primary,
    fontSize: scale(14),
    fontWeight: '500',
  },
});
export default BackHeader;
