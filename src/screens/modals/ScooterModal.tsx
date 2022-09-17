import { View, StyleSheet } from 'react-native';
import { icons, images } from '../../assets';
import Image from '../../components/Image';
import MenuIconOption from '../../components/MenuIconOption';
import Text from '../../components/Text';
import VariantButton from '../../components/Button';
import { ScooterData } from '../../lib/scootersRepo';
import useModal from '../../hooks/useModal';
import RoadmapModal from './RoadmapModal';
import Modal from '../../components/Modal';
import { isIos } from '../../lib';

type ScooterModalProps = {
  scooter?: ScooterData;
};

export default function ScooterModal({ scooter }: ScooterModalProps) {
  const [{ content, visible }, dispatch] = useModal();

  const onReservationPress = () =>
    dispatch({
      type: 'SET_CONTENT',
      content: (
        <RoadmapModal
          onCancelPress={() => dispatch({ type: 'HIDE' })}
          onDrawPress={() => dispatch({ type: 'HIDE' })}
        />
      ),
      show: true,
    });

  if (!scooter) {
    return null;
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.idText}>{scooter.id}</Text>
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
            {scooter.battery} %
          </MenuIconOption>
        </View>
        <View style={[styles.row, styles.scooterContainer]}>
          <Image style={styles.scooter} source={images.scooterSide} />
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.row}>
          <VariantButton style={styles.ringBtn} variant="outlined">
            Ring the Bell
          </VariantButton>
        </View>

        <View style={styles.row}>
          <VariantButton
            style={styles.reservationBtn}
            variant="solid"
            onPress={onReservationPress}
          >
            Reservation
          </VariantButton>
        </View>
      </View>
      <Modal
        preset="center"
        isVisible={visible}
        onHide={() => dispatch({ type: 'HIDE' })}
      >
        {content}
      </Modal>
    </>
  );
}

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
  scooter: { transform: isIos ? [{ rotateY: '180deg' }] : [] },
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
