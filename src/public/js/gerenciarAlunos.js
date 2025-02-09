// Função para abrir o modal de cadastro de aluno
function abrirModalCadastroAluno() {
    $('#formAluno')[0].reset(); // Reseta o formulário
    $('#editMode').val('false'); // Define modo de cadastro
    $("#login").closest(".mb-3").hide();
    $("#login").attr("required", false);
    $("#senha").closest(".mb-3").show();
    $("#senha").attr("required", true);
    $('#modalAlunoLabel').text('Cadastrar Aluno');
    $('#modalAluno').modal('show'); // Abre o modal
}

// Função para abrir o modal de edição de aluno
function abrirModalEdicaoAluno(aluno) {
    console.log(aluno)
    $('#matricula').val(aluno.matricula);
    $('#nome').val(aluno.nome);
    $('#cpf').val(aluno.cpf);
    $('#email').val(aluno.email);
    $('#telefone').val(aluno.telefone);
    $("#data_nascimento").val(aluno.data_nascimento.split('T')[0])
    $('#responsavel').val(aluno.responsavel);
    $("#senha").closest(".mb-3").hide();
    $("#senha").attr("required", false);
    $("#login").closest(".mb-3").hide();
    $("#login").attr("required", false);
    $('#status').val(aluno.status ? '1' : "0");
    $('#editMode').val('true'); // Define modo de edição
    $('#login')
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
    const cpfFormatado = $("#cpf").val().replace(/[.-]/g, '');
    const telefoneFormatado = $("#telefone").val().replace(/[\(\)-\s]/g, '');
    const aluno = {
        nome: $('#nome').val(),
        cpf: (cpfFormatado ? cpfFormatado : $('#cpf').val()),
        data_nascimento: $("#data_nascimento").val(),
        telefone: (telefoneFormatado ? telefoneFormatado : $("#telefone").val()),
        responsavel: $('#responsavel').val(),
        email: $('#email').val(),
    };
    
    const editMode = $('#editMode').val() === 'true';
    if(!editMode){
        aluno.login = $('#login').val(),
        aluno.senha_acesso = $("#senha").val()

    }
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
        
        if(alunos.length > 0){
            alunos.forEach((aluno) => {
                tableBody.append(`
                <tr>
                    <td>${aluno.matricula}</td>
                    <td>${aluno.nome}</td>
                    <td>${aluno.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}</td>
                    <td>${aluno.email}</td>
                    <td>${aluno.telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")}</td>
                    <td>${aluno.responsavel}</td>
                    <td><span class="badge ${aluno.status == true ? 'bg-success' : 'bg-danger'}">${aluno.status ? "Ativo" : "Inativo"}</span></td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editarAluno('${aluno.matricula}')">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="excluirAluno('${aluno.matricula}')">Excluir</button>
                    </td>
                </tr>`
                );
            });
        }
        else{
            console.log('nenhum aluno encontrado')
        }
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
    // Máscara do cpf para ficar com '.' e '-'
    $('#cpf').mask('000.000.000-00');
    $('#telefone').mask('(00) 00000-0000');
});

// RegExp
// let nome = 'Marcos Winicius 2005';
// let email = 'Marcoswini990@gmail.com'
// console.log(nome.search(/winicius/i))
// /winicius/i = expressão regular que informa winicius sem ter o case sensitive
// console.log(nome.replace(/[a-f|\d]/ig, ''))
// Procure O e S sem o case sensitive e sem parar no primeiro resultado
// i = ignorar o case sensitive
// g = não para no primeiro resultado / pegar todos os resultados
// [] = onde irei utilizar os padrões
// a-z = pegar todos as letras de a até z
// 0-9 = pegar todos os números de 0 a 9
// \d = Meta caractere que busca apenas os dígitos de uma expressão
// \s = Meta caractere que busca espaços