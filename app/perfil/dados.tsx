import { View, Text } from 'react-native';

export default function TelaMeusDados() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}>Meus Dados</Text>

      <View style={{ backgroundColor: '#fff', padding: 16, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', marginBottom: 16 }}>
        <Text style={{ color: '#666', fontSize: 12 }}>Nome Completo</Text>
        <Text style={{ fontSize: 16, fontWeight: '500' }}>Funcionário Teste da Silva</Text>
      </View>

      <View style={{ backgroundColor: '#fff', padding: 16, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', marginBottom: 16 }}>
        <Text style={{ color: '#666', fontSize: 12 }}>Matrícula</Text>
        <Text style={{ fontSize: 16, fontWeight: '500' }}>123456</Text>
      </View>

      <View style={{ backgroundColor: '#fff', padding: 16, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', marginBottom: 16 }}>
        <Text style={{ color: '#666', fontSize: 12 }}>Cargo</Text>
        <Text style={{ fontSize: 16, fontWeight: '500' }}>Recepcionista</Text>
      </View>

      <Text style={{ color: '#666', textAlign: 'center', marginTop: 20 }}>
        Para alterar seus dados cadastrais, entre em contato com o RH.
      </Text>
    </View>
  );
}
