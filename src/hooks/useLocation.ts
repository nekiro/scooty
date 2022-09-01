import { useEffect, useMemo, useState } from 'react';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  reverseGeocodeAsync,
  watchPositionAsync,
  LocationSubscription,
  LocationObject,
} from 'expo-location';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { CountryCode } from 'react-native-country-picker-modal';

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

const useLocation = (watchLocation = false) => {
  const [location, setLocation] = useState<Location | null>(null);
  const phoneUtil = useMemo(() => PhoneNumberUtil.getInstance(), [location]);

  const updateLocation = async (location: LocationObject) => {
    const { latitude, longitude } = location.coords;
    const response = await reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (!response || response.length == 0) {
      return;
    }

    const { isoCountryCode, city, country, postalCode, street, streetNumber } =
      response[0];

    setLocation({
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
    });
  };

  useEffect(() => {
    let subscription: LocationSubscription;
    (async () => {
      try {
        const { status } = await requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          return;
        }

        if (watchLocation) {
          subscription = await watchPositionAsync({}, (location) =>
            updateLocation(location),
          );
        } else {
          await updateLocation(await getCurrentPositionAsync());
        }
      } catch (err) {
        console.log(err);
      }
    })();

    return () => subscription.remove();
  }, []);

  return location;
};

export default useLocation;
