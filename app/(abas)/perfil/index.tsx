import { View, Text, Pressable } from 'react-native';

export default function TelaPerfil() {
  return (
    <View style={{ padding: 16 }}>
      {/* tela crua de perfil, só com a estrutura dos dados */}
      <Text>Perfil do Funcionário</Text>
      
      <Text style={{ marginTop: 20 }}>Nome: Funcionário Teste</Text>
      
      <Pressable style={{ marginTop: 20 }}>
        <Text>Meus Dados</Text>
      </Pressable>
      
      <Pressable style={{ marginTop: 20 }}>
        <Text>Alterar Senha</Text>
      </Pressable>
    </View>
  );
}
