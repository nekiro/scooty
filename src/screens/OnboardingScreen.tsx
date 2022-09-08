import { StyleSheet, Text, ImageBackground, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import colors from '../lib/colorScheme';
import VariantButton from '../components/Button';
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
          colors={['transparent', colors.black]}
          locations={[0, 0.8]}
        >
          <View style={styles.content}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                Get the freedom of transportation with
              </Text>
              <Image
                source={logo.light}
                width="50%"
                height={25}
                style={styles.logo}
              />
            </View>
            <View>
              <VariantButton
                textStyle={styles.buttonText}
                onPress={onLoginPress}
                variant="solid"
              >
                Log In
              </VariantButton>
              <VariantButton
                textStyle={styles.buttonText}
                onPress={onSignUpPress}
                style={styles.signUp}
                variant="outlined"
              >
                Sign up
              </VariantButton>
            </View>
          </View>
        </BackgroundGradient>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  logo: { marginTop: 5, marginBottom: 25 },
  image: {
    flex: 1,
  },
  textContainer: {
    alignItems: 'center',
  },
  signUp: {
    marginTop: 20,
  },
  buttonText: {
    fontFamily: 'CeraProBold',
    fontSize: 20,
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
