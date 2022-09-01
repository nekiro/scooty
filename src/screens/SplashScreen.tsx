import { StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import BrandLogo from '../components/BrandLogo';
import BackgroundGradient from '../components/BackgroundGradient';

const SplashScreen = () => {
  return (
    <>
      <StatusBar style="light" />
      <BackgroundGradient
        style={styles.gradient}
        colors={['#191A1A', '#181818']}
        locations={[0, 0.8]}
      >
        <SafeAreaView style={styles.container}>
          <BrandLogo type="light" width={styles.logo.width} />
        </SafeAreaView>
      </BackgroundGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    flex: 1,
  },
  logo: {
    width: '60%',
  },
});

export default SplashScreen;
