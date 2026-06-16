// Script para limpar e repopular o banco de dados do Firestore.
// Para executar: npm run seed ou node scripts/seed-db.js

const { initializeApp } = require('firebase/app');
const { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  doc, 
  deleteDoc 
} = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyCXyws7K6X07dmY1a_G7xA5FYWjm9jr1MA",
  authDomain: "appconsulta-b4e9c.firebaseapp.com",
  projectId: "appconsulta-b4e9c",
  storageBucket: "appconsulta-b4e9c.firebasestorage.app",
  messagingSenderId: "878536747629",
  appId: "1:878536747629:web:738a04527dd99a50bf2d64"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Lista de especialidades e médicos correspondentes (10 médicos, 5 especialidades)
const medicosMock = [
  { nome: 'Dr. Alberto Souza', crm: 'CRM/SP 123456', especialidade: 'Cardiologia' },
  { nome: 'Dra. Beatriz Costa', crm: 'CRM/SP 234567', especialidade: 'Cardiologia' },
  { nome: 'Dr. Carlos Silva', crm: 'CRM/SP 345678', especialidade: 'Pediatria' },
  { nome: 'Dra. Diana Oliveira', crm: 'CRM/SP 456789', especialidade: 'Pediatria' },
  { nome: 'Dr. Eduardo Santos', crm: 'CRM/SP 567890', especialidade: 'Ortopedia' },
  { nome: 'Dra. Fernanda Lima', crm: 'CRM/SP 678901', especialidade: 'Ortopedia' },
  { nome: 'Dr. Gabriel Gomes', crm: 'CRM/SP 789012', especialidade: 'Dermatologia' },
  { nome: 'Dra. Helena Pereira', crm: 'CRM/SP 890123', especialidade: 'Dermatologia' },
  { nome: 'Dr. Igor Martins', crm: 'CRM/SP 901234', especialidade: 'Ginecologia' },
  { nome: 'Dra. Julia Barbosa', crm: 'CRM/SP 012345', especialidade: 'Ginecologia' }
];

// Lista de 20 pacientes fictícios (com alguns e-mails apontando para seu e-mail de teste)
const pacientesMock = [
  { nome: 'Maria Silva', cpf: '111.111.111-11', dataNascimento: '12/05/1990', numeroSus: '11111111111', endereco: 'Rua A, 10', cep: '60000-000', telefone: '(85) 99999-1111', email: 'lestrangitta+maria@gmail.com' },
  { nome: 'João Pereira', cpf: '222.222.222-22', dataNascimento: '25/08/1985', numeroSus: '22222222222', endereco: 'Rua B, 20', cep: '60000-000', telefone: '(85) 99999-2222', email: 'lestrangitta+joao@gmail.com' },
  { nome: 'Ana Souza', cpf: '333.333.333-33', dataNascimento: '03/03/2000', numeroSus: '33333333333', endereco: 'Rua C, 30', cep: '60000-000', telefone: '(85) 99999-3333', email: 'lestrangitta@gmail.com' },
  { nome: 'Carlos Mendes', cpf: '444.444.444-44', dataNascimento: '19/11/1978', numeroSus: '44444444444', endereco: 'Rua D, 40', cep: '60000-000', telefone: '(85) 99999-4444', email: 'lestrangitta@gmail.com' },
  { nome: 'Fernanda Costa', cpf: '555.555.555-55', dataNascimento: '30/01/1995', numeroSus: '55555555555', endereco: 'Rua E, 50', cep: '60000-000', telefone: '(85) 99999-5555', email: 'lestrangitta@gmail.com' },
  { nome: 'Roberto Alves', cpf: '666.666.666-66', dataNascimento: '15/07/1980', numeroSus: '66666666666', endereco: 'Rua F, 60', cep: '60000-000', telefone: '(85) 99999-6666', email: 'paciente6@email.com' },
  { nome: 'Juliana Rocha', cpf: '777.777.777-77', dataNascimento: '08/02/1992', numeroSus: '77777777777', endereco: 'Rua G, 70', cep: '60000-000', telefone: '(85) 99999-7777', email: 'paciente7@email.com' },
  { nome: 'Lucas Santos', cpf: '888.888.888-88', dataNascimento: '21/10/1988', numeroSus: '88888888888', endereco: 'Rua H, 80', cep: '60000-000', telefone: '(85) 99999-8888', email: 'paciente8@email.com' },
  { nome: 'Camila Lima', cpf: '999.999.999-99', dataNascimento: '05/09/1997', numeroSus: '99999999999', endereco: 'Rua I, 90', cep: '60000-000', telefone: '(85) 99999-9999', email: 'paciente9@email.com' },
  { nome: 'Felipe Barbosa', cpf: '123.123.123-12', dataNascimento: '14/12/1983', numeroSus: '12121212121', endereco: 'Rua J, 100', cep: '60000-000', telefone: '(85) 99999-1010', email: 'paciente10@email.com' },
  { nome: 'Amanda Ramos', cpf: '234.234.234-23', dataNascimento: '29/04/1991', numeroSus: '23232323232', endereco: 'Rua K, 110', cep: '60000-000', telefone: '(85) 99999-1112', email: 'paciente11@email.com' },
  { nome: 'Bruno Castro', cpf: '345.345.345-34', dataNascimento: '11/08/1986', numeroSus: '34343434343', endereco: 'Rua L, 120', cep: '60000-000', telefone: '(85) 99999-1212', email: 'paciente12@email.com' },
  { nome: 'Patricia Vieira', cpf: '456.456.456-45', dataNascimento: '22/01/1993', numeroSus: '45454545454', endereco: 'Rua M, 130', cep: '60000-000', telefone: '(85) 99999-1313', email: 'paciente13@email.com' },
  { nome: 'Daniel Cardoso', cpf: '567.567.567-56', dataNascimento: '17/06/1982', numeroSus: '56565656565', endereco: 'Rua N, 140', cep: '60000-000', telefone: '(85) 99999-1414', email: 'paciente14@email.com' },
  { nome: 'Mariana Pires', cpf: '678.678.678-67', dataNascimento: '02/09/1989', numeroSus: '67676767676', endereco: 'Rua O, 150', cep: '60000-000', telefone: '(85) 99999-1515', email: 'paciente15@email.com' },
  { nome: 'Gustavo Martins', cpf: '789.789.789-78', dataNascimento: '27/03/1975', numeroSus: '78787878787', endereco: 'Rua P, 160', cep: '60000-000', telefone: '(85) 99999-1616', email: 'paciente16@email.com' },
  { nome: 'Letícia Fernandes', cpf: '890.890.890-89', dataNascimento: '09/10/1994', numeroSus: '89898989898', endereco: 'Rua Q, 170', cep: '60000-000', telefone: '(85) 99999-1717', email: 'paciente17@email.com' },
  { nome: 'Rodrigo Araujo', cpf: '901.901.901-90', dataNascimento: '18/05/1987', numeroSus: '90909090909', endereco: 'Rua R, 180', cep: '60000-000', telefone: '(85) 99999-1818', email: 'paciente18@email.com' },
  { nome: 'Beatriz Nogueira', cpf: '012.012.012-01', dataNascimento: '04/07/1996', numeroSus: '01010101010', endereco: 'Rua S, 190', cep: '60000-000', telefone: '(85) 99999-1919', email: 'paciente19@email.com' },
  { nome: 'Thiago Pinheiro', cpf: '234.567.890-12', dataNascimento: '31/12/1979', numeroSus: '23456789012', endereco: 'Rua T, 200', cep: '60000-000', telefone: '(85) 99999-2020', email: 'paciente20@email.com' }
];

