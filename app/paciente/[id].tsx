import { View, Text, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { usePaciente } from '../../src/hooks/usePaciente';

export default function TelaPaciente() {
  const { id } = useLocalSearchParams();
  const roteador = useRouter();

  const { paciente, consultas, loading } = usePaciente(String(id));

  if (loading) return <Text style={{ padding: 16 }}>Carregando dados do paciente...</Text>;

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      {/* CARD DE DADOS DO PACIENTE */}
      <View style={{ backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 24, elevation: 2 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}>{paciente?.nome}</Text>
        <Text style={{ color: '#666', marginBottom: 4 }}>CPF: {paciente?.cpf}</Text>
        <Text style={{ color: '#666' }}>Nascimento: {paciente?.dataNascimento || 'Não informado'}</Text>
      </View>

      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Consultas</Text>

      {/* LISTA DE CONSULTAS COMO CARDS */}
      {consultas.length === 0 ? (
        <Text style={{ color: '#666', fontStyle: 'italic', marginBottom: 24 }}>
          Nenhuma consulta registrada.
        </Text>
      ) : (
        consultas.map(c => {
          const [data, hora] = c.dataHora.split('T');
          const dataFmt = data.split('-').reverse().join('/');
          
          return (
            <Pressable
              key={c.id}
              style={{
                backgroundColor: '#f8f9fa',
                padding: 16,
                borderRadius: 8,
                marginBottom: 12,
                borderLeftWidth: 4,
                borderLeftColor: c.status === 'concluída' ? '#4caf50' : '#2196f3'
              }}
              onPress={() => roteador.push(`/consulta/${c.id}`)}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{dataFmt} às {hora}</Text>
                <Text style={{ color: '#666', textTransform: 'capitalize' }}>{c.status}</Text>
              </View>
              <Text style={{ color: '#888', fontSize: 12 }}>ID Médico: {c.medicoId}</Text>
            </Pressable>
          );
        })
      )}

      {/* BOTÃO DE NOVA CONSULTA */}
      <Pressable
        style={{
          backgroundColor: '#1976d2',
          padding: 16,
          borderRadius: 8,
          alignItems: 'center',
          marginTop: 12,
          marginBottom: 40
        }}
        onPress={() => roteador.push(`/agendamento/escolher-especialidade?pacienteId=${id}`)}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>+ Nova Consulta</Text>
      </Pressable>
    </ScrollView>
  );
}