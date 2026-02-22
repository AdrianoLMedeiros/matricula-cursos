const API_URL = "http://localhost:3000";

export interface Curso {
    id: number;
    nome: string;
}

export interface Matricula {
    nome: string;
    email: string;
    cursoId: number;
}

export const apiService = {
    async getCursos(): Promise<Curso[]> {
        const resposta = await fetch(`${API_URL}/cursos`);
        if (!resposta.ok) throw new Error("Erro ao buscar cursos");
        return resposta.json();
    },

    async matricular(dados: Matricula) {
        const resposta = await fetch(`${API_URL}/matricula`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        });
        return resposta.json();
    }
};
