import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import Text from '../../components/Text';
import Slider from '../../components/Slider';
import VariantButton from '../../components/VariantButton';

const FiltersModal = () => {
  const [battery, setBattery] = useState([35, 100]);
  const [distance, setDistance] = useState([0, 750]);
  const [scooters, setScooters] = useState(0);

  return (
    <View>
      <View style={styles.sliderContainer}>
        <Text style={styles.text}>Battery Level</Text>
        <Slider
          value={battery}
          onValueChange={(value) => setBattery(value as number[])}
        />
      </View>
      <View style={styles.sliderContainer}>
        <Text style={styles.text}>Scooter Distance</Text>
        <Slider
          value={distance}
          onValueChange={(value) => setDistance(value as number[])}
        />
      </View>
      <VariantButton
        variant="solid"
        style={styles.button}
        textStyle={styles.buttonTextStyle}
      >
        <Text>
          Show <Text style={styles.scooterCountText}>{scooters}</Text> Scooters
        </Text>
      </VariantButton>
    </View>
  );
};

const styles = StyleSheet.create({
  text: { color: 'white', fontFamily: 'CeraProBold', fontSize: 15 },
  sliderContainer: { paddingVertical: 20 },
  button: { width: '100%', alignSelf: 'center' },
  buttonTextStyle: { fontFamily: 'CeraProMedium' },
  scooterCountText: { fontFamily: 'CeraProBold' },
});

export default FiltersModal;
