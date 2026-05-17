import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

import { criarConsulta, getConsultasDoMedico } from '../../src/services/consultaService';
import { bloquearHorario } from '../../src/services/horarioService';
import { getPacienteById } from '../../src/services/pacienteService';
import { getMedicoById } from '../../src/services/medicoService';

import { Paciente } from '../../src/models/Paciente';
import { Medico } from '../../src/models/Medico';

export default function TelaConfirmar() {
  const roteador = useRouter();
  const params = useLocalSearchParams();

  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [medico, setMedico] = useState<Medico | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDadosReais() {
      try {
        if (params.pacienteId && params.medicoId) {
          // Busca os dados do paciente e do médico em paralelo pra ser mais rápido
          const [dadosPaciente, dadosMedico] = await Promise.all([
            getPacienteById(String(params.pacienteId)),
            getMedicoById(String(params.medicoId))
          ]);
          
          setPaciente(dadosPaciente);
          setMedico(dadosMedico);
        }
      } catch (error) {
        console.log('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    }

    carregarDadosReais();
  }, [params.pacienteId, params.medicoId]);

  async function confirmarConsulta() {
    try {
      const consultas = await getConsultasDoMedico(String(params.medicoId));

      const consultaExistente = consultas.find(
        c => c.dataHora === String(params.dataHora)
      );

      if (consultaExistente) {
        alert('Já existe uma consulta nesse horário.');
        return;
      }

      await criarConsulta({
        pacienteId: String(params.pacienteId),
        medicoId: String(params.medicoId),
        dataHora: String(params.dataHora),
        tipo: 'primeira',
        status: 'agendada',
      });

      await bloquearHorario(String(params.horarioId));

      roteador.push('/agendamento/sucesso');
    } catch (error) {
      console.log('Erro ao criar consulta:', error);
    }
  }

  if (loading) return <Text style={styles.loading}>Carregando dados...</Text>;

  // Transforma a string ISO (ex: 2026-05-15T09:00) em algo mais legível pra tela de confirmação
  const [dataPart, horaPart] = String(params.dataHora).split('T');
  const dataFormatada = dataPart.split('-').reverse().join('/'); // "15/05/2026"

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Confirmar consulta
      </Text>

      <View style={styles.blocoDados}>
        <Text style={styles.label}>Paciente</Text>
        <Text style={styles.nome}>{paciente?.nome}</Text>
        <Text style={styles.subtexto}>CPF: {paciente?.cpf}</Text>
      </View>

      <View style={styles.blocoDados}>
        <Text style={styles.label}>Médico</Text>
        <Text style={styles.nome}>{medico?.nome}</Text>
        <Text style={styles.subtexto}>{medico?.especialidade} (CRM: {medico?.crm})</Text>
      </View>

      <View style={styles.blocoDestaque}>
        <Text style={styles.labelDestaque}>Data e Horário</Text>
        <Text style={styles.textoDestaque}>
          {dataFormatada} às {horaPart}
        </Text>
      </View>

      <Pressable
        style={styles.botaoConfirmar}
        onPress={confirmarConsulta}
      >
        <Text style={styles.textoBotao}>Confirmar Agendamento</Text>
      </Pressable>
    </View>
  );
}

//BRUNO: ESTILIZAR AQUI (estilos globais dessa tela)
const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  loading: {
    padding: 16
  },
  titulo: {
    fontSize: 20, 
    marginBottom: 24, 
    fontWeight: 'bold'
  },
  blocoDados: {
    marginBottom: 16, 
    backgroundColor: '#f5f5f5', 
    padding: 16, 
    borderRadius: 8
  },
  label: {
    color: '#666', 
    fontSize: 12
  },
  nome: {
    fontSize: 16, 
    fontWeight: '500'
  },
  subtexto: {
    fontSize: 14, 
    color: '#444'
  },
  blocoDestaque: {
    marginBottom: 32, 
    backgroundColor: '#e3f2fd', 
    padding: 16, 
    borderRadius: 8
  },
  labelDestaque: {
    color: '#1565c0', 
    fontSize: 12
  },
  textoDestaque: {
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#1565c0'
  },
  botaoConfirmar: {
    backgroundColor: '#4caf50', 
    padding: 16, 
    borderRadius: 8, 
    alignItems: 'center'
  },
  textoBotao: {
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 16
  }
});