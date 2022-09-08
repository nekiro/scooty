import { View, StyleSheet } from 'react-native';
import { icons, images } from '../../assets';
import Image from '../../components/Image';
import MenuIconOption from '../../components/MenuIconOption';
import Text from '../../components/Text';
import VariantButton from '../../components/Button';

const ScooterModal = () => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.idText}>SUR4Y1L</Text>
          <MenuIconOption
            height={14}
            width={14}
            style={styles.icon}
            textStyle={styles.iconOptionText}
            iconSource={icons.yellowTime}
          >
            Today 18:10
          </MenuIconOption>
          <MenuIconOption
            height={14}
            width={14}
            style={styles.icon}
            textStyle={styles.iconOptionText}
            iconSource={icons.yellowLocation}
          >
            750 meters
          </MenuIconOption>
          <MenuIconOption
            height={14}
            width={14}
            style={styles.icon}
            textStyle={styles.iconOptionText}
            iconSource={icons.yellowLocation}
          >
            0.60 PLN / minute
          </MenuIconOption>
          <MenuIconOption
            height={14}
            width={14}
            style={styles.icon}
            textStyle={styles.iconOptionText}
            iconSource={icons.yellowBattery}
          >
            75 %
          </MenuIconOption>
        </View>
        <View style={[styles.row, styles.scooterContainer]}>
          <Image source={images.scooterSide} style={styles.scooter} />
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.row}>
          <VariantButton style={styles.ringBtn} variant="outlined">
            Ring the Bell
          </VariantButton>
        </View>

        <View style={styles.row}>
          <VariantButton style={styles.reservationBtn} variant="solid">
            Reservation
          </VariantButton>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
  },
  row: {
    flex: 1,
  },
  scooterContainer: {
    alignItems: 'center',
  },
  scooter: { transform: [{ rotateY: '180deg' }] },
  idText: {
    color: 'white',
    fontFamily: 'CeraProBold',
    fontSize: 25,
    paddingVertical: 10,
  },
  iconOptionText: {
    fontSize: 13,
    marginLeft: 10,
  },
  icon: {
    paddingVertical: 5,
  },
  ringBtn: { marginRight: 10 },
  reservationBtn: { marginLeft: 10 },
});

export default ScooterModal;
