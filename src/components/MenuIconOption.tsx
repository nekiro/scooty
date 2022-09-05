import {
  View,
  StyleSheet,
  Pressable,
  ViewProps,
  GestureResponderEvent,
  PressableStateCallbackType,
} from 'react-native';
import Text from './Text';
import colors from '../lib/colorScheme';
import Icon, { IconSource } from './Icon';

type MenuIconOptionPros = {
  children: string;
  iconSource: IconSource;
  onPress?: (event: GestureResponderEvent) => void;
};

const MenuIconOption = ({
  children,
  iconSource,
  style,
  onPress,
}: MenuIconOptionPros & ViewProps) => {
  const BaseComponent = () => (
    <View style={[styles.container, style]}>
      <Icon height={40} width={40} source={iconSource} />
      <Text style={styles.text}>{children}</Text>
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
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  text: { color: colors.white, paddingLeft: 30, fontSize: 20 },
});

export default MenuIconOption;
