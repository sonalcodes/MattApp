import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import React from 'react';
import color from '@theme/colors';
import {moderateScale, scale} from 'react-native-size-matters';
import {scaleValues} from '@components/MoodAndAnxietyGraph/chartsHelpers';
import {fonts} from '@src/theme/fonts';

const SelectScaleBtns = ({selectedScale, setSelectedScale}) => {
  const ScaleBtn = ({value}) => {
    const {label} = value;
    return (
      <TouchableOpacity
        onPress={() => setSelectedScale(label)}
        style={[
          styles.card,
          {
            backgroundColor:
              selectedScale === label ? color.InfoBlue : color.White,
          },
        ]}>
        <Text
          style={[
            styles.text,
            {
              color: selectedScale === label ? color.White : color.Black,
            },
          ]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.view}>
      {scaleValues.map((item, i) => {
        return <View key={i}>{<ScaleBtn value={item} />}</View>;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
    paddingTop: scale(5),
    paddingLeft: scale(5),
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    width: 'auto',
    padding: moderateScale(10),
    backgroundColor: color.InfoBlue,
    marginBottom: scale(10),
    borderRadius: scale(10),
    marginLeft: scale(10),
    borderStyle: 'solid',
    borderColor: color.InfoBlue,
    borderWidth: scale(1),
  },
  text: {
    color: color.White,
    textAlign: 'center',
    width: 'auto',
    fontFamily: fonts.Regular,
  },
});

export default SelectScaleBtns;
