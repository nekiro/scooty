import colors from '../lib/colorScheme';
import {
  StyleSheet,
  TextInput,
  StyleProp,
  KeyboardTypeOptions,
  TextStyle,
  TextInputProps,
} from 'react-native';

type BaseTextInputProps = {
  keyboardType?: KeyboardTypeOptions;
  style?: StyleProp<TextStyle>;
  placeholder?: string;
  children?: JSX.Element | JSX.Element[] | string;
} & Partial<TextInputProps>;

const BaseTextInput = ({
  style,
  keyboardType = 'default',
  placeholder,
  children,
  ...props
}: BaseTextInputProps) => {
  return (
    <TextInput
      style={[styles.input, style]}
      keyboardType={keyboardType}
      placeholder={placeholder}
      placeholderTextColor="#cbd5e0"
      {...props}
    >
      {children}
    </TextInput>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: '90%',
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
    backgroundColor: colors.white,
    color: colors.black,
    fontFamily: 'CeraProMedium',
    fontSize: 17,
  },
});

export default BaseTextInput;
