<template>
  <div class="formulario">
    <h2>Matrícula em Cursos</h2>

    <form @submit.prevent="enviarFormulario">
      <!-- Nome -->
      <label>
        Nome completo:
        <input
          v-model="nome"
          type="text"
          @input="validarNome"
          :class="{ erro: erroNome }"
        />
      </label>
      <p v-if="erroNome" class="mensagem-erro">{{ erroNome }}</p>

      <!-- Email -->
      <label>
        E-mail:
        <input
          v-model="email"
          type="email"
          @input="validarEmail"
          :class="{ erro: erroEmail }"
        />
      </label>
      <p v-if="erroEmail" class="mensagem-erro">{{ erroEmail }}</p>

      <!-- Curso -->
      <label>
        Curso:
        <select
          v-model="cursoId"
          @change="validarCurso"
          :class="{ erro: erroCurso }"
        >
          <option value="">Selecione um curso</option>
          <option v-for="curso in cursos" :key="curso.id" :value="curso.id">
            {{ curso.nome }}
          </option>
        </select>
      </label>
      <p v-if="erroCurso" class="mensagem-erro">{{ erroCurso }}</p>

      <!-- Botão -->
      <button type="submit" :disabled="carregando">
        {{ carregando ? "Enviando..." : "Enviar" }}
      </button>
    </form>

    <!-- Mensagem final -->
    <p v-if="mensagem" class="mensagem-final">{{ mensagem }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

interface Curso {
  id: number;
  nome: string;
}

const nome = ref("");
const email = ref("");
const cursoId = ref("");
const cursos = ref<Curso[]>([]);
const mensagem = ref("");
const carregando = ref(false);

// Erros
const erroNome = ref("");
const erroEmail = ref("");
const erroCurso = ref("");

// Validações
function validarNome() {
  erroNome.value = nome.value.length < 3 ? "Digite seu nome completo." : "";
}

function validarEmail() {
  const regex = /\S+@\S+\.\S+/;
  erroEmail.value = !regex.test(email.value)
    ? "Digite um e-mail válido."
    : "";
}

function validarCurso() {
  erroCurso.value = !cursoId.value ? "Selecione um curso." : "";
}

// Carregar cursos
onMounted(async () => {
  const resposta = await fetch("http://localhost:3000/cursos");
  cursos.value = await resposta.json();
});

// Enviar formulário
async function enviarFormulario() {
  validarNome();
  validarEmail();
  validarCurso();

  if (erroNome.value || erroEmail.value || erroCurso.value) return;

  carregando.value = true;

  const resposta = await fetch("http://localhost:3000/matricula", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nome: nome.value,
      email: email.value,
      cursoId: Number(cursoId.value)
    })
  });

  const dados = await resposta.json();
  mensagem.value = dados.mensagem || dados.erro;

  carregando.value = false;
}
</script>

<style scoped>
.formulario {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

label {
  display: block;
  margin-bottom: 12px;
}

input,
select {
  width: 100%;
  padding: 8px;
  margin-top: 4px;
}

button {
  width: 100%;
  padding: 10px;
  margin-top: 12px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #999;
  cursor: not-allowed;
}

.erro {
  border: 1px solid red;
}

.mensagem-erro {
  color: red;
  font-size: 0.9rem;
  margin-top: -8px;
  margin-bottom: 10px;
}

.mensagem-final {
  margin-top: 20px;
  font-weight: bold;
  color: #2c7;
}
</style>
