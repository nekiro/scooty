import { StyleSheet } from 'react-native';
import Image from './Image';
import { LatLng, Marker, MarkerProps } from 'react-native-maps';
import { images } from '../assets';
import React from 'react';
import { SvgProps } from 'react-native-svg';

type MapMarkerProps = {
  location: LatLng;
  source?: number | number | React.FC<SvgProps>;
  pressed?: boolean;
};

const MapMarker = ({
  location,
  source,
  pressed = false,
  identifier,
  ...props
}: MapMarkerProps & Omit<MarkerProps, 'coordinate'>) => {
  console.log(identifier, pressed);

  return (
    <Marker
      coordinate={{
        latitude: location.latitude,
        longitude: location.longitude,
      }}
      zIndex={1}
      identifier={identifier}
      {...props}
    >
      <Image
        source={source ?? (pressed ? images.mapMarkerYellow : images.mapMarker)}
        width={styles.image.width}
        height={styles.image.height}
      />
    </Marker>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 50,
    width: 50,
  },
});

export const MemoizedMapMarker = React.memo(
  MapMarker,
  (prevProps, nextProps) =>
    prevProps.pressed === nextProps.pressed &&
    prevProps.source === nextProps.source,
);
export default MapMarker;
