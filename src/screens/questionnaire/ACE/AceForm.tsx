import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {commonStyles} from '@commonStyles/index';
import HeaderWithText from '@commonComponents/header';
import {scale} from 'react-native-size-matters';
import {AceForm1, AceForm2} from '@utils/staticData';
import Label from '@commonComponents/label';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import color from '@src/theme/colors';
import CustomButton from '@commonComponents/button';
import Check from 'react-native-vector-icons/AntDesign';
import {handleFormSubmission} from '@utils/helpers';
import Loader from '@commonComponents/loader';
import {useAppSelector} from '@src/redux/hooks';
import {loader} from '@src/redux/authSlice';
import {useNavigation} from '@react-navigation/native';
import Heading from '@commonComponents/heading';
import { fonts } from '@src/theme/fonts';
interface formDataProps {
  id: number;
  question: string;
  value: string | null;
}

const AceForm = () => {
  const [form1, setForm1] = useState<formDataProps[]>(
    JSON.parse(JSON.stringify(AceForm1)),
  );
  const [form2, setForm2] = useState<formDataProps[]>(
    JSON.parse(JSON.stringify(AceForm2)),
  );
  const [total, setTotal] = useState(0);
  const [disabled, setDisable] = useState(false);
  const loading = useAppSelector(loader);
  const navigation = useNavigation();
  const checkAllChecked = () => {
    const submitDisabled = form1.find(item => item.value === null);
    const submitDisabled2 = form2.find(item => item.value !== null);
    if (submitDisabled || !submitDisabled2) setDisable(true);
    else setDisable(false);
  };

  useEffect(() => {
    checkAllChecked();
  }, [form1, form2]);

  // Function for calculating total Yes tick
  const calculateTotal = () => {
    let totalYes = form1.filter(item => item?.value === 'yes')?.length;
    setTotal(totalYes);
  };

  // Function for selecting Option "yes" or "no" and updating the main form1 array
  const selectOption = (itemIndex: number, val: any) => {
    const copy = [...form1];
    copy[itemIndex].value = val;
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

  const submitHandler = async (formType: 'ACE') => {
    let postData = {
      chartTitle: formType,
      values: {
        values: form1.map(item => ({
          question: item.question,
          value: item.value !== null ? item.value : null,
        })),
        values2: form2.map(item => ({
          question: item.question,
          value: item.value !== null ? item.value : null,
        })),
      },
      score: total,
    };
    await handleFormSubmission(formType, postData);
    navigation.goBack()
  };

  const renderItem = ({item, index}: {item: formDataProps; index: number}) => {
    return (
      <View style={styles.questionBox}>
        <View style={styles.leftBox}>
          <Label name={`${item?.question}`} labelStyle={styles.questionTxt}/>
        </View>
        <View style={styles.rightBox}>
          <View style={[styles.optionBox, {backgroundColor: color?.NewGray}]}>
            <TouchableOpacity
              style={[
                styles.option,
                item?.value === 'yes' && {
                  backgroundColor: color?.Indigo,
                  borderTopLeftRadius: scale(6),
                  borderTopRightRadius: scale(6),
                },
              ]}
              onPress={() => selectOption(index, 'yes')}>
              <Label name='Yes' labelStyle={[
                  styles.optionTxt,
                  item?.value === 'yes' ? {color: color.White}:{},
                ]}/>
            </TouchableOpacity>
            <View
              style={[
                styles.hLine,
                {backgroundColor: color?.Black, height: scale(1)},
              ]}
            />
            <TouchableOpacity
              style={[
                styles.option,
                item?.value === 'no' && {
                  backgroundColor: color?.Indigo,
                  borderBottomLeftRadius: scale(6),
                  borderBottomRightRadius: scale(6),
                },
              ]}
              onPress={() => selectOption(index, 'no')}>
              <Label name='No' labelStyle={[
                  styles.optionTxt,
                  item?.value === 'no' ? {color: color.White} : {},
                ]}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const FooterView = () => {
    return (
      <>
        <Label name={`Total: ${total}/10`} labelStyle={styles.totalTxt} />
        <Label
          name='Your ACE score is the total number of "Yes" responses.'
          labelStyle={[styles.questionTxt, {marginVertical: scale(6)}]}
        />
        <Label
          name="Do you believe that these experiences have affected your health?"
          labelStyle={[styles.questionTxt, {marginVertical: scale(6)}]}
        />
        <View style={styles.rowBox}>
          {form2?.map((item, index) => {
            return (
              <View key={item?.id} style={{alignItems: 'center'}}>
                <Label name={item?.question} labelStyle={styles.checkTxt} />
                <TouchableOpacity
                  onPress={() => selectExperience(index, 'yes')}
                  style={[
                    styles.checkBox,
                    item?.value !== null && {backgroundColor: color.Indigo},
                  ]}>
                  {item?.value !== null && (
                    <Check name="check" color={'white'} size={14} />
                  )}
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        <CustomButton
          name={'Submit'}
          onClick={() => submitHandler('ACE')}
          disabled={disabled}
        />
      </>
    );
  };

  return (
    <View style={[commonStyles.main, {padding: scale(8)}]}>
      <Loader Visible={loading} />
      <ScrollView
        style={{flex: 1, width: '100%'}}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}>
        <HeaderWithText
          title={`Adverse Childhood Experience Questionnaire for Adults (ACE)`}
          headStyle={styles.headingStyle}
        />

        <Text style={styles.headTxt}>
          <Text style={styles.boldTxt}>Instructions : </Text>
          Below is a list of 10 categories of Adverse Childhood Experiences
          (ACEs). From the list below, please place a checkmark next to each ACE
          category that you experienced{' '}
          <Text style={styles.boldTxt}>prior to your 18th birthday.</Text> Then,
          please add up the number of categories of ACEs you experienced and put
          the total number at the bottom.
        </Text>

        {/* Questions Here */}
        <FlatList
          data={form1}
          keyExtractor={item => item?.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          style={styles.list}
          ListFooterComponent={FooterView}
        />
      </ScrollView>
    </View>
  );
};

export default AceForm;

const styles = StyleSheet.create({
  headBox: {
    flexDirection: 'row',
    backgroundColor: 'grey',
  },
  txtStyle: {
    fontSize: scale(14),
    marginTop: scale(12),
  },
  list: {
    marginTop: scale(10),
  },
  questionBox: {
    marginVertical: scale(9),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(4),
    borderTopWidth: scale(0.3),
    borderBottomWidth: scale(0.3),
    borderTopColor: color?.Gray,
    borderBottomColor: color?.Gray,
  },
  leftBox: {
    width: '50%',
  },
  rightBox: {
    width: '50%',
    alignItems: 'flex-end',
  },
  optionBox: {
    height: scale(65),
    width: '70%',
    borderRadius: scale(7),
    borderColor: color.Black,
    borderWidth: 1,
  },
  option: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  radio: {
    height: scale(26),
    width: scale(26),
    borderRadius: scale(13),
    backgroundColor: color.LightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionTxt: {
    fontSize: scale(14),
    color: color.Black,
  },
  optionTxt: {
    fontSize: scale(14),
    color: color.Black,
    fontFamily:fonts.Regular
  },
  hLine: {
    height: scale(0.3),
    width: '100%',
    backgroundColor: color.Gray,
  },
  totalTxt: {
    fontSize: scale(14),
    color: color.Black,
    marginVertical: scale(6),
    fontFamily:fonts.SemiBold
  },
  checkBox: {
    height: scale(18),
    width: scale(18),
    borderRadius: scale(4),
    borderWidth: 1,
    borderColor: color.Indigo,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: scale(8),
  },
  rowBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: scale(8),
  },
  submitBtn: {
    backgroundColor: color.Teal,
    width: '40%',
    borderRadius: scale(6),
  },
  checkTxt: {
    // fontWeight: '500',
    fontSize: scale(14),
  },
  headingStyle: {
    fontSize: scale(20),
    textAlign: 'center',
    fontFamily:fonts.Medium
  },
  boldTxt: {
    // fontWeight: '700',
    color: color.Black,
    fontSize: scale(14),
    fontFamily:fonts.SemiBold
  },
  headTxt: {
    color: color.Black,
    fontSize: scale(14),
    fontFamily:fonts.Regular
  },
});
