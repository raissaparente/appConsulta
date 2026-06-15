import { FontAwesome5 } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function LayoutAbas() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#003366',
        tabBarInactiveTintColor: '#5c677d',
        tabBarStyle: {
          paddingBottom: 5,
          paddingHorizontal: 6
        },
      }}
    >
      {/* 1. ABA AGENDAMENTOS*/}
      <Tabs.Screen 
        name="home/index" 
        options={{ 
          headerShown:false,
          title: 'Agendamentos',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="clipboard-list" size={size} color={color} />
          )
        }} 
      />

      {/* 2. ABA PESQUISA */}
      <Tabs.Screen 
        name="pesquisa/index" 
        options={{ 
          headerShown:false,
          title: 'Pesquisa',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="search" size={size} color={color} />
          )
        }}  
      />
      {/* 3. ABA PERFIL */}
      <Tabs.Screen 
        name="perfil/index" 
        options={{ 
          headerShown:false,
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user" size={size} color={color} />
          )
        }} 
      />
    </Tabs>
  );
}