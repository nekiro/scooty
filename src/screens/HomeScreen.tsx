import { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { MapEvent } from 'react-native-maps';
import BackgroundGradient from '../components/BackgroundGradient';
import { icons, images, logo } from '../assets';
import useLocation from '../hooks/useLocation';
import { MemoizedMapMarker } from '../components/MapMarker';
import PressableIcon from '../components/PressableIcon';
import MenuModal from './modals/MenuModal';
import FiltersModal from './modals/FiltersModal';
import useModal from '../hooks/useModal';
import ScooterModal from './modals/ScooterModal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getRegion, isAndroid, isIos } from '../lib';
import Image from '../components/Image';
import VariantButton from '../components/Button';
import useDimensions from '../hooks/useDimensions';
import Modal from '../components/Modal';
import mapStyle from '../assets/mapStyle';
import scooters, { ScooterData } from '../lib/scootersRepo';
import useSplash from '../hooks/useSplash';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
  const { vh } = useDimensions();
  const { location } = useLocation();
  const [{ visible, content }, dispatch] = useModal();
  const [chosenScooter, setChosenScooter] = useState<ScooterData | undefined>();
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<MapView>(null);
  const { show: showSplash, hide: hideSplash } = useSplash();

  const MenuModalComponent = useMemo(
    () => <MenuModal hideCallback={() => dispatch({ type: 'HIDE' })} />,
    [],
  );
  const FilterModalComponent = useMemo(() => <FiltersModal />, []);

  useEffect(() => {
    if (location && mapLoaded) {
      hideSplash();
    }
  }, [location, mapLoaded]);

  const showFilters = () =>
    dispatch({
      type: 'SET_CONTENT',
      content: FilterModalComponent,
      show: true,
    });
  const showMenu = () =>
    dispatch({
      type: 'SET_CONTENT',
      content: MenuModalComponent,
      show: true,
    });
  const onArrowPress = () =>
    location && mapRef.current?.animateToRegion(getRegion(location), 600);
  const onRideButtonPress = () => true; // TODO
  const onHide = () => {
    if (chosenScooter) {
      setChosenScooter(undefined);
    }

    dispatch({ type: 'HIDE' });
  };

  const onMarkerPress = (
    event: MapEvent<{
      action: 'marker-press';
      id: string;
    }>,
  ) => {
    const scooter = scooters.find(
      (scooter) => scooter.id === event.nativeEvent.id,
    );

    if (scooter) {
      setChosenScooter(scooter);
      dispatch({
        type: 'SET_CONTENT',
        content: <ScooterModal scooter={scooter} />,
        show: true,
      });

      mapRef.current?.animateToRegion(
        getRegion({ ...scooter.coordinate }),
        600,
      );
    }
  };

  return (
    <>
      <StatusBar style="light" />
      <View
        style={styles.mainContainer}
        onLayout={() => {
          if (!location || !mapLoaded) {
            showSplash();
          }
        }}
      >
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
          <View style={styles.map}>
            {location && (
              <MapView
                ref={mapRef}
                showsUserLocation={true}
                style={styles.map}
                customMapStyle={mapStyle}
                userInterfaceStyle="dark"
                moveOnMarkerPress={false}
                showsMyLocationButton={false}
                initialRegion={getRegion(location)}
                onMapReady={() => isIos && setMapLoaded(true)}
                onMapLoaded={() => isAndroid && setMapLoaded(true)}
              >
                {scooters.map((scooter) => (
                  <MemoizedMapMarker
                    key={scooter.id}
                    identifier={scooter.id}
                    location={scooter.coordinate}
                    onPress={onMarkerPress}
                    selected={chosenScooter?.id === scooter.id}
                  />
                ))}
              </MapView>
            )}
          </View>

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
          <Modal preset="bottom" isVisible={visible} onHide={onHide}>
            {content}
          </Modal>
        </SafeAreaView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#191A1A',
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
    backgroundColor: '#191A1A',
  },
  map: { flex: 1 },
});
