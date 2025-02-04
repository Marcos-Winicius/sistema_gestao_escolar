
// Funções para Modal
function abrirModalCadastroAdministrador() {
    $('#formAdministrador')[0].reset();
    $('#editMode').val('false');
    $('#modalAdministradorLabel').text('Cadastrar Administrador');
    $('#modalAdministrador').modal('show');
}

function abrirModalEdicaoAdministrador(admin) {
    $('#id').val(admin.id);
    $('#nome').val(admin.nome);
    $('#cpf').val(admin.cpf);
    $('#data_nascimento').val(admin.data_nascimento.split('T')[0]);
    $('#cargo').val(admin.cargo);
    $('#email').val(admin.email);
    $('#senha_acesso').val(admin.senha_acesso);
    $('#status').val(admin.status ? '1' : '0');
    $('#editMode').val('true');
    $('#modalAdministradorLabel').text('Editar Administrador');
    $('#modalAdministrador').modal('show');
}

// Função Principal de Salvar
async function salvarAdministrador() {
    const form = $('#formAdministrador')[0];
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const adminData = {
        id: $('#id').val(),
        nome: $('#nome').val(),
        cpf: $('#cpf').val(),
        data_nascimento: $('#data_nascimento').val(),
        cargo: $('#cargo').val(),
        email: $('#email').val(),
        senha_acesso: $('#senha_acesso').val(),
        status: $('#status').val()
    };

    const editMode = $('#editMode').val() === 'true';
    const endpoint = editMode ? `/api/administradores/editar/${adminData.id}` : '/api/administradores/cadastrar';

    try {
        const response = await fetch(endpoint, {
            method: editMode ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(adminData)
        });

        if (!response.ok) throw new Error(await response.text());
        
        alert(`Administrador ${editMode ? 'atualizado' : 'cadastrado'} com sucesso!`);
        $('#modalAdministrador').modal('hide');
        await fetchAdministradores();
    } catch (error) {
        alert(`Erro: ${error.message}`);
    }
}

// Funções CRUD
async function fetchAdministradores() {
    try {
        const response = await fetch('/api/administradores');
        if (!response.ok) throw new Error('Erro ao buscar professores.');
        $('#administrador-tbody').empty()
        const admins = await response.json();
        admins.forEach(admin => {
            $('#administrador-tbody').append( `
                <tr>
                    <td>${admin.id}</td>
                    <td>${admin.nome}</td>
                    <td>${admin.cpf}</td>
                    <td>${admin.cargo}</td>
                    <td>${admin.email}</td>
                    <td><span class="badge ${admin.status ? 'bg-success' : 'bg-danger'}">${admin.status ? 'Ativo' : 'Inativo'}</span></td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editarAdministrador('${admin.id}')">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="excluirAdministrador('${admin.id}')">Excluir</button>
                    </td>
                </tr>
            `);    
        });
        
    } catch (error) {
        alert('Erro ao carregar administradores: ' + error.message);
    }
}

async function editarAdministrador(id) {
    try {
        const response = await fetch(`/api/administradores/editar/${id}`);
        const admin = await response.json();
        abrirModalEdicaoAdministrador(admin);
    } catch (error) {
        alert('Erro ao buscar administrador: ' + error.message);
    }
}

async function excluirAdministrador(id) {
    if (confirm('Confirmar exclusão deste administrador?')) {
        try {
            await fetch(`/api/administradores/excluir/${id}`, { method: 'DELETE' });
            alert('Administrador excluído com sucesso!');
            await fetchAdministradores();
        } catch (error) {
            alert('Erro ao excluir: ' + error.message);
        }
    }
}

// Eventos
$(document).ready(() => {
    fetchAdministradores();
    $('#btnSalvarAdministrador').on('click', salvarAdministrador);
});

function voltarPagina() {
    window.history.back();
}