const { admin: Administradores } = require('../models/adminModel');

module.exports = {
  getAll: async (req, res) => {
    try {
      const admins = await Administradores.findAll();
      if (admins.length > 0) {
        res.json(admins);
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
      const admin = await Administradores.findByPk(id);
      if (admin) {
        res.json(admin);
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
      const { id, nome, cpf, data_nascimento, cargo, email, senha_acesso, status } = req.body;

      const novoAdmin = await Administradores.create({
        id,
        nome,
        cpf,
        data_nascimento,
        cargo,
        email,
        senha_acesso,
        status
      });

      res.status(201).json(novoAdmin);
    } catch (error) {
      console.error("Erro ao criar administrador!", error);
      res.status(500).json({ error: "Erro ao criar administrador!" });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, cpf, data_nascimento, cargo, email, senha_acesso, status } = req.body;

      const admin = await Administradores.findByPk(id);
      if (!admin) {
        return res.status(404).json({ error: "Administrador não encontrado!" });
      }

      await admin.update({ nome, cpf, data_nascimento, cargo, email, senha_acesso, status });

      res.json({ message: "Administrador atualizado com sucesso!" });
    } catch (error) {
      console.error("Erro ao atualizar administrador!", error);
      res.status(500).json({ error: "Erro ao atualizar administrador!" });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const admin = await Administradores.findByPk(id);
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
