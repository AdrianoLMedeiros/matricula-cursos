import express from "express";
import cors from "cors";
import type { Matricula } from "./types";

const matriculas: Matricula[] = [];

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// Dados de exemplo (Mock Database)
const cursos = [
  { id: 1, nome: "JavaScript Básico" },
  { id: 2, nome: "Vue.js para Iniciantes" },
  { id: 3, nome: "Node.js com Express" }
];

app.get("/", (req, res) => {
  res.send("API de matrícula funcionando!");
});

app.get("/cursos", (req, res) => {
  res.json(cursos);
});

app.post("/matricula", (req, res) => {
  const { nome, email, cursoId } = req.body as Matricula;

  if (!nome || !email || !cursoId) {
    return res.status(400).json({
      erro: "Todos os campos são obrigatórios: nome, email, cursoId"
    });
  }

  const novaMatricula: Matricula = { nome, email, cursoId };
  matriculas.push(novaMatricula);

  console.log("Nova matrícula recebida:", novaMatricula);

  return res.status(201).json({
    mensagem: "Matrícula realizada com sucesso!",
    dados: novaMatricula
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
