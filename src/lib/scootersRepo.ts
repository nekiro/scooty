import { LatLng } from 'react-native-maps';

export type ScooterData = {
  id: string;
  coordinate: LatLng;
  battery: number;
};

const scooters: ScooterData[] = [
  {
    id: 'US01A',
    coordinate: { latitude: 37.33177795068115, longitude: -122.03117605512774 },
    battery: 10,
  },
  {
    id: 'US02A',
    coordinate: { latitude: 37.3306859879122, longitude: -122.0307576305467 },
    battery: 20,
  },
  {
    id: 'US03A',
    coordinate: { latitude: 37.33264809714939, longitude: -122.02807542169391 },
    battery: 100,
  },
];

export default scooters;
