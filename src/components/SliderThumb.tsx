import { View, StyleSheet } from 'react-native';
import Text from './Text';

const SliderThumb = ({ value }: { value?: number | number[] }) => {
  return value ? (
    <View style={styles.container}>
      <View style={styles.thumb} />
      <Text style={styles.text}>{value}</Text>
    </View>
  ) : (
    <View style={styles.thumb} />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  thumb: {
    height: 17,
    width: 17,
    borderRadius: 10,
    backgroundColor: 'yellow',
  },
  text: {
    color: '#F3F3F3',
    fontSize: 15,
    alignSelf: 'center',
    marginTop: 5,
    opacity: 0.5,
  },
});

export default SliderThumb;
