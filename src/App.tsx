import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { registerRootComponent } from 'expo';
import { fonts } from './assets';

import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';

export type RootStackParamList = {
  Home: undefined;
  Onboarding: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const screenOptions = { headerShown: false };

export default function App() {
  const [loaded] = useFonts(fonts);

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator screenOptions={screenOptions} initialRouteName="Login">
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

registerRootComponent(App);
