import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from 'react-native';
import colors from '../lib/colorScheme';
import LogoHeader from '../components/LogoHeader';
import VariantButton from '../components/Button';
import BackgroundGradient from '../components/BackgroundGradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import PhoneNumberInput from '../components/input/PhoneNumber';
import BaseTextInput from '../components/input/BaseText';
import { isIos } from '../lib';
import Spacer from '../components/Spacer';
import DateInput from '../components/input/Date';
import { useEffect, useState } from 'react';

const RegisterScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Register'>) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const onHelpCenterPress = () => {}; // TODO?
  const onLoginPress = () => navigation.navigate('Login');
  const onSignUpPress = () => navigation.navigate('Login');

  useEffect(() => {
    const didShow = Keyboard.addListener('keyboardWillShow', () =>
      setKeyboardVisible(true),
    );
    const didHide = Keyboard.addListener('keyboardWillHide', () =>
      setKeyboardVisible(false),
    );
    return () => {
      didShow.remove();
      didHide.remove();
    };
  }, []);

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
              <LogoHeader
                style={[styles.header, { opacity: keyboardVisible ? 0 : 10 }]}
              >
                Hello
              </LogoHeader>

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
                    textStyle={styles.buttonText}
                  >
                    Sign Up
                  </VariantButton>
                </View>
                <View>
                  <Pressable
                    style={styles.loginContainer}
                    onPress={onLoginPress}
                  >
                    <Text style={[styles.text, styles.loginText]}>
                      Got an account?{' '}
                      <Text style={styles.loginActionText}>Log in!</Text>
                    </Text>
                  </Pressable>
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
  buttonText: {
    fontFamily: 'CeraProBold',
    fontSize: 20,
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
  loginActionText: {
    color: colors.yellow,
    fontFamily: 'CeraProBold',
  },
  loginContainer: {
    marginTop: 20,
  },
  loginText: {
    textAlign: 'center',
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
