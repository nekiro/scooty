import { useMemo, useState } from 'react';
import { StyleSheet, StyleProp, TextStyle, Pressable } from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import colors from '../lib/colorScheme';
import ReactModal from 'react-native-modal';
import BackgroundGradient from './BackgroundGradient';
import BaseTextInput from './BaseTextInput';

type DateInputProps = {
  style?: StyleProp<TextStyle>;
};

const DateInput = ({ style }: DateInputProps) => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState<Date | undefined>();

  const onChange = (event: DateTimePickerEvent, date?: Date) =>
    setDate(date as Date);
  const maximumDate = useMemo(
    () => new Date(new Date().getFullYear() - 16, 0, 1),
    [],
  );

  const hide = () => setShow(false);

  // TODO: in case of spinner, onChange event fires instantly, so its impossible to set correct date
  // implement code that waits x (5) seconds before actually firing onChange

  return (
    <>
      <BaseTextInput
        onPressIn={() => setShow(true)}
        editable={false}
        style={[styles.container, style]}
      >
        {date?.toLocaleDateString().replace(/-/g, '/')}
      </BaseTextInput>

      <ReactModal
        isVisible={show}
        onBackdropPress={hide}
        onBackButtonPress={hide}
        animationIn="slideInUp"
        animationInTiming={500}
        animationOut="slideOutDown"
        animationOutTiming={500}
      >
        <BackgroundGradient style={styles.gradient}>
          <DateTimePicker
            value={date ?? new Date()}
            accentColor={colors.yellow}
            display="inline"
            onChange={onChange}
            maximumDate={maximumDate}
          />
        </BackgroundGradient>
      </ReactModal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  gradient: {
    flex: 0,
    borderColor: colors.yellow,
    borderWidth: 1,
    padding: 10,
  },
});

export default DateInput;
