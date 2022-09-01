import {
  Image,
  StyleSheet,
  StyleProp,
  ImageSourcePropType,
  ViewStyle,
  ImageStyle,
  Pressable,
  GestureResponderEvent,
} from 'react-native';

type BarIconProps = {
  iconStyle?: StyleProp<ImageStyle>;
  style?: StyleProp<ViewStyle>;
  source: ImageSourcePropType;
  onPress?: (event: GestureResponderEvent) => void;
};

const BarIcon = ({ style, source, iconStyle, onPress }: BarIconProps) => {
  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <Image
        source={source}
        style={[styles.image, iconStyle]}
        resizeMode="contain"
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: 22,
    height: 22,
  },
});

export default BarIcon;
