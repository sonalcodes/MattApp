import { StyleSheet,TouchableOpacity} from 'react-native'
import React from 'react'
import Label from '@commonComponents/label'
import { commonStyles } from '@commonStyles/index'

interface dataProps {
  id?: number;
  name: string;
}

const QuestionComp = ({id,name}:dataProps) => {
  return (
    <TouchableOpacity
        onPress={() =>null}
        style={commonStyles.card}>
        <Label name={name} labelStyle={commonStyles.text} />
      </TouchableOpacity>
  )
}

export default QuestionComp

const styles = StyleSheet.create({})