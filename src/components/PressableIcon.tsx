import {
  StyleSheet,
  Pressable,
  GestureResponderEvent,
  StyleProp,
  ImageStyle,
} from 'react-native';
import React from 'react';
import Icon, { IconProps } from './Icon';

export type PressableIconProps = {
  iconStyle?: StyleProp<ImageStyle>;
  onPress?: (event: GestureResponderEvent) => void;
};

const PressableIcon = ({
  style,
  source,
  iconStyle,
  width,
  height,
  onPress,
}: PressableIconProps & IconProps) => (
  <Pressable style={[styles.container, style]} onPress={onPress}>
    <Icon
      source={source}
      style={[styles.image, iconStyle]}
      width={width}
      height={height}
    />
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    alignContent: 'stretch',
  },
});

export default PressableIcon;
