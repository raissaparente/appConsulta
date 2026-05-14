import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function TelaAlterarSenha() {
  const roteador = useRouter();

  function salvarNovaSenha() {
    Alert.alert('Sucesso', 'Sua senha foi atualizada!');
    roteador.back();
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}>Alterar Senha</Text>

      <Text style={{ marginBottom: 4, fontWeight: '500' }}>Senha Atual</Text>
      <TextInput
        style={{ backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', marginBottom: 16 }}
        placeholder="Digite a senha atual"
        secureTextEntry
      />

      <Text style={{ marginBottom: 4, fontWeight: '500' }}>Nova Senha</Text>
      <TextInput
        style={{ backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', marginBottom: 16 }}
        placeholder="Digite a nova senha"
        secureTextEntry
      />

      <Text style={{ marginBottom: 4, fontWeight: '500' }}>Confirmar Nova Senha</Text>
      <TextInput
        style={{ backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', marginBottom: 32 }}
        placeholder="Confirme a nova senha"
        secureTextEntry
      />

      <Pressable
        style={{ backgroundColor: '#1976d2', padding: 16, borderRadius: 8, alignItems: 'center' }}
        onPress={salvarNovaSenha}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Atualizar Senha</Text>
      </Pressable>
    </View>
  );
}
