import { useWindowDimensions } from 'react-native';

const useDimensions = () => {
  const { height, width } = useWindowDimensions();

  const vh = (percentage: number) => (height * percentage) / 100;
  const vw = (percentage: number) => (width * percentage) / 100;

  return { vh, vw, height, width };
};

export default useDimensions;