async function limparColecao(nomeColecao) {
  const colRef = collection(db, nomeColecao);
  const snapshot = await getDocs(colRef);
  console.log(`Apagando ${snapshot.size} documentos da coleção "${nomeColecao}"...`);
  const promessas = snapshot.docs.map(d => deleteDoc(doc(db, nomeColecao, d.id)));
  await Promise.all(promessas);
}

function gerarProximosDias() {
  const dias = [];
  for (let i = 0; i < 7; i++) {
    const data = new Date();
    data.setDate(data.getDate() + i);
    dias.push(data.toISOString().split('T')[0]); // "YYYY-MM-DD"
  }
  return dias;
}

async function seed() {
  console.log('--- Iniciando Limpeza do Banco de Dados ---');
  try {
    await limparColecao('consultas');
    await limparColecao('pacientes');
    await limparColecao('medicos');
    await limparColecao('horarios');
    console.log('--- Limpeza concluída com sucesso! ---\n');

    console.log('--- Seeding Médicos ---');
    const medicosIds = [];
    for (const medico of medicosMock) {
      const docRef = await addDoc(collection(db, 'medicos'), medico);
      medicosIds.push({ id: docRef.id, ...medico });
    }
    console.log(`${medicosIds.length} médicos cadastrados.`);

    console.log('--- Seeding Pacientes ---');
    const pacientesIds = [];
    for (const paciente of pacientesMock) {
      const docRef = await addDoc(collection(db, 'pacientes'), paciente);
      pacientesIds.push({ id: docRef.id, ...paciente });
    }
    console.log(`${pacientesIds.length} pacientes cadastrados.`);

    console.log('--- Seeding Horários Disponíveis para a Próxima Semana ---');
    const diasSemana = gerarProximosDias();
    const periodos = ['09:00', '10:00', '14:00', '15:00'];
    let horariosContador = 0;

    for (const medico of medicosIds) {
      for (const dia of diasSemana) {
        for (const hora of periodos) {
          await addDoc(collection(db, 'horarios'), {
            medicoId: medico.id,
            dataHora: `${dia}T${hora}`,
            status: 'disponivel'
          });
          horariosContador++;
        }
      }
    }
    console.log(`${horariosContador} horários disponíveis gerados para a semana.`);

    console.log('--- Seeding 10 Consultas para Hoje (5 Realizadas, 5 Agendadas) ---');
    const hojeStr = new Date().toISOString().split('T')[0];
    const horasConsultas = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

    for (let i = 0; i < 10; i++) {
      const status = i < 5 ? 'realizada' : 'agendada';
      const tipo = i % 3 === 0 ? 'retorno' : 'primeira';
      
      // Mapeamento aleatório de pacientes e médicos
      const pacienteAleatorio = pacientesIds[i % pacientesIds.length];
      const medicoAleatorio = medicosIds[i % medicosIds.length];
      const hora = horasConsultas[i];

      await addDoc(collection(db, 'consultas'), {
        pacienteId: pacienteAleatorio.id,
        medicoId: medicoAleatorio.id,
        dataHora: `${hojeStr}T${hora}`,
        status: status,
        tipo: tipo
      });
    }
    console.log('10 consultas geradas para a data de hoje.');

    console.log('\n--- Seeding concluído com sucesso total! ---');
    process.exit(0);
  } catch (error) {
    console.error('Erro durante o seeding:', error);
    process.exit(1);
  }
}

seed();
