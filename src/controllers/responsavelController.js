const { Op } = require('sequelize');
const Responsaveis = require('../models/responsavelModel');
const { Usuario: Usuarios } = require('../models/usuariosModel');
const verificarUsuarioExistente = require('../utils/verificarUsuarioExistente');

module.exports = {
  getAll: async (req, res) => {
    try {
      const responsaveis = await Responsaveis.findAll({
        include: {
          model: Usuarios,
          as: 'usuario_responsavel',
          attributes: { exclude: ['senha_acesso'] }
        }
      });
      if (responsaveis.length > 0) {
        const formattedResponsaveis = responsaveis.map(responsavel => {
          const responsavelData = responsavel.get({plain: true});
          const {usuario_responsavel, ...rest} = responsavelData;
          const formattedResponsavel = {...rest, ...usuario_responsavel}
          return formattedResponsavel;
        })
        res.json(formattedResponsaveis);
      } else {
        res.status(404).json({ error: "Nenhum responsável encontrado!" });
      }
    } catch (error) {
      console.error("Erro ao buscar responsáveis!", error);
      res.status(500).json({ error: "Erro ao buscar responsáveis!" });
    }
  },
  
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const responsavel = await Responsaveis.findOne({
        where: {id_usuario: id},
        include: {
          model: Usuarios,
          as: 'usuario_responsavel',
          attributes: {
            exclude: ['senha_acesso', 'login']
          }
        }
      });
      if (responsavel) {
        const responsavelData = responsavel.get({ plain: true });
        const { usuario_responsavel, ...rest } = responsavelData;
        const formattedResponsavel = {...rest, ...usuario_responsavel}
        
        res.json(formattedResponsavel);
      } else {
        res.status(404).json({ error: "Responsável não encontrado!" });
      }
    } catch (error) {
      console.error("Erro ao buscar responsável!", error);
      res.status(500).json({ error: "Erro ao buscar responsável!" });
    }
  },
  
  create: async (req, res) => {
    try {
      const { nome, cpf, data_nascimento, email, telefone, parentesco, senha_acesso, status } = req.body;
      const msgErro = await verificarUsuarioExistente(email, cpf)
      if(msgErro){
        return res.status(400).json({erro: msgErro})
      }
      const novoUser = await Usuarios.create({
        nome,
        cpf,
        data_nascimento,
        email,
        login: cpf,
        telefone,
        senha_acesso,
        status
      });
      
      const novoResponsavel = await Responsaveis.create({parentesco, id_usuario: novoUser.id});
      res.status(201).json(novoResponsavel);
    } catch (error) {
      console.error("Erro ao criar responsável!", error);
      res.status(500).json({ error: "Erro ao criar responsável!" });
    }
  },
  
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, data_nascimento, email, telefone, parentesco, senha_acesso, status } = req.body;
      
      const user = await Usuarios.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: "Responsável não encontrado!" });
      }
      const responsavel = await Responsaveis.findByPk({id_usuario: id})
      await user.update({ nome, data_nascimento, email, telefone, status });
      await responsavel.update({ parentesco})
      
      res.json({ message: "Responsável atualizado com sucesso!" });
    } catch (error) {
      console.error("Erro ao atualizar responsável!", error);
      res.status(500).json({ error: "Erro ao atualizar responsável!" });
    }
  },
  
  delete: async (req, res) => {
    try {
      const { cpf } = req.params;
      const responsavel = await Responsaveis.findByPk(cpf);
      if (!responsavel) {
        return res.status(404).json({ error: "Responsável não encontrado!" });
      }
      
      await responsavel.destroy();
      res.json({ message: "Responsável removido com sucesso!" });
    } catch (error) {
      console.error("Erro ao deletar responsável!", error);
      res.status(500).json({ error: "Erro ao deletar responsável!" });
    }
  }
};
