import { LinearGradient } from 'expo-linear-gradient';
import { StyleProp, ViewStyle, StyleSheet } from 'react-native';

type BackgroundGradientProps = {
  style?: StyleProp<ViewStyle>;
  children?: JSX.Element | JSX.Element[];
  colors?: string[];
  locations?: number[];
};

const BackgroundGradient = ({
  children,
  style,
  colors = ['#191A1A', '#181818'],
  locations = [0, 0.8],
}: BackgroundGradientProps) => {
  return (
    <LinearGradient
      style={[style, styles.gradient]}
      colors={colors}
      locations={locations}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});

export default BackgroundGradient;
