import React, { useMemo, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import MapView, { Region } from 'react-native-maps';
import BackgroundGradient from '../components/BackgroundGradient';
import { icons, images, logo } from '../assets';
import useLocation, { Location } from '../hooks/useLocation';
import MapMarker from '../components/MapMarker';
import StartRidingButton from '../components/StartRidingButton';
import PressableIcon from '../components/PressableIcon';
import MenuModal from './modals/MenuModal';
import FiltersModal from './modals/FiltersModal';
import { useModal } from '../hooks/useModal';
import ScooterModal from './modals/ScooterModal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getRegion } from '../lib';
import SplashScreen from './SplashScreen';
import Image from '../components/Image';

type MarkerData = {
  latitude: number;
  longitude: number;
  onPress?: () => void;
};

const markersData: MarkerData[] = [
  {
    latitude: 52.242723192503114,
    longitude: 21.084935663900776,
  },
  {
    latitude: 52.24424097016489,
    longitude: 21.077011900354172,
  },
  {
    latitude: 52.244304793602424,
    longitude: 21.082401460227086,
  },
  {
    latitude: 52.244390115317636,
    longitude: 21.087334575289887,
  },
];

const HomeScreen = () => {
  const { location } = useLocation({ onUpdateLocation });
  const { setContentAndShow } = useModal();
  const mapRef = useRef<MapView>(null);

  const MenuModalComponent = useMemo(() => <MenuModal />, []);
  const FilterModalComponent = useMemo(() => <FiltersModal />, []);
  const ScooterModalComponent = useMemo(() => <ScooterModal />, []);

  const animateToRegion = (region: Region, duration: number = 600) =>
    mapRef.current?.animateToRegion(region, duration);

  function onUpdateLocation(location: Location | null) {
    location && animateToRegion(getRegion(location), 1000);
  }

  const showFilters = () => setContentAndShow(FilterModalComponent);
  const showMenu = () => setContentAndShow(MenuModalComponent);
  const onArrowPress = () => location && animateToRegion(getRegion(location));
  const onRideButtonPress = () => setContentAndShow(ScooterModalComponent);

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
          <MapView
            ref={mapRef}
            showsUserLocation={true}
            style={styles.map}
            // onMapLoaded={() => console.log('map loaded')}
          >
            {location &&
              markersData.map((marker) => (
                <MapMarker
                  key={`${marker.latitude}${marker.longitude}`}
                  location={marker}
                  onPress={marker.onPress}
                />
              ))}
          </MapView>
          <BackgroundGradient
            pointerEvents="none"
            style={styles.buttonsGradient}
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
            <StartRidingButton
              style={styles.rideButton}
              onPress={onRideButtonPress}
            />
          </View>
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
    justifyContent: 'flex-start',
  },
  buttonsGradient: {
    zIndex: 0,
    elevation: 0,
    position: 'absolute',
    bottom: 0,
    height: '40%',
    width: '100%',
  },
  buttonsContainer: {
    zIndex: 1,
    elevation: 1,
    position: 'absolute',
    bottom: 0,
    height: '20%',
    width: '85%',
    alignSelf: 'center',
  },
  rideButton: {
    alignSelf: 'center',
    bottom: 45,
    zIndex: 1,
    elevation: 1,
    width: '100%',
  },
  menuIcon: {
    alignSelf: 'flex-start',
    marginLeft: 30,
  },
  filterIcon: {
    alignSelf: 'flex-end',
    marginRight: 30,
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
