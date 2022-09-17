import { useCallback, useEffect, useRef, useState } from 'react';
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
  value?: Date;
  onChangeText?: (value: any) => void;
};

const maximumDate = new Date(new Date().getFullYear() - 16, 0, 1);

export default function DateInput({
  style,
  value,
  onChangeText,
}: DateInputProps) {
  const [lastAction, setLastAction] = useState<Date | undefined>();
  const [interval, setIntervalState] = useState<NodeJS.Timer | undefined>();
  const [state, dispatch] = useModal('center');

  const visibleRef = useRef(state.visible);
  visibleRef.current = state.visible;

  const actionRef = useRef(lastAction);
  actionRef.current = lastAction;

  const intervalRef = useRef(interval);
  intervalRef.current = interval;

  const cancelPeriodicCheck = useCallback(() => {
    clearInterval(intervalRef.current);
    setIntervalState(undefined);
  }, []);

  useEffect(() => {
    return cancelPeriodicCheck;
  }, []);

  const periodicallyCheckForActions = useCallback(() => {
    if (!visibleRef.current) {
      cancelPeriodicCheck();
      return;
    }

    if (!actionRef.current) {
      return;
    }

    if (new Date().getTime() - actionRef.current.getTime() > 1500) {
      dispatch({ type: 'HIDE' });
      cancelPeriodicCheck();
    }
  }, []);

  const onInternalChange = (event: DateTimePickerEvent, date?: Date) => {
    if (event.type === 'dismissed') return;

    onChangeText?.(date);

    // on android onChange is called after clicking submit button
    if (isAndroid) {
      dispatch({ type: 'HIDE' });
      return;
    }

    setLastAction(new Date());

    if (!interval) {
      setIntervalState(setInterval(() => periodicallyCheckForActions(), 500));
    }
  };

  const DatePickerComponent = (
    <DateTimePicker
      value={value ?? new Date()}
      accentColor={colors.yellow}
      textColor={colors.white}
      themeVariant="dark"
      display={isIos ? 'inline' : 'default'}
      onChange={onInternalChange}
      maximumDate={maximumDate}
    />
  );

  return (
    <>
      <Pressable
        onPressIn={() => dispatch({ type: 'SHOW' })}
        style={[styles.container, style]}
      >
        <BaseTextInput pointerEvents="none" editable={false}>
          {value?.toLocaleDateString().replace(/-/g, ' / ')}
        </BaseTextInput>
        <Image
          source={images.rightArrow}
          height={16}
          width={10}
          style={styles.arrow}
        />
      </Pressable>

      {isAndroid ? (
        state.visible && DatePickerComponent
      ) : (
        <Modal
          preset={state.preset}
          isVisible={state.visible}
          onHide={() => dispatch({ type: 'HIDE' })}
        >
          {DatePickerComponent}
        </Modal>
      )}
    </>
  );
}

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
