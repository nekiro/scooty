import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { registerRootComponent } from 'expo';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import { StyleSheet } from 'react-native';
import useCachedResources from './hooks/useResources';
import useSplash, { SplashProvider } from './hooks/useSplash';
import { NavigationContainer } from '@react-navigation/native';

import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';

export type RootStackParamList = {
  Home: undefined;
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  Splash: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  headerBackVisible: false,
};

const App = () => {
  const { hide } = useSplash();
  const loaded = useCachedResources();

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider style={styles.safeArea}>
      <NavigationContainer onReady={hide}>
        <Stack.Navigator screenOptions={screenOptions} initialRouteName="Login">
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'transparent',
  },
});

const AppWithSplashProvider = () => {
  return (
    <SplashProvider>
      <App />
    </SplashProvider>
  );
};

registerRootComponent(AppWithSplashProvider);

export default AppWithSplashProvider;
