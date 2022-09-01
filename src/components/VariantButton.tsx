import {
  Pressable,
  StyleSheet,
  GestureResponderEvent,
  Text,
  ViewStyle,
  StyleProp,
} from 'react-native';
import colors from '../lib/colorScheme';

type VariantButtonProps = {
  variant: 'solid' | 'outlined';
  onPress?: (event: GestureResponderEvent) => void;
  children?: string;
  style?: StyleProp<ViewStyle>;
};

const VariantButton = ({
  variant,
  onPress,
  children,
  style,
}: VariantButtonProps) => {
  return (
    <Pressable style={[styles.base, styles[variant], style]} onPress={onPress}>
      <Text style={[styles.baseText, styles[`${variant}Text`]]}>
        {children}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: 10,
    height: 50,
    width: '90%',
  },
  baseText: {
    fontFamily: 'CeraProBold',
    fontSize: 20,
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
});

export default VariantButton;
