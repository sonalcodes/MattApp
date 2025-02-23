import React, {useRef, useEffect} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {scale} from 'react-native-size-matters';
import {validateNumberInput} from '@utils/helpers';
import color from '@theme/colors';
import { fonts } from '@src/theme/fonts';

export interface IOTPInputProps {
  values: string[];
  setValues: (strings: string[]) => void;
}

const NUMBER_OF_INPUTS = 4;

export function OTPInputField(props: IOTPInputProps) {
  const {values, setValues} = props;
  const isFocused = useIsFocused();
  const itemsRef = useRef<Array<TextInput | null>>([]);
  const [editableIndexes, setEditableIndexes] = React.useState<Array<boolean>>([
    true,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    const firstUnfilledIndex = values.findIndex(value => value === '');
    if (isFocused && firstUnfilledIndex !== -1) {
      const inputToFocus = itemsRef.current[firstUnfilledIndex];
      if (inputToFocus) {
        inputToFocus.focus();
      }
    }
  }, [isFocused, values]);

  const handleKeyPress = (index: number, key: string) => {
    if (key === 'Backspace' || key === 'Delete') {
      const newValues = [...values];
      if (index > 0 && newValues[index] === '') {
        const previousInput = itemsRef.current[index - 1];
        if (previousInput) {
          newValues[index - 1] = '';
          previousInput.focus();
        }
      }
      newValues[index] = '';
      setValues(newValues);
    }
  };

  const handleTextInputChange = (text: string, index: number) => {
    const newValues = [...values];
    newValues[index] = text;
    setValues(newValues);
    if (index < NUMBER_OF_INPUTS - 1) {
      setEditableIndexes(prevEditableIndexes => {
        prevEditableIndexes[index + 1] = true;
        return prevEditableIndexes;
      });
    }
  };
  const handleTextChange = (text: string, index: number) => {
    if (validateNumberInput(text)) {
      // The input contains only numeric characters, so update the state
      handleTextInputChange(text, index);
    } else {
      return;
    }
  };

  return (
    <View style={styles.otpView}>
      {Array.from({length: NUMBER_OF_INPUTS}, (_, index) => (
        <TextInput
          style={styles.textinput}
          ref={el => (itemsRef.current[index] = el)}
          key={index}
          keyboardType={'numeric'}
          placeholder={''}
          value={values[index]}
          defaultValue=""
          maxLength={1}
          onChangeText={text => handleTextChange(text, index)}
          onKeyPress={event => {
            handleKeyPress(index, event.nativeEvent.key);
          }}
          textContentType="oneTimeCode"
          autoFocus={index === 0 && values[index] === ''}
          editable={editableIndexes[index]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  otpView: {
    marginVertical: scale(20),
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textinput: {
    borderWidth: 1,
    height: scale(50),
    width: scale(50),
    textAlign: 'center',
    borderRadius: scale(10),
    justifyContent: 'center',
    borderColor: color.InputBorder,
    fontSize: scale(14),
    color: color.Black,
    fontFamily:fonts.Regular
  },
});
