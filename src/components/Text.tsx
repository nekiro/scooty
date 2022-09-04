import { TextProps, StyleSheet, Text as ReactNativeText } from 'react-native';

const Text = ({ style, ...props }: TextProps) => {
  return <ReactNativeText style={[styles.text, style]} {...props} />;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'CeraProMedium',
    fontSize: 20,
  },
});

export default Text;
