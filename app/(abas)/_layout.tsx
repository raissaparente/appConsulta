import { Tabs } from 'expo-router';

export default function LayoutAbas() {
  return (
    <Tabs>
       <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="pesquisa" options={{ title: 'Pesquisar' }} />
    </Tabs>
  );
}