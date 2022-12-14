import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  Alert,
} from 'react-native';
import colors from '../../lib/colorScheme';
import LogoHeader from '../../components/LogoHeader';
import VariantButton from '../../components/Button';
import BackgroundGradient from '../../components/BackgroundGradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { SafeAreaView } from 'react-native-safe-area-context';
import { isIos } from '../../lib';
import Field from '../../components/Field';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { type SchemaType, schema } from './schema';
import { formatFormErrors } from '../../lib/index';

export default function LoginScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Login'>) {
  const { control, handleSubmit } = useForm<SchemaType>({
    defaultValues: {
      phone: '',
    },
    resolver: yupResolver(schema),
  });

  const onSignUpPress = () => navigation.navigate('Register');
  const onHelpCenterPress = () => {};
  const onLoginPress = (data: SchemaType) => {
    // hit api in real scenario
    navigation.navigate('Home');
  };

  return (
    <>
      <StatusBar style="light" />
      <BackgroundGradient>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <SafeAreaView style={styles.mainContainer}>
            <KeyboardAvoidingView
              behavior={isIos ? 'padding' : 'height'}
              style={styles.mainContainer}
            >
              <LogoHeader style={styles.header}>Welcome</LogoHeader>
              <View style={styles.container}>
                <View style={styles.formView}>
                  <Text style={[styles.text, styles.phoneNumberText]}>
                    Phone Number
                  </Text>
                  <Field type="phone" name="phone" control={control} />
                  <VariantButton
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onPress={handleSubmit(onLoginPress, (errors) =>
                      Alert.alert('Invalid data', formatFormErrors(errors)),
                    )}
                    style={styles.button}
                    textStyle={styles.buttonText}
                    variant="solid"
                  >
                    Log In
                  </VariantButton>
                </View>
                <Pressable
                  style={({ pressed }) => {
                    return [
                      styles.signUpContainer,
                      { opacity: pressed ? 0.9 : 1 },
                    ];
                  }}
                  onPress={onSignUpPress}
                >
                  <Text style={[styles.text, styles.signUpText]}>
                    Dont have an account?{' '}
                    <Text style={styles.signUpActionText}>Sign up!</Text>
                  </Text>
                </Pressable>
              </View>
              <View style={styles.helpCenterView}>
                <Text onPress={onHelpCenterPress} style={styles.helpCenterText}>
                  Help center
                </Text>
              </View>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </BackgroundGradient>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  button: {
    marginTop: 20,
  },
  buttonText: {
    fontFamily: 'CeraProBold',
    fontSize: 20,
  },
  container: { flex: 6, justifyContent: 'center' },
  phoneNumberText: {
    alignSelf: 'flex-start',
  },
  signUpContainer: {
    marginTop: 20,
    paddingTop: 20,
  },
  signUpActionText: {
    color: colors.yellow,
    fontFamily: 'CeraProBold',
  },
  signUpText: {
    textAlign: 'center',
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
    paddingHorizontal: 20,
  },
  header: {
    flex: 2,
    justifyContent: 'flex-end',
  },
  text: {
    color: colors.white,
    marginBottom: 15,
  },
});
