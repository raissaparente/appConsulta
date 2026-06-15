import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
  const { consulta, medico} = useConsulta(String(id));

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
      <View style={styles.cardInfo}>
        
        <Text style={styles.label}>MÉDICO</Text>
        <Text style={styles.valor}>{medico?.nome}</Text>
        
        <Text style={styles.label}>ESPECIALIDADE</Text>
        <Text style={styles.valor}>{medico?.especialidade}</Text>
      
        <Text style={styles.label}>TIPO</Text>
        <Text style={styles.valor}>{consulta?.tipo}</Text>

        <Text style={styles.label}>DATA</Text>
        <Text style={styles.valor}>{dataFmt}</Text>

        <Text style={styles.label}>HORÁRIO</Text>
        <Text style={styles.valor}>{horaFmt}</Text>       
      </View>

{consulta.status !== 'realizada' && (
        <BotaoPrincipal
          titulo="Consulta Concluída"
          onPress={concluirConsulta}
        />
      )}

   <TouchableOpacity 
        style={styles.botaoSecundario}
        activeOpacity={0.8}
        onPress={() =>
          roteador.push(
            `/agendamento/escolher-horario?retorno=true&medicoId=${consulta.medicoId}&pacienteId=${consulta.pacienteId}`
          )
        }
      >
        <Text style={styles.botaoSecundarioTexto}>Marcar Retorno</Text>
      </TouchableOpacity>
    </View>
  );
}

//BRUNO: ESTILIZAR AQUI (estilos globais dessa tela)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  loading: {
    padding: 16,
    textAlign: 'center',
    color: '#7A869A',
  },
  cardInfo: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  label: {
   fontSize: 12,
    fontWeight: '700',
    color: '#200C83', 
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  valor: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 16,
  },
  botaoSecundario: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  botaoSecundarioTexto: {
    color: '#1E5393',
    fontWeight: '700',
    fontSize: 14,
  },
});