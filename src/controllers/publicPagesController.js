const {Usuario: Usuarios} = require('../models/usuariosModel')
const Alunos = require('../models/alunosModel')
const Responsaveis = require('../models/responsavelModel')
const Professores = require('../models/professorModel')
const Administradores = require('../models/adminModel')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
    loginUser: async(req, res)=>{
        const {login, senha} = req.body;
        if(!login || !senha){
            return res.render('login', {error: "Informações Ausentes!!"})
        }
        try {
            // Verificar se existe no banco
            const usuario = await Usuarios.findOne({where: {login}});
            
            if(!usuario){
                return res.render('login', {error: "Esse login não existe!"})
            }
            
            // Verificar se a senha é a mesma
            const validarSenha = await bcrypt.compare(senha, usuario.senha_acesso);
            if(!validarSenha){
                return res.render('login', {error: "Senha inválida!"})
            }
            
            const objToken = { id: usuario.id, nome: usuario.nome, tipo: usuario.tipo}
            switch (usuario.tipo) {
                case 'Aluno': {
                    // Puxar as informações dos alunos como matricula e responsável
                    const aluno = await Alunos.findOne({where: {id_usuario: usuario.id}})
                    // Atribuir campos do aluno ao obj que vai no token
                    Object.keys(aluno).forEach(chave => {
                        objToken[chave] = aluno[chave];
                    })
                    break;
                }
                case 'Professor': {
                    const professor = await Professores.findOne({where: {id_usuario: usuario.id}})
                    // Atribuir campos do professor ao obj que vai no token
                    Object.keys(professor).forEach(chave => {
                        objToken[chave] = professor[chave];
                    })
                    break;
                }
                case 'Responsável': {
                    const responsavel = await Responsaveis.findOne({where: {id_usuario: usuario.id}})
                    // Atribuir campos do responsavel ao obj que vai no token
                    Object.keys(responsavel).forEach(chave => {
                        objToken[chave] = responsavel[chave];
                    })
                    break;
                }
                case 'Administrador': {
                    const admin = await Administradores.findOne({where: {id_usuario: usuario.id}})
                    // Atribuir campos do admin ao obj que vai no token
                    Object.keys(admin).forEach(chave => {
                        objToken[chave] = admin[chave];
                    })
                    break;
                }
                
            }
            
            // Se tudo der certo iremos criar o token e jogar nos cookies
            const token = jwt.sign(objToken, process.env.JWT_SECRET, { expiresIn: '1h' });
            // Apenas para depurar -> console.log(token)
            // Salve o token em um cookie e redirecione para a página do usuário
            res.cookie('auth_token', token, { httpOnly: true });
            res.redirect('/home');
            
        } catch (error) {
            console.error(error)
        }
    }
}