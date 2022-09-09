import { StyleSheet } from 'react-native';
import Image from './Image';
import { LatLng, Marker, MarkerProps } from 'react-native-maps';
import { images } from '../assets';
import React from 'react';
import { SvgProps } from 'react-native-svg';

type MapMarkerProps = {
  location: LatLng;
  source?: number | number | React.FC<SvgProps>;
};

const MapMarker = ({
  location,
  source,
  ...props
}: MapMarkerProps & Omit<MarkerProps, 'coordinate'>) => {
  return (
    <Marker
      coordinate={{
        latitude: location.latitude,
        longitude: location.longitude,
      }}
      tracksViewChanges={false}
      zIndex={1}
      {...props}
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
