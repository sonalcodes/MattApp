import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {commonStyles} from '@commonStyles/index';
import {scale} from 'react-native-size-matters';
import HeaderWithText from '@commonComponents/header';
import Label from '@commonComponents/label';
import {RRSForm1} from '@utils/staticData';
import {TouchableOpacity} from 'react-native';
import color from '@src/theme/colors';
import CustomButton from '@commonComponents/button';
import Loader from '@commonComponents/loader';
import { useAppSelector } from '@src/redux/hooks';
import { loader } from '@src/redux/authSlice';
import { handleFormSubmission } from '@utils/helpers';
import { useNavigation } from '@react-navigation/native';

interface dataProps {
  id: number;
  question: string;
  value: number | null;
  itemType: string;
}

const RRSForm = () => {
  const [form1, setForm1] = useState<dataProps[]>(JSON.parse(JSON.stringify(RRSForm1)));
  const [total, setTotal] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const options = ['Almost never', 'Sometimes', 'Often', 'Almost always'];
  const loading = useAppSelector(loader);
  const navigation = useNavigation();
  useEffect(() => {
    //  check that each Q has been answered
    const submitDisabled = form1.find(row => row.value === null);
    //
    if (submitDisabled) setDisabled(true);
    else setDisabled(false);
  }, [form1]);

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

  const submitHandler = async (formType: 'RRS-10') => {
    let postData = {
      chartTitle: formType,
      values: {
        values: form1.map(item => ({
          question: item.question,
          value: item.value !== null ? item.value : null,
          itemType:item.itemType
        })),
      },
      score: total,
    };
    await handleFormSubmission(formType, postData);
    navigation.goBack()
  };
  const renderItem = ({item, index}: {item: dataProps; index: number}) => {
    return (
      <View style={commonStyles.questionBox}>
        <View
          style={[
            commonStyles.leftBox,
            {height: scale(100), justifyContent: 'space-between'},
          ]}>
          <Text style={commonStyles.questionTxt}>{`${item?.question}`}</Text>
          <Label
            name={`Item type:${item?.itemType}`}
            labelStyle={styles.typeTxtStyle}
          />
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
                      {paddingHorizontal: scale(7), paddingVertical: scale(6)},
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
          name={`Total: ${total}/40`}
          labelStyle={[commonStyles.totalTxt, {marginVertical: scale(15)}]}
        />
        <Label name={`Note. R = Reflection; B = Brooding;`} />
        <CustomButton
          name={'Submit'}
          // btnStyle={commonStyles.submitBtn}
          onClick={() =>
            submitHandler('RRS-10')
          }
          disabled={disabled}
        />
      </>
    );
  };

  return (
    <View style={[commonStyles.main, {padding: scale(8)}]}>
      <Loader Visible={loading}/>

      <ScrollView style={{flex: 1, width: '100%'}} nestedScrollEnabled={true}>
        <HeaderWithText
          title={`10 Point Ruminative Response Scale (RRS-10)`}
          headStyle={commonStyles.headingStyle}
        />

        <Label
          name="People think and do many different things when they feel sad, blue, or depressed. 
                Please read each of the items below and indicate whether you almost never, 
                sometimes, often, or almost always think or do each one when you feel down, sad, or depressed."
          labelStyle={commonStyles.headTxt}
        />
        <Text style={commonStyles.headTxt}>
          Please indicate what you
          <Text style={commonStyles.boldTxt}> generally </Text>
          do, not what you think you should do.
        </Text>

        <Text style={[commonStyles.headTxt, {marginVertical: scale(10)}]}>
          Answer the questions in relation to the
          <Text style={commonStyles.boldTxt}> last 7 days </Text>
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

export default RRSForm;

const styles = StyleSheet.create({
  optionBox: {
    width: '72%',
    borderRadius: scale(7),
    borderColor: color.Black,
    borderWidth: 1,
    backgroundColor: color.NewGray,
  },
  typeTxtStyle: {
    fontSize: scale(11),
    color: color?.Black,
  },
});
