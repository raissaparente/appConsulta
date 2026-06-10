import { StyleSheet, Text, View } from 'react-native';

export default function Card({ title, subtitle }: { title: string, subtitle: string }) {
  return (
    <View style={styles.card}>
      <Text>{title}</Text>
      <Text>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    margin: 10,
  },
});