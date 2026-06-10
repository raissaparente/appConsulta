import { Stack } from 'expo-router';

export default function LayoutRaiz() {
  return (
    <Stack>
      <Stack.Screen name="(abas)" options={{ headerShown: false }} />
      <Stack.Screen name="paciente/[id]" options={{ title: 'Perfil do Paciente' }} />
      <Stack.Screen name="paciente/novo" options={{ title:'Cadastrar Paciente' }} />
      <Stack.Screen name="consulta/[id]" options={{ title: 'Detalhes da Consulta' }} />
      <Stack.Screen name="agendamento/escolher-especialidade" options={{ title: 'Especialidade' }} />
      <Stack.Screen name="agendamento/escolher-medico" options={{ title: 'Escolher Médico' }} />
      <Stack.Screen name="agendamento/escolher-horario" options={{ title: 'Escolher Horário' }} />
      <Stack.Screen name="agendamento/confirmar" options={{ title: 'Confirmar' }} />
      <Stack.Screen name="agendamento/sucesso" options={{ headerShown: false }} />
      <Stack.Screen name="perfil/dados" options={{ title: 'Meus Dados' }} />
      <Stack.Screen name="perfil/senha" options={{ title: 'Alterar Senha' }} />
    </Stack>
  );
}