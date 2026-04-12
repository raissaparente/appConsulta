import { View, Text, StyleSheet } from 'react-native';

export default function Card({ title }: { title: string }) {
  return (
    <View style={styles.card}>
      <Text>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#eee',
    margin: 10,
  },
});