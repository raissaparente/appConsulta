import { StyleSheet, Text, View } from 'react-native';

export default function Card({ title, subtitle }: { title: string, subtitle: string }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    fontSize: 20,
  },
  title: {
    fontSize: 16,
    color: '#1E5393',
    fontWeight: 'bold',
    paddingBottom: 4
  },
  subtitle:{
    fontSize: 14,
    color: '#1E5393',
    fontWeight: '400'
  }
});