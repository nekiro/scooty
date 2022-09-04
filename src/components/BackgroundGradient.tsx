import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';
import { StyleProp, ViewStyle, StyleSheet } from 'react-native';

type BackgroundGradientProps = {
  style?: StyleProp<ViewStyle>;
  colors?: string[];
  locations?: number[];
} & Omit<LinearGradientProps, 'colors'>;

const BackgroundGradient = ({
  children,
  style,
  colors = ['#191A1A', '#181818'],
  locations = [0, 0.8],
  ...props
}: BackgroundGradientProps) => {
  return (
    <LinearGradient
      style={[styles.gradient, style]}
      colors={colors}
      locations={locations}
      {...props}
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
