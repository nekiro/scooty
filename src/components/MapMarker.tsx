import { StyleSheet } from 'react-native';
import Image from './Image';
import { MapEvent, Marker } from 'react-native-maps';
import { Location } from '../hooks/useLocation';
import { images } from '../assets';
import React from 'react';
import { SvgProps } from 'react-native-svg';

type MapMarkerProps = {
  location: Location;
  source?: number | number | React.FC<SvgProps>;
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
      coordinate={{
        latitude: location.latitude,
        longitude: location.longitude,
      }}
      tracksViewChanges={false}
      onPress={onPress}
    >
      <Image
        source={source ?? images.mapMarker}
        style={styles.markerImage}
        width={styles.markerImage.width}
        height={styles.markerImage.height}
      />
    </Marker>
  );
};

const styles = StyleSheet.create({
  markerImage: {
    height: 50,
    width: 50,
  },
});

export default MapMarker;
