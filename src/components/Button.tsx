import {
  Pressable,
  StyleSheet,
  GestureResponderEvent,
  Text,
  ViewStyle,
  StyleProp,
  TextStyle,
} from 'react-native';
import colors from '../lib/colorScheme';

export type ButtonVariant = 'solid' | 'outlined' | 'link';

type ButtonProps = {
  variant: ButtonVariant;
  onPress?: (event: GestureResponderEvent) => void;
  children?: string | JSX.Element;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  glow?: boolean;
};

export default function Button({
  variant,
  onPress,
  children,
  style,
  textStyle,
  glow = false,
}: ButtonProps) {
  return (
    <Pressable
      style={(state) => [
        styles.base,
        state.pressed ? { ...styles[variant], opacity: 0.8 } : styles[variant],

        style,
        glow ? styles.glow : undefined,
      ]}
      onPress={onPress}
    >
      {typeof children === 'string' ? (
        <Text style={[styles.baseText, styles[`${variant}Text`], textStyle]}>
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 50,
  },
  baseText: {
    fontFamily: 'CeraProBold',
    fontSize: 15,
    paddingHorizontal: 20,
  },
  solid: {
    backgroundColor: colors.yellow,
    borderWidth: 1,
    borderColor: colors.black,
  },
  solidText: {},
  outlined: {
    borderWidth: 2,
    borderColor: colors.yellow,
  },
  outlinedText: {
    color: colors.yellow,
  },
  linkText: {
    color: colors.white,
    opacity: 0.75,
  },
  link: {},
  glow: {
    shadowColor: '#eef511',
    shadowOffset: { height: 0, width: 7 },
    shadowRadius: 33,
    shadowOpacity: 0.3,
  },
});
