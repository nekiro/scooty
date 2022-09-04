import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import * as Fonts from 'expo-font';
import { registerRootComponent } from 'expo';
import { fonts } from './assets';
import { ModalContextProvider } from './hooks/useModal';
// import * as SplashScreen from 'expo-splash-screen';

import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import { StyleSheet } from 'react-native';

export type RootStackParamList = {
  Home: undefined;
  Onboarding: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  headerBackVisible: false,
};

// Instruct SplashScreen not to hide yet, we want to do this manually
// SplashScreen.preventAutoHideAsync().catch(() => {
//   /* reloading the app might trigger some race conditions, ignore them */
// });

export default function App() {
  const [fontsLoaded] = Fonts.useFonts(fonts);
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider style={styles.safeArea}>
      <NavigationContainer>
        <ModalContextProvider>
          <Stack.Navigator
            screenOptions={screenOptions}
            initialRouteName="Home"
          >
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </ModalContextProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'black',
  },
});

registerRootComponent(App);
