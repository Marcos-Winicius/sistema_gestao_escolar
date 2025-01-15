// URL da rota para buscar disciplinas
const API_URL = '/disciplinas';

// Função para buscar as disciplinas usando fetch
async function fetchDisciplinas() {
  try {
    // Faz a requisição para a rota /disciplinas
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    // Converte a resposta em JSON
    const disciplinas = await response.json();

    // Renderiza as disciplinas na tabela
    renderDisciplinas(disciplinas);
  } catch (error) {
    console.error('Erro ao buscar disciplinas:', error);
  }
}

// Função para renderizar as disciplinas na tabela
function renderDisciplinas(disciplinas) {
  const tbody = document.getElementById('disciplinas-tbody');
  tbody.innerHTML = ''; // Limpa o conteúdo existente na tabela

  // Itera sobre as disciplinas e cria linhas na tabela
  disciplinas.forEach((disciplina) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${disciplina.codigo}</td>
      <td>${disciplina.nome}</td>
      <td>${disciplina.ch}</td>
      <td>${disciplina.professor}</td>
    `;

    tbody.appendChild(tr);
  });
}

function voltarPagina() {
  window.history.back();
}

// Chama a função para buscar disciplinas ao carregar a página
document.addEventListener('DOMContentLoaded', fetchDisciplinas);
