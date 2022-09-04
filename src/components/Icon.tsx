import { StyleSheet, StyleProp, ImageStyle } from 'react-native';
import Image from './Image';
import React from 'react';
import { SvgProps } from 'react-native-svg';

export type IconSource = number | React.FC<SvgProps>;

export type IconProps = {
  style?: StyleProp<ImageStyle>;
  source: IconSource;
  width?: number | string;
  height?: number | string;
};

const Icon = ({ source, style, width = 36, height = 36 }: IconProps) => (
  <Image
    source={source}
    width={width}
    height={height}
    style={[styles.image, style]}
  />
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

export default Icon;
