import { StyleSheet, Animated } from 'react-native';
import { logo } from '../assets';
import useDimensions from '../hooks/useDimensions';
import BackgroundGradient from '../components/BackgroundGradient';
import Image from '../components/Image';
import { useEffect, useRef } from 'react';
import Modal from 'react-native-modal';
import { StatusBar } from 'expo-status-bar';

const Splash = ({ visible }: { visible: boolean }) => {
  const { vh, vw, height } = useDimensions();

  const fadeAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [fadeAnim]);

  return (
    <>
      <StatusBar style="light" />
      <Modal
        isVisible={visible}
        style={styles.modal}
        animationInTiming={1}
        animationOutTiming={700}
        animationOut="fadeOut"
        hasBackdrop={false}
      >
        <BackgroundGradient
          style={[styles.container, { height: vh(100), width: vw(100) }]}
        >
          <Animated.View
            style={[
              styles.container,
              { height: vh(100), width: vw(100), opacity: fadeAnim },
            ]}
          >
            <Image
              source={logo.light}
              width={250}
              height={50}
              style={{ top: height / 2 - 50 }}
            />
          </Animated.View>
        </BackgroundGradient>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
  },
  modal: { margin: 0 },
});

export default Splash;
