import React, {FC, RefObject, useState} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import Eye from 'react-native-vector-icons/Ionicons';
import {scale} from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import color from '@theme/colors';
import { fonts } from '@src/theme/fonts';

interface TextinputProps {
  inputRef: RefObject<TextInput>;
  leftIcon: string;
  secureEntry?: boolean;
  onChangeText: (text: string) => void;
  value: string;
  placeholder?: string;
  nextButton?: TextInputProps['returnKeyType']; // Use TextInputProps['returnKeyType'] type
  onSubmitEditing?: () => void;
  numberOfLines?: number;
  multiline?: boolean;
  height?: number;
  justifyContent?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  paddingTop?: number;
  borderRadius?: number;
  rightIcon?: boolean;
  editable?: boolean;
  keyboardType?: string;
  pointerEvents?: boolean;
}

const Textinput: FC<TextinputProps> = ({
  inputRef,
  leftIcon,
  secureEntry,
  value,
  placeholder,
  nextButton,
  onSubmitEditing,
  onChangeText,
  numberOfLines,
  multiline,
  height,
  justifyContent,
  paddingTop,
  borderRadius,
  rightIcon,
  editable,
  keyboardType,
  pointerEvents,
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <View
      style={[
        styles.container,
        {
          height: height || scale(50),
          justifyContent: justifyContent || 'center',
          paddingTop: paddingTop || 0,
          borderRadius: borderRadius || scale(7),
        },
      ]}>
      <View style={styles.inputWrapper}>
        {leftIcon === 'mail' && (
          <Feather name="mail" style={styles.icon} size={scale(20)} />
        )}
        {leftIcon === 'dialpad' && (
          <MaterialIcons name="dialpad" style={styles.icon} size={scale(20)} />
        )}
        {leftIcon === 'calendar' && (
          <AntDesign name="calendar" style={styles.icon} size={scale(20)} />
        )}
        {leftIcon === 'lock' && (
          <Feather name="lock" style={styles.icon} size={scale(20)} />
        )}

        <TextInput
          pointerEvents={pointerEvents ? 'none' : 'auto'}
          ref={inputRef}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={'#6D7379'}
          onChangeText={onChangeText}
          value={value}
          secureTextEntry={secureEntry && !isPasswordVisible}
          returnKeyType={nextButton}
          onSubmitEditing={onSubmitEditing}
          blurOnSubmit={false}
          numberOfLines={numberOfLines}
          multiline={multiline}
          editable={editable}
          keyboardType={keyboardType ? 'number-pad' : 'default'}
        />
        {secureEntry && (
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Eye
              name={isPasswordVisible ? 'eye' : 'eye-off-outline'}
              size={scale(20)}
              style={styles.icon}
              color={isPasswordVisible ? color.Primary : color.LightGray}
            />
          </TouchableOpacity>
        )}
        {rightIcon && (
          <Feather name="check" size={scale(20)} style={styles.icon} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.InputBackground,
    paddingHorizontal: scale(10),
    maxHeight: scale(120),
    borderWidth: scale(1),
    marginVertical: scale(5),
    borderColor: color.InputBorder,
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingLeft: scale(5),
    color: color.Black,
    fontSize: scale(14),
    fontFamily:fonts.Regular
  },
  icon: {
    marginRight: scale(5),
    color: color.Primary,
  },
});

export default Textinput;
