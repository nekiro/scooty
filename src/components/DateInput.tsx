import { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, StyleProp, TextStyle, View } from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import colors from '../lib/colorScheme';
import Modal from './Modal';
import BaseTextInput from './BaseTextInput';
import Image from './Image';
import { images } from '../assets';

type DateInputProps = {
  style?: StyleProp<TextStyle>;
};

const maximumDate = new Date(new Date().getFullYear() - 16, 0, 1);

const DateInput = ({ style }: DateInputProps) => {
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const [lastAction, setLastAction] = useState<Date | undefined>();
  const [intervalRef, setIntervalRef] = useState<NodeJS.Timer | undefined>();

  const actionRef = useRef(lastAction);
  actionRef.current = lastAction;

  const periodicallyCheckForActions = (lastAction: Date | undefined) => {
    if (!visible) {
      return;
    }

    if (!lastAction) {
      return;
    }

    if (new Date().getTime() - lastAction.getTime() > 2000) {
      hide();
    }
  };

  const onChange = (event: DateTimePickerEvent, date?: Date) => {
    setDate(date as Date);
    setLastAction(new Date());

    console.log('on change date', date);
    if (!intervalRef) {
      setIntervalRef(
        setInterval(() => periodicallyCheckForActions(actionRef.current), 500),
      );
    }
  };

  const show = () => setVisible(true);
  const hide = () => {
    clearInterval(intervalRef);
    setVisible(false);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef);
  }, []);

  return (
    <>
      <View style={[styles.container, style]}>
        <BaseTextInput onPressIn={show} editable={false} style={styles.input}>
          {date?.toLocaleDateString().replace(/-/g, ' / ')}
        </BaseTextInput>
        <Image
          source={images.rightArrow}
          height={16}
          width={10}
          style={styles.arrow}
        ></Image>
      </View>

      <Modal preset="center" isVisible={visible}>
        <DateTimePicker
          value={date ?? new Date()}
          accentColor={colors.yellow}
          display="inline"
          onChange={onChange}
          maximumDate={maximumDate}
        />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  input: { width: '100%' },
  gradient: {
    flex: 0,
    borderColor: colors.yellow,
    borderWidth: 1,
    padding: 10,
  },
  arrow: {
    position: 'absolute',
    right: 20,
    alignSelf: 'center',
  },
});

export default DateInput;
