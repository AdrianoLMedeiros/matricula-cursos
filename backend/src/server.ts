import express from "express";
import cors from "cors";
import type { Matricula } from "./types";

const matriculas: Matricula[] = [];

const app = express();
const PORT = 3000;

// Permite receber JSON no corpo da requisição
app.use(express.json());
app.use(cors());

// Rota inicial só para teste
app.get("/", (req, res) => {
  res.send("API de matrícula funcionando!");
});

// Rota GET /cursos (versão inicial)
app.get("/cursos", (req, res) => {
  const cursos = [
    { id: 1, nome: "JavaScript Básico" },
    { id: 2, nome: "Vue.js para Iniciantes" },
    { id: 3, nome: "Node.js com Express" }
  ];

app.post("/matricula", (req, res) => {
  const { nome, email, cursoId } = req.body as Matricula;

  // Validação simples
  if (!nome || !email || !cursoId) {
    return res.status(400).json({
      erro: "Todos os campos são obrigatórios: nome, email, cursoId"
    });
  }

  // Criar objeto de matrícula
  const novaMatricula: Matricula = { nome, email, cursoId };

  // Salvar no "banco"
  matriculas.push(novaMatricula);

  return res.status(201).json({
    mensagem: "Matrícula realizada com sucesso!",
    dados: novaMatricula
  });
});

  res.json(cursos);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
