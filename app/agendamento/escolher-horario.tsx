import { View, Text, Pressable, FlatList, ScrollView, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { HorarioDisponivel } from '../../src/models/HorarioDisponivel';
import { getHorariosDoMedico } from '../../src/services/horarioService';

// Gera os próximos 7 dias pra usarmos como calendário horizontal
function gerarProximosDias() {
  const dias = [];
  for (let i = 0; i < 7; i++) {
    const data = new Date();
    data.setDate(data.getDate() + i);
    const dataStr = data.toISOString().split('T')[0]; // "2026-05-15"
    const label = i === 0 ? 'Hoje' : i === 1 ? 'Amanhã' : `${String(data.getDate()).padStart(2, '0')}/${String(data.getMonth() + 1).padStart(2, '0')}`;
    dias.push({ dataStr, label });
  }
  return dias;
}

export default function TelaEscolherHorario() {
  const roteador = useRouter();
  const params = useLocalSearchParams();

  const [horarios, setHorarios] = useState<HorarioDisponivel[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Estado para controlar o dia selecionado no "calendário"
  const dias = gerarProximosDias();
  const [diaSelecionado, setDiaSelecionado] = useState(dias[0].dataStr);

  const isRetorno = params.retorno === 'true';

  useEffect(() => {
    async function carregarHorarios() {
      try {
        if (!params.medicoId) return;
        const dados = await getHorariosDoMedico(String(params.medicoId));
        setHorarios(dados);
      } catch (error) {
        console.log('Erro ao carregar horários:', error);
      } finally {
        setLoading(false);
      }
    }
    carregarHorarios();
  }, [params.medicoId]);

  // Filtra os horários tanto pra retorno (se for o caso) quanto pelo DIA selecionado
  let horariosFiltrados = horarios;

  if (isRetorno && params.medicoId) {
    horariosFiltrados = horariosFiltrados.filter(h => h.medicoId === params.medicoId);
  }

  // Filtra pela data (ex: "2026-05-15") ignorando a hora
  horariosFiltrados = horariosFiltrados.filter(h => h.dataHora.startsWith(diaSelecionado));

  if (loading) return <Text style={styles.loading}>Carregando horários...</Text>;

  return (
    <View style={styles.container}>
      {/* CARD PROGRESSIVO: ETAPA 3 */}
      {params.pacienteNome && (
        <View style={styles.cardResumo}>
          <Text style={styles.cardLabel}>Agendando para:</Text>
          <Text style={styles.cardInfoNome}>{params.pacienteNome}</Text>
          <Text style={styles.cardInfoSub}>CPF: {params.pacienteCpf}</Text>
          <View style={styles.linhaDivisoria} />
          <Text style={styles.cardLabel}>Profissional:</Text>
          <Text style={styles.cardInfoNome}>{params.medicoNome}</Text>
          <Text style={styles.cardInfoSub}>{params.especialidade}</Text>
        </View>
      )}

      <Text style={styles.titulo}>
        Escolher horário
      </Text>

      {/* Carrossel Horizontal de Datas ("Calendário") */}
      <View style={styles.carrosselContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {dias.map(dia => {
            const isSelecionado = diaSelecionado === dia.dataStr;
            return (
              <Pressable
                key={dia.dataStr}
                onPress={() => setDiaSelecionado(dia.dataStr)}
                style={[
                  styles.diaBotao,
                  isSelecionado ? styles.diaBotaoSelecionado : styles.diaBotaoInativo
                ]}
              >
                <Text style={isSelecionado ? styles.diaTextoSelecionado : styles.diaTextoInativo}>
                  {dia.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Lista de Horários do dia selecionado */}
      <FlatList
        data={horariosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          // Extrair só a hora (HH:mm) pra mostrar bonito na tela
          const horaString = item.dataHora.split('T')[1];
          return (
            <Pressable
              style={styles.horarioBotao}
              onPress={() =>
                roteador.push(
                  `/agendamento/confirmar?horarioId=${item.id}&dataHora=${item.dataHora}&medicoId=${item.medicoId}&pacienteId=${params.pacienteId}`
                )
              }
            >
              <Text style={styles.horarioTexto}>{horaString}</Text>
            </Pressable>
          );
        }}
        ListEmptyComponent={
          <Text style={styles.emptyTexto}>Nenhum horário disponível neste dia.</Text>
        }
      />
    </View>
  );
}

// Estilos globais dessa tela pro seu colega alterar depois
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 16
  },
  loading: {
    padding: 16,
    color: '#666'
  },
  cardResumo: {
    backgroundColor: '#e3f2fd',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#1565c0'
  },
  cardLabel: {
    fontSize: 12,
    color: '#1565c0',
    fontWeight: 'bold',
    marginBottom: 4
  },
  cardInfoNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  cardInfoSub: {
    fontSize: 12,
    color: '#666'
  },
  linhaDivisoria: {
    height: 1,
    backgroundColor: '#bbdefb',
    marginVertical: 12
  },
  titulo: {
    fontSize: 20, 
    marginBottom: 16,
    fontWeight: 'bold'
  },
  carrosselContainer: {
    marginBottom: 24
  },
  diaBotao: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
  },
  diaBotaoSelecionado: {
    backgroundColor: '#1976d2',
  },
  diaBotaoInativo: {
    backgroundColor: '#e0e0e0',
  },
  diaTextoSelecionado: {
    color: 'white', 
    fontWeight: 'bold'
  },
  diaTextoInativo: {
    color: 'black', 
    fontWeight: 'bold'
  },
  horarioBotao: {
    padding: 16, 
    backgroundColor: '#eee', 
    marginBottom: 8, 
    borderRadius: 8
  },
  horarioTexto: {
    fontSize: 16, 
    fontWeight: '500'
  },
  emptyTexto: {
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20
  }
});