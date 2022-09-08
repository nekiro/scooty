import {
  View,
  StyleSheet,
  Pressable,
  ViewProps,
  GestureResponderEvent,
  PressableStateCallbackType,
  StyleProp,
  TextStyle,
} from 'react-native';
import Text from './Text';
import colors from '../lib/colorScheme';
import Icon, { IconSource } from './Icon';

type MenuIconOptionPros = {
  children: string;
  iconSource: IconSource;
  textStyle?: StyleProp<TextStyle>;
  height?: number;
  width?: number;
  onPress?: (event: GestureResponderEvent) => void;
};

const MenuIconOption = ({
  children,
  iconSource,
  height = 40,
  width = 40,
  style,
  textStyle,
  onPress,
}: MenuIconOptionPros & ViewProps) => {
  const BaseComponent = () => (
    <View style={[styles.container, style]}>
      <Icon height={height} width={width} source={iconSource} />
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </View>
  );

  return onPress ? (
    <Pressable
      onPress={onPress}
      style={(state: PressableStateCallbackType) =>
        state.pressed
          ? {
              shadowColor: colors.white,
              shadowRadius: 20,
              shadowOpacity: 1,
            }
          : undefined
      }
    >
      <BaseComponent />
    </Pressable>
  ) : (
    <BaseComponent />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  text: { color: colors.white, marginLeft: 30, fontSize: 20 },
});

export default MenuIconOption;
