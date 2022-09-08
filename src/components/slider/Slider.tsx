import { Slider as ReactNativeSlider } from '@miblanchard/react-native-slider';
import { SliderProps as ReactNativeSliderProps } from '@miblanchard/react-native-slider/lib/types';

import colors from '../../lib/colorScheme';
import { StyleSheet } from 'react-native';
import SliderThumb from './SliderThumb';
import { ReactNode } from 'react';

type SliderProps = {
  onValueChange?: (value: number | number[]) => void;
  value: number[] | string[];
};

const Slider = ({
  onValueChange,
  value,
  minimumValue,
  maximumValue,
}: SliderProps & Optional<ReactNativeSliderProps, 'animationType'>) => {
  return (
    <ReactNativeSlider
      value={value}
      onValueChange={onValueChange}
      minimumValue={minimumValue}
      maximumValue={maximumValue}
      minimumTrackTintColor={colors.darkYellow}
      maximumTrackTintColor={colors.lightGray}
      trackStyle={styles.track}
      thumbTintColor={colors.yellow}
      step={1}
      renderThumbComponent={[
        () => (<SliderThumb value={value[0]} />) as ReactNode,
        () => (<SliderThumb value={value[1]} />) as ReactNode,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  track: { height: 7 },
  thumb: { height: 17, width: 17 },
});

export default Slider;