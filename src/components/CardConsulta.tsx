import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CardConsulta({
  pacienteNome,
  medicoNome,
  dataHora,
  tipo,
  status,
  especialidadeMedico,
  onPress
}) {

  const formatarHora = (stringData) => {
    if (!stringData) return '00:00';
    const regexHora = /(\d{2}:\d{2})/;
    const encontrado = stringData.match(regexHora);
    return encontrado ? encontrado[0] : stringData;
  };

  // Lógica de Cores da Tag baseada no Status e no Tipo
  const getEstiloTag = () => {
    // 1. Se o status no banco for 'realizada', força a tag a virar "Concluída" cinza
    if (status === 'realizada') {
       return { textoTag: 'CONCLUÍDO', fundo: '#00ff11ff', textoCor: '#4a684eff' };
    }
    // 2. Se não estiver realizada, exibe o tipo da consulta (Urgente, Retorno, etc.)
    const tipoNormalizado = tipo?.toLowerCase() || '';
    if (tipoNormalizado.includes('urgente')) {
      return { textoTag: 'URGENTE', fundo: '#FEE2E2', textoCor: '#EF4444' };
    }
    if (tipoNormalizado.includes('retorno')) {
      return { textoTag: 'RETORNO', fundo: '#E0F2FE', textoCor: '#0284C7' };
    }

    // Padrão caso seja uma consulta normal aguardando
    return { textoTag: 'AGUARDANDO', fundo: '#EDF2F7', textoCor: '#A0AEC0' };
  };

  const configuracaoTag = getEstiloTag();

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>

      {/* Linha 1: Horário e Tag de Status Dinâmica */}
      <View style={styles.linhaTopo}>
        <Text style={styles.horario}>{formatarHora(dataHora)}</Text>
        <View style={[styles.tag, { backgroundColor: configuracaoTag.fundo }]}>
          <Text style={[styles.tagTexto, { color: configuracaoTag.textoCor }]}>
            {configuracaoTag.textoTag}
          </Text>
        </View>
      </View>

      {/* Linha 2: Informação do Paciente */}
      <View style={styles.blocoInfo}>
        <Text style={styles.label}>PACIENTE</Text>
        <Text style={styles.valorPrincipal}>{pacienteNome}</Text>
      </View>

      {/* Linha 3: Médico e Especialidade */}
      <View style={styles.linhaRodape}>
        <View style={styles.coluna}>
          <Text style={styles.label}>MÉDICO</Text>
          <Text style={styles.valorSecundario}>{medicoNome}</Text>
        </View>
        <View style={styles.coluna}>
          <Text style={styles.label}>ESPECIALIDADE</Text>
          <Text style={styles.valorSecundario}>{especialidadeMedico}</Text>
        </View>
      </View>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  linhaTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  horario: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F2042'
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6
  },
  tagTexto: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5
  },
  blocoInfo: {
    marginBottom: 12
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: '#9CA3AF',
    marginBottom: 2
  },
  valorPrincipal: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937'
  },
  linhaRodape: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  coluna: {
    flex: 1
  },
  valorSecundario: {
    fontSize: 13,
    fontWeight: '500',
    color: '#4B5563'
  },
});