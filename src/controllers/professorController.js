const { v4: uuidv4 } = require('uuid');
const Professores = require('../models/professorModel');
const {Usuario: Usuarios} = require('../models/usuariosModel');
const { compare, hash } = require('bcryptjs');
const verificarUsuarioExistente = require('../utils/verificarUsuarioExistente');

module.exports = {
  getAll: async (req, res) => {
    try {
      const professores = await Professores.findAll({
        include: {
          model: Usuarios,
          as: 'usuario_professor',
          attributes: {exclude: ['senha_acesso', 'login']}
        }
      });
      if (professores.length > 0) {
        const formattedProfessores = professores.map(professor => {
          const professorData = professor.get({ plain: true });
          const { usuario_professor, ...rest } = professorData;
          const formattedProfessor = {...rest, ...usuario_professor}
          return formattedProfessor;
        })
        res.json(formattedProfessores);
      } else {
        res.status(404).json({ error: "Nenhum professor encontrado!" });
      }
    } catch (error) {
      console.error("Erro ao buscar professores!", error);
      res.status(500).json({ error: "Erro ao buscar professores!" });
    }
  },
  
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const professor = await Professores.findOne({
        where: {id_usuario: id},
        include: {
          model: Usuarios,
          as: 'usuario_professor',
          attributes: {
            exclude: ['senha_acesso', 'login']
          }
        }
      });
      if (professor) {
        const professorData = professor.get({ plain: true });
        const { usuario_professor, ...rest } = professorData;
        const formattedProfessor = {...rest, ...usuario_professor}
        res.json(formattedProfessor);
      } else {
        res.status(404).json({ error: "Professor não encontrado!" });
      }
    } catch (error) {
      console.error("Erro ao buscar professor!", error);
      res.status(500).json({ error: "Erro ao buscar professor!" });
    }
  },
  
  create: async (req, res) => {
    try {
      const { nome, cpf, data_nascimento, email, telefone, formacao_academica, senha_acesso, status } = req.body;
      const msgErro = await verificarUsuarioExistente(email, cpf)
      if(msgErro){
        return res.status(400).json({erro: msgErro})
      }
      
      // pós verificação de login
      const hashedPassword = hash(senha_acesso, 10)
      const novoUser = await Usuarios.create({
        id: uuidv4(),
        nome,
        cpf,
        data_nascimento,
        email,
        telefone,
        login: cpf,
        senha_acesso: hashedPassword,
        status
      });
      
      const novoProfessor = await Professores.create({
        id_usuario: novoUser.id,
        formacao_academica
      })
      res.status(201).json(novoProfessor);
    } catch (error) {
      console.error("Erro ao criar professor!", error);
      res.status(500).json({ error: "Erro ao criar professor!" });
    }
  },
  
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, data_nascimento, email, telefone, formacao_academica, status } = req.body;
      
      const user = await Usuarios.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado!" });
      }
      const professor = await Professores.findOne({where: {id_usuario: user.id}})
      
      await user.update({ nome, data_nascimento, email, telefone, status });
      await professor.update({formacao_academica})
      res.json({ message: "Professor atualizado com sucesso!" });
    } catch (error) {
      console.error("Erro ao atualizar professor!", error);
      res.status(500).json({ error: "Erro ao atualizar professor!" });
    }
  },
  
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const professor = await Professores.findByPk(cpf);
      if (!professor) {
        return res.status(404).json({ error: "Professor não encontrado!" });
      }
      
      await professor.destroy();
      res.json({ message: "Professor removido com sucesso!" });
    } catch (error) {
      console.error("Erro ao deletar professor!", error);
      res.status(500).json({ error: "Erro ao deletar professor!" });
    }
  }
};
