import { Tabs } from 'expo-router';

export default function LayoutAbas() {
  return (
    <Tabs>
       <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="search" options={{ title: 'Pesquisar' }} />
    </Tabs>
  );
}