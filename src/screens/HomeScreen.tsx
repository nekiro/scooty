import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import MapView, { LatLng, MapEvent } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import BrandLogo from '../components/BrandLogo';
import BackgroundGradient from '../components/BackgroundGradient';
import BarIcon from '../components/BarIcon';
import { images } from '../assets';
import useLocation from '../hooks/useLocation';
import MapMarker from '../components/MapMarker';

const markersData: any[] = [
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

const HomeScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Home'>) => {
  const location = useLocation(true);

  const showFilters = () => {
    //
  };

  const showMenu = () => {
    //
  };

  console.log(location);

  return (
    <>
      <StatusBar style="light" />
      <BackgroundGradient style={styles.mainContainer}>
        <SafeAreaView
          style={styles.mainContainer}
          edges={['right', 'top', 'left']}
          mode="padding"
        >
          <View style={styles.bar}>
            <BarIcon
              source={images.menuIcon}
              iconStyle={styles.menuIcon}
              onPress={showMenu}
            />
            <BrandLogo
              type="light"
              height="60"
              width="150"
              style={styles.logo}
            />
            <BarIcon
              source={images.filtersIcon}
              iconStyle={styles.filterIcon}
              onPress={showFilters}
            />
          </View>
          <MapView
            showsUserLocation={true}
            style={styles.map}
            region={
              location
                ? {
                    latitude: location?.latitude,
                    longitude: location?.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }
                : undefined
            }
          >
            {location &&
              markersData.map((marker) => (
                <MapMarker
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  key={`${marker.latitude}${marker.longitude}`}
                  location={marker}
                  onPress={marker.onPress}
                />
              ))}
          </MapView>
        </SafeAreaView>
      </BackgroundGradient>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingBottom: 0,
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
