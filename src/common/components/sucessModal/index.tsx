import {View, Modal, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {scale} from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import color from '@theme/colors';
import Heading from '@commonComponents/heading';
import Label from '@commonComponents/label';
import CustomButton from '@commonComponents/button';
import { commonStyles } from '@commonStyles/index';

interface successModalProps {
  title: string;
  buttonText: string;
  showModal: boolean;
  handleButtonClick: () => void;
  message?: string;
}
const SuccessModal: FC<successModalProps> = ({
  title,
  buttonText,
  showModal,
  handleButtonClick,
  message,
}) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={showModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.iconView}>
              <Feather name="check" size={scale(40)} color={color.Primary} />
            </View>

            <Heading name={title} labelStyle={styles.modalText} />
            {message && <Label name={message} labelStyle={styles.modalText} />}
            <CustomButton name={buttonText} onClick={handleButtonClick} btnStyle={commonStyles.button} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    margin: scale(40),
    backgroundColor: 'white',
    borderRadius: 20,
    padding: scale(35),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: scale(15),
    textAlign: 'center',
  },
  iconView: {
    backgroundColor: color.Light,
    padding: scale(15),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(50),
    marginBottom: scale(10),
  },
});

export default SuccessModal;
