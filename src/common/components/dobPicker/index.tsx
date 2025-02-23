import React, {FC, useState} from 'react';
import DatePicker from 'react-native-date-picker';

interface CustomDatePickerProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (date: Date) => void;
}

export const CustomDatePicker: FC<CustomDatePickerProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);

  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    onConfirm(date);
  };

  return (
    <DatePicker
      modal
      open={open}
      mode="date"
      date={selectedDate}
      onConfirm={handleConfirm}
      onCancel={onClose}
      maximumDate={today}
    />
  );
};
