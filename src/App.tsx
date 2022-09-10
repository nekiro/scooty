import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { registerRootComponent } from 'expo';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import { StyleSheet } from 'react-native';
import useCachedResources from './hooks/useResources';
import { SplashContextProvider } from './hooks/useSplash';

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

export default function App() {
  const loaded = useCachedResources();
  if (!loaded) {
    return null;
  }

  return (
    <>
      <SplashContextProvider>
        <SafeAreaProvider style={styles.safeArea}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={screenOptions}
              initialRouteName="Home"
            >
              <Stack.Screen name="Onboarding" component={OnboardingScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </SplashContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'transparent',
  },
});

registerRootComponent(App);
