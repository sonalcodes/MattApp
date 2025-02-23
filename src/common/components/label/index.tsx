import {Text, TextStyle} from 'react-native';
import React, {FC} from 'react';
import {styles} from './style';

interface Props {
  name: string;
  labelStyle?: TextStyle | TextStyle[];
  onPress?: () => void;
  numberOfLines?: number;
}

const Label: FC<Props> = ({name, labelStyle, onPress, numberOfLines}) => {
  const mergedStyles = Array.isArray(labelStyle)
    ? Object.assign({}, ...labelStyle)
    : labelStyle;

  return (
    <Text
      numberOfLines={numberOfLines}
      style={[styles.txtStyle, mergedStyles]}
      onPress={onPress}>
      {name}
    </Text>
  );
};

export default Label;
