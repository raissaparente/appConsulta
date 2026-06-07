// Serviço de envio de e-mails usando a API REST do Resend.
// Isso evita dependências específicas do Node.js no ambiente React Native/Expo.

const RESEND_API_KEY = process.env.EXPO_PUBLIC_RESEND_API_KEY || 're_xxxxxxxxx';

export interface EnviarEmailParams {
  pacienteNome: string;
  pacienteEmail?: string;
  medicoNome: string;
  especialidade: string;
  dataHora: string;
  tipo: 'marcada' | 'remarcada' | 'cancelada' | 'retorno';
}

/**
 * Envia uma notificação de e-mail sobre a consulta usando o Resend.
 */
export async function enviarEmailConsulta({
  pacienteNome,
  pacienteEmail,
  medicoNome,
  especialidade,
  dataHora,
  tipo,
}: EnviarEmailParams) {
  // A conta gratuita/sandbox do Resend restringe envios apenas para o e-mail verificado do dono da conta.
  // Por isso, se o paciente não tiver e-mail ou se estivermos em ambiente sandbox, usamos o e-mail verificado do desenvolvedor.
  const destinatarioFinal = pacienteEmail && pacienteEmail.trim() !== '' 
    ? pacienteEmail 
    : 'lestrangitta@gmail.com';

  if (RESEND_API_KEY === 're_xxxxxxxxx') {
    console.log('Chave de API do Resend não configurada. E-mail simulado:', {
      para: destinatarioFinal,
      paciente: pacienteNome,
      medico: medicoNome,
      tipo: tipo,
    });
    return;
  }

  // Formatar dataHora para formato legível no Brasil (DD/MM/AAAA às HH:MM)
  let dataBr = '';
  let horaBr = '';
  try {
    const [dataParte, horaParte] = dataHora.split('T');
    dataBr = dataParte.split('-').reverse().join('/');
    horaBr = horaParte ? horaParte.slice(0, 5) : '';
  } catch (e) {
    dataBr = dataHora;
  }

  let assunto = '';
  let corpoHtml = '';

  switch (tipo) {
    case 'marcada':
      assunto = `Consulta Confirmada - ${especialidade}`;
      corpoHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #007bff; margin-top: 0;">Consulta Confirmada!</h2>
          <p>Olá, <strong>${pacienteNome}</strong>,</p>
          <p>Sua consulta foi agendada com sucesso. Confira os detalhes abaixo:</p>
          <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;" />
          <p><strong>Médico:</strong> Dr(a). ${medicoNome}</p>
          <p><strong>Especialidade:</strong> ${especialidade}</p>
          <p><strong>Data:</strong> ${dataBr}</p>
          <p><strong>Horário:</strong> ${horaBr}h</p>
          <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #666666;">Este é um e-mail automático enviado pelo appConsulta.</p>
        </div>
      `;
      break;
    case 'retorno':
      assunto = `Retorno Confirmado - ${especialidade}`;
      corpoHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #28a745; margin-top: 0;">Retorno Confirmado!</h2>
          <p>Olá, <strong>${pacienteNome}</strong>,</p>
          <p>Seu retorno médico foi agendado com sucesso. Confira os detalhes abaixo:</p>
          <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;" />
          <p><strong>Médico:</strong> Dr(a). ${medicoNome}</p>
          <p><strong>Especialidade:</strong> ${especialidade}</p>
          <p><strong>Data:</strong> ${dataBr}</p>
          <p><strong>Horário:</strong> ${horaBr}h</p>
          <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #666666;">Este é um e-mail automático enviado pelo appConsulta.</p>
        </div>
      `;
      break;
    case 'remarcada':
      assunto = `Consulta Reagendada - ${especialidade}`;
      corpoHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #ffc107; margin-top: 0;">Consulta Reagendada</h2>
          <p>Olá, <strong>${pacienteNome}</strong>,</p>
          <p>Sua consulta foi reagendada para um novo horário. Confira os novos detalhes:</p>
          <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;" />
          <p><strong>Médico:</strong> Dr(a). ${medicoNome}</p>
          <p><strong>Especialidade:</strong> ${especialidade}</p>
          <p><strong>Data:</strong> ${dataBr}</p>
          <p><strong>Horário:</strong> ${horaBr}h</p>
          <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #666666;">Este é um e-mail automático enviado pelo appConsulta.</p>
        </div>
      `;
      break;
    case 'cancelada':
      assunto = `Consulta Cancelada - ${especialidade}`;
      corpoHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #dc3545; margin-top: 0;">Consulta Cancelada</h2>
          <p>Olá, <strong>${pacienteNome}</strong>,</p>
          <p>A sua consulta com o(a) Dr(a). <strong>${medicoNome}</strong> (${especialidade}) agendada para o dia ${dataBr} às ${horaBr}h foi <strong>cancelada</strong>.</p>
          <p>Caso tenha sido um engano ou precise agendar um novo horário, utilize o aplicativo.</p>
          <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #666666;">Este é um e-mail automático enviado pelo appConsulta.</p>
        </div>
      `;
      break;
  }

  try {
    const resposta = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: destinatarioFinal,
        subject: assunto,
        html: corpoHtml,
      }),
    });

    if (!resposta.ok) {
      const errorJson = await resposta.json();
      console.log('Erro ao enviar e-mail via Resend API:', errorJson);
    } else {
      console.log('E-mail enviado com sucesso via Resend para:', destinatarioFinal);
    }
  } catch (error) {
    console.log('Falha na requisição de e-mail:', error);
  }
}
