# Sistema de Matrículas em Cursos Online

Este projeto é um protótipo de uma aplicação web para matrícula de alunos em cursos online, desenvolvido como parte da Avaliação 1 da disciplina de Desenvolvimento Backend I, do curso de Análise e Desenvolvimento de Sistemas, da Universidade Veiga de Almeida, referente período 2026.1.

Em atendimento ao enunciado da AVA-1, esta aplicação integra:

- **Frontend:** Vue.js
- **Backend:** Node.js + Express + TypeScript
- **Banco de dados simulado:** Array em memória

---

## Funcionalidades

### Frontend (Vue.js)

Contempla:

- Formulário de matrícula com:
  - Nome completo
  - E-mail
  - Seleção de curso
- Validações imediatas (UX antecipada)
- Mensagens de erro e sucesso
- Carregamento automático da lista de cursos via API
- Interface simples, responsiva e acessível

### Backend (Node + Express + TypeScript)

- Rota **GET /cursos**  
  Retorna a lista de cursos disponíveis.
- Rota **POST /matricula**  
  Recebe os dados do aluno e valida:
  - nome
  - email
  - cursoId
- Respostas com códigos HTTP adequados:
  - `201 Created`
  - `400 Bad Request`
- Armazenamento em um array local simulando um banco de dados
- CORS habilitado para integração com o frontend

### Integração Backend - Frontend

- API Fetch
- GET /cursos para preencher o combobox de cursos
- POST /matricula ao enviar o formulário, enviando os dados em formato JSON.

---

## 📁 Estrutura do Projeto

matricula-cursos/
│
├── backend/
│ ├── src/
│ │ ├── server.ts
│ │ └── types.ts
│ ├── package.json
│ └── tsconfig.json
│
└── frontend/
├── src/
│ ├── App.vue
│ └── components/
│ └── FormularioMatricula.vue
├── package.json
└── vite.config.js

---

## Para executar

### 1. Backend

Comandos no Terminal:
cd backend
npm install
npm run dev
O backend estará disponível em http://localhost:3000

### 2. Frontend

Comandos no Terminal:
cd frontend
npm install
npm run dev
O frontend estará disponível em http://localhost:5173
