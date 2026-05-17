import { Tabs } from 'expo-router';

export default function LayoutAbas() {
  return (
    <Tabs>
      <Tabs.Screen name="home/index" options={{ title: 'Home' }} />
      <Tabs.Screen name="pesquisa/index" options={{ title: 'Pesquisar' }} />
      {/* adicionando a aba de perfil crua pra fechar a navegação base */}
      <Tabs.Screen name="perfil/index" options={{ title: 'Perfil' }} />
    </Tabs>
  );
}