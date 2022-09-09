import { LatLng } from 'react-native-maps';

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
export default scooters;
