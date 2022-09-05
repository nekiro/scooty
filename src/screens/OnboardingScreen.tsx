import { StyleSheet, Text, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import colors from '../lib/colorScheme';
import VariantButton from '../components/VariantButton';
import BackgroundGradient from '../components/BackgroundGradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { images, logo } from '../assets';
import Image from '../components/Image';

const OnboardingScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Onboarding'>) => {
  const onLoginPress = () =>
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  const onSignUpPress = () =>
    navigation.reset({ index: 0, routes: [{ name: 'Register' }] });

  return (
    <>
      <StatusBar style="light" />
      <ImageBackground
        source={images.onboardingBackground}
        style={styles.image}
        resizeMode="cover"
      >
        <BackgroundGradient
          style={styles.gradient}
          colors={['transparent', colors.black]}
          locations={[0, 0.8]}
        >
          <Text style={styles.text}>
            Get the freedom of transportation with
          </Text>
          <Image
            source={logo.light}
            width="50%"
            height={25}
            style={styles.logo}
          />
          <VariantButton onPress={onLoginPress} variant="solid">
            Log In
          </VariantButton>
          <VariantButton onPress={onSignUpPress} variant="outlined">
            Sign up
          </VariantButton>
        </BackgroundGradient>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 60,
  },
  logo: { marginTop: 5, marginBottom: 25 },
  image: {
    flex: 1,
  },
  text: {
    fontFamily: 'CeraProBold',
    fontSize: 35,
    color: colors.white,
    margin: 0,
    lineHeight: 45,
  },
});

export default OnboardingScreen;
