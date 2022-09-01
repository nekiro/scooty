import LogoLight from '../assets/logo-light.svg';
import LogoDark from '../assets/logo-dark.svg';
import { StyleProp, ViewStyle } from 'react-native';

const typeToImage = {
  light: LogoLight,
  dark: LogoDark,
};

type BrandLogoProps = {
  type: 'light' | 'dark';
  width?: string | number;
  height?: string | number;
  style?: StyleProp<ViewStyle>;
};

const BrandLogo = ({
  type,
  width = '100%',
  height = '100%',
  style,
}: BrandLogoProps) => {
  const Component = typeToImage[type];
  return <Component width={width} height={height} style={[style]} />;
};

export default BrandLogo;
