import { useEffect, useMemo, useState } from 'react';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  reverseGeocodeAsync,
  watchPositionAsync,
  LocationSubscription,
  LocationObject,
  Accuracy,
} from 'expo-location';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { CountryCode } from 'react-native-country-picker-modal';
import { isAndroid } from '../lib';

export type Location = {
  latitude: number;
  longitude: number;
  callingCode: number;
  countryCode: CountryCode;
  city: string | null;
  country: string | null;
  postalCode: string | null;
  street: { name: string | null; number: number | null };
};

type UseLocationProps = {
  watchLocation?: boolean;
  onUpdateLocation?: (location: Location | null) => void;
};

const useLocation = ({
  watchLocation = false,
  onUpdateLocation,
}: UseLocationProps = {}) => {
  const [location, setLocation] = useState<Location | null>();
  const [locationSubscription, setLocationSubscription] =
    useState<LocationSubscription | null>(null);
  const phoneUtil = useMemo(() => PhoneNumberUtil.getInstance(), []);

  const updateLocation = async (rawLocation?: LocationObject) => {
    if (!rawLocation) {
      rawLocation = await getCurrentPositionAsync({
        accuracy: isAndroid ? Accuracy.Low : Accuracy.Lowest,
      });
    }

    const { latitude, longitude } = rawLocation.coords;
    const response = await reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (!response || response.length === 0) {
      return;
    }

    const { isoCountryCode, city, country, postalCode, street, streetNumber } =
      response[0];

    const formattedLocation: Location = {
      latitude,
      longitude,
      callingCode: phoneUtil.getCountryCodeForRegion(isoCountryCode as string),
      countryCode: isoCountryCode as CountryCode,
      city,
      country,
      postalCode,
      street: {
        name: street,
        number: parseInt(streetNumber as string),
      },
    };

    setLocation(formattedLocation);

    // callback
    onUpdateLocation?.(formattedLocation);
  };

  useEffect(() => {
    void (async () => {
      try {
        const { status } = await requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          return;
        }

        if (watchLocation) {
          setLocationSubscription(
            await watchPositionAsync(
              {},
              async (location) => await updateLocation(location),
            ),
          );
        } else {
          await updateLocation(await getCurrentPositionAsync());
        }
      } catch (err) {
        console.log(err);
      }
    })();

    return () => locationSubscription?.remove();
  }, []);

  return { location, updateLocation };
};

export default useLocation;
