import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {commonStyles} from '@commonStyles/index';
import {scale} from 'react-native-size-matters';
import HeaderWithText from '@commonComponents/header';
import Label from '@commonComponents/label';
import {PHQForm1, PHQForm2} from '@utils/staticData';
import color from '@src/theme/colors';
import CustomButton from '@commonComponents/button';
import Check from 'react-native-vector-icons/AntDesign';
import Loader from '@commonComponents/loader';
import {useAppSelector} from '@src/redux/hooks';
import {loader} from '@src/redux/authSlice';
import {handleFormSubmission} from '@utils/helpers';
import { useNavigation } from '@react-navigation/native';

interface dataProps {
  id: number;
  question: string;
  value: number | null;
}

interface dataPropsForm2 {
  id: number;
  question: string;
  value: null;
}

const PHQForm = () => {
  const [form1, setForm1] = useState<dataProps[]>(
    JSON.parse(JSON.stringify(PHQForm1)),
  );
  const [form2, setForm2] = useState<dataPropsForm2[]>(
    JSON.parse(JSON.stringify(PHQForm2)),
  );
  const [total, setTotal] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const navigation = useNavigation()
  // const [form2, setForm2] = useState(QIDSForm2);
  const loading = useAppSelector(loader);
  const options = [
    `Not at all`,
    `Several days`,
    `More than half the days`,
    `Nearly every day`,
  ];

  useEffect(() => {
    //  check that each row and one of the bottom checkboxes are checked
    const submitDisabled = form1.find(row => row.value === null);

    const submitDisabled2 = form2.find(question => question.value !== null);

    if (submitDisabled || !submitDisabled2) setDisabled(true);
    else setDisabled(false);
  }, [form1, form2]);

  const checkStatus = (total: number) => {
    let text;
    switch (true) {
      case total === 0:
        text = '';
        break;
      case total < 5:
        text = '(Minimal depression)';
        break;
      case total < 10:
        text = '(Mild depression)';
        break;
      case total < 15:
        text = '(Moderate depression)';
        break;
      case total < 20:
        text = '(Moderately severe depression)';
        break;
      default:
        text = '(Severe depression)';
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

  // Function for selecting Option

  const selectOption = (itemIndex: number, OptionIndex: number) => {
    console.log('itemIndex-->>', itemIndex);
    const copy = [...form1];
    copy[itemIndex].value = OptionIndex;
    setForm1(copy);
    calculateTotal();
  };

  const selectExperience = (itemIndex: number, val: any) => {
    console.log('Val in Select exp-->>', val);
    //Copied the array
    const copy = [...form2];

    //As only one opton should be Ticked
    //Checking if already any option ticked , making it null

    let alreadyClickIndex = copy?.findIndex(i => i.value === 'yes');
    if (alreadyClickIndex >= 0) {
      copy[alreadyClickIndex].value = null;
    }
    // Update the selected value
    copy[itemIndex].value = val;
    setForm2(copy);
  };

  const submitHandler = async (formType: 'PHQ-9', dataObj: object) => {
    let values1 = form1.map(item => ({
      question: item.question,
      value: item.value !== null ? item.value : undefined,
    }));

    let values2 = form2.map(item => ({
      question: item.question,
      value: item.value !== null ? true : null,
    }));

    let interpretation = checkStatus(total);

    let postData = {
      chartTitle: 'PHQ-9',
      values: {
        values: values1,
        values2: values2,
        interpretation: interpretation,
      },
      score: total,
    };

    await handleFormSubmission(formType, postData);
    navigation.goBack()
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
        <Label
          name={`Total = ${total}/27${checkStatus(total)}`}
          labelStyle={[commonStyles.totalTxt, {marginVertical: scale(10)}]}
        />
        <Label
          name="If you checked any problems, how difficult have they made it for you to do your work, take care of things at home, or get along with other people?"
          labelStyle={[commonStyles.questionTxt, {marginVertical: scale(8)}]}
        />
        <View style={commonStyles.rowBox}>
          {form2?.map((item, index) => {
            return (
              <View key={item?.id} style={{alignItems: 'center'}}>
                <Label
                  name={item?.question}
                  labelStyle={[commonStyles.checkTxt, {fontSize: scale(14)}]}
                />
                <TouchableOpacity
                  onPress={() => selectExperience(index, 'yes')}
                  style={[
                    commonStyles.checkBox,
                    item?.value !== null && {backgroundColor: color.Indigo},
                  ]}>
                  {item?.value !== null && (
                    <Check name="check" color={'white'} size={15} />
                  )}
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        <CustomButton
          name={'Submit'}
          // btnStyle={[commonStyles.submitBtn,{
          //   backgroundColor: disabled?color.LightGray:color.Teal,
          // }]}
          onClick={() =>
            submitHandler('PHQ-9', {
              values: {
                form1,
                form2,
                interpretation: checkStatus(total),
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
          title="Patient Health Questionnaire (PHQ-9)"
          headStyle={commonStyles.headingStyle}
        />
        <Text style={commonStyles.headTxt}>
          Over the <Text style={commonStyles.boldTxt}>last 2 weeks</Text>, how
          often have you been bothered by any of the following problems?{' '}
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

export default PHQForm;

const styles = StyleSheet.create({
  optionBox: {
    width: '72%',
    borderRadius: scale(7),
    borderColor: color.Black,
    borderWidth: 1,
    backgroundColor: color.NewGray,
  },
});
