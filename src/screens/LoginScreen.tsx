import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import colors from '../lib/colorScheme';
import LogoHeader from '../components/LogoHeader';
import VariantButton from '../components/VariantButton';
import BackgroundGradient from '../components/BackgroundGradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import PhoneNumberInput from '../components/PhoneNumberInput';

const LoginScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Login'>) => {
  const onSignUpPress = () => {
    // navigation.navigate('Login');
  };

  const onHelpCenterPress = () => {
    //
  };

  const onLoginPress = () => {
    //
  };

  return (
    <>
      <StatusBar style="light" />
      <BackgroundGradient style={styles.mainContainer}>
        <SafeAreaView style={styles.mainContainer}>
          <LogoHeader style={styles.header}>Welcome</LogoHeader>
          <View style={styles.container}>
            <View>
              <View style={styles.formView}>
                <Text style={[styles.text, styles.phoneNumberText]}>
                  Phone Number
                </Text>
                <PhoneNumberInput style={styles.phoneNumberInput} />
                <VariantButton
                  onPress={onLoginPress}
                  style={styles.button}
                  variant="solid"
                >
                  Log In
                </VariantButton>
              </View>
              <Text style={[styles.text, styles.signUpText]}>
                Dont have an account?{' '}
                <Text onPress={onSignUpPress} style={styles.signUpActionText}>
                  Sign up!
                </Text>
              </Text>
            </View>
          </View>
          <View style={styles.helpCenterView}>
            <Text onPress={onHelpCenterPress} style={styles.helpCenterText}>
              Help center
            </Text>
          </View>
        </SafeAreaView>
      </BackgroundGradient>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  button: {
    width: '100%',
  },
  container: { width: '100%', flex: 6, justifyContent: 'center' },
  phoneNumberText: {
    alignSelf: 'flex-start',
  },
  phoneNumberInput: {
    width: '100%',
  },
  signUpActionText: {
    color: 'yellow',
    fontFamily: 'CeraProBold',
  },
  signUpText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 13,
    fontFamily: 'CeraProMedium',
  },
  helpCenterView: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  helpCenterText: {
    color: 'gray',
    marginBottom: 10,
  },
  formView: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  header: {
    flex: 2,
    justifyContent: 'flex-end',
  },
  text: {
    color: colors.white,
    marginBottom: 10,
  },
});

export default LoginScreen;
