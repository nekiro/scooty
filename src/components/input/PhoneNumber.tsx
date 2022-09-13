import { useState } from 'react';
import {
  StyleSheet,
  StyleProp,
  TextStyle,
  View,
  Text,
  TextInput,
} from 'react-native';
import CountryPicker, {
  Country,
  CountryCode,
  DARK_THEME,
} from 'react-native-country-picker-modal';
import useLocation, { Location } from '../../hooks/useLocation';
import colors from '../../lib/colorScheme';

type PhoneNumberInputProps = {
  style?: StyleProp<TextStyle>;
};
type CountryCodes = { callingCode: string | number; countryCode: string };

const PhoneNumberInput = ({ style }: PhoneNumberInputProps) => {
  const [pickerVisible, setPickerVisible] = useState(false);
  useLocation({ onUpdateLocation });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState<CountryCodes>({
    callingCode: '50',
    countryCode: 'DE',
  });

  function onUpdateLocation(location: Location | null) {
    if (!location) return;

    setCountry({
      callingCode: location.callingCode,
      countryCode: location.countryCode,
    });
  }

  const onCountryCallNumberPress = () => setPickerVisible(true);
  const onCountrySelect = (country: Country) =>
    setCountry({
      callingCode: country.callingCode[0] ?? '48',
      countryCode: country.cca2,
    });

  const onPickerClose = () => setPickerVisible(false);

  return (
    <View style={[styles.container, style]}>
      <Text onPress={onCountryCallNumberPress} style={styles.countryCodeText}>
        (+{country.callingCode})
      </Text>
      <TextInput
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={(text) => {
          setPhoneNumber(
            phoneNumber.length < text.length
              ? text.replace(/[^0-9]/g, '')
              : text,
          );
        }}
        style={styles.input}
      />
      <CountryPicker
        theme={DARK_THEME}
        withCallingCode={true}
        withFilter={true}
        countryCode={country.countryCode as CountryCode}
        preferredCountries={['PL']}
        onSelect={onCountrySelect}
        onClose={onPickerClose}
        visible={pickerVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 5,
    padding: 15,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    textAlign: 'left',
    width: '100%',
    fontSize: 17,
    fontFamily: 'CeraProMedium',
    marginLeft: 5,
  },
  countryCodeText: {
    fontFamily: 'CeraProBold',
    color: colors.lightGray,
    opacity: 0.25,
    fontSize: 17,
  },
});

export default PhoneNumberInput;
