import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {QIDSForm1, QIDSForm2} from '@utils/staticData';
import {commonStyles} from '@commonStyles/index';
import {scale} from 'react-native-size-matters';
import HeaderWithText from '@commonComponents/header';
import Label from '@commonComponents/label';
import {TouchableOpacity} from 'react-native-gesture-handler';
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
  answers: string[];
  value: number | null;
  // value: null,
  selectedOptionIndex?: number;
}

const QIDSForm = () => {
  const [form1, setForm1] = useState<dataProps[]>(
    JSON.parse(JSON.stringify(QIDSForm1)),
  );
  const [form2, setForm2] = useState(JSON.parse(JSON.stringify(QIDSForm2)));
  const [total, setTotal] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const loading = useAppSelector(loader);
  const naviagtion = useNavigation();
  const calculateTotal = (values: any) => {
    // 1. Enter the highest score on any 1 of the 4 sleep items (1-4)
    // 2. Item 5
    // 3. Enter the highest score on any 1 appetite/weight item (6-9)
    // 4. Item 10
    // 5. Item 11
    // 6. Item 12
    // 7. Item 13
    // 8. Item 14
    // 9. Enter the highest score on either of the 2 psychomotor items (15 and 16)

    //1.
    const array1 = [];
    for (let i = 0; i < 4; i++) {
      array1.push(values[i].value);
    }
    const highest1to4 = Math.max(...array1);
    // 2.
    const item5 = values[4].value;

    // 3.
    const array2 = [];
    for (let i = 5; i < 9; i++) {
      array2.push(values[i].value);
    }
    const highest6to9 = Math.max(...array2);

    // 4. Item 10
    const item10 = values[9].value;

    // 5. Item 11
    const item11 = values[10].value;

    // 6. Item 12
    const item12 = values[11].value;

    // 7. Item 13
    const item13 = values[12].value;

    // 8. Item 14
    const item14 = values[13].value;

    // 9.
    const array3 = [];
    for (let i = 14; i < 16; i++) {
      array3.push(values[i].value);
    }
    const highest15to16 = Math.max(...array3);

    const allValues = [
      highest1to4,
      item5,
      highest6to9,
      item10,
      item11,
      item12,
      item13,
      item14,
      highest15to16,
    ];

    const sum = allValues.reduce((partialSum, a) => partialSum + a, 0);
    setTotal(sum);
  };

  useEffect(() => {
    if (total) {
      setDisabled(false);
    }
  }, [total]);

  useEffect(() => {
    //  check that no question has a value of null
    const submitDisabled = form1.find(row => row.value === null);

    //todo: check that submit disable is bullet proof
    //only calculate total when no question has a value of null
    if (!submitDisabled) calculateTotal(form1);
    else {
      setTotal(0);
      setDisabled(true);
    }
  }, [form1]);

  const checkStatus = (total: number) => {
    let text;
    switch (true) {
      case total < 6:
        text = 'Normal';
        break;
      case total < 11:
        text = 'Mild';
        break;
      case total < 16:
        text = 'Moderate';
        break;
      case total < 21:
        text = 'Severe';
        break;
      default:
        text = 'Very Severe';
    }
    return text;
  };

  // Function for selecting Option

  const selectOption = (itemIndex: number, OptionIndex: number) => {
    console.log('itemIndex-->>', itemIndex);
    const copy = [...form1];
    copy[itemIndex].value = OptionIndex;
    setForm1(copy);
  };

  // const submitHandler = (formType: string, dataObj: object) => {
  //   let postObj = {
  //     type: formType,
  //     values: {form1, form2},
  //     total: total,
  //   };
  // };
  const submitHandler = async () => {
    // Format the data for backend
    const postData = {
      chartTitle: 'QIDS',
      values: {
        values: form1.map(item => ({
          question: item.question,
          answers: item.answers,
          value: item.value,
        })),
        interpretation: `(${checkStatus(total)} depression)`,
      },
      score: total,
    };
    await handleFormSubmission('QIDS', postData);
    naviagtion.goBack();
  };

  const renderItem = ({item, index}: {item: dataProps; index: number}) => {
    return (
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
                        alignItems: 'flex-start',
                        paddingHorizontal: scale(9),
                        paddingVertical: scale(7),
                      },
                      ,
                      item.value === optionIndex && {
                        backgroundColor: color?.Indigo,
                        borderTopLeftRadius: optionIndex === 0 ? scale(6) : 0,
                        borderTopRightRadius: optionIndex === 0 ? scale(6) : 0,
                        borderBottomLeftRadius:
                          optionIndex === 3 ? scale(6) : 0,
                        borderBottomRightRadius:
                          optionIndex === 3 ? scale(6) : 0,
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
                  {optionIndex !== 3 && (
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
    );
  };

  const FooterView = () => {
    return (
      <>
        <View style={styles.totalView}>
          <Label
            name={`Total: ${total}/27`}
            labelStyle={[commonStyles.totalTxt, {marginVertical: 0}]}
          />
          <Text style={commonStyles.totalTxt}>
            {total ? `(${checkStatus(total)} depression)` : null}
          </Text>
        </View>

        <CustomButton
          name={'Submit'}
          // btnStyle={styles.submitBtn}
          // onClick={() =>
          //   submitHandler('QIDS', {
          //     values: {
          //       form1,
          //       interpretation: `${checkStatus(total)} depression`,
          //     },
          //     total,
          //   })
          // }
          onClick={submitHandler}
          disabled={disabled}
        />
        <Label
          name="Total score is the sum of the following:"
          labelStyle={[commonStyles.questionTxt, {marginVertical: scale(15)}]}
        />

        {QIDSForm2.map((item, index) => {
          return (
            <View key={index.toString()}>
              <View style={styles.pointsView}>
                <Text>{'\u2022'}</Text>
                <Text style={commonStyles.questionTxt}>{item}</Text>
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
          title="Quick Inventory of Depressive Symptomatology (Self-report)(QIDS-SR)"
          headStyle={commonStyles.headingStyle}
        />

        <Text style={commonStyles.headTxt}>
          Please select the one response to each item that best describes you
          for the
          <Text style={commonStyles.boldTxt}> past seven days.</Text>
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

export default QIDSForm;

const styles = StyleSheet.create({
  optionBox: {
    width: '100%',
    borderRadius: scale(7),
    borderColor: color.Black,
    borderWidth: 1,
    backgroundColor: color.NewGray,
    // height:scale(200)
  },
  txtStyle: {
    color: color?.Black,
    fontSize: scale(11),
  },
  submitBtn: {
    backgroundColor: color.Teal,
    width: '40%',
    // marginTop: scale(2),
    // marginBottom: scale(4),
    borderRadius: scale(6),
    marginVertical: scale(20),
  },
  totalView: {
    marginVertical: scale(10),
    borderTopWidth: scale(1),
    borderBottomWidth: scale(1),
    borderColor: color.NewGray,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsView: {
    flexDirection: 'row',
    marginLeft: scale(10),
    gap: scale(2),
  },
});
