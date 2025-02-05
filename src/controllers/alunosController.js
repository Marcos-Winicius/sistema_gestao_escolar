const Alunos = require('../models/alunosModel');
const {Usuario: Usuarios} = require('../models/usuariosModel');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {v4: uuidv4} = require('uuid')

module.exports = {
  getAll: async (req, res) => {
    try {
      const alunos = await Alunos.findAll({
        include: {
          model: Usuarios,
          as: "usuario",
          attributes: {exclude: ['senha_acesso', 'login']}
        },
        raw: true, // Retorna um objeto plano
        nest: false // Impede que Sequelize aninhe os resultados
      }
    );
    if (alunos.length > 0) {
      res.json(alunos);
    } else {
      res.status(404).json({ error: "Nenhum aluno encontrado!" });
    }
  } catch (error) {
    console.error("Erro ao buscar alunos!", error);
    res.status(500).json({ error: "Erro ao buscar alunos!" });
  }
},

getByMatricula: async (req, res) => {
  try {
    const { matricula } = req.params;
    const aluno = await Alunos.findOne({
      where: {matricula},
      include: {
        model: Usuarios,
        as: "usuario",
        attributes: {exclude: ['senha_acesso']}
      },
      raw: true,
      nest: false
    });
    if (aluno) {
      res.json(aluno);
    } else {
      res.status(404).json({ error: "Aluno não encontrado!" });
    }
  } catch (error) {
    console.error("Erro ao buscar aluno!", error);
    res.status(500).json({ error: "Erro ao buscar aluno!" });
  }
},

create: async (req, res) => {
  try {
    const { nome, cpf, data_nascimento, login, telefone, email, senha_acesso, responsavel } = req.body;
    // Verificando se o login já existe
    const existingUser = await Usuarios.findOne({
      where: {
        login
      }
    });
    
    if (existingUser) {
      return res.status(400).json({ error: "Usuário com esse CPF já existe!" });
    }
    
    // Hash da senha antes de salvar
    const hashedPassword = await bcrypt.hash(senha_acesso, 10);
    const matricula = await getNewMatricula();
    const id_user = uuidv4();
    // console.log(id_user)
    
    const novoUsuario = await Usuarios.create({
      id: id_user,
      nome,
      cpf,
      data_nascimento,
      tipo: "Aluno",
      login,
      telefone,
      email,
      senha_acesso: hashedPassword
    });
    
    // 4. Criar o aluno com a referência do usuário
    const novoAluno = await Alunos.create({
      matricula,
      id_usuario: novoUsuario.id, // Chave estrangeira
      responsavel
    });
    
    res.status(201).json({ message: "Aluno cadastrado com sucesso!", aluno: novoAluno });
    
    
  } catch (error) {
    console.error("Erro ao criar aluno!", error);
    res.status(500).json({ error: "Erro ao criar aluno!" });
  }
},

update: async (req, res) => {
  try {
    const { matricula } = req.params;
    const { nome, cpf, data_nascimento, telefone, responsavel, status } = req.body;
    
    const aluno = await Alunos.findByPk(matricula);
    if (!aluno) {
      return res.status(404).json({ error: "Aluno não encontrado!" });
    }
    // Após achar o aluno, pegar o id e modificar o usuario principal
    const usuario = await Usuarios.findByPk(aluno.id_usuario);
    // Atualizar usuario principal
    await usuario.update({nome, cpf, data_nascimento, telefone, status})
    // Atualizar aluno
    await aluno.update({  responsavel });
    
    res.json({ message: "Aluno atualizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar aluno!", error);
    res.status(500).json({ error: "Erro ao atualizar aluno!" });
  }
},

delete: async (req, res) => {
  try {
    const { matricula } = req.params;
    const aluno = await Alunos.findByPk(matricula);
    if (!aluno) {
      return res.status(404).json({ error: "Aluno não encontrado!" });
    }
    const usuario = await Usuarios.findByPk(aluno.id_usuario);
    await usuario.destroy();
    res.json({ message: "Aluno removido com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar aluno!", error);
    res.status(500).json({ error: "Erro ao deletar aluno!" });
  }
},
cadastro: async(req, res)=>{
  const { nome, cpf, data_nascimento, login, email, responsavel, senha } = req.body;
  try {
    // Verificar se existe algum usuario com o mesmo email.
    if(await Usuarios.findOne({where: {login}})){
      return res.render('cadastroEstudante', {error: "Esse login já existe!"})
    }
    // Criar senha criptografada
    const senha_acesso = await bcrypt.hash(senha, 10);
    // 
    // Criar matrícula
    const matricula = await getNewMatricula();
    // Criar usuario no banco
    const novoUser = await Usuarios.create({ id: uuidv4(), nome, cpf, data_nascimento, login, email, senha_acesso, tipo: 'Aluno'});
    await Alunos.create({matricula, responsavel, id_usuario: novoUser.id});
    res.redirect('/login');
    
  } catch (error) {
    console.error(error)
    return res.render('cadastroEstudante', {error})
  }
}
};

async function getNewMatricula(){
  // Implantar lógica de criação da matrícula usando o ano
  const ultima_matricula = await Alunos.findOne({
    order: [['matricula', 'DESC']]
  })
  
  const ano = new Date().getFullYear().toString();
  let incremento = 1
  if(ultima_matricula){
    const ultimo_incremento = parseInt(ultima_matricula.matricula.slice(-2), 10)
    incremento += ultimo_incremento
  }
  
  const matricula = `${ano}${incremento.toString().padStart(2, '0')}`
  return matricula;
}