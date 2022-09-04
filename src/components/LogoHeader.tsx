import { Text, StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import { logo } from '../assets';
import colors from '../lib/colorScheme';
import Image from './Image';

type LogoHeaderProps = {
  children: string;
  style?: StyleProp<ViewStyle>;
};

const LogoHeader = ({ children, style }: LogoHeaderProps) => {
  return (
    <View style={[styles.container, style]}>
      <Image source={logo.light} style={styles.logo} height={50} width={200} />
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    marginBottom: 10,
  },
  text: {
    fontFamily: 'CeraProBold',
    fontSize: 25,
    color: colors.white,
  },
});

export default LogoHeader;
