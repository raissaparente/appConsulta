import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, StyleSheet, Text, View } from 'react-native';
import BotaoPrincipal from '../../src/components/BotaoPrincipal';
import { useConsulta } from '../../src/hooks/useConsulta';
import { atualizarStatusConsulta } from '../../src/services/consultaService';

/**
 * Tela que exibe as informações completas de uma consulta.
 * Permite marcar um retorno ou concluir a consulta dependendo do seu status atual.
 */
export default function TelaConsulta() {
  const { id } = useLocalSearchParams();
  const roteador = useRouter();

  // Busca a consulta a partir do ID que vem na URL da rota
  const { consulta, medico } = useConsulta(String(id));

  if (!consulta) return <Text style={styles.loading}>consulta não encontrada</Text>;

  // Quebra a string ISO em Data e Hora para exibir bonitinho
  const [data, hora] = consulta.dataHora.split('T');
  const dataFmt = data.split('-').reverse().join('/');
  const horaFmt = hora.slice(0, 5);

  // Função para marcar a consulta como finalizada no Firebase
  async function concluirConsulta() {
    try {
      await atualizarStatusConsulta(String(id), 'realizada');
      Alert.alert('Sucesso', 'Consulta marcada como concluída!');
      roteador.back(); // Volta pra tela anterior
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível concluir a consulta.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Detalhes da Consulta</Text>
      
      <View style={styles.cardInfo}>
        <Text style={styles.label}>Data</Text>
        <Text style={styles.valor}>{dataFmt}</Text>

        <Text style={styles.label}>Horário</Text>
        <Text style={styles.valor}>{horaFmt}</Text>

        <Text style={styles.label}>Médico</Text>
        <Text style={styles.valor}>{medico?.nome}</Text>
        <Text style={styles.label}>Especialidade</Text>
        <Text style={styles.subValor}>{medico?.especialidade}</Text>
        
        <Text style={styles.label}>Status</Text>
        <Text style={styles.valorStatus}>{consulta.status}</Text>
      </View>

      <BotaoPrincipal
        titulo="Marcar retorno"
        onPress={() =>
          roteador.push(
            `/agendamento/escolher-horario?retorno=true&medicoId=${consulta.medicoId}&pacienteId=${consulta.pacienteId}`
          )
        }
      />

      {consulta.status !== 'realizada' && (
        <BotaoPrincipal
          titulo="Consulta Concluída"
          onPress={concluirConsulta}
          style={styles.botaoSecundario}
        />
      )}
    </View>
  );
}

//BRUNO: ESTILIZAR AQUI (estilos globais dessa tela)
const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1
  },
  loading: {
    padding: 16
  },
  titulo: {
    fontSize: 22,
    marginBottom: 18,
    borderBottomWidth: 1,
    borderRadius: 6 ,
    borderColor:'#898989',
    textAlign: 'left',
    color:'#0F14A5',
    fontWeight: 'bold'
  },
  cardInfo: {
    backgroundColor: '#fff',
    padding: 24,
    marginBottom: 32
  },
  label: {
    padding: 2,
    fontSize: 14,
    marginBottom: 12,
    color:'#0F14A5',
    fontWeight: '600',
    borderBottomWidth: 1 ,
    borderColor: '#898989',
  },
  valor: {
    padding: 2,
    fontSize: 18,
    marginBottom: 12,
    fontWeight: 'bold'
  },
  subValor: {
    fontSize: 18,
    marginBottom: 12,
    fontWeight: 'bold',
    padding: 2,
  },
  valorStatus: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 2
  },
  botaoSecundario: {
    marginTop: -24 
  }
});