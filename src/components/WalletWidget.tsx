import {
  View,
  StyleSheet,
  ViewProps,
  Pressable,
  GestureResponderEvent,
} from 'react-native';
import { icons, images, logo } from '../assets';
import colors from '../lib/colorScheme';
import Icon from './Icon';
import Image from './Image';
import Text from './Text';

type WalletWidgetProps = {
  name: string;
  money: string;
  onPress?: (event: GestureResponderEvent) => void;
};

const WalletLogo = () => (
  <View style={styles.walletLogoContainer}>
    <Image source={logo.dark} width={60} height={20} />
    <Text style={styles.walletLogoText}>wallet</Text>
  </View>
);

const WalletWidget = ({
  name,
  money,
  style,
  onPress,
}: WalletWidgetProps & ViewProps) => (
  <Pressable onPress={onPress}>
    <View style={[styles.container, style]}>
      <Image source={images.bigLetterS} style={styles.letter}></Image>
      <View style={styles.rowContainer}>
        <Text>{name}</Text>
        <WalletLogo />
      </View>
      <View style={[styles.rowContainer, styles.bottomRowContainer]}>
        <Text style={styles.money}>{money}</Text>
        <Icon
          height={36}
          width={36}
          style={styles.goArrow}
          source={icons.goArrow}
        />
      </View>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    height: 153,
    width: 325,
    backgroundColor: colors.yellow,
    borderRadius: 10,
    padding: 20,
  },
  bottomRowContainer: { alignItems: 'flex-end' },
  goArrow: {
    alignSelf: 'flex-end',
  },
  walletLogoContainer: {
    flexDirection: 'row',
    alignContent: 'flex-start',
  },
  walletLogoText: {
    fontSize: 16,
    marginLeft: 2,
    color: '#3B3D10',
  },
  rowContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  letter: {
    alignSelf: 'flex-end',
    position: 'absolute',
    opacity: 0.4,
  },
  money: {
    fontSize: 35,
    fontFamily: 'CeraProBold',
    alignSelf: 'flex-end',
  },
});

export default WalletWidget;
