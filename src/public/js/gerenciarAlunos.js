// Função para abrir o modal de cadastro de aluno
function abrirModalCadastroAluno() {
    $('#formAluno')[0].reset(); // Reseta o formulário
    $('#editMode').val('false'); // Define modo de cadastro
    $('#modalAlunoLabel').text('Cadastrar Aluno');
    $('#modalAluno').modal('show'); // Abre o modal
}

// Função para abrir o modal de edição de aluno
function abrirModalEdicaoAluno(aluno) {
    $('#matricula').val(aluno.matricula);
    $('#nome').val(aluno.nome);
    $('#cpf').val(aluno.cpf);
    $('#email').val(aluno.email);
    $('#responsavel').val(aluno.responsavel);
    $('#status').val(aluno.status ? '1' : "0");
    $('#editMode').val('true'); // Define modo de edição
    $('#modalAlunoLabel').text('Editar Aluno');
    $('#modalAluno').modal('show'); // Abre o modal
}

// Função para salvar (cadastrar ou editar aluno)
async function salvarAluno() {
    const form = $('#formAluno')[0];
    
    if (!form.checkValidity()) {
        form.reportValidity(); // Valida o formulário nativamente
        return;
    }
    
    const aluno = {
        nome: $('#nome').val(),
        cpf: $('#cpf').val(),
        data_nascimento: $("#data_nascimento").val(),
        responsavel: $('#responsavel').val(),
        email: $('#email').val(),
        senha_acesso: $("#senha").val(),
        status: $('#status').val()
    };
    
    const editMode = $('#editMode').val() === 'true';
    const matricula = $('#matricula').val();
    
    try {
        const response = await fetch(
            editMode ? `/api/alunos/editar/${matricula}` : '/api/alunos/cadastrar', 
            {
                method: editMode ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(aluno)
            }
        );
        
        if (!response.ok) throw new Error('Erro ao salvar aluno.');
        
        alert(editMode ? 'Aluno editado com sucesso!' : 'Aluno cadastrado com sucesso!');
        $('#modalAluno').modal('hide');
        await fetchAlunos(); // Atualiza a tabela
    } catch (error) {
        alert(error.message);
        console.error(error);
    }
}

// Função para buscar e renderizar alunos
async function fetchAlunos() {
    try {
        const response = await fetch('/api/alunos');
        if (!response.ok) throw new Error('Erro ao buscar alunos.');
        
        const alunos = await response.json();
        const tableBody = $('#alunos-tbody');
        tableBody.empty();
        
        alunos.forEach((aluno) => {
            tableBody.append(`
                <tr>
                    <td>${aluno.matricula}</td>
                    <td>${aluno.nome}</td>
                    <td>${aluno.cpf}</td>
                    <td>${aluno.email}</td>
                    <td>${aluno.responsavel}</td>
                    <td><span class="badge ${aluno.status == true ? 'bg-success' : 'bg-danger'}">${aluno.status ? "Ativo" : "Inativo"}</span></td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editarAluno('${aluno.matricula}')">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="excluirAluno('${aluno.matricula}')">Excluir</button>
                    </td>
                </tr>`
            );
        });
    } catch (error) {
        alert(error.message);
        console.error(error);
    }
}

// Função para excluir aluno
async function excluirAluno(matricula) {
    if (confirm('Tem certeza que deseja excluir este aluno?')) {
        try {
            const response = await fetch(`/api/alunos/excluir/${matricula}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) throw new Error('Erro ao excluir aluno.');
            
            alert('Aluno excluído com sucesso!');
            await fetchAlunos();
        } catch (error) {
            alert(error.message);
            console.error(error);
        }
    }
}

// Função para editar aluno
async function editarAluno(matricula) {
    try {
        const response = await fetch(`/api/alunos/${matricula}`);
        if (!response.ok) throw new Error('Erro ao buscar dados do aluno.');
        
        const aluno = await response.json();
        abrirModalEdicaoAluno(aluno);
    } catch (error) {
        alert(error.message);
        console.error(error);
    }
}

// Eventos
$('#btnSalvarAluno').on('click', salvarAluno);

function voltarPagina() {
    window.history.back();
}

// Carrega alunos ao iniciar
$(document).ready(async () => {
    await fetchAlunos();
});