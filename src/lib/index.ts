import { Platform } from 'react-native';
import { Location } from '../hooks/useLocation';

export const isAndroid = Platform.OS === 'android';
export const isIos = Platform.OS === 'ios';

export const getRegion = (location: Location, delta: number = 0.01) => ({
  longitude: location.longitude,
  latitude: location.latitude,
  latitudeDelta: delta,
  longitudeDelta: delta,
});
