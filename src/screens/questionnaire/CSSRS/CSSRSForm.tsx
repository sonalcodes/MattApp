import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CSSRSForm1} from '@utils/staticData';
import {commonStyles} from '@commonStyles/index';
import {scale} from 'react-native-size-matters';
import HeaderWithText from '@commonComponents/header';
import Label from '@commonComponents/label';
import {FlatList} from 'react-native';
import CustomButton from '@commonComponents/button';
import color from '@src/theme/colors';
import {handleFormSubmission} from '@utils/helpers';
import Loader from '@commonComponents/loader';
import {useAppSelector} from '@src/redux/hooks';
import {loader} from '@src/redux/authSlice';
import {useNavigation} from '@react-navigation/native';

interface dataProps {
  id: number;
  question: string;
  example?: string;
  selected: string;
  disabled: boolean;
}

const CSSRSForm = () => {
  const [form1, setForm1] = useState<dataProps[]>(
    JSON.parse(JSON.stringify(CSSRSForm1)),
  );
  const [risk, setRisk] = useState<string>();
  const [submitDisabled, setSubmitDisabled] = useState(true);
  //todo: eventually, you shouldn't need this, but instead use text values "low" "medium" "high"
  const [numericRisk, setNumericRisk] = useState(0);
  const loading = useAppSelector(loader);
  const navigation = useNavigation();
  const options = ['Yes', 'No'];

  useEffect(() => {
    let submitDisabled;
    // values can't be empty for q's 1,2,6 and if 6===Yes, then 7 can't be empty - this covers all bases
    if (
      form1[0].selected === '' ||
      form1[1].selected === '' ||
      form1[5].selected === ''
    )
      submitDisabled = true;

    if (
      !submitDisabled &&
      form1[5].selected === 'Yes' &&
      form1[6].selected === ''
    )
      submitDisabled = true;

    if (submitDisabled) setSubmitDisabled(true);
    else setSubmitDisabled(false);
  }, [form1]);

  const calculateRisk = (values: any) => {
    let risk = '';
    values.forEach((value: any, i: number) => {
      if ((i === 0 || i === 1) && value.selected == 'Yes') risk = 'low';
      if (i === 2 && value.selected === 'Yes') risk = 'medium';
      if ((i === 3 || i === 4) && value.selected === 'Yes') risk = 'high';
      if (i === 6 && value.selected === 'Yes') risk = 'high';
      if (i === 6 && value.selected === 'No' && risk !== 'high')
        risk = 'medium';
    });
    //todo: shouldn't need this eventually
    let numericRisk = 0;
    if (risk === 'low') numericRisk = 1;
    if (risk === 'medium') numericRisk = 2;
    if (risk === 'high') numericRisk = 3;
    setNumericRisk(numericRisk);
    setRisk(risk);
  };

  const selectOption = (itemIndex: number, value: string) => {
    const copy = [...form1];
    copy[itemIndex].selected = value;

    //when q1 is answered, enable q2
    if (itemIndex === 0) {
      copy[1].disabled = false;
    }

    //when q2 is yes, enable q3 and disable q's 6-7, and  reset 6 and 7 back to unselected
    if (itemIndex === 1 && value === 'Yes') {
      copy[2].disabled = false;
      copy[5].disabled = true;
      copy[5].selected = '';
      copy[6].disabled = true;
      copy[6].selected = '';
    }
    //when q2 is no, disable q3 and reset the values for q's 3-5 back to unselected and enable q6
    if (itemIndex === 1 && value === 'No') {
      copy[2].disabled = true;
      copy[2].selected = '';
      copy[3].disabled = true;
      copy[3].selected = '';
      copy[4].disabled = true;
      copy[4].selected = '';
      //
      copy[5].disabled = false;
    }

    //when q3 is answered enable q4
    if (itemIndex === 2) {
      copy[3].disabled = false;
    }
    //when q4 is answered enable q5
    if (itemIndex === 3) {
      copy[4].disabled = false;
    }
    //when q5 is answered enable q6
    if (itemIndex === 4) {
      copy[5].disabled = false;
    }
    //when q6 is Yes enable q7
    if (itemIndex === 5 && value === 'Yes') {
      copy[6].disabled = false;
    }
    //when q6 is No, disable q7 and reset it's value answered enable q7
    if (itemIndex === 5 && value === 'No') {
      copy[6].disabled = true;
      copy[6].selected = '';
    }

    setForm1(copy);
    calculateRisk(copy);
  };

  const submitHandler = async (
    formType: 'C-SSRS',
    dataObj: {values: dataProps[]; total: number},
  ) => {
    let postData = {
      chartTitle: formType,
      values: dataObj.values,
      score: dataObj.total,
    };
    await handleFormSubmission(formType, postData);
    navigation.goBack();
  };

  // Function for defining the styling
  const getOptionStyle = (questionIndex: number, selectedValue: string) => {
    if (
      (questionIndex === 0 || questionIndex === 1) &&
      selectedValue == 'Yes'
    ) {
      return {
        backgroundColor: color.LightYellow,
      };
    }

    if (questionIndex === 2 && selectedValue === 'Yes') {
      return {
        backgroundColor: color.LightOrange,
      };
    }

    if (
      (questionIndex === 3 || questionIndex === 4) &&
      selectedValue === 'Yes'
    ) {
      return {
        backgroundColor: color.Red,
      };
    }
    if (questionIndex === 5)
      return {
        backgroundColor: color.Indigo,
      };

    if (questionIndex === 6 && selectedValue === 'Yes') {
      return {
        backgroundColor: color.Red,
      };
    }
    if (questionIndex === 6 && selectedValue === 'No') {
      return {
        backgroundColor: color.LightOrange,
      };
    }
    // This last condition for Background of "No" option
    // it should be purple in all cases expect only above condition
    if (selectedValue !== 'Yes' && questionIndex !== 6) {
      return {
        backgroundColor: color.Indigo,
      };
    }
  };

  const renderItem = ({item, index}: {item: dataProps; index: number}) => {
    return (
      <>
        <View style={commonStyles.questionBox} key={item?.id}>
          <View style={commonStyles.leftBox}>
            <Text style={[commonStyles.questionTxt]}>
              {item?.question}
            </Text>
            {item?.example && (
              <Text style={[commonStyles.questionTxt]}>
                {item?.example}
              </Text>
            )}
          </View>
          <View style={commonStyles.rightBox}>
            <View
              style={[
                commonStyles.optionBox,
                {width: '50%'},
                item?.disabled && {
                  opacity: scale(0.3),
                  backgroundColor: color?.LightGray,
                },
              ]}>
              {options?.map((option, optionIndex) => {
                return (
                  <>
                    <TouchableOpacity
                      key={optionIndex}
                      style={[
                        commonStyles.option,
                        {
                          borderTopLeftRadius: optionIndex === 0 ? scale(8) : 0,
                          borderTopRightRadius:
                            optionIndex === 0 ? scale(8) : 0,
                          borderBottomLeftRadius:
                            optionIndex === 1 ? scale(6) : 0,
                          borderBottomRightRadius:
                            optionIndex === 1 ? scale(6) : 0,
                        },
                        item?.selected === option
                          ? getOptionStyle(index, option)
                          : null,
                      ]}
                      onPress={() => selectOption(index, option)}
                      disabled={item?.disabled}>
                      <Text
                        style={[
                          commonStyles.optionTxt,
                          item.selected === option && {color: color.White},
                        ]}>
                        {option}
                      </Text>

                      {/*Below code for Horizontal line*/}
                      {optionIndex === 0 && (
                        <View
                          style={[
                            commonStyles.hLine,
                            {
                              backgroundColor: color.Black,
                              position: 'absolute',
                              top: scale(31),
                            },
                          ]}
                        />
                      )}
                    </TouchableOpacity>
                  </>
                );
              })}
            </View>
          </View>
        </View>

        {item?.id === 2 && (
          <>
            {/* <View style={[commonStyles.hLine, { backgroundColor: color?.LightGray }]} /> */}
            <Label
              name="If YES to 2, answer questions 3, 4, 5, and 6. If NO to 2, go directly to question 6."
              labelStyle={[
                commonStyles.totalTxt,
                {marginTop: scale(5)},
              ]}
            />
          </>
        )}
      </>
    );
  };

  const FooterView = () => {
    return (
      <>
        <Text style={commonStyles.questionTxt}>
          Level of risk identified:{' '}
          <Text style={commonStyles?.boldTxt}>{risk ? risk : 'None'}</Text>
        </Text>
        <CustomButton
          name={'Submit'}
          onClick={() =>
            submitHandler('C-SSRS', {values: form1, total: numericRisk})
          }
          disabled={submitDisabled}
        />
      </>
    );
  };

  return (
    <View style={[commonStyles.main, {padding: scale(8)}]}>
      <Loader Visible={loading} />
      <ScrollView style={{flex: 1, width: '100%'}} nestedScrollEnabled={true}>
        <HeaderWithText
          title={`Columbia Suicide Severity Rating Scale(C-SSRS) (Screen Version)`}
          headStyle={commonStyles.headingStyle}
        />
        <Text style={commonStyles.headTxt}>
          Answer these questions in relation to the
          <Text style={commonStyles.boldTxt}> last month</Text>
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

export default CSSRSForm;

const styles = StyleSheet.create({
  headingStyle: {
    fontSize: scale(20),
    textAlign: 'center',
    fontWeight: '500',
  },
});
