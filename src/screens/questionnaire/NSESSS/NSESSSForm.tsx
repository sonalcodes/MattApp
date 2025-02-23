import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NSESSSForm1} from '@utils/staticData';
import {commonStyles} from '@commonStyles/index';
import {scale} from 'react-native-size-matters';
import HeaderWithText from '@commonComponents/header';
import Label from '@commonComponents/label';
import {TouchableOpacity} from 'react-native';
import color from '@src/theme/colors';
import CustomButton from '@commonComponents/button';
import {useAppSelector} from '@src/redux/hooks';
import {loader} from '@src/redux/authSlice';
import Loader from '@commonComponents/loader';
import {handleFormSubmission} from '@utils/helpers';
import {useNavigation} from '@react-navigation/native';

interface dataProps {
  id: number;
  question: string;
  value: number | null;
}

const NSESSSForm = () => {
  const [form1, setForm1] = useState<dataProps[]>(
    JSON.parse(JSON.stringify(NSESSSForm1)),
  );
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const loading = useAppSelector(loader);
  const navigation = useNavigation();

  const options = [
    'Not at all',
    'A little bit',
    'Moderately',
    'Quite a bit',
    'Extremely',
  ];

  useEffect(() => {
    //  check that each question has an answer
    const submitDisabled = form1.find(row => row.value === null);
    if (submitDisabled) setDisabled(true);
    else setDisabled(false);
  }, [form1]);

  const averageScale = (total: number) => {
    let text;
    switch (true) {
      case total === 0:
        text = '';
        break;
      case total < 2:
        text = '(Mild)';
        break;
      case total < 3:
        text = '(Moderate)';
        break;
      case total < 4:
        text = '(Severe)';
        break;
      default:
        text = '(Extreme)';
    }
    return text;
  };

  const calculateTotal = () => {
    let arrLen = form1.length;
    let totalScore = form1.reduce((acc, item) => {
      const {value} = item;

      // Check if selectedOptionIndex is defined before adding to the total
      if (value !== undefined && value !== null) {
        return acc + value;
      }

      return acc;
    }, 0);
    console.log('Total Score -->>', totalScore);
    setTotal(totalScore);
    let avg = totalScore / arrLen;
    avg = Math.round(avg * 10) / 10;
    console.log('AVERAGE--->>>>>', avg);
    setAverage(avg);
  };

  const selectOption = (itemIndex: number, OptionIndex: number) => {
    console.log('itemIndex-->>', itemIndex);
    const copy = [...form1];
    copy[itemIndex].value = OptionIndex;
    setForm1(copy);
    calculateTotal();
  };

  const submitHandler = async (formType: 'NSESSS', dataObj: object) => {
    let values = form1.map(item => ({
      question: item.question,
      value: item.value !== null ? item.value : null,
    }));

    let interpretation = averageScale(average);

    let postData = {
      chartTitle: 'NSESSS',
      values: {
        values: values,
        average: average,
        interpretation: interpretation,
      },
      score: total,
    };
    await handleFormSubmission(formType, postData);
    navigation.goBack();
  };

  const renderItem = ({item, index}: {item: dataProps; index: number}) => {
    return (
      <View style={commonStyles.questionBox}>
        <View style={commonStyles.leftBox}>
          <Text style={commonStyles.questionTxt}>{`${item?.question}`}</Text>
        </View>
        <View style={commonStyles.rightBox}>
          <View style={styles.optionBox}>
            {options?.map((option, optionIndex) => {
              return (
                <>
                  <TouchableOpacity
                    key={optionIndex}
                    style={[
                      commonStyles.option,
                      {paddingHorizontal: scale(9), paddingVertical: scale(7)},
                      item?.value === optionIndex && {
                        backgroundColor: color?.Indigo,
                        borderTopLeftRadius: optionIndex === 0 ? scale(6) : 0,
                        borderTopRightRadius: optionIndex === 0 ? scale(6) : 0,
                        borderBottomLeftRadius:
                          optionIndex === 4 ? scale(6) : 0,
                        borderBottomRightRadius:
                          optionIndex === 4 ? scale(6) : 0,
                      },
                    ]}
                    onPress={() => selectOption(index, optionIndex)}>
                    <Text
                      style={[
                        commonStyles.optionTxt,
                        item.value === optionIndex && {color: color.White},
                      ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                  {optionIndex !== 4 && (
                    <View
                      style={[
                        commonStyles.hLine,
                        {backgroundColor: color.Black},
                      ]}
                    />
                  )}
                </>
              );
            })}
          </View>
        </View>
      </View>
    );
  };

  const FooterView = () => {
    return (
      <>
        <View style={styles.totalView}>
          <Label
            name={`Total: ${total} / 36`}
            labelStyle={[commonStyles.totalTxt, {marginVertical: 0}]}
          />
        </View>
        <View style={styles.totalView}>
          <Label
            name={`Average: ${average} / 4 ${averageScale(average)}`}
            labelStyle={[commonStyles.totalTxt, {marginVertical: 0}]}
          />
        </View>
        <CustomButton
          name={'Submit'}
          // btnStyle={commonStyles.submitBtn}
          onClick={() =>
            submitHandler('NSESSS', {
              values: {
                form1,
                average,
                interpretation: averageScale(average),
              },
              total,
            })
          }
          disabled={disabled}
        />
      </>
    );
  };

  return (
    <View style={[commonStyles.main, {padding: scale(8)}]}>
      <Loader Visible={loading} />
      <ScrollView style={{flex: 1, width: '100%'}} nestedScrollEnabled={true}>
        <HeaderWithText
          title="National Stressful Events Survey PTSD Short Scale (NSESSS)"
          headStyle={commonStyles.headingStyle}
        />
        <Text style={commonStyles.headTxt}>
          Instructions: People sometimes have problems after extremely stressful
          events or experiences. How much have you been bothered during the
          <Text style={commonStyles.boldTxt}> PAST SEVEN (7) DAYS </Text>
          by each of the following problems that occurred or became worse after
          an extremely stressful event/experience? Please respond to each
          question.
        </Text>

        <FlatList
          data={form1}
          keyExtractor={item => item?.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          style={commonStyles.list}
          ListFooterComponent={FooterView}
        />
      </ScrollView>
    </View>
  );
};

export default NSESSSForm;

const styles = StyleSheet.create({
  optionBox: {
    width: '72%',
    borderRadius: scale(7),
    borderColor: color.Black,
    borderWidth: 1,
    backgroundColor: color.NewGray,
  },
  txtStyle: {
    color: color?.Black,
    fontSize: scale(11),
  },
  totalView: {
    marginVertical: scale(10),
    borderTopWidth: scale(1),
    borderBottomWidth: scale(1),
    borderColor: color.NewGray,
  },
});
