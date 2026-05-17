---
status: testing
phase: 1-core-screens
source: [manual derivation from ROADMAP.md]
started: 2026-05-14T17:23:00-03:00
updated: 2026-05-14T17:23:00-03:00
---

## Current Test
<!-- OVERWRITE each test - shows where we are -->

number: 2
name: Detalhes da Consulta
expected: |
  Clicar em uma das consultas na Home deve navegar para a tela de detalhes. A tela deve exibir "Consulta", "Data", "Médico" (com o nome real puxado do banco) e um botão de texto "Marcar retorno".
awaiting: user response

## Tests

### 1. Aba Home (Consultas)
expected: O app deve abrir na aba Home exibindo "Consultas de hoje". Você deve ver uma lista crua (sem estilo) de consultas com o nome do paciente, nome do médico e horário, puxados direto do Firebase.
result: pass

### 2. Detalhes da Consulta
expected: Clicar em uma das consultas na Home deve navegar para a tela de detalhes. A tela deve exibir "Consulta", "Data", "Médico" (com o nome real puxado do banco) e um botão de texto "Marcar retorno".
result: pending

### 3. Aba de Pesquisa
expected: Clicar na aba "Pesquisar" (embaixo) deve abrir a tela de busca. Ao digitar no campo, a lista abaixo deve atualizar em tempo real exibindo os pacientes encontrados no Firebase (Nome e CPF).
result: pending

### 4. Detalhes do Paciente
expected: Clicar em um paciente na tela de Pesquisa deve navegar para os detalhes dele. A tela deve mostrar o nome do paciente, uma lista das consultas dele e um botão de texto "+ Nova consulta".
result: pending

### 5. Aba de Perfil
expected: Clicar na aba "Perfil" deve abrir uma tela crua exibindo "Perfil do Funcionário", "Nome: Funcionário Teste" e os botões "Meus Dados" e "Alterar Senha".
result: pending

## Summary

total: 5
passed: 1
issues: 0
pending: 4
skipped: 0

## Gaps

