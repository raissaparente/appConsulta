import { Stack } from 'expo-router';

export default function LayoutRaiz() {
  return (
    <Stack>
      <Stack.Screen name="(abas)" options={{ headerShown: false }} />
    </Stack>
  );
}