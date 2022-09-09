import { useEffect, useMemo, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import MapView, { LatLng, MapEvent, Region } from 'react-native-maps';
import BackgroundGradient from '../components/BackgroundGradient';
import { icons, images, logo } from '../assets';
import useLocation, { Location } from '../hooks/useLocation';
import MapMarker from '../components/MapMarker';
import PressableIcon from '../components/PressableIcon';
import MenuModal from './modals/MenuModal';
import FiltersModal from './modals/FiltersModal';
import { useModal } from '../hooks/useModal';
import ScooterModal from './modals/ScooterModal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getRegion } from '../lib';
import SplashScreen from './SplashScreen';
import Image from '../components/Image';
import VariantButton from '../components/Button';
import useDimensions from '../hooks/useDimensions';
import Modal from '../components/Modal';

export type ScooterData = {
  id: string;
  coordinate: LatLng;
  battery: number;
};

const scooters: ScooterData[] = [
  {
    id: 'WAW01A',
    coordinate: { latitude: 52.242723192503114, longitude: 21.084935663900776 },
    battery: 10,
  },
  {
    id: 'WAW02A',
    coordinate: { latitude: 52.24424097016489, longitude: 21.077011900354172 },
    battery: 20,
  },
  {
    id: 'WAW03A',
    coordinate: { latitude: 52.244304793602424, longitude: 21.082401460227086 },
    battery: 100,
  },
  {
    id: 'WAW04A',
    coordinate: { latitude: 52.244390115317636, longitude: 21.087334575289887 },
    battery: 70,
  },
];

const HomeScreen = () => {
  const { vh } = useDimensions();
  const { location } = useLocation({ onUpdateLocation });
  const { setContentAndShow, setContent, hide, show, visible, content } =
    useModal();
  const [chosenScooter, setChosenScooter] = useState<ScooterData | undefined>();
  const mapRef = useRef<MapView>(null);

  const MenuModalComponent = useMemo(() => <MenuModal />, []);
  const FilterModalComponent = useMemo(() => <FiltersModal />, []);
  const ScooterModalComponent = useMemo(
    () => <ScooterModal scooter={chosenScooter} />,
    [chosenScooter],
  );

  useEffect(() => setContent(ScooterModalComponent), [chosenScooter]);

  const animateToRegion = (region: Region, duration: number = 600) =>
    mapRef.current?.animateToRegion(region, duration);

  function onUpdateLocation(location: Location | null) {
    location && animateToRegion(getRegion(location), 1000);
  }

  const showFilters = () => setContentAndShow(FilterModalComponent);
  const showMenu = () => setContentAndShow(MenuModalComponent);
  const onArrowPress = () => location && animateToRegion(getRegion(location));
  const onRideButtonPress = () => true;

  const onMarkerPress = (
    event: MapEvent<{
      action: 'marker-press';
      id: string;
    }>,
  ) => {
    const scooter = scooters.find(
      (scooter) => scooter.id === event.nativeEvent.id,
    );

    if (!scooter) {
      // send error
      return;
    }

    setChosenScooter(scooter);
    show();
  };

  if (!location) {
    return <SplashScreen />;
  }

  return (
    <>
      <StatusBar style="light" />
      <BackgroundGradient style={styles.mainContainer}>
        <SafeAreaView
          style={styles.mainContainer}
          edges={['right', 'top', 'left']}
        >
          <View style={styles.bar}>
            <PressableIcon
              source={icons.hamburger}
              iconStyle={styles.menuIcon}
              onPress={showMenu}
            />
            <Image
              source={logo.light}
              height={60}
              width={150}
              style={styles.logo}
            />
            <PressableIcon
              source={icons.filters}
              iconStyle={styles.filterIcon}
              onPress={showFilters}
            />
          </View>
          <MapView ref={mapRef} showsUserLocation={true} style={styles.map}>
            {location &&
              scooters.map((scooter) => (
                <MapMarker
                  key={scooter.id}
                  identifier={scooter.id}
                  location={scooter.coordinate}
                  onPress={onMarkerPress}
                />
              ))}
          </MapView>
          <BackgroundGradient
            pointerEvents="none"
            style={[styles.buttonsGradient, { height: vh(30) }]}
            colors={['transparent', '#191A1A']}
            locations={[0.2, 1]}
          />
          <View style={styles.buttonsContainer}>
            <PressableIcon
              style={styles.arrow}
              source={images.arrowWithBg}
              width={50}
              height={50}
              onPress={onArrowPress}
            />
            <VariantButton
              variant="solid"
              style={styles.rideButton}
              onPress={onRideButtonPress}
            >
              <Image source={images.startRidingIcon} />
            </VariantButton>
          </View>
          <Modal preset="bottom" isVisible={visible} onHide={hide}>
            {content}
          </Modal>
        </SafeAreaView>
      </BackgroundGradient>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  arrow: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  buttonsGradient: {
    zIndex: 0,
    elevation: 0,
    position: 'absolute',
    bottom: 0,
    // height: '30vh',
    width: '100%',
  },
  buttonsContainer: {
    zIndex: 1,
    elevation: 1,
    position: 'absolute',
    bottom: 45,
    width: '85%',
    alignSelf: 'center',
  },
  rideButton: {
    alignSelf: 'center',
    width: '100%',
  },
  menuIcon: {
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  filterIcon: {
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  logo: {
    flex: 5,
  },
  bar: {
    flexDirection: 'row',
  },
  map: { flex: 1 },
});

export default HomeScreen;
