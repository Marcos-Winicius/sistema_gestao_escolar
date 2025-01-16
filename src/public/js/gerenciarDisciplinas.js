// Função para abrir o modal de cadastro
function abrirModalCadastro() {
  $('#formDisciplina')[0].reset(); // Reseta o formulário
  $('#editMode').val('false'); // Define modo de cadastro
  $('#modalDisciplinaLabel').text('Cadastrar Disciplina');
  $('#modalDisciplina').modal('show'); // Abre o modal
}

// Função para abrir o modal de edição
function abrirModalEdicao(disciplina) {
  console.log(disciplina);
  $('#codigo').val(disciplina.codigo);
  $('#nome').val(disciplina.nome);
  $('#ch').val(disciplina.ch);
  $('#professor').val(disciplina.professor);
  $('#editMode').val('true'); // Define modo de edição
  $('#modalDisciplinaLabel').text('Editar Disciplina');
  $('#modalDisciplina').modal('show'); // Abre o modal
}

// Função para salvar (cadastrar ou editar)
async function salvarDisciplina() {
  const form = $('#formDisciplina')[0];
  
  if (!form.checkValidity()) {
    form.reportValidity(); // Valida o formulário nativamente
    return;
  }
  
  const disciplina = {
    nome: $('#nome').val(),
    ch: $('#ch').val(),
    professor: $('#professor').val(),
  };
  
  const editMode = $('#editMode').val() === 'true';
  
  try {
    const response = await fetch(editMode ? `/api/disciplinas/editar/${$('#codigo').val()}` : '/api/disciplinas/cadastrar', {
      method: editMode ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(disciplina),
    });
    
    if (!response.ok) {
      throw new Error('Erro ao salvar disciplina.');
    }
    
    alert(editMode ? 'Disciplina editada com sucesso!' : 'Disciplina cadastrada com sucesso!');
    $('#modalDisciplina').modal('hide'); // Fecha o modal
    await fetchDisciplinas(); // Atualiza a tabela
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
}

// Função para buscar e renderizar disciplinas
async function fetchDisciplinas() {
  try {
    const response = await fetch('/api/disciplinas');
    if (!response.ok) {
      throw new Error('Erro ao buscar disciplinas.');
    }
    
    const data = await response.json();
    const tableBody = $('#disciplinas-tbody');
    tableBody.empty(); // Limpa a tabela antes de renderizar
    
    data.forEach((disciplina) => {
      tableBody.append(`
        <tr>
          <td>${disciplina.codigo}</td>
          <td>${disciplina.nome}</td>
          <td>${disciplina.ch}</td>
          <td>${disciplina.professor}</td>
          <td>
            <button class="btn btn-warning btn-sm" onclick="editarDisciplina('${disciplina.codigo}')">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="excluirDisciplina('${disciplina.codigo}')">Excluir</button>
          </td>
        </tr>
      `);
      });
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  }
  
  // Função para excluir uma disciplina
  async function excluirDisciplina(codigo) {
    if (confirm('Tem certeza que deseja excluir esta disciplina?')) {
      try {
        const response = await fetch(`/api/disciplinas/excluir/${codigo}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Erro ao excluir disciplina.');
        }
        
        alert('Disciplina excluída com sucesso!');
        await fetchDisciplinas(); // Atualiza a tabela
      } catch (error) {
        alert(error.message);
        console.error(error);
      }
    }
  }
  
  // Função para editar uma disciplina
  async function editarDisciplina(codigo) {
    try {
      const response = await fetch(`/api/disciplinas/${codigo}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar os dados da disciplina.');
      }
      
      const disciplina = await response.json();
      abrirModalEdicao(disciplina); // Abre o modal preenchido com os dados da disciplina
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  }
  
  // Eventos
  $('#btnSalvar').on('click', salvarDisciplina);
  
  // Carrega as disciplinas ao carregar a página
  $(document).ready(async()=>{
    await fetchDisciplinas();
  });
  