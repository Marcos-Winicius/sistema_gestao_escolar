// Função para abrir o modal de cadastro de responsavel
function abrirModalCadastroResponsavel() {
    $('#formResponsavel')[0].reset(); // Reseta o formulário
    $('#editMode').val('false'); // Define modo de cadastro
    $('#modalResponsavelLabel').text('Cadastrar responsavel');
    $('#modalResponsavel').modal('show'); // Abre o modal
}

// Função para abrir o modal de edição de Responsável
function abrirModalEdicaoResponsavel(responsavel) {
    console.log(responsavel)
    $('#nome').val(responsavel.nome);
    $('#cpf').val(responsavel.cpf);
    const dataOriginal = responsavel.data_nascimento
    const dataFormatada = dataOriginal.split("T")[0]; 
    $('#data_nascimento').val(dataFormatada);
    // Como a data vem: 2005-02-19T00:00:00.000Z
    $('#email').val(responsavel.email);
    $('#telefone').val(responsavel.telefone);
    $('#status').val(responsavel.status ? '1' : "0");
    $('#editMode').val('true'); // Define modo de edição
    $('#modalResponsavelLabel').text('Editar Responsavel');
    $('#modalResponsavel').modal('show'); // Abre o modal
}

// Função para salvar (cadastrar ou editar responsavel)
async function salvarResponsavel() {
    const form = $('#formResponsavel')[0];
    
    if (!form.checkValidity()) {
        form.reportValidity(); // Valida o formulário nativamente
        return;
    }
    
    const responsavel = {
        nome: $('#nome').val(),
        cpf: $('#cpf').val(),
        data_nascimento: $("#data_nascimento").val(),
        telefone: $('#telefone').val(),
        email: $('#email').val(),
        parentesco: $('#parentesco').val(),
        senha_acesso: $("#senha").val(),
        status: $('#status').val()
    };
    
    const editMode = $('#editMode').val() === 'true';
    const cpf = $('#cpf').val();
    
    try {
        const response = await fetch(
            editMode ? `/api/responsavel/editar/${cpf}` : '/api/responsavel/cadastrar', 
            {
                method: editMode ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(responsavel)
            }
        );
        
        if (!response.ok) throw new Error('Erro ao salvar responsavel.');
        
        alert(editMode ? 'Responsavel editado com sucesso!' : 'Responsavel cadastrado com sucesso!');
        $('#modalresponsavel').modal('hide');
        await fetchResponsavel(); // Atualiza a tabela
    } catch (error) {
        alert(error.message);
        console.error(error);
    }
}

// Função para buscar e renderizar responsavel
async function fetchResponsavel() {
    try {
        const response = await fetch('/api/responsavel');
        if (!response.ok) throw new Error('Erro ao buscar responsavel.');
        
        const responsaveis = await response.json();
        const tableBody = $('#responsavel-tbody');
        tableBody.empty();
        
        responsaveis.forEach((responsavel) => {
            tableBody.append(`
                <tr>
                    <td>${responsavel.nome}</td>
                    <td>${responsavel.cpf}</td>
                    <td>${responsavel.email}</td>
                    <td>${responsavel.telefone}</td>
                    <td>${responsavel.parentesco}</td>
                    <td><span class="badge ${responsavel.status == true ? 'bg-success' : 'bg-danger'}">${responsavel.status ? "Ativo" : "Inativo"}</span></td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editarResponsavel('${responsavel.cpf}')">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="excluirResponsavel('${responsavel.cpf}')">Excluir</button>
                    </td>
                </tr>`
            );
        });
    } catch (error) {
        alert(error.message);
        console.error(error);
    }
}

// Função para excluir responsavel
async function excluirResponsavel(cpf) {
    if (confirm('Tem certeza que deseja excluir este responsavel?')) {
        try {
            const response = await fetch(`/api/responsavel/excluir/${cpf}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) throw new Error('Erro ao excluir responsavel.');
            
            alert('responsavel excluído com sucesso!');
            await fetchResponsavel();
        } catch (error) {
            alert(error.message);
            console.error(error);
        }
    }
}

// Função para editar responsavel
async function editarResponsavel(cpf) {
    try {
        const response = await fetch(`/api/responsavel/${cpf}`);
        if (!response.ok) throw new Error('Erro ao buscar dados do responsavel.');
        
        const responsavel = await response.json();
        abrirModalEdicaoResponsavel(responsavel);
    } catch (error) {
        alert(error.message);
        console.error(error);
    }
}

// Eventos
$('#btnSalvarResponsavel').on('click', salvarResponsavel);

function voltarPagina() {
    window.history.back();
}

// Carrega responsavels ao iniciar
$(document).ready(async () => {
    await fetchResponsavel();
});