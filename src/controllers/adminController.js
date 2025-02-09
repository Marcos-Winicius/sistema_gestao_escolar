const Administradores = require('../models/adminModel');
const {Usuario: Usuarios} = require('../models/usuariosModel')
const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcryptjs')

module.exports = {
  getAll: async (req, res) => {
    try {
      const admins = await Administradores.findAll({
        include: {
          model: Usuarios,
          as: 'usuario_adm',
          attributes: {exclude: ['id_usuario', 'senha_acesso', 'login']}
        }
      });
      if (admins.length > 0) {
        const formattedAdmins = admins.map(admin => {
          const adminData = admin.get({ plain: true });
          const { usuario_adm, ...rest } = adminData;
          const formattedAdmin = {...rest, ...usuario_adm}
          return formattedAdmin;
        })
        res.json(formattedAdmins);
      } else {
        res.status(404).json({ error: "Nenhum administrador encontrado!" });
      }
    } catch (error) {
      console.error("Erro ao buscar administradores!", error);
      res.status(500).json({ error: "Erro ao buscar administradores!" });
    }
  },
  
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const admin = await Administradores.findOne({
        where: {id_usuario: id},
        include: {
          model: Usuarios,
          as: 'usuario_adm'
        },
      });
      if (admin) {
        const adminData = admin.get({ plain: true });
        const { usuario_adm, ...rest } = adminData;
        const formattedAdmin = {...rest, ...usuario_adm}
        res.json(formattedAdmin);
      } else {
        res.status(404).json({ error: "Administrador não encontrado!" });
      }
    } catch (error) {
      console.error("Erro ao buscar administrador!", error);
      res.status(500).json({ error: "Erro ao buscar administrador!" });
    }
  },
  
  create: async (req, res) => {
    try {
      const {nome, cpf, data_nascimento, cargo, email, telefone, login, senha_acesso, status } = req.body;
      const hashedPassword = await bcrypt.hash(senha_acesso, 10);
      
      const novoUser = await Usuarios.create({
        id: uuidv4(),
        nome,
        cpf,
        tipo: 'Administrador',
        data_nascimento,
        email,
        telefone,
        login,
        senha_acesso: hashedPassword,
        status
      });
      
      const novoAdmin = await Administradores.create({id_usuario: novoUser.id, cargo})
      
      res.status(201).json(novoAdmin);
    } catch (error) {
      console.error("Erro ao criar administrador!", error);
      res.status(500).json({ error: "Erro ao criar administrador!" });
    }
  },
  
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, cpf, data_nascimento, cargo, email, telefone, status  } = req.body;
      
      const usuario = await Usuarios.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ error: "Usuário não encontrado!" });
      }
      
      const userAdm = await Administradores.findByPk(id);
      if(!userAdm){
        return res.status(404).json({ error: "Administrador não encontrado!" });
      }
      await usuario.update({nome, cpf, data_nascimento, email, telefone, status });
      await userAdm.update({cargo})
      res.json({ message: "Administrador atualizado com sucesso!" });
    } catch (error) {
      console.error("Erro ao atualizar administrador!", error);
      res.status(500).json({ error: "Erro ao atualizar administrador!" });
    }
  },
  
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const admin = await Usuarios.findByPk(id);
      if (!admin) {
        return res.status(404).json({ error: "Administrador não encontrado!" });
      }
      await admin.destroy();
      res.json({ message: "Administrador removido com sucesso!" });
    } catch (error) {
      console.error("Erro ao deletar administrador!", error);
      res.status(500).json({ error: "Erro ao deletar administrador!" });
    }
  }
};
