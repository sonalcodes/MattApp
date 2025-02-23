import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import React, {Fragment} from 'react';
import {DataList} from '@utils/staticData';
import color from '@src/theme/colors';
import {moderateScale, scale} from 'react-native-size-matters';
import Label from '@commonComponents/label';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '@utils/types';

interface dataCardProps {
  id: number;
  name: string;
}
const HomeContainerCard = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const hanldeItemClick = (item: dataCardProps) => {
    navigation.navigate('Chat', {item: item});
  };
  const renderItem = ({item}: {item: dataCardProps}) => {
    const {name} = item;
    return (
      <TouchableOpacity
        onPress={() => hanldeItemClick(item)}
        style={styles.card}>
        <Label name={name} labelStyle={styles.text} />
      </TouchableOpacity>
    );
  };
  return (
    <View>
      {/* <FlatList
        data={DataList}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      /> */}
      {DataList.map((item, i) => {
        return <Fragment key={i}>{renderItem({item})}</Fragment>;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: color.Primary,
    padding: moderateScale(10),
    marginBottom: scale(10),
    borderRadius: scale(10),
  },
  text: {
    color: color.White,
    textAlign: 'center',
  },
});
export default HomeContainerCard;
