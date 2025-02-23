import React, {FC, ReactNode} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StyleSheet,
} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import color from '@theme/colors';

interface WrapComponentProps {
  children: ReactNode;
}

const WrapComponent: FC<WrapComponentProps> = ({children}) => {
  return (
    <KeyboardAvoidingView
      style={styles.main}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? verticalScale(50) : 0}>
      <ScrollView>{children}</ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  main: {flex: 1, backgroundColor: color.White},
});

export default WrapComponent;
