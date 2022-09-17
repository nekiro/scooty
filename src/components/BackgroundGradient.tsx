import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';
import { StyleProp, ViewStyle, StyleSheet } from 'react-native';

type BackgroundGradientProps = {
  style?: StyleProp<ViewStyle>;
  colors?: string[];
  locations?: number[];
};

export default function BackgroundGradient({
  children,
  style,
  colors = ['#191A1A', '#181818'],
  locations = [0, 0.8],
  ...props
}: BackgroundGradientProps & Omit<LinearGradientProps, 'colors'>) {
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
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});
