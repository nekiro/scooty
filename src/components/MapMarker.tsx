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
        source={source ?? (pressed ? images.mapMarkerYellow : images.mapMarker)}
        width={pressed ? styles.pressedImage.width : styles.image.width}
        height={pressed ? styles.pressedImage.width : styles.image.height}
      />
    </Marker>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 50,
    width: 50,
  },
  pressedImage: {
    height: 80,
    width: 80,
  },
});

export default React.memo(MapMarker);
