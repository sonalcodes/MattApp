import {StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import {styles} from './style';
import color from '@src/theme/colors';
import { commonStyles } from '@commonStyles/index';

interface Props {
  btnStyle?: ViewStyle|ViewStyle[];
  btnTextStyle?: TextStyle;
  name: string;
  onClick: () => void;
  disabled?: boolean;
}

const CustomButton: FC<Props> = ({
  btnStyle,
  name,
  onClick,
  disabled,
  btnTextStyle,
}) => {
  const mergedStyles = StyleSheet.flatten([styles.btn, commonStyles.submitBtn, {
    backgroundColor: disabled ? color.LightGray : color.Teal,
  }]);
  return (
    <TouchableOpacity
      disabled={disabled ? true : false}
      style={[mergedStyles,{...btnStyle}]}
      onPress={onClick}>
      <Text style={[styles.btnTxt, {...btnTextStyle}]}>{name}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
