declare module '*.png';

declare module '*.svg' {
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
