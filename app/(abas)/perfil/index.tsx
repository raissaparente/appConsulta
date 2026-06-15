import { Feather, SimpleLineIcons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { addDoc, collection } from 'firebase/firestore';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { db } from '../../../src/services/firebase';
export default function TelaPerfil() {
  const roteador = useRouter();

  // SCRIPT TEMPORÁRIO PARA POPULAR O BANCO
  async function popularBanco() {
    try {
      Alert.alert('Aviso', 'Populando banco, olhe o terminal...');

      const medicos = [
        { nome: 'Dr. João Silva', crm: '12345', especialidade: 'Cardiologia' },
        { nome: 'Dra. Maria Souza', crm: '67890', especialidade: 'Dermatologia' },
      ];

      const medicosRefs = [];
      for (const medico of medicos) {
        const docRef = await addDoc(collection(db, 'medicos'), medico);
        medicosRefs.push(docRef.id);
        console.log('Médico criado:', medico.nome, docRef.id);
      }

      // criar 2 pacientes
      const pacientes = [
        { nome: 'Carlos Eduardo', cpf: '111.222.333-44', dataNascimento: '15/05/1980', criadoEm: new Date().toISOString() },
        { nome: 'Fernanda Lima', cpf: '555.666.777-88', dataNascimento: '22/10/1992', criadoEm: new Date().toISOString() }
      ];

      const pacienteRefs = [];
      for (const paciente of pacientes) {
        const docRef = await addDoc(collection(db, 'pacientes'), paciente);
        pacienteRefs.push(docRef.id);
        console.log('Paciente criado:', paciente.nome, docRef.id);
      }

      const hoje = new Date();
      const dataHoje = hoje.toISOString().split('T')[0];

      // criar 2 consultas para HOJE vinculando os pacientes aos médicos
      const consultas = [
        {
          pacienteId: pacienteRefs[0],
          medicoId: medicosRefs[0],
          dataHora: `${dataHoje}T10:00`,
          tipo: 'primeira',
          status: 'agendada'
        },
        {
          pacienteId: pacienteRefs[1],
          medicoId: medicosRefs[1],
          dataHora: `${dataHoje}T14:30`,
          tipo: 'retorno',
          status: 'agendada'
        }
      ];

      for (const consulta of consultas) {
        await addDoc(collection(db, 'consultas'), consulta);
      }

      // CRIAR HORÁRIOS DISPONÍVEIS PARA OS PRÓXIMOS 7 DIAS
      const horasDisponiveis = ['09:00', '10:30', '13:00', '15:30', '17:00'];

      for (let i = 0; i < 7; i++) {
        const data = new Date();
        data.setDate(data.getDate() + i);
        const dataFmt = data.toISOString().split('T')[0];

        for (const medicoId of medicosRefs) {
          for (const hora of horasDisponiveis) {
            // não criar horário disponível se já foi usado nas consultas fake de hoje
            if (i === 0 && medicoId === medicosRefs[0] && hora === '10:00') continue;
            if (i === 0 && medicoId === medicosRefs[1] && hora === '14:30') continue;

            await addDoc(collection(db, 'horarios'), {
              medicoId,
              dataHora: `${dataFmt}T${hora}`,
              disponivel: true
            });
          }
        }
      }

      console.log('Seed concluído com sucesso!');
      Alert.alert('Sucesso!', 'Dados e horários gerados no Firebase!');
    } catch (error) {
      console.error('Erro no seed:', error);
      Alert.alert('Erro', 'Deu ruim, olha o terminal.');
    }
  }

  return (
    <View style={styles.container}>
      {/*Cabeçalho da Página com título e seta que retorna para a tela inicial e botão de opções(teste)*/}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => roteador.back()}>
          <Feather name="arrow-left" size={24} color="#150080" style={styles.seta} />
        </TouchableOpacity>
        <Text style={styles.titulo}>
          Perfil do Funcionário</Text>
        <SimpleLineIcons name="options-vertical" size={24} color="black" style={styles.opcao} />
      </View>
      {/* Texto mostrando nome e cargo do usuário: */}
      <View>
        <Text style={styles.textoNome}>Mariana Silva</Text>
        <Text style={styles.cargo}>Recepcionista</Text>
      </View>

      {/* Cards com seção de acesso aos dados do usuário e Alteração de senha */}

      <TouchableOpacity
        style={styles.Botao}
        onPress={() => roteador.push('/perfil/dados')}
      >
        <View style={styles.iconeDados}>
          <Feather
            name="user"
            size={24}
            color="#003D82"
          />
        </View>

        <View style={styles.areaTexto}>
          <Text style={styles.textoInfo}>Meus Dados</Text>
          <Text style={styles.textoInfosub}>
            Visualizar informações pessoais
          </Text>
        </View>

        <Feather
          name="chevron-right"
          size={24}
          color="#8A8A8A"
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.Botao}
        onPress={() => roteador.push('/perfil/senha')}
      >
        <View style={styles.iconeSenha}>
          <MaterialIcons
            name="lock-outline"
            size={24}
            color="#4B5563"
          />
        </View>

        <View style={styles.areaTexto}>
          <Text style={styles.textoInfo}>Alterar Senha</Text>
          <Text style={styles.textoInfosub}>
            Redefinir credenciais de acesso
          </Text>
        </View>

        <Feather
          name="chevron-right"
          size={24}
          color="#8A8A8A"
        />
      </TouchableOpacity>

      {/* Função de Logout (falta sincronizar com o banco de dados)*/}
      <TouchableOpacity
        style={styles.logout}>
        <MaterialIcons name="exit-to-app" size={24} color="#E53935" />
        <Text style={styles.textoLogout}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

//BRUNO: ESTILIZAR AQUI (estilos globais dessa tela)
const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 4
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderRadius: 8,
    borderColor: '#C9C9C9',
    shadowColor: '#000'
  },
  seta: {
    marginTop: 30,
    paddingRight: 12
  },
  titulo: {
    fontSize: 18,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 40,
  },
  opcao: {
    flexDirection: 'row',
    marginTop: 30,
    marginLeft: 120,
  },
  textoNome: {
    marginTop: 30,
    fontSize: 20,
    textAlign: 'center',
    color: '#000',
    fontWeight: '700'
  },
  cargo: {
    textAlign: 'center',
    fontSize: 14,
    color: '#150080',
    fontWeight: '500'
  },
  textoInfo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    textAlign: 'left',
    marginBottom: 2,
  },
  textoInfosub: {
    fontSize: 14,
    color: '#1E5393',
    fontWeight: '500',
    textAlign: 'left',
  },
 Botao: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginTop: 16,
    borderRadius: 12,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFF',
    padding: 16,
  },
  setaCard: {
    position: 'absolute',
    right: 16,
    top: '70%',
    marginTop: -12,
  },
  iconeDados: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: '#DCE8FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconeSenha: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  areaTexto: {
    flex: 1,
    marginLeft: 16,
  },
  logout: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#C9C9C9',
    borderRadius: 12,
    backgroundColor: '#FFF',
    height: 60,
    width: '100%',
  },
  textoLogout: {
    color: '#E53935',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8
  },
});
