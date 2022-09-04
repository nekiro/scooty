import VariantButton from './VariantButton';
import { GestureResponderEvent, ViewStyle, StyleProp } from 'react-native';
import { images } from '../assets';
import Image from './Image';

type StartRidingButtonProps = {
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
};

const StartRidingButton = ({ style, onPress }: StartRidingButtonProps) => {
  return (
    <VariantButton variant="solid" style={style} onPress={onPress}>
      <Image source={images.startRidingIcon} />
    </VariantButton>
  );
};

export default StartRidingButton;
