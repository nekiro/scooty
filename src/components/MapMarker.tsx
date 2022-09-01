import { Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { MapEvent, Marker } from 'react-native-maps';
import { Location } from '../hooks/useLocation';
import { images } from '../assets';

type MapMarkerProps = {
  location: Location;
  source?: ImageSourcePropType;
  onPress?: (
    event: MapEvent<{
      action: 'marker-press';
      id: string;
    }>,
  ) => void;
};

const MapMarker = ({ location, source, onPress }: MapMarkerProps) => {
  return (
    <Marker
      zIndex={1}
      coordinate={{
        latitude: location.latitude,
        longitude: location.longitude,
      }}
      tracksViewChanges={false}
      onPress={onPress}
    >
      <Image source={source ?? images.mapMarker} style={styles.markerImage} />
    </Marker>
  );
};

const styles = StyleSheet.create({
  markerImage: {
    height: 80,
    width: 80,
  },
});

export default MapMarker;
