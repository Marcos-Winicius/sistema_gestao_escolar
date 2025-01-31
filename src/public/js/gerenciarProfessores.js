// Função para abrir o modal de cadastro de professor
function abrirModalCadastroProfessor() {
    $('#formProfessor')[0].reset(); // Reseta o formulário
    $("#senha").closest(".mb-3").show();
    $("#senha").attr("required", true);
    $('#editMode').val('false'); // Define modo de cadastro
    $('#modalProfessorLabel').text('Cadastrar professor');
    $('#modalProfessor').modal('show'); // Abre o modal
}

// Função para abrir o modal de edição de Professor
function abrirModalEdicaoProfessor(professor) {
    console.log(professor)
    $('#nome').val(professor.nome);
    $('#cpf').val(professor.cpf);
    const dataOriginal = professor.data_nascimento
    const dataFormatada = dataOriginal.split("T")[0];
    $('#data_nascimento').val(dataFormatada);
    $('#email').val(professor.email);
    $('#telefone').val(professor.telefone);
    $('#formacao_academica').val(professor.formacao_academica);
    $('#status').val(professor.status ? '1' : "0");
    $('#editMode').val('true'); // Define modo de edição

    $("#senha").attr("required", false);
    $("#senha").closest(".mb-3").hide();

    $('#modalProfessorLabel').text('Editar Professor');
    $('#modalProfessor').modal('show'); // Abre o modal
}

// Função para salvar (cadastrar ou editar professor)
async function salvarProfessor() {
    const form = $('#formProfessor')[0];
    
    if (!form.checkValidity()) {
        form.reportValidity(); // Valida o formulário nativamente
        return;
    }
    
    const professor = {
        nome: $('#nome').val(),
        cpf: $('#cpf').val(),
        data_nascimento: $("#data_nascimento").val(),
        telefone: $('#telefone').val(),
        email: $('#email').val(),
        formacao_academica: $('#formacao_academica').val(),
        status: $('#status').val()
    };
    
    const editMode = $('#editMode').val() === 'true';
    if(!editMode){
        professor.senha_acesso = $("#senha").val()
    }
    const cpf = $('#cpf').val();
    
    try {
        const response = await fetch(
            editMode ? `/api/professor/editar/${cpf}` : '/api/professor/cadastrar', 
            {
                method: editMode ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(professor)
            }
        );
        
        if (!response.ok) throw new Error('Erro ao salvar professor.');
        
        alert(editMode ? 'Professor editado com sucesso!' : 'Professor cadastrado com sucesso!');
        $('#modalProfessor').modal('hide');
        await fetchProfessores(); // Atualiza a tabela
    } catch (error) {
        alert(error.message);
        console.error(error);
    }
}

// Função para buscar e renderizar professores
async function fetchProfessores() {
    try {
        const response = await fetch('/api/professor');
        if (!response.ok) throw new Error('Erro ao buscar professores.');
        
        const professores = await response.json();
        const tableBody = $('#professor-tbody');
        tableBody.empty();
        
        professores.forEach((professor) => {
            tableBody.append(`
                <tr>
                    <td>${professor.nome}</td>
                    <td>${professor.cpf}</td>
                    <td>${professor.email}</td>
                    <td>${professor.telefone}</td>
                    <td>${professor.formacao_academica}</td>
                    <td><span class="badge ${professor.status == true ? 'bg-success' : 'bg-danger'}">${professor.status ? "Ativo" : "Inativo"}</span></td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editarProfessor('${professor.cpf}')">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="excluirProfessor('${professor.cpf}')">Excluir</button>
                    </td>
                </tr>`
            );
        });
    } catch (error) {
        alert(error.message);
        console.error(error);
    }
}

// Função para excluir professor
async function excluirProfessor(cpf) {
    if (confirm('Tem certeza que deseja excluir este professor?')) {
        try {
            const response = await fetch(`/api/professor/excluir/${cpf}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) throw new Error('Erro ao excluir professor.');
            
            alert('Professor excluído com sucesso!');
            await fetchProfessores();
        } catch (error) {
            alert(error.message);
            console.error(error);
        }
    }
}

// Função para editar professor
async function editarProfessor(cpf) {
    try {
        const response = await fetch(`/api/professor/${cpf}`);
        if (!response.ok) throw new Error('Erro ao buscar dados do professor.');
        
        const professor = await response.json();
        abrirModalEdicaoProfessor(professor);
    } catch (error) {
        alert(error.message);
        console.error(error);
    }
}

// Eventos
$('#btnSalvarProfessor').on('click', salvarProfessor);

// Carrega professores ao iniciar
$(document).ready(async () => {
    await fetchProfessores();
});