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
import PhoneNumberInput from '../components/PhoneNumberInput';
import BaseTextInput from '../components/BaseTextInput';
import { isIos } from '../lib';
import Spacer from '../components/Spacer';
import DateInput from '../components/DateInput';

const RegisterScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Register'>) => {
  const onHelpCenterPress = () => {
    //
  };

  const onLoginPress = () => {
    navigation.navigate('Login');
  };
  const onSignUpPress = () => {};

  return (
    <>
      <StatusBar style="light" />
      <BackgroundGradient style={styles.mainContainer}>
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
                <View>
                  <View style={styles.formView}>
                    <Text style={[styles.text, styles.phoneNumberText]}>
                      Phone Number
                    </Text>
                    <PhoneNumberInput style={styles.input} />
                    <View style={styles.sideBySideContainer}>
                      <View style={styles.inputContainer}>
                        <Text style={styles.text}>Name</Text>
                        <BaseTextInput style={styles.input} />
                      </View>
                      <Spacer />
                      <View style={styles.inputContainer}>
                        <Text style={styles.text}>Surname</Text>
                        <BaseTextInput style={styles.input} />
                      </View>
                    </View>
                    <Text style={[styles.text, styles.birthdayText]}>
                      Birthday
                    </Text>
                    <DateInput style={styles.input} />
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
                    <Text
                      onPress={onLoginPress}
                      style={styles.signUpActionText}
                    >
                      Log in!
                    </Text>
                  </Text>
                </View>
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
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    flex: 6,
  },
  container: { width: '100%', flex: 6, justifyContent: 'center' },
  phoneNumberText: {
    alignSelf: 'flex-start',
  },
  birthdayText: {
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
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
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  helpCenterText: {
    color: colors.lightGray,
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
    marginVertical: 15,
  },
});

export default RegisterScreen;
