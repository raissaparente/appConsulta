import { Tabs } from 'expo-router';

export default function LayoutAbas() {
  return (
    <Tabs>
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="pesquisa" options={{ title: 'Pesquisar' }} />
      {/* adicionando a aba de perfil crua pra fechar a navegação base */}
      <Tabs.Screen name="perfil" options={{ title: 'Perfil' }} />
    </Tabs>
  );
}