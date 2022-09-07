import { useEffect, useRef, useState } from 'react';
import { StyleSheet, StyleProp, TextStyle, View } from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import colors from '../../lib/colorScheme';
import BaseTextInput from './BaseText';
import Image from '../Image';
import { images } from '../../assets';
import { useModal } from '../../hooks/useModal';

type DateInputProps = {
  style?: StyleProp<TextStyle>;
};

const maximumDate = new Date(new Date().getFullYear() - 16, 0, 1);

const DateInput = ({ style }: DateInputProps) => {
  const [date, setDate] = useState<Date | undefined>();
  const [lastAction, setLastAction] = useState<Date | undefined>();
  const [interval, setIntervalState] = useState<NodeJS.Timer | undefined>();
  const { show, hide, setContent, isVisible, setPreset } = useModal();

  const visibleRef = useRef(isVisible);
  visibleRef.current = isVisible;

  const actionRef = useRef(lastAction);
  actionRef.current = lastAction;

  const intervalRef = useRef(interval);
  intervalRef.current = interval;

  useEffect(() => {
    setPreset('center');
    setContent(
      <DateTimePicker
        value={date ?? new Date()}
        accentColor={colors.yellow}
        display="inline"
        onChange={onChange}
        maximumDate={maximumDate}
      />,
    );
  }, []);

  const periodicallyCheckForActions = (
    lastAction: Date | undefined,
    isVisible: () => boolean,
    interval: NodeJS.Timer | undefined,
  ) => {
    if (!isVisible()) {
      return;
    }

    if (!lastAction) {
      return;
    }

    if (new Date().getTime() - lastAction.getTime() > 2000) {
      hide();
      clearInterval(interval);
    }
  };

  const onChange = (event: DateTimePickerEvent, date?: Date) => {
    setDate(date as Date);
    setLastAction(new Date());

    if (!interval) {
      setIntervalState(
        setInterval(
          () =>
            periodicallyCheckForActions(
              actionRef.current,
              visibleRef.current,
              intervalRef.current,
            ),
          500,
        ),
      );
    }
  };

  useEffect(() => {
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <View style={[styles.container, style]}>
        <BaseTextInput onPressIn={show} editable={false}>
          {date?.toLocaleDateString().replace(/-/g, ' / ')}
        </BaseTextInput>
        <Image
          source={images.rightArrow}
          height={16}
          width={10}
          style={styles.arrow}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  arrow: {
    position: 'absolute',
    right: 20,
    alignSelf: 'center',
  },
});

export default DateInput;
