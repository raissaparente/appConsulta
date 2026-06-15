import { StyleSheet, Text, View } from 'react-native';

export default function TelaMeusDados() {
  return (
    /*TELA APENAS VISUAL, CARDS APENAS VISUAIS.*/

    <View style={styles.container}>
      <Text style={styles.titulo}>PERFIL PROFISSIONAL</Text>
      <Text style={styles.subtitulo}>Mariana Silva</Text>
      <Text style={styles.id}> ID: 882345</Text>
      <Text style={styles.cargo}> Recepcionista</Text>

      <View style={styles.card}>
        <Text style={styles.tituloCard}>Dados Pessoais</Text>
        <Text style={styles.label}>Nome Completo</Text>
        <Text style={styles.valor}>Funcionário Teste da Silva</Text>
        <Text style={styles.label}>CPF</Text>
        <Text style={styles.valor}>000.000.000-00</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.tituloCard}>Informações de Contato</Text>
        <Text style={styles.label}>Telefone</Text>
        <Text style={styles.valor}>(99)99999-9999</Text>
        <Text style={styles.label}>E-mail</Text>
        <Text style={styles.valor}>mariana.silva@hospital.com</Text>


      </View>

      <Text style={styles.rodape}>
      Para alterar seus dados cadastrais, entre em contato com o RH.
      </Text>
    </View>
  );
}

//BRUNO: ESTILIZAR AQUI (estilos globais dessa tela)
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 16
  },
  titulo: {
    fontSize: 14, 
    marginBottom: 24,
    color: '#1E5393',
    fontWeight: '500',
    textAlign:'left'
  },
  subtitulo:{
    fontSize: 22,
    marginTop: -20,
    fontWeight: '700',
    color: '#00168F',
  },
  tituloCard:{
    marginBottom: 20,
    marginTop: -6,
    fontSize: 16,
    fontWeight: '600',
    borderBottomWidth: 1,
    paddingBottom: 4,
    borderRadius: 8,
    borderColor: '#C9C9C9'
  },
  id:{
    borderWidth: 1,
    alignSelf: 'flex-start',
    borderRadius: 8,
    backgroundColor: '#FFF',
    borderColor: '#000',
    marginTop: 6,
    paddingRight: 6,
    paddingBottom: 2
  },
  cargo:{
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'center',
    borderColor: '#C7F9FF',
    backgroundColor:'#C7F9FF',
    color:'#1E5393',
    paddingRight: 6,
    paddingBottom: 2,
    fontWeight: '500',
    marginTop: -22,
    marginBottom: 14,
    marginRight: 80
  },
  card: {
    padding: 18, 
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#FFF',
    borderColor: '#C9C9C9'
  },
  label: {
    fontSize: 14,
    marginTop: 4,
    color: '#1E5393', 
    fontWeight: '600',
  },
  valor: {
    fontSize: 14,
    marginTop: 4,
    marginBottom: 4,
    fontWeight: '500'
  },
  rodape: {
    textAlign: 'center', 
    marginTop: 20
  }
});
