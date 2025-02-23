import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native'
import React from 'react'
import BackHeader from '@commonComponents/backHeader'
import Label from '@commonComponents/label'
import {scale} from 'react-native-size-matters'
import color from '@src/theme/colors'

interface PropsType {
    title: string,
    headStyle: TextStyle
}

const HeaderWithText = ({title, headStyle}: PropsType) => {
    return (
        <View style={styles.headBox}>
            <BackHeader backStyle={{paddingBottom: 0}}/>
            <Label name={title} labelStyle={[styles.titleText, headStyle]}/>
        </View>
    )
}

export default HeaderWithText

const styles = StyleSheet.create({
    headBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: color.BabyBlue,
        width: '100%',
        paddingVertical: scale(5),
        paddingHorizontal: scale(2),
        marginBottom: scale(10),
        borderRadius: scale(6),
    },
    titleText: {
        fontSize: scale(12),
        color: color.White,
    }
})
