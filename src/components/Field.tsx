import { View } from 'react-native';
import { Controller, Control, FieldError } from 'react-hook-form';
import PhoneNumberInput from './input/PhoneNumber';
import BaseTextInput from './input/BaseText';
import DateInput from './input/Date';
import Text from './Text';

type FieldProps = {
  type: 'phone' | 'text' | 'date';
  name: string;
  control: Control<any>;
  error?: FieldError;
};

const typeToComponent = {
  phone: PhoneNumberInput,
  text: BaseTextInput,
  date: DateInput,
};

export default function Field({ type, control, name, error }: FieldProps) {
  const Component = typeToComponent[type];
  if (!Component) {
    return null;
  }

  return (
    <View>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Component onChangeText={onChange} onBlur={onBlur} value={value} />
        )}
        name={name}
      />
      {error && <Text>{error.message}</Text>}
    </View>
  );
}
