import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
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
          <Text style={styles.cardLabel}>DADOS DO PACIENTE</Text>
          
          <Text style={styles.cardInfo}><Text style={styles.cardInfoSub}>Paciente: </Text>{params.pacienteNome}</Text>
          <Text style={styles.cardInfo}><Text style={styles.cardInfoSub}>CPF: </Text>{params.pacienteCpf}</Text>
          <Text style={styles.cardInfo}><Text style={styles.cardInfoSub}>Especialidade: </Text>{params.especialidade}</Text>
          <Text style={styles.cardInfo}><Text style={styles.cardInfoSub}>Médico: </Text>{params.medicoNome}</Text>
        </View>
      )}

      <Text style={styles.titulo}>
        ESCOLHER HORÁRIO
      </Text>

      {/* Carrossel Horizontal de Datas ("Calendário") */}
      <View style={styles.carrosselContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carrosselScroll}>
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
        numColumns={3}  // Coloca uma grade de 3 colunas
        showsVerticalScrollIndicator={false} //Barrinha de rolagem na vertical some
        renderItem={({ item }) => {
          // Extrair só a hora (HH:mm) pra mostrar bonito na tela:
          const horaString = item.dataHora.split('T')[1];
          return (
            <Pressable
              style={({ pressed }) => [
                styles.horarioBotao,
                pressed && styles.horarioBotaoPressionado 
              ]}
              onPress={() => {
                const queryParams = new URLSearchParams({
                  horarioId: item.id,
                  dataHora: item.dataHora,
                  medicoId: item.medicoId,
                  pacienteId: String(params.pacienteId || ''),
                  pacienteNome: String(params.pacienteNome || ''),
                  pacienteCpf: String(params.pacienteCpf || ''),
                  medicoNome: String(params.medicoNome || ''),
                  especialidade: String(params.especialidade || ''),
                });

                if (params.retorno === 'true') {
                  queryParams.append('retorno', 'true');
                }
                if (params.remarcarId) {
                  queryParams.append('remarcarId', String(params.remarcarId));
                }

                roteador.push(`/agendamento/confirmar?${queryParams.toString()}`);
              }}
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

//BRUNO: ESTILIZAR AQUI (estilos globais dessa tela)
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 24,
    paddingHorizontal: 20,
    backgroundColor: '#F3F4F6'
  },
  loading: {
    padding: 16,
    textAlign: 'center',
    color: '#7A869A'
  },
  cardResumo: {
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#C9C9C9',
    backgroundColor: '#FFFFFF'
  },
  cardLabel: {
    fontSize: 10,
    marginBottom: 4,
    color: '#1E5393',
    fontWeight: '500'
  },
  cardInfo: {
    fontSize: 16,
    color:'#000000',
    fontWeight: '500'
  },
  cardInfoSub:{
    color: '#1E5393',
    fontWeight: '600'
  },
  titulo: {
    fontSize: 20, 
    marginBottom: 16,
  },
  carrosselContainer: {
    marginBottom: 24
  },
  carrosselScroll:{
    paddingRight: 20
  },
  diaBotao: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 6,
    borderWidth : 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  diaBotaoSelecionado: {
    backgroundColor: '#1E5393',
    borderColor: '#1E5393',
    },
  diaBotaoInativo: {
 backgroundColor: '#FFFFFF',
 borderColor: '#E2E8F0',
  },
  diaTextoSelecionado: {
    color: '#FFFFFF',
  },
  diaTextoInativo: {
    color: '#C9C9C9',
    fontWeight: '600'
  },
  horarioBotaoPressionado:{
    backgroundColor: '#1E5393',
    color: '#FFFFFF'
  },
  horarioBotao: {
    width : '31%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 2
  },
  horarioTexto: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  emptyTexto: {
    textAlign: 'center',
    marginTop: 30,
    color: '#000',
    fontWeight: '500',
    fontSize: 14
  }
});