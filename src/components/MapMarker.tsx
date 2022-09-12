import { StyleSheet } from 'react-native';
import Image from './Image';
import { LatLng, Marker, MarkerProps } from 'react-native-maps';
import { images } from '../assets';
import React from 'react';
import { SvgProps } from 'react-native-svg';

type MapMarkerProps = {
  location: LatLng;
  source?: number | number | React.FC<SvgProps>;
  selected?: boolean;
};

const MapMarker = ({
  location,
  source,
  selected = false,

  ...props
}: MapMarkerProps & Omit<MarkerProps, 'coordinate'>) => {
  return (
    <Marker
      coordinate={{
        latitude: location.latitude,
        longitude: location.longitude,
      }}
      {...props}
    >
      <Image
        source={
          source ?? (selected ? images.mapMarkerYellow : images.mapMarker)
        }
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
    prevProps.selected === nextProps.selected &&
    prevProps.source === nextProps.source,
);
export default MapMarker;
