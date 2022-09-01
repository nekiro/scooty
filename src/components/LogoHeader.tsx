import { Text, StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import colors from '../lib/colorScheme';
import BrandLogo from './BrandLogo';

type LogoHeaderProps = {
  children: string;
  style?: StyleProp<ViewStyle>;
};

const LogoHeader = ({ children, style }: LogoHeaderProps) => {
  return (
    <View style={[styles.container, style]}>
      <BrandLogo type="light" style={styles.logo} height={styles.logo.height} />
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
    height: 50,
    marginBottom: 10,
  },
  text: {
    fontFamily: 'CeraProBold',
    fontSize: 25,
    color: colors.white,
  },
});

export default LogoHeader;
