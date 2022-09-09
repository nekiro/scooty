import { View, StyleSheet } from 'react-native';
import Text from '../../components/Text';
import Image from '../../components/Image';
import { images } from '../../assets';
import Button from '../../components/Button';

type RoadmapModalProps = {
  onDrawPress?: () => void;
  onCancelPress?: () => void;
};

const RoadmapModal = ({ onDrawPress, onCancelPress }: RoadmapModalProps) => {
  return (
    <>
      <View style={styles.container}>
        <Image source={images.roadmap} />
        <View style={styles.textContainer}>
          <Text style={styles.header}>Draw a Roadmap</Text>
          <Text style={styles.information}>
            Draw the most suitable road map to reach the scooter you have booked
            faster
          </Text>
        </View>
        <Button style={styles.button} variant="solid" onPress={onDrawPress}>
          Yes!
        </Button>
        <Button
          style={styles.cancelButton}
          variant="link"
          onPress={onCancelPress}
        >
          No, thanks
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 20,
  },
  cancelButton: {
    marginTop: 10,
  },
  button: {
    marginTop: 35,
    width: 153,
  },
  information: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    opacity: 0.5,
    marginTop: 5,
  },
  textContainer: {
    alignItems: 'center',
    width: '65%',
    marginTop: 20,
  },
  header: {
    color: 'white',
    fontSize: 25,
    fontFamily: 'CeraProBold',
  },
});

export default RoadmapModal;
