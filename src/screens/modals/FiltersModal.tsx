import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import Text from '../../components/Text';
import Slider from '../../components/slider/Slider';
import VariantButton from '../../components/VariantButton';

const FiltersModal = () => {
  const [battery, setBattery] = useState([35, 100]);
  const [distance, setDistance] = useState([0, 750]);
  const [scooters] = useState(0);

  return (
    <View>
      <View style={styles.sliderContainer}>
        <Text style={styles.text}>Battery Level</Text>
        <Slider
          minimumValue={0}
          maximumValue={100}
          value={battery}
          onValueChange={(value) => setBattery(value as number[])}
        />
      </View>
      <View style={styles.sliderContainer}>
        <Text style={styles.text}>Scooter Distance</Text>
        <Slider
          minimumValue={0}
          maximumValue={750}
          value={distance}
          onValueChange={(value) => setDistance(value as number[])}
        />
      </View>
      <VariantButton variant="solid" textStyle={styles.buttonTextStyle}>
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
  buttonTextStyle: { fontFamily: 'CeraProMedium' },
  scooterCountText: { fontFamily: 'CeraProBold' },
});

export default FiltersModal;
