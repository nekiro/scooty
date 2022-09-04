import React from 'react';
import {
  Image as ReactNativeImage,
  ImageProps as ReactNativeImageProps,
} from 'react-native';
import { SvgProps } from 'react-native-svg';

type ImageProps = {
  source: number | React.FC<SvgProps>;
  width?: number | string;
  height?: number | string;
} & Partial<Omit<ReactNativeImageProps, 'source'>>;

const Image = ({ style, source, width, height }: ImageProps) => {
  if (typeof source === 'number') {
    // require for images returns numbers
    return <ReactNativeImage source={source} style={style} />;
  }

  const Component = source; // dirty hack to allow usage of lowercase variables as components
  return (
    <Component
      style={style}
      {...(width ? { width } : {})}
      {...(height ? { height } : {})}
    />
  );
};

export default Image;
