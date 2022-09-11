import { useEffect, useRef, useState } from 'react';
import { StyleSheet, StyleProp, TextStyle, Pressable } from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import colors from '../../lib/colorScheme';
import BaseTextInput from './BaseText';
import Image from '../Image';
import { images } from '../../assets';
import { useModal } from '../../hooks/useModal';
import Modal from '../Modal';
import { isAndroid, isIos } from '../../lib';

type DateInputProps = {
  style?: StyleProp<TextStyle>;
};

const maximumDate = new Date(new Date().getFullYear() - 16, 0, 1);

const DateInput = ({ style }: DateInputProps) => {
  const [date, setDate] = useState<Date | undefined>();
  const [lastAction, setLastAction] = useState<Date | undefined>();
  const [interval, setIntervalState] = useState<NodeJS.Timer | undefined>();
  const { show, hide, visible, preset } = useModal('center');

  const visibleRef = useRef(visible);
  visibleRef.current = visible;

  const actionRef = useRef(lastAction);
  actionRef.current = lastAction;

  const intervalRef = useRef(interval);
  intervalRef.current = interval;

  useEffect(() => {
    return () => clearInterval(interval);
  }, []);

  const periodicallyCheckForActions = (
    lastAction: Date | undefined,
    visible: boolean,
    interval: NodeJS.Timer | undefined,
  ) => {
    if (!visible) {
      clearInterval(interval);
      return;
    }

    if (!lastAction) {
      return;
    }

    if (new Date().getTime() - lastAction.getTime() > 1500) {
      hide();
      clearInterval(interval);
    }
  };

  const onChange = (event: DateTimePickerEvent, date?: Date) => {
    if (event.type === 'dismissed') return;

    setDate(date as Date);

    // on android onChange is called after clicking submit button
    if (isAndroid) {
      hide();
      return;
    }

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

  const DatePickerComponent = (
    <DateTimePicker
      value={date ?? new Date()}
      accentColor={colors.yellow}
      textColor={colors.white}
      themeVariant="dark"
      display={isIos ? 'inline' : 'default'}
      onChange={onChange}
      maximumDate={maximumDate}
    />
  );

  return (
    <>
      <Pressable onPressIn={show} style={[styles.container, style]}>
        <BaseTextInput pointerEvents="none" editable={false}>
          {date?.toLocaleDateString().replace(/-/g, ' / ')}
        </BaseTextInput>
        <Image
          source={images.rightArrow}
          height={16}
          width={10}
          style={styles.arrow}
        />
      </Pressable>

      {isAndroid ? (
        visible && DatePickerComponent
      ) : (
        <Modal preset={preset} isVisible={visible} onHide={hide}>
          {DatePickerComponent}
        </Modal>
      )}
      {/* <Modal preset={preset} isVisible={visible} onHide={hide}>
        <DateTimePicker
          value={date ?? new Date()}
          accentColor={colors.yellow}
          themeVariant="dark"
          display={isIos ? 'inline' : 'default'}
          onChange={onChange}
          maximumDate={maximumDate}
        />
      </Modal> */}
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
