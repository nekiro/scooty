import { StyleSheet, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { images } from '../assets';

const SplashScreen = () => {
  return (
    <>
      <StatusBar style="light" />
      <ImageBackground
        source={images.splashBg}
        style={styles.container}
        resizeMode="cover"
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});

export default SplashScreen;
