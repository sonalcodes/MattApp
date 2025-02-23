import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {commonStyles} from '@commonStyles/index';
import {scale} from 'react-native-size-matters';
import HeaderWithText from '@commonComponents/header';
import Label from '@commonComponents/label';
import {GADForm1, GADForm2} from '@utils/staticData';
import color from '@src/theme/colors';
import Check from 'react-native-vector-icons/AntDesign';
import CustomButton from '@commonComponents/button';
import { handleFormSubmission } from '@utils/helpers';
import { useAppSelector } from '@src/redux/hooks';
import { loader } from '@src/redux/authSlice';
import Loader from '@commonComponents/loader';
import { useNavigation } from '@react-navigation/native';

interface formDataProps {
  id: number;
  question: string;
  value: string | null; // Make value nullable
  selectedOptionIndex?: number | undefined;
}
interface formDataProps2 {
  id: number;
  question: string;
  value: string | null; // Make value nullable
}
const GADForm = () => {
  const [form1, setForm1] = useState<formDataProps[]>(JSON.parse(JSON.stringify(GADForm1)));
  const [form2, setForm2] = useState<formDataProps2[]>(JSON.parse(JSON.stringify(GADForm2)));
  const [total, setTotal] = useState(0);
  const [disabled, setDisable] = useState(false);
  const navigation = useNavigation()
  const options = [
    'Not at all',
    'Several days',
    `More than half the days`,
    `Nearly every day`,
  ];

  const checkAllChecked = () => {
    const submitDisabled = form1.find(item => item.value === null);
    const submitDisabled2 = form2.find(item => item.value !== null);
    if (submitDisabled || !submitDisabled2) setDisable(true);
    else setDisable(false);
  };
  const loading = useAppSelector(loader)
  useEffect(() => {
    checkAllChecked();
  }, [form1, form2]);

  // Function for calculating total Yes tick
  const calculateTotal = () => {
    let totalScore = form1.reduce((acc, item) => {
      const {selectedOptionIndex} = item;

      // Check if selectedOptionIndex is defined before adding to the total
      if (selectedOptionIndex !== undefined) {
        return acc + selectedOptionIndex;
      }

      return acc;
    }, 0);
    console.log('Total Score -->>', totalScore);

    setTotal(totalScore);
  };

  // Function for selecting Option
  const selectOption = (itemIndex: number, val: any, OptionIndex: number) => {
    console.log('itemIndex-->>', itemIndex);
    const copy = [...form1];
    copy[itemIndex].value = val;
    // New Key is made to compare for option index
    copy[itemIndex].selectedOptionIndex = OptionIndex;
    setForm1(copy);
    calculateTotal();
  };

  // Function for selecting Experience Tick
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

  const checkStatus = (total: number) => {
    let text;
    switch (true) {
      case total < 5:
        text = 'Normal';
        break;
      case total < 10:
        text = 'Mild anxiety';
        break;
      case total < 15:
        text = 'Moderate anxiety';
        break;
      default:
        text = 'Severe anxiety';
    }
    return text;
  };

  const submitHandler = async (formType: 'GAD-7') => {
    let values1 = form1.map(item => ({
      question: item.question,
      value: item.selectedOptionIndex !== undefined || item.selectedOptionIndex!==null ? item.selectedOptionIndex : null
    }));

    let values2 = form2.map(item => ({
      question: item.question,
      value: item.value
    }));

    let interpretation = checkStatus(total);

    let postData = {
      chartTitle: "GAD-7",
      values: {
        values: values1,
        values2: values2,
        interpretation: interpretation
      },
      score: total
    };

    // Now you can append postData to your desired location or perform further actions with it
    await handleFormSubmission(formType, postData);
    navigation.goBack()
  };


  const renderItem = ({item, index}: {item: formDataProps; index: number}) => {
    return (
      <View style={commonStyles.questionBox}>
        <View style={commonStyles.leftBox}>
          <Text style={commonStyles.questionTxt}>{`${item?.question}`}</Text>
        </View>
        <View style={commonStyles.rightBox}>
          <View style={styles.optionBox}>
            {options?.map((option, optionIndex) => {
              return (
                <Fragment key={optionIndex}>
                  <TouchableOpacity
                    key={optionIndex}
                    style={[
                      commonStyles.option,
                      {paddingHorizontal: scale(9), paddingVertical: scale(7)},
                      item?.value === 'selected' &&
                        item?.selectedOptionIndex === optionIndex && {
                          backgroundColor: color?.Indigo,
                          borderTopLeftRadius: optionIndex === 0 ? scale(6) : 0,
                          borderTopRightRadius:
                            optionIndex === 0 ? scale(6) : 0,
                          borderBottomLeftRadius:
                            optionIndex === 3 ? scale(6) : 0,
                          borderBottomRightRadius:
                            optionIndex === 3 ? scale(6) : 0,
                        },
                    ]}
                    onPress={() =>
                      selectOption(index, 'selected', optionIndex)
                    }>
                    <Text
                      style={[
                        commonStyles.optionTxt,
                        item?.value === 'selected' &&
                          item?.selectedOptionIndex === optionIndex && {
                            color: color.White,
                          },
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
        <Label
          name={`Total: ${total}/21 ${checkStatus(total)}`}
          labelStyle={[commonStyles.totalTxt, {marginVertical: scale(8)}]}
        />
        <Label
          name="If you checked any problems, how difficult have they made it for you to do your work, take care of things at home, or get along with other people?"
          labelStyle={[commonStyles.questionTxt, {marginVertical: scale(8)}]}
        />
        <View style={commonStyles.rowBox}>
          {form2?.map((item, index) => {
            return (
              <View
                key={item?.id}
                style={{alignItems: 'center', marginTop: scale(6)}}>
                <Label
                  name={item?.question}
                  labelStyle={[
                    commonStyles.checkTxt,
                    {fontSize: scale(14)},
                  ]}
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
          // btnStyle={commonStyles.submitBtn}
          onClick={() => submitHandler('GAD-7')}
          disabled={disabled}
        />
      </>
    );
  };

  return (
    <View style={[commonStyles.main, {padding: scale(8)}]}>
      <Loader Visible={loading}/>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1, width: '100%'}} nestedScrollEnabled={true}>
        <HeaderWithText
          title="Generalised Anxiety Disorder Questionnaire (GAD-7)"
          headStyle={commonStyles.headingStyle}
        />
        <Text style={commonStyles.headTxt}>
          Over the
          <Text style={commonStyles.boldTxt}> last 2 weeks</Text>, how often
          have you been bothered by any of the following problems?
        </Text>

        {/* Questions Here */}
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

export default GADForm;

const styles = StyleSheet.create({
  optionBox: {
    width: '72%',
    borderRadius: scale(7),
    borderColor: color.Black,
    borderWidth: 1,
    backgroundColor: color.NewGray,
    // height:scale(200)
  },
});
