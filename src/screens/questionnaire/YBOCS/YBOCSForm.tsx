import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {commonStyles} from '@commonStyles/index';
import {scale} from 'react-native-size-matters';
import HeaderWithText from '@commonComponents/header';
import Label from '@commonComponents/label';
import color from '@src/theme/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {YBOCSForm1, YBOCSForm2} from '@utils/staticData';
import CustomButton from '@commonComponents/button';
import {ScrollView} from 'react-native';
import {useAppSelector} from '@src/redux/hooks';
import {loader} from '@src/redux/authSlice';
import Loader from '@commonComponents/loader';
import {handleFormSubmission} from '@utils/helpers';
import {useNavigation} from '@react-navigation/native';

interface dataProps {
  id: number;
  question: string;
  answers: string[];
  value: number | null;
}

const YBOCSForm = () => {
  const [form1, setForm1] = useState<dataProps[]>(
    JSON.parse(JSON.stringify(YBOCSForm1)),
  );
  const [total, setTotal] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const loading = useAppSelector(loader);
  const navigation = useNavigation();
  useEffect(() => {
    //  check that each row and one of the bottom checkboxes are checked
    const submitDisabled = form1.find(row => row.value === null);

    if (submitDisabled) setDisabled(true);
    else setDisabled(false);
  }, [form1]);

  const checkStatus = (total: number) => {
    let text;
    switch (true) {
      case total < 8:
        text = '';
        break;
      case total < 16:
        text = 'Mild ';
        break;
      case total < 24:
        text = 'Moderate ';
        break;
      case total < 32:
        text = 'Severe ';
        break;
      default:
        text = 'Extreme ';
    }
    return text;
  };

  const calculateTotal = () => {
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
  };

  const selectOption = (itemIndex: number, OptionIndex: number) => {
    console.log('itemIndex-->>', itemIndex);
    const copy = [...form1];
    copy[itemIndex].value = OptionIndex;
    setForm1(copy);
    calculateTotal();
  };

  // const submitHandler = (formType: string, dataObj: object) => {
  //   let postObj = {
  //     type: formType,
  //     values: {form1},
  //     total: total,
  //   };
  // };
  const submitHandler = async (formType: 'Y-BOCS', dataObj: object) => {
    let postData = {
      chartTitle: formType,
      values: {
        values: form1.map(item => ({
          question: item.question,
          answers: item.answers,
          value: item.value !== null ? item.value : undefined,
        })),
        interpretation: `(${checkStatus(total)} OCD)`,
      },
      score: total,
    };
    await handleFormSubmission(formType, postData);
    navigation.goBack();
  };

  const renderItem = ({item, index}: {item: dataProps; index: number}) => {
    return (
      <>
        <View style={commonStyles.questionBox}>
          <View style={commonStyles.leftBox}>
            <Text style={commonStyles.questionTxt}>{`${item?.question}`}</Text>
          </View>
          <View style={commonStyles.rightBox}>
            <View style={styles.optionBox}>
              {item?.answers?.map((option, optionIndex) => {
                return (
                  <Fragment key={optionIndex}>
                    <TouchableOpacity
                      key={optionIndex}
                      style={[
                        commonStyles.option,
                        {
                          //   alignItems: 'flex-start',
                          paddingHorizontal: scale(9),
                          paddingVertical: scale(7),
                        },
                        item.value === optionIndex && {
                          backgroundColor: color?.Indigo,
                          borderTopLeftRadius: optionIndex === 0 ? scale(6) : 0,
                          borderTopRightRadius:
                            optionIndex === 0 ? scale(6) : 0,
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
                  </Fragment>
                );
              })}
            </View>
          </View>
        </View>
        {index === 4 && (
          <View>
            <Label
              name="The next several questions are about your compulsive behaviors."
              labelStyle={[commonStyles.boldTxt, {marginVertical: scale(8)}]}
            />
            <Label
              name="Compulsions are urges that people have to do something to lessen feelings of anxiety or other discomfort. Often they do repetitive, purposeful, intentional behaviors called rituals. The behavior itself may seem appropriate but it becomes a ritual when done to excess. Washing, checking, repeating, straightening, hoarding and many other behaviors can be rituals. Some rituals are mental. For example, thinking or saying things over and over under your breath."
              labelStyle={[
                commonStyles.questionTxt,
                {marginVertical: scale(8)},
              ]}
            />
          </View>
        )}
      </>
    );
  };

  const FooterView = () => {
    return (
      <>
        <View style={styles.totalView}>
          <Label
            name={`Total: ${total}/40`}
            labelStyle={[commonStyles.totalTxt, {marginVertical: 0}]}
          />
        </View>
        <Text>{total ? `(${checkStatus(total)}OCD)` : null}</Text>
        <CustomButton
          name={'Submit'}
          btnStyle={styles.submitBtn}
          onClick={() =>
            submitHandler('Y-BOCS', {
              values: {
                form1,
                interpretation: `(${checkStatus(total)} OCD)`,
              },
              total,
            })
          }
          disabled={disabled}
        />
        {YBOCSForm2.map((item, index) => {
          return (
            <View key={index.toString()}>
              <View>
                <Text
                  style={[commonStyles.questionTxt, {marginLeft: scale(10)}]}>
                  {item}
                </Text>
              </View>
            </View>
          );
        })}
      </>
    );
  };

  return (
    <View style={[commonStyles.main, {padding: scale(8)}]}>
      <Loader Visible={loading} />
      <ScrollView style={{flex: 1, width: '100%'}} nestedScrollEnabled={true}>
        <HeaderWithText
          title={`Yale Brown Obsessive - Compulsive Scale (Y-BOCS)`}
          headStyle={commonStyles.headingStyle}
        />
        <Label
          name={`Questions 1 to 5 are about your obsessive thoughts`}
          labelStyle={[commonStyles.boldTxt, {marginTop: scale(10)}]}
        />
        <Label
          name="Obsessions are unwanted ideas, images or impulses that intrude on
        thinking against your wishes and efforts to resist them. They
        usually involve themes of harm, risk and danger. Common obsessions
        are excessive fears of contamination; recurring doubts about
        danger, extreme concern with order, symmetry, or exactness; fear
        of losing important things."
          labelStyle={[commonStyles.headTxt, {marginTop: scale(10)}]}
        />
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

export default YBOCSForm;

const styles = StyleSheet.create({
  optionBox: {
    width: '100%',
    borderRadius: scale(7),
    borderColor: color.Black,
    borderWidth: 1,
    backgroundColor: color.NewGray,
  },
  txtStyle: {
    color: color?.Black,
    fontSize: scale(11),
  },
  submitBtn: {
    width: '40%',
    marginBottom: scale(20),
    marginTop: scale(10),
  },
  totalView: {
    marginVertical: scale(12),
    borderTopWidth: scale(1),
    borderBottomWidth: scale(1),
    borderColor: color.NewGray,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
