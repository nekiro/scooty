import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import colors from '../lib/colorScheme';
import LogoHeader from '../components/LogoHeader';
import VariantButton from '../components/VariantButton';
import BackgroundGradient from '../components/BackgroundGradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import PhoneNumberInput from '../components/input/PhoneNumber';
import BaseTextInput from '../components/input/BaseText';
import { isIos } from '../lib';
import Spacer from '../components/Spacer';
import DateInput from '../components/input/Date';

const RegisterScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Register'>) => {
  const onHelpCenterPress = () => {
    //
  };

  const onLoginPress = () => navigation.navigate('Login');
  const onSignUpPress = () => {};

  return (
    <>
      <StatusBar style="light" />
      <BackgroundGradient>
        <SafeAreaView style={styles.mainContainer}>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <KeyboardAvoidingView
              behavior={isIos ? 'padding' : 'height'}
              style={styles.mainContainer}
            >
              <LogoHeader style={styles.header}>Hello</LogoHeader>
              <View style={styles.container}>
                <View style={styles.formView}>
                  <Text style={[styles.text, styles.phoneNumberText]}>
                    Phone Number
                  </Text>
                  <PhoneNumberInput />
                  <View style={styles.sideBySideContainer}>
                    <View style={styles.inputContainer}>
                      <Text style={styles.text}>Name</Text>
                      <BaseTextInput />
                    </View>
                    <Spacer />
                    <View style={styles.inputContainer}>
                      <Text style={styles.text}>Surname</Text>
                      <BaseTextInput />
                    </View>
                  </View>
                  <Text style={[styles.text, styles.birthdayText]}>
                    Birthday
                  </Text>
                  <DateInput />
                  <VariantButton
                    onPress={onSignUpPress}
                    style={styles.button}
                    variant="solid"
                  >
                    Sign Up
                  </VariantButton>
                </View>
                <Text style={[styles.text, styles.signUpText]}>
                  Got an account?{' '}
                  <Text onPress={onLoginPress} style={styles.signUpActionText}>
                    Log in!
                  </Text>
                </Text>
              </View>
              <View style={styles.helpCenterView}>
                <Text onPress={onHelpCenterPress} style={styles.helpCenterText}>
                  Help center
                </Text>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
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
    marginTop: 20,
  },
  sideBySideContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    flex: 6,
  },
  container: { flex: 6, justifyContent: 'center' },
  phoneNumberText: {
    alignSelf: 'flex-start',
  },
  birthdayText: {
    alignSelf: 'flex-start',
  },
  signUpActionText: {
    color: colors.yellow,
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
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  helpCenterText: {
    color: colors.lightGray,
    marginBottom: 10,
  },
  formView: {
    marginHorizontal: 20,
  },
  header: {
    flex: 2,
    justifyContent: 'flex-end',
  },
  text: {
    color: colors.white,
    marginVertical: 15,
  },
});

export default RegisterScreen;
