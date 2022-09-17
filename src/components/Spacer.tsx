import { View, StyleSheet } from 'react-native';

export default function Spacer() {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
