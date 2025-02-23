import {StyleSheet} from 'react-native';
import {moderateScale, scale} from 'react-native-size-matters';
import color from '@theme/colors';
import { fonts } from '@src/theme/fonts';

export const commonStyles = StyleSheet.create({
    main: {
        flex: 1,
        height: '100%',
        backgroundColor: color.White,
        padding: scale(15),
    },
    card: {
        backgroundColor: color.Primary,
        padding: moderateScale(10),
        marginBottom: scale(10),
        borderRadius: scale(10),
    },
    text: {
        color: color.White,
        textAlign: 'center',
    },
    txtStyle: {
        fontSize: scale(9),
        marginTop: scale(3),
    },
    list: {
        marginTop: scale(10),
    },
    questionBox: {
        marginVertical: scale(7),
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
        fontSize: scale(16),
        color: color.Black,
        fontFamily:fonts.Regular

    },
    optionTxt: {
        fontSize: scale(16),
        color: color.Black,
        textAlign: 'center',
        alignSelf: 'center',
        fontFamily:fonts.Regular
    },
    hLine: {
        height: scale(1),
        width: '100%',
        backgroundColor: color.Gray,
    },
    totalTxt: {
        fontSize: scale(16),
        color: color.Black,
        marginVertical: scale(6),
        fontFamily:fonts.Medium
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
        marginVertical: scale(6),
    },
    submitBtn: {
        width: '40%',
        borderRadius: scale(6),
    },
    checkTxt: {
        flexWrap: 'wrap',
        width: '70%',
        textAlign: 'center',
        fontFamily:fonts.Medium
    },
    headingStyle: {
        fontSize: scale(20),
        textAlign: 'center',
        fontFamily:fonts.Medium,
        width: '90%'
    },
    boldTxt: {
        color: color.Black,
        fontSize: scale(16),
        fontFamily:fonts.SemiBold
    },
    headTxt: {
        color: color.Black,
        fontSize: scale(16),
        fontFamily:fonts.Regular
    },
    button: {
        backgroundColor: color.Primary,
        width: '100%',
        borderRadius: scale(6),
    },
});
