const { aluno: Alunos } = require('../models/alunosModel');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
  getAll: async (req, res) => {
    try {
      const alunos = await Alunos.findAll();
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
      const aluno = await Alunos.findByPk(matricula);
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
      const { nome, cpf, data_nascimento, email, responsavel, senha_acesso, status } = req.body;
      console.log(req.body);
      const matricula = await getNewMatricula();
      const novoAluno = await Alunos.create({
        matricula,
        nome,
        cpf,
        data_nascimento,
        email,
        responsavel,
        senha_acesso,
        status
      });
      
      res.status(201).json(novoAluno);
    } catch (error) {
      console.error("Erro ao criar aluno!", error);
      res.status(500).json({ error: "Erro ao criar aluno!" });
    }
  },
  
  update: async (req, res) => {
    try {
      const { matricula } = req.params;
      const { nome, cpf, data_nascimento, serie, turma, email, responsavel, senha_acesso, status } = req.body;
      
      const aluno = await Alunos.findByPk(matricula);
      if (!aluno) {
        return res.status(404).json({ error: "Aluno não encontrado!" });
      }
      
      await aluno.update({ nome, cpf, data_nascimento, serie, turma, email, responsavel, senha_acesso, status });
      
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
      
      await aluno.destroy();
      res.json({ message: "Aluno removido com sucesso!" });
    } catch (error) {
      console.error("Erro ao deletar aluno!", error);
      res.status(500).json({ error: "Erro ao deletar aluno!" });
    }
  },
  login: async(req, res)=>{
    const {email, senha} = req.body;
    if(!email || !senha){
      return res.render('loginEstudante', {error: "Informações Ausentes!!"})
    }
    try {
      // Verificar se existe no banco
      const usuario = await Alunos.findOne({where: {email}});
      
      if(!usuario){
        return res.render('loginEstudante', {error: "Esse login não existe!"})
      }
      
      // Verificar se a senha é a mesma
      const validarSenha = await bcrypt.compare(senha, usuario.senha_acesso);
      if(!validarSenha){
        return res.render('loginEstudante', {error: "Senha inválida!"})
      }
      
      // Se tudo der certo iremos criar o token e jogar nos cookies
      
      const token = jwt.sign({ matricula: usuario.matricula, nome: usuario.nome, tipo: 'Aluno'}, process.env.JWT_SECRET, { expiresIn: '1h' });
      // Apenas para depurar -> console.log(token)
      // Salve o token em um cookie e redirecione para a página do usuário
      res.cookie('auth_token', token, { httpOnly: true });
      res.redirect('/');
      
    } catch (error) {
      console.error(error)
    }
  },
  cadastro: async(req, res)=>{
    const { nome, cpf, data_nascimento, email, responsavel, senha } = req.body;
    try {
      // Verificar se existe algum usuario com o mesmo email.
      if(await Alunos.findOne({where: {email}})){
        return res.render('cadastroEstudante', {error: "Esse login já existe!"})
      }
      // Criar senha criptografada
      const senha_acesso = await bcrypt.hash(senha, 10);
      // 
      // Criar matrícula
      const matricula = await getNewMatricula();
      // Criar usuario no banco
      await Alunos.create({matricula, nome, cpf, data_nascimento, email, responsavel, senha_acesso})
      res.redirect('/alunos/login');

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